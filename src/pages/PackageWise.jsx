import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { QuestionRow } from '../components/QuestionRow';
import { ProgressRing } from '../components/ProgressRing';
import { Briefcase, ArrowLeft, RotateCcw, Search } from 'lucide-react';
import packageData from '../data/packageSheets.json';

export const PackageWise = ({ onNavigate }) => {
  const { solved, resetSheet } = useProgress();
  const [selectedPkg, setSelectedPkg] = useState(0);
  const [search, setSearch] = useState('');

  const packages = packageData.packages || [
    { title: 'Service Based (3-6 LPA)' },
    { title: '6-10 LPA' },
    { title: '10-20 LPA' },
    { title: '20-30 LPA' },
    { title: '30-50 LPA' },
    { title: '50+ LPA / FAANG' }
  ];

  const questions = packageData.questions || [];

  // Group questions by package index or package name if present
  const questionsForPkg = questions.filter((q, idx) => {
    if (q.packageIndex !== undefined) {
      return q.packageIndex === selectedPkg;
    }
    // Alternatively split evenly among packages
    const pkgChunkSize = Math.ceil(questions.length / packages.length);
    return Math.floor(idx / pkgChunkSize) === selectedPkg;
  });

  const filtered = questionsForPkg.filter(q => {
    if (search.trim()) {
      const s = search.toLowerCase();
      return q.title?.toLowerCase().includes(s) || q.difficulty?.toLowerCase().includes(s);
    }
    return true;
  });

  const solvedInCurrent = questionsForPkg.filter(q => solved[q._id || q.id]).length;
  const progressPct = questionsForPkg.length > 0 ? (solvedInCurrent / questionsForPkg.length) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 py-4 sm:py-8 flex flex-col gap-6 sm:gap-8 w-full">
      <div>
        <button
          onClick={() => onNavigate('/preparation')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-lexend">
            Salary Tier Roadmap
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-2">
            Package-Wise DSA Sheet
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-3xl font-sans leading-relaxed">
            Curated problem sets calibrated specifically for salary brackets from Service-Based companies (3-6 LPA) up to High-Frequency Trading & Tier-1 FAANG (50+ LPA).
          </p>

          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-mono">
              <span className="text-zinc-500">Tier Solved:</span>
              <strong className="text-zinc-900 dark:text-white">
                {solvedInCurrent} / {questionsForPkg.length}
              </strong>
            </div>

            <button
              onClick={() => {
                const ids = questionsForPkg.map(q => q._id || q.id);
                resetSheet('package-wise', ids);
              }}
              className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tier</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center shrink-0">
          <ProgressRing percentage={progressPct} size={90} strokeWidth={8} colorClass="text-indigo-500" />
        </div>
      </div>

      {/* Package Tier Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-zinc-200 dark:border-zinc-800">
        {packages.map((pkg, idx) => {
          const isSelected = selectedPkg === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedPkg(idx)}
              className={`px-4 py-2.5 text-xs font-bold font-lexend whitespace-nowrap rounded-xl transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {pkg.title || pkg.name || `Tier ${idx + 1}`}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems in this tier..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>
        <span className="text-xs font-mono text-zinc-400">
          {filtered.length} questions
        </span>
      </div>

      {/* Questions list */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs divide-y divide-zinc-100 dark:divide-zinc-800/80">
        {filtered.map((prob, idx) => (
          <QuestionRow
            key={prob._id || prob.id || idx}
            problem={prob}
            index={idx}
            sheetTitle="Package-Wise DSA"
            sheetSlug="package-wise-dsa-sheet"
          />
        ))}
      </div>
    </div>
  );
};
