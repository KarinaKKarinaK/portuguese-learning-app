const DAILY_CAP = 200;

export default function XPBar({ dailyXP, totalXP }) {
  const pct = Math.min(100, Math.round((dailyXP / DAILY_CAP) * 100));

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ color: '#6B7280', fontSize: '12px', fontWeight: 500 }}>Today's XP</span>
        <span style={{ color: '#7B61FF', fontSize: '12px', fontWeight: 700 }}>{dailyXP} / {DAILY_CAP}</span>
      </div>
      <div
        style={{
          width: '100%',
          height: '8px',
          background: '#F0EDFF',
          borderRadius: '999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: '#7B61FF',
            borderRadius: '999px',
            transition: 'width 0.5s ease',
          }}
        />
      </div>
      <div style={{ color: '#9CA3AF', fontSize: '11px', marginTop: '4px' }}>
        Total: {totalXP} XP
      </div>
    </div>
  );
}
