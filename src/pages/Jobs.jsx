import React, { useState } from 'react';
import { Briefcase, Building, MapPin, Search, ExternalLink, ArrowLeft, Filter, Sparkles } from 'lucide-react';

export const Jobs = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const jobsList = [
    {
      id: 1,
      title: 'Software Development Engineer (SDE-1)',
      company: 'Amazon',
      location: 'Bangalore / Hyderabad, India',
      type: 'Full-time',
      experience: '0-2 Years',
      batch: '2025 / 2026',
      applyUrl: 'https://amazon.jobs',
      tags: ['DSA', 'Java', 'AWS', 'System Design']
    },
    {
      id: 2,
      title: 'Graduate Software Engineer',
      company: 'Google',
      location: 'Bangalore / Hyderabad, India',
      type: 'Full-time',
      experience: 'Freshers',
      batch: '2026',
      applyUrl: 'https://careers.google.com',
      tags: ['C++', 'Python', 'Algorithms', 'Distributed Systems']
    },
    {
      id: 3,
      title: 'Frontend Engineer - React / Next.js',
      company: 'Zomato',
      location: 'Gurugram, India (Hybrid)',
      type: 'Full-time',
      experience: '1-3 Years',
      batch: 'Any',
      applyUrl: 'https://zomato.com/careers',
      tags: ['React', 'TypeScript', 'Tailwind', 'Performance']
    },
    {
      id: 4,
      title: 'Backend Engineer - Go / Microservices',
      company: 'Swiggy',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '1-4 Years',
      batch: 'Any',
      applyUrl: 'https://careers.swiggy.com',
      tags: ['Golang', 'Kafka', 'PostgreSQL', 'Redis']
    },
    {
      id: 5,
      title: 'Data Engineer',
      company: 'Flipkart',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '0-3 Years',
      batch: '2025 / 2026',
      applyUrl: 'https://flipkartcareers.com',
      tags: ['SQL', 'Spark', 'Python', 'Hadoop']
    },
    {
      id: 6,
      title: 'Associate Software Engineer',
      company: 'Microsoft',
      location: 'Noida / Hyderabad, India',
      type: 'Full-time',
      experience: 'Freshers',
      batch: '2026',
      applyUrl: 'https://careers.microsoft.com',
      tags: ['C#', 'Azure', 'Algorithms', 'Data Structures']
    }
  ];

  const filtered = jobsList.filter(j => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = j.title.toLowerCase().includes(q);
      const matchComp = j.company.toLowerCase().includes(q);
      const matchTag = j.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchComp && !matchTag) return false;
    }
    return true;
  });

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
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-lexend">
          Verified Opportunities
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-2">
          Latest Tech Jobs & Off-Campus Drives
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 font-sans max-w-3xl leading-relaxed">
          Curated tech openings for software engineers, freshers, SDE-1, and interns across top tech companies and high-growth startups.
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
            placeholder="Search role, company or tech stack..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>
        <span className="text-xs font-mono text-zinc-400">
          {filtered.length} Openings
        </span>
      </div>

      {/* Jobs list */}
      <div className="flex flex-col gap-4">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/50 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold font-lexend text-emerald-600 dark:text-emerald-400">
                  {job.company}
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-xs text-zinc-400">{job.type}</span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-xs text-zinc-400">{job.experience}</span>
              </div>

              <h3 className="font-lexend font-bold text-lg text-zinc-900 dark:text-white">
                {job.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{job.location}</span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span>Batch: {job.batch}</span>
              </div>

              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                {job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 self-start sm:self-center">
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 font-semibold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <span>Apply Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
