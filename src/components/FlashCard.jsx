import { useState } from 'react';
import SpeakButton from './SpeakButton';
import ConfidenceButtons from './ConfidenceButtons';

export default function FlashCard({ card, onRate, cardNum, total }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(true);

  const handleRate = (confidence) => {
    setFlipped(false);
    onRate(card.id, confidence);
  };

  return (
    <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
      <div style={{ color: '#9CA3AF', fontSize: '13px', textAlign: 'center', marginBottom: '16px', fontWeight: 500 }}>
        {cardNum} / {total}
      </div>

      <div
        onClick={!flipped ? handleFlip : undefined}
        style={{
          background: '#FFFFFF',
          borderRadius: '28px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
          minHeight: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          cursor: flipped ? 'default' : 'pointer',
          border: flipped ? '2px solid #22C55E' : '2px solid #EBEBF0',
          transition: 'border-color 0.2s',
          textAlign: 'center',
        }}
      >
        {!flipped ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="pt-word" style={{ fontSize: '36px', fontWeight: 700, color: '#1A1A2E' }}>
                {card.word}
              </span>
              <SpeakButton text={card.word} size="lg" />
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '14px', fontWeight: 500 }}>tap to flip</p>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="pt-word" style={{ fontSize: '22px', fontWeight: 700, color: '#1A1A2E' }}>
                {card.word}
              </span>
              <SpeakButton text={card.word} size="md" />
            </div>
            <div style={{ color: '#7B61FF', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
              {card.translation}
            </div>
            {card.example && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '4px' }}>
                <p className="pt-word" style={{ color: '#6B7280', fontSize: '13px', fontStyle: 'italic' }}>
                  "{card.example}"
                </p>
                <SpeakButton text={card.example} size="sm" />
              </div>
            )}
          </>
        )}
      </div>

      {flipped && (
        <div style={{ marginTop: '16px' }}>
          <ConfidenceButtons onRate={handleRate} />
        </div>
      )}

      {!flipped && (
        <p style={{ color: '#9CA3AF', fontSize: '12px', textAlign: 'center', marginTop: '12px' }}>
          Tap card to see translation
        </p>
      )}
    </div>
  );
}
