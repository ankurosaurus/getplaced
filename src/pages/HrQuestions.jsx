import React, { useState, useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Search, ChevronDown, ChevronRight, Check, Copy, ArrowLeft, Star, FileText } from 'lucide-react';
import hrData from '../data/hrQuestions.json';

export const HrQuestions = ({ onNavigate }) => {
  const { solved, toggleSolved, starred, toggleStarred, notes, setActiveNoteProblem } = useProgress();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedItems, setExpandedItems] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const questions = hrData.questions || [];

  const categories = useMemo(() => {
    const set = new Set();
    questions.forEach(q => {
      if (q.category) set.add(q.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [questions]);

  const filtered = useMemo(() => {
    return questions.filter(q => {
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchTitle = q.title?.toLowerCase().includes(query);
        const matchAns = q.answer?.toLowerCase().includes(query);
        const matchCat = q.category?.toLowerCase().includes(query);
        if (!matchTitle && !matchAns && !matchCat) return false;
      }
      if (selectedCategory !== 'ALL' && q.category !== selectedCategory) return false;
      return true;
    });
  }, [questions, search, selectedCategory]);

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

  const solvedCount = questions.filter(q => solved[`hr_${q.index}`]).length;

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
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-lexend">
          HR & Behavioral Rounds
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-2">
          100 Top HR Interview Questions
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 font-sans">
          Proven STAR frameworks, salary negotiation strategies, conflict resolution, and behavioral model answers for software engineers.
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs font-mono text-zinc-500">
          <span>
            {solvedCount} / {questions.length} Prepared
          </span>
        </div>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search HR questions or keywords..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
        </div>

        {categories.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-white font-semibold'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Question Accordion */}
      <div className="flex flex-col gap-3">
        {filtered.map((item) => {
          const qId = `hr_${item.index}`;
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
                        category: item.category,
                        sheetTitle: '100 HR Questions'
                      });
                    }}
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isSolved
                        ? 'bg-amber-500 text-white border-none'
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
                  {item.category && (
                    <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      {item.category}
                    </span>
                  )}

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
                        category: item.category,
                        sheetTitle: '100 HR Questions'
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

              {isExpanded && (
                <div className="border-t border-zinc-100 dark:border-zinc-800/80 p-6 bg-zinc-50 dark:bg-zinc-950/60 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-lexend">
                      Recommended Model Answer & Framework
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
                          <span>Copy Answer</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div
                    className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
