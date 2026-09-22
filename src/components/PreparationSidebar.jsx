import React, { useState } from 'react';
import {
  Sparkles,
  LayoutDashboard,
  FileCode,
  Building2,
  Fingerprint,
  BadgeDollarSign,
  Database,
  Boxes,
  PlaySquare,
  BookOpen,
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
  const [dsaPlaylistsOpen, setDsaPlaylistsOpen] = useState(() => currentPath.startsWith('/preparation/dsa-playlists'));
  const [coreSubjectsOpen, setCoreSubjectsOpen] = useState(() =>
    currentPath.startsWith('/preparation/dbms') ||
    currentPath.startsWith('/preparation/os') ||
    currentPath.startsWith('/preparation/oops')
  );
  const [sysDesignPlaylistsOpen, setSysDesignPlaylistsOpen] = useState(() =>
    currentPath.startsWith('/preparation/system-design-playlists')
  );

  const dsaSheetsList = [
    { title: "Striver's A2Z DSA Sheet", url: "/preparation/dsa-sheets/striver-a2z-dsa-sheet" },
    { title: "Love Babbar DSA Sheet", url: "/preparation/dsa-sheets/love-babbar-dsa-sheet" },
    { title: "Shradha Didi DSA Sheet", url: "/preparation/dsa-sheets/shradha-khapra-dsa-sheet" },
    { title: "Rohit Negi DSA Sheet", url: "/preparation/dsa-sheets/rohit-negi-dsa-sheet" },
    { title: "Arsh Goyal DSA Sheet", url: "/preparation/dsa-sheets/arsh-goyal-dsa-sheet" },
    { title: "Fraz DSA Sheet", url: "/preparation/dsa-sheets/fraz-dsa-sheet" },
    { title: "Neetcode 150 DSA Sheet", url: "/preparation/dsa-sheets/neetcode-dsa-sheet" }
  ];

  const dsaPlaylistsList = [
    { title: "Love Babbar DSA", url: "/preparation/dsa-playlists/love-babbar-dsa-playlist" },
    { title: "Shradha Khapra DSA", url: "/preparation/dsa-playlists/shradha-khapra-dsa-playlist" },
    { title: "Rohit Negi DSA", url: "/preparation/dsa-playlists/rohit-negi-dsa-playlist" }
  ];

  const coreSubjectsGroups = [
    {
      group: "DBMS Playlists",
      items: [
        { title: "Love Babbar DBMS", url: "/preparation/dbms-playlists/love-babbar-dbms-playlist" },
        { title: "Riti Kumari DBMS", url: "/preparation/dbms-playlists/riti-kumari-dbms-playlist" }
      ]
    },
    {
      group: "Operating Systems",
      items: [
        { title: "Love Babbar OS", url: "/preparation/os-playlists/love-babbar-os-playlist" },
        { title: "Riti Kumari OS", url: "/preparation/os-playlists/riti-kumari-os-playlist" },
        { title: "Vivek Gupta OS", url: "/preparation/os-playlists/vivek-gupta-os-playlist" },
        { title: "Neso Academy OS", url: "/preparation/os-playlists/neso-academy-os-playlist" }
      ]
    },
    {
      group: "OOPS Playlists",
      items: [
        { title: "Code With Harry OOP", url: "/preparation/oops-playlists/code-with-harry-oops-playlist" },
        { title: "Rohit Negi OOP", url: "/preparation/oops-playlists/rohit-negi-oops-playlist" },
        { title: "Jenny's OOP", url: "/preparation/oops-playlists/jenny-lecture-oops-playlist" }
      ]
    }
  ];

  const systemDesignPlaylistsList = [
    { title: "Gaurav Sen HLD", url: "/preparation/system-design-playlists/gaurav-sen-system-design-playlist" },
    { title: "Exponent HLD", url: "/preparation/system-design-playlists/exponent-system-design-playlist" },
    { title: "Hello Interview HLD", url: "/preparation/system-design-playlists/hello-interview-system-design-playlist" },
    { title: "Code With Aryan LLD", url: "/preparation/system-design-playlists/code-with-aryan-system-design-playlist" },
    { title: "Coder Army LLD", url: "/preparation/system-design-playlists/coder-army-system-design-playlist" },
    { title: "Engineering Digest HLD", url: "/preparation/system-design-playlists/engineering-digest-system-design-playlist" }
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
        <div
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className={`flex items-center gap-1.5 ${isCollapsed ? 'hidden' : 'flex'}`}>
            <span className="font-lexend font-black text-xl tracking-tight text-zinc-900 dark:text-white">
              Get<span className="text-indigo-600 dark:text-indigo-400">Placed</span>
            </span>
          </div>
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

        {/* ── START LEARNING GROUP ── */}
        <div className="space-y-1">
          <div
            className={`px-3 uppercase text-[11px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 ${
              isCollapsed ? 'hidden' : 'block'
            }`}
          >
            Learning Tracks
          </div>

          {/* DSA Playlists */}
          <div>
            <button
              onClick={() => {
                if (isCollapsed) handleLinkClick('/preparation/dsa-playlists');
                else setDsaPlaylistsOpen(!dsaPlaylistsOpen);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                currentPath.startsWith('/preparation/dsa-playlists')
                  ? 'text-[#6366f1] dark:text-indigo-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
              title="DSA Playlists"
            >
              <div className="flex items-center gap-3 truncate">
                <PlaySquare className="w-5 h-5 shrink-0" />
                <span className={isCollapsed ? 'hidden' : 'truncate'}>DSA Playlists</span>
              </div>
              {!isCollapsed && (
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    dsaPlaylistsOpen ? 'rotate-90 text-indigo-500' : 'text-zinc-400'
                  }`}
                />
              )}
            </button>

            {!isCollapsed && dsaPlaylistsOpen && (
              <div className="ml-4 pl-3 border-l border-zinc-200 dark:border-zinc-800/80 my-1 space-y-0.5">
                {dsaPlaylistsList.map((item) => (
                  <button
                    key={item.url}
                    onClick={() => handleLinkClick(item.url)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 truncate"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Core Subjects */}
          <div>
            <button
              onClick={() => {
                if (isCollapsed) handleLinkClick('/preparation/dbms-playlists');
                else setCoreSubjectsOpen(!coreSubjectsOpen);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                currentPath.startsWith('/preparation/dbms') ||
                currentPath.startsWith('/preparation/os') ||
                currentPath.startsWith('/preparation/oops')
                  ? 'text-[#6366f1] dark:text-indigo-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
              title="Core Subjects"
            >
              <div className="flex items-center gap-3 truncate">
                <BookOpen className="w-5 h-5 shrink-0" />
                <span className={isCollapsed ? 'hidden' : 'truncate'}>Core Subjects</span>
              </div>
              {!isCollapsed && (
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    coreSubjectsOpen ? 'rotate-90 text-indigo-500' : 'text-zinc-400'
                  }`}
                />
              )}
            </button>

            {!isCollapsed && coreSubjectsOpen && (
              <div className="ml-4 pl-3 border-l border-zinc-200 dark:border-zinc-800/80 my-1 space-y-2">
                {coreSubjectsGroups.map((grp) => (
                  <div key={grp.group} className="space-y-0.5">
                    <span className="px-2 text-[10px] uppercase font-bold text-zinc-400">
                      {grp.group}
                    </span>
                    {grp.items.map((item) => (
                      <button
                        key={item.url}
                        onClick={() => handleLinkClick(item.url)}
                        className="w-full text-left px-2.5 py-1 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 truncate"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Design Playlists */}
          <div>
            <button
              onClick={() => {
                if (isCollapsed) handleLinkClick('/preparation/system-design-playlists');
                else setSysDesignPlaylistsOpen(!sysDesignPlaylistsOpen);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                currentPath.startsWith('/preparation/system-design-playlists')
                  ? 'text-[#6366f1] dark:text-indigo-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
              title="System Design Playlists"
            >
              <div className="flex items-center gap-3 truncate">
                <Boxes className="w-5 h-5 shrink-0" />
                <span className={isCollapsed ? 'hidden' : 'truncate'}>System Design Playlists</span>
              </div>
              {!isCollapsed && (
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    sysDesignPlaylistsOpen ? 'rotate-90 text-indigo-500' : 'text-zinc-400'
                  }`}
                />
              )}
            </button>

            {!isCollapsed && sysDesignPlaylistsOpen && (
              <div className="ml-4 pl-3 border-l border-zinc-200 dark:border-zinc-800/80 my-1 space-y-0.5">
                {systemDesignPlaylistsList.map((item) => (
                  <button
                    key={item.url}
                    onClick={() => handleLinkClick(item.url)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 truncate"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
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
