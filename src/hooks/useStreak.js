import { useState, useCallback } from 'react';

const STORAGE_KEY = 'pt-bh-streak';

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function loadStreak() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { currentStreak: 0, lastActiveDate: null, longestStreak: 0 };
    return JSON.parse(raw);
  } catch {
    return { currentStreak: 0, lastActiveDate: null, longestStreak: 0 };
  }
}

function saveStreak(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useStreak() {
  const [streakData, setStreakData] = useState(() => loadStreak());

  const recordActivity = useCallback(() => {
    const today = getTodayStr();
    const yesterday = getYesterdayStr();
    const current = loadStreak();

    if (current.lastActiveDate === today) return current; // already recorded

    let newStreak;
    if (current.lastActiveDate === yesterday) {
      newStreak = current.currentStreak + 1;
    } else if (current.lastActiveDate === null) {
      newStreak = 1;
    } else {
      newStreak = 1; // streak broken
    }

    const updated = {
      currentStreak: newStreak,
      lastActiveDate: today,
      longestStreak: Math.max(current.longestStreak, newStreak),
    };
    saveStreak(updated);
    setStreakData(updated);
    return updated;
  }, []);

  const getStreak = useCallback(() => {
    return loadStreak();
  }, []);

  return { streakData, recordActivity, getStreak };
}
