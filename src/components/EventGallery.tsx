import React from 'react';
import { GalleryItem } from '../data/siteSettings';

interface EventGalleryProps {
  items: GalleryItem[];
}

/** Lưới ảnh sự kiện — dùng chung cho trang chủ và trang Giới Thiệu */
export const EventGallery: React.FC<EventGalleryProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div
          key={`${item.image}-${index}`}
          className="group relative rounded-2xl overflow-hidden shadow-md aspect-video bg-slate-100"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90"></div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-xs font-bold">{item.title}</p>
            {item.caption && <p className="text-[10px] text-slate-300">{item.caption}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
