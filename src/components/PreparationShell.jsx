import React, { useState } from 'react';
import { AnnouncementBanner } from './AnnouncementBanner';
import { PreparationSidebar } from './PreparationSidebar';
import { PreparationTopNav } from './PreparationTopNav';

export const PreparationShell = ({ currentPath, onNavigate, onOpenSearch, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    // If screen is mobile, toggle mobile drawer
    if (window.innerWidth < 768) {
      setMobileOpen(prev => !prev);
    } else {
      setIsCollapsed(prev => !prev);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-white dark:bg-[#0a0a0c] text-zinc-900 dark:text-zinc-100">
      {/* 1. Top Announcement Banner */}
      <AnnouncementBanner />

      {/* 2. Body with Sidebar & Content */}
      <div className="flex-1 flex w-full min-h-0 relative">
        {/* Left Sidebar */}
        <PreparationSidebar
          currentPath={currentPath}
          onNavigate={onNavigate}
          isCollapsed={isCollapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {/* Right Main Area */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-[padding] duration-200 ease-linear ${
            isCollapsed ? 'md:pl-16' : 'md:pl-64'
          }`}
        >
          {/* Top Nav inside preparation */}
          <PreparationTopNav
            currentPath={currentPath}
            onNavigate={onNavigate}
            onToggleSidebar={toggleSidebar}
            onOpenSearch={onOpenSearch}
          />

          {/* Page Content */}
          <div className="flex-1 flex flex-col p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
