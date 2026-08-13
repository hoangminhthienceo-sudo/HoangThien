import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutList } from 'lucide-react';

export interface CategoryNavItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  thumbnail: string;
}

interface CategoryNavProps {
  /** Nhãn chuyên mục, hiện ở đầu khối */
  categoryLabel: string;
  items: CategoryNavItem[];
  /** Slug bài đang mở, để tô đậm */
  currentSlug: string;
  /** Hàm dựng đường dẫn tới bài */
  buildUrl: (slug: string) => string;
  /** Đường dẫn xem toàn bộ chuyên mục */
  seeAllUrl: string;
}

/**
 * Danh sách bài cùng chuyên mục, dính bên phải bài viết.
 * Cho khách nhảy nhanh sang bài khác mà không phải quay lại trang danh sách.
 */
export const CategoryNav: React.FC<CategoryNavProps> = ({
  categoryLabel,
  items,
  currentSlug,
  buildUrl,
  seeAllUrl,
}) => {
  if (items.length === 0) return null;

  return (
    <aside className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm overflow-hidden">
      <div className="bg-[#1E1B4B] text-white px-4 py-3 font-bold text-xs flex items-center gap-2">
        <LayoutList className="w-4 h-4 text-blue-300" />
        <span className="truncate">Cùng chuyên mục {categoryLabel}</span>
      </div>

      <ul className="p-2 space-y-0.5 max-h-[60vh] overflow-y-auto">
        {items.map((item) => {
          const isCurrent = item.slug === currentSlug;
          return (
            <li key={item.id}>
              <Link
                to={buildUrl(item.slug)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`flex gap-2.5 rounded-lg p-2 transition-colors ${
                  isCurrent ? 'bg-[#F0F7FF]' : 'hover:bg-[#F8FBFF]'
                }`}
              >
                <div className="w-14 h-11 shrink-0 rounded-md overflow-hidden bg-slate-100">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <span
                    className={`block text-[11px] leading-snug line-clamp-2 ${
                      isCurrent ? 'text-[#2563EB] font-extrabold' : 'text-slate-700 font-semibold'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">{item.date}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="p-3 border-t border-[#F0F7FF]">
        <Link
          to={seeAllUrl}
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
        >
          Xem tất cả
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
};
