import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Mic, CreditCard, HelpCircle } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', Icon: Home, label: 'Home' },
  { to: '/grammar', Icon: BookOpen, label: 'Grammar' },
  { to: '/flashcards', Icon: CreditCard, label: 'Cards' },
  { to: '/quiz', Icon: HelpCircle, label: 'Quiz' },
  { to: '/mineires', Icon: Mic, label: 'Mineirês' },
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
                <item.Icon
                  size={18}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  style={{
                    color: isActive ? '#ffffff' : '#6B7280',
                    filter: isActive ? 'drop-shadow(0 0 6px #7B61FF)' : 'none',
                    transition: 'color 0.15s, filter 0.15s',
                  }}
                />
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
