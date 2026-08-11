import React from 'react';
import heroImage from '../assets/images/regenerated_image_1785579948519.jpg';
import workshop1Image from '../assets/images/regenerated_image_1785579950219.jpg';
import workshop2Image from '../assets/images/regenerated_image_1785579958169.jpg';
import workshop3Image from '../assets/images/regenerated_image_1785579961975.jpg';
import workshop4Image from '../assets/images/regenerated_image_1785579966067.jpg';
import { NavTab } from '../types';
import { useSiteSettings } from '../hooks/useSiteSettings';
import {
  Award,
  Users,
  FileText,
  Mic,
  TrendingUp,
  ShieldAlert,
  Send,
  BookOpen,
  ArrowRight,
  Quote,
} from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: NavTab) => void;
}

/** Màu & icon cho các ô thành tựu, theo thứ tự hiển thị */
const ACHIEVEMENT_STYLES = [
  { wrapper: 'from-[#F0F7FF] to-white border-[#E0F2FE]', icon: 'bg-[#2563EB]', node: <Award className="w-6 h-6" /> },
  { wrapper: 'from-emerald-50 to-white border-emerald-100', icon: 'bg-emerald-600', node: <Users className="w-6 h-6" /> },
  { wrapper: 'from-amber-50 to-white border-amber-100', icon: 'bg-amber-500', node: <FileText className="w-6 h-6" /> },
  { wrapper: 'from-indigo-50 to-white border-indigo-100', icon: 'bg-indigo-600', node: <Mic className="w-6 h-6" /> },
];

/** Icon cho các ô trụ cột */
const PILLAR_STYLES = [
  { color: 'text-[#2563EB]', node: <TrendingUp className="w-5 h-5 mr-2" /> },
  { color: 'text-emerald-600', node: <ShieldAlert className="w-5 h-5 mr-2" /> },
  { color: 'text-indigo-600', node: <Users className="w-5 h-5 mr-2" /> },
];

const GALLERY_IMAGES = [
  { image: workshop1Image, title: 'Diễn Thuyết Tại Workshop Tài Chính', caption: 'Chia sẻ góc nhìn kinh tế vĩ mô' },
  { image: workshop2Image, title: 'Gặp Gỡ Đối Tác & Quỹ Đầu Tư', caption: 'Thẩm định dự án thực tế' },
  { image: workshop3Image, title: 'Lớp Đào Tạo Chuyên Sâu Masterclass', caption: 'Hướng dẫn học viên 1-1' },
  { image: workshop4Image, title: 'Offline Tín Hiệu & Giao Lưu', caption: 'Kết nối thành viên Telegram' },
];

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  const { settings } = useSiteSettings();
  const { aboutPage, achievements, hero, homeAbout, contact } = settings;

  return (
    <div className="min-h-screen bg-[#F0F7FF] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('home')}
            className="hover:text-[#2563EB] transition-colors"
          >
            TRANG CHỦ
          </button>
          <span>&gt;</span>
          <span className="text-[#2563EB] font-extrabold">GIỚI THIỆU</span>
        </nav>

        {/* Page Header: Portrait + Intro */}
        <div className="bg-white rounded-3xl border border-[#E0F2FE] shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
              <span className="self-start text-xs font-extrabold uppercase tracking-widest text-[#2563EB] bg-[#F0F7FF] px-3.5 py-1.5 rounded-full border border-[#E0F2FE]">
                {homeAbout.eyebrow}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-4 leading-[1.25]">
                {aboutPage.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-700 mt-4 leading-relaxed">
                {aboutPage.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => setActiveTab('courses')}
                  className="px-6 py-3.5 bg-[#2563EB] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#1D4ED8] transition-all flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{hero.primaryCta}</span>
                </button>
                <a
                  href={contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-white text-slate-800 border-2 border-[#BFDBFE] hover:border-[#2563EB] hover:text-[#2563EB] rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-[#2563EB]" />
                  <span>Kết Nối Telegram</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-0">
              <img
                src={heroImage}
                alt={`${hero.profileName} - Chuyên gia cố vấn đầu tư`}
                className="w-full h-full object-cover object-top"
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

        {/* Achievements */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
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
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">{item.value}</div>
                <div className="text-xs font-semibold text-slate-600">{item.label}</div>
              </div>
            );
          })}
        </div>

        {/* Philosophy Quote + Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-start">

          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E0F2FE] shadow-sm p-6 sm:p-10">
            <Quote className="w-9 h-9 text-[#BFDBFE] mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-6">
              {aboutPage.quote}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {aboutPage.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {aboutPage.pillars.map((pillar, index) => {
              const style = PILLAR_STYLES[index % PILLAR_STYLES.length];
              return (
                <div key={index} className="p-6 rounded-2xl bg-white border border-[#E0F2FE] shadow-sm">
                  <div className={`${style.color} text-base font-bold mb-2 flex items-center`}>
                    {style.node}
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl border border-[#E0F2FE] shadow-sm p-6 sm:p-10 mb-14">
          <div className="mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] bg-[#F0F7FF] px-3.5 py-1.5 rounded-full border border-[#E0F2FE]">
              Cột Mốc Hành Trình
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-4">
              {aboutPage.milestonesTitle}
            </h2>
          </div>

          <div className="relative border-l-2 border-[#E0F2FE] ml-3 space-y-8">
            {aboutPage.milestones.map((milestone, index) => (
              <div key={index} className="relative pl-8">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#2563EB] border-4 border-white shadow"></span>
                <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">
                  {milestone.year}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-1.5">{milestone.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Gallery */}
        <div className="mb-14">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {aboutPage.galleryTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{aboutPage.gallerySubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_IMAGES.map((item) => (
              <div
                key={item.title}
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
                  <p className="text-[10px] text-slate-300">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="bg-white rounded-3xl border border-[#E0F2FE] shadow-sm p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">{aboutPage.closingTitle}</h2>
            <p className="text-sm text-slate-600 mt-1.5">{aboutPage.closingSubtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('courses')}
              className="px-6 py-3.5 bg-[#2563EB] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#1D4ED8] transition-all flex items-center justify-center space-x-2"
            >
              <span>Xem Khoá Học</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3.5 bg-[#F0F7FF] text-slate-800 border border-[#E0F2FE] hover:border-[#2563EB] hover:text-[#2563EB] rounded-xl font-bold text-sm transition-all"
            >
              Liên Hệ Cố Vấn
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
