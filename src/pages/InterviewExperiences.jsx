import React, { useState } from 'react';
import { MessageSquare, Building2, User, ArrowLeft, CheckCircle2, XCircle, Search, ThumbsUp } from 'lucide-react';

export const InterviewExperiences = ({ onNavigate }) => {
  const [search, setSearch] = useState('');

  const experiences = [
    {
      id: 1,
      author: 'Aman Sharma',
      role: 'SDE-1',
      company: 'Google',
      verdict: 'Selected',
      date: 'August 2026',
      rounds: [
        'Round 1 (Online Assessment): 2 questions on sliding window and segment tree.',
        'Round 2 (Technical 1): Graph cycle detection with BFS, follow up on topological sort with constraints.',
        'Round 3 (Technical 2): Design an in-memory key-value store with TTL (LRU Cache variant).',
        'Round 4 (Googliness & Leadership): Conflict resolution in team projects and project tradeoffs.'
      ],
      tips: 'Practice explaining your thoughts aloud. Striver A2Z and NeetCode 150 covered 90% of the pattern variations.'
    },
    {
      id: 2,
      author: 'Pooja Verma',
      role: 'Frontend Engineer',
      company: 'Zomato',
      verdict: 'Selected',
      date: 'July 2026',
      rounds: [
        'Round 1: Machine coding — build an autocomplete search component with debouncing and caching in React.',
        'Round 2: Deep dive into JavaScript event loop, microtasks, React fiber, and virtual DOM reconciliation.',
        'Round 3: System design of real-time live order tracking frontend with WebSockets.'
      ],
      tips: 'Master core JavaScript prototype, closures, and custom React hooks without libraries.'
    },
    {
      id: 3,
      author: 'Rohan Gupta',
      role: 'Backend SDE',
      company: 'Uber',
      verdict: 'Selected',
      date: 'June 2026',
      rounds: [
        'Round 1: Hard Tree problem with lowest common ancestor and path sum variations.',
        'Round 2: System design — Design Uber Ride Matching System with Geo-hashing and Redis.',
        'Round 3: Behavioral round with Engineering Director.'
      ],
      tips: 'Read Gaurav Sen system design and do the 32 questions on Hynts System Design sheet!'
    }
  ];

  const filtered = experiences.filter(e =>
    e.company.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase()) ||
    e.tips.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28 flex flex-col gap-8">
      <div>
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-lexend">
          Real Insights
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-2">
          Genuine Interview Experiences
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 font-sans max-w-3xl leading-relaxed">
          Unfiltered interview debriefs from candidates who appeared for rounds at Google, Amazon, Uber, Zomato, and top Indian startups.
        </p>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, role or keywords..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />
        </div>
      </div>

      {/* Experiences list */}
      <div className="flex flex-col gap-6">
        {filtered.map((exp) => (
          <div
            key={exp.id}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-lexend font-bold text-lg sm:text-xl text-zinc-900 dark:text-white">
                    {exp.company} — {exp.role}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {exp.verdict}
                  </span>
                </div>
                <span className="text-xs text-zinc-400">
                  By {exp.author} • {exp.date}
                </span>
              </div>
            </div>

            {/* Rounds */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-lexend">
                Interview Rounds Breakdown:
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-sans">
                {exp.rounds.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation Tips */}
            <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 text-xs text-zinc-800 dark:text-zinc-200">
              <strong>Key Advice for Aspirants:</strong> {exp.tips}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
