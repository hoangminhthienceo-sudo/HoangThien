# Kết nối WordPress (Headless) cho hoangminhthien.com

Site này là giao diện React. WordPress chỉ đóng vai trò **nơi soạn bài và gắn thẻ** —
không hiển thị ra ngoài. Bài viết được kéo về qua REST API công khai của WordPress.

**Điểm quan trọng:** khi chưa cấu hình `VITE_WP_API_URL`, site chạy bình thường bằng dữ
liệu tĩnh trong `src/data/`. Bật WordPress chỉ là điền thêm 1 dòng vào file `.env`.

---

## 1. Cài WordPress

Cài WordPress ở một subdomain riêng, ví dụ `cms.hoangminhthien.com`
(hosting nào cũng được: Hostinger, AZDIGI, Cloudways, WP Engine…).

Sau khi cài xong, kiểm tra REST API đã mở chưa bằng cách mở link này trên trình duyệt:

```
https://cms.hoangminhthien.com/wp-json/wp/v2/posts
```

Thấy dữ liệu JSON hiện ra là đạt.

### Nếu báo lỗi 404 ở đây

Đây là lỗi hay gặp nhất. Nguyên nhân gần như luôn là một trong hai:

1. **Permalink đang ở chế độ Plain.** Địa chỉ `/wp-json/` chỉ tồn tại khi permalink
   khác Plain. Vào **Settings → Permalinks**, chọn **Post name**, bấm **Save Changes**
   (bấm Save kể cả khi đã đúng — thao tác này ép WordPress ghi lại file `.htaccess`).

2. **Apache đặt `AllowOverride None`** khiến `.htaccess` bị bỏ qua. Kiểm tra file
   `.htaccess` ở thư mục gốc WordPress phải có khối:

   ```apache
   # BEGIN WordPress
   <IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
   RewriteBase /
   RewriteRule ^index\.php$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.php [L]
   </IfModule>
   # END WordPress
   ```

   Dòng `E=HTTP_AUTHORIZATION` rất quan trọng: thiếu nó thì Apache nuốt mất header
   `Authorization`, và đăng nhập trang Admin bằng Application Password sẽ luôn báo sai
   mật khẩu dù nhập đúng.

Site đã được viết để **chịu được cả hai trường hợp** — nếu `/wp-json/` không chạy, nó tự
chuyển sang dạng `/?rest_route=/wp/v2/posts` vốn luôn hoạt động. Nhưng vẫn nên sửa cho
đúng vì dạng `/wp-json/` gọn và nhanh hơn.

## 2. Tạo 2 danh mục gốc

Vào **Bài viết → Danh mục** (Posts → Categories), tạo đúng 2 danh mục với slug sau:

| Tên hiển thị   | Slug           | Bài trong danh mục này sẽ hiện ở |
| -------------- | -------------- | -------------------------------- |
| Khoá Học       | `khoa-hoc`     | Trang **Khoá Học**               |
| Review Dự Án   | `review-du-an` | Trang **Review Dự Án**           |

Ngoài 2 danh mục gốc này, mỗi bài nên có thêm **1 danh mục con** mô tả chủ đề
(vd: `Phân tích kỹ thuật`, `Onchain & Macro`, `Bất Động Sản`). Danh mục con này
chính là nhãn xanh hiển thị trên card.

## 3. Gắn thẻ cho bài viết

Đây là chức năng chính ở mục 11. Trong màn hình soạn bài, khung **Thẻ (Tags)**
nằm ở cột phải — gõ tên thẻ rồi Enter, nhiều thẻ cách nhau bởi dấu phẩy.

Thẻ gắn trong WP Admin sẽ tự động:

- hiện thành các pill `#tên-thẻ` trên card bài viết (trang chủ + trang danh sách),
- hiện trong popup chi tiết bài,
- xuất hiện ở khối **"Lọc Theo Thẻ"** trong sidebar kèm số lượng bài,
- bấm vào thẻ bất kỳ là lọc ngay danh sách bài theo thẻ đó,
- được tính vào ô tìm kiếm (gõ tên thẻ cũng ra bài).

Không cần đụng vào code khi thêm thẻ mới.

## 4. Ảnh đại diện & mô tả ngắn

- **Ảnh đại diện (Featured image)**: dùng làm thumbnail card. Nên dùng ảnh ngang 16:9,
  tối thiểu 800px chiều ngang.
- **Mô tả ngắn (Excerpt)**: dùng làm đoạn tóm tắt trên card. Nếu bỏ trống, card sẽ trống
  phần mô tả — nên luôn điền, khoảng 2–3 dòng.

## 5. Bắt buộc cho trang Admin: endpoint lưu cài đặt

Trang Admin (`.../#admin`) lưu toàn bộ chữ & link của các trang vào một option của
WordPress. Thêm đoạn sau vào `functions.php` (hoặc mu-plugin ở mục 6):

```php
<?php
/**
 * Endpoint lưu nội dung các trang cho bảng quản trị của hoangminhthien.com
 * - GET  /wp-json/hmt/v1/settings : ai cũng đọc được (site cần để hiển thị)
 * - POST /wp-json/hmt/v1/settings : chỉ người có quyền sửa bài
 */
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
```

Chưa thêm đoạn này thì trang Admin vẫn đăng nhập và soạn bài viết được, chỉ riêng
nút "Lưu lên WordPress" ở 2 tab Nội dung / Liên kết sẽ báo lỗi 404.

## 6. (Tuỳ chọn) Các trường bổ sung

Một số thông tin đặc thù không có sẵn trong WordPress: số bài học, thời lượng, kết luận
thẩm định, tỷ lệ R/R… Nếu không khai báo, site dùng giá trị mặc định an toàn.

Để khai báo, thêm đoạn sau vào file `functions.php` của theme (hoặc tạo một
mu-plugin trong `wp-content/mu-plugins/hmt-fields.php`):

```php
<?php
/**
 * Mở các custom field của HoangMinhThien ra REST API để site React đọc được.
 */
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
            'auth_callback' => '__return_true',
        ]);
    }
});
```

Sau đó bật **Tuỳ chọn → Trường tuỳ biến (Custom Fields)** trong màn hình soạn bài
để nhập giá trị.

Ghi chú về giá trị hợp lệ:

- `level`: `Người mới` | `Trung cấp` | `Chuyên sâu`
- `verdict`: `Tiềm Năng Cao` | `An Toàn & Bền Vững` | `Cảnh Báo Rủi Ro` | `Cơ Hội Lớn`
  (nhập sai sẽ tự về `Tiềm Năng Cao`)
- `curriculum`, `highlights`, `risks`: mỗi mục một dòng, hoặc ngăn cách bằng dấu `|`.
  Nếu bỏ trống, site tự lấy các gạch đầu dòng `<li>` trong nội dung bài.

## 7. Bật kết nối

Tạo file `.env` ở thư mục gốc dự án (copy từ `.env.example`) và điền:

```
VITE_WP_API_URL="https://cms.hoangminhthien.com"
VITE_WP_COURSES_CATEGORY="khoa-hoc"
VITE_WP_PROJECTS_CATEGORY="review-du-an"
```

Chạy lại dev server:

```bash
npm run dev
```

## 8. Trang Admin

Truy cập bằng cách thêm `#admin` vào cuối địa chỉ site:

```
https://hoangminhthien.com/#admin
```

Trang này **không có link trong menu** — chỉ ai biết địa chỉ mới vào được, và vẫn phải
đăng nhập.

### Tạo Application Password

1. Vào WP Admin → **Người dùng → Hồ sơ**
2. Kéo xuống mục **Application Passwords**
3. Đặt tên bất kỳ (vd: `Trang admin hoangminhthien`) → bấm **Add New**
4. WordPress hiện một chuỗi dạng `abcd EFGH ijkl MNOP qrst UVWX` — **copy ngay**,
   đóng đi là không xem lại được
5. Dán chuỗi đó vào ô Application Password ở màn hình đăng nhập của trang Admin

Đây **không phải** mật khẩu đăng nhập WordPress thường. Có thể thu hồi bất cứ lúc nào
trong chính màn hình đó mà không ảnh hưởng tài khoản.

### Ba tab trong trang Admin

| Tab | Sửa được gì | Lưu ở đâu |
| --- | --- | --- |
| **Nội dung trang** | Tiêu đề & mô tả từng khối trên trang chủ, toàn bộ trang Giới Thiệu, 4 ô thành tựu, chữ trên các nút, nội dung footer | Option `hmt_site_settings` |
| **Liên kết** | Link + số follower 5 kênh MXH, email, link Telegram | Option `hmt_site_settings` |
| **Bài viết** | Danh sách bài, soạn bài mới bằng WYSIWYG, danh mục, thẻ, ảnh đại diện, trạng thái đăng | Bài viết WordPress |

Ở 2 tab đầu, nút **Xem trước** áp dụng thay đổi ngay trên site để xem thử (chỉ trong
trình duyệt hiện tại), còn **Lưu lên WordPress** mới ghi vĩnh viễn cho mọi khách truy cập.

### Lưu ý bảo mật

Site là SPA thuần nên mọi lời gọi API chạy từ trình duyệt. Thông tin đăng nhập chỉ nằm
trong `sessionStorage` — đóng tab là mất, không lưu vĩnh viễn trên máy. Vì vậy:

- Chỉ đăng nhập trên máy tin cậy, tránh máy công cộng
- Domain WordPress **bắt buộc dùng HTTPS**
- Nên tạo một tài khoản WP riêng với vai trò **Editor** (thay vì Administrator) để dùng
  cho trang Admin — quyền vừa đủ để sửa nội dung, hạn chế thiệt hại nếu lộ

## 9. Cần lưu ý về CORS

Nếu site React và WordPress khác domain (vd `hoangminhthien.com` và
`cms.hoangminhthien.com`), trình duyệt cần WordPress cho phép CORS. Đọc bài công khai
thường đã chạy sẵn; riêng phần **ghi từ trang Admin** cần thêm đoạn sau vào
`functions.php`:

```php
<?php
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        header('Access-Control-Allow-Origin: https://hoangminhthien.com');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
```

Đổi `https://hoangminhthien.com` thành domain thật của site. Khi chạy `npm run dev` ở
máy, đổi tạm thành `http://localhost:3000`.

## 10. Khi có sự cố

Site được thiết kế để **không bao giờ trắng trang**:

- Chưa cấu hình `VITE_WP_API_URL` → dùng dữ liệu tĩnh, trang Admin báo "Chưa kết nối
  WordPress".
- WordPress sập / sai domain / lỗi mạng → tự quay về dữ liệu tĩnh và nội dung mặc định,
  ghi cảnh báo trong Console trình duyệt.
- WordPress trả về 0 bài → giữ dữ liệu mẫu để trang không rỗng.
- Chưa thêm endpoint ở mục 5 → site vẫn chạy bằng nội dung mặc định, chỉ nút "Lưu lên
  WordPress" báo 404.

Các file liên quan:

| File | Việc |
| --- | --- |
| [src/lib/wordpress.ts](src/lib/wordpress.ts) | Đọc bài viết công khai |
| [src/lib/wordpressAdmin.ts](src/lib/wordpressAdmin.ts) | Đăng nhập & ghi dữ liệu lên WP |
| [src/hooks/useContent.ts](src/hooks/useContent.ts) | Chuyển nguồn bài viết WP ↔ tĩnh |
| [src/hooks/useSiteSettings.tsx](src/hooks/useSiteSettings.tsx) | Chuyển nguồn nội dung chữ WP ↔ mặc định |
| [src/data/siteSettings.ts](src/data/siteSettings.ts) | Toàn bộ nội dung mặc định |
| [src/pages/AdminPage.tsx](src/pages/AdminPage.tsx) | Trang Admin |
