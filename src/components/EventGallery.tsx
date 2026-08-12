import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { GalleryItem } from '../data/siteSettings';

interface EventGalleryProps {
  items: GalleryItem[];
}

const isExternal = (url: string) => /^https?:\/\//i.test(url);

/** Lưới ảnh sự kiện — dùng chung cho trang chủ và trang Giới Thiệu */
export const EventGallery: React.FC<EventGalleryProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => {
        const link = item.link?.trim();

        const inner = (
          <>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90"></div>

            {link && (
              <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            )}

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="text-xs font-bold">{item.title}</p>
              {item.caption && <p className="text-[10px] text-slate-300">{item.caption}</p>}
            </div>
          </>
        );

        const frame =
          'group relative rounded-2xl overflow-hidden shadow-md aspect-video bg-slate-100 block';
        const clickable =
          ' hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 transition-shadow';
        const key = `${item.image}-${index}`;

        if (!link) {
          return (
            <div key={key} className={frame}>
              {inner}
            </div>
          );
        }

        // Link ra ngoài mở tab mới, link trong site chuyển trang không tải lại
        return isExternal(link) ? (
          <a
            key={key}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.title}
            className={frame + clickable}
          >
            {inner}
          </a>
        ) : (
          <Link key={key} to={link} aria-label={item.title} className={frame + clickable}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
};
