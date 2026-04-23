import { useState, useMemo } from 'react';
import { VERBS } from '../data/verbs';
import { NOUNS } from '../data/nouns';
import { ADJECTIVES } from '../data/adjectives';
import { SLANG } from '../data/mineires';
import SpeakButton from '../components/SpeakButton';
import { useFlashcards } from '../hooks/useFlashcards';

const CATEGORIES = [
  { id: 'verbs', label: 'Verbs' },
  { id: 'nouns', label: 'Nouns' },
  { id: 'adjectives', label: 'Adjectives' },
  { id: 'connectors', label: 'Connectors' },
  { id: 'colloquial', label: 'BH Colloquial' },
];

const DIFFICULTIES = ['All', 'Core', 'Medium', 'Advanced'];

function VocabCard({ item, onAdd, inDeck, type }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="pt-word" style={{ fontSize: '18px', color: '#1A1A2E', fontWeight: 700 }}>
            {item.word}
          </span>
          <SpeakButton text={item.word} size="sm" />
          {type === 'nouns' && (
            <span className={item.gender === 'm' ? 'badge-blue' : 'badge-purple'}>
              {item.gender === 'm' ? 'M' : 'F'}
            </span>
          )}
          {type === 'verbs' && item.irregular && (
            <span className="badge-yellow">IRR</span>
          )}
          {item.difficulty && (
            <span className={
              item.difficulty === 'core' ? 'badge-green' :
              item.difficulty === 'medium' ? 'badge-yellow' : 'badge-red'
            }>
              {item.difficulty}
            </span>
          )}
        </div>
      </div>
      <p style={{ color: '#6B7280', fontSize: '14px' }}>{item.translation}</p>
      {item.example && (
        <p className="pt-word" style={{ color: '#9CA3AF', fontSize: '12px', fontStyle: 'italic' }}>
          "{item.example}"
        </p>
      )}
      <button
        onClick={() => onAdd(item)}
        disabled={inDeck}
        style={{
          marginTop: '4px',
          borderRadius: '999px',
          padding: '6px 16px',
          fontSize: '13px',
          fontWeight: 600,
          border: 'none',
          cursor: inDeck ? 'default' : 'pointer',
          background: inDeck ? '#DCFCE7' : '#EDE9FF',
          color: inDeck ? '#16A34A' : '#7B61FF',
          alignSelf: 'flex-start',
          transition: 'opacity 0.15s',
        }}
        type="button"
      >
        {inDeck ? '✓ Added' : '+ Add to deck'}
      </button>
    </div>
  );
}

function SlangCard({ item, onAdd, inDeck }) {
  const regBadge = {
    'Core Mineiro': 'badge-purple',
    'Casual': 'badge-green',
    'Cutoff': 'badge-yellow',
    'Diminutive': 'badge-purple',
  };
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span className="pt-word" style={{ fontSize: '18px', color: '#1A1A2E', fontWeight: 700 }}>
          {item.word}
        </span>
        <SpeakButton text={item.word} size="sm" />
        <span className={regBadge[item.register] || 'badge-purple'}>{item.register}</span>
      </div>
      <p style={{ color: '#6B7280', fontSize: '14px' }}>{item.meaning}</p>
      <p className="pt-word" style={{ color: '#9CA3AF', fontSize: '12px', fontStyle: 'italic' }}>"{item.example}"</p>
      <button
        onClick={() => onAdd(item)}
        disabled={inDeck}
        style={{
          marginTop: '4px',
          borderRadius: '999px',
          padding: '6px 16px',
          fontSize: '13px',
          fontWeight: 600,
          border: 'none',
          cursor: inDeck ? 'default' : 'pointer',
          background: inDeck ? '#DCFCE7' : '#EDE9FF',
          color: inDeck ? '#16A34A' : '#7B61FF',
          alignSelf: 'flex-start',
        }}
        type="button"
      >
        {inDeck ? '✓ Added' : '+ Add to deck'}
      </button>
    </div>
  );
}

export default function Vocabulary() {
  const [activeCategory, setActiveCategory] = useState('verbs');
  const [difficulty, setDifficulty] = useState('All');
  const [unknownOnly, setUnknownOnly] = useState(false);
  const { addCard, isInDeck } = useFlashcards();

  const items = useMemo(() => {
    let data = [];
    if (activeCategory === 'verbs') data = VERBS;
    else if (activeCategory === 'nouns') data = NOUNS;
    else if (activeCategory === 'adjectives') data = ADJECTIVES.filter(a => !['connector', 'discourse'].includes(a.category));
    else if (activeCategory === 'connectors') data = ADJECTIVES.filter(a => ['connector', 'discourse'].includes(a.category));
    else if (activeCategory === 'colloquial') data = SLANG;

    if (difficulty !== 'All' && activeCategory !== 'colloquial') {
      data = data.filter(d => d.difficulty === difficulty.toLowerCase());
    }
    if (unknownOnly && activeCategory !== 'colloquial') {
      data = data.filter(d => !isInDeck(d.id));
    }
    return data;
  }, [activeCategory, difficulty, unknownOnly, isInDeck]);

  const handleAdd = (item) => {
    const translation = item.translation || item.meaning || '';
    const example = item.example || '';
    addCard(item.word, translation, example, item.id);
  };

  return (
    <div style={{ paddingBottom: '20px' }}>
      {/* Category tabs */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: '#FAF7F2',
          padding: '12px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            marginBottom: '10px',
            paddingBottom: '2px',
          }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                flexShrink: 0,
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: activeCategory === cat.id ? 700 : 500,
                border: 'none',
                cursor: 'pointer',
                background: activeCategory === cat.id ? '#7B61FF' : '#FFFFFF',
                color: activeCategory === cat.id ? 'white' : '#6B7280',
                boxShadow: activeCategory === cat.id ? '0 2px 12px rgba(123,97,255,0.3)' : '0 1px 4px rgba(0,0,0,0.06)',
                transition: 'all 0.15s',
              }}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </div>
        {activeCategory !== 'colloquial' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: difficulty === d ? 700 : 500,
                    border: difficulty === d ? 'none' : '1.5px solid #EBEBF0',
                    cursor: 'pointer',
                    background: difficulty === d ? '#EDE9FF' : 'white',
                    color: difficulty === d ? '#7B61FF' : '#9CA3AF',
                    transition: 'all 0.15s',
                  }}
                  type="button"
                >
                  {d}
                </button>
              ))}
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginLeft: 'auto' }}>
              <input
                type="checkbox"
                checked={unknownOnly}
                onChange={e => setUnknownOnly(e.target.checked)}
                style={{ accentColor: '#7B61FF' }}
              />
              <span style={{ color: '#6B7280', fontSize: '12px' }}>Unknown only</span>
            </label>
          </div>
        )}
      </div>

      <div>
        <div style={{ color: '#9CA3AF', fontSize: '12px', marginBottom: '12px' }}>
          {items.length} items
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {activeCategory === 'colloquial'
            ? items.map(item => (
                <SlangCard
                  key={item.id}
                  item={item}
                  onAdd={handleAdd}
                  inDeck={isInDeck(item.id)}
                />
              ))
            : items.map(item => (
                <VocabCard
                  key={item.id}
                  item={item}
                  type={activeCategory}
                  onAdd={handleAdd}
                  inDeck={isInDeck(item.id)}
                />
              ))
          }
        </div>
      </div>
    </div>
  );
}
