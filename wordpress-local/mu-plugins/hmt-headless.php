<?php
/**
 * Plugin Name: HoangMinhThien Headless
 * Description: Mở custom field, endpoint lưu cài đặt và CORS cho site React.
 *
 * File này nằm trong mu-plugins nên WordPress tự kích hoạt, không cần bật tay.
 * Khi lên hosting thật, copy nguyên file này vào wp-content/mu-plugins/
 * (tạo thư mục nếu chưa có) rồi sửa hằng HMT_ALLOWED_ORIGIN bên dưới.
 */

if (!defined('ABSPATH')) {
    exit;
}

/** Domain của site React được phép gọi API. Đổi khi lên production. */
define('HMT_ALLOWED_ORIGIN', getenv('HMT_ALLOWED_ORIGIN') ?: 'http://localhost:3000');

/* -------------------------------------------------------------------------
 * 1. Mở custom field ra REST API
 * ---------------------------------------------------------------------- */
add_action('init', function () {
    $fields = [
        // Khoá học
        'badge', 'duration', 'level', 'lessons_count', 'instructor',
        'rating', 'students_count', 'curriculum',
        // Review dự án
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

/* -------------------------------------------------------------------------
 * 2. Endpoint lưu nội dung chữ & link của các trang
 * ---------------------------------------------------------------------- */
add_action('rest_api_init', function () {
    register_rest_route('hmt/v1', '/settings', [
        [
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => function () {
                return rest_ensure_response(get_option('hmt_site_settings', new stdClass()));
            },
        ],
        [
            'methods'             => 'POST',
            'permission_callback' => function () {
                return current_user_can('edit_posts');
            },
            'callback'            => function (WP_REST_Request $request) {
                $data = $request->get_json_params();
                if (!is_array($data)) {
                    return new WP_Error('hmt_invalid', 'Dữ liệu không hợp lệ', ['status' => 400]);
                }
                update_option('hmt_site_settings', $data);
                return rest_ensure_response(['saved' => true]);
            },
        ],
    ]);
});

/* -------------------------------------------------------------------------
 * 3. CORS cho site React (khác domain/port với WordPress)
 * ---------------------------------------------------------------------- */
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');

    add_filter('rest_pre_serve_request', function ($value) {
        header('Access-Control-Allow-Origin: ' . HMT_ALLOWED_ORIGIN);
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, Content-Disposition');
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
        return $value;
    });
}, 15);

/** Trả lời sớm cho preflight OPTIONS để trình duyệt không bị chặn */
add_action('init', function () {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'OPTIONS') {
        return;
    }
    if (strpos($_SERVER['REQUEST_URI'] ?? '', '/wp-json/') === false) {
        return;
    }
    header('Access-Control-Allow-Origin: ' . HMT_ALLOWED_ORIGIN);
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Authorization, Content-Type, Content-Disposition');
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
    status_header(200);
    exit;
});

/* -------------------------------------------------------------------------
 * 4. Cho phép Application Password chạy trên HTTP khi phát triển ở localhost
 *    (WordPress mặc định chỉ bật khi có HTTPS)
 * ---------------------------------------------------------------------- */
add_filter('wp_is_application_passwords_available', function ($available) {
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if (strpos($host, 'localhost') === 0 || strpos($host, '127.0.0.1') === 0) {
        return true;
    }
    return $available;
});
