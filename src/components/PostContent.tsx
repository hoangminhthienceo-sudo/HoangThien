import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';

interface PostContentProps {
  /** HTML lấy từ post_content của WordPress */
  html: string;
  className?: string;
}

/**
 * Hiển thị nội dung bài viết soạn từ trình soạn thảo.
 *
 * Nội dung do người dùng WordPress soạn nên phải lọc trước khi đưa vào trang:
 * WordPress đã chặn thẻ script với tài khoản Tác giả/Cộng tác viên, nhưng tài
 * khoản Quản trị viên vẫn đăng được HTML thô, và plugin cài thêm cũng có thể
 * chèn nội dung. Lọc ở đây là lớp phòng vệ cuối, ngay trước khi render.
 */
export const PostContent: React.FC<PostContentProps> = ({ html, className = '' }) => {
  const clean = useMemo(() => {
    if (!html?.trim()) return '';
    return DOMPurify.sanitize(html, {
      // Cho phép nhúng video YouTube — thẻ iframe mặc định bị chặn
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target', 'colspan', 'rowspan'],
    });
  }, [html]);

  if (!clean) return null;

  return (
    <div
      className={`post-content ${className}`}
      // Đã lọc bằng DOMPurify ngay phía trên
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
};
