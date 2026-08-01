import React, { useState, useEffect } from 'react';
import { NavTab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  useEffect(() => {
    // Scroll to top whenever tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F7FF] text-[#0F172A] font-body selection:bg-[#2563EB] selection:text-white">
      {/* Top Fixed Header with navigation menu */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Body depending on active navigation tab */}
      <main className="flex-grow">
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === 'courses' && <CoursesPage setActiveTab={setActiveTab} />}
        {activeTab === 'projects' && <ProjectsPage setActiveTab={setActiveTab} />}
        {activeTab === 'contact' && <ContactPage setActiveTab={setActiveTab} />}
      </main>

      {/* Footer matching Hình 3 layout and style */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
