import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PROJECT_CATEGORIES } from '../data/projectsData';
import { useProjects } from '../hooks/useContent';
import { collectTags } from '../lib/wordpress';
import { TagFilter, TagPills } from '../components/TagPills';
import { ROUTES, projectUrl } from '../lib/routes';
import {
  Search,
  Layers,
  ChevronRight,
  Send,
  Filter,
  PieChart,
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Báo cáo lấy từ WordPress nếu đã cấu hình, ngược lại dùng dữ liệu tĩnh
  const { items: projects, loading } = useProjects();

  const availableTags = useMemo(() => collectTags(projects), [projects]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;
      const matchesTag =
        selectedTag === null || project.tags.some((tag) => tag.slug === selectedTag);
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.verdict.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.name.toLowerCase().includes(query));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [projects, selectedCategory, selectedTag, searchQuery]);

  const activeCategoryObj = PROJECT_CATEGORIES.find((c) => c.id === selectedCategory);

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
            REVIEW DỰ ÁN
          </span>
          {activeCategoryObj && activeCategoryObj.id !== 'all' && (
            <>
              <span>&gt;</span>
              <span className="text-slate-800">{activeCategoryObj.label}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0F2FE] shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] bg-[#F0F7FF] px-3.5 py-1.5 rounded-full border border-[#E0F2FE]">
              Báo Cáo Thẩm Định Độc Lập
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Review & Phân Tích Chi Tiết Các Dự Án
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Khảo sát thực địa, soi dữ liệu On-chain, đánh giá Tokenomics & ma trận rủi ro từ HoangMinhThien.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm Arbitrum, Ondo, BĐS, SUI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F0F7FF] border border-[#E0F2FE] rounded-xl text-xs font-medium focus:outline-none focus:border-[#2563EB] focus:bg-white text-slate-900"
            />
          </div>
        </div>

        {/* Grid Layout matching "Hình 2": Left Categories + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: Project Categories Menu matching Hình 2 */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#E0F2FE] shadow-sm overflow-hidden sticky top-24">
            
            {/* Header Box in Sidebar */}
            <div className="bg-[#1E1B4B] text-white px-5 py-4 font-bold text-sm flex items-center justify-between">
              <span className="flex items-center">
                <Filter className="w-4 h-4 mr-2 text-blue-300" />
                Thể Loại Dự Án
              </span>
              <span className="text-[10px] bg-blue-900/80 px-2 py-0.5 rounded text-blue-200">
                {projects.length} Báo cáo
              </span>
            </div>

            {/* Category Navigation Items */}
            <div className="p-2 space-y-1">
              {PROJECT_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.id;
                const count = projects.filter(
                  (p) => category.id === 'all' || p.category === category.id
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
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Lọc theo thẻ — thẻ được gắn cho bài viết bên WordPress */}
            <TagFilter tags={availableTags} activeSlug={selectedTag} onSelect={setSelectedTag} />

            {/* Request Review Widget */}
            <div className="p-4 m-3 rounded-xl bg-gradient-to-br from-[#F0F7FF] to-[#E0F2FE] border border-[#BFDBFE] text-center">
              <PieChart className="w-8 h-8 text-[#2563EB] mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-900">Yêu Cầu Review Dự Án</div>
              <p className="text-[11px] text-slate-600 mt-1 mb-3">
                Bạn muốn HoangMinhThien 'soi' dự án nào tiếp theo?
              </p>
              <a
                href="https://t.me/hoangminhthien"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 bg-[#2563EB] text-white text-xs font-bold px-4 py-2 rounded-lg w-full shadow hover:bg-[#1D4ED8]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Đề Xuất Telegram</span>
              </a>
            </div>

          </aside>

          {/* RIGHT MAIN CONTENT: Project Cards Grid matching Hình 2 */}
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
            ) : filteredProjects.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E0F2FE]">
                <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">Không tìm thấy báo cáo review dự án phù hợp</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">Vui lòng chọn thể loại khác, bỏ lọc thẻ hoặc thay đổi từ khóa tìm kiếm.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedTag(null); setSearchQuery(''); }}
                  className="px-4 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-lg"
                >
                  Xem Tất Cả Review Dự Án
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={projectUrl(project.slug)}
                    className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm hover:shadow-xl hover:border-[#93C5FD] transition-all flex flex-col justify-between group overflow-hidden"
                  >
                    <div>
                      {/* Image Thumbnail with Overlay Verdict */}
                      <div className="relative aspect-video overflow-hidden bg-slate-900">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                        
                        {/* Verdict Pill Badge */}
                        <div className={`absolute top-3 left-3 text-[10px] font-black tracking-wider px-2.5 py-1 rounded border ${project.verdictColor}`}>
                          {project.verdict}
                        </div>

                        <div className="absolute bottom-2 right-3 text-[10px] font-bold text-white/90 bg-black/50 px-2 py-0.5 rounded">
                          {project.riskReward}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span className="font-bold text-[#2563EB] bg-[#F0F7FF] px-2.5 py-0.5 rounded-full">
                            {project.categoryLabel}
                          </span>
                          <span>{project.date}</span>
                        </div>

                        <h2 className="text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug mb-3 min-h-[2.5rem]">
                          {project.title}
                        </h2>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                          {project.summary}
                        </p>

                        {/* Thẻ bài viết — bấm để lọc nhanh */}
                        <TagPills
                          tags={project.tags}
                          activeSlug={selectedTag}
                          onSelect={(slug) => setSelectedTag(slug === selectedTag ? null : slug)}
                          max={3}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3.5 bg-[#F0F7FF]/60 border-t border-[#E0F2FE] flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Cố vấn: <strong>{project.author}</strong>
                      </span>
                      <span className="font-extrabold text-[#2563EB] flex items-center group-hover:translate-x-1 transition-transform">
                        Đọc báo cáo <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
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
