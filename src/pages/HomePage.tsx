import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCourses, useProjects } from '../hooks/useContent';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { TagPills } from '../components/TagPills';
import { EventGallery } from '../components/EventGallery';
import { ROUTES, courseUrl, projectUrl } from '../lib/routes';
import { SocialChannel } from '../data/socialLinks';
import {
  ArrowRight,
  Send,
  ShieldAlert,
  Award,
  Users,
  FileText,
  Mic,
  TrendingUp,
  BookOpen,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

/** Màu hover riêng cho từng kênh trên thanh badge Hero */
const CHANNEL_BADGE_STYLES: Record<SocialChannel['id'], string> = {
  tiktok: 'text-slate-700 hover:text-black hover:border-slate-400',
  youtube: 'text-slate-700 hover:text-red-600 hover:border-red-300',
  telegram: 'text-[#2563EB] hover:bg-[#2563EB] hover:text-white',
  facebook: 'text-slate-700 hover:text-[#2563EB] hover:border-[#93C5FD]',
  x: 'text-slate-700 hover:text-black hover:border-slate-400',
};

/** Style ô chỉ số ở khối "Sự Tin Tưởng & Kết Nối Từ Cộng Đồng" */
const CHANNEL_STAT_STYLES: Record<SocialChannel['id'], { card: string; icon: string; value: string }> = {
  tiktok: {
    card: 'bg-white border border-[#E0F2FE]',
    icon: 'bg-slate-900 text-white',
    value: 'text-slate-900',
  },
  youtube: {
    card: 'bg-white border border-[#E0F2FE]',
    icon: 'bg-red-100 text-red-600',
    value: 'text-slate-900',
  },
  telegram: {
    card: 'bg-gradient-to-b from-[#F0F7FF] to-white border-2 border-[#2563EB] shadow-md',
    icon: 'bg-[#2563EB] text-white',
    value: 'text-[#2563EB]',
  },
  facebook: {
    card: 'bg-white border border-[#E0F2FE]',
    icon: 'bg-blue-100 text-blue-600',
    value: 'text-slate-900',
  },
  x: {
    card: 'bg-white border border-[#E0F2FE]',
    icon: 'bg-slate-900 text-white',
    value: 'text-slate-900',
  },
};

/** Màu & icon cho 4 ô thành tựu, theo thứ tự hiển thị */
const ACHIEVEMENT_STYLES = [
  { wrapper: 'from-[#F0F7FF] to-white border-[#E0F2FE]', icon: 'bg-[#2563EB]', node: <Award className="w-6 h-6" /> },
  { wrapper: 'from-emerald-50 to-white border-emerald-100', icon: 'bg-emerald-600', node: <Users className="w-6 h-6" /> },
  { wrapper: 'from-amber-50 to-white border-amber-100', icon: 'bg-amber-500', node: <FileText className="w-6 h-6" /> },
  { wrapper: 'from-indigo-50 to-white border-indigo-100', icon: 'bg-indigo-600', node: <Mic className="w-6 h-6" /> },
];

/** Icon cho 2 ô điểm mạnh trong khối Câu Chuyện Làm Nghề */
const PILLAR_STYLES = [
  { color: 'text-[#2563EB]', node: <TrendingUp className="w-4 h-4 mr-2" /> },
  { color: 'text-emerald-600', node: <ShieldAlert className="w-4 h-4 mr-2" /> },
];

type StatsState = Record<string, number>;

export const HomePage: React.FC = () => {
  const { settings } = useSiteSettings();
  const { hero, homeAbout, achievements, mediaProof, coursesPreview, projectsPreview, social, contact } =
    settings;

  // Bài viết lấy từ WordPress nếu đã cấu hình, ngược lại dùng dữ liệu tĩnh
  const { items: courses } = useCourses();
  const { items: projects } = useProjects();

  // Animated stats count
  const [stats, setStats] = useState<StatsState>({});

  useEffect(() => {
    const duration = 1800;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      setStats(
        social.reduce<StatsState>(
          (acc, channel) => ({ ...acc, [channel.id]: Math.floor(channel.followers * progress) }),
          {}
        )
      );

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [social]);

  return (
    <div className="min-h-screen bg-[#F0F7FF]">

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-[#E0F2FE]/70 via-[#F0F7FF] to-white overflow-hidden">
        {/* Background Ambient Light Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#BFDBFE] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#DBEAFE] rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Copy & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 mb-6 rounded-full bg-white border border-[#93C5FD] text-[#1D4ED8] text-xs sm:text-sm font-bold shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-ping"></span>
                <span>{hero.badge}</span>
              </div>

              {/* Tiêu đề nhỏ hơn để chứa được câu dài hơn */}
              <h1 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-[1.25] mb-6 tracking-tight">
                {hero.titleLead}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]">
                  {hero.titleHighlight}
                </span>{' '}
                {hero.titleTail}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {hero.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <Link
                  to={ROUTES.courses}
                  className="w-full sm:w-auto px-8 py-4 bg-[#2563EB] text-white rounded-xl font-bold shadow-xl shadow-blue-500/25 hover:bg-[#1D4ED8] hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 text-center flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>{hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <a
                  href={contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 border-2 border-[#BFDBFE] hover:border-[#2563EB] rounded-xl font-bold hover:text-[#2563EB] transition-all text-center flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Send className="w-5 h-5 text-[#2563EB]" />
                  <span>{hero.secondaryCta}</span>
                </a>
              </div>

              {/* Social Channels Badge Bar: TikTok, YouTube, Telegram, Facebook, X */}
              <div className="pt-6 border-t border-[#E0F2FE]">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 text-center lg:text-left">
                  {hero.channelsLabel}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {social.map((channel) => (
                    <a
                      key={channel.id}
                      href={channel.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`px-4 py-2 bg-white rounded-xl border border-[#E0F2FE] font-semibold text-xs flex items-center space-x-2 shadow-sm transition-all ${CHANNEL_BADGE_STYLES[channel.id]}`}
                    >
                      {channel.id === 'telegram' && <Send className="w-3.5 h-3.5" />}
                      <span>{channel.label}</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Profile Photo & Highlights — nhích sang phải một chút */}
            <div className="lg:col-span-5 relative lg:pl-10 xl:pl-16">
              <div className="relative mx-auto max-w-md lg:max-w-none">

                {/* Glow border */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#2563EB] to-[#60A5FA] opacity-30 blur-lg"></div>

                {/* Profile Card Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white aspect-[4/5]">
                  <img
                    src={hero.portraitImage}
                    alt={`${hero.profileName} - Chuyên gia cố vấn đầu tư`}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs uppercase font-extrabold text-blue-300 tracking-wider mb-1 block">
                      {hero.profileRole}
                    </span>
                    <h2 className="text-2xl font-extrabold text-white">{hero.profileName}</h2>
                    <p className="text-xs text-slate-200 mt-1">{hero.profileNote}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: HÀNH TRÌNH 10 NĂM — click để sang trang Giới Thiệu */}
      <section id="about" className="py-20 lg:py-28 bg-white border-t border-[#E0F2FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold tracking-widest text-[#2563EB] uppercase bg-[#F0F7FF] px-4 py-1.5 rounded-full border border-[#E0F2FE]">
              {homeAbout.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              <Link
                to={ROUTES.about}
                className="hover:text-[#2563EB] transition-colors focus:outline-none focus:ring-2 focus:ring-[#93C5FD] rounded-lg"
              >
                {homeAbout.title}
              </Link>
            </h2>
            <div className="w-20 h-1 bg-[#2563EB] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">

            {/* Story copy — toàn khối click được để sang trang Giới Thiệu */}
            <Link
              to={ROUTES.about}
              className="lg:col-span-6 space-y-6 block group rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
            >
              <h3 className="text-2xl font-bold text-slate-900 leading-snug group-hover:text-[#2563EB] transition-colors">
                {homeAbout.quote}
              </h3>

              {homeAbout.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {homeAbout.pillars.map((pillar, index) => {
                  const style = PILLAR_STYLES[index % PILLAR_STYLES.length];
                  return (
                    <div key={index} className="p-4 rounded-xl bg-[#F0F7FF] border border-[#E0F2FE]">
                      <div className={`${style.color} text-base font-bold mb-1 flex items-center`}>
                        {style.node}
                        <span>{pillar.title}</span>
                      </div>
                      <p className="text-xs text-slate-600">{pillar.description}</p>
                    </div>
                  );
                })}
              </div>

              <span className="inline-flex items-center space-x-2 text-[#2563EB] font-extrabold text-sm group-hover:translate-x-1 transition-transform">
                <span>{homeAbout.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Achievements Cards Grid */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((item, index) => {
                  const style = ACHIEVEMENT_STYLES[index % ACHIEVEMENT_STYLES.length];
                  return (
                    <div
                      key={index}
                      className={`bg-gradient-to-br p-6 rounded-2xl border text-center shadow-sm ${style.wrapper}`}
                    >
                      <div
                        className={`w-12 h-12 text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md ${style.icon}`}
                      >
                        {style.node}
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900 mb-1">{item.value}</div>
                      <div className="text-xs font-semibold text-slate-600">{item.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Workshop & Event Gallery */}
          <div className="pt-8 border-t border-[#E0F2FE]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{homeAbout.galleryTitle}</h3>
                <p className="text-sm text-slate-500">{homeAbout.gallerySubtitle}</p>
              </div>

              <Link
                to={ROUTES.about}
                className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-[#2563EB] font-extrabold hover:text-[#1D4ED8] transition-colors"
              >
                <span>{homeAbout.galleryCtaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <EventGallery items={settings.gallery} />
          </div>

        </div>
      </section>

      {/* SECTION 2: BẢNG CHỈ SỐ MEDIA & PROOF — mỗi ô click mở kênh trong tab mới */}
      <section id="media-proof" className="py-20 lg:py-28 bg-[#F0F7FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold tracking-widest text-[#2563EB] uppercase bg-white px-4 py-1.5 rounded-full border border-[#E0F2FE]">
              {mediaProof.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              {mediaProof.title}
            </h2>
            <p className="text-slate-600">{mediaProof.subtitle}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {social.map((channel) => {
              const style = CHANNEL_STAT_STYLES[channel.id];
              return (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Mở kênh ${channel.label} trong tab mới`}
                  className={`group relative p-6 rounded-2xl shadow-sm text-center transform hover:-translate-y-1 hover:shadow-lg transition-all last:col-span-2 md:last:col-span-1 ${style.card}`}
                >
                  <ExternalLink className="absolute top-3 right-3 w-3.5 h-3.5 text-slate-300 group-hover:text-[#2563EB] transition-colors" />

                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-3 ${style.icon}`}>
                    {channel.id === 'telegram' ? <Send className="w-6 h-6" /> : channel.shortLabel}
                  </div>
                  <div className={`text-2xl sm:text-3xl font-extrabold mb-1 ${style.value}`}>
                    {(stats[channel.id] ?? 0).toLocaleString('vi-VN')}+
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {channel.metricLabel}
                  </div>
                </a>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 3: KHÓA HỌC PREVIEW — 4 bài */}
      <section id="courses-preview" className="py-20 lg:py-28 bg-white border-t border-[#E0F2FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-[#2563EB] uppercase bg-[#F0F7FF] px-4 py-1.5 rounded-full border border-[#E0F2FE]">
                {coursesPreview.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
                {coursesPreview.title}
              </h2>
              <p className="text-slate-600 text-sm mt-2">{coursesPreview.subtitle}</p>
            </div>

            <Link
              to={ROUTES.courses}
              className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-[#2563EB] font-extrabold hover:text-[#1D4ED8] transition-colors"
            >
              <span>{coursesPreview.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.slice(0, 4).map((course) => (
              <Link
                key={course.id}
                to={courseUrl(course.slug)}
                className="h-full bg-white rounded-2xl border border-[#E0F2FE] shadow-sm hover:shadow-xl hover:border-[#93C5FD] transition-all cursor-pointer flex flex-col group overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-[#1E1B4B]/90 backdrop-blur-md text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded border border-white/20 uppercase">
                    {course.badge}
                  </span>
                  <span className="absolute bottom-2 right-3 text-[10px] font-bold text-white/90 bg-black/40 px-2 py-0.5 rounded">
                    {course.duration}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2.5">
                    <span className="font-bold text-[#2563EB] bg-[#F0F7FF] px-2.5 py-0.5 rounded-full">
                      {course.categoryLabel}
                    </span>
                    <span>{course.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2 min-h-[3rem] mb-2.5">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 min-h-[4.5rem] mb-3">
                    {course.description}
                  </p>

                  <TagPills tags={course.tags} max={2} className="mb-3" />

                  <div className="mt-auto pt-3.5 border-t border-[#F0F7FF] flex items-center justify-between text-[11px] font-bold text-[#2563EB]">
                    <span>{course.lessonsCount} Bài học • {course.duration}</span>
                    <span className="flex items-center group-hover:translate-x-1 transition-transform">
                      Đăng ký <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: REVIEW DỰ ÁN PREVIEW — 4 bài, cùng layout với khối Khóa Học ở trên */}
      <section id="projects-preview" className="py-20 lg:py-28 bg-[#F0F7FF] border-t border-[#E0F2FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-[#2563EB] uppercase bg-white px-4 py-1.5 rounded-full border border-[#E0F2FE]">
                {projectsPreview.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
                {projectsPreview.title}
              </h2>
              <p className="text-slate-600 text-sm mt-2">{projectsPreview.subtitle}</p>
            </div>

            <Link
              to={ROUTES.projects}
              className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-[#2563EB] font-extrabold hover:text-[#1D4ED8] transition-colors"
            >
              <span>{projectsPreview.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.slice(0, 4).map((project) => (
              <Link
                key={project.id}
                to={projectUrl(project.slug)}
                className="h-full bg-white rounded-2xl border border-[#E0F2FE] shadow-sm hover:shadow-xl hover:border-[#93C5FD] transition-all cursor-pointer flex flex-col group overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                  <span className={`absolute top-3 left-3 text-[10px] font-black tracking-wider px-2.5 py-1 rounded border ${project.verdictColor}`}>
                    {project.verdict}
                  </span>
                  <span className="absolute bottom-2 right-3 text-[10px] font-bold text-white/90 bg-black/40 px-2 py-0.5 rounded">
                    {project.riskReward}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2.5">
                    <span className="font-bold text-[#2563EB] bg-[#F0F7FF] px-2.5 py-0.5 rounded-full">
                      {project.categoryLabel}
                    </span>
                    <span>{project.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2 min-h-[3rem] mb-2.5">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 min-h-[4.5rem] mb-3">
                    {project.summary}
                  </p>

                  <TagPills tags={project.tags} max={2} className="mb-3" />

                  <div className="mt-auto pt-3.5 border-t border-[#F0F7FF] flex items-center justify-between text-[11px] font-bold text-[#2563EB]">
                    <span className="text-slate-500 font-medium">Cố vấn: {project.author}</span>
                    <span className="flex items-center group-hover:translate-x-1 transition-transform">
                      Đọc Review <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
