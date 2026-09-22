import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { ProgressRing } from '../components/ProgressRing';
import { Layers, Search, ExternalLink, Check, Star, FileText, ArrowLeft, RotateCcw } from 'lucide-react';
import { YoutubeIcon } from '../components/Icons';
import systemDesignData from '../data/systemDesignSheet.json';

export const SystemDesignSheet = ({ onNavigate }) => {
  const { solved, toggleSolved, starred, toggleStarred, notes, setActiveNoteProblem, resetSheet } = useProgress();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const questions = systemDesignData.questions || [];

  const filtered = questions.filter(item => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchComp = (item.companies || []).some(c => c.toLowerCase().includes(q));
      if (!matchTitle && !matchComp) return false;
    }
    if (typeFilter !== 'ALL' && item.type !== typeFilter) return false;
    return true;
  });

  const solvedCount = questions.filter(item => solved[`sys_${item.id}`]).length;
  const total = questions.length;
  const progressPct = total > 0 ? (solvedCount / total) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28 flex flex-col gap-8">
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
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 font-lexend">
              Architecture & Scalability
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white">
            {systemDesignData.title || 'System Design Interview Sheet'}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-3xl font-sans leading-relaxed">
            {systemDesignData.description ||
              'Master High Level (HLD) and Low Level Design (LLD) with real-world architecture interview scenarios asked at Google, Uber, Netflix, Meta, and Amazon.'}
          </p>

          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-mono">
              <span className="text-zinc-500">Solved:</span>
              <strong className="text-zinc-900 dark:text-white">
                {solvedCount} / {total}
              </strong>
            </div>

            <button
              onClick={() => {
                const ids = questions.map(q => `sys_${q.id}`);
                resetSheet('system-design-sheet', ids);
              }}
              className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progress</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center shrink-0">
          <ProgressRing percentage={progressPct} size={90} strokeWidth={8} colorClass="text-pink-500" />
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
            placeholder="Search system design problems..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
          />
        </div>

        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl text-xs font-medium self-start md:self-auto">
          {['ALL', 'HLD', 'LLD'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1 rounded-lg transition-all ${
                typeFilter === type
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs font-bold'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* System Design Problems List */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs divide-y divide-zinc-100 dark:divide-zinc-800/80">
        {filtered.map((item, idx) => {
          const sysId = `sys_${item.id}`;
          const isSolved = !!solved[sysId];
          const isStarred = !!starred[sysId];
          const hasNote = !!notes[sysId];

          return (
            <div
              key={item.id || idx}
              className={`group flex items-center justify-between gap-3 px-4 py-4 sm:px-6 transition-all ${
                isSolved
                  ? 'bg-zinc-50/50 dark:bg-zinc-950/30 text-zinc-400'
                  : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 text-zinc-900 dark:text-zinc-100'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <button
                  onClick={() =>
                    toggleSolved(sysId, {
                      title: item.title,
                      difficulty: item.type,
                      sheetTitle: 'System Design Sheet'
                    })
                  }
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    isSolved
                      ? 'bg-pink-500 text-white border-none'
                      : 'border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800'
                  }`}
                >
                  {isSolved && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                <span className="text-xs font-mono text-zinc-400 w-6 shrink-0 text-right">
                  {idx + 1}.
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold truncate ${
                        isSolved ? 'line-through text-zinc-400 dark:text-zinc-500' : ''
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                        item.type === 'HLD'
                          ? 'bg-indigo-500/10 text-indigo-500'
                          : 'bg-emerald-500/10 text-emerald-500'
                      }`}
                    >
                      {item.type || 'HLD'}
                    </span>
                  </div>

                  {item.companies && item.companies.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      {item.companies.slice(0, 4).map((c, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right actions: Article, Video, Note, Star */}
              <div className="flex items-center gap-2 shrink-0">
                {item.articleLink && (
                  <a
                    href={item.articleLink}
                    target="_blank"
                    rel="noreferrer"
                    title="Read Architecture Breakdown"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-indigo-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {item.ytLink && (
                  <a
                    href={item.ytLink}
                    target="_blank"
                    rel="noreferrer"
                    title="Watch Video Walkthrough"
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={() => setActiveNoteProblem({ id: sysId, title: item.title })}
                  className={`p-1.5 rounded-lg relative ${
                    hasNote ? 'text-indigo-500 bg-indigo-500/10' : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  {hasNote && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full" />}
                </button>

                <button
                  onClick={() =>
                    toggleStarred(sysId, {
                      title: item.title,
                      difficulty: item.type,
                      sheetTitle: 'System Design Sheet'
                    })
                  }
                  className={`p-1.5 rounded-lg ${
                    isStarred ? 'text-amber-500 fill-amber-500 bg-amber-500/10' : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
