import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Building2, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import companySheetsData from '../data/companySheets.json';

export const CompanyWiseIndex = ({ onNavigate }) => {
  const { solved } = useProgress();
  const [search, setSearch] = useState('');

  const companies = companySheetsData.list || [];

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const getCompanySolvedCount = (slug) => {
    const sheet = companySheetsData.sheets[slug];
    if (!sheet || !sheet.questions) return 0;
    return sheet.questions.filter(q => solved[q._id || q.id]).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 py-4 sm:py-8 flex flex-col gap-6 sm:gap-10 w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-500 font-lexend">
          Company Specific Prep
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-1 mb-4">
          Company Wise DSA Sheets
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
          Target your dream company with ultra-curated DSA questions asked in recent interview rounds across 45+ top tech companies.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto mt-8">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company (e.g. Google, Amazon, Meta, Uber)..."
            className="w-full text-sm pl-10 pr-4 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((comp) => {
          const solvedCount = getCompanySolvedCount(comp.slug);
          return (
            <div
              key={comp.slug}
              onClick={() => onNavigate(`/preparation/company-wise-dsa-sheet/${comp.slug}`)}
              className="group p-5 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all font-bold font-lexend text-sm">
                    {comp.name.charAt(0)}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {comp.totalQuestions} Questions
                  </span>
                </div>

                <h3 className="font-lexend font-bold text-base text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {comp.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                  Top frequently asked interview problems at {comp.name}.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-zinc-500">
                  {solvedCount} solved
                </span>
                <span className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
