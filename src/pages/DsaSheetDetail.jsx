import React, { useState, useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { VideoModal } from '../components/VideoModal';
import { ChevronDown, Star, Check, ExternalLink, FileText } from 'lucide-react';
import { YoutubeIcon } from '../components/Icons';
import dsaSheetsData from '../data/dsaSheets.json';
import { content, getSheetMeta, getRewrittenTopicTitle } from '../content';

export const DsaSheetDetail = ({ slug, onNavigate }) => {
  const sheet = dsaSheetsData[slug];
  const { solved, toggleSolved, starred, toggleStarred, notes, setActiveNoteProblem } = useProgress();

  const [readMore, setReadMore] = useState(false);
  // ALL TOPICS AND SUBTOPICS REMAIN CLOSED BY DEFAULT
  const [openTopics, setOpenTopics] = useState({});
  const [openSubtopics, setOpenSubtopics] = useState({});
  const [activeVideo, setActiveVideo] = useState(null);

  if (!sheet) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold font-lexend mb-4">Sheet not found</h2>
        <button
          onClick={() => onNavigate('/preparation/dsa-sheets')}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm"
        >
          Back to DSA Sheets
        </button>
      </div>
    );
  }

  // Group sections by topic
  const groupedTopics = useMemo(() => {
    const map = {};
    (sheet.sections || []).forEach(sec => {
      const topicName = sec.topic || 'General';
      if (!map[topicName]) map[topicName] = [];
      map[topicName].push(sec);
    });
    return map;
  }, [sheet]);

  // Overall stats
  const allProblems = useMemo(() => {
    const list = [];
    (sheet.sections || []).forEach(sec => {
      (sec.problems || []).forEach(p => list.push(p));
    });
    return list;
  }, [sheet]);

  const totalProblems = sheet.totalProblems || allProblems.length;
  const completedCount = allProblems.filter(p => solved[p._id || p.id]).length;
  const overallPct = totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0;

  // Toggle Topic (Outer Accordion)
  const toggleTopic = (topicKey) => {
    setOpenTopics(prev => ({
      ...prev,
      [topicKey]: !prev[topicKey]
    }));
  };

  // Toggle Subtopic (Inner Accordion)
  const toggleSubtopic = (subKey) => {
    setOpenSubtopics(prev => ({
      ...prev,
      [subKey]: !prev[subKey]
    }));
  };

  const getDifficultyClass = (diff) => {
    const d = (diff || '').toLowerCase();
    if (d.includes('easy')) return 'text-green-600 dark:text-green-400';
    if (d.includes('medium')) return 'text-yellow-600 dark:text-yellow-400';
    if (d.includes('hard')) return 'text-red-600 dark:text-red-400';
    if (d.includes('basic')) return 'text-blue-600 dark:text-blue-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  // Platform icon fallback helper
  const renderPlatformBadge = (platform = '') => {
    const p = platform.toLowerCase();
    let label = 'TUF';
    let bg = 'bg-orange-600';
    if (p.includes('leetcode')) {
      label = 'LC';
      bg = 'bg-amber-600';
    } else if (p.includes('gfg') || p.includes('geek')) {
      label = 'GFG';
      bg = 'bg-emerald-600';
    } else if (p.includes('codechef')) {
      label = 'CC';
      bg = 'bg-amber-800';
    } else if (p.includes('codeforces')) {
      label = 'CF';
      bg = 'bg-blue-600';
    } else if (p.includes('hackerrank')) {
      label = 'HR';
      bg = 'bg-green-700';
    }

    return (
      <div className="bg-black dark:bg-zinc-800 rounded-full p-1.5 inline-flex items-center justify-center w-7 h-7 shadow-xs">
        <span className={`text-[9px] font-mono font-bold text-white uppercase`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-2 pb-12 font-lexend">
      {/* ── SHEET HEADER ── */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-lexend mb-3 text-gray-900 dark:text-gray-100">
          {sheet.title}
        </h1>

        {(() => {
          const sheetMeta = getSheetMeta(slug);
          const introText = sheetMeta?.intro || sheet.description;
          const curator = sheetMeta?.curatorName || sheet.creatorName || 'Original Curator';
          return (
            <>
              {introText && (
                <div className="relative">
                  <p
                    className={`text-gray-600 dark:text-gray-400 font-lexend mb-2 text-sm leading-relaxed ${
                      readMore ? '' : 'line-clamp-2'
                    }`}
                  >
                    {introText}
                  </p>
                  <button
                    onClick={() => setReadMore(!readMore)}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-semibold font-lexend cursor-pointer"
                  >
                    {readMore
                      ? (content.microcopy?.toggles?.readLess || 'Show less')
                      : (content.microcopy?.toggles?.readMore || 'Read roadmap breakdown')}
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-lexend mt-4 flex-wrap">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Curated by {curator}</span>
                <span>•</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">Tracked on GetPlaced</span>
                <span>•</span>
                <span>{totalProblems} Problems</span>
              </div>
            </>
          );
        })()}
      </div>

      {/* ── OVERALL PROGRESS CARD (CircularProgressTracker) ── */}
      <div className="mb-6">
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 inline-flex items-center gap-3.5 shadow-sm">
          <div className="relative w-13 h-13 flex-shrink-0">
            <svg className="w-13 h-13 transform -rotate-90">
              <circle
                cx="26"
                cy="26"
                r="22"
                className="dark:stroke-gray-700"
                stroke="#e5e7eb"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="26"
                cy="26"
                r="22"
                stroke="currentColor"
                className="text-black dark:text-white transition-all duration-500 ease-out"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="138.23"
                strokeDashoffset={138.23 - (overallPct / 100) * 138.23}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold font-lexend text-gray-900 dark:text-gray-100">
                {overallPct}%
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold font-lexend text-gray-900 dark:text-gray-100">
                Overall Progress
              </h3>
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                ({completedCount}/{totalProblems})
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              {overallPct === 0
                ? content.microcopy.progressStates.zeroPercent.subline
                : overallPct === 100
                ? content.microcopy.progressStates.hundredPercent.subline
                : content.microcopy.progressStates.inProgress.subline}
            </p>
          </div>
        </div>
      </div>

      {/* ── ACCORDION LIST: ALL CLOSED BY DEFAULT ── */}
      <div className="space-y-3">
        {Object.entries(groupedTopics).map(([topicTitle, subSections], topicIdx) => {
          const topicProblems = subSections.flatMap(s => s.problems || []);
          const topicCompleted = topicProblems.filter(p => solved[p._id || p.id]).length;
          const topicTotal = topicProblems.length;
          const topicPct = topicTotal > 0 ? (topicCompleted / topicTotal) * 100 : 0;
          const isTopicOpen = !!openTopics[topicIdx];

          // Use original rewritten topic title if defined, or clean prefix
          const rewritten = getRewrittenTopicTitle(topicTitle);
          const displayTopic = rewritten !== topicTitle ? rewritten : topicTitle.replace(/^Step \d+ : /, '');

          return (
            <div
              key={topicIdx}
              className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#1a1a1a] overflow-hidden"
            >
              {/* Outer Accordion Header */}
              <button
                type="button"
                onClick={() => toggleTopic(topicIdx)}
                className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center justify-between text-left font-medium transition-all outline-none font-lexend cursor-pointer"
              >
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="text-left font-semibold text-gray-900 dark:text-gray-100">
                    {displayTopic}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-lexend">
                      {topicCompleted} / {topicTotal}
                    </span>
                    <div className="hidden md:block w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 transition-all duration-300"
                        style={{ width: `${topicPct}%` }}
                      />
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                    isTopicOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Outer Accordion Content (Subtopics list) */}
              {isTopicOpen && (
                <div className="px-0 pb-0 border-t border-gray-100 dark:border-gray-800/80">
                  <div className="space-y-0">
                    {subSections.map((sub, subIdx) => {
                      const subKey = `${topicIdx}_${subIdx}`;
                      const subProblems = sub.problems || [];
                      const subCompleted = subProblems.filter(p => solved[p._id || p.id]).length;
                      const subTotal = subProblems.length;
                      const isSubOpen = !!openSubtopics[subKey];

                      const displaySubTopic = (sub.subTopic || '').replace(/^Lec \d+ : /, '');

                      return (
                        <div
                          key={subIdx}
                          className="border-t first:border-t-0 border-gray-200 dark:border-gray-800"
                        >
                          {/* Inner Subtopic Accordion Trigger */}
                          <button
                            type="button"
                            onClick={() => toggleSubtopic(subKey)}
                            className="w-full px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center justify-between text-left font-lexend cursor-pointer"
                          >
                            <div className="flex items-center justify-between w-full pr-4">
                              <span className="text-left text-sm font-medium text-gray-800 dark:text-gray-200">
                                {displaySubTopic || `Part ${subIdx + 1}`}
                              </span>
                              <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                                {subCompleted} / {subTotal}
                              </span>
                            </div>
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                                isSubOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {/* Inner Subtopic Content (Problems table & mobile cards) */}
                          {isSubOpen && (
                            <div className="px-4 pb-4 pt-1">
                              {/* Desktop Table View */}
                              <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {subProblems.map((prob) => {
                                      const pId = prob._id || prob.id;
                                      const isSolved = !!solved[pId];
                                      const isStarred = !!starred[pId];
                                      const hasNote = !!notes[pId];
                                      const probUrl = prob.problemUrl || prob.url || prob.link;

                                      return (
                                        <tr
                                          key={pId}
                                          className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                        >
                                          {/* Col 1: Checkbox */}
                                          <td className="py-3 px-2 w-10">
                                            <div className="flex items-center justify-center">
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  toggleSolved(pId, {
                                                    title: prob.title,
                                                    url: probUrl,
                                                    difficulty: prob.difficulty,
                                                    sheetTitle: sheet.title,
                                                    sheetSlug: slug
                                                  })
                                                }
                                                className={`h-5 w-5 rounded-xs border-2 flex items-center justify-center cursor-pointer transition-all ${
                                                  isSolved
                                                    ? 'bg-green-500 border-green-500 text-white'
                                                    : 'border-gray-300 dark:border-gray-600 bg-transparent'
                                                }`}
                                              >
                                                {isSolved && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                              </button>
                                            </div>
                                          </td>

                                          {/* Col 2: Title */}
                                          <td className="py-3 px-3 flex-1">
                                            <a
                                              href={probUrl || '#'}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className={`transition-colors font-lexend text-sm ${
                                                isSolved
                                                  ? 'line-through text-gray-400 dark:text-gray-500 hover:text-gray-500'
                                                  : 'text-gray-800 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400'
                                              }`}
                                            >
                                              {prob.title}
                                            </a>
                                          </td>

                                          {/* Col 3: Platform Logo */}
                                          <td className="py-3 px-2 w-12 text-center">
                                            {probUrl ? (
                                              <a
                                                href={probUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block"
                                                title={`Open on ${prob.platform || 'Platform'}`}
                                              >
                                                {renderPlatformBadge(prob.platform)}
                                              </a>
                                            ) : (
                                              renderPlatformBadge(prob.platform)
                                            )}
                                          </td>

                                          {/* Col 4: Difficulty */}
                                          <td className="py-3 px-3 w-24">
                                            <span
                                              className={`text-sm font-medium font-lexend ${getDifficultyClass(
                                                prob.difficulty
                                              )}`}
                                            >
                                              {prob.difficulty || 'Medium'}
                                            </span>
                                          </td>

                                          {/* Col 5: Video Solution Modal */}
                                          <td className="py-3 px-2 w-10 text-center">
                                            {prob.resource && (
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  setActiveVideo({
                                                    url: prob.resource,
                                                    title: prob.title
                                                  })
                                                }
                                                className="text-red-600 hover:text-red-700 transition-colors p-1"
                                                title="Watch Video Solution"
                                              >
                                                <YoutubeIcon className="w-5 h-5" />
                                              </button>
                                            )}
                                          </td>

                                          {/* Col 6: Star Bookmark */}
                                          <td className="py-3 px-2 w-10 text-center">
                                            <button
                                              type="button"
                                              onClick={() =>
                                                toggleStarred(pId, {
                                                  title: prob.title,
                                                  url: probUrl,
                                                  difficulty: prob.difficulty,
                                                  sheetTitle: sheet.title,
                                                  sheetSlug: slug
                                                })
                                              }
                                              className={`transition-colors p-1 ${
                                                isStarred
                                                  ? 'text-yellow-500 fill-yellow-500'
                                                  : 'text-gray-400 hover:text-yellow-500'
                                              }`}
                                              title={isStarred ? 'Remove bookmark' : 'Bookmark question'}
                                            >
                                              <Star
                                                className="w-5 h-5"
                                                fill={isStarred ? 'currentColor' : 'none'}
                                              />
                                            </button>
                                          </td>

                                          {/* Col 7: Note Icon */}
                                          <td className="py-3 px-2 w-10 text-center">
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setActiveNoteProblem({
                                                  id: pId,
                                                  title: prob.title
                                                })
                                              }
                                              className={`p-1 relative transition-colors ${
                                                hasNote
                                                  ? 'text-indigo-600 dark:text-indigo-400'
                                                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                                              }`}
                                              title={hasNote ? 'Edit note' : 'Add note'}
                                            >
                                              <FileText className="w-5 h-5" />
                                              {hasNote && (
                                                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                              )}
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>

                              {/* Mobile Cards View */}
                              <div className="md:hidden space-y-2 pt-2">
                                {subProblems.map((prob) => {
                                  const pId = prob._id || prob.id;
                                  const isSolved = !!solved[pId];
                                  const isStarred = !!starred[pId];
                                  const hasNote = !!notes[pId];
                                  const probUrl = prob.problemUrl || prob.url || prob.link;

                                  return (
                                    <div
                                      key={pId}
                                      className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30"
                                    >
                                      <div className="flex-shrink-0 mt-0.5">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            toggleSolved(pId, {
                                              title: prob.title,
                                              url: probUrl,
                                              difficulty: prob.difficulty,
                                              sheetTitle: sheet.title,
                                              sheetSlug: slug
                                            })
                                          }
                                          className={`h-4 w-4 rounded-xs border-2 flex items-center justify-center cursor-pointer ${
                                            isSolved
                                              ? 'bg-green-500 border-green-500 text-white'
                                              : 'border-gray-300 dark:border-gray-600'
                                          }`}
                                        >
                                          {isSolved && <Check className="w-3 h-3 stroke-[3]" />}
                                        </button>
                                      </div>

                                      <div className="flex-1 min-w-0">
                                        <a
                                          href={probUrl || '#'}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={`transition-colors font-lexend text-sm block mb-1 leading-snug ${
                                            isSolved
                                              ? 'line-through text-gray-400 dark:text-gray-500'
                                              : 'text-gray-800 dark:text-gray-200 hover:text-orange-600'
                                          }`}
                                        >
                                          {prob.title}
                                        </a>

                                        <div className="flex items-center gap-2 text-xs flex-wrap">
                                          {prob.platform && (
                                            <span className="text-gray-600 dark:text-gray-400 uppercase font-mono text-[10px]">
                                              {prob.platform}
                                            </span>
                                          )}
                                          <span className="text-gray-400">•</span>
                                          <span
                                            className={`font-medium ${getDifficultyClass(
                                              prob.difficulty
                                            )}`}
                                          >
                                            {prob.difficulty || 'Medium'}
                                          </span>

                                          {prob.resource && (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setActiveVideo({
                                                  url: prob.resource,
                                                  title: prob.title
                                                })
                                              }
                                              className="text-red-500 text-[11px] font-semibold flex items-center gap-1 ml-auto"
                                            >
                                              <YoutubeIcon className="w-3.5 h-3.5" />
                                              <span>Video</span>
                                            </button>
                                          )}
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-1 shrink-0">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setActiveNoteProblem({
                                              id: pId,
                                              title: prob.title
                                            })
                                          }
                                          className={`p-1 ${hasNote ? 'text-indigo-500' : 'text-gray-400'}`}
                                        >
                                          <FileText className="w-4 h-4" />
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            toggleStarred(pId, {
                                              title: prob.title,
                                              url: probUrl,
                                              difficulty: prob.difficulty,
                                              sheetTitle: sheet.title,
                                              sheetSlug: slug
                                            })
                                          }
                                          className={`p-1 ${isStarred ? 'text-yellow-500' : 'text-gray-400'}`}
                                        >
                                          <Star
                                            className="w-4 h-4"
                                            fill={isStarred ? 'currentColor' : 'none'}
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Video Solution Modal */}
      <VideoModal
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.url || ''}
        videoTitle={activeVideo?.title || ''}
      />
    </div>
  );
};
