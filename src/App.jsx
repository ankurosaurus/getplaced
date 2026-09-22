import React, { useState, useEffect } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PreparationShell } from './components/PreparationShell';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { NoteModal } from './components/NoteModal';
import { Analytics } from '@vercel/analytics/react';

// Pages
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { DsaSheetsIndex } from './pages/DsaSheetsIndex';
import { DsaSheetDetail } from './pages/DsaSheetDetail';
import { Patterns20 } from './pages/Patterns20';
import { CompanyWiseIndex } from './pages/CompanyWiseIndex';
import { CompanyWiseDetail } from './pages/CompanyWiseDetail';
import { PackageWise } from './pages/PackageWise';
import { SqlSheet } from './pages/SqlSheet';
import { SystemDesignSheet } from './pages/SystemDesignSheet';
import { RoleWiseIndex } from './pages/RoleWiseIndex';
import { RoleWiseDetail } from './pages/RoleWiseDetail';
import { MostAskedIndex } from './pages/MostAskedIndex';
import { MostAskedDetail } from './pages/MostAskedDetail';
import { HrQuestions } from './pages/HrQuestions';
import { ColdEmailsIndex } from './pages/ColdEmailsIndex';
import { PlaylistsIndex } from './pages/PlaylistsIndex';
import { NotesIndex } from './pages/NotesIndex';
import { ResumeTemplates } from './pages/ResumeTemplates';
import { Jobs } from './pages/Jobs';
import { InterviewExperiences } from './pages/InterviewExperiences';
import { Legal } from './pages/Legal';

function MainRouter() {
  const getNormalizedPath = () => {
    let p = window.location.pathname || '/';
    if (p.startsWith('/getplaced')) {
      p = p.slice('/getplaced'.length) || '/';
    }
    return p;
  };

  const [currentPath, setCurrentPath] = useState(getNormalizedPath);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(getNormalizedPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const routeTitles = {
      '/': 'GetPlaced — Tech Placement & DSA Prep Tracker by Ankur Jha',
      '/preparation': 'Dashboard | GetPlaced by Ankur Jha',
      '/preparation/dsa-sheets': 'DSA Sheets Directory | GetPlaced',
      '/preparation/dsa-sheets/striver-a2z-dsa-sheet': "Striver's A2Z DSA Sheet | GetPlaced",
      '/preparation/dsa-sheets/love-babbar-dsa-sheet': 'Love Babbar 450 DSA Sheet | GetPlaced',
      '/preparation/dsa-sheets/shradha-khapra-dsa-sheet': 'Shradha Didi DSA Sheet | GetPlaced',
      '/preparation/dsa-sheets/rohit-negi-dsa-sheet': 'Rohit Negi DSA Sheet | GetPlaced',
      '/preparation/dsa-sheets/arsh-goyal-dsa-sheet': 'Arsh Goyal DSA Sheet | GetPlaced',
      '/preparation/dsa-sheets/fraz-dsa-sheet': 'Fraz DSA Sheet | GetPlaced',
      '/preparation/dsa-sheets/neetcode-dsa-sheet': 'Neetcode 150 DSA Sheet | GetPlaced',
      '/preparation/20-essential-dsa-patterns': '20 Essential DSA Patterns | GetPlaced',
      '/preparation/company-wise-dsa-sheet': 'Company-Wise DSA Sheets | GetPlaced',
      '/preparation/package-wise-dsa-sheet': 'Package-Wise DSA Sheet | GetPlaced',
      '/preparation/sql-sheet': 'Top 110 SQL Queries Sheet | GetPlaced',
      '/preparation/system-design-sheet': 'System Design Sheet | GetPlaced',
      '/preparation/role-wise': 'Role-Wise Preparation Guides | GetPlaced',
      '/preparation/most-asked-questions': 'Most Asked Interview Questions | GetPlaced',
      '/preparation/hr-questions': 'Top 100 HR Interview Questions | GetPlaced',
      '/preparation/cold-email-templets': 'Cold Email Templates | GetPlaced',
      '/preparation/notes': 'Curated Tech Notes | GetPlaced',
      '/preparation/resume-templates': 'Resume Templates | GetPlaced',
      '/jobs': 'Tech Jobs Board | GetPlaced',
      '/interview': 'Interview Experiences | GetPlaced',
      '/privacy': 'Privacy Policy | GetPlaced',
      '/terms': 'Terms of Service | GetPlaced',
      '/refund-policy': 'Refund Policy | GetPlaced',
      '/contact': 'Contact Us | GetPlaced',
    };

    if (routeTitles[currentPath]) {
      document.title = routeTitles[currentPath];
    } else if (currentPath.startsWith('/preparation/company-wise-dsa-sheet/')) {
      const comp = currentPath.replace('/preparation/company-wise-dsa-sheet/', '').toUpperCase();
      document.title = `${comp} Interview DSA Questions | GetPlaced`;
    } else if (currentPath.startsWith('/preparation/role-wise/')) {
      const role = currentPath.replace('/preparation/role-wise/', '').replace(/-/g, ' ');
      document.title = `${role.toUpperCase()} Prep Guide | GetPlaced`;
    } else {
      document.title = 'GetPlaced — Tech Placement & DSA Prep Tracker by Ankur Jha';
    }
  }, [currentPath]);

  const navigate = (path, openSearch = false) => {
    if (openSearch) {
      setSearchOpen(true);
      return;
    }
    if (path !== currentPath) {
      const isGhPages = window.location.pathname.startsWith('/getplaced');
      const targetUrl = isGhPages ? `/getplaced${path}` : path;
      window.history.pushState({}, '', targetUrl);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  // Resolve preparation section views
  const renderPreparationContent = (p) => {
    if (p === '/preparation') return <Dashboard onNavigate={navigate} />;

    // DSA Sheets
    if (p === '/preparation/dsa-sheets') return <DsaSheetsIndex onNavigate={navigate} />;
    if (p.startsWith('/preparation/dsa-sheets/')) {
      const slug = p.replace('/preparation/dsa-sheets/', '');
      return <DsaSheetDetail slug={slug} onNavigate={navigate} />;
    }

    // 20 DSA Patterns
    if (p === '/preparation/20-essential-dsa-patterns') return <Patterns20 onNavigate={navigate} />;

    // Company Wise DSA
    if (p === '/preparation/company-wise-dsa-sheet') return <CompanyWiseIndex onNavigate={navigate} />;
    if (p.startsWith('/preparation/company-wise-dsa-sheet/')) {
      const slug = p.replace('/preparation/company-wise-dsa-sheet/', '');
      return <CompanyWiseDetail slug={slug} onNavigate={navigate} />;
    }

    // Package Wise
    if (p === '/preparation/package-wise-dsa-sheet') return <PackageWise onNavigate={navigate} />;

    // SQL Sheet
    if (p === '/preparation/sql-sheet') return <SqlSheet onNavigate={navigate} />;

    // System Design Sheet
    if (p === '/preparation/system-design-sheet') return <SystemDesignSheet onNavigate={navigate} />;

    // Role Wise
    if (p === '/preparation/role-wise') return <RoleWiseIndex onNavigate={navigate} />;
    if (p.startsWith('/preparation/role-wise/')) {
      const slug = p.replace('/preparation/role-wise/', '');
      return <RoleWiseDetail slug={slug} onNavigate={navigate} />;
    }

    // Most Asked
    if (p === '/preparation/most-asked-questions') return <MostAskedIndex onNavigate={navigate} />;
    if (p.startsWith('/preparation/most-asked-questions/')) {
      const slug = p.replace('/preparation/most-asked-questions/', '');
      return <MostAskedDetail slug={slug} onNavigate={navigate} />;
    }

    // HR Questions
    if (p === '/preparation/hr-questions') return <HrQuestions onNavigate={navigate} />;

    // Cold Emails
    if (p === '/preparation/cold-email-templets') return <ColdEmailsIndex onNavigate={navigate} />;

    // Playlists
    if (
      p === '/preparation/dsa-playlists' ||
      p === '/preparation/dbms-playlists' ||
      p === '/preparation/os-playlists' ||
      p === '/preparation/oops-playlists' ||
      p === '/preparation/system-design-playlists'
    ) {
      return <PlaylistsIndex onNavigate={navigate} />;
    }

    // Notes
    if (p === '/preparation/notes') return <NotesIndex onNavigate={navigate} />;

    // Resume Templates
    if (p === '/preparation/resume-templates') return <ResumeTemplates onNavigate={navigate} />;

    return <Dashboard onNavigate={navigate} />;
  };

  const p = currentPath.replace(/\/$/, '') || '/';
  const isPreparationSection = p.startsWith('/preparation');

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">
      {isPreparationSection ? (
        /* Preparation Shell Layout: Banner, Sidebar, TopNav, Content */
        <PreparationShell
          currentPath={currentPath}
          onNavigate={navigate}
          onOpenSearch={() => setSearchOpen(true)}
        >
          {renderPreparationContent(p)}
        </PreparationShell>
      ) : (
        /* Public Marketing Layout: Home, Jobs, Interview, Legal */
        <>
          <Navbar
            currentPath={currentPath}
            onNavigate={navigate}
            onOpenSearch={() => setSearchOpen(true)}
          />

          <main className="flex-1">
            {p === '/' && <Home onNavigate={navigate} />}
            {p === '/jobs' && <Jobs onNavigate={navigate} />}
            {p === '/interview' && <InterviewExperiences onNavigate={navigate} />}
            {['/about', '/contact', '/privacy', '/terms', '/refund-policy'].includes(p) && (
              <Legal type={p.replace('/', '')} onNavigate={navigate} />
            )}
          </main>

          <Footer onNavigate={navigate} />
        </>
      )}

      {/* Global Modals */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />
      <NoteModal />
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <MainRouter />
      <Analytics />
    </ProgressProvider>
  );
}
