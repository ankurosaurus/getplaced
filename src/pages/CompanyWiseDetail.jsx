import React, { useState, useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { QuestionRow } from '../components/QuestionRow';
import { ProgressRing } from '../components/ProgressRing';
import { Search, ArrowLeft, RotateCcw, Building2 } from 'lucide-react';
import companySheetsData from '../data/companySheets.json';

export const CompanyWiseDetail = ({ slug, onNavigate }) => {
  const sheet = companySheetsData.sheets[slug];
  const { solved, starred, resetSheet } = useProgress();

  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  if (!sheet) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Company sheet not found</h2>
        <button
          onClick={() => onNavigate('/preparation/company-wise-dsa-sheet')}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm"
        >
          Back to Companies
        </button>
      </div>
    );
  }

  const questions = sheet.questions || [];

  const filteredProblems = useMemo(() => {
    return questions.filter(p => {
      const pId = p._id || p.id;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!p.title?.toLowerCase().includes(q) && !p.topic?.toLowerCase().includes(q)) return false;
      }
      if (difficultyFilter !== 'ALL') {
        const diff = (p.difficulty || 'Medium').toLowerCase();
        if (difficultyFilter === 'Easy' && !diff.includes('easy') && !diff.includes('basic')) return false;
        if (difficultyFilter === 'Medium' && !diff.includes('medium')) return false;
        if (difficultyFilter === 'Hard' && !diff.includes('hard')) return false;
      }
      if (statusFilter === 'Solved' && !solved[pId]) return false;
      if (statusFilter === 'Unsolved' && solved[pId]) return false;
      if (statusFilter === 'Starred' && !starred[pId]) return false;
      return true;
    });
  }, [questions, search, difficultyFilter, statusFilter, solved, starred]);

  const solvedCount = questions.filter(p => solved[p._id || p.id]).length;
  const progressPct = questions.length > 0 ? (solvedCount / questions.length) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28 flex flex-col gap-8">
      <div>
        <button
          onClick={() => onNavigate('/preparation/company-wise-dsa-sheet')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Companies</span>
        </button>
      </div>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-lexend">
              Company Specific Sheet
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white">
            {sheet.companyName || 'Company'} DSA Interview Questions
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-3xl font-sans leading-relaxed">
            {sheet.description ||
              `Master the technical interview round with high-yield questions asked at ${sheet.companyName}.`}
          </p>

          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-mono">
              <span className="text-zinc-500">Solved:</span>
              <strong className="text-zinc-900 dark:text-white">
                {solvedCount} / {questions.length}
              </strong>
            </div>

            <button
              onClick={() => {
                const ids = questions.map(p => p._id || p.id);
                resetSheet(slug, ids);
              }}
              className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progress</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center shrink-0">
          <ProgressRing percentage={progressPct} size={90} strokeWidth={8} colorClass="text-blue-500" />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or topics..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-start md:justify-end">
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl text-xs font-medium">
            {['ALL', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  difficultyFilter === diff
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs font-bold'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl text-xs font-medium">
            {['ALL', 'Unsolved', 'Solved', 'Starred'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  statusFilter === st
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs font-bold'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Problems List */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs divide-y divide-zinc-100 dark:divide-zinc-800/80">
        {filteredProblems.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-400">
            No questions match your filter criteria.
          </div>
        ) : (
          filteredProblems.map((prob, idx) => (
            <QuestionRow
              key={prob._id || prob.id || idx}
              problem={prob}
              index={idx}
              sheetTitle={`${sheet.companyName} DSA`}
              sheetSlug={slug}
            />
          ))
        )}
      </div>
    </div>
  );
};
