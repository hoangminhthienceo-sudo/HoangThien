<?php
/**
 * Plugin Name: HoangMinhThien Connector
 * Description: Kết nối WordPress với website hoangminhthien.com. Cài xong vào Cài đặt → HoangMinhThien để điền địa chỉ website.
 * Version: 1.0.0
 * Author: HoangMinhThien
 * Text Domain: hmt-connector
 */

if (!defined('ABSPATH')) {
    exit;
}

define('HMT_OPTION_ORIGIN', 'hmt_allowed_origin');
define('HMT_OPTION_SETTINGS', 'hmt_site_settings');

/* =========================================================================
 * 1. Mở các trường bổ sung ra REST API
 * ====================================================================== */
add_action('init', function () {
    $fields = [
        'badge', 'duration', 'level', 'lessons_count', 'instructor',
        'rating', 'students_count', 'curriculum',
        'verdict', 'risk_reward', 'tokenomics', 'highlights', 'risks',
        'onchain_metrics', 'author_name',
    ];

    foreach ($fields as $field) {
        register_post_meta('post', $field, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => 'string',
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ]);
    }
});

/* =========================================================================
 * 2. Endpoint lưu nội dung chữ & link của website
 * ====================================================================== */
add_action('rest_api_init', function () {
    register_rest_route('hmt/v1', '/settings', [
        [
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => function () {
                return rest_ensure_response(get_option(HMT_OPTION_SETTINGS, new stdClass()));
            },
        ],
        [
            'methods'             => 'POST',
            // CHỈ Quản trị viên được sửa nội dung chữ & link của website.
            // Nhân viên (vai trò Tác giả/Cộng tác viên) chỉ được viết bài.
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
            'callback'            => function (WP_REST_Request $request) {
                $data = $request->get_json_params();
                if (!is_array($data)) {
                    return new WP_Error('hmt_invalid', 'Dữ liệu không hợp lệ', ['status' => 400]);
                }
                update_option(HMT_OPTION_SETTINGS, $data);
                return rest_ensure_response(['saved' => true]);
            },
        ],
    ]);
});

/* =========================================================================
 * 3. Cho phép website gọi sang WordPress (CORS)
 * ====================================================================== */
function hmt_allowed_origin() {
    $saved = trim((string) get_option(HMT_OPTION_ORIGIN, ''));
    return rtrim($saved, '/');
}

function hmt_send_cors_headers() {
    $allowed = hmt_allowed_origin();
    if ($allowed === '') {
        return;
    }
    header('Access-Control-Allow-Origin: ' . $allowed);
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Authorization, Content-Type, Content-Disposition');
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}

add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        hmt_send_cors_headers();
        return $value;
    });
}, 15);

/** Trả lời sớm cho request kiểm tra của trình duyệt */
add_action('init', function () {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'OPTIONS') {
        return;
    }
    if (strpos($_SERVER['REQUEST_URI'] ?? '', '/wp-json/') === false
        && strpos($_SERVER['REQUEST_URI'] ?? '', 'rest_route') === false) {
        return;
    }
    hmt_send_cors_headers();
    status_header(200);
    exit;
});

/* =========================================================================
 * 4. Tự tạo 2 danh mục gốc khi kích hoạt plugin
 * ====================================================================== */
register_activation_hook(__FILE__, function () {
    $roots = [
        'khoa-hoc'     => 'Khoá Học',
        'review-du-an' => 'Review Dự Án',
    ];
    foreach ($roots as $slug => $name) {
        if (!term_exists($slug, 'category')) {
            wp_insert_term($name, 'category', ['slug' => $slug]);
        }
    }
});

/* =========================================================================
 * 5. Trang cài đặt trong WP Admin
 * ====================================================================== */
add_action('admin_menu', function () {
    add_options_page(
        'HoangMinhThien',
        'HoangMinhThien',
        'manage_options',
        'hmt-connector',
        'hmt_render_settings_page'
    );
});

add_action('admin_init', function () {
    register_setting('hmt_connector', HMT_OPTION_ORIGIN, [
        'type'              => 'string',
        'sanitize_callback' => function ($value) {
            return rtrim(esc_url_raw(trim((string) $value)), '/');
        },
        'default'           => '',
    ]);
});

/** Kiểm tra nhanh xem WordPress đã sẵn sàng chưa */
function hmt_health_checks() {
    $checks = [];

    // Permalink phải khác chế độ Plain thì /wp-json/ mới chạy
    $permalink_ok = get_option('permalink_structure') !== '';
    $checks[] = [
        'label' => 'Đường dẫn tĩnh (Permalinks)',
        'ok'    => $permalink_ok,
        'fix'   => 'Vào Cài đặt → Đường dẫn tĩnh, chọn "Tên bài viết", bấm Lưu thay đổi.',
    ];

    // Địa chỉ website đã điền chưa
    $origin_ok = hmt_allowed_origin() !== '';
    $checks[] = [
        'label' => 'Địa chỉ website đã khai báo',
        'ok'    => $origin_ok,
        'fix'   => 'Điền địa chỉ website vào ô bên dưới rồi bấm Lưu.',
    ];

    // 2 danh mục gốc
    foreach (['khoa-hoc' => 'Khoá Học', 'review-du-an' => 'Review Dự Án'] as $slug => $name) {
        $checks[] = [
            'label' => 'Danh mục "' . $name . '"',
            'ok'    => (bool) term_exists($slug, 'category'),
            'fix'   => 'Vào Bài viết → Danh mục, tạo danh mục tên "' . $name . '" với đường dẫn tĩnh "' . $slug . '".',
        ];
    }

    // Application Password (cần HTTPS, trừ khi chạy máy nội bộ)
    $checks[] = [
        'label' => 'Mật khẩu ứng dụng dùng được',
        'ok'    => wp_is_application_passwords_available(),
        'fix'   => 'Tính năng này cần website chạy HTTPS. Liên hệ nhà cung cấp hosting để bật SSL.',
    ];

    return $checks;
}

function hmt_render_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }
    $checks = hmt_health_checks();
    ?>
    <div class="wrap">
        <h1>Kết nối website HoangMinhThien</h1>

        <h2 style="margin-top:24px">Tình trạng</h2>
        <table class="widefat striped" style="max-width:760px">
            <tbody>
            <?php foreach ($checks as $check) : ?>
                <tr>
                    <td style="width:32px;font-size:18px">
                        <?php echo $check['ok'] ? '✅' : '⚠️'; ?>
                    </td>
                    <td><strong><?php echo esc_html($check['label']); ?></strong></td>
                    <td>
                        <?php
                        echo $check['ok']
                            ? '<span style="color:#008a20">Đã sẵn sàng</span>'
                            : '<span style="color:#b32d2e">Cần xử lý:</span> ' . esc_html($check['fix']);
                        ?>
                    </td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>

        <h2 style="margin-top:32px">Cấu hình</h2>
        <form method="post" action="options.php" style="max-width:760px">
            <?php settings_fields('hmt_connector'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="hmt_origin">Địa chỉ website</label>
                    </th>
                    <td>
                        <input
                            type="url"
                            id="hmt_origin"
                            name="<?php echo esc_attr(HMT_OPTION_ORIGIN); ?>"
                            value="<?php echo esc_attr(get_option(HMT_OPTION_ORIGIN, '')); ?>"
                            class="regular-text"
                            placeholder="https://hoangminhthien.com"
                        />
                        <p class="description">
                            Địa chỉ website chính (không có dấu / ở cuối). Đây là website duy nhất
                            được phép lấy dữ liệu từ WordPress này.
                        </p>
                    </td>
                </tr>
            </table>
            <?php submit_button('Lưu thay đổi'); ?>
        </form>

        <h2 style="margin-top:32px">Địa chỉ cần điền trên Vercel</h2>
        <p>Khi cấu hình website trên Vercel, điền giá trị này vào biến <code>VITE_WP_API_URL</code>:</p>
        <p>
            <code style="font-size:15px;padding:10px 14px;display:inline-block;background:#f0f0f1">
                <?php echo esc_html(rtrim(home_url(), '/')); ?>
            </code>
        </p>
    </div>
    <?php
}
