import { useState } from 'react';
import { DIALOGUES } from '../data/dialogues';
import { TEXTS } from '../data/texts';
import SpeakButton from '../components/SpeakButton';

const SUB_TABS = [
  { id: 'dialogues', label: 'Dialogues' },
  { id: 'texts', label: 'Texts' },
];

function LevelBadge({ level }) {
  const cls = level === 'Intermediate' ? 'badge-yellow' : 'badge-red';
  return <span className={cls}>{level}</span>;
}

function DialogueView({ dialogue, onBack }) {
  const [mode, setMode] = useState('read');
  const [revealed, setRevealed] = useState(new Set());
  const [noteRevealed, setNoteRevealed] = useState(new Set());

  const toggleReveal = (idx) => {
    setRevealed(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const toggleNote = (idx) => {
    setNoteRevealed(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <div>
      <button
        onClick={onBack}
        style={{ color: '#7B61FF', fontSize: '14px', fontWeight: 600, marginBottom: '16px', background: 'none', border: 'none', cursor: 'pointer' }}
        type="button"
      >
        ← Back
      </button>
      <h2 style={{ color: '#1A1A2E', fontWeight: 800, fontSize: '20px', marginBottom: '6px' }}>{dialogue.title}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <LevelBadge level={dialogue.level} />
        <span style={{ color: '#9CA3AF', fontSize: '13px' }}>{dialogue.setting}</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['read', 'practice'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: mode === m ? 700 : 500,
              border: 'none',
              cursor: 'pointer',
              background: mode === m ? '#7B61FF' : '#FFFFFF',
              color: mode === m ? 'white' : '#6B7280',
              textTransform: 'capitalize',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
            type="button"
          >
            {m}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {dialogue.lines.map((line, idx) => {
          const isA = line.speaker === 'A';
          const isRevealed = revealed.has(idx);

          return (
            <div key={idx} style={{ display: 'flex', justifyContent: isA ? 'flex-start' : 'flex-end' }}>
              <div style={{ maxWidth: '82%' }}>
                <div
                  style={{
                    background: isA ? '#FFFFFF' : '#F0EDFF',
                    border: `1.5px solid ${isA ? '#EBEBF0' : '#C4B5FD'}`,
                    borderRadius: isA ? '4px 20px 20px 20px' : '20px 4px 20px 20px',
                    padding: '12px 16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: isA ? '#EBEBF0' : '#EDE9FF',
                        color: isA ? '#6B7280' : '#7B61FF',
                      }}
                    >
                      {line.speaker}
                    </span>
                    <SpeakButton text={line.pt} size="sm" />
                  </div>

                  {mode === 'practice' && !isRevealed ? (
                    <button
                      onClick={() => toggleReveal(idx)}
                      className="pt-word"
                      style={{
                        color: 'transparent',
                        background: '#EBEBF0',
                        borderRadius: '4px',
                        fontSize: '15px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        padding: '2px 6px',
                        border: 'none',
                      }}
                      type="button"
                      title="Tap to reveal"
                    >
                      {line.pt}
                    </button>
                  ) : (
                    <span className="pt-word" style={{ color: '#1A1A2E', fontSize: '15px', fontWeight: 500 }}>
                      {line.pt}
                    </span>
                  )}

                  <p style={{ color: '#9CA3AF', fontSize: '13px', marginTop: '4px' }}>{line.en}</p>

                  {line.culturalNote && (
                    <button
                      onClick={() => toggleNote(idx)}
                      style={{ color: '#7B61FF', fontSize: '11px', marginTop: '6px', display: 'block', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                      type="button"
                    >
                      {noteRevealed.has(idx) ? '▼ Cultural note' : '▶ Cultural note'}
                    </button>
                  )}
                  {line.culturalNote && noteRevealed.has(idx) && (
                    <p style={{
                      color: '#6B7280',
                      fontSize: '12px',
                      marginTop: '6px',
                      fontStyle: 'italic',
                      background: '#FAFAFA',
                      padding: '8px',
                      borderRadius: '8px',
                    }}>
                      {line.culturalNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TextView({ text, onBack }) {
  const [mode, setMode] = useState('read');
  const [activeWord, setActiveWord] = useState(null);

  const renderParagraph = (para, pIdx) => {
    const words = para.split(/(\s+)/);
    return (
      <p key={pIdx} style={{ color: '#1A1A2E', fontSize: '16px', lineHeight: 1.9, marginBottom: '16px' }}>
        {words.map((token, tIdx) => {
          const lower = token.toLowerCase().replace(/[.,;:!?'"]/g, '');
          const vocabEntry = text.vocabulary.find(v => v.word.toLowerCase() === lower);
          if (vocabEntry) {
            return (
              <span key={tIdx}>
                <button
                  onClick={() => setActiveWord(activeWord?.word === vocabEntry.word ? null : vocabEntry)}
                  style={{
                    color: '#D97706',
                    fontWeight: 600,
                    background: '#FFF9C4',
                    textDecoration: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 2px',
                    borderRadius: '3px',
                    font: 'inherit',
                  }}
                  type="button"
                >
                  {token}
                </button>
                {mode === 'study' && vocabEntry && (
                  <span style={{ fontSize: '11px', color: '#9CA3AF', marginLeft: '2px' }}>
                    ({vocabEntry.definition})
                  </span>
                )}
              </span>
            );
          }
          return <span key={tIdx}>{token}</span>;
        })}
      </p>
    );
  };

  return (
    <div>
      <button
        onClick={onBack}
        style={{ color: '#7B61FF', fontSize: '14px', fontWeight: 600, marginBottom: '16px', background: 'none', border: 'none', cursor: 'pointer' }}
        type="button"
      >
        ← Back
      </button>
      <h2 style={{ color: '#1A1A2E', fontWeight: 800, fontSize: '20px', marginBottom: '6px' }}>{text.title}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <LevelBadge level={text.level} />
        <span style={{ color: '#9CA3AF', fontSize: '13px' }}>{text.topic}</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['read', 'study'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: mode === m ? 700 : 500,
              border: 'none',
              cursor: 'pointer',
              background: mode === m ? '#7B61FF' : '#FFFFFF',
              color: mode === m ? 'white' : '#6B7280',
              textTransform: 'capitalize',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
            type="button"
          >
            {m} mode
          </button>
        ))}
      </div>

      {activeWord && (
        <div
          className="card"
          style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A', marginBottom: '16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="pt-word" style={{ color: '#D97706', fontWeight: 700, fontSize: '18px' }}>{activeWord.word}</span>
            <SpeakButton text={activeWord.word} size="sm" />
            <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{activeWord.partOfSpeech}</span>
          </div>
          <p style={{ color: '#1A1A2E', fontSize: '14px' }}>{activeWord.definition}</p>
          <button
            onClick={() => setActiveWord(null)}
            style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
            type="button"
          >
            Close ×
          </button>
        </div>
      )}

      <div>
        {text.paragraphs.map((para, i) => renderParagraph(para, i))}
      </div>

      <div style={{ borderTop: '1px solid #EBEBF0', paddingTop: '20px', marginTop: '8px' }}>
        <h4 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>Glossary</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {text.vocabulary.map((v, i) => (
            <div key={i} style={{ padding: '6px 0', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span className="pt-word" style={{ color: '#7B61FF', fontWeight: 600, minWidth: '120px', fontSize: '13px' }}>{v.word}</span>
              <span style={{ color: '#9CA3AF', fontSize: '13px' }}>{v.definition}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Content() {
  const [activeTab, setActiveTab] = useState('dialogues');
  const [selectedDialogue, setSelectedDialogue] = useState(null);
  const [selectedText, setSelectedText] = useState(null);

  return (
    <div style={{ paddingBottom: '20px' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: '#FAF7F2',
          padding: '12px 0',
          marginBottom: '4px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          {SUB_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedDialogue(null);
                setSelectedText(null);
              }}
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: activeTab === tab.id ? 700 : 500,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === tab.id ? '#7B61FF' : '#FFFFFF',
                color: activeTab === tab.id ? 'white' : '#6B7280',
                boxShadow: activeTab === tab.id ? '0 2px 12px rgba(123,97,255,0.3)' : '0 1px 4px rgba(0,0,0,0.06)',
                transition: 'all 0.15s',
              }}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'dialogues' && !selectedDialogue && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {DIALOGUES.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDialogue(d)}
              className="card"
              style={{ textAlign: 'left', border: 'none', cursor: 'pointer', width: '100%' }}
              type="button"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '16px' }}>{d.title}</span>
                <LevelBadge level={d.level} />
              </div>
              <p style={{ color: '#9CA3AF', fontSize: '13px', marginBottom: '6px' }}>{d.setting}</p>
              <p style={{ color: '#7B61FF', fontSize: '12px', fontWeight: 600 }}>{d.lines.length} exchanges →</p>
            </button>
          ))}
        </div>
      )}

      {activeTab === 'dialogues' && selectedDialogue && (
        <DialogueView dialogue={selectedDialogue} onBack={() => setSelectedDialogue(null)} />
      )}

      {activeTab === 'texts' && !selectedText && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {TEXTS.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedText(t)}
              className="card"
              style={{ textAlign: 'left', border: 'none', cursor: 'pointer', width: '100%' }}
              type="button"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '16px' }}>{t.title}</span>
                <LevelBadge level={t.level} />
              </div>
              <p style={{ color: '#9CA3AF', fontSize: '13px', marginBottom: '6px' }}>{t.topic}</p>
              <p style={{ color: '#7B61FF', fontSize: '12px', fontWeight: 600 }}>
                {t.vocabulary.length} vocab words →
              </p>
            </button>
          ))}
        </div>
      )}

      {activeTab === 'texts' && selectedText && (
        <TextView text={selectedText} onBack={() => setSelectedText(null)} />
      )}
    </div>
  );
}
