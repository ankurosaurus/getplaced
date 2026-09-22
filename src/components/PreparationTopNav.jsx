import React from 'react';
import { PanelLeft, ChevronRight, Search, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { ThemeToggle } from './ThemeToggle';

export const PreparationTopNav = ({
  currentPath,
  onNavigate,
  onToggleSidebar,
  onOpenSearch
}) => {
  const { solved } = useProgress();
  const totalSolved = Object.keys(solved).length;

  const pathTitles = {
    preparation: 'Preparation',
    'dsa-sheets': 'DSA Sheets',
    'striver-a2z-dsa-sheet': "Striver's A2Z DSA Sheet",
    'love-babbar-dsa-sheet': 'Love Babbar DSA Sheet',
    'shradha-khapra-dsa-sheet': 'Shradha Didi DSA Sheet',
    'rohit-negi-dsa-sheet': 'Rohit Negi DSA Sheet',
    'arsh-goyal-dsa-sheet': 'Arsh Goyal DSA Sheet',
    'fraz-dsa-sheet': 'Fraz DSA Sheet',
    'neetcode-dsa-sheet': 'Neetcode 150 DSA Sheet',
    'company-wise-dsa-sheet': 'Company Wise DSA',
    '20-essential-dsa-patterns': '20 Essential DSA Patterns',
    'package-wise-dsa-sheet': 'Package Wise DSA Sheet',
    'sql-sheet': 'SQL Sheet',
    'system-design-sheet': 'System Design Sheet',
    'dsa-playlists': 'DSA Playlists',
    'dbms-playlists': 'DBMS Playlists',
    'os-playlists': 'Operating Systems',
    'oops-playlists': 'OOPS Playlists',
    'system-design-playlists': 'System Design Playlists',
    'role-wise': 'Role Wise',
    'most-asked-questions': 'Most Asked Questions',
    'hr-questions': 'HR Questions',
    'cold-email-templets': 'Cold Email Templates',
    notes: 'Cool Notes',
    'resume-templates': 'Resume Templates'
  };

  const formatSegment = (seg) => {
    if (pathTitles[seg]) return pathTitles[seg];
    return seg.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  };

  const segments = currentPath.split('/').filter(Boolean);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 px-4 bg-white/80 dark:bg-[#121214]/80 backdrop-blur-md sticky top-0 z-20">
      {/* Left: Sidebar toggle + separator + breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
          title="Toggle Sidebar"
          aria-label="Toggle Sidebar"
        >
          <PanelLeft className="w-5 h-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>

        <div className="w-px h-5 bg-zinc-200 dark:border-zinc-800/80 mx-1 shrink-0" />

        {/* Mobile Title */}
        <span className="sm:hidden font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate max-w-[140px] font-lexend">
          {segments.length > 1 ? formatSegment(segments[segments.length - 1]) : 'Preparation'}
        </span>

        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="hidden sm:block">
          <ol className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-lexend">
            <li>
              <button
                onClick={() => onNavigate('/preparation')}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Preparation
              </button>
            </li>

            {segments.length <= 1 && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <li className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Dashboard
                </li>
              </>
            )}

            {segments.length > 1 &&
              segments.slice(1).map((seg, idx) => {
                const isLast = idx === segments.length - 2;
                const path = `/${segments.slice(0, idx + 2).join('/')}`;
                return (
                  <React.Fragment key={path}>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <li>
                      {isLast ? (
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {formatSegment(seg)}
                        </span>
                      ) : (
                        <button
                          onClick={() => onNavigate(path)}
                          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                          {formatSegment(seg)}
                        </button>
                      )}
                    </li>
                  </React.Fragment>
                );
              })}
          </ol>
        </nav>
      </div>

      {/* Right: Search, theme toggle, progress */}
      <div className="flex items-center gap-3">
        {totalSolved > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold font-lexend">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{totalSolved} Solved</span>
          </div>
        )}

        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 text-xs font-lexend transition-colors"
          title="Search problems (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Search</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.2 text-[9px] font-mono rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
            ⌘K
          </kbd>
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
};
