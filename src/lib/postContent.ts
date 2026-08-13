import DOMPurify from 'dompurify';
import { slugify } from './routes';

export interface PostHeading {
  id: string;
  text: string;
  /** 2 = mục lớn, 3 = mục con */
  level: 2 | 3;
}

export interface PreparedPost {
  /** HTML đã lọc sạch và đã gắn id cho từng tiêu đề */
  html: string;
  /** Danh sách tiêu đề dùng dựng mục lục */
  headings: PostHeading[];
}

const EMPTY: PreparedPost = { html: '', headings: [] };

/**
 * Chuẩn bị nội dung bài viết trước khi hiển thị:
 *
 * 1. Lọc HTML — nội dung do người dùng WordPress soạn. WordPress đã chặn thẻ
 *    script với vai trò Tác giả, nhưng Quản trị viên vẫn đăng được HTML thô và
 *    plugin cài thêm cũng có thể chèn nội dung. Đây là lớp chặn cuối.
 * 2. Gắn id cho mỗi tiêu đề để mục lục nhảy tới được.
 * 3. Trả về danh sách tiêu đề để dựng mục lục.
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
  const headings: PostHeading[] = [];
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
    headings.push({ id, text, level: el.tagName === 'H2' ? 2 : 3 });
  });

  return { html: doc.body.innerHTML, headings };
};
