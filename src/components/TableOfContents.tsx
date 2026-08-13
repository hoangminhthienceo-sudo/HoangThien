import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { PostHeading } from '../lib/postContent';

interface TableOfContentsProps {
  headings: PostHeading[];
  title?: string;
}

/** Khoảng chừa cho thanh menu cố định ở đầu trang khi cuộn tới một mục */
const HEADER_OFFSET = 96;

/**
 * Mục lục bài viết, dính bên trái khi cuộn.
 * Mục đang đọc được tô đậm dựa trên vị trí cuộn thực tế.
 */
export const TableOfContents: React.FC<TableOfContentsProps> = ({
  headings,
  title = 'Mục lục bài viết',
}) => {
  const [activeId, setActiveId] = useState<string>('');

  /**
   * Mở thẳng link dạng .../bai-viet#ten-muc thì phải nhảy tới đúng mục.
   * Trình duyệt tự nhảy ngay lúc tải trang, khi đó nội dung bài chưa render
   * nên không tìm thấy mục — phải tự nhảy lại sau khi nội dung đã có.
   */
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    if (!id || headings.length === 0) return;
    if (!headings.some((h) => h.id === id)) return;

    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'auto' });
    setActiveId(id);
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Mục đang đọc = tiêu đề cuối cùng đã cuộn qua khỏi mép trên
    const updateActive = () => {
      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= HEADER_OFFSET + 8) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  const jumpTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
    // Cập nhật thanh địa chỉ để chia sẻ được link tới đúng mục
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav
      aria-label={title}
      className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm overflow-hidden"
    >
      <div className="bg-[#1E1B4B] text-white px-4 py-3 font-bold text-xs flex items-center gap-2">
        <List className="w-4 h-4 text-blue-300" />
        {title}
      </div>

      <ul className="p-2 space-y-0.5 max-h-[60vh] overflow-y-auto">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => jumpTo(e, heading.id)}
                className={`block rounded-lg px-3 py-2 text-xs leading-snug transition-colors ${
                  heading.level === 3 ? 'pl-6' : ''
                } ${
                  isActive
                    ? 'bg-[#F0F7FF] text-[#2563EB] font-extrabold'
                    : 'text-slate-600 font-semibold hover:bg-[#F8FBFF] hover:text-[#2563EB]'
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
