const LAST_SYNC_KEY = 'pt-bh-notion-last-sync';
const SYNC_COUNT_KEY = 'pt-bh-notion-sync-count';

export async function syncFromNotion() {
  try {
    const res = await fetch('/api/notion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Unknown error' }));
      return { success: false, error: err.error || `HTTP ${res.status}`, words: [] };
    }

    const data = await res.json();
    const words = data.words || [];

    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
    localStorage.setItem(SYNC_COUNT_KEY, words.length.toString());

    return { success: true, words, count: words.length };
  } catch (err) {
    return { success: false, error: err.message, words: [] };
  }
}

export function getLastSyncInfo() {
  const lastSync = localStorage.getItem(LAST_SYNC_KEY);
  const count = parseInt(localStorage.getItem(SYNC_COUNT_KEY) || '0', 10);
  return { lastSync, count };
}
