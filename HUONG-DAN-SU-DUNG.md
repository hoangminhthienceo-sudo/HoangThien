# Hướng dẫn sử dụng website HoangMinhThien

> **Bản dành cho khách hàng (đọc trên web, in PDF được):**
> https://claude.ai/code/artifact/8cae5c4b-ce1c-4472-9d5f-67897bccd4ab
>
> File này là bản markdown tương đương, kèm thêm phần thông tin kỹ thuật ở cuối
> dành cho người bảo trì. Hướng dẫn cài đặt lại từ đầu nằm ở [WORDPRESS.md](WORDPRESS.md).

Hệ thống đã cài đặt và chạy xong. Tài liệu này hướng dẫn cách đăng nhập và tự quản lý
nội dung.

## Hai địa chỉ cần nhớ

| | Là gì | Địa chỉ |
| --- | --- | --- |
| **Website** | Cái khách vào xem | `hoangminhthien.com` |
| **WordPress** | Nơi lưu bài viết và hình ảnh | `cms.hoangminhthien.com` |

Website tự lấy bài từ WordPress mỗi lần có người truy cập, nên **viết bài xong là hiện
ngay**. Không phải bấm đăng tải, không phải chờ ai duyệt, không phải nhờ kỹ thuật.

---

# Phần 1 — Đăng nhập

**Có hai chỗ đăng nhập, dùng hai mật khẩu khác nhau.** Đây là chỗ hay nhầm nhất.

| Đăng nhập ở đâu | Dùng mật khẩu nào | Để làm gì |
| --- | --- | --- |
| `cms.hoangminhthien.com/wp-admin` | Mật khẩu WordPress thường | Quản lý tài khoản, tạo mật khẩu ứng dụng |
| `hoangminhthien.com/admin` | **Mật khẩu ứng dụng** | Viết bài, sửa nội dung — dùng hằng ngày |

## Bước 1 — Đăng nhập WordPress

```
https://cms.hoangminhthien.com/wp-admin
```

Nhập tên đăng nhập và mật khẩu WordPress được cấp.

Đây **chưa phải** nơi làm việc hằng ngày. Chỉ vào đây để tạo mật khẩu ứng dụng ở bước 2
và quản lý tài khoản nhân viên.

## Bước 2 — Tạo Mật khẩu ứng dụng ⚠️

Mật khẩu ứng dụng là chuỗi riêng để vào trang quản trị website, **khác** mật khẩu
WordPress ở bước 1.

1. Menu trái → **Thành viên** (Users) → **Hồ sơ** (Profile)
2. Kéo xuống gần cuối trang, tìm **Mật khẩu ứng dụng** (Application Passwords)
3. Ô tên gõ gì cũng được, ví dụ `Trang quan tri`
4. Bấm **Thêm mật khẩu ứng dụng mới**
5. Màn hình hiện chuỗi dạng `abcd EFGH ijkl MNOP qrst UVWX`

> **Chép chuỗi đó lại ngay và cất kỹ.** Đóng trang đi là không xem lại được — mất thì
> phải tạo cái mới, không lấy lại được cái cũ.

## Bước 3 — Vào trang quản trị website

```
https://hoangminhthien.com/admin
```

- **Tên đăng nhập**: giống tên đăng nhập WordPress
- **Application Password**: dán chuỗi vừa chép ở bước 2

Vào được sẽ thấy tên mình ở góc trên, kèm nhãn **Quản trị viên** hoặc **Nhân viên**.

Địa chỉ này không có trong menu website, khách vào xem không nhìn thấy. Nhưng ai biết
địa chỉ vẫn phải đăng nhập mới vào được.

> **Muốn đổi sang tài khoản khác phải bấm Đăng xuất trước.** Nếu không, lần sau mở
> trang sẽ tự vào lại bằng tài khoản cũ.

---

# Phần 2 — Viết bài

1. Vào `hoangminhthien.com/admin`, đăng nhập
2. Tab **Bài viết** → **Viết bài mới**
3. Gõ **tiêu đề**
4. Gõ **nội dung** ở khung soạn thảo (xem công cụ bên dưới)
5. Gõ **Mô tả ngắn** — đoạn tóm tắt hiện trên trang chủ, nên viết 2–3 dòng
6. Bên phải, khung **Danh mục**: tích một trong hai dòng có nhãn **GỐC**
7. Bên phải, khung **Ảnh đại diện**: bấm **Chọn ảnh từ máy**
8. Bên phải, khung **Thẻ**: gõ tên thẻ rồi bấm **+**
9. Bấm **Lưu lên WordPress**

## Công cụ trong khung soạn thảo

| Nhóm | Làm được gì |
| --- | --- |
| Định dạng chữ | In đậm, in nghiêng, gạch chân, gạch ngang, tô nền chữ |
| Tiêu đề | Tiêu đề lớn, tiêu đề nhỏ |
| Canh lề | Canh trái, canh giữa, canh phải |
| Danh sách | Gạch đầu dòng, đánh số, trích dẫn, khối mã, đường kẻ ngang |
| Chèn | Link, **ảnh từ máy**, **video YouTube**, **bảng** |
| Khác | Hoàn tác, làm lại |

**Chèn ảnh vào giữa bài**: bấm nút ảnh trên thanh công cụ, chọn ảnh từ máy — ảnh tự
tải lên WordPress rồi chèn vào đúng chỗ con trỏ đang đứng. Khác với *Ảnh đại diện* bên
phải, cái đó chỉ dùng làm ảnh bìa ngoài trang chủ.

**Chèn bảng**: bấm nút bảng, mặc định ra bảng 3×3 có hàng tiêu đề. Khi con trỏ nằm
trong bảng sẽ hiện thêm một hàng công cụ riêng: thêm/xoá cột, thêm/xoá hàng, bật tắt
hàng tiêu đề, gộp tách ô, xoá cả bảng. Kéo đường viền giữa hai cột để chỉnh độ rộng.

**Chèn video YouTube**: bấm nút YouTube rồi dán đường dẫn video. Video hiện ngay trong
bài, khách xem không cần rời trang.

> Bảng quá rộng trên điện thoại sẽ tự cuộn ngang trong khung, không làm vỡ trang.

## Bài viết xong nhưng không thấy trên website ⚠️

Gần như luôn là một trong hai lý do, kiểm tra theo thứ tự:

1. **Trạng thái đang để Bản nháp.** Ô trạng thái nằm cạnh nút Lưu. Đổi sang
   **Đăng công khai** rồi lưu lại.
2. **Chưa chọn danh mục gốc.** Phải tích **Khoá Học** hoặc **Review Dự Án** — hai dòng
   có nhãn `GỐC` màu xanh.

Khung Danh mục có sẵn ô báo: chưa chọn thì cảnh báo vàng, chọn rồi thì ô xanh ghi bài
sẽ hiện ở trang nào.

## Hai loại bài

| Tích danh mục | Bài hiện ở |
| --- | --- |
| Khoá Học | Trang Khoá Học và khối "Khóa Học Thực Chiến Mới Nhất" ở trang chủ |
| Review Dự Án | Trang Review Dự Án và khối "Phân Tích & Review Dự Án Nổi Bật" ở trang chủ |

Nên tích thêm một danh mục chủ đề nữa — đó là nhãn xanh hiển thị trên thẻ bài.

## Đường dẫn của bài viết

Mỗi bài có địa chỉ riêng, chia sẻ được lên Facebook hay Zalo:

| Loại | Địa chỉ |
| --- | --- |
| Trang khoá học | `hoangminhthien.com/khoa-hoc` |
| Một bài khoá học | `hoangminhthien.com/khoa-hoc/ten-bai-viet` |
| Trang review | `hoangminhthien.com/review-du-an` |
| Một bài review | `hoangminhthien.com/review-du-an/ten-bai-viet` |

Phần `ten-bai-viet` lấy từ ô **Đường dẫn tĩnh** của bài trong WordPress, tự sinh từ tiêu
đề. Muốn đổi thì sửa trong WordPress khi soạn bài.

> Đổi đường dẫn của bài đã đăng sẽ làm hỏng các link đã chia sẻ trước đó. Cân nhắc
> trước khi sửa.

## Thẻ

Thẻ hiện thành pill dạng `#Phân tích kỹ thuật` trên thẻ bài. Khách bấm vào là lọc ra
tất cả bài cùng thẻ. Gõ tên thẻ mới rồi bấm **+** là tạo được ngay, không cần vào
WordPress.

---

# Phần 3 — Sửa nội dung website

Chỉ tài khoản Quản trị viên làm được.

## Sửa chữ trên các trang

Tab **Nội dung trang** → sửa các ô → **Xem trước** (chỉ mình bạn thấy) → **Lưu lên
WordPress** (khách mới thấy).

Lỡ sửa hỏng: bấm **Về mặc định** rồi **Lưu lên WordPress**.

## Đổi ảnh

| Ảnh | Sửa ở đâu | Nên dùng |
| --- | --- | --- |
| Chân dung đầu trang | Nội dung trang → Khối Hero | Dọc 4:5, mặt ở nửa trên |
| Ảnh sự kiện & hội thảo | Nội dung trang → Hình ảnh sự kiện | Ngang 16:9, nên để 4 tấm |
| Ảnh từng bài viết | Bài viết → Ảnh đại diện | Ngang 16:9, rộng từ 800px |

Ảnh sự kiện còn sửa được tiêu đề, chú thích, thêm bớt số lượng, và **gắn link cho ảnh**.

### Gắn link cho ảnh sự kiện

Ô **Bấm vào ảnh thì đi đâu** nằm ngay dưới mỗi ảnh:

| Điền gì | Khách bấm vào ảnh sẽ |
| --- | --- |
| Bỏ trống | Không có gì xảy ra, ảnh chỉ để xem |
| `/khoa-hoc` | Chuyển sang trang Khoá Học của website |
| `/review-du-an` | Chuyển sang trang Review Dự Án |
| `https://facebook.com/...` | Mở link ngoài trong tab mới |

Ảnh có gắn link sẽ hiện một mũi tên nhỏ ở góc trên khi rê chuột vào, để khách biết bấm
được.

## Đổi liên kết mạng xã hội

Tab **Liên kết** — link và số người theo dõi của Facebook, TikTok, YouTube, Telegram,
X, cùng email và link Telegram liên hệ. Mỗi kênh có nút **Mở thử** để kiểm tra link.

---

# Phần 4 — Tài khoản nhân viên

| Loại | Làm được gì | Vai trò WordPress |
| --- | --- | --- |
| Quản trị viên | Mọi thứ | Administrator |
| Nhân viên | Chỉ viết và sửa bài | Author |

Nhân viên đăng nhập chỉ thấy mục **Bài viết**. Đây không phải chỉ ẩn cho gọn — hệ thống
chặn thật ở phía máy chủ.

## Tạo tài khoản nhân viên

Trong WordPress, bằng tài khoản Quản trị viên:

1. **Thành viên** → **Thêm mới**
2. **Tên đăng nhập**: chữ không dấu, vd `nhanvien1`
3. **Email**, **Mật khẩu** (bấm nút tạo tự động, chép lại)
4. Ô **Vai trò**: chọn **Tác giả**
5. **Thêm thành viên mới**

> Muốn kiểm duyệt bài trước khi lên website: chọn **Cộng tác viên** thay vì Tác giả.
> Nhân viên vẫn viết bài nhưng không tự đăng được, bài chuyển sang Chờ duyệt.

Rồi bảo nhân viên tự làm **Phần 1 bước 2 và 3**. Mỗi người tự tạo mật khẩu ứng dụng
riêng, không dùng chung được.

---

# Phần 5 — Gặp sự cố

| Hiện tượng | Cách xử lý |
| --- | --- |
| Đăng nhập `/admin` báo sai mật khẩu dù gõ đúng | Đang dùng nhầm mật khẩu WordPress. Phải dùng Mật khẩu ứng dụng |
| Vào `/admin` thấy sẵn tài khoản người khác | Phiên cũ còn lưu. Bấm Đăng xuất rồi đăng nhập lại |
| Viết bài xong không thấy trên website | Xem Phần 2 — trạng thái và danh mục |
| Nhân viên không thấy tab Nội dung trang | Đúng như thiết kế |
| Sửa chữ xong website vẫn chưa đổi | Kiểm tra đã bấm **Lưu lên WordPress** chưa, hay mới chỉ Xem trước |
| Website hiện nội dung mẫu lạ | WordPress đang gặp sự cố. Liên hệ người làm website |

**Website không bao giờ trắng trang.** WordPress hỏng hoặc mất mạng thì website tự hiện
lại nội dung mẫu có sẵn thay vì báo lỗi cho khách.

---

# Phụ lục — Thông tin kỹ thuật

Phần này dành cho người bảo trì, khách hàng không cần đọc.

## Hệ thống thực tế đang chạy

| Thành phần | Nhà cung cấp | Ghi chú |
| --- | --- | --- |
| Tên miền `hoangminhthien.com` | GoDaddy | Nameserver trỏ sang Vercel |
| DNS | Vercel | `ns1/ns2.vercel-dns.com` — bản ghi `cms` kiểu A trỏ về IP Hostinger |
| Website | Vercel | Deploy tự động từ nhánh `main` của repo |
| WordPress | Hostinger | Gói 48 tháng, `cms.hoangminhthien.com`, LiteSpeed + PHP 8.3 |

## Biến môi trường trên Vercel

```
VITE_WP_API_URL=https://cms.hoangminhthien.com
VITE_WP_COURSES_CATEGORY=khoa-hoc
VITE_WP_PROJECTS_CATEGORY=review-du-an
```

Đây là biến build-time, đổi giá trị phải **Redeploy** mới có tác dụng. Sửa nội dung hay
viết bài thì không cần deploy lại.

## Plugin WordPress

`wordpress-plugin/hoangminhthien-connector.zip` — cài qua Plugin → Tải plugin lên.

Plugin lo: mở custom field ra REST API, endpoint `hmt/v1/settings` lưu nội dung website,
CORS, tự tạo 2 danh mục gốc, chặn cache LiteSpeed lên endpoint cài đặt, và trang
**Cài đặt → HoangMinhThien** có bảng tự kiểm tra.

Ô **Địa chỉ website** trong trang cài đặt plugin phải điền địa chỉ site Vercel
(`https://hoangminhthien.com`), **không phải** địa chỉ WordPress. Bỏ trống thì CORS
không được cấu hình và website không lấy được bài.

## Lưu ý khi bảo trì

- **LiteSpeed cache**: hosting cache REST API rất lâu. Plugin đã chặn cache cho endpoint
  cài đặt, nhưng nếu thêm endpoint mới thì nhớ gọi `hmt_no_cache()`.
- **Đường dẫn tĩnh**: permalink ở chế độ Plain sẽ làm `/wp-json/` trả 404. Code đã tự
  chuyển sang dạng `?rest_route=` khi gặp trường hợp này, nhưng nên để permalink đúng.
- **Đổi địa chỉ WordPress**: phải sửa cả `VITE_WP_API_URL` trên Vercel lẫn Địa chỉ
  website trong plugin, rồi Redeploy.
