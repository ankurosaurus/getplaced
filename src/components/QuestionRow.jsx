import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { ExternalLink, Star, FileText, Check } from 'lucide-react';
import { YoutubeIcon } from './Icons';

export const QuestionRow = ({ problem, index, sheetTitle = '', sheetSlug = '' }) => {
  const { solved, toggleSolved, starred, toggleStarred, notes, setActiveNoteProblem } = useProgress();

  const problemId = problem._id || problem.id || `${sheetSlug}_${index}_${problem.title}`;
  const isSolved = !!solved[problemId];
  const isStarred = !!starred[problemId];
  const hasNote = !!notes[problemId];

  const getDifficultyBadge = (diff) => {
    const d = (diff || 'Medium').toLowerCase();
    if (d.includes('easy') || d.includes('basic')) {
      return (
        <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Easy
        </span>
      );
    }
    if (d.includes('hard')) {
      return (
        <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
          Hard
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
        Medium
      </span>
    );
  };

  const problemUrl = problem.problemUrl || problem.link || problem.url || problem.articleLink;
  const videoUrl = problem.resource || problem.ytLink || problem.videoUrl;

  return (
    <div
      className={`group flex items-center justify-between gap-3 px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800/80 transition-all ${
        isSolved
          ? 'bg-zinc-50/70 dark:bg-zinc-900/30 text-zinc-400 dark:text-zinc-500'
          : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 text-zinc-900 dark:text-zinc-100'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/* Solved Checkbox */}
        <button
          onClick={() =>
            toggleSolved(problemId, {
              title: problem.title,
              url: problemUrl,
              difficulty: problem.difficulty,
              sheetTitle,
              sheetSlug
            })
          }
          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0 ${
            isSolved
              ? 'bg-emerald-500 text-white border-none'
              : 'border border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 bg-white dark:bg-zinc-800'
          }`}
          aria-label={isSolved ? "Mark uncompleted" : "Mark completed"}
        >
          {isSolved && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Index number */}
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 w-6 shrink-0 text-right">
          {index + 1}.
        </span>

        {/* Problem Title & External Link */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {problemUrl ? (
            <a
              href={problemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate flex items-center gap-1.5 ${
                isSolved ? 'line-through text-zinc-400 dark:text-zinc-500' : ''
              }`}
            >
              <span className="truncate">{problem.title}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-zinc-400 shrink-0 transition-opacity" />
            </a>
          ) : (
            <span
              className={`text-sm font-medium truncate ${
                isSolved ? 'line-through text-zinc-400 dark:text-zinc-500' : ''
              }`}
            >
              {problem.title}
            </span>
          )}

          {/* Platform badge if present */}
          {problem.platform && (
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono uppercase rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 shrink-0">
              {problem.platform}
            </span>
          )}
        </div>
      </div>

      {/* Right controls: Difficulty, Video, Notes, Star */}
      <div className="flex items-center gap-2 shrink-0">
        {getDifficultyBadge(problem.difficulty)}

        {/* Video solution link */}
        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Watch Video Solution"
            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
          >
            <YoutubeIcon className="w-4 h-4" />
          </a>
        )}

        {/* Note button */}
        <button
          onClick={() =>
            setActiveNoteProblem({
              id: problemId,
              title: problem.title
            })
          }
          title={hasNote ? "Edit your note" : "Add a personal note"}
          className={`p-1.5 rounded-lg relative transition-colors ${
            hasNote
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10'
              : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          {hasNote && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-500" />
          )}
        </button>

        {/* Star / Bookmark button */}
        <button
          onClick={() =>
            toggleStarred(problemId, {
              title: problem.title,
              url: problemUrl,
              difficulty: problem.difficulty,
              sheetTitle,
              sheetSlug
            })
          }
          title={isStarred ? "Remove from revision" : "Bookmark for revision"}
          className={`p-1.5 rounded-lg transition-colors ${
            isStarred
              ? 'text-amber-500 fill-amber-500 bg-amber-500/10'
              : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
};
