export default function StreakBar({ streak }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: '#FFFBEB',
        border: '1.5px solid #FDE68A',
        borderRadius: '999px',
        padding: '6px 14px',
      }}
    >
      <span style={{ fontSize: '18px' }}>🔥</span>
      <span style={{ color: '#D97706', fontWeight: 700, fontSize: '15px' }}>{streak} days</span>
    </div>
  );
}
