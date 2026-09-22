import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Code, Building, Database, BookOpen, Layers, Briefcase, FileText, ChevronRight } from 'lucide-react';
import dsaSheetsData from '../data/dsaSheets.json';
import companySheetsData from '../data/companySheets.json';
import sqlSheetData from '../data/sqlSheet.json';
import patternsData from '../data/patterns20.json';
import systemDesignData from '../data/systemDesignSheet.json';
import roleWiseData from '../data/roleWise.json';
import mostAskedData from '../data/mostAsked.json';
import hrData from '../data/hrQuestions.json';

export const GlobalSearchModal = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigate(window.location.pathname, true); // opens modal
      }
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const hits = [];

    // Search DSA Sheets
    Object.entries(dsaSheetsData).forEach(([slug, sheet]) => {
      if (sheet.sections) {
        sheet.sections.forEach(sec => {
          (sec.problems || []).forEach(prob => {
            if (prob.title?.toLowerCase().includes(q) || sec.topic?.toLowerCase().includes(q)) {
              hits.push({
                type: 'DSA Sheet',
                icon: Code,
                title: prob.title,
                subtitle: `${sheet.title} • ${sec.topic}`,
                difficulty: prob.difficulty,
                route: `/preparation/dsa-sheets/${slug}`,
                url: prob.problemUrl
              });
            }
          });
        });
      }
    });

    // Search 20 Patterns
    if (patternsData.sections) {
      patternsData.sections.forEach(sec => {
        (sec.problems || []).forEach(prob => {
          if (prob.title?.toLowerCase().includes(q) || sec.topic?.toLowerCase().includes(q)) {
            hits.push({
              type: '20 DSA Patterns',
              icon: Layers,
              title: prob.title,
              subtitle: sec.topic,
              difficulty: prob.difficulty,
              route: '/preparation/20-essential-dsa-patterns',
              url: prob.problemUrl
            });
          }
        });
      });
    }

    // Search Company DSA
    (companySheetsData.list || []).forEach(comp => {
      if (comp.name?.toLowerCase().includes(q)) {
        hits.push({
          type: 'Company Sheet',
          icon: Building,
          title: `${comp.name} DSA Sheet`,
          subtitle: `${comp.totalQuestions} Questions`,
          route: `/preparation/company-wise-dsa-sheet/${comp.slug}`
        });
      }
    });

    // Search SQL Sheet
    (sqlSheetData.questions || []).forEach(item => {
      if (item.title?.toLowerCase().includes(q) || item.category?.toLowerCase().includes(q) || item.answer?.toLowerCase().includes(q)) {
        hits.push({
          type: 'SQL Sheet',
          icon: Database,
          title: item.title,
          subtitle: `Category: ${item.category}`,
          difficulty: item.difficulty,
          route: '/preparation/sql-sheet'
        });
      }
    });

    // Search System Design
    (systemDesignData.questions || []).forEach(item => {
      if (item.title?.toLowerCase().includes(q) || item.type?.toLowerCase().includes(q)) {
        hits.push({
          type: 'System Design',
          icon: Layers,
          title: item.title,
          subtitle: `${item.type} • Companies: ${(item.companies || []).slice(0, 3).join(', ')}`,
          route: '/preparation/system-design-sheet'
        });
      }
    });

    // Search Role-Wise
    (roleWiseData.list || []).forEach(r => {
      if (r.name?.toLowerCase().includes(q)) {
        hits.push({
          type: 'Role-Wise Prep',
          icon: Briefcase,
          title: `${r.name} Interview Guide`,
          subtitle: `${r.totalQuestions} Questions`,
          route: `/preparation/role-wise/${r.slug}`
        });
      }
    });

    // Search HR Questions
    (hrData.questions || []).forEach(item => {
      if (item.title?.toLowerCase().includes(q) || item.category?.toLowerCase().includes(q)) {
        hits.push({
          type: 'HR Questions',
          icon: FileText,
          title: item.title,
          subtitle: `Category: ${item.category}`,
          route: '/preparation/hr-questions'
        });
      }
    });

    setResults(hits.slice(0, 30));
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (item) => {
    onNavigate(item.route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Input box */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, companies, SQL queries, patterns, roles..."
            className="w-full text-base bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none font-lexend"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto flex-1 divide-y divide-zinc-100 dark:divide-zinc-800/50">
          {query.trim() && results.length === 0 && (
            <div className="py-12 text-center text-sm text-zinc-400 dark:text-zinc-500">
              No matching problems or resources found for "{query}".
            </div>
          )}

          {!query.trim() && (
            <div className="p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 font-lexend">
                Popular Quick Jumps
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { name: 'Striver A2Z Sheet', route: '/preparation/dsa-sheets/striver-a2z-dsa-sheet' },
                  { name: 'Top 110 SQL Queries', route: '/preparation/sql-sheet' },
                  { name: 'Google DSA', route: '/preparation/company-wise-dsa-sheet/google-dsa-interview-questions' },
                  { name: '20 DSA Patterns', route: '/preparation/20-essential-dsa-patterns' },
                  { name: 'System Design Sheet', route: '/preparation/system-design-sheet' },
                  { name: 'HR Questions', route: '/preparation/hr-questions' }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      onNavigate(item.route);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((item, idx) => {
            const Icon = item.icon || Code;
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={idx}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-900 dark:text-indigo-200'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-indigo-500 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold truncate font-lexend">
                        {item.title}
                      </span>
                      {item.difficulty && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
                          {item.difficulty}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                      <span className="font-medium text-indigo-500/90">{item.type}</span> • {item.subtitle}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0 ml-2" />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
          <span>Use ↑ and ↓ to navigate, Enter to select</span>
          <span>Hynts 2.0 Spotlight</span>
        </div>
      </div>
    </div>
  );
};
