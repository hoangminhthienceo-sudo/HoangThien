import React from 'react';
import { NavTab } from '../types';
import { Youtube, Send, Facebook, Twitter, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleTabNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Banner - Light Blue Accent Card */}
        <div className="mb-14 p-8 rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#1E3A8A] to-[#0F172A] border border-[#2563EB]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-500/30">
              Nhận Báo Cáo Phân Tích Mới Nhất
            </span>
            <h3 className="text-2xl font-extrabold text-white">
              Gia Nhập Kênh Telegram Chính Thức Của HoangMinhThien
            </h3>
            <p className="text-sm text-slate-300">
              Cập nhật tín hiệu thị trường vĩ mô, cảnh báo rủi ro & danh mục dự án tiềm năng 2026.
            </p>
          </div>
          <a
            href="https://t.me/hoangminhthien"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-8 py-4 bg-[#2563EB] text-white rounded-xl font-bold hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/30 transition-all flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Tham Gia Telegram</span>
          </a>
        </div>

        {/* 4 Columns Grid matching Hình 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1: Brand Info & DMCA */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#2563EB] text-white rounded-xl flex items-center justify-center font-extrabold text-xl shadow-md">
                H
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                HOANG<span className="text-[#3B82F6]">MINHTHIEN</span>
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed pr-4">
              Đồng hành cùng nhà đầu tư định hình tư duy tài chính dài hạn, kiểm soát rủi ro và tìm kiếm cơ hội tăng trưởng bền vững dựa trên 10 năm kinh nghiệm thực chiến.
            </p>

            {/* DMCA & Trust Badge */}
            <div className="pt-2 flex items-center space-x-3">
              <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>DMCA COMPLIANT</span>
              </div>
              <span className="text-xs text-slate-400">Được bảo vệ bản quyền</span>
            </div>
          </div>

          {/* Col 2: VỀ CHÚNG TÔI */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">
              VỀ CHÚNG TÔI
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button onClick={() => handleTabNavigate('home')} className="hover:text-blue-400 transition-colors">
                  Trang Chủ
                </button>
              </li>
              <li>
                <button onClick={() => handleTabNavigate('courses')} className="hover:text-blue-400 transition-colors">
                  Khoá Học Thực Chiến
                </button>
              </li>
              <li>
                <button onClick={() => handleTabNavigate('projects')} className="hover:text-blue-400 transition-colors">
                  Review Dự Án
                </button>
              </li>
              <li>
                <button onClick={() => handleTabNavigate('contact')} className="hover:text-blue-400 transition-colors">
                  Liên Hệ Cố Vấn
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: CHÍNH SÁCH */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">
              CHÍNH SÁCH
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); handleTabNavigate('contact'); }} className="hover:text-blue-400 transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#cookies" onClick={(e) => { e.preventDefault(); handleTabNavigate('contact'); }} className="hover:text-blue-400 transition-colors">
                  Chính sách cookies
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); handleTabNavigate('contact'); }} className="hover:text-blue-400 transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#disclaimer" onClick={(e) => { e.preventDefault(); handleTabNavigate('contact'); }} className="hover:text-blue-400 transition-colors">
                  Miễn trừ trách nhiệm
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: HỖ TRỢ & CỘNG ĐỒNG */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">
              HỖ TRỢ & CỘNG ĐỒNG
            </h4>
            <p className="text-xs text-slate-300 mb-2 flex items-center">
              <Mail className="w-3.5 h-3.5 text-blue-400 mr-2" />
              <span>Email: <a href="mailto:contact@hoangminhthien.com" className="text-blue-300 hover:underline">contact@hoangminhthien.com</a></span>
            </p>
            <p className="text-xs text-slate-300 mb-4 flex items-center">
              <Phone className="w-3.5 h-3.5 text-blue-400 mr-2" />
              <span>Telegram: <a href="https://t.me/hoangminhthien" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">@hoangminhthien</a></span>
            </p>

            {/* Social Icons matching Hình 3 */}
            <div className="flex items-center space-x-2 pt-1">
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube Channel" className="w-9 h-9 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://t.me/hoangminhthien" target="_blank" rel="noreferrer" aria-label="Telegram Channel" className="w-9 h-9 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center hover:bg-[#0088cc] hover:text-white transition-all">
                <Send className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook Page" className="w-9 h-9 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X Twitter" className="w-9 h-9 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://zalo.me" target="_blank" rel="noreferrer" aria-label="Zalo Official" className="w-9 h-9 rounded-full bg-slate-800 text-blue-400 flex items-center justify-center font-bold text-xs hover:bg-blue-600 hover:text-white transition-all">
                ZALO
              </a>
            </div>
          </div>

        </div>

        {/* Disclaimer Note */}
        <div className="pt-6 border-t border-slate-800/80 mb-6">
          <p className="text-[11px] text-slate-400 leading-relaxed italic">
            <strong>Miễn trừ trách nhiệm:</strong> Tất cả thông tin, phân tích và tài liệu trên hoangminhthien.com hoàn toàn mang tính chất chia sẻ kiến thức thực chiến và góc nhìn cá nhân, không cấu thành lời khuyên đầu tư tài chính. Thị trường tài chính luôn tiềm ẩn rủi ro, hãy tự nghiên cứu kỹ lưỡng (DYOR) trước khi đưa ra bất kỳ quyết định phân bổ vốn nào.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400">
          <p>© Copyright By hoangminhthien.com 2026. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-3 sm:mt-0">
            <span className="text-slate-400">Thiết kế chuẩn hóa Google SEO</span>
            <span className="text-slate-400">• Tốc độ tối ưu</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
