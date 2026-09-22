import React from 'react';
import { Sparkles, Heart, MessageCircle } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './Icons';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-black/50 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-lexend font-black text-xl tracking-tight text-zinc-900 dark:text-white">
                  Get<span className="text-indigo-600 dark:text-indigo-400">Placed</span>
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed font-sans">
              Track your grind. Clear your interviews. All-in-one placement tracker with curated problem sheets, company banks, SQL mastery, and career toolkits.
            </p>
            <div className="flex items-center gap-3 text-zinc-400 mt-2">
              <a
                href="https://chat.whatsapp.com/KBIk0COfdZSDenWJN9xWmN?mode=wwt"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:text-emerald-500 transition-colors"
                title="Join WhatsApp Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/hynts_in"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:text-sky-500 transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:text-indigo-500 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Core Sheets */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-lexend">
              DSA Sheets
            </h4>
            {[
              { label: 'Strivers A2Z Sheet', path: '/preparation/dsa-sheets/striver-a2z-dsa-sheet' },
              { label: 'Love Babbar 450', path: '/preparation/dsa-sheets/love-babbar-dsa-sheet' },
              { label: 'NeetCode 150', path: '/preparation/dsa-sheets/neetcode-dsa-sheet' },
              { label: 'Rohit Negi Sheet', path: '/preparation/dsa-sheets/rohit-negi-dsa-sheet' },
              { label: '20 DSA Patterns', path: '/preparation/20-essential-dsa-patterns' },
              { label: 'Package-Wise DSA', path: '/preparation/package-wise-dsa-sheet' }
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.path)}
                className="text-left text-xs text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Col 3: Interview Resources */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-lexend">
              Preparation
            </h4>
            {[
              { label: 'Top 110 SQL Queries', path: '/preparation/sql-sheet' },
              { label: 'Company-Wise DSA', path: '/preparation/company-wise-dsa-sheet' },
              { label: 'System Design Sheet', path: '/preparation/system-design-sheet' },
              { label: 'Role-Wise Guides', path: '/preparation/role-wise' },
              { label: 'Most Asked Questions', path: '/preparation/most-asked-questions' },
              { label: '100 HR Questions', path: '/preparation/hr-questions' }
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.path)}
                className="text-left text-xs text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Col 4: Career & Tools */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-lexend">
              Career & Notes
            </h4>
            {[
              { label: 'Curated Notes', path: '/preparation/notes' },
              { label: 'Resume Templates', path: '/preparation/resume-templates' },
              { label: 'Cold Email Templates', path: '/preparation/cold-email-templets' },
              { label: 'Core Playlists', path: '/preparation/dsa-playlists' },
              { label: 'Jobs Board', path: '/jobs' },
              { label: 'Interview Experiences', path: '/interview' }
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.path)}
                className="text-left text-xs text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 mt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500 font-sans">
          <div className="flex items-center gap-1">
            <span>Built for engineering students grinding for tech placements. GetPlaced © 2026. Keep showing up.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('/privacy')} className="hover:underline">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('/terms')} className="hover:underline">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('/refund-policy')} className="hover:underline">
              Refund Policy
            </button>
            <button onClick={() => onNavigate('/contact')} className="hover:underline">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
