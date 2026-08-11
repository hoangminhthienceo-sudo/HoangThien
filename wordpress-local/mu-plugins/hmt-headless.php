<?php
/**
 * Plugin Name: HoangMinhThien Local Dev
 * Description: CHỈ dùng cho môi trường phát triển trên máy. Không cài lên hosting thật.
 *
 * Toàn bộ chức năng thật nằm ở plugin hoangminhthien-connector (thư mục
 * wordpress-plugin/). File này chỉ nới đúng một quy định của WordPress để
 * chạy được trên http://localhost khi chưa có HTTPS.
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * WordPress chỉ cho dùng Mật khẩu ứng dụng khi website chạy HTTPS.
 * Bản local chạy http://localhost nên phải nới ra, nếu không sẽ không đăng nhập
 * được trang quản trị của website để thử nghiệm.
 *
 * Trên hosting thật KHÔNG cần và KHÔNG NÊN có đoạn này — hãy bật SSL cho tử tế.
 */
add_filter('wp_is_application_passwords_available', function ($available) {
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if (strpos($host, 'localhost') === 0 || strpos($host, '127.0.0.1') === 0) {
        return true;
    }
    return $available;
});
