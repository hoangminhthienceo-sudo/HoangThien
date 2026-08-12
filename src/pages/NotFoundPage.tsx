import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Layers } from 'lucide-react';
import { ROUTES } from '../lib/routes';

export const NotFoundPage: React.FC = () => (
  <div className="min-h-[70vh] bg-[#F0F7FF] pt-28 pb-20 px-4 flex items-center">
    <div className="max-w-lg mx-auto text-center">
      <span className="text-xs font-extrabold tracking-widest text-[#2563EB] uppercase bg-white px-4 py-1.5 rounded-full border border-[#E0F2FE]">
        Không tìm thấy trang
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-5 mb-3">
        Trang này không tồn tại
      </h1>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Đường dẫn có thể đã thay đổi, hoặc bài viết đã được gỡ. Thử một trong các mục dưới đây.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to={ROUTES.home}
          className="w-full sm:w-auto px-6 py-3.5 bg-[#2563EB] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#1D4ED8] transition-all inline-flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Về Trang Chủ
        </Link>
        <Link
          to={ROUTES.courses}
          className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-800 border border-[#E0F2FE] hover:border-[#2563EB] hover:text-[#2563EB] rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Khoá Học
        </Link>
        <Link
          to={ROUTES.projects}
          className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-800 border border-[#E0F2FE] hover:border-[#2563EB] hover:text-[#2563EB] rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2"
        >
          <Layers className="w-4 h-4" />
          Review Dự Án
        </Link>
      </div>
    </div>
  </div>
);
