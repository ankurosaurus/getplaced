import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  // Solved items: { [id]: boolean }
  const [solved, setSolved] = useState(() => {
    try {
      const saved = localStorage.getItem('hynts_solved_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Starred / Bookmarked items: { [id]: { id, title, url, difficulty, sheetTitle, sheetSlug } }
  const [starred, setStarred] = useState(() => {
    try {
      const saved = localStorage.getItem('hynts_starred_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Personal notes: { [id]: string }
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('hynts_notes_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Activity log: { "YYYY-MM-DD": count }
  const [activity, setActivity] = useState(() => {
    try {
      const saved = localStorage.getItem('hynts_activity_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active theme: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('hynts-theme');
      return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } catch {
      return 'dark';
    }
  });

  // Active note modal state
  const [activeNoteProblem, setActiveNoteProblem] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('hynts_solved_v2', JSON.stringify(solved));
    } catch (e) {
      console.error(e);
    }
  }, [solved]);

  useEffect(() => {
    try {
      localStorage.setItem('hynts_starred_v2', JSON.stringify(starred));
    } catch (e) {
      console.error(e);
    }
  }, [starred]);

  useEffect(() => {
    try {
      localStorage.setItem('hynts_notes_v2', JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem('hynts_activity_v2', JSON.stringify(activity));
    } catch (e) {
      console.error(e);
    }
  }, [activity]);

  useEffect(() => {
    try {
      localStorage.setItem('hynts-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    try {
      document.documentElement.classList.add('theme-transitioning');
      setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 400);
    } catch {
      setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  const getTodayKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  const toggleSolved = (id, problemDetails = null) => {
    setSolved(prev => {
      const isNowSolved = !prev[id];
      const updated = { ...prev };
      if (isNowSolved) {
        updated[id] = true;
        // Confetti effect on solve
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981']
          });
        } catch {}

        // Log daily activity
        const today = getTodayKey();
        setActivity(actPrev => ({
          ...actPrev,
          [today]: (actPrev[today] || 0) + 1
        }));
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const markMultipleSolved = (ids, status = true) => {
    setSolved(prev => {
      const updated = { ...prev };
      let addedCount = 0;
      ids.forEach(id => {
        if (status) {
          if (!updated[id]) addedCount++;
          updated[id] = true;
        } else {
          delete updated[id];
        }
      });

      if (status && addedCount > 0) {
        const today = getTodayKey();
        setActivity(actPrev => ({
          ...actPrev,
          [today]: (actPrev[today] || 0) + addedCount
        }));
        try {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 } });
        } catch {}
      }
      return updated;
    });
  };

  const toggleStarred = (id, problemDetails = {}) => {
    setStarred(prev => {
      const updated = { ...prev };
      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = { id, ...problemDetails };
      }
      return updated;
    });
  };

  const saveNote = (id, text) => {
    setNotes(prev => {
      const updated = { ...prev };
      if (!text || text.trim() === '') {
        delete updated[id];
      } else {
        updated[id] = text.trim();
      }
      return updated;
    });
  };

  const resetSheet = (sheetSlug, problemIds = []) => {
    if (window.confirm('Are you sure you want to reset all progress for this sheet?')) {
      setSolved(prev => {
        const updated = { ...prev };
        problemIds.forEach(id => delete updated[id]);
        return updated;
      });
    }
  };

  const resetAll = () => {
    if (window.confirm('WARNING: Are you sure you want to reset ALL your solved marks, bookmarks, and notes? This cannot be undone.')) {
      setSolved({});
      setStarred({});
      setNotes({});
      setActivity({});
    }
  };

  const exportData = () => {
    const backup = {
      version: '2.0',
      timestamp: new Date().toISOString(),
      solved,
      starred,
      notes,
      activity
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hynts-2.0-backup-${getTodayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonData) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (data.solved) setSolved(data.solved);
      if (data.starred) setStarred(data.starred);
      if (data.notes) setNotes(data.notes);
      if (data.activity) setActivity(data.activity);
      alert('Progress data restored successfully!');
    } catch (e) {
      alert('Invalid backup file: ' + e.message);
    }
  };

  // Calculate streak
  const calculateStreak = () => {
    const today = new Date();
    let currentStreak = 0;
    let checkDate = new Date(today);

    while (true) {
      const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
      if (activity[dateStr] && activity[dateStr] > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // If today has 0 so far, check if yesterday was active
        if (currentStreak === 0) {
          checkDate.setDate(checkDate.getDate() - 1);
          const yesterdayStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
          if (activity[yesterdayStr] && activity[yesterdayStr] > 0) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
            continue;
          }
        }
        break;
      }
    }
    return currentStreak;
  };

  return (
    <ProgressContext.Provider
      value={{
        solved,
        starred,
        notes,
        activity,
        theme,
        toggleTheme,
        toggleSolved,
        markMultipleSolved,
        toggleStarred,
        saveNote,
        activeNoteProblem,
        setActiveNoteProblem,
        resetSheet,
        resetAll,
        exportData,
        importData,
        streak: calculateStreak()
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
