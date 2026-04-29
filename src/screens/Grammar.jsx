import { useState, useEffect, useRef, useCallback } from 'react';
import { TENSES, KEY_IRREGULARS } from '../data/grammar';
import SpeakButton from '../components/SpeakButton';

const PRONOUNS_KEYS = ['eu', 'tu', 'ele', 'nos', 'eles'];
const PRONOUNS_LABELS = ['eu', 'tu', 'ele/ela', 'nós', 'eles/elas'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function buildPracticeQuestions() {
  const questions = [];
  for (const tense of TENSES) {
    for (const irr of tense.irregulars) {
      PRONOUNS_KEYS.forEach((p, i) => {
        if (irr[p]) {
          questions.push({
            verb: irr.verb,
            pronoun: PRONOUNS_LABELS[i],
            tenseId: tense.id,
            tenseName: tense.name,
            answer: irr[p],
            isIrregular: true,
          });
        }
      });
    }
    const regulars = [
      { verb: 'falar', stem: 'fal', endings: tense.arEndings },
      { verb: 'comer', stem: 'com', endings: tense.erEndings },
      { verb: 'partir', stem: 'part', endings: tense.irEndings },
    ];
    for (const reg of regulars) {
      reg.endings.forEach((ending, i) => {
        questions.push({
          verb: reg.verb,
          pronoun: PRONOUNS_LABELS[i],
          tenseId: tense.id,
          tenseName: tense.name,
          answer: reg.stem + ending.replace('-', ''),
          isIrregular: false,
        });
      });
    }
  }
  return questions;
}

const ALL_QUESTIONS = buildPracticeQuestions();

function ConjugationDrill() {
  const [filterTense, setFilterTense] = useState('all');
  const [queue, setQueue] = useState(() => shuffle(ALL_QUESTIONS));
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong'
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const inputRef = useRef(null);

  const filtered = filterTense === 'all' ? queue : queue.filter(q => q.tenseId === filterTense);

  const resetQueue = useCallback((tenseId) => {
    const pool = tenseId === 'all' ? ALL_QUESTIONS : ALL_QUESTIONS.filter(q => q.tenseId === tenseId);
    setQueue(shuffle(pool));
    setIdx(0);
    setInput('');
    setFeedback(null);
    setScore({ correct: 0, total: 0 });
  }, []);

  const handleFilterChange = (tenseId) => {
    setFilterTense(tenseId);
    resetQueue(tenseId);
  };

  const current = filtered[idx % Math.max(filtered.length, 1)];

  const checkAnswer = () => {
    if (!current || feedback !== null) return;
    const correct = normalize(input) === normalize(current.answer);
    setFeedback(correct ? 'correct' : 'wrong');
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
  };

  const nextQuestion = () => {
    setIdx(i => i + 1);
    setInput('');
    setFeedback(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    if (feedback === null) inputRef.current?.focus();
  }, [feedback, idx]);

  if (!current) return null;

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Tense filter */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '2px' }}>
        {[{ id: 'all', name: 'Todos' }, ...TENSES].map(t => (
          <button
            key={t.id}
            onClick={() => handleFilterChange(t.id)}
            type="button"
            style={{
              flexShrink: 0,
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: filterTense === t.id ? 700 : 500,
              border: 'none',
              cursor: 'pointer',
              background: filterTense === t.id ? '#f5a623' : '#FFFFFF',
              color: filterTense === t.id ? 'white' : '#6B7280',
              boxShadow: filterTense === t.id ? '0 2px 10px rgba(245,166,35,0.4)' : '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Score bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#6B7280', fontSize: '13px' }}>
          {score.total > 0 ? `${score.correct}/${score.total} corretas` : 'Comece a praticar'}
        </span>
        {accuracy !== null && (
          <span style={{
            background: accuracy >= 70 ? '#DCFCE7' : '#FEE2E2',
            color: accuracy >= 70 ? '#16A34A' : '#DC2626',
            fontSize: '12px',
            fontWeight: 700,
            padding: '2px 10px',
            borderRadius: '999px',
          }}>
            {accuracy}%
          </span>
        )}
      </div>

      {/* Question card */}
      <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
        {/* Tense + type badge */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
          <span style={{
            background: '#F0EDFF', color: '#7B61FF',
            fontSize: '11px', fontWeight: 600,
            padding: '3px 10px', borderRadius: '999px',
          }}>
            {current.tenseName}
          </span>
          {current.isIrregular && (
            <span style={{
              background: '#FEE2E2', color: '#DC2626',
              fontSize: '11px', fontWeight: 600,
              padding: '3px 10px', borderRadius: '999px',
            }}>
              irregular
            </span>
          )}
        </div>

        {/* Verb */}
        <div className="pt-word" style={{ fontSize: '32px', fontWeight: 800, color: '#1A1A2E', marginBottom: '4px' }}>
          {current.verb}
        </div>

        {/* Pronoun prompt */}
        <div style={{ fontSize: '18px', color: '#6B7280', marginBottom: '20px' }}>
          <span style={{ fontWeight: 700, color: '#f5a623' }}>{current.pronoun}</span>
          {' '}___________
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') feedback === null ? checkAnswer() : nextQuestion(); }}
          disabled={feedback !== null}
          placeholder="conjugar..."
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '18px',
            fontFamily: 'inherit',
            textAlign: 'center',
            border: `2px solid ${feedback === 'correct' ? '#3dba72' : feedback === 'wrong' ? '#e05050' : '#EBEBF0'}`,
            borderRadius: '12px',
            outline: 'none',
            background: feedback === 'correct' ? '#F0FDF4' : feedback === 'wrong' ? '#FEF2F2' : 'white',
            color: '#1A1A2E',
            boxSizing: 'border-box',
            transition: 'border-color 0.15s, background 0.15s',
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {/* Feedback */}
        {feedback === 'correct' && (
          <div style={{ marginTop: '14px', color: '#16A34A', fontWeight: 700, fontSize: '16px' }}>
            Correto! ✓
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ marginTop: '14px' }}>
            <div style={{ color: '#DC2626', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
              Resposta incorreta
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span className="pt-word" style={{ color: '#1A1A2E', fontSize: '20px', fontWeight: 800 }}>
                {current.answer}
              </span>
              <SpeakButton text={current.answer} size="sm" />
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {feedback === null ? (
          <button
            onClick={checkAnswer}
            disabled={!input.trim()}
            type="button"
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '16px',
              border: 'none',
              cursor: input.trim() ? 'pointer' : 'default',
              background: input.trim() ? '#7B61FF' : '#EBEBF0',
              color: input.trim() ? 'white' : '#9CA3AF',
              fontSize: '15px',
              fontWeight: 700,
              transition: 'background 0.15s',
            }}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            type="button"
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              background: '#7B61FF',
              color: 'white',
              fontSize: '15px',
              fontWeight: 700,
            }}
          >
            Próxima →
          </button>
        )}
        <button
          onClick={() => resetQueue(filterTense)}
          type="button"
          style={{
            padding: '14px 18px',
            borderRadius: '16px',
            border: '2px solid #EBEBF0',
            cursor: 'pointer',
            background: 'white',
            color: '#6B7280',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

const PRONOUNS = ['eu', 'tu', 'ele/ela', 'nos', 'eles/elas'];

const IRREGULAR_COLORS = {
  'totally-irregular': { bg: '#FEE2E2', border: '#FECACA', color: '#DC2626', label: 'Totally Irreg.' },
  'stem-changing': { bg: '#FFFBEB', border: '#FDE68A', color: '#D97706', label: 'Stem-Change' },
  'orthographic': { bg: '#EDE9FF', border: '#C4B5FD', color: '#7B61FF', label: 'Orthographic' },
  'regular-ar': { bg: '#DCFCE7', border: '#BBF7D0', color: '#16A34A', label: 'Regular -AR' },
  'regular-er': { bg: '#DCFCE7', border: '#BBF7D0', color: '#16A34A', label: 'Regular -ER' },
  'regular': { bg: '#DCFCE7', border: '#BBF7D0', color: '#16A34A', label: 'Regular' },
};

function ConjugationTable({ endings, type, tense }) {
  const pronouns = ['eu', 'tu', 'ele/ela', 'nos', 'eles/elas'];
  const exampleStem = type === '-AR' ? 'fal' : type === '-ER' ? 'com' : 'part';
  const exampleWord = type === '-AR' ? 'falar' : type === '-ER' ? 'comer' : 'partir';

  return (
    <div className="card" style={{ padding: '16px' }}>
      <div style={{ color: '#7B61FF', fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
        {type} verbs (<span className="pt-word" style={{ color: '#7B61FF' }}>{exampleWord}</span>)
      </div>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #EBEBF0' }}>
        {pronouns.map((pronoun, i) => (
          <div
            key={pronoun}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: i === 0 ? '#F0EDFF' : i % 2 === 0 ? '#FAFAFA' : '#FFFFFF',
              borderBottom: i < pronouns.length - 1 ? '1px solid #EBEBF0' : 'none',
            }}
          >
            <span style={{ color: '#9CA3AF', fontSize: '13px', minWidth: '80px' }}>{pronoun}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pt-word" style={{ color: '#1A1A2E', fontSize: '15px', fontWeight: 600 }}>
                {exampleStem}{endings[i]}
              </span>
              <SpeakButton text={`${exampleStem}${endings[i]}`} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IrregularGrid({ irregulars }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
      {irregulars.map(irr => {
        const style = IRREGULAR_COLORS[irr.notes] || IRREGULAR_COLORS['totally-irregular'];
        return (
          <div
            key={irr.verb}
            style={{
              background: style.bg,
              border: `1px solid ${style.border}`,
              borderRadius: '16px',
              padding: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="pt-word" style={{ color: style.color, fontWeight: 700, fontSize: '16px' }}>{irr.verb}</span>
              <span style={{
                background: 'white',
                color: style.color,
                fontSize: '10px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '999px',
                border: `1px solid ${style.border}`,
              }}>{style.label}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
              {[irr.eu, irr.tu, irr.ele, irr.nos, irr.eles].map((form, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '9px' }}>{PRONOUNS[i].split('/')[0]}</span>
                  <span className="pt-word" style={{ color: '#1A1A2E', fontSize: '11px', fontWeight: 600 }}>
                    {form}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KeyIrregularsPanel({ open, onToggle }) {
  return (
    <div
      className="card"
      style={{ padding: 0, overflow: 'hidden' }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        type="button"
      >
        <span style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '14px' }}>
          20 Key Irregulars (All Tenses)
        </span>
        <span style={{ color: '#7B61FF', fontWeight: 700 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid #EBEBF0', padding: '12px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#F0EDFF' }}>
                <th style={{ color: '#7B61FF', textAlign: 'left', padding: '8px 10px', fontWeight: 700, borderRadius: '8px 0 0 0' }}>Verb</th>
                <th style={{ color: '#7B61FF', textAlign: 'left', padding: '8px 10px' }}>Presente</th>
                <th style={{ color: '#7B61FF', textAlign: 'left', padding: '8px 10px' }}>Perfeito</th>
                <th style={{ color: '#7B61FF', textAlign: 'left', padding: '8px 10px', borderRadius: '0 8px 0 0' }}>Imperfeito</th>
              </tr>
            </thead>
            <tbody>
              {KEY_IRREGULARS.map((irr, i) => {
                const style = IRREGULAR_COLORS[irr.type] || IRREGULAR_COLORS['totally-irregular'];
                return (
                  <tr key={irr.verb} style={{ background: i % 2 === 0 ? '#FAFAFA' : 'white', borderBottom: '1px solid #EBEBF0' }}>
                    <td style={{ padding: '7px 10px' }}>
                      <span className="pt-word" style={{ color: style.color, fontWeight: 700 }}>{irr.verb}</span>
                    </td>
                    <td className="pt-word" style={{ padding: '7px 10px', color: '#1A1A2E', fontSize: '11px' }}>{irr.presente}</td>
                    <td className="pt-word" style={{ padding: '7px 10px', color: '#6B7280', fontSize: '11px' }}>{irr.perfeito}</td>
                    <td className="pt-word" style={{ padding: '7px 10px', color: '#9CA3AF', fontSize: '11px' }}>{irr.imperfeito}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Grammar() {
  const [activeTab, setActiveTab] = useState('presente');
  const [showIrregulars, setShowIrregulars] = useState(false);

  const tense = activeTab !== 'practice' ? TENSES.find(t => t.id === activeTab) : null;

  const allTabs = [...TENSES.map(t => ({ id: t.id, name: t.name })), { id: 'practice', name: '🎯 Praticar' }];

  return (
    <div style={{ paddingBottom: '20px' }}>
      {/* Tab Bar */}
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
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            paddingBottom: '2px',
          }}
        >
          {allTabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                flexShrink: 0,
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: activeTab === t.id ? 700 : 500,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === t.id
                  ? (t.id === 'practice' ? '#f5a623' : '#7B61FF')
                  : '#FFFFFF',
                color: activeTab === t.id ? 'white' : '#6B7280',
                boxShadow: activeTab === t.id
                  ? (t.id === 'practice' ? '0 2px 12px rgba(245,166,35,0.4)' : '0 2px 12px rgba(123,97,255,0.3)')
                  : '0 1px 4px rgba(0,0,0,0.06)',
                transition: 'all 0.15s',
              }}
              type="button"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'practice' && <ConjugationDrill />}

      {tense && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* When to use */}
          <div
            className="card"
            style={{ background: '#F0EDFF', borderLeft: '4px solid #7B61FF', borderRadius: '0 24px 24px 0', paddingLeft: '16px' }}
          >
            <div className="section-label" style={{ color: '#7B61FF' }}>When to Use</div>
            <p style={{ color: '#1A1A2E', fontSize: '14px', lineHeight: 1.7, marginBottom: '10px' }}>{tense.whenToUse}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pt-word" style={{ color: '#7B61FF', fontSize: '14px', fontStyle: 'italic' }}>
                "{tense.bhExample}"
              </span>
              <SpeakButton text={tense.bhExample} size="sm" />
            </div>
          </div>

          {/* Conjugation Tables */}
          <div>
            <h3 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '15px', marginBottom: '12px' }}>
              Regular Endings
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ConjugationTable endings={tense.arEndings} type="-AR" tense={tense.id} />
              <ConjugationTable endings={tense.erEndings} type="-ER" tense={tense.id} />
              <ConjugationTable endings={tense.irEndings} type="-IR" tense={tense.id} />
            </div>
          </div>

          {/* 12 Key Irregulars */}
          <div>
            <h3 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>
              12 Key Irregulars
            </h3>
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ color: '#DC2626', fontWeight: 600 }}>● Totally irreg.</span>
              <span style={{ color: '#D97706', fontWeight: 600 }}>● Stem-change</span>
              <span style={{ color: '#7B61FF', fontWeight: 600 }}>● Orthographic</span>
            </div>
            <IrregularGrid irregulars={tense.irregulars} />
          </div>

          {/* Mineiro in Practice */}
          <div
            className="card"
            style={{ background: '#FFFBEB', borderLeft: '4px solid #F5C518', borderRadius: '0 24px 24px 0', paddingLeft: '16px' }}
          >
            <div className="section-label" style={{ color: '#D97706' }}>
              {tense.mineiroPractice.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {tense.mineiroPractice.examples.map((ex, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="pt-word" style={{ color: '#1A1A2E', fontWeight: 600 }}>{ex.form}</span>
                    <SpeakButton text={ex.form} size="sm" />
                  </div>
                  <span style={{ color: '#9CA3AF', fontSize: '13px' }}>= {ex.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key 20 Irregulars collapsible */}
          <KeyIrregularsPanel open={showIrregulars} onToggle={() => setShowIrregulars(v => !v)} />
        </div>
      )}
    </div>
  );
}
