import React from 'react';
import { Tag as TagIcon } from 'lucide-react';
import { PostTag } from '../types';

interface TagPillsProps {
  tags: PostTag[];
  /** Thẻ đang được chọn để lọc (nếu có) */
  activeSlug?: string | null;
  /** Bấm vào thẻ để lọc. Bỏ trống => thẻ chỉ hiển thị, không bấm được. */
  onSelect?: (slug: string) => void;
  /** Số thẻ tối đa hiển thị, phần dư gom vào "+N" */
  max?: number;
  size?: 'sm' | 'xs';
  className?: string;
}

/** Danh sách thẻ của một bài viết — hiển thị trên card và trong modal chi tiết */
export const TagPills: React.FC<TagPillsProps> = ({
  tags,
  activeSlug = null,
  onSelect,
  max,
  size = 'xs',
  className = '',
}) => {
  if (tags.length === 0) return null;

  const visible = max ? tags.slice(0, max) : tags;
  const hiddenCount = max ? tags.length - visible.length : 0;
  const sizing = size === 'sm' ? 'text-xs px-3 py-1' : 'text-[10px] px-2 py-0.5';

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {visible.map((tag) => {
        const isActive = tag.slug === activeSlug;
        const base = `rounded-full font-semibold border transition-colors ${sizing}`;

        if (!onSelect) {
          return (
            <span
              key={tag.slug}
              className={`${base} bg-slate-50 text-slate-600 border-slate-200`}
            >
              #{tag.name}
            </span>
          );
        }

        return (
          <button
            key={tag.slug}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(tag.slug);
            }}
            className={`${base} ${
              isActive
                ? 'bg-[#2563EB] text-white border-[#2563EB]'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-[#F0F7FF] hover:text-[#2563EB] hover:border-[#93C5FD]'
            }`}
          >
            #{tag.name}
          </button>
        );
      })}

      {hiddenCount > 0 && (
        <span className={`${sizing} rounded-full font-semibold text-slate-400`}>
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};

interface TagFilterProps {
  tags: (PostTag & { count: number })[];
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
  title?: string;
}

/** Khối lọc theo thẻ trong sidebar — thẻ được quản lý bên WordPress */
export const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  activeSlug,
  onSelect,
  title = 'Lọc Theo Thẻ',
}) => {
  if (tags.length === 0) return null;

  return (
    <div className="border-t border-[#E0F2FE] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center">
          <TagIcon className="w-3.5 h-3.5 mr-1.5 text-[#2563EB]" />
          {title}
        </h3>
        {activeSlug && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-[10px] font-bold text-[#2563EB] hover:underline"
          >
            Xoá lọc
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => {
          const isActive = tag.slug === activeSlug;
          return (
            <button
              key={tag.slug}
              type="button"
              onClick={() => onSelect(isActive ? null : tag.slug)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                isActive
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-[#F0F7FF] text-slate-600 border-[#E0F2FE] hover:text-[#2563EB] hover:border-[#93C5FD]'
              }`}
            >
              #{tag.name}
              <span className={isActive ? 'text-blue-100 ml-1' : 'text-slate-400 ml-1'}>
                {tag.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
