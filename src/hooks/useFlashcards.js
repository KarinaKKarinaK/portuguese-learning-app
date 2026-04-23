import { useState, useCallback } from 'react';
import { getNextDueDate, isCardDue, sortCardsByPriority } from '../utils/sr';

const STORAGE_KEY = 'pt-bh-flashcards';
const DECK_IDS_KEY = 'pt-bh-deck-ids';

function loadCards() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function loadDeckIds() {
  try {
    const raw = localStorage.getItem(DECK_IDS_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveDeckIds(ids) {
  localStorage.setItem(DECK_IDS_KEY, JSON.stringify([...ids]));
}

export function useFlashcards() {
  const [cards, setCards] = useState(() => loadCards());
  const [deckIds, setDeckIds] = useState(() => loadDeckIds());

  const addCard = useCallback((word, translation, example, id, priority = false) => {
    const currentIds = loadDeckIds();
    const cardId = id || `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    if (currentIds.has(cardId)) return; // already in deck

    const newCard = {
      id: cardId,
      word,
      translation,
      example: example || '',
      interval: 1,
      dueDate: new Date().toISOString().split('T')[0],
      lastRated: null,
      source: 'vocabulary',
      priority,
    };

    const current = loadCards();
    const updated = [...current, newCard];
    saveCards(updated);

    const newIds = new Set(currentIds);
    newIds.add(cardId);
    saveDeckIds(newIds);

    setCards(updated);
    setDeckIds(newIds);
    return newCard;
  }, []);

  const getDueCards = useCallback(() => {
    const current = loadCards();
    const due = current.filter(c => isCardDue(c));
    return sortCardsByPriority(due);
  }, []);

  const rateCard = useCallback((id, confidence) => {
    const current = loadCards();
    const updated = current.map(c => {
      if (c.id !== id) return c;
      const nextDate = getNextDueDate(confidence);
      return {
        ...c,
        interval: confidence === 1 ? 1 : confidence === 2 ? 3 : 7,
        dueDate: nextDate,
        lastRated: new Date().toISOString(),
      };
    });
    saveCards(updated);
    setCards(updated);
  }, []);

  const getCardCount = useCallback(() => {
    return loadCards().length;
  }, []);

  const isInDeck = useCallback((id) => {
    return loadDeckIds().has(id);
  }, []);

  const getAllCards = useCallback(() => {
    return loadCards();
  }, []);

  return { cards, deckIds, addCard, getDueCards, rateCard, getCardCount, isInDeck, getAllCards };
}
