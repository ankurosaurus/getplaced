import React from 'react';

export const BrandLogo = ({ size = 'default', showWordmark = true, className = '' }) => {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const iconDim = isSmall ? 'w-7 h-7' : isLarge ? 'w-10 h-10' : 'w-8 h-8';
  const textSize = isSmall ? 'text-lg' : isLarge ? 'text-2xl md:text-3xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-2.5 select-none group cursor-pointer ${className}`}>
      {/* Custom Distinctive GetPlaced Emblem */}
      <div className={`relative ${iconDim} shrink-0 flex items-center justify-center`}>
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#ef763f] via-[#8b5cf6] to-[#007ff5] opacity-75 blur-[5px] group-hover:opacity-100 transition-opacity" />

        {/* Squircle Badge */}
        <div className="relative w-full h-full rounded-xl bg-zinc-950 p-[1.5px] shadow-md transition-transform duration-200 group-hover:scale-105">
          <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex items-center justify-center p-1 border border-white/10">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="gpLogoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef763f" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#007ff5" />
                </linearGradient>
                <linearGradient id="gpArrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ef763f" />
                </linearGradient>
              </defs>

              {/* Code Chevron `<` on the left */}
              <path
                d="M12 9L6 16L12 23"
                stroke="url(#gpLogoGradient)"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Upward Ascending Placement Arrow `↗` merging code into career growth */}
              <path
                d="M16 22L25 11"
                stroke="url(#gpArrowGrad)"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 11H25V19"
                stroke="url(#gpArrowGrad)"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Placement target node */}
              <circle cx="25" cy="11" r="1.5" fill="#ef763f" />
            </svg>
          </div>
        </div>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center tracking-tight font-manrope">
            <span className={`${textSize} font-extrabold text-zinc-900 dark:text-white tracking-tight leading-none`}>
              Get<span className="text-[#ef763f]">Placed</span>
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ef763f] ml-1 mb-2 animate-pulse" />
          </div>
          <span className="text-[9.5px] text-zinc-400/90 dark:text-zinc-500 font-medium tracking-wide mt-0.5 select-none">
            by Ankur Jha
          </span>
        </div>
      )}
    </div>
  );
};
