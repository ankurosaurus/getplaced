import React, { useRef } from 'react';
import { useProgress } from '../context/ProgressContext';
import { ProgressRing } from '../components/ProgressRing';
import { ActivityHeatmap } from '../components/ActivityHeatmap';
import { CheckCircle2, Flame, Star, FileText, Download, Upload, RotateCcw, ArrowRight, Code, Building, Database, Layers, Briefcase, BookOpen } from 'lucide-react';
import dsaSheetsData from '../data/dsaSheets.json';
import companySheetsData from '../data/companySheets.json';
import sqlSheetData from '../data/sqlSheet.json';
import patternsData from '../data/patterns20.json';
import systemDesignData from '../data/systemDesignSheet.json';
import roleWiseData from '../data/roleWise.json';
import hrData from '../data/hrQuestions.json';

export const Dashboard = ({ onNavigate }) => {
  const { solved, starred, notes, streak, exportData, importData, resetAll } = useProgress();
  const fileInputRef = useRef(null);

  const totalSolved = Object.keys(solved).length;
  const totalStarred = Object.keys(starred).length;
  const totalNotes = Object.keys(notes).length;

  // Compute breakdown for categories
  const getSheetSolvedCount = (sheetProblems = []) => {
    let count = 0;
    sheetProblems.forEach(p => {
      const id = p._id || p.id;
      if (id && solved[id]) count++;
    });
    return count;
  };

  // DSA Sheets overall
  let allDsaProblems = [];
  Object.values(dsaSheetsData).forEach(s => {
    (s.sections || []).forEach(sec => {
      allDsaProblems.push(...(sec.problems || []));
    });
  });
  const dsaSolved = getSheetSolvedCount(allDsaProblems);

  // SQL Sheet
  const sqlSolved = getSheetSolvedCount(sqlSheetData.questions || []);

  // 20 Patterns
  let patternProblems = [];
  (patternsData.sections || []).forEach(sec => {
    patternProblems.push(...(sec.problems || []));
  });
  const patternsSolved = getSheetSolvedCount(patternProblems);

  // System design
  const sysSolved = getSheetSolvedCount(systemDesignData.questions || []);

  // HR
  const hrSolved = getSheetSolvedCount(hrData.questions || []);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result);
          importData(parsed);
        } catch (err) {
          alert('Failed to parse backup file: ' + err.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const categories = [
    {
      title: 'DSA Sheets',
      subtitle: 'Striver, Love Babbar, NeetCode, Negi',
      route: '/preparation/dsa-sheets',
      icon: Code,
      solved: dsaSolved,
      total: allDsaProblems.length || 2700,
      color: 'bg-indigo-500'
    },
    {
      title: '20 Essential DSA Patterns',
      subtitle: 'Sliding Window, Two Pointers & more',
      route: '/preparation/20-essential-dsa-patterns',
      icon: Layers,
      solved: patternsSolved,
      total: patternsData.totalProblems || 180,
      color: 'bg-purple-500'
    },
    {
      title: 'Top 110 SQL Sheet',
      subtitle: 'Queries, JOINs, Window Functions',
      route: '/preparation/sql-sheet',
      icon: Database,
      solved: sqlSolved,
      total: sqlSheetData.totalQuestions || 110,
      color: 'bg-emerald-500'
    },
    {
      title: 'Company-Wise DSA',
      subtitle: '45+ MAANG & High-Growth Companies',
      route: '/preparation/company-wise-dsa-sheet',
      icon: Building,
      solved: totalSolved > 0 ? Math.min(totalSolved, 500) : 0,
      total: 1200,
      color: 'bg-blue-500'
    },
    {
      title: 'System Design Sheet',
      subtitle: '32 Scalable LLD & HLD Problems',
      route: '/preparation/system-design-sheet',
      icon: Layers,
      solved: sysSolved,
      total: systemDesignData.totalQuestions || 32,
      color: 'bg-pink-500'
    },
    {
      title: 'HR Interview Questions',
      subtitle: '100 Behavioral & STAR Frameworks',
      route: '/preparation/hr-questions',
      icon: FileText,
      solved: hrSolved,
      total: hrData.totalQuestions || 100,
      color: 'bg-amber-500'
    },
    {
      title: 'Role-Wise Interview Guides',
      subtitle: 'Frontend, Backend, AI, DevOps (20 Roles)',
      route: '/preparation/role-wise',
      icon: Briefcase,
      solved: 0,
      total: 1500,
      color: 'bg-teal-500'
    },
    {
      title: 'Curated Notes & PDF Guides',
      subtitle: 'CN, AWS, Java, Kubernetes, OS',
      route: '/preparation/notes',
      icon: BookOpen,
      solved: 0,
      total: 26,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 py-4 sm:py-8 flex flex-col gap-6 sm:gap-10 w-full">
      {/* ── TOP BANNER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 font-lexend">
            Candidate Dashboard 2.0
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-1">
            Interview Preparation Progress
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
            Track problem consistency, test your recall, and manage your personalized revision bookmarks.
          </p>
        </div>

        {/* Data Backup Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={exportData}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
            title="Export all progress and notes to JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
            title="Import progress from backup JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Backup</span>
          </button>

          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Reset all preparation progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* ── METRIC STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Problems Solved
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-lexend text-zinc-900 dark:text-white mt-1">
              {totalSolved}
            </div>
            <span className="text-[11px] text-emerald-500 font-medium">
              Recorded in Hynts 2.0
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Current Streak
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-lexend text-zinc-900 dark:text-white mt-1">
              {streak} <span className="text-base font-normal text-zinc-400">Days</span>
            </div>
            <span className="text-[11px] text-orange-500 font-medium">
              Keep it going today!
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
            <Flame className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Starred for Revision
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-lexend text-zinc-900 dark:text-white mt-1">
              {totalStarred}
            </div>
            <span className="text-[11px] text-amber-500 font-medium">
              High-yield review
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
            <Star className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Personal Notes
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-lexend text-zinc-900 dark:text-white mt-1">
              {totalNotes}
            </div>
            <span className="text-[11px] text-indigo-500 font-medium">
              Approach hints saved
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ── CONSISTENCY HEATMAP ── */}
      <ActivityHeatmap />

      {/* ── PREPARATION MODULES BREAKDOWN ── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold font-lexend text-zinc-900 dark:text-white">
            Preparation Modules & Trackers
          </h2>
          <span className="text-xs text-zinc-400 font-medium">
            Click any module to jump in
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const pct = cat.total > 0 ? (cat.solved / cat.total) * 100 : 0;
            return (
              <div
                key={i}
                onClick={() => onNavigate(cat.route)}
                className="group p-5 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <ProgressRing percentage={pct} size={42} strokeWidth={4} />
                  </div>

                  <h3 className="font-lexend font-bold text-base text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-zinc-500 dark:text-zinc-400">
                    {cat.solved} / {cat.total} solved
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-indigo-500 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── STARRED REVISION LIST ── */}
      {totalStarred > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-lexend font-bold text-lg text-zinc-900 dark:text-white">
              Starred for Revision ({totalStarred})
            </h3>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {Object.values(starred).map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {item.sheetTitle || 'Revision Question'} • {item.difficulty || 'Medium'}
                  </div>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                  >
                    Solve Again →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
