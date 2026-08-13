import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ArticleBanner, BannerAspect } from '../data/siteSettings';

interface ArticleBannersProps {
  banners: ArticleBanner[];
}

const isExternal = (url: string) => /^https?:\/\//i.test(url);

/** Khung hình tương ứng với lựa chọn của quản trị viên */
const ASPECT_CLASS: Record<Exclude<BannerAspect, 'auto'>, string> = {
  landscape: 'aspect-[16/9]',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[9/16]',
};

/** Chỉ những banner đã có ảnh mới được hiển thị */
export const visibleBanners = (banners: ArticleBanner[]): ArticleBanner[] =>
  banners.filter((banner) => banner.image?.trim());

/**
 * Banner tuỳ chỉnh dính cạnh bài viết.
 * Quản trị viên đặt ảnh, chữ và đường dẫn trong tab Nội dung trang.
 */
export const ArticleBanners: React.FC<ArticleBannersProps> = ({ banners }) => {
  const items = visibleBanners(banners);
  if (items.length === 0) return null;

  return (
    <div className="space-y-4">
      {items.map((banner, index) => {
        const link = banner.link?.trim();
        const hasText = Boolean(banner.title?.trim() || banner.subtitle?.trim());
        const aspect = banner.aspect ?? 'auto';

        const inner = (
          <>
            {/* Banner nằm ngay trong tầm nhìn đầu tiên nên tải luôn, không hoãn */}
            <img
              src={banner.image}
              alt={banner.title || 'Banner'}
              className={
                aspect === 'auto'
                  ? 'w-full h-auto block group-hover:scale-[1.03] transition-transform duration-500'
                  : `w-full h-full object-cover block ${ASPECT_CLASS[aspect]} group-hover:scale-[1.03] transition-transform duration-500`
              }
            />

            {hasText && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3.5 text-white">
                  {banner.title && (
                    <p className="text-sm font-extrabold leading-snug">{banner.title}</p>
                  )}
                  {banner.subtitle && (
                    <p className="text-[11px] text-slate-200 mt-0.5 leading-snug">
                      {banner.subtitle}
                    </p>
                  )}
                </div>
              </>
            )}

            {link && (
              <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            )}
          </>
        );

        const frame =
          'group relative block rounded-2xl overflow-hidden border border-[#E0F2FE] bg-white shadow-sm';
        const clickable =
          ' hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 transition-shadow';
        const key = `${banner.image}-${index}`;

        if (!link) {
          return (
            <div key={key} className={frame}>
              {inner}
            </div>
          );
        }

        return isExternal(link) ? (
          <a
            key={key}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={banner.title || 'Banner'}
            className={frame + clickable}
          >
            {inner}
          </a>
        ) : (
          <Link
            key={key}
            to={link}
            aria-label={banner.title || 'Banner'}
            className={frame + clickable}
          >
            {inner}
          </Link>
        );
      })}
    </div>
  );
};
