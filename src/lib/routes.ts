/**
 * Đường dẫn của từng trang. Gom về một chỗ để đổi đường dẫn chỉ phải sửa ở đây.
 *
 * Hai đường dẫn khoá học và review dự án cố ý trùng với slug danh mục gốc bên
 * WordPress (khoa-hoc, review-du-an) cho dễ nhớ và dễ đối chiếu.
 */
export const ROUTES = {
  home: '/',
  about: '/gioi-thieu',
  courses: '/khoa-hoc',
  projects: '/review-du-an',
  contact: '/lien-he',
  admin: '/admin',
} as const;

export const courseUrl = (slug: string) => `${ROUTES.courses}/${slug}`;
export const projectUrl = (slug: string) => `${ROUTES.projects}/${slug}`;

/** Dấu thanh tiếng Việt sau khi tách bằng normalize('NFD') */
const COMBINING_MARKS = /[̀-ͯ]/g;

/**
 * Biến tiêu đề tiếng Việt thành slug dùng cho đường dẫn.
 * Chỉ dùng cho dữ liệu mẫu đi kèm mã nguồn — bài từ WordPress đã có slug sẵn.
 *
 *   'Phân tích kỹ thuật thực chiến' -> 'phan-tich-ky-thuat-thuc-chien'
 */
export const slugify = (text: string): string =>
  text
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/[đ]/g, 'd') // đ
    .replace(/[Đ]/g, 'd') // Đ
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
