# Hướng dẫn sử dụng website HoangMinhThien

Tài liệu này viết cho người không rành kỹ thuật. Cứ làm tuần tự từ trên xuống,
không bỏ bước nào.

**Đọc trước 30 giây để hiểu hệ thống:**

Website gồm 2 phần tách rời nhau:

| Phần | Là gì | Ở đâu |
| --- | --- | --- |
| **Website** | Cái khách vào xem | Vercel |
| **WordPress** | Nơi gõ bài, sửa chữ | Hosting riêng |

Website tự động lấy bài từ WordPress mỗi lần có người truy cập. Nghĩa là
**viết bài xong là hiện ngay, không cần làm gì thêm.**

---

# PHẦN 1 — Chuẩn bị WordPress

Làm một lần duy nhất, khoảng 30 phút.

## Bước 1.1 — Mua hosting

Cần một chỗ để chạy WordPress. Vào một trong các nhà cung cấp sau, mua gói rẻ nhất
có hỗ trợ WordPress (khoảng 500.000đ–1.500.000đ/năm):

- Hostinger (hostinger.vn)
- AZDIGI (azdigi.com)
- Tino Host (tinohost.com)

Khi mua, nhớ **yêu cầu bật SSL/HTTPS** — đây là bắt buộc, thiếu nó trang quản trị
sẽ không đăng nhập được. Hầu hết nhà cung cấp bật sẵn miễn phí, cứ nhắn hỗ trợ hỏi
cho chắc.

**Nên dùng tên miền phụ.** Nếu website chính là `hoangminhthien.com` thì đặt
WordPress ở `cms.hoangminhthien.com`. Nhắn bộ phận hỗ trợ của hosting: *"Cho mình
tạo subdomain cms.hoangminhthien.com và cài WordPress lên đó"* — họ làm giúp.

## Bước 1.2 — Cài WordPress

Hầu hết hosting có nút cài WordPress tự động. Tìm mục tên **"WordPress"**,
**"Auto Installer"** hoặc **"Softaculous"** trong trang quản lý hosting, bấm cài.

Trong lúc cài, nó hỏi:

| Ô | Điền gì |
| --- | --- |
| Site Name | HoangMinhThien |
| Admin Username | Tự đặt — **ghi lại ngay** |
| Admin Password | Tự đặt, nên dài và khó đoán — **ghi lại ngay** |
| Admin Email | Email của bạn |

> **Ghi 2 dòng Username và Password vào chỗ an toàn.** Mất là phải nhờ hosting khôi
> phục, rất mất công.

## Bước 1.3 — Đăng nhập WordPress

Mở trình duyệt, vào địa chỉ (thay bằng tên miền thật của bạn):

```
https://cms.hoangminhthien.com/wp-admin
```

Nhập Username và Password vừa đặt ở bước 1.2.

Vào được là thấy màn hình quản trị màu xám, bên trái có menu dọc. Đó là WordPress.

## Bước 1.4 — Bật đường dẫn tĩnh ⚠️ QUAN TRỌNG NHẤT

**Bỏ qua bước này là website sẽ không lấy được bài.** Đây là lỗi hay gặp nhất.

1. Nhìn menu bên trái, kéo xuống cuối, bấm **Cài đặt** (Settings)
2. Bấm mục con **Đường dẫn tĩnh** (Permalinks)
3. Chọn ô tròn **Tên bài viết** (Post name)
4. Kéo xuống dưới cùng, bấm **Lưu thay đổi** (Save Changes)

> Bấm **Lưu thay đổi** kể cả khi thấy nó đã chọn sẵn "Tên bài viết". Thao tác bấm
> Lưu mới là thứ khiến WordPress ghi lại file cấu hình cần thiết.

## Bước 1.5 — Cài plugin kết nối

Bạn được gửi kèm một file tên **`hoangminhthien-connector.zip`**. Nếu chưa có, hỏi
người làm website.

1. Menu bên trái, bấm **Plugin** (Plugins)
2. Bấm nút **Cài mới** (Add New) ở trên cùng
3. Bấm nút **Tải plugin lên** (Upload Plugin) ở trên cùng
4. Bấm **Chọn tệp** (Choose File), chọn file `hoangminhthien-connector.zip`
5. Bấm **Cài đặt ngay** (Install Now)
6. Đợi vài giây, bấm **Kích hoạt Plugin** (Activate Plugin)

Xong bước này, WordPress tự tạo sẵn 2 danh mục **Khoá Học** và **Review Dự Án**.

## Bước 1.6 — Khai báo địa chỉ website

1. Menu bên trái, bấm **Cài đặt** → **HoangMinhThien**
2. Ở ô **Địa chỉ website**, gõ địa chỉ website chính, ví dụ:
   ```
   https://hoangminhthien.com
   ```
   Không có dấu `/` ở cuối.
3. Bấm **Lưu thay đổi**

> Chưa có website trên Vercel? Cứ để trống, quay lại điền sau khi làm xong Phần 2.

## Bước 1.7 — Kiểm tra

Vẫn ở trang **Cài đặt → HoangMinhThien**, nhìn bảng **Tình trạng** phía trên.

**Tất cả các dòng phải là dấu ✅ màu xanh.** Dòng nào còn ⚠️ màu vàng thì đọc chữ
bên cạnh, nó chỉ luôn cách sửa.

Ở dưới cùng trang có một khung chữ màu xám ghi địa chỉ WordPress của bạn —
**chép lại đoạn đó**, Phần 2 sẽ cần dùng.

---

# PHẦN 2 — Đưa website lên mạng (Vercel)

Làm một lần duy nhất, khoảng 15 phút.

## Bước 2.1 — Tạo tài khoản Vercel

1. Vào **vercel.com**
2. Bấm **Sign Up**
3. Chọn **Continue with GitHub**
4. Nếu chưa có GitHub, nó sẽ hướng dẫn tạo — cứ làm theo
5. Chọn gói **Hobby** (miễn phí)

## Bước 2.2 — Đưa mã nguồn vào

Bước này cần người làm website hỗ trợ: họ sẽ cấp cho bạn quyền vào kho mã nguồn
trên GitHub. Nhắn họ: *"Cho mình quyền truy cập repo website để kết nối Vercel"*.

## Bước 2.3 — Tạo dự án trên Vercel

1. Ở trang chủ Vercel, bấm **Add New** → **Project**
2. Tìm dòng có tên kho mã nguồn website, bấm **Import**
3. Màn hình cấu hình hiện ra — **chưa bấm Deploy vội**, làm bước 2.4 trước

## Bước 2.4 — Khai báo địa chỉ WordPress ⚠️ QUAN TRỌNG

Vẫn ở màn hình đó, tìm mục **Environment Variables** (Biến môi trường), bấm mở ra.

Thêm lần lượt **3 dòng** sau. Mỗi dòng gõ tên vào ô **Key**, giá trị vào ô **Value**,
rồi bấm **Add**:

| Key (gõ chính xác từng ký tự) | Value |
| --- | --- |
| `VITE_WP_API_URL` | Địa chỉ WordPress đã chép ở bước 1.7, ví dụ `https://cms.hoangminhthien.com` |
| `VITE_WP_COURSES_CATEGORY` | `khoa-hoc` |
| `VITE_WP_PROJECTS_CATEGORY` | `review-du-an` |

> Gõ sai một chữ là website không lấy được bài. Kiểm tra kỹ, đặc biệt là dấu gạch
> ngang `-` và dấu gạch dưới `_`.

## Bước 2.5 — Chạy

Bấm nút **Deploy**. Đợi 1–2 phút, thấy hình pháo hoa là xong.

Bấm **Continue to Dashboard**, sẽ thấy địa chỉ tạm dạng
`ten-du-an.vercel.app`. Mở thử xem website đã lên chưa.

## Bước 2.6 — Gắn tên miền thật

1. Trong dự án Vercel, bấm tab **Settings** → **Domains**
2. Gõ `hoangminhthien.com`, bấm **Add**
3. Vercel hiện ra vài dòng thông tin kỹ thuật — **chụp màn hình gửi cho nơi bán tên
   miền**, nhắn họ: *"Cho mình trỏ tên miền theo thông số này"*
4. Đợi 5 phút đến vài tiếng để tên miền chạy

## Bước 2.7 — Quay lại WordPress

Sau khi có tên miền thật, quay lại **Cài đặt → HoangMinhThien** trong WordPress,
điền địa chỉ website thật vào ô **Địa chỉ website** rồi Lưu (nếu bước 1.6 còn bỏ trống).

---

# PHẦN 3 — Tài khoản và phân quyền

## Có 2 loại tài khoản

| Loại | Làm được gì | Vai trò trong WordPress |
| --- | --- | --- |
| **Quản trị viên** | Mọi thứ: sửa chữ trên các trang, đổi link mạng xã hội, viết bài, xoá bài | Quản trị viên (Administrator) |
| **Nhân viên** | Chỉ viết bài và sửa bài của mình | Tác giả (Author) |

Nhân viên đăng nhập vào sẽ **chỉ nhìn thấy mục Bài viết**, không thấy phần sửa nội
dung trang. Đây không phải chỉ ẩn đi cho gọn — WordPress chặn thật ở phía máy chủ,
nhân viên không có cách nào sửa được nội dung trang.

## Bước 3.1 — Tạo tài khoản cho nhân viên

Làm trong WordPress, tài khoản Quản trị viên:

1. Menu bên trái, bấm **Thành viên** (Users) → **Thêm mới** (Add New)
2. Điền:
   - **Tên đăng nhập**: tên không dấu, ví dụ `nhanvien1`
   - **Email**: email của nhân viên đó
   - **Mật khẩu**: bấm nút tạo mật khẩu tự động, chép lại
3. Ở ô **Vai trò** (Role) — chọn **Tác giả** (Author)
4. Bấm **Thêm thành viên mới**

> **Chọn vai trò nào?**
> - **Tác giả (Author)** — viết bài, tự đăng, tự tải ảnh. Dùng cái này nếu tin
>   nhân viên.
> - **Cộng tác viên (Contributor)** — viết bài nhưng **không tự đăng được**, bài
>   phải chờ bạn duyệt, và **không tải ảnh lên được**. Dùng cái này nếu muốn kiểm
>   duyệt trước khi bài lên website.

Gửi tên đăng nhập và mật khẩu cho nhân viên.

## Bước 3.2 — Tạo Mật khẩu ứng dụng

**Mỗi người tự làm bước này cho tài khoản của mình.** Đây là mật khẩu riêng để vào
trang quản trị của website, khác với mật khẩu WordPress.

1. Đăng nhập WordPress
2. Menu bên trái, bấm **Thành viên** → **Hồ sơ** (Profile)
3. Kéo xuống gần cuối trang, tìm mục **Mật khẩu ứng dụng** (Application Passwords)
4. Ở ô tên, gõ gì cũng được, ví dụ `Trang quan tri`
5. Bấm **Thêm mật khẩu ứng dụng mới**
6. Màn hình hiện một chuỗi dạng:
   ```
   abcd EFGH ijkl MNOP qrst UVWX
   ```
   **Chép lại ngay.** Đóng trang đi là không xem lại được nữa, phải tạo cái mới.

> Không thấy mục Mật khẩu ứng dụng? Website chưa bật HTTPS. Nhắn hosting bật SSL.

## Bước 3.3 — Đăng nhập trang quản trị website

1. Mở website, thêm `/#admin` vào cuối địa chỉ:
   ```
   https://hoangminhthien.com/#admin
   ```
2. **Tên đăng nhập**: tên đăng nhập WordPress
3. **Application Password**: chuỗi vừa chép ở bước 3.2 — **không phải** mật khẩu
   WordPress thường
4. Bấm **Đăng nhập**

Vào được sẽ thấy tên mình và một nhãn ghi rõ **Quản trị viên** hoặc **Nhân viên**.

> Địa chỉ này không có trong menu website, khách vào xem không thấy. Nhưng ai biết
> địa chỉ vẫn phải đăng nhập mới vào được.

---

# PHẦN 4 — Dùng hằng ngày

## Viết bài mới

1. Vào `https://hoangminhthien.com/#admin`, đăng nhập
2. Bấm tab **Bài viết** → nút **Viết bài mới**
3. Gõ **tiêu đề**
4. Gõ **nội dung** ở khung soạn thảo (có nút in đậm, in nghiêng, chèn ảnh...)
5. Gõ **Mô tả ngắn** — đây là đoạn hiện trên trang chủ, nên viết 2–3 dòng
6. Bên phải, khung **Danh mục**: **bắt buộc tích một trong hai** dòng có nhãn `GỐC`
   - Tích **Khoá Học** → bài hiện ở trang Khoá Học
   - Tích **Review Dự Án** → bài hiện ở trang Review Dự Án
7. Bên phải, khung **Ảnh đại diện**: bấm **Chọn ảnh từ máy**
8. Bên phải, khung **Thẻ**: gõ tên thẻ rồi bấm dấu **+**. Thẻ giúp khách lọc bài
9. Bấm **Lưu lên WordPress**

Sau khi lưu, màn hình báo rõ bài sẽ hiện ở trang nào. Mở website xem là thấy ngay.

> **Bài không hiện ngoài website?** Gần như luôn là do một trong hai:
> - Ô trạng thái (cạnh nút Lưu) đang để **Bản nháp** → đổi sang **Đăng công khai**
> - Chưa tích **Khoá Học** hay **Review Dự Án** ở khung Danh mục

## Sửa chữ trên các trang

Chỉ Quản trị viên làm được.

1. Vào `#admin`, tab **Nội dung trang**
2. Sửa các ô — tiêu đề, mô tả, con số thành tựu, nội dung trang Giới Thiệu...
3. Bấm **Xem trước** để xem thử (chỉ mình bạn thấy)
4. Ưng rồi bấm **Lưu lên WordPress** — lúc này mọi khách mới thấy

## Đổi link mạng xã hội

Tab **Liên kết** — sửa link Facebook, TikTok, YouTube, Telegram, X, số người theo
dõi, email liên hệ. Xong bấm **Lưu lên WordPress**.

## Khi nào phải deploy lại trên Vercel?

**Gần như không bao giờ.** Viết bài, sửa chữ, đổi link — tất cả hiện ngay, không
cần đụng vào Vercel.

Chỉ cần deploy lại khi **đổi địa chỉ WordPress** (3 biến ở bước 2.4). Cách làm:

1. Vào Vercel, mở dự án
2. Tab **Settings** → **Environment Variables**, sửa giá trị, bấm **Save**
3. Tab **Deployments**, bấm dấu **⋯** ở dòng trên cùng → **Redeploy** → **Redeploy**

---

# PHẦN 5 — Gặp sự cố

| Hiện tượng | Cách xử lý |
| --- | --- |
| Website hiện bài mẫu cũ, không thấy bài mình viết | Kiểm tra 3 biến ở bước 2.4 gõ đúng chưa, rồi Redeploy |
| Bài viết xong không hiện | Xem lại 2 nguyên nhân ở Phần 4 (trạng thái + danh mục) |
| Không đăng nhập được `#admin`, báo sai mật khẩu | Đang dùng nhầm mật khẩu WordPress. Phải dùng **Mật khẩu ứng dụng** ở bước 3.2 |
| Không tìm thấy mục Mật khẩu ứng dụng | Website chưa có HTTPS — nhắn hosting bật SSL |
| Trang **Cài đặt → HoangMinhThien** báo ⚠️ vàng | Đọc chữ bên cạnh dòng đó, nó chỉ luôn cách sửa |
| Bấm Lưu ở tab Nội dung báo lỗi 404 | Plugin chưa cài hoặc chưa kích hoạt — làm lại bước 1.5 |
| Nhân viên không thấy tab Nội dung trang | Đúng như thiết kế. Nhân viên chỉ được viết bài |

**Website không bao giờ trắng trang.** Nếu WordPress hỏng hoặc mất mạng, website tự
hiện lại nội dung mẫu có sẵn thay vì báo lỗi cho khách.

---

# Bảng ghi thông tin

In trang này ra, điền vào và cất chỗ an toàn:

```
Địa chỉ WordPress:      https://_________________________________

Tài khoản WordPress
  Tên đăng nhập:        _________________________________
  Mật khẩu:             _________________________________

Mật khẩu ứng dụng
  (dùng cho #admin):    _________________________________

Địa chỉ trang quản trị: https://_________________/#admin

Tài khoản Vercel:       _________________________________
Nhà cung cấp hosting:   _________________________________
```

> Đừng gửi các thông tin này qua tin nhắn công khai. Nếu lỡ lộ Mật khẩu ứng dụng,
> vào **Thành viên → Hồ sơ**, xoá mật khẩu cũ đi rồi tạo cái mới — không ảnh hưởng
> gì đến tài khoản.
