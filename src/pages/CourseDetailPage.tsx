import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, Send, User, Clock, GraduationCap, ArrowLeft } from 'lucide-react';
import { useCourses } from '../hooks/useContent';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { TagPills } from '../components/TagPills';
import { PostContent } from '../components/PostContent';
import { ArticleBanners, visibleBanners } from '../components/ArticleBanners';
import { CategoryNav } from '../components/CategoryNav';
import { NotFoundPage } from './NotFoundPage';
import { preparePost } from '../lib/postContent';
import { ROUTES, courseUrl } from '../lib/routes';

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { items: courses, loading } = useCourses();
  const { settings } = useSiteSettings();

  const course = courses.find((item) => item.slug === slug);
  const prepared = useMemo(() => preparePost(course?.content ?? ''), [course?.content]);

  const banners = visibleBanners(settings.articleBanners);

  const sameCategory = useMemo(
    () => (course ? courses.filter((item) => item.category === course.category) : []),
    [courses, course]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F7FF] pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-4">
          <div className="h-4 w-40 bg-slate-200 rounded"></div>
          <div className="h-9 w-4/5 bg-slate-200 rounded"></div>
          <div className="aspect-video bg-slate-200 rounded-2xl"></div>
          <div className="h-3 w-full bg-slate-200 rounded"></div>
          <div className="h-3 w-3/4 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!course) return <NotFoundPage />;

  return (
    <div className="min-h-screen bg-[#F0F7FF] pt-24 pb-20">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">
          <Link to={ROUTES.home} className="hover:text-[#2563EB] transition-colors">
            TRANG CHỦ
          </Link>
          <span>&gt;</span>
          <Link to={ROUTES.courses} className="hover:text-[#2563EB] transition-colors">
            KHOÁ HỌC
          </Link>
          <span>&gt;</span>
          <span className="text-slate-800 normal-case font-semibold line-clamp-1">{course.title}</span>
        </nav>

        <div
          className={`grid grid-cols-1 gap-6 xl:gap-8 items-start lg:grid-cols-[minmax(0,1fr)_18rem] ${
            banners.length > 0
              ? 'xl:grid-cols-[15rem_minmax(0,1fr)_19rem]'
              : 'xl:grid-cols-[minmax(0,1fr)_19rem]'
          }`}
        >

          {/* CỘT TRÁI — Banner tuỳ chỉnh, dính khi cuộn */}
          {banners.length > 0 && (
            <div className="hidden xl:block sticky top-24">
              <ArticleBanners banners={settings.articleBanners} />
            </div>
          )}

          {/* CỘT GIỮA — Bài viết */}
          <main className="min-w-0">
            <article className="bg-white rounded-3xl border border-[#E0F2FE] shadow-sm overflow-hidden">

              {/* Ảnh đại diện */}
              <div className="relative aspect-video bg-slate-900">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 bg-[#1E1B4B]/90 backdrop-blur-md text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded border border-white/20 uppercase">
                  {course.badge}
                </span>
              </div>

              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded bg-[#2563EB] text-white">
                    {course.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-500">{course.date}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-[1.2] mb-5">
                  {course.title}
                </h1>

                <p className="text-base text-slate-700 leading-relaxed mb-6">{course.description}</p>

                <TagPills tags={course.tags} size="sm" className="mb-8" />

                {/* Thông tin khoá học */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F0F7FF] border border-[#E0F2FE] mb-8 text-xs">
                  <div>
                    <span className="text-slate-500 flex items-center gap-1.5 mb-0.5">
                      <User className="w-3.5 h-3.5" /> Giảng viên
                    </span>
                    <strong className="text-slate-900 text-sm font-bold">{course.instructor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 flex items-center gap-1.5 mb-0.5">
                      <Clock className="w-3.5 h-3.5" /> Thời lượng
                    </span>
                    <strong className="text-slate-900 text-sm font-bold">{course.duration}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 flex items-center gap-1.5 mb-0.5">
                      <BookOpen className="w-3.5 h-3.5" /> Số bài
                    </span>
                    <strong className="text-slate-900 text-sm font-bold">{course.lessonsCount}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 flex items-center gap-1.5 mb-0.5">
                      <GraduationCap className="w-3.5 h-3.5" /> Trình độ
                    </span>
                    <strong className="text-slate-900 text-sm font-bold">{course.level}</strong>
                  </div>
                </div>


                {/* Nội dung bài viết */}
                <PostContent html={prepared.html} />

                {/* Kêu gọi hành động */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-8 mt-8 border-t border-[#E0F2FE]">
                  <a
                    href={settings.contact.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-[#2563EB] text-white rounded-xl font-bold text-center text-sm shadow-lg shadow-blue-500/20 hover:bg-[#1D4ED8] flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Đăng Ký Khoá Học Qua Telegram
                  </a>
                  <Link
                    to={ROUTES.courses}
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 text-center inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Xem Khoá Học Khác
                  </Link>
                </div>
              </div>
            </article>
          </main>

          {/* CỘT PHẢI — Bài cùng chuyên mục, dính khi cuộn */}
          <div className="lg:sticky lg:top-24">
            <CategoryNav
              categoryLabel={course.categoryLabel}
              items={sameCategory.map((item) => ({
                id: item.id,
                slug: item.slug,
                title: item.title,
                date: item.date,
                thumbnail: item.thumbnail,
              }))}
              currentSlug={course.slug}
              buildUrl={courseUrl}
              seeAllUrl={ROUTES.courses}
            />

            {/* Màn hình nhỏ chưa có cột trái nên banner xuống đây */}
            {banners.length > 0 && (
              <div className="xl:hidden mt-4">
                <ArticleBanners banners={settings.articleBanners} />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
