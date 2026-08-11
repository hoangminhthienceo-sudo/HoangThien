import React, { useState, useEffect, Suspense, lazy } from 'react';
import { NavTab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { SiteSettingsProvider } from './hooks/useSiteSettings';

/**
 * Trang Admin kéo theo trình soạn thảo WYSIWYG khá nặng. Tách riêng để khách
 * vào xem site không phải tải phần này.
 */
const AdminPage = lazy(() =>
  import('./pages/AdminPage').then((module) => ({ default: module.AdminPage }))
);

/** Trang Admin nằm ngoài menu, truy cập bằng địa chỉ .../#admin */
const isAdminHash = () => window.location.hash.replace(/^#\/?/, '') === 'admin';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [showAdmin, setShowAdmin] = useState<boolean>(isAdminHash);

  // Theo dõi thay đổi hash để vào/ra trang Admin
  useEffect(() => {
    const onHashChange = () => setShowAdmin(isAdminHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    // Scroll to top whenever tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, showAdmin]);

  return (
    <SiteSettingsProvider>
      <div className="min-h-screen flex flex-col bg-[#F0F7FF] text-[#0F172A] font-body selection:bg-[#2563EB] selection:text-white">
        {showAdmin ? (
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">
                Đang tải bảng quản trị…
              </div>
            }
          >
            <AdminPage />
          </Suspense>
        ) : (
          <>
            {/* Top Fixed Header with navigation menu */}
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Page Body depending on active navigation tab */}
            <main className="flex-grow">
              {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
              {activeTab === 'about' && <AboutPage setActiveTab={setActiveTab} />}
              {activeTab === 'courses' && <CoursesPage setActiveTab={setActiveTab} />}
              {activeTab === 'projects' && <ProjectsPage setActiveTab={setActiveTab} />}
              {activeTab === 'contact' && <ContactPage setActiveTab={setActiveTab} />}
            </main>

            {/* Footer matching Hình 3 layout and style */}
            <Footer setActiveTab={setActiveTab} />
          </>
        )}
      </div>
    </SiteSettingsProvider>
  );
}
