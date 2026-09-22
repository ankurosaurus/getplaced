import React from 'react';
import { ArrowLeft, Shield, Mail, HelpCircle, FileText } from 'lucide-react';

export const Legal = ({ type, onNavigate }) => {
  const contentMap = {
    about: {
      title: 'About Hynts 2.0',
      badge: 'Our Mission',
      body: (
        <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            Hynts 2.0 was founded with one crystal-clear mission: to democratize software engineering interview preparation and eliminate the noise of scattered links, overpriced courses, and disorganized bookmarks.
          </p>
          <p>
            Whether you are preparing for campus placements, aiming for SDE-1/2 roles at MAANG companies, or brushing up on SQL and system design, Hynts provides every tool, problem set, and guideline you need under one unified dashboard.
          </p>
          <p>
            Our resources are curated by experienced engineers from top product companies and open to everyone for free.
          </p>
        </div>
      )
    },
    contact: {
      title: 'Contact Us',
      badge: 'Get in Touch',
      body: (
        <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            Have feedback, noticed a broken link, or want to partner with Hynts? We would love to hear from you.
          </p>
          <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex flex-col gap-2">
            <div>
              <strong>Email Support:</strong>{' '}
              <a href="mailto:support@hynts.in" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                support@hynts.in
              </a>
            </div>
            <div>
              <strong>Community:</strong>{' '}
              <a
                href="https://chat.whatsapp.com/KBIk0COfdZSDenWJN9xWmN?mode=wwt"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Join our Official WhatsApp Community
              </a>
            </div>
            <div>
              <strong>Social:</strong> Twitter / X:{' '}
              <a href="https://twitter.com/hynts_in" target="_blank" rel="noreferrer" className="text-sky-500 hover:underline">
                @hynts_in
              </a>
            </div>
          </div>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      badge: 'Your Data & Privacy',
      body: (
        <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            At Hynts, we believe your interview preparation belongs strictly to you. We do not sell your personal information or track private data.
          </p>
          <p>
            <strong>Local Storage:</strong> All your progress, problem checkboxes, starred questions, and personal notes are saved locally inside your browser's <code>localStorage</code>. You have 100% ownership and can export or wipe this data at any moment.
          </p>
          <p>
            <strong>Analytics:</strong> Minimal anonymized telemetry may be used to analyze general traffic patterns and server health.
          </p>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      badge: 'Legal Terms',
      body: (
        <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            By accessing and using Hynts 2.0, you agree to these Terms of Service. All content provided on the website is for educational and self-preparation purposes.
          </p>
          <p>
            External links to problems (e.g. LeetCode, takeUforward, GeeksforGeeks, YouTube) are property of their respective creators and organizations.
          </p>
        </div>
      )
    },
    'refund-policy': {
      title: 'Refund Policy',
      badge: 'Fair Policy',
      body: (
        <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            Hynts core sheets, question trackers, notes, and playlists are 100% free and open to everyone without charges or mandatory subscriptions.
          </p>
          <p>
            For any future paid offerings (such as 1-on-1 mock interviews or resume reviews), refunds can be requested within 24 hours of purchase if the service has not yet been rendered.
          </p>
        </div>
      )
    }
  };

  const current = contentMap[type] || contentMap.about;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-28 flex flex-col gap-8">
      <div>
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col gap-4">
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-lexend self-start">
          {current.badge}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-lexend text-zinc-950 dark:text-white">
          {current.title}
        </h1>
        <div className="mt-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          {current.body}
        </div>
      </div>
    </div>
  );
};
