import React, { useState } from 'react';
import { ExternalLink, ArrowLeft, Play, ChevronDown, ChevronRight, Video } from 'lucide-react';
import { YoutubeIcon } from '../components/Icons';
import playlistsData from '../data/playlists.json';

export const PlaylistsIndex = ({ onNavigate }) => {
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [expandedPlaylist, setExpandedPlaylist] = useState({});

  const subjects = [
    { key: 'ALL', label: 'All Playlists' },
    { key: 'dsa', label: 'DSA' },
    { key: 'dbms', label: 'DBMS' },
    { key: 'os', label: 'Operating Systems' },
    { key: 'oops', label: 'OOPs' },
    { key: 'system-design', label: 'System Design' }
  ];

  const allPlaylists = [];
  Object.entries(playlistsData).forEach(([subj, lists]) => {
    (lists || []).forEach(p => {
      allPlaylists.push({ ...p, subjectKey: subj });
    });
  });

  const filtered = allPlaylists.filter(p => {
    if (selectedSubject !== 'ALL' && p.subjectKey !== selectedSubject) return false;
    return true;
  });

  const toggleExpand = (slug) => {
    setExpandedPlaylist(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
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
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-lexend">
          Video Playlists & Deep Dives
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-2">
          Handpicked Computer Science & DSA Playlists
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 font-sans max-w-3xl leading-relaxed">
          Learn core subjects and system design from top engineering creators including Gaurav Sen, Love Babbar, Rohit Negi, Exponent, Neso Academy, and Code With Aryan.
        </p>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-zinc-200 dark:border-zinc-800">
        {subjects.map((s) => (
          <button
            key={s.key}
            onClick={() => setSelectedSubject(s.key)}
            className={`px-4 py-2 text-xs font-bold font-lexend whitespace-nowrap rounded-xl transition-all ${
              selectedSubject === s.key
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Playlists List */}
      <div className="flex flex-col gap-4">
        {filtered.map((p, idx) => {
          const isExpanded = !!expandedPlaylist[p.slug || idx];
          const totalVideos = p.totalVideos || 0;
          return (
            <div
              key={p.slug || idx}
              className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs"
            >
              <div
                onClick={() => toggleExpand(p.slug || idx)}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/30 select-none"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 shrink-0">
                    <YoutubeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                        {p.subjectKey?.toUpperCase()}
                      </span>
                      {p.creatorName && (
                        <span className="text-xs text-rose-500 font-semibold font-lexend">
                          {p.creatorName}
                        </span>
                      )}
                    </div>
                    <h3 className="font-lexend font-bold text-lg text-zinc-900 dark:text-white mt-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 max-w-2xl">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-mono text-zinc-400">
                    {totalVideos} Videos
                  </span>
                  <div className="p-1 text-zinc-400">
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Videos / Sections */}
              {isExpanded && (
                <div className="border-t border-zinc-100 dark:border-zinc-800/80 p-6 bg-zinc-50 dark:bg-zinc-950/60 flex flex-col gap-4">
                  {(p.sections || []).map((sec, sIdx) => (
                    <div key={sIdx} className="flex flex-col gap-2">
                      {sec.subCategory && (
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-lexend">
                          {sec.subCategory}
                        </h4>
                      )}
                      <div className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                        {(sec.videos || []).map((vid, vIdx) => (
                          <div
                            key={vIdx}
                            className="p-3 px-4 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <Play className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                              <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate">
                                {vid.title || vid.name || `Video #${vIdx + 1}`}
                              </span>
                            </div>
                            {vid.link && (
                              <a
                                href={vid.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline shrink-0"
                              >
                                <span>Watch</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
