import DOMPurify from 'dompurify';
import { slugify } from './routes';

export interface PreparedPost {
  /** HTML đã lọc sạch và đã gắn id cho từng tiêu đề */
  html: string;
}

const EMPTY: PreparedPost = { html: '' };

/**
 * Chuẩn bị nội dung bài viết trước khi hiển thị:
 *
 * 1. Lọc HTML — nội dung do người dùng WordPress soạn. WordPress đã chặn thẻ
 *    script với vai trò Tác giả, nhưng Quản trị viên vẫn đăng được HTML thô và
 *    plugin cài thêm cũng có thể chèn nội dung. Đây là lớp chặn cuối.
 * 2. Gắn id cho mỗi tiêu đề, để chia sẻ được link tới thẳng một mục
 *    (dạng .../bai-viet#ten-muc).
 */
export const preparePost = (rawHtml: string): PreparedPost => {
  if (!rawHtml?.trim()) return EMPTY;

  const clean = DOMPurify.sanitize(rawHtml, {
    // Cho phép nhúng video YouTube — thẻ iframe mặc định bị chặn
    ADD_TAGS: ['iframe'],
    ADD_ATTR: [
      'allow',
      'allowfullscreen',
      'frameborder',
      'scrolling',
      'target',
      'colspan',
      'rowspan',
    ],
  });

  const doc = new DOMParser().parseFromString(clean, 'text/html');

  // Bảng rộng hơn màn hình thì phải cuộn ngang trong khung riêng của nó.
  // Bọc ở đây thay vì ép chính thẻ <table> thành khối cuộn — làm thế sẽ phá
  // cách trình duyệt tính toán chiều rộng các cột.
  doc.body.querySelectorAll('table').forEach((table) => {
    if (table.parentElement?.classList.contains('post-table-scroll')) return;
    const wrapper = doc.createElement('div');
    wrapper.className = 'post-table-scroll';
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  const used = new Set<string>();

  doc.body.querySelectorAll('h2, h3').forEach((el, index) => {
    const text = (el.textContent ?? '').trim();
    if (!text) return;

    // Hai tiêu đề trùng chữ vẫn phải có id khác nhau
    let id = slugify(text) || `muc-${index + 1}`;
    let suffix = 2;
    while (used.has(id)) {
      id = `${slugify(text) || 'muc'}-${suffix++}`;
    }
    used.add(id);

    el.setAttribute('id', id);
  });

  return { html: doc.body.innerHTML };
};
