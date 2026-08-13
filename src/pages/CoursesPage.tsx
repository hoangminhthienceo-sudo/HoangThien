import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { COURSE_CATEGORIES } from '../data/coursesData';
import { useCourses } from '../hooks/useContent';
import { collectTags } from '../lib/wordpress';
import { TagFilter, TagPills } from '../components/TagPills';
import { ROUTES, courseUrl } from '../lib/routes';
import {
  Search,
  BookOpen,
  User,
  ChevronRight,
  Send,
  GraduationCap,
  Filter,
} from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('nguoi-moi');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Bài viết lấy từ WordPress nếu đã cấu hình, ngược lại dùng dữ liệu tĩnh
  const { items: courses, loading } = useCourses();

  const availableTags = useMemo(() => collectTags(courses), [courses]);

  // Filter courses by category, tag & search query
  const filteredCourses = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === 'all' || course.category === selectedCategory;
      const matchesTag =
        selectedTag === null || course.tags.some((tag) => tag.slug === selectedTag);
      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.badge.toLowerCase().includes(query) ||
        course.tags.some((tag) => tag.name.toLowerCase().includes(query));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [courses, selectedCategory, selectedTag, searchQuery]);

  const activeCategoryObj = COURSE_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F0F7FF] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation matching Hình 2 */}
        <nav className="flex items-center space-x-2 text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">
          <Link to={ROUTES.home} className="hover:text-[#2563EB] transition-colors">
            TRANG CHỦ
          </Link>
          <span>&gt;</span>
          <span className="text-[#2563EB] font-extrabold">
            KHÓA HỌC / KHO KIẾN THỨC
          </span>
          {activeCategoryObj && activeCategoryObj.id !== 'all' && (
            <>
              <span>&gt;</span>
              <span className="text-slate-800">{activeCategoryObj.label}</span>
            </>
          )}
        </nav>

        {/* Page Title & Search Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0F2FE] shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] bg-[#F0F7FF] px-3.5 py-1.5 rounded-full border border-[#E0F2FE]">
              Đào Tạo & Chia Sẻ Kinh Nghiệm
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Kho Học Liệu & Bài Viết Đào Tạo Thực Chiến
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Hệ thống hóa 10 năm kinh nghiệm từ HoangMinhThien - Tư duy đúng, quy tắc quản trị rủi ro & kiến thức On-chain.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học, scam alert, a16z..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F0F7FF] border border-[#E0F2FE] rounded-xl text-xs font-medium focus:outline-none focus:border-[#2563EB] focus:bg-white text-slate-900"
            />
          </div>
        </div>

        {/* Layout matching "Hình 2": Left Category Sidebar + Right Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: Categories Menu matching Hình 2 */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#E0F2FE] shadow-sm overflow-hidden lg:sticky lg:top-24">
            
            {/* Header Box in Sidebar matching Dark/Navy header in Hình 2 */}
            <div className="bg-[#1E1B4B] text-white px-5 py-4 font-bold text-sm flex items-center justify-between">
              <span className="flex items-center">
                <Filter className="w-4 h-4 mr-2 text-blue-300" />
                Danh Mục Đào Tạo
              </span>
              <span className="text-[10px] bg-blue-900/80 px-2 py-0.5 rounded text-blue-200">
                {courses.length} Bài viết
              </span>
            </div>

            {/* Category Navigation Items */}
            <div className="p-2 space-y-1">
              {COURSE_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.id;
                const categoryCount = courses.filter(
                  (c) => category.id === 'all' || c.category === category.id
                ).length;

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-[#1E1B4B] text-white font-extrabold shadow-sm'
                        : 'text-slate-700 hover:bg-[#F0F7FF] hover:text-[#2563EB]'
                    }`}
                  >
                    <span>{category.label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F0F7FF] text-slate-500'
                      }`}
                    >
                      {categoryCount}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Lọc theo thẻ — thẻ được gắn cho bài viết bên WordPress */}
            <TagFilter tags={availableTags} activeSlug={selectedTag} onSelect={setSelectedTag} />

            {/* Telegram Sidebar Widget */}
            <div className="p-4 m-3 rounded-xl bg-gradient-to-br from-[#F0F7FF] to-[#E0F2FE] border border-[#BFDBFE] text-center">
              <GraduationCap className="w-8 h-8 text-[#2563EB] mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-900">Học Trực Tiếp 1-1</div>
              <p className="text-[11px] text-slate-600 mt-1 mb-3">
                Đăng ký lớp Masterclass giới hạn cùng HoangMinhThien qua Telegram
              </p>
              <a
                href="https://t.me/hoangminhthien"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 bg-[#2563EB] text-white text-xs font-bold px-4 py-2 rounded-lg w-full shadow hover:bg-[#1D4ED8]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Liên Hệ Telegram</span>
              </a>
            </div>

          </aside>

          {/* RIGHT MAIN CONTENT: Cards Grid matching Hình 2 */}
          <main className="lg:col-span-9">
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#E0F2FE] overflow-hidden animate-pulse">
                    <div className="aspect-video bg-slate-100"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-3.5 bg-slate-100 rounded w-5/6"></div>
                      <div className="h-3.5 bg-slate-100 rounded w-2/3"></div>
                      <div className="h-2.5 bg-slate-100 rounded w-full"></div>
                      <div className="h-2.5 bg-slate-100 rounded w-4/5"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E0F2FE]">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">Không tìm thấy bài viết/khóa học phù hợp</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">Vui lòng chọn danh mục khác, bỏ lọc thẻ hoặc nhập từ khóa tìm kiếm mới.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedTag(null); setSearchQuery(''); }}
                  className="px-4 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-lg"
                >
                  Xem Tất Cả Khóa Học
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={courseUrl(course.slug)}
                    className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm hover:shadow-xl hover:border-[#93C5FD] transition-all flex flex-col justify-between group overflow-hidden"
                  >
                    <div>
                      {/* Image Thumbnail with Overlay Badge matching Hình 2 graphic overlays */}
                      <div className="relative aspect-video overflow-hidden bg-slate-900">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                        
                        {/* Overlay Graphic Badge matching Hình 2 (e.g. SCAM ALERT, a16z, COMMUNITY) */}
                        <div className="absolute top-3 left-3 bg-[#1E1B4B]/90 backdrop-blur-md text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded border border-white/20 uppercase">
                          {course.badge}
                        </div>

                        <div className="absolute bottom-2 right-3 text-[10px] font-bold text-white/90 bg-black/40 px-2 py-0.5 rounded">
                          {course.duration}
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5">
                        <h2 className="text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug mb-3 min-h-[2.5rem]">
                          {course.title}
                        </h2>

                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#F0F7FF] text-[#2563EB] border border-[#E0F2FE]">
                            {course.categoryLabel}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {course.date}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                          {course.description}
                        </p>

                        {/* Thẻ bài viết — bấm để lọc nhanh */}
                        <TagPills
                          tags={course.tags}
                          activeSlug={selectedTag}
                          onSelect={(slug) => setSelectedTag(slug === selectedTag ? null : slug)}
                          max={3}
                        />
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="px-5 py-3.5 bg-[#F0F7FF]/60 border-t border-[#E0F2FE] flex items-center justify-between gap-3 text-xs">
                      <span className="text-slate-500 font-medium flex items-center min-w-0">
                        <User className="w-3.5 h-3.5 mr-1 shrink-0 text-[#2563EB]" />
                        <span className="truncate">{course.instructor}</span>
                      </span>
                      <span className="font-extrabold text-[#2563EB] flex items-center shrink-0 whitespace-nowrap group-hover:translate-x-1 transition-transform">
                        Xem chi tiết <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </span>
                    </div>

                  </Link>
                ))}
              </div>
            )}

          </main>

        </div>

      </div>

    </div>
  );
};
