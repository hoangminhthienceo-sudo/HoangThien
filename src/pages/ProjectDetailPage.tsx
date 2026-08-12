import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, Check, Send, ArrowLeft, PieChart, TrendingUp } from 'lucide-react';
import { useProjects } from '../hooks/useContent';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { TagPills } from '../components/TagPills';
import { NotFoundPage } from './NotFoundPage';
import { ROUTES, projectUrl } from '../lib/routes';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { items: projects, loading } = useProjects();
  const { settings } = useSiteSettings();

  const project = projects.find((item) => item.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F7FF] pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-4">
          <div className="h-4 w-40 bg-slate-200 rounded"></div>
          <div className="h-9 w-4/5 bg-slate-200 rounded"></div>
          <div className="aspect-video bg-slate-200 rounded-2xl"></div>
          <div className="h-3 w-full bg-slate-200 rounded"></div>
          <div className="h-3 w-3/4 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!project) return <NotFoundPage />;

  const related = projects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F0F7FF] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">
          <Link to={ROUTES.home} className="hover:text-[#2563EB] transition-colors">
            TRANG CHỦ
          </Link>
          <span>&gt;</span>
          <Link to={ROUTES.projects} className="hover:text-[#2563EB] transition-colors">
            REVIEW DỰ ÁN
          </Link>
          <span>&gt;</span>
          <span className="text-slate-800 normal-case font-semibold line-clamp-1">{project.title}</span>
        </nav>

        <article className="bg-white rounded-3xl border border-[#E0F2FE] shadow-sm overflow-hidden">

          {/* Ảnh đại diện */}
          <div className="relative aspect-video bg-slate-900">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
            <span className={`absolute top-4 left-4 text-[10px] font-black tracking-wider px-2.5 py-1 rounded border ${project.verdictColor}`}>
              {project.verdict}
            </span>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#2563EB] text-white">
                {project.categoryLabel}
              </span>
              <span className="text-xs text-slate-500">{project.date}</span>
              <span className="text-xs font-bold text-slate-600 bg-[#F0F7FF] px-2.5 py-1 rounded border border-[#E0F2FE]">
                {project.riskReward}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-[1.2] mb-5">
              {project.title}
            </h1>

            <p className="text-base text-slate-700 leading-relaxed font-medium mb-6">{project.summary}</p>

            <TagPills tags={project.tags} size="sm" className="mb-8" />

            {/* Tokenomics / cấu trúc tài chính */}
            {project.tokenomics && (
              <div className="p-5 rounded-2xl bg-[#F0F7FF] border border-[#E0F2FE] mb-8">
                <h2 className="text-xs font-bold uppercase text-[#2563EB] mb-1.5 flex items-center gap-1.5">
                  <PieChart className="w-3.5 h-3.5" />
                  Cấu Trúc Tài Chính &amp; Tokenomics
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">{project.tokenomics}</p>
              </div>
            )}

            {/* Điểm nổi bật */}
            {project.highlights.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xs font-extrabold uppercase tracking-wider mb-3 flex items-center text-emerald-700">
                  <Check className="w-4 h-4 mr-1.5 text-emerald-600" />
                  Điểm Nổi Bật &amp; Ưu Điểm Lớn
                </h2>
                <ul className="space-y-2 text-sm text-slate-700">
                  {project.highlights.map((item, i) => (
                    <li key={i} className="flex items-start bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-2.5 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Rủi ro */}
            {project.risks.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xs font-extrabold uppercase tracking-wider mb-3 flex items-center text-amber-800">
                  <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-600" />
                  Rủi Ro Cần Lưu Ý Khi Phân Bổ Vốn
                </h2>
                <ul className="space-y-2 text-sm text-slate-700">
                  {project.risks.map((item, i) => (
                    <li key={i} className="flex items-start bg-amber-50/60 p-3.5 rounded-xl border border-amber-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 mr-2.5 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Chỉ số On-chain */}
            {project.onChainMetrics && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-8">
                <h2 className="text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Chỉ Số Theo Dõi
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">{project.onChainMetrics}</p>
              </div>
            )}

            <p className="text-xs text-slate-500 mb-6">
              Cố vấn thực hiện: <strong className="text-slate-700">{project.author}</strong>
            </p>

            {/* Kêu gọi hành động */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-[#E0F2FE]">
              <a
                href={settings.contact.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-[#2563EB] text-white rounded-xl font-bold text-center text-sm shadow-lg shadow-blue-500/20 hover:bg-[#1D4ED8] flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                Thảo Luận Báo Cáo Trên Telegram
              </a>
              <Link
                to={ROUTES.projects}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 text-center inline-flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Xem Review Khác
              </Link>
            </div>
          </div>
        </article>

        {/* Báo cáo cùng thể loại */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-extrabold text-slate-900 mb-5">Báo cáo cùng thể loại</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={projectUrl(item.slug)}
                  className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm hover:shadow-lg hover:border-[#93C5FD] transition-all overflow-hidden group"
                >
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-[#2563EB] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1.5">{item.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
