import { useState } from 'react';
import { SLANG, CUTOFFS, PRONUNCIATION_RULES, ES_PT_DIFFERENCES, FALSE_FRIENDS, GRAMMAR_GAPS } from '../data/mineires';
import SpeakButton from '../components/SpeakButton';

const SUB_TABS = [
  { id: 'slang', label: 'Slang & Cutoffs' },
  { id: 'pronunciation', label: 'Pronunciation' },
  { id: 'spanish', label: 'Spanish → PT' },
];

const REGISTER_BADGE = {
  'Core Mineiro': 'badge-purple',
  'Casual': 'badge-green',
  'Cutoff': 'badge-yellow',
  'Diminutive': 'badge-purple',
};

function SlangSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '15px' }}>
        Slang Expressions
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {SLANG.map(item => (
          <div key={item.id} className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="pt-word" style={{ fontSize: '18px', color: '#1A1A2E', fontWeight: 700 }}>{item.word}</span>
              <SpeakButton text={item.word} size="sm" />
              <span className={REGISTER_BADGE[item.register] || 'badge-purple'}>{item.register}</span>
            </div>
            <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '6px' }}>{item.meaning}</p>
            <p className="pt-word" style={{ color: '#9CA3AF', fontSize: '12px', fontStyle: 'italic' }}>
              "{item.example}"
            </p>
          </div>
        ))}
      </div>

      <h3 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '15px', marginTop: '8px' }}>
        Word Cutoffs
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {CUTOFFS.map((cut, i) => (
          <div key={i} className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="pt-word" style={{ color: '#9CA3AF', fontSize: '15px', textDecoration: 'line-through' }}>
                {cut.full}
              </span>
              <span style={{ color: '#EBEBF0', fontWeight: 700, fontSize: '18px' }}>→</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pt-word" style={{ color: '#7B61FF', fontSize: '17px', fontWeight: 700 }}>{cut.reduced}</span>
                <SpeakButton text={cut.reduced} size="sm" />
              </div>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '12px' }}>{cut.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PronunciationSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {PRONUNCIATION_RULES.map(rule => (
        <div key={rule.id} className="card" style={{ padding: '18px' }}>
          <h4 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>{rule.title}</h4>
          <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '10px' }}>{rule.rule}</p>
          <div
            style={{
              background: '#F0EDFF',
              borderRadius: '12px',
              padding: '10px 14px',
              marginBottom: '10px',
            }}
          >
            <span style={{ color: '#7B61FF', fontSize: '12px', fontFamily: 'monospace', fontWeight: 700 }}>IPA: </span>
            <span style={{ color: '#1A1A2E', fontSize: '13px', fontFamily: 'monospace' }}>{rule.ipaApprox}</span>
          </div>
          <p style={{ color: '#9CA3AF', fontSize: '13px', fontStyle: 'italic', marginBottom: '12px' }}>
            🇪🇸 {rule.spanishComparison}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {rule.examples.map(ex => (
              <div
                key={ex.word}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#DCFCE7',
                  borderRadius: '12px',
                  padding: '8px 12px',
                }}
              >
                <div>
                  <span className="pt-word" style={{ color: '#1A1A2E', fontWeight: 600, fontSize: '14px' }}>{ex.word}</span>
                  <span style={{ color: '#16A34A', fontSize: '12px', marginLeft: '6px' }}>→ [{ex.phonetic}]</span>
                </div>
                <SpeakButton text={ex.word} size="sm" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SpanishSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '15px' }}>
        Structural Differences (ES vs PT)
      </h3>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {ES_PT_DIFFERENCES.map((diff, i) => (
          <div
            key={diff.id}
            style={{
              background: i % 2 === 0 ? '#FAFAFA' : 'white',
              borderBottom: i < ES_PT_DIFFERENCES.length - 1 ? '1px solid #EBEBF0' : 'none',
              padding: '14px 18px',
            }}
          >
            <div style={{ color: '#7B61FF', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>{diff.topic}</div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <div>
                <span style={{ color: '#9CA3AF', fontSize: '11px' }}>🇪🇸 ES: </span>
                <span className="pt-word" style={{ color: '#6B7280', fontSize: '13px' }}>{diff.spanish}</span>
              </div>
              <div>
                <span style={{ color: '#9CA3AF', fontSize: '11px' }}>🇧🇷 PT: </span>
                <span className="pt-word" style={{ color: '#1A1A2E', fontSize: '13px', fontWeight: 600 }}>{diff.portuguese}</span>
              </div>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '12px' }}>{diff.notes}</p>
          </div>
        ))}
      </div>

      <h3 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '15px' }}>False Friends</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {FALSE_FRIENDS.map((ff, i) => (
          <div
            key={i}
            className="card"
            style={{ background: '#FFF5F5', border: '1.5px solid #FECACA', padding: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="pt-word" style={{ color: '#DC2626', fontWeight: 700, fontSize: '18px' }}>{ff.word}</span>
              <span className="badge-red">False Friend</span>
            </div>
            <div style={{ fontSize: '13px', marginBottom: '4px' }}>
              <span style={{ color: '#9CA3AF' }}>🇪🇸 ES: </span>
              <span style={{ color: '#6B7280' }}>{ff.esMeaning}</span>
            </div>
            <div style={{ fontSize: '13px', marginBottom: '10px' }}>
              <span style={{ color: '#9CA3AF' }}>🇧🇷 PT: </span>
              <span style={{ color: '#1A1A2E', fontWeight: 600 }}>{ff.ptMeaning}</span>
            </div>
            <p style={{ color: '#DC2626', fontSize: '12px', fontStyle: 'italic' }}>⚠️ {ff.warning}</p>
          </div>
        ))}
      </div>

      <h3 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '15px' }}>Grammar Gaps</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {GRAMMAR_GAPS.map(gap => (
          <div key={gap.id} className="card" style={{ padding: '16px' }}>
            <h4 style={{ color: '#7B61FF', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{gap.title}</h4>
            <p style={{ color: '#6B7280', fontSize: '13px', marginBottom: '12px', lineHeight: 1.7 }}>{gap.explanation}</p>
            {gap.examples.map((ex, j) => (
              <div
                key={j}
                style={{
                  background: '#FAFAFA',
                  border: '1px solid #EBEBF0',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  marginBottom: '8px',
                }}
              >
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '4px' }}>
                  <div>
                    <span style={{ color: '#9CA3AF', fontSize: '11px' }}>🇪🇸 </span>
                    <span className="pt-word" style={{ color: '#6B7280', fontSize: '13px' }}>{ex.es}</span>
                  </div>
                  <div>
                    <span style={{ color: '#9CA3AF', fontSize: '11px' }}>🇧🇷 </span>
                    <span className="pt-word" style={{ color: '#1A1A2E', fontSize: '13px', fontWeight: 600 }}>{ex.pt}</span>
                  </div>
                </div>
                <p style={{ color: '#9CA3AF', fontSize: '12px' }}>{ex.note}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Mineires() {
  const [activeTab, setActiveTab] = useState('slang');

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
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {SUB_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flexShrink: 0,
                padding: '8px 18px',
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

      {activeTab === 'slang' && <SlangSection />}
      {activeTab === 'pronunciation' && <PronunciationSection />}
      {activeTab === 'spanish' && <SpanishSection />}
    </div>
  );
}
