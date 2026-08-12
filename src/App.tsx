import React, { useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SiteSettingsProvider } from './hooks/useSiteSettings';
import { ROUTES } from './lib/routes';

/**
 * Trang Admin kéo theo trình soạn thảo WYSIWYG khá nặng. Tách riêng để khách
 * vào xem site không phải tải phần này.
 */
const AdminPage = lazy(() =>
  import('./pages/AdminPage').then((module) => ({ default: module.AdminPage }))
);

/** Đổi trang thì cuộn lên đầu, trừ khi trình duyệt đang khôi phục vị trí cũ */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

/**
 * Địa chỉ trang quản trị trước đây là /#admin. Tài liệu đã phát cho khách ghi
 * địa chỉ đó nên vẫn phải chuyển hướng về /admin cho người dùng link cũ.
 */
const LegacyHashRedirect: React.FC = () => {
  useEffect(() => {
    const redirect = () => {
      if (window.location.hash.replace(/^#\/?/, '') === 'admin') {
        window.location.replace(ROUTES.admin);
      }
    };
    redirect();
    window.addEventListener('hashchange', redirect);
    return () => window.removeEventListener('hashchange', redirect);
  }, []);
  return null;
};

/** Khung chung cho các trang công khai: header trên, footer dưới */
const PublicLayout: React.FC = () => (
  <>
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <SiteSettingsProvider>
        <ScrollToTop />
        <LegacyHashRedirect />

        <div className="min-h-screen flex flex-col bg-[#F0F7FF] text-[#0F172A] font-body selection:bg-[#2563EB] selection:text-white">
          <Routes>
            {/* Trang quản trị đứng riêng, không có header/footer của site */}
            <Route
              path={ROUTES.admin}
              element={
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">
                      Đang tải bảng quản trị…
                    </div>
                  }
                >
                  <AdminPage />
                </Suspense>
              }
            />

            <Route element={<PublicLayout />}>
              <Route path={ROUTES.home} element={<HomePage />} />
              <Route path={ROUTES.about} element={<AboutPage />} />

              <Route path={ROUTES.courses} element={<CoursesPage />} />
              <Route path={`${ROUTES.courses}/:slug`} element={<CourseDetailPage />} />

              <Route path={ROUTES.projects} element={<ProjectsPage />} />
              <Route path={`${ROUTES.projects}/:slug`} element={<ProjectDetailPage />} />

              <Route path={ROUTES.contact} element={<ContactPage />} />

              {/* Đường dẫn cũ thời còn dùng một trang duy nhất */}
              <Route path="/home" element={<Navigate to={ROUTES.home} replace />} />
              <Route path="/about" element={<Navigate to={ROUTES.about} replace />} />
              <Route path="/courses" element={<Navigate to={ROUTES.courses} replace />} />
              <Route path="/projects" element={<Navigate to={ROUTES.projects} replace />} />
              <Route path="/contact" element={<Navigate to={ROUTES.contact} replace />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>
      </SiteSettingsProvider>
    </BrowserRouter>
  );
}
