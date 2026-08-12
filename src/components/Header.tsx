import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { ROUTES } from '../lib/routes';
import { Send, Menu, X, BookOpen, Layers, PhoneCall, Home, Sparkles, User } from 'lucide-react';

const NAV_ITEMS: { to: string; label: string; icon: React.ReactNode }[] = [
  { to: ROUTES.home, label: 'Trang Chủ', icon: <Home className="w-4 h-4 mr-2" /> },
  { to: ROUTES.about, label: 'Giới Thiệu', icon: <User className="w-4 h-4 mr-2" /> },
  { to: ROUTES.courses, label: 'Khoá Học', icon: <BookOpen className="w-4 h-4 mr-2" /> },
  { to: ROUTES.projects, label: 'Review Dự Án', icon: <Layers className="w-4 h-4 mr-2" /> },
  { to: ROUTES.contact, label: 'Liên Hệ', icon: <PhoneCall className="w-4 h-4 mr-2" /> },
];

export const Header: React.FC = () => {
  const { settings } = useSiteSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo Brand */}
          <Link
            to={ROUTES.home}
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-1"
            aria-label="Về trang chủ HoangMinhThien"
          >
            <div className="w-11 h-11 bg-gradient-to-tr from-[#1D4ED8] to-[#3B82F6] text-white rounded-xl flex items-center justify-center font-extrabold text-2xl shadow-md group-hover:scale-105 transition-transform">
              H
            </div>
            <div className="text-left">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#2563EB] transition-colors block">
                {settings.brand.name}
                <span className="text-[#2563EB]">{settings.brand.nameAccent}</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase block -mt-1">
                {settings.brand.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#F0F7FF] p-1.5 rounded-full border border-[#E0F2FE]">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === ROUTES.home}
                className={({ isActive }) =>
                  `flex items-center px-3.5 lg:px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-[#2563EB] hover:bg-white/80'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Telegram Channel CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={settings.contact.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-105 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Telegram Thiện</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-[#E0F2FE] focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#2563EB]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E0F2FE] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === ROUTES.home}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-slate-700 hover:bg-[#F0F7FF] hover:text-[#2563EB]'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
          <div className="pt-2">
            <a
              href={settings.contact.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-[#2563EB] text-white py-3 rounded-xl font-bold shadow-md hover:bg-[#1D4ED8]"
            >
              <Send className="w-5 h-5" />
              <span>Tham Gia Telegram Ngay</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
