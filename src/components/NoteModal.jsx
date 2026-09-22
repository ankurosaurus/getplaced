import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import { X, FileText, Check } from 'lucide-react';

export const NoteModal = () => {
  const { activeNoteProblem, setActiveNoteProblem, notes, saveNote } = useProgress();
  const [text, setText] = useState('');

  useEffect(() => {
    if (activeNoteProblem) {
      setText(notes[activeNoteProblem.id] || '');
    }
  }, [activeNoteProblem, notes]);

  if (!activeNoteProblem) return null;

  const handleSave = () => {
    saveNote(activeNoteProblem.id, text);
    setActiveNoteProblem(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-lexend font-bold">
            <FileText className="w-5 h-5 text-indigo-500" />
            <span>Problem Notes</span>
          </div>
          <button
            onClick={() => setActiveNoteProblem(null)}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {activeNoteProblem.title}
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Add key takeaways, time complexity, edge cases, or approach hints for your future revision.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Edge case: empty list. Use 2-pointer sliding window with hashmap..."
            rows={6}
            className="w-full text-sm p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none font-mono"
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => {
              setText('');
              saveNote(activeNoteProblem.id, '');
              setActiveNoteProblem(null);
            }}
            className="text-xs text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 font-medium px-2 py-1"
          >
            Clear Note
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveNoteProblem(null)}
              className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
