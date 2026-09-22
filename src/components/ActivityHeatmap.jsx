import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { Flame, Calendar, Trophy } from 'lucide-react';

export const ActivityHeatmap = () => {
  const { activity, streak } = useProgress();

  // Generate the last 180 days (approx 26 weeks)
  const days = [];
  const today = new Date();
  for (let i = 181; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    days.push({
      dateStr,
      date: d,
      count: activity[dateStr] || 0
    });
  }

  // Calculate total solved across activity
  const totalSolvedFromActivity = Object.values(activity).reduce((a, b) => a + b, 0);
  const activeDaysCount = Object.values(activity).filter(c => c > 0).length;

  const getColorClass = (count) => {
    if (!count || count === 0) return 'bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/40 dark:border-zinc-700/30';
    if (count === 1) return 'bg-emerald-300 dark:bg-emerald-950 border border-emerald-400 dark:border-emerald-800';
    if (count <= 3) return 'bg-emerald-400 dark:bg-emerald-800 border border-emerald-500 dark:border-emerald-700';
    if (count <= 6) return 'bg-emerald-500 dark:bg-emerald-600 border border-emerald-600 dark:border-emerald-500';
    return 'bg-emerald-600 dark:bg-emerald-400 border border-emerald-700 dark:border-emerald-300';
  };

  return (
    <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <h3 className="font-lexend font-bold text-base text-zinc-900 dark:text-zinc-100">
              Consistency Tracker
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Solve daily to build momentum and maintain your interview prep streak.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400">
            <Flame className="w-4 h-4 animate-bounce" />
            <span className="text-xs font-bold font-lexend">
              {streak} {streak === 1 ? 'Day' : 'Days'} Streak
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-bold font-lexend">
              {activeDaysCount} Active Days
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5">
          {days.map((day) => (
            <div
              key={day.dateStr}
              title={`${day.dateStr}: ${day.count} solved`}
              className={`w-3.5 h-3.5 rounded-xs transition-colors cursor-pointer hover:scale-125 ${getColorClass(
                day.count
              )}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 text-[11px] text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800/80 mt-2">
        <span>Past 6 Months</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-xs bg-zinc-100 dark:bg-zinc-800/60" />
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-300 dark:bg-emerald-950" />
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-400 dark:bg-emerald-800" />
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500 dark:bg-emerald-600" />
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-600 dark:bg-emerald-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
