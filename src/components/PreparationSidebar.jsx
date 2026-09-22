import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import {
  LayoutDashboard,
  FileCode,
  Building2,
  Fingerprint,
  BadgeDollarSign,
  Database,
  Boxes,
  Users,
  HelpCircle,
  MessageSquare,
  Mail,
  FileText,
  ChevronRight,
  X
} from 'lucide-react';

export const PreparationSidebar = ({
  currentPath,
  onNavigate,
  isCollapsed,
  mobileOpen,
  onCloseMobile
}) => {
  const [dsaSheetsOpen, setDsaSheetsOpen] = useState(() => currentPath.startsWith('/preparation/dsa-sheets'));

  const dsaSheetsList = [
    { title: "Striver's A2Z DSA Sheet", url: "/preparation/dsa-sheets/striver-a2z-dsa-sheet" },
    { title: "Love Babbar DSA Sheet", url: "/preparation/dsa-sheets/love-babbar-dsa-sheet" },
    { title: "Shradha Didi DSA Sheet", url: "/preparation/dsa-sheets/shradha-khapra-dsa-sheet" },
    { title: "Rohit Negi DSA Sheet", url: "/preparation/dsa-sheets/rohit-negi-dsa-sheet" },
    { title: "Arsh Goyal DSA Sheet", url: "/preparation/dsa-sheets/arsh-goyal-dsa-sheet" },
    { title: "Fraz DSA Sheet", url: "/preparation/dsa-sheets/fraz-dsa-sheet" },
    { title: "Neetcode 150 DSA Sheet", url: "/preparation/dsa-sheets/neetcode-dsa-sheet" }
  ];

  const resourcesList = [
    { title: "Role Wise", url: "/preparation/role-wise", Icon: Users },
    { title: "Interview Questions", url: "/preparation/most-asked-questions", Icon: HelpCircle },
    { title: "HR Questions", url: "/preparation/hr-questions", Icon: MessageSquare },
    { title: "Cold Email Templates", url: "/preparation/cold-email-templets", Icon: Mail },
    { title: "Cool Notes", url: "/preparation/notes", Icon: FileText },
    { title: "Resume Templates", url: "/preparation/resume-templates", Icon: FileCode }
  ];

  const handleLinkClick = (url) => {
    onNavigate(url);
    if (onCloseMobile) onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#121214] text-zinc-800 dark:text-zinc-200 border-r border-zinc-200 dark:border-zinc-800/80 font-lexend select-none">
      {/* Sidebar Header with Logo */}
      <div className="h-16 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 px-4 shrink-0">
        <div onClick={() => handleLinkClick('/')}>
          <BrandLogo showWordmark={!isCollapsed} />
        </div>

        {/* Mobile close button */}
        {mobileOpen && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Groups List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Dashboard Link */}
        <div>
          <button
            onClick={() => handleLinkClick('/preparation')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              currentPath === '/preparation'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-[#6366f1] dark:text-indigo-400 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
            title="Dashboard"
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            <span className={isCollapsed ? 'hidden' : 'truncate'}>Dashboard</span>
          </button>
        </div>

        {/* ── SHEETS GROUP ── */}
        <div className="space-y-1">
          <div
            className={`px-3 uppercase text-[11px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 ${
              isCollapsed ? 'hidden' : 'block'
            }`}
          >
            Prep Sheets
          </div>

          {/* DSA Sheets Accordion */}
          <div>
            <button
              onClick={() => {
                if (isCollapsed) handleLinkClick('/preparation/dsa-sheets');
                else setDsaSheetsOpen(!dsaSheetsOpen);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                currentPath.startsWith('/preparation/dsa-sheets')
                  ? 'text-[#6366f1] dark:text-indigo-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
              title="DSA Sheets"
            >
              <div className="flex items-center gap-3 truncate">
                <FileCode className="w-5 h-5 shrink-0" />
                <span className={isCollapsed ? 'hidden' : 'truncate'}>DSA Sheets</span>
              </div>
              {!isCollapsed && (
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    dsaSheetsOpen ? 'rotate-90 text-indigo-500' : 'text-zinc-400'
                  }`}
                />
              )}
            </button>

            {/* Submenu for DSA Sheets */}
            {!isCollapsed && dsaSheetsOpen && (
              <div className="ml-4 pl-3 border-l border-zinc-200 dark:border-zinc-800/80 my-1 space-y-0.5">
                {dsaSheetsList.map((item) => {
                  const isActive = currentPath === item.url;
                  return (
                    <button
                      key={item.url}
                      onClick={() => handleLinkClick(item.url)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors truncate ${
                        isActive
                          ? 'text-[#6366f1] dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40 font-semibold'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'
                      }`}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Company Wise DSA */}
          <button
            onClick={() => handleLinkClick('/preparation/company-wise-dsa-sheet')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              currentPath.startsWith('/preparation/company-wise-dsa-sheet')
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-[#6366f1] dark:text-indigo-400 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
            title="Company Wise DSA"
          >
            <Building2 className="w-5 h-5 shrink-0" />
            <span className={isCollapsed ? 'hidden' : 'truncate'}>Company Wise DSA</span>
          </button>

          {/* 20 DSA Patterns */}
          <button
            onClick={() => handleLinkClick('/preparation/20-essential-dsa-patterns')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              currentPath === '/preparation/20-essential-dsa-patterns'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-[#6366f1] dark:text-indigo-400 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
            title="20 DSA Patterns"
          >
            <Fingerprint className="w-5 h-5 shrink-0" />
            <span className={isCollapsed ? 'hidden' : 'truncate'}>20 DSA Patterns</span>
          </button>

          {/* Package Wise DSA */}
          <button
            onClick={() => handleLinkClick('/preparation/package-wise-dsa-sheet')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              currentPath === '/preparation/package-wise-dsa-sheet'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-[#6366f1] dark:text-indigo-400 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
            title="Package Wise DSA"
          >
            <BadgeDollarSign className="w-5 h-5 shrink-0" />
            <span className={isCollapsed ? 'hidden' : 'truncate'}>Package Wise DSA</span>
          </button>

          {/* SQL Sheet */}
          <button
            onClick={() => handleLinkClick('/preparation/sql-sheet')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              currentPath === '/preparation/sql-sheet'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-[#6366f1] dark:text-indigo-400 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
            title="SQL Sheet"
          >
            <Database className="w-5 h-5 shrink-0" />
            <span className={isCollapsed ? 'hidden' : 'truncate'}>SQL Sheet</span>
          </button>

          {/* System Design Sheet */}
          <button
            onClick={() => handleLinkClick('/preparation/system-design-sheet')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              currentPath === '/preparation/system-design-sheet'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-[#6366f1] dark:text-indigo-400 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
            title="System Design Sheet"
          >
            <Boxes className="w-5 h-5 shrink-0" />
            <span className={isCollapsed ? 'hidden' : 'truncate'}>System Design Sheet</span>
          </button>
        </div>

        {/* ── RESOURCES GROUP (with blue pulsating dot) ── */}
        <div className="space-y-1">
          <div
            className={`px-3 uppercase text-[11px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 flex items-center gap-2 ${
              isCollapsed ? 'hidden' : 'flex'
            }`}
          >
            <span>Placement Toolkit</span>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_2px_rgba(59,130,246,0.6)]" />
          </div>

          {resourcesList.map(({ title, url, Icon }) => {
            const isActive = currentPath.startsWith(url);
            return (
              <button
                key={url}
                onClick={() => handleLinkClick(url)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-[#6366f1] dark:text-indigo-400 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
                title={title}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className={isCollapsed ? 'hidden' : 'truncate'}>{title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtle creator attribution */}
      {!isCollapsed ? (
        <div className="px-4 py-3 border-t border-zinc-200/80 dark:border-zinc-800/80 shrink-0 text-center">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-sans tracking-tight">
            GetPlaced <span className="text-zinc-300 dark:text-zinc-600">•</span> by <span className="font-semibold text-zinc-600 dark:text-zinc-400">Ankur Jha</span>
          </p>
        </div>
      ) : (
        <div className="py-2.5 border-t border-zinc-200/80 dark:border-zinc-800/80 shrink-0 text-center">
          <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 select-none" title="GetPlaced by Ankur Jha">
            AJ
          </span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed inset-y-0 left-0 z-30 transition-all duration-200 ease-linear ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex animate-fade-in">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
