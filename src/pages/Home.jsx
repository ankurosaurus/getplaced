import React from 'react';
import { Sparkles, ArrowRight, CheckCircle, Code, Building2, Database, Layers, Terminal, Compass, Users, Flame, BookOpen, Star, FileText, GraduationCap } from 'lucide-react';

export const Home = ({ onNavigate }) => {
  const featureCards = [
    {
      badge: 'DSA SHEETS',
      title: 'Curated DSA Sheets From Top Educators',
      description: 'Practice with sheets from Striver, Love Babbar, NeetCode, Rohit Negi, Shradha Khapra and more — all organized with progress tracking.',
      route: '/preparation/dsa-sheets',
      tag: '7 Comprehensive Sheets',
      color: 'from-amber-500/20 to-orange-500/10'
    },
    {
      badge: 'COMPANY WISE DSA',
      title: 'Target Your Dream Tech Company',
      description: 'Ace coding rounds at 45+ top tech companies including Google, Meta, Microsoft, Amazon, Netflix, Uber, Stripe, and Flipkart.',
      route: '/preparation/company-wise-dsa-sheet',
      tag: '45+ Top Tech Companies',
      color: 'from-blue-500/20 to-indigo-500/10'
    },
    {
      badge: 'SQL SHEET',
      title: 'Top 110 SQL Interview Queries',
      description: 'Master every SQL concept interviewers love: SELECT, JOINs, subqueries, aggregations, window functions with built-in copy-paste code.',
      route: '/preparation/sql-sheet',
      tag: '110 Real Queries',
      color: 'from-emerald-500/20 to-teal-500/10'
    },
    {
      badge: '20 DSA PATTERNS',
      title: '20 Essential DSA Patterns',
      description: 'Sliding Window, Two Pointers, Fast & Slow Pointer, Cyclic Sort, BFS/DFS, Dynamic Programming patterns to master problem-solving.',
      route: '/preparation/20-essential-dsa-patterns',
      tag: 'Pattern-Based Prep',
      color: 'from-purple-500/20 to-violet-500/10'
    },
    {
      badge: 'ROLE WISE SHEETS',
      title: 'Role-Specific Interview Roadmaps',
      description: 'Frontend, Backend, Fullstack, Mobile, AI Engineer, MLOps, DevOps, SRE, Cloud Security — get question sets tailored for your role.',
      route: '/preparation/role-wise',
      tag: '20 Engineering Roles',
      color: 'from-pink-500/20 to-rose-500/10'
    },
    {
      badge: 'SYSTEM DESIGN',
      title: 'HLD & LLD Architecture Playlists',
      description: 'Master Low Level and High Level System Design with curated problem-sets, company tags, architectural diagrams, and video walkthroughs.',
      route: '/preparation/system-design-sheet',
      tag: '32 Architecture Problems',
      color: 'from-cyan-500/20 to-blue-500/10'
    },
    {
      badge: 'CURATED NOTES',
      title: 'Instant Handcrafted Study Notes',
      description: 'Computer Networks, AWS, Java, Kubernetes, Operating Systems — open crisp PDF notes directly, zero downloading or endless searching.',
      route: '/preparation/notes',
      tag: '26 Essential Guides',
      color: 'from-amber-500/20 to-yellow-500/10'
    },
    {
      badge: 'COLD EMAIL TEMPLATES',
      title: 'Referral & Networking Email Templates',
      description: 'High-conversion cold emails crafted for job referrals, networking, and direct outreach to hiring managers and tech recruiters.',
      route: '/preparation/cold-email-templets',
      tag: '25 Tested Templates',
      color: 'from-emerald-500/20 to-green-500/10'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-r from-violet-600/15 via-fuchsia-600/10 to-indigo-600/15 blur-[120px] pointer-events-none -z-10" />

        {/* Floating orbits container */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-1.5 bg-zinc-50/70 dark:bg-zinc-900/60 backdrop-blur-md mb-6 shadow-sm">
            <GraduationCap className="w-4 h-4 text-[#ef763f]" />
            <span className="text-zinc-600 dark:text-zinc-300 text-xs font-medium font-manrope">
              Built for <strong className="text-zinc-900 dark:text-white font-bold">Engineering Students</strong> cracking placement rounds
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-manrope text-zinc-950 dark:text-white leading-[1.15] mb-6">
            Your{' '}
            <span className="bg-gradient-to-r from-[#ef763f] via-purple-500 to-[#007ff5] bg-clip-text text-transparent">
              UNFAIR
            </span>{' '}
            Advantage <br />
            For Tech Interviews
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
            GetPlaced gathers all high-yield DSA sheets, company-specific queries, role-wise roadmaps, SQL practice, system design, and verified career toolkits into one lightning-fast dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
            <button
              onClick={() => onNavigate('/preparation')}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-black font-lexend font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('/preparation/dsa-sheets')}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-lexend font-semibold text-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer text-center"
            >
              Browse DSA Sheets
            </button>
          </div>

          {/* Key Feature Stats Pills */}
          <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-3xl">
            {[
              { label: 'Curated Questions', val: '2,500+' },
              { label: 'Company Sheets', val: '45+' },
              { label: 'Specialized Roles', val: '20' },
              { label: 'Cost to Prepare', val: '100% Free' },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-zinc-50/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col items-center"
              >
                <span className="font-lexend font-bold text-lg sm:text-xl text-zinc-900 dark:text-white">
                  {stat.val}
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID SECTION ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500 font-lexend">
            Everything You Need
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-lexend text-zinc-950 dark:text-white mt-2 mb-4 tracking-tight">
            Built for Placement Success
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            Ditch scattered tabs and unorganized bookmarks. Access curated problems with progress tracking, difficulty filters, and custom notes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate(card.route)}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
            >
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-orange-500 font-lexend">
                    {card.badge}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {card.tag}
                  </span>
                </div>

                <h3 className="font-lexend font-bold text-lg text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Start Practicing</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOUNDER NOTE SECTION ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-10">
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-3xl overflow-hidden bg-gradient-to-tr from-[#ef763f] via-purple-600 to-[#007ff5] p-1 shrink-0 shadow-2xl">
            <div className="w-full h-full rounded-[22px] bg-zinc-950 flex flex-col items-center justify-center text-center p-4">
              <Sparkles className="w-9 h-9 text-[#ef763f] mb-2" />
              <span className="font-lexend font-bold text-white text-base">GetPlaced</span>
              <span className="text-[11px] text-zinc-400 mt-0.5">by Ankur Jha</span>
            </div>
          </div>

          <div className="flex flex-col gap-3.5 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500 font-lexend">
              Built By An Engineer, For Engineering Students
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-lexend text-zinc-900 dark:text-white leading-snug">
              "We understand the grind because we've lived through it."
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
              Preparing for tech placements is tough when high-yield problem sheets, company tags, and roadmaps are scattered across bookmarks and spreadsheets. GetPlaced organizes everything you need to crack dream roles without paywalls, subscriptions, or spam.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('/preparation')}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-lexend font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                Go to Preparation Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
