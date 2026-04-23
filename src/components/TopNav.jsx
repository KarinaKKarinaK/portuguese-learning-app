import { NavLink } from 'react-router-dom';
import { Flame, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Home' },
  { to: '/grammar', label: 'Grammar' },
  { to: '/vocabulary', label: 'Vocab' },
  { to: '/mineires', label: 'Mineirês' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/content', label: 'Content' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/youtube', label: 'YouTube' },
];

export default function TopNav({ xp, streak }) {
  return (
    <nav
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #EBEBF0',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'none',
      }}
      className="md-nav"
    >
      <style>{`
        @media (min-width: 641px) {
          .md-nav { display: flex !important; align-items: center; justify-content: space-between; padding: 0 24px; height: 56px; }
        }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#7B61FF', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>PT·BH</span>
        <span style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 500 }}>Português Mineiro</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 500,
              textDecoration: 'none',
              background: isActive ? '#7B61FF' : 'transparent',
              color: isActive ? '#ffffff' : '#6B7280',
              transition: 'all 0.15s',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ color: '#D97706', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Flame size={15} strokeWidth={2} /> {streak}
        </span>
        <span
          style={{
            background: '#EDE9FF',
            color: '#7B61FF',
            fontWeight: 600,
            fontSize: '13px',
            padding: '4px 12px',
            borderRadius: '999px',
          }}
        >
          <Sparkles size={13} strokeWidth={2} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} />{xp} XP
        </span>
      </div>
    </nav>
  );
}
