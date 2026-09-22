import React from 'react';
import { FileText, ExternalLink, ArrowLeft, Download, CheckCircle } from 'lucide-react';
import resumeData from '../data/resumeTemplates.json';

export const ResumeTemplates = ({ onNavigate }) => {
  const templates = resumeData.templates || [
    {
      id: 1,
      name: 'Jake\'s Resume (Classic Overleaf)',
      image: 'https://hynts.in/_astro/jake-resume.webp',
      link: 'https://www.overleaf.com/latex/templates/jakes-resume/syzsqbwpfsxd'
    },
    {
      id: 2,
      name: 'Deedy Resume (Two-Column Technical)',
      image: 'https://hynts.in/_astro/deedy-resume.webp',
      link: 'https://www.overleaf.com/latex/templates/deedy-cv/bjryvfsjdyxz'
    },
    {
      id: 3,
      name: 'Modern Clean SDE Resume',
      image: 'https://hynts.in/_astro/faangpath-resume.webp',
      link: 'https://docs.google.com/document/d/1w62y64LqQW7U2i4g_W8L9a1kZzK-Yq7t/edit'
    },
    {
      id: 4,
      name: 'Minimalist Single Column Tech Resume',
      image: 'https://hynts.in/_astro/minimal-resume.webp',
      link: 'https://docs.google.com/document/d/1X5X8yL8J6Vz6Y2o/edit'
    },
    {
      id: 5,
      name: 'Senior / Experienced SDE Resume',
      image: 'https://hynts.in/_astro/senior-resume.webp',
      link: 'https://docs.google.com/document/d/1gTz5q_9YwP-9V7/edit'
    },
    {
      id: 6,
      name: 'Entry Level / Fresher Tech Resume',
      image: 'https://hynts.in/_astro/fresher-resume.webp',
      link: 'https://docs.google.com/document/d/1Kq_9V7X5X8y/edit'
    }
  ];

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
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-lexend">
          ATS Optimized
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-2">
          Curated ATS Resume Templates
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 font-sans max-w-3xl leading-relaxed">
          The exact templates that got candidates interviews at Google, Meta, Microsoft, and Amazon. Formatted for 99%+ ATS parser accuracy in Overleaf LaTeX and Google Docs.
        </p>
      </div>

      {/* Resume Guidelines Card */}
      <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0" />
          <p className="text-xs text-zinc-700 dark:text-zinc-300">
            <strong>Pro Tip:</strong> Quantify your impact using the XYZ formula: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>.
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="group rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-xs flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-xl transition-all"
          >
            {/* Visual Thumbnail */}
            <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center border-b border-zinc-100 dark:border-zinc-800 overflow-hidden relative">
              <div className="w-3/4 h-5/6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm flex flex-col gap-2">
                <div className="h-3 w-1/2 bg-zinc-300 dark:bg-zinc-700 rounded-sm" />
                <div className="h-2 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
                <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 my-1" />
                <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
                <div className="h-2 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
                <div className="h-2 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">
              <h3 className="font-lexend font-bold text-base text-zinc-900 dark:text-white">
                {tpl.name}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                1-page ATS compliant format with optimized typography, margins, and section order.
              </p>

              <div className="pt-2">
                <a
                  href={tpl.link || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <span>Use Template</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
