import React, { useState, useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { ProgressRing } from '../components/ProgressRing';
import { Database, Search, Check, Copy, ChevronDown, ChevronRight, RotateCcw, ArrowLeft, Star, FileText } from 'lucide-react';
import sqlSheetData from '../data/sqlSheet.json';

export const SqlSheet = ({ onNavigate }) => {
  const { solved, toggleSolved, starred, toggleStarred, notes, setActiveNoteProblem, resetSheet } = useProgress();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const questions = sqlSheetData.questions || [];

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set();
    questions.forEach(q => {
      if (q.category) set.add(q.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [questions]);

  // Filter questions
  const filtered = useMemo(() => {
    return questions.filter(q => {
      const qId = `sql_${q.index}`;
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchTitle = q.title?.toLowerCase().includes(query);
        const matchCat = q.category?.toLowerCase().includes(query);
        const matchAns = q.answer?.toLowerCase().includes(query);
        if (!matchTitle && !matchCat && !matchAns) return false;
      }
      if (selectedCategory !== 'ALL' && q.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'ALL') {
        const diff = (q.difficulty || 'Medium').toLowerCase();
        if (selectedDifficulty === 'Easy' && !diff.includes('easy')) return false;
        if (selectedDifficulty === 'Medium' && !diff.includes('medium')) return false;
        if (selectedDifficulty === 'Hard' && !diff.includes('hard')) return false;
      }
      return true;
    });
  }, [questions, search, selectedCategory, selectedDifficulty]);

  const solvedCount = questions.filter(q => solved[`sql_${q.index}`]).length;
  const total = questions.length;
  const progressPct = total > 0 ? (solvedCount / total) * 100 : 0;

  const toggleExpand = (idx) => {
    setExpandedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-lexend">
              110 Production Queries
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white">
            {sqlSheetData.title || 'Top 110 Most Asked SQL Interview Queries'}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-3xl font-sans leading-relaxed">
            {sqlSheetData.description ||
              'Comprehensive collection of frequently asked SQL interview queries covering SELECT operations, JOINs, subqueries, aggregations, window functions, and complex real-world data scenarios.'}
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
                const ids = questions.map(q => `sql_${q.index}`);
                resetSheet('sql-sheet', ids);
              }}
              className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset SQL Progress</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center shrink-0">
          <ProgressRing percentage={progressPct} size={90} strokeWidth={8} colorClass="text-emerald-500" />
        </div>
      </div>

      {/* Filter and Categories Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search SQL query, keywords..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl text-xs font-medium self-start md:self-auto">
            {['ALL', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs font-bold'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SQL Questions Accordion Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((item) => {
          const qId = `sql_${item.index}`;
          const isSolved = !!solved[qId];
          const isStarred = !!starred[qId];
          const hasNote = !!notes[qId];
          const isExpanded = !!expandedItems[item.index];

          return (
            <div
              key={item.index}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isSolved
                  ? 'border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-950/30'
                  : 'border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 shadow-xs'
              }`}
            >
              <div
                onClick={() => toggleExpand(item.index)}
                className="p-4 sm:px-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 select-none"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSolved(qId, {
                        title: item.title,
                        difficulty: item.difficulty,
                        category: item.category,
                        sheetTitle: 'Top 110 SQL Sheet'
                      });
                    }}
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isSolved
                        ? 'bg-emerald-500 text-white border-none'
                        : 'border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800'
                    }`}
                  >
                    {isSolved && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <span className="text-xs font-mono text-zinc-400 w-8 shrink-0">
                    #{item.index}
                  </span>

                  <span
                    className={`text-sm font-semibold truncate ${
                      isSolved ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-900 dark:text-zinc-100'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                    {item.category}
                  </span>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                      (item.difficulty || '').toLowerCase() === 'easy'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : (item.difficulty || '').toLowerCase() === 'hard'
                        ? 'bg-rose-500/10 text-rose-500'
                        : 'bg-amber-500/10 text-amber-500'
                    }`}
                  >
                    {item.difficulty || 'Medium'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNoteProblem({ id: qId, title: item.title });
                    }}
                    className={`p-1.5 rounded-lg relative ${
                      hasNote ? 'text-indigo-500 bg-indigo-500/10' : 'text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    {hasNote && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full" />}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStarred(qId, {
                        title: item.title,
                        difficulty: item.difficulty,
                        category: item.category,
                        sheetTitle: 'Top 110 SQL Sheet'
                      });
                    }}
                    className={`p-1.5 rounded-lg ${
                      isStarred ? 'text-amber-500 fill-amber-500 bg-amber-500/10' : 'text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
                  </button>

                  <div className="p-1 text-zinc-400">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded SQL Solution */}
              {isExpanded && (
                <div className="border-t border-zinc-100 dark:border-zinc-800/80 p-5 bg-zinc-50 dark:bg-zinc-950/60 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-lexend">
                      SQL Query & Solution
                    </span>
                    <button
                      onClick={() => copyToClipboard(item.answer, item.index)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-xs font-medium transition-colors cursor-pointer"
                    >
                      {copiedId === item.index ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy SQL</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-zinc-900 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
                    <code>{item.answer}</code>
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
