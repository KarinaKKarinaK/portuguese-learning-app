export default function ProgressRing({ value, max, size = 80, strokeWidth = 8, color = '#7B61FF', label }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  const dash = pct * circ;

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="#F0EDFF"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontSize: size > 70 ? '16px' : '12px', fontWeight: 700, color: '#1A1A2E' }}>
          {Math.round(pct * 100)}%
        </div>
        {label && <div style={{ fontSize: '10px', color: '#9CA3AF' }}>{label}</div>}
      </div>
    </div>
  );
}
