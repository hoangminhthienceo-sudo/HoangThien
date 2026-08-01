import React, { useState, useEffect } from 'react';
import heroImage from '../assets/images/regenerated_image_1785579948519.jpg';
import workshop1Image from '../assets/images/regenerated_image_1785579950219.jpg';
import workshop2Image from '../assets/images/regenerated_image_1785579958169.jpg';
import workshop3Image from '../assets/images/regenerated_image_1785579961975.jpg';
import workshop4Image from '../assets/images/regenerated_image_1785579966067.jpg';
import { NavTab } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { PROJECTS_DATA } from '../data/projectsData';
import { 
  ArrowRight, 
  Send, 
  ShieldAlert, 
  Award, 
  Users, 
  FileText, 
  Mic, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Star, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: NavTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  // Animated stats count
  const [stats, setStats] = useState({
    tiktok: 0,
    youtube: 0,
    telegram: 0,
    facebook: 0,
    zalo: 0
  });

  useEffect(() => {
    const duration = 1800;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const targets = {
      tiktok: 70000,
      youtube: 200000,
      telegram: 100000,
      facebook: 150000,
      zalo: 10000
    };

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      setStats({
        tiktok: Math.floor(targets.tiktok * progress),
        youtube: Math.floor(targets.youtube * progress),
        telegram: Math.floor(targets.telegram * progress),
        facebook: Math.floor(targets.facebook * progress),
        zalo: Math.floor(targets.zalo * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

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
                <span>Chuyên Gia Phân Tích & Cố Vấn Đầu Tư Thực Chiến</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.2] mb-6 tracking-tight">
                10 Năm Thực Chiến Tài Chính & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]">Định Hình Tư Duy</span> Đầu Tư Bền Vững
              </h1>
              
              <p className="text-base sm:text-lg text-slate-700 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Góc nhìn phân tích chuyên sâu & Quản trị rủi ro tối ưu từ <strong className="text-slate-900 font-bold">HoangMinhThien</strong>. Đồng hành cùng nhà đầu tư định vị thị trường, kiểm soát cảm xúc và kiến tạo dòng tiền an toàn.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <button 
                  onClick={() => setActiveTab('courses')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#2563EB] text-white rounded-xl font-bold shadow-xl shadow-blue-500/25 hover:bg-[#1D4ED8] hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 text-center flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Khám Phá Khoá Học</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <a 
                  href="https://t.me/hoangminhthien" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 border-2 border-[#BFDBFE] hover:border-[#2563EB] rounded-xl font-bold hover:text-[#2563EB] transition-all text-center flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Send className="w-5 h-5 text-[#2563EB]" />
                  <span>Tham Gia Telegram</span>
                </a>
              </div>

              {/* Social Channels Badge Bar */}
              <div className="pt-6 border-t border-[#E0F2FE]">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 text-center lg:text-left">
                  Kênh Truyền Thông Chính Thức
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <a href="https://www.facebook.com/hoangminhthien.tradecoinvn" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white rounded-xl border border-[#E0F2FE] text-slate-700 hover:text-[#2563EB] hover:border-[#93C5FD] font-semibold text-xs flex items-center space-x-2 shadow-sm transition-all">
                    <span>Facebook</span>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white rounded-xl border border-[#E0F2FE] text-slate-700 hover:text-black hover:border-slate-400 font-semibold text-xs flex items-center space-x-2 shadow-sm transition-all">
                    <span>TikTok</span>
                  </a>
                  <a href="https://www.youtube.com/@hoangminhthien" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white rounded-xl border border-[#E0F2FE] text-slate-700 hover:text-red-600 hover:border-red-300 font-semibold text-xs flex items-center space-x-2 shadow-sm transition-all">
                    <span>YouTube</span>
                  </a>
                  <a href="https://t.me/hoangminhthien" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white rounded-xl border border-[#E0F2FE] text-[#2563EB] hover:bg-[#2563EB] hover:text-white font-semibold text-xs flex items-center space-x-2 shadow-sm transition-all">
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram (20k+)</span>
                  </a>
                  <a href="https://zalo.me" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white rounded-xl border border-[#E0F2FE] text-blue-600 font-bold text-xs flex items-center space-x-2 shadow-sm transition-all">
                    <span>Zalo OA</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Profile Photo & Highlights */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glow border */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#2563EB] to-[#60A5FA] opacity-30 blur-lg"></div>
                
                {/* Profile Card Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white aspect-[4/5]">
                  <img 
                    src={heroImage} 
                    alt="HoangMinhThien - Chuyên gia cố vấn đầu tư" 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs uppercase font-extrabold text-blue-300 tracking-wider mb-1 block">
                      Founder & Lead Analyst
                    </span>
                    <h2 className="text-2xl font-extrabold text-white">Hoàng Minh Thiên</h2>
                    <p className="text-xs text-slate-200 mt-1">10 Năm Kinh Nghiệm Thực Chiến Thị Trường Tài Chính</p>
                  </div>
                </div>

                {/* Floating Badge 1: 10 Years */}
                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#E0F2FE] flex items-center space-x-3 transform -rotate-3 hover:rotate-0 transition-transform hidden sm:flex">
                  <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] text-[#2563EB] flex items-center justify-center font-extrabold text-xl">
                    10+
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">Năm Thực Chiến</div>
                    <div className="text-xs text-slate-500">Thị trường tài chính</div>
                  </div>
                </div>

                {/* Floating Badge 2: Risk Management */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#E0F2FE] flex items-center space-x-3 transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
                    <ShieldAlert className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Quản Trị Rủi Ro Tối Ưu</div>
                    <div className="text-[11px] text-emerald-600 font-semibold">An toàn vốn hàng đầu</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: HÀNH TRÌNH 10 NĂM */}
      <section id="about" className="py-20 lg:py-28 bg-white border-t border-[#E0F2FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold tracking-widest text-[#2563EB] uppercase bg-[#F0F7FF] px-4 py-1.5 rounded-full border border-[#E0F2FE]">
              Câu Chuyện Làm Nghề
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              Hành Trình 10 Năm Từ Thực Chiến Đến Cố Vấn Đầu Tư
            </h2>
            <div className="w-20 h-1 bg-[#2563EB] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* Story copy */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                "Lợi nhuận đến từ sự thấu hiểu, không đến từ sự may mắn."
              </h3>
              
              <p className="text-slate-700 leading-relaxed text-base">
                Tôi bắt đầu hành trình từ những năm thị trường tài chính đầy biến động. Qua hơn <strong className="text-[#2563EB]">10 năm làm nghề</strong> — kinh qua hàng trăm chu kỳ tăng giảm của thị trường, tham gia quản lý danh mục và phân tích chuyên sâu cho hàng ngàn nhà đầu tư — bài học lớn nhất tôi đúc kết được là tính kỷ luật và quản trị rủi ro.
              </p>

              <p className="text-slate-700 leading-relaxed text-base">
                Trang web này không chỉ là nơi chia sẻ kiến thức, mà là cuốn nhật ký thực chiến 10 năm của tôi. Nơi bạn tìm thấy những góc nhìn minh bạch, những dự án được 'soi' kỹ lưỡng và các chương trình đào tạo giúp bạn tự chủ tài chính.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F0F7FF] border border-[#E0F2FE]">
                  <div className="text-[#2563EB] text-base font-bold mb-1 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <span>Phân Tích Dòng Tiền</span>
                  </div>
                  <p className="text-xs text-slate-600">Đọc vị chu kỳ kinh tế vĩ mô & dòng tiền thông minh.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F0F7FF] border border-[#E0F2FE]">
                  <div className="text-emerald-600 text-base font-bold mb-1 flex items-center">
                    <ShieldAlert className="w-4 h-4 mr-2" />
                    <span>Bảo Vệ Tài Sản</span>
                  </div>
                  <p className="text-xs text-slate-600">Chiến lược phân bổ vốn giảm rủi ro tối đa.</p>
                </div>
              </div>
            </div>

            {/* Achievements 4 Cards Grid */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-6">
                
                <div className="bg-gradient-to-br from-[#F0F7FF] to-white p-6 rounded-2xl border border-[#E0F2FE] text-center shadow-sm">
                  <div className="w-12 h-12 bg-[#2563EB] text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mb-1">10+ Năm</div>
                  <div className="text-xs font-semibold text-slate-600">Thực chiến thị trường</div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl border border-emerald-100 text-center shadow-sm">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mb-1">+1.000</div>
                  <div className="text-xs font-semibold text-slate-600">Khách hàng & Học viên</div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl border border-amber-100 text-center shadow-sm">
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mb-1">+500K</div>
                  <div className="text-xs font-semibold text-slate-600">Lượt đọc báo cáo phân tích</div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 text-center shadow-sm">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mb-1">+50</div>
                  <div className="text-xs font-semibold text-slate-600">Sự kiện & Workshop</div>
                </div>

              </div>
            </div>

          </div>

          {/* Workshop & Event Gallery */}
          <div className="pt-8 border-t border-[#E0F2FE]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Hình Ảnh Sự Kiện & Hội Thảo Thực Chiến</h3>
                <p className="text-sm text-slate-500">Các buổi kết nối cộng đồng, workshop đào tạo và gặp gỡ chuyên gia</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="group relative rounded-2xl overflow-hidden shadow-md aspect-video bg-slate-100">
                <img 
                  src={workshop1Image} 
                  alt="Diễn Thuyết Tại Workshop Tài Chính" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold">Diễn Thuyết Tại Workshop Tài Chính</p>
                  <p className="text-[10px] text-slate-300">Chia sẻ góc nhìn kinh tế vĩ mô</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-md aspect-video bg-slate-100">
                <img 
                  src={workshop2Image} 
                  alt="Gặp Gỡ Đối Tác & Quỹ Đầu Tư" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold">Gặp Gỡ Đối Tác & Quỹ Đầu Tư</p>
                  <p className="text-[10px] text-slate-300">Thẩm định dự án thực tế</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-md aspect-video bg-slate-100">
                <img 
                  src={workshop3Image} 
                  alt="Lớp Đào Tạo Chuyên Sâu Masterclass" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold">Lớp Đào Tạo Chuyên Sâu Masterclass</p>
                  <p className="text-[10px] text-slate-300">Hướng dẫn học viên 1-1</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-md aspect-video bg-slate-100">
                <img 
                  src={workshop4Image} 
                  alt="Offline Tín Hiệu & Giao Lưu" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold">Offline Tín Hiệu & Giao Lưu</p>
                  <p className="text-[10px] text-slate-300">Kết nối thành viên Telegram</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: BẢNG CHỈ SỐ MEDIA & PROOF */}
      <section id="media-proof" className="py-20 lg:py-28 bg-[#F0F7FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold tracking-widest text-[#2563EB] uppercase bg-white px-4 py-1.5 rounded-full border border-[#E0F2FE]">
              Sức Ảnh Hưởng Media
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              Sự Tin Tưởng & Kết Nối Từ Cộng Đồng
            </h2>
            <p className="text-slate-600">Được theo dõi và đồng hành bởi hơn 500.000 nhà đầu tư trên khắp các nền tảng truyền thông.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            
            <div className="bg-white p-6 rounded-2xl border border-[#E0F2FE] shadow-sm text-center transform hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-3">
                TK
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                {stats.tiktok.toLocaleString('vi-VN')}+
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">TikTok Followers</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E0F2FE] shadow-sm text-center transform hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-3">
                YT
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                {stats.youtube.toLocaleString('vi-VN')}+
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">YouTube Subs</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#2563EB] shadow-md text-center transform hover:-translate-y-1 transition-transform bg-gradient-to-b from-[#F0F7FF] to-white">
              <div className="w-12 h-12 bg-[#2563EB] text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-3">
                <Send className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] mb-1">
                {stats.telegram.toLocaleString('vi-VN')}+
              </div>
              <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Telegram Members</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E0F2FE] shadow-sm text-center transform hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-3">
                FB
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                {stats.facebook.toLocaleString('vi-VN')}+
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Facebook Follow</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E0F2FE] shadow-sm text-center col-span-2 md:col-span-1 transform hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center font-extrabold text-sm mx-auto mb-3">
                ZALO
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                {stats.zalo.toLocaleString('vi-VN')}+
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Zalo Quan Tâm</div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: KHÓA HỌC PREVIEW */}
      <section id="courses-preview" className="py-20 lg:py-28 bg-white border-t border-[#E0F2FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-[#2563EB] uppercase bg-[#F0F7FF] px-4 py-1.5 rounded-full border border-[#E0F2FE]">
                Đào Tạo Chuyên Sâu
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
                Khóa Học Thực Chiến Mới Nhất
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Nâng cao tư duy, phân tích dòng tiền và tự tin ra quyết định phân bổ vốn.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('courses')}
              className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-[#2563EB] font-extrabold hover:text-[#1D4ED8] transition-colors"
            >
              <span>Xem Tất Cả Khóa Học</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES_DATA.slice(0, 3).map((course) => (
              <div 
                key={course.id}
                onClick={() => setActiveTab('courses')}
                className="bg-white rounded-2xl border border-[#E0F2FE] p-6 shadow-sm hover:shadow-xl hover:border-[#93C5FD] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden aspect-video mb-4 bg-slate-100">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#1E1B4B] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {course.badge}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-[#2563EB] bg-[#F0F7FF] px-2.5 py-0.5 rounded-full">
                      {course.categoryLabel}
                    </span>
                    <span>{course.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors line-clamp-2 mb-3">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0F7FF] flex items-center justify-between text-xs font-bold text-[#2563EB]">
                  <span>{course.lessonsCount} Bài học • {course.duration}</span>
                  <span className="flex items-center group-hover:translate-x-1 transition-transform">
                    Đăng ký ngay <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: REVIEW DỰ ÁN PREVIEW */}
      <section id="projects-preview" className="py-20 lg:py-28 bg-[#F0F7FF] border-t border-[#E0F2FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-[#2563EB] uppercase bg-white px-4 py-1.5 rounded-full border border-[#E0F2FE]">
                Báo Cáo Thẩm Định
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
                Phân Tích & Review Dự Án Nổi Bật
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Góc nhìn minh bạch, minh chứng dữ liệu On-chain & trải nghiệm thực tế.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('projects')}
              className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-[#2563EB] font-extrabold hover:text-[#1D4ED8] transition-colors"
            >
              <span>Xem Tất Cả Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS_DATA.slice(0, 3).map((project) => (
              <div 
                key={project.id}
                onClick={() => setActiveTab('projects')}
                className="bg-white rounded-2xl border border-[#E0F2FE] p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${project.verdictColor}`}>
                      {project.verdict}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{project.riskReward}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors mb-3 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{project.date}</span>
                  <span className="font-extrabold text-[#2563EB] flex items-center">
                    Đọc Review Chi Tiết <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: TELEGRAM HUB BANNER */}
      <section className="py-20 bg-white border-t border-[#E0F2FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#0F172A] rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-blue-100 rounded-full text-xs font-extrabold uppercase tracking-wider">
                Cộng Đồng 20.000+ Nhà Đầu Tư
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                Cập Nhật Tín Hiệu & Phân Tích Hàng Ngày Cùng HoangMinhThien
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Đừng bỏ lỡ bất kỳ nhịp sóng vĩ mô nào. Nhận thông báo báo cáo nghiên cứu hoàn toàn miễn phí trên kênh Telegram chính thức.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                <a 
                  href="https://t.me/taisansotradecoinvn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-[#2563EB] rounded-xl font-extrabold hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5 text-[#2563EB]" />
                  <span>Join Team Telegram</span>
                </a>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="px-8 py-4 bg-transparent border-2 border-white/40 text-white hover:bg-white/10 rounded-xl font-extrabold transition-all"
                >
                  Liên Hệ Trực Tiếp
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
