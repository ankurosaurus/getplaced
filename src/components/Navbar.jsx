import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Search, Menu, X, ChevronDown, CheckCircle2, Bookmark, Flame } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = ({ currentPath, onNavigate, onOpenSearch }) => {
  const { solved, streak } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const totalSolved = Object.keys(solved).length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/preparation' },
    { label: 'DSA Sheets', path: '/preparation/dsa-sheets' },
    { label: 'Companies', path: '/preparation/company-wise-dsa-sheet' },
    { label: 'SQL 110', path: '/preparation/sql-sheet' },
    { label: 'System Design', path: '/preparation/system-design-sheet' },
  ];

  const moreLinks = [
    { label: '20 DSA Patterns', path: '/preparation/20-essential-dsa-patterns' },
    { label: 'Package-Wise DSA', path: '/preparation/package-wise-dsa-sheet' },
    { label: 'Role-Wise Sheets', path: '/preparation/role-wise' },
    { label: 'Most Asked Questions', path: '/preparation/most-asked-questions' },
    { label: 'HR Questions', path: '/preparation/hr-questions' },
    { label: 'Curated Notes', path: '/preparation/notes' },
    { label: 'Resume Templates', path: '/preparation/resume-templates' },
    { label: 'Cold Email Templates', path: '/preparation/cold-email-templets' },
    { label: 'Jobs Board', path: '/jobs' },
  ];

  const handleNav = (path) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      {/* Top rainbow gradient accent bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92] z-[70]" />

      <header
        className={`fixed top-2 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-300 rounded-full py-2.5 px-5 md:px-7 ${
          scrolled
            ? 'bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg'
            : 'bg-white/60 dark:bg-black/60 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-800/50'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => handleNav('/')}>
            <BrandLogo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all font-lexend ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all font-lexend"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute top-full right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl py-2 z-50 animate-fade-in"
                >
                  {moreLinks.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNav(item.path)}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Spotlight Search */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-xs"
              title="Quick Search (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-lexend">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-mono rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
                ⌘K
              </kbd>
            </button>

            {/* Total Solved Badge */}
            {totalSolved > 0 && (
              <button
                onClick={() => handleNav('/preparation')}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold font-lexend"
                title="View dashboard"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{totalSolved} Done</span>
              </button>
            )}

            {/* Streak Badge */}
            {streak > 0 && (
              <div
                className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs font-bold font-lexend"
                title={`${streak} day streak`}
              >
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                <span>{streak}</span>
              </div>
            )}

            {/* Dark / Light Mode Toggle */}
            <ThemeToggle />

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md pt-20 px-6 lg:hidden animate-fade-in overflow-y-auto pb-10">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-3 py-1">
              Main Sections
            </div>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold font-lexend transition-colors ${
                  currentPath === link.path
                    ? 'bg-indigo-600 text-white'
                    : 'text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-3 pt-3 pb-1 border-t border-zinc-100 dark:border-zinc-800 mt-2">
              All Preparation Resources
            </div>
            {moreLinks.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className="text-left px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-600"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
