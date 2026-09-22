import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { ProgressRing } from '../components/ProgressRing';
import { Code, ArrowRight, CheckCircle2, Star, Sparkles, BookOpen } from 'lucide-react';
import dsaSheetsData from '../data/dsaSheets.json';

export const DsaSheetsIndex = ({ onNavigate }) => {
  const { solved } = useProgress();

  const sheets = [
    {
      slug: 'striver-a2z-dsa-sheet',
      name: 'Strivers A2Z DSA Sheet',
      author: 'Raj Vikramaditya (takeUforward)',
      description: 'The definitive end-to-end DSA roadmap covering from absolute basics, recursion, arrays to advanced graphs and dynamic programming.',
      badge: 'Most Popular',
      color: 'from-amber-500 to-orange-600',
      total: 455
    },
    {
      slug: 'love-babbar-dsa-sheet',
      name: 'Love Babbar 450 DSA Sheet',
      author: 'Love Babbar',
      description: 'Legendary 450 coding questions curated for cracking top product-based companies and FAANG interviews.',
      badge: '450 Questions',
      color: 'from-blue-500 to-indigo-600',
      total: 430
    },
    {
      slug: 'neetcode-dsa-sheet',
      name: 'NeetCode 150 Sheet',
      author: 'NeetCode',
      description: 'The cleanest, most efficient 150-problem set covering all fundamental algorithmic patterns without redundant questions.',
      badge: 'High Yield',
      color: 'from-emerald-500 to-teal-600',
      total: 150
    },
    {
      slug: 'rohit-negi-dsa-sheet',
      name: 'Rohit Negi (Coder Army) Sheet',
      author: 'Rohit Negi',
      description: 'In-depth comprehensive curriculum designed to build raw problem-solving instincts from the ground up.',
      badge: '720+ Problems',
      color: 'from-purple-500 to-violet-600',
      total: 726
    },
    {
      slug: 'shradha-khapra-dsa-sheet',
      name: 'Shradha Khapra DSA Sheet',
      author: 'Shradha Khapra (Apna College)',
      description: 'Beginner-friendly, structured roadmap focusing on core concepts and clarity for college students and freshers.',
      badge: 'College Favorite',
      color: 'from-pink-500 to-rose-600',
      total: 403
    },
    {
      slug: 'fraz-dsa-sheet',
      name: 'Fraz DSA Sheet',
      author: 'Mohammad Fraz',
      description: 'Carefully curated problems emphasizing high-frequency patterns and interview favorites across top startups.',
      badge: 'Placement Focus',
      color: 'from-cyan-500 to-blue-600',
      total: 279
    },
    {
      slug: 'arsh-goyal-dsa-sheet',
      name: 'Arsh Goyal DSA Sheet',
      author: 'Arsh Goyal',
      description: 'Handpicked interview questions with direct company relevance for campus placement drives and off-campus tests.',
      badge: 'Interview Ready',
      color: 'from-yellow-500 to-amber-600',
      total: 287
    }
  ];

  const getSolvedForSheet = (slug) => {
    const sheet = dsaSheetsData[slug];
    if (!sheet || !sheet.sections) return 0;
    let count = 0;
    sheet.sections.forEach(sec => {
      (sec.problems || []).forEach(p => {
        const id = p._id || p.id;
        if (id && solved[id]) count++;
      });
    });
    return count;
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 py-4 sm:py-8 flex flex-col gap-6 sm:gap-10 w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-500 font-lexend">
          The Hall of Fame
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-1 mb-4">
          Curated DSA Sheets
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
          Master Data Structures and Algorithms with the most trusted, battle-tested sheets crafted by India's top software engineering educators.
        </p>
      </div>

      {/* Grid of Sheets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sheets.map((s) => {
          const solvedCount = getSolvedForSheet(s.slug);
          const pct = s.total > 0 ? (solvedCount / s.total) * 100 : 0;
          return (
            <div
              key={s.slug}
              onClick={() => onNavigate(`/preparation/dsa-sheets/${s.slug}`)}
              className="group p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-indigo-500/50 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-lexend">
                    {s.badge}
                  </span>
                  <ProgressRing percentage={pct} size={48} strokeWidth={4.5} />
                </div>

                <h3 className="text-xl font-bold font-lexend text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {s.name}
                </h3>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 block mt-0.5">
                  By {s.author}
                </span>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed font-sans line-clamp-3">
                  {s.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-mono text-zinc-500 dark:text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>
                    {solvedCount} / {s.total} Solved
                  </span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Sheet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
