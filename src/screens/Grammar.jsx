import { useState } from 'react';
import { TENSES, KEY_IRREGULARS } from '../data/grammar';
import SpeakButton from '../components/SpeakButton';

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

  const tense = TENSES.find(t => t.id === activeTab);

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
          {TENSES.map(t => (
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
                background: activeTab === t.id ? '#7B61FF' : '#FFFFFF',
                color: activeTab === t.id ? 'white' : '#6B7280',
                boxShadow: activeTab === t.id ? '0 2px 12px rgba(123,97,255,0.3)' : '0 1px 4px rgba(0,0,0,0.06)',
                transition: 'all 0.15s',
              }}
              type="button"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

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
