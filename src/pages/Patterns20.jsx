import React, { useState, useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { QuestionRow } from '../components/QuestionRow';
import { ProgressRing } from '../components/ProgressRing';
import { Search, ChevronDown, ChevronRight, CheckCheck, RotateCcw, ArrowLeft, Layers } from 'lucide-react';
import patternsData from '../data/patterns20.json';

export const Patterns20 = ({ onNavigate }) => {
  const { solved, starred, markMultipleSolved, resetSheet } = useProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expandedSections, setExpandedSections] = useState({});

  const allProblems = useMemo(() => {
    const list = [];
    (patternsData.sections || []).forEach(sec => {
      (sec.problems || []).forEach(prob => {
        list.push({ ...prob, sectionTopic: sec.topic });
      });
    });
    return list;
  }, []);

  const solvedCount = useMemo(() => {
    return allProblems.filter(p => solved[p._id || p.id]).length;
  }, [allProblems, solved]);

  const totalProblems = allProblems.length;
  const progressPct = totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

  const toggleSection = (idx) => {
    setExpandedSections(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

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
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-lexend">
              20 Core Patterns
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              MAANG Engineering Curriculum
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white">
            {patternsData.title || '20 Essential DSA Patterns'}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-3xl font-sans leading-relaxed">
            {patternsData.description ||
              'Master Data Structures & Algorithms (DSA) with the ultimate pattern-based roadmap. Learn once, solve hundreds.'}
          </p>

          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-mono">
              <span className="text-zinc-500">Solved:</span>
              <strong className="text-zinc-900 dark:text-white">
                {solvedCount} / {totalProblems}
              </strong>
            </div>

            <button
              onClick={() => {
                const ids = allProblems.map(p => p._id || p.id);
                resetSheet('patterns20', ids);
              }}
              className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progress</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center shrink-0">
          <ProgressRing percentage={progressPct} size={90} strokeWidth={8} colorClass="text-purple-500" />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pattern or problem..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
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

      {/* Patterns Accordion */}
      <div className="flex flex-col gap-4">
        {(patternsData.sections || []).map((sec, sIdx) => {
          const filteredProblems = (sec.problems || []).filter(p => {
            const pId = p._id || p.id;
            if (searchQuery.trim()) {
              const q = searchQuery.toLowerCase();
              const matchTitle = p.title?.toLowerCase().includes(q);
              const matchTopic = sec.topic?.toLowerCase().includes(q);
              if (!matchTitle && !matchTopic) return false;
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

          if (filteredProblems.length === 0 && (searchQuery.trim() || difficultyFilter !== 'ALL' || statusFilter !== 'ALL')) {
            return null;
          }

          const isExpanded = !!expandedSections[sIdx];
          const secSolvedCount = (sec.problems || []).filter(p => solved[p._id || p.id]).length;
          const secTotalCount = (sec.problems || []).length;
          const isAllSecSolved = secTotalCount > 0 && secSolvedCount === secTotalCount;

          return (
            <div
              key={sIdx}
              className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs"
            >
              <div
                onClick={() => toggleSection(sIdx)}
                className="flex items-center justify-between p-4 sm:px-6 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40 select-none transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="p-1 text-zinc-400">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold font-lexend text-zinc-900 dark:text-zinc-100 truncate">
                      {sec.topic}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {secSolvedCount}/{secTotalCount}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const pIds = (sec.problems || []).map(p => p._id || p.id);
                      markMultipleSolved(pIds, !isAllSecSolved);
                    }}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      isAllSecSolved
                        ? 'bg-emerald-500 text-white'
                        : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                    title={isAllSecSolved ? "Mark section incomplete" : "Mark entire section solved"}
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-zinc-100 dark:border-zinc-800/80 divide-y divide-zinc-100 dark:divide-zinc-800/80">
                  {filteredProblems.map((prob, pIdx) => (
                    <QuestionRow
                      key={prob._id || prob.id || pIdx}
                      problem={prob}
                      index={pIdx}
                      sheetTitle="20 Essential DSA Patterns"
                      sheetSlug="20-essential-dsa-patterns"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
