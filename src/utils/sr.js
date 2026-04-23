export function getNextDueDate(confidence) {
  const d = new Date();
  const days = confidence === 1 ? 1 : confidence === 2 ? 3 : 7;
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function isCardDue(card) {
  if (!card.dueDate) return true;
  const today = new Date().toISOString().split('T')[0];
  return card.dueDate <= today;
}

export function sortCardsByPriority(cards) {
  return [...cards].sort((a, b) => {
    // Priority cards first
    if (a.priority && !b.priority) return -1;
    if (!a.priority && b.priority) return 1;
    // Then by due date (oldest first)
    if (a.dueDate < b.dueDate) return -1;
    if (a.dueDate > b.dueDate) return 1;
    return 0;
  });
}
