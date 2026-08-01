import React, { useState } from 'react';
import { NavTab, ContactFormData } from '../types';
import { 
  Mail, 
  Phone, 
  Send, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Youtube, 
  Facebook, 
  Twitter, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface ContactPageProps {
  setActiveTab: (tab: NavTab) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ setActiveTab }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Tư vấn khóa học',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

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
          <span className="text-[#2563EB] font-extrabold">
            LIÊN HỆ & CỐ VẤN
          </span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E0F2FE] shadow-sm mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] bg-[#F0F7FF] px-4 py-1.5 rounded-full border border-[#E0F2FE]">
            Kết Nối Trực Tiếp
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
            Liên Hệ Cùng HoangMinhThien
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Bạn cần tư vấn lộ trình học, hợp tác truyền thông dự án hay gửi câu hỏi thảo luận? Hãy điền thông tin bên dưới hoặc kết nối trực tiếp qua Telegram.
          </p>
        </div>

        {/* Contact Form & Information Grid matching Hình 3 layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* LEFT: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E0F2FE] shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center">
              <MessageSquare className="w-5 h-5 text-[#2563EB] mr-2" />
              Gửi Lời Nhắn Trực Tiếp
            </h2>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3 animate-in fade-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-extrabold text-slate-900">Gửi Yêu Cầu Thành Công!</h3>
                <p className="text-xs text-slate-600">
                  Cảm ơn <strong>{formData.fullName}</strong>. HoangMinhThien và đội ngũ hỗ trợ sẽ phản hồi thông qua email <strong>{formData.email}</strong> trong thời gian sớm nhất.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ fullName: '', email: '', phone: '', subject: 'Tư vấn khóa học', message: '' }); }}
                  className="mt-2 px-6 py-2.5 bg-[#2563EB] text-white rounded-xl text-xs font-bold"
                >
                  Gửi Lời Nhắn Khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F0F7FF] border border-[#E0F2FE] text-xs font-medium focus:outline-none focus:border-[#2563EB] focus:bg-white text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email liên hệ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F0F7FF] border border-[#E0F2FE] text-xs font-medium focus:outline-none focus:border-[#2563EB] focus:bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Số điện thoại / Zalo
                    </label>
                    <input
                      type="tel"
                      placeholder="0901234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F0F7FF] border border-[#E0F2FE] text-xs font-medium focus:outline-none focus:border-[#2563EB] focus:bg-white text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nhu cầu hỗ trợ
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F0F7FF] border border-[#E0F2FE] text-xs font-medium focus:outline-none focus:border-[#2563EB] focus:bg-white text-slate-900"
                    >
                      <option value="Tư vấn khóa học">Đăng ký / Tư vấn Khóa học</option>
                      <option value="Cố vấn 1-1">Cố vấn quản trị danh mục 1-1</option>
                      <option value="Hợp tác truyền thông">Hợp tác truyền thông & Event</option>
                      <option value="Review dự án">Đề xuất Review Dự Án</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nội dung tin nhắn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hãy chi tiết nhu cầu hoặc câu hỏi của bạn..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F0F7FF] border border-[#E0F2FE] text-xs font-medium focus:outline-none focus:border-[#2563EB] focus:bg-white text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#2563EB] text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:bg-[#1D4ED8] transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Thông Tin Ngay</span>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Contact Cards & Community Hub */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0F2FE] shadow-sm space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-[#E0F2FE] pb-4">
                Thông Tin Kênh Chính Thức
              </h2>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0F7FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Email của Thiện</div>
                  <a href="mailto:hoangminhthien.ceo@gmail.com" className="text-sm font-extrabold text-slate-900 hover:text-[#2563EB]">
                    hoangminhthien.ceo@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Xử lý mail trong 24 giờ làm việc</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0F7FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Telegram Thiện</div>
                  <a href="https://t.me/hoangminhthien" target="_blank" rel="noreferrer" className="text-sm font-extrabold text-[#2563EB] hover:underline">
                    t.me/hoangminhthien
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">20.000+ Thành viên thảo luận mỗi ngày</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0F7FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Địa Điểm Workshop</div>
                  <div className="text-sm font-bold text-slate-900">
                    Hà Nội & TP. Hồ Chí Minh
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Lịch hẹn gặp trực tiếp qua Telegram</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#E0F2FE] flex items-center space-x-3 text-xs text-slate-700">
                <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Thời gian hỗ trợ: <strong>08:30 - 21:00 (Thứ 2 - Chủ Nhật)</strong></span>
              </div>
            </div>

            {/* Social Hub Cards matching Hình 3 */}
            <div className="bg-gradient-to-br from-[#1E1B4B] to-[#0F172A] rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
              <h3 className="text-base font-extrabold text-white flex items-center">
                <Sparkles className="w-4 h-4 text-blue-300 mr-2" />
                Tham Gia Mạng Lưới Media
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Theo dõi các buổi Livestream chia sẻ nhận định thị trường hàng tuần trên các kênh chính thức:
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a href="https://www.youtube.com/@hoangminhthien" target="_blank" rel="noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center space-x-2 text-xs font-bold text-white transition-all">
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>YouTube Channel</span>
                </a>
                <a href="https://t.me/taisansotradecoinvn" target="_blank" rel="noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center space-x-2 text-xs font-bold text-white transition-all">
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>Telegram Hub</span>
                </a>
                <a href="https://www.facebook.com/hoangminhthien.tradecoinvn" target="_blank" rel="noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center space-x-2 text-xs font-bold text-white transition-all">
                  <Facebook className="w-4 h-4 text-blue-400" />
                  <span>Facebook Fanpage</span>
                </a>
                <a href="https://zalo.me" target="_blank" rel="noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center space-x-2 text-xs font-bold text-white transition-all">
                  <span className="text-blue-300 font-extrabold">ZALO</span>
                  <span>Zalo Official</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
