import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem('hynts_banner_dismissed') !== 'true';
    } catch {
      return true;
    }
  });

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem('hynts_banner_dismissed', 'true');
    } catch {}
  };

  return (
    <div className="overflow-hidden w-full shrink-0">
      <div className="relative flex min-h-12 w-full items-center justify-center px-10 py-2.5 bg-[#ffd500] text-zinc-950 shadow-sm">
        <p className="mx-0 max-w-[90%] text-zinc-950 text-xs md:text-sm font-semibold font-lexend text-center flex items-center justify-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-black/10 text-zinc-950 text-[10px] font-extrabold uppercase tracking-wider">
            Placement Season
          </span>
          <span>
            ⚡ Placement drives are lining up. Pick your target sheet, lock in, and protect your streak.
          </span>
        </p>
        <button
          type="button"
          aria-label="Close banner"
          onClick={handleDismiss}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 text-inherit opacity-80 hover:opacity-100 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4 text-current" />
        </button>
      </div>
    </div>
  );
};
