import { useState, useCallback } from 'react';

const STORAGE_KEY = 'pt-bh-quiz-history';

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function useQuizHistory() {
  const [history, setHistory] = useState(() => loadHistory());

  const saveSession = useCallback((session) => {
    const current = loadHistory();
    const newSession = {
      date: new Date().toISOString(),
      score: session.score,
      total: session.total,
      categoryBreakdown: session.categoryBreakdown || {},
      wrongAnswers: session.wrongAnswers || [],
    };
    const updated = [newSession, ...current].slice(0, 10);
    saveHistory(updated);
    setHistory(updated);
  }, []);

  const getHistory = useCallback(() => {
    return loadHistory();
  }, []);

  const getWeakCategories = useCallback(() => {
    const h = loadHistory();
    if (!h.length) return ['grammar'];

    const categoryScores = {};
    const categoryCounts = {};

    h.slice(0, 3).forEach(session => {
      Object.entries(session.categoryBreakdown || {}).forEach(([cat, data]) => {
        if (!categoryScores[cat]) { categoryScores[cat] = 0; categoryCounts[cat] = 0; }
        categoryScores[cat] += data.correct || 0;
        categoryCounts[cat] += data.total || 0;
      });
    });

    const rates = Object.entries(categoryScores).map(([cat, correct]) => ({
      category: cat,
      rate: categoryCounts[cat] > 0 ? correct / categoryCounts[cat] : 1,
    }));

    rates.sort((a, b) => a.rate - b.rate);
    return rates.slice(0, 3).map(r => r.category);
  }, []);

  const getLastWrongAnswers = useCallback(() => {
    const h = loadHistory();
    if (!h.length) return [];
    return h[0].wrongAnswers || [];
  }, []);

  return { history, saveSession, getHistory, getWeakCategories, getLastWrongAnswers };
}
