import { useState, useCallback } from 'react';
import { useFlashcards } from '../hooks/useFlashcards';
import { useXP } from '../hooks/useXP';
import { getLastSyncInfo, syncFromNotion } from '../utils/notion';
import FlashCard from '../components/FlashCard';
import { CheckCircle2, Trophy, ThumbsUp, Zap } from 'lucide-react';

export default function Flashcards() {
  const { getDueCards, rateCard, getCardCount } = useFlashcards();
  const { addXP } = useXP();
  const [sessionCards, setSessionCards] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ correct: 0, again: 0 });
  const [done, setDone] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);

  const syncInfo = getLastSyncInfo();

  const startSession = useCallback(() => {
    const due = getDueCards();
    setSessionCards(due);
    setCurrentIndex(0);
    setSessionStats({ correct: 0, again: 0 });
    setDone(false);
  }, [getDueCards]);

  const handleRate = useCallback((id, confidence) => {
    rateCard(id, confidence);
    const xpMap = { 1: 3, 2: 7, 3: 10 };
    addXP(xpMap[confidence]);

    setSessionStats(prev => ({
      correct: prev.correct + (confidence > 1 ? 1 : 0),
      again: prev.again + (confidence === 1 ? 1 : 0),
    }));

    const nextIdx = currentIndex + 1;
    if (nextIdx >= sessionCards.length) {
      addXP(20);
      setDone(true);
    } else {
      setCurrentIndex(nextIdx);
    }
  }, [currentIndex, sessionCards, rateCard, addXP]);

  const handleSync = async () => {
    setSyncing(true);
    setSyncStatus(null);
    const result = await syncFromNotion();
    setSyncing(false);
    setSyncStatus(result.success ? `Synced ${result.count} words` : result.error);
  };

  const totalCards = getCardCount();
  const dueCount = sessionCards ? sessionCards.length : getDueCards().length;

  if (!sessionCards) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Notion Sync */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '15px' }}>Notion Sync</span>
            <button
              onClick={handleSync}
              disabled={syncing}
              style={{
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: '#EDE9FF',
                color: '#7B61FF',
              }}
              type="button"
            >
              {syncing ? 'Syncing...' : 'Sync'}
            </button>
          </div>
          <div style={{ color: '#9CA3AF', fontSize: '12px' }}>
            {syncInfo.lastSync
              ? `Last sync: ${new Date(syncInfo.lastSync).toLocaleString()} · ${syncInfo.count} words`
              : 'Never synced'}
          </div>
          {syncStatus && (
            <div style={{
              color: syncStatus.includes('Synced') ? '#16A34A' : '#DC2626',
              fontSize: '12px',
              marginTop: '6px',
              fontWeight: 600,
            }}>
              {syncStatus}
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ color: '#7B61FF', fontSize: '32px', fontWeight: 800, lineHeight: 1 }}>{totalCards}</div>
            <div style={{ color: '#9CA3AF', fontSize: '13px', marginTop: '6px' }}>Total cards</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ color: '#22C55E', fontSize: '32px', fontWeight: 800, lineHeight: 1 }}>{dueCount}</div>
            <div style={{ color: '#9CA3AF', fontSize: '13px', marginTop: '6px' }}>Due today</div>
          </div>
        </div>

        {dueCount > 0 ? (
          <button
            onClick={startSession}
            style={{
              width: '100%',
              height: '52px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              background: '#1A1A2E',
              color: 'white',
            }}
            type="button"
          >
            Start Review ({dueCount} cards)
          </button>
        ) : (
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: '32px 24px',
              background: '#DCFCE7',
              border: '1.5px solid #BBF7D0',
            }}
          >
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
              <CheckCircle2 size={48} strokeWidth={1.5} style={{ color: '#16A34A' }} />
            </div>
            <div style={{ color: '#16A34A', fontWeight: 700, fontSize: '17px', marginBottom: '6px' }}>
              All caught up!
            </div>
            <div style={{ color: '#6B7280', fontSize: '14px' }}>
              No cards due. Add words from Vocabulary to build your deck.
            </div>
          </div>
        )}

        {totalCards === 0 && (
          <p style={{ color: '#9CA3AF', fontSize: '13px', textAlign: 'center' }}>
            Go to Vocabulary to add words to your flashcard deck.
          </p>
        )}
      </div>
    );
  }

  if (done) {
    const total = sessionCards.length;
    const pct = total > 0 ? Math.round((sessionStats.correct / total) * 100) : 0;
    return (
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
          {pct >= 80
            ? <Trophy size={56} strokeWidth={1.5} style={{ color: '#D97706' }} />
            : pct >= 60
            ? <ThumbsUp size={56} strokeWidth={1.5} style={{ color: '#7B61FF' }} />
            : <Zap size={56} strokeWidth={1.5} style={{ color: '#22C55E' }} />
          }
        </div>
        <h2 style={{ color: '#1A1A2E', fontSize: '24px', fontWeight: 800 }}>
          Session Complete!
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', width: '100%' }}>
          <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ color: '#22C55E', fontSize: '24px', fontWeight: 800 }}>{sessionStats.correct}</div>
            <div style={{ color: '#9CA3AF', fontSize: '11px', marginTop: '4px' }}>Good/Easy</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ color: '#EF4444', fontSize: '24px', fontWeight: 800 }}>{sessionStats.again}</div>
            <div style={{ color: '#9CA3AF', fontSize: '11px', marginTop: '4px' }}>Again</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ color: '#7B61FF', fontSize: '24px', fontWeight: 800 }}>{pct}%</div>
            <div style={{ color: '#9CA3AF', fontSize: '11px', marginTop: '4px' }}>Score</div>
          </div>
        </div>
        <p style={{ color: '#9CA3AF', fontSize: '13px' }}>
          +{sessionStats.correct * 7 + sessionStats.again * 3 + 20} XP earned this session
        </p>
        <button
          onClick={() => setSessionCards(null)}
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '15px',
            border: 'none',
            cursor: 'pointer',
            background: '#7B61FF',
            color: 'white',
          }}
          type="button"
        >
          Back to Deck
        </button>
      </div>
    );
  }

  const card = sessionCards[currentIndex];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button
          onClick={() => setSessionCards(null)}
          style={{
            color: '#6B7280',
            fontSize: '14px',
            fontWeight: 600,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          type="button"
        >
          ← Exit
        </button>
        <span
          style={{
            background: '#F3F4F6',
            color: '#6B7280',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {currentIndex + 1} / {sessionCards.length}
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: '6px',
          background: '#F0EDFF',
          borderRadius: '999px',
          overflow: 'hidden',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${((currentIndex) / sessionCards.length) * 100}%`,
            background: '#7B61FF',
            borderRadius: '999px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <FlashCard
        card={card}
        onRate={handleRate}
        cardNum={currentIndex + 1}
        total={sessionCards.length}
      />
    </div>
  );
}
