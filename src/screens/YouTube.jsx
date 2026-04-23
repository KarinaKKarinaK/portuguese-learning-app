import { useState } from 'react';
import { YOUTUBE_CHANNELS, YOUTUBE_TIPS } from '../data/youtube';

const DIFFICULTY_BADGE = {
  'Beginner': 'badge-green',
  'Beginner-Intermediate': 'badge-green',
  'Intermediate': 'badge-yellow',
  'Intermediate-Advanced': 'badge-yellow',
  'Advanced': 'badge-red',
};

function ChannelInitial({ name }) {
  const colors = [
    { bg: '#EDE9FF', color: '#7B61FF' },
    { bg: '#DCFCE7', color: '#16A34A' },
    { bg: '#FFFBEB', color: '#D97706' },
    { bg: '#FEE2E2', color: '#DC2626' },
    { bg: '#F0EDFF', color: '#7B61FF' },
  ];
  const c = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        background: c.bg,
        color: c.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: '18px',
        flexShrink: 0,
      }}
    >
      {name[0]}
    </div>
  );
}

export default function YouTube() {
  const [openTips, setOpenTips] = useState(new Set());

  const toggleTip = (idx) => {
    setOpenTips(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '20px' }}>
      <div>
        <h2 style={{ color: '#1A1A2E', fontWeight: 800, fontSize: '24px', marginBottom: '4px' }}>YouTube</h2>
        <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
          Curated channels for Brazilian Portuguese immersion
        </p>
      </div>

      {YOUTUBE_CHANNELS.map((section, sIdx) => (
        <div key={sIdx}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <h3 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '16px' }}>
              {section.category}
            </h3>
            <div style={{ flex: 1, height: '1px', background: '#EBEBF0' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {section.channels.map((ch, cIdx) => (
              <a
                key={cIdx}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ textDecoration: 'none', display: 'block', transition: 'box-shadow 0.15s' }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)'}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <ChannelInitial name={ch.name} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '15px' }}>{ch.name}</span>
                      <span className={DIFFICULTY_BADGE[ch.difficulty] || 'badge-yellow'}>
                        {ch.difficulty}
                      </span>
                    </div>
                    <p style={{ color: '#6B7280', fontSize: '13px', marginBottom: '8px', lineHeight: 1.6 }}>
                      {ch.description}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Use for: {ch.useCase}</span>
                      <span style={{ color: '#7B61FF', fontSize: '12px', fontWeight: 600 }}>Open →</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}

      {/* Tips */}
      <div>
        <h3 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '16px', marginBottom: '14px' }}>
          How to Use YouTube for Language Learning
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {YOUTUBE_TIPS.map((tip, i) => (
            <div
              key={i}
              className="card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <button
                onClick={() => toggleTip(i)}
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
                <span style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '14px', textAlign: 'left' }}>{tip.title}</span>
                <span style={{ color: '#7B61FF', fontWeight: 700, marginLeft: '8px' }}>{openTips.has(i) ? '▲' : '▼'}</span>
              </button>
              {openTips.has(i) && (
                <div style={{ borderTop: '1px solid #EBEBF0', padding: '16px 20px' }}>
                  <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.8 }}>{tip.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
