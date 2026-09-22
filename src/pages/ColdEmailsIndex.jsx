import React, { useState } from 'react';
import { Mail, Copy, Check, Search, ArrowLeft, Send } from 'lucide-react';
import coldEmailsData from '../data/coldEmails.json';

export const ColdEmailsIndex = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [copiedKey, setCopiedKey] = useState(null);

  const categories = coldEmailsData.categories || [];

  // Flatten all templates with their category name
  const allTemplates = [];
  categories.forEach(cat => {
    (cat.templates || []).forEach(tpl => {
      allTemplates.push({ ...tpl, categoryTitle: cat.title });
    });
  });

  const filtered = allTemplates.filter(t => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchSub = t.subject?.toLowerCase().includes(q);
      const matchBody = t.body?.toLowerCase().includes(q);
      const matchTitle = t.title?.toLowerCase().includes(q);
      if (!matchSub && !matchBody && !matchTitle) return false;
    }
    if (selectedCat !== 'ALL' && t.categoryTitle !== selectedCat) return false;
    return true;
  });

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
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
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-lexend">
          Career Outreach Kit
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-2">
          Cold Email Templates That Actually Convert
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 font-sans max-w-3xl leading-relaxed">
          High-response email templates customized for hiring manager outreach, employee referral requests, polite follow-ups, and networking.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates by role or subject..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCat('ALL')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              selectedCat === 'ALL'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            All Categories
          </button>
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelectedCat(c.title)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedCat === c.title
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((tpl, idx) => {
          const bodyKey = `body_${idx}`;
          const subKey = `sub_${idx}`;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 font-lexend">
                    {tpl.categoryTitle}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyText(tpl.subject, subKey)}
                      className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-600 dark:text-zinc-400 text-[10px] font-semibold flex items-center gap-1 transition-colors"
                      title="Copy subject line"
                    >
                      {copiedKey === subKey ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Subject</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => copyText(tpl.body, bodyKey)}
                      className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-semibold flex items-center gap-1 transition-colors"
                      title="Copy email body"
                    >
                      {copiedKey === bodyKey ? (
                        <>
                          <Check className="w-3 h-3 text-white" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Body</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <h3 className="font-lexend font-bold text-base text-zinc-900 dark:text-white mb-2">
                  {tpl.title || tpl.subject}
                </h3>

                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 mb-3">
                  <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Subject Line:
                  </div>
                  <div className="text-xs font-mono text-zinc-800 dark:text-zinc-200">
                    {tpl.subject}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 text-xs font-sans text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed">
                  {tpl.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
