import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useProgress();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/70 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-all duration-200 cursor-pointer active:scale-90 select-none overflow-hidden group shadow-xs ${className}`}
      title={isDark ? 'Switch to Bright / Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Glow highlight */}
      <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-amber-500/10 via-orange-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Sun Icon (Dark mode active -> visible, rotating in) */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out transform ${
          isDark
            ? 'rotate-0 scale-100 opacity-100 text-amber-400'
            : '-rotate-90 scale-0 opacity-0 text-amber-500'
        }`}
      >
        <Sun className="w-4.5 h-4.5" />
      </span>

      {/* Moon Icon (Light mode active -> visible, rotating in) */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out transform ${
          isDark
            ? 'rotate-90 scale-0 opacity-0 text-zinc-400'
            : 'rotate-0 scale-100 opacity-100 text-zinc-700'
        }`}
      >
        <Moon className="w-4.5 h-4.5 fill-zinc-700/20" />
      </span>
    </button>
  );
};
