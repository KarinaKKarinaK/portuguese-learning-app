import { useState, useCallback } from 'react';

const STORAGE_KEY = 'pt-bh-xp';
const DAILY_CAP = 200;

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

function loadXP() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { totalXP: 0, dailyXP: 0, lastXPDate: null, weeklyHistory: {} };
    return JSON.parse(raw);
  } catch {
    return { totalXP: 0, dailyXP: 0, lastXPDate: null, weeklyHistory: {} };
  }
}

function saveXP(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useXP() {
  const [xpData, setXPData] = useState(() => loadXP());

  const addXP = useCallback((amount) => {
    const today = getTodayStr();
    const current = loadXP();

    let dailyXP = current.lastXPDate === today ? current.dailyXP : 0;
    const remaining = DAILY_CAP - dailyXP;
    const actual = Math.min(amount, remaining);
    if (actual <= 0) return current;

    const weeklyHistory = { ...current.weeklyHistory };
    weeklyHistory[today] = (weeklyHistory[today] || 0) + actual;

    const updated = {
      totalXP: current.totalXP + actual,
      dailyXP: dailyXP + actual,
      lastXPDate: today,
      weeklyHistory,
    };
    saveXP(updated);
    setXPData(updated);
    return updated;
  }, []);

  const getWeeklyData = useCallback(() => {
    const current = loadXP();
    const days = getLast7Days();
    return days.map(d => ({ date: d, xp: current.weeklyHistory[d] || 0 }));
  }, []);

  const getDailyXP = useCallback(() => {
    const current = loadXP();
    const today = getTodayStr();
    if (current.lastXPDate !== today) return 0;
    return current.dailyXP;
  }, []);

  return { xpData, addXP, getWeeklyData, getDailyXP, DAILY_CAP };
}
