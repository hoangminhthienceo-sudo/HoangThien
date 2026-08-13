import React from 'react';

interface PostContentProps {
  /** HTML đã qua preparePost() — đã lọc sạch, gắn id tiêu đề, bọc khung cuộn cho bảng */
  html: string;
  className?: string;
}

/**
 * Hiển thị nội dung bài viết soạn từ trình soạn thảo.
 * Việc lọc HTML nằm ở preparePost() trong src/lib/postContent.ts.
 */
export const PostContent: React.FC<PostContentProps> = ({ html, className = '' }) => {
  if (!html) return null;

  return (
    <div
      className={`post-content ${className}`}
      // Đã lọc bằng DOMPurify trong preparePost()
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
