import React, { useState, useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Search, ChevronDown, ChevronRight, Check, Copy, ArrowLeft, Star, FileText } from 'lucide-react';
import roleWiseData from '../data/roleWise.json';

export const RoleWiseDetail = ({ slug, onNavigate }) => {
  const role = roleWiseData.roles[slug];
  const { solved, toggleSolved, starred, toggleStarred, notes, setActiveNoteProblem } = useProgress();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [expandedItems, setExpandedItems] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  if (!role) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Role guide not found</h2>
        <button
          onClick={() => onNavigate('/preparation/role-wise')}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm"
        >
          Back to Roles
        </button>
      </div>
    );
  }

  const questions = role.questions || [];

  const categories = useMemo(() => {
    const set = new Set();
    questions.forEach(q => {
      if (q.category) set.add(q.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [questions]);

  const filtered = useMemo(() => {
    return questions.filter(q => {
      const qId = `${role.storageKey}_${q.index}`;
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchTitle = q.title?.toLowerCase().includes(query);
        const matchAns = q.answer?.toLowerCase().includes(query);
        const matchCat = q.category?.toLowerCase().includes(query);
        if (!matchTitle && !matchAns && !matchCat) return false;
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
  }, [questions, search, selectedCategory, selectedDifficulty, role.storageKey]);

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

  const solvedCount = questions.filter(q => solved[`${role.storageKey}_${q.index}`]).length;

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 py-4 sm:py-8 flex flex-col gap-6 sm:gap-8 w-full">
      <div>
        <button
          onClick={() => onNavigate('/preparation/role-wise')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Roles</span>
        </button>
      </div>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-lexend">
          Role Interview Guide
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-2">
          {role.roleName} Interview Questions
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 font-sans">
          Top {questions.length} interview questions with in-depth technical explanations and code answers.
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs font-mono text-zinc-500">
          <span>
            {solvedCount} / {questions.length} Solved
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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

        {categories.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="flex flex-col gap-3">
        {filtered.map((item) => {
          const qId = `${role.storageKey}_${item.index}`;
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
                        sheetTitle: `${role.roleName} Guide`
                      });
                    }}
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isSolved
                        ? 'bg-indigo-500 text-white border-none'
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
                        sheetTitle: `${role.roleName} Guide`
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

              {/* Expanded Answer Content */}
              {isExpanded && (
                <div className="border-t border-zinc-100 dark:border-zinc-800/80 p-6 bg-zinc-50 dark:bg-zinc-950/60 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-lexend">
                      Answer & Explanation
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
