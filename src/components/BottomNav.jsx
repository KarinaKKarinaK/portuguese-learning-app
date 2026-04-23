import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/dashboard', icon: '🏠', label: 'Home' },
  { to: '/grammar', icon: '📖', label: 'Grammar' },
  { to: '/vocabulary', icon: '📝', label: 'Vocab' },
  { to: '/mineires', icon: '🗣️', label: 'MG' },
  { to: '/flashcards', icon: '🃏', label: 'Cards' },
  { to: '/content', icon: '💬', label: 'Content' },
  { to: '/quiz', icon: '❓', label: 'Quiz' },
  { to: '/youtube', icon: '▶️', label: 'YT' },
];

export default function BottomNav() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: 'calc(100% - 32px)',
        maxWidth: '480px',
      }}
    >
      <nav
        style={{
          background: '#1A1A2E',
          borderRadius: '999px',
          padding: '8px 12px',
          display: 'flex',
          gap: '4px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        }}
      >
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            style={{ textDecoration: 'none', flex: '1', minWidth: '44px' }}
          >
            {({ isActive }) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '44px',
                  borderRadius: '999px',
                  background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  transition: 'background 0.15s',
                  gap: '1px',
                  padding: '4px 2px',
                }}
              >
                <span style={{ fontSize: '16px', lineHeight: 1 }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#ffffff' : '#6B7280',
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
