export default function ConfidenceButtons({ onRate }) {
  const buttons = [
    { confidence: 1, label: 'Again', sublabel: '1 day', bg: '#EF4444', color: 'white' },
    { confidence: 2, label: 'Good', sublabel: '3 days', bg: '#F5C518', color: '#1A1A2E' },
    { confidence: 3, label: 'Easy', sublabel: '7 days', bg: '#22C55E', color: 'white' },
  ];

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {buttons.map(btn => (
        <button
          key={btn.confidence}
          onClick={() => onRate(btn.confidence)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '52px',
            borderRadius: '999px',
            background: btn.bg,
            border: 'none',
            cursor: 'pointer',
            gap: '2px',
            transition: 'opacity 0.15s',
          }}
          type="button"
          onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          <span style={{ color: btn.color, fontWeight: 700, fontSize: '14px' }}>{btn.label}</span>
          <span style={{ color: btn.color, fontSize: '10px', opacity: 0.8 }}>{btn.sublabel}</span>
        </button>
      ))}
    </div>
  );
}
