const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDotStyle(xp, isToday) {
  const base = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    transition: 'all 0.2s',
    position: 'relative',
  };

  if (xp === 0) {
    return {
      ...base,
      background: 'transparent',
      border: `2px solid ${isToday ? '#7B61FF' : '#EBEBF0'}`,
      boxShadow: isToday ? '0 0 0 3px rgba(123,97,255,0.15)' : 'none',
    };
  }
  if (xp > 100) {
    return {
      ...base,
      background: '#7B61FF',
      border: '2px solid #7B61FF',
      boxShadow: isToday ? '0 0 0 3px rgba(123,97,255,0.25)' : 'none',
    };
  }
  // partial: xp > 0 but ≤ 100 → yellow
  return {
    ...base,
    background: '#F5C518',
    border: '2px solid #F5C518',
    boxShadow: isToday ? '0 0 0 3px rgba(245,197,24,0.25)' : 'none',
  };
}

export default function WeeklyHeatmap({ weeklyData }) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '15px' }}>Week Progress</span>
        <span style={{ color: '#9CA3AF', fontSize: '12px' }}>7-day activity</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
        {weeklyData.map((day, i) => {
          const d = day.date ? new Date(day.date + 'T12:00:00') : new Date();
          const dayLabel = DAYS[d.getDay()];
          const isToday = day.date === today;
          const dotStyle = getDotStyle(day.xp, isToday);

          return (
            <div key={day.date || i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div
                style={dotStyle}
                title={`${day.date || 'no date'}: ${day.xp} XP`}
              >
                {day.xp > 0 && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: day.xp > 100 ? 'white' : '#1A1A2E',
                  }}>
                    {day.xp > 99 ? '★' : ''}
                  </div>
                )}
              </div>
              <span style={{
                fontSize: '10px',
                color: isToday ? '#7B61FF' : '#9CA3AF',
                fontWeight: isToday ? 700 : 400,
              }}>
                {dayLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
