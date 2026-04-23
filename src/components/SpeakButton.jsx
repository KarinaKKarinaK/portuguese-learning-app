import { speak, isSpeechSupported } from '../utils/speech';

export default function SpeakButton({ text, size = 'md', className = '' }) {
  if (!isSpeechSupported()) return null;

  const sizes = {
    sm: 28,
    md: 32,
    lg: 40,
  };
  const btnSize = sizes[size] || sizes.md;
  const iconSize = Math.round(btnSize * 0.45);

  return (
    <button
      onClick={(e) => { e.stopPropagation(); speak(text); }}
      className={className}
      style={{
        width: `${btnSize}px`,
        height: `${btnSize}px`,
        borderRadius: '50%',
        background: '#EDE9FF',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'opacity 0.15s',
      }}
      title={`Listen: ${text}`}
      type="button"
      onMouseOver={e => e.currentTarget.style.opacity = '0.75'}
      onMouseOut={e => e.currentTarget.style.opacity = '1'}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="#7B61FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      </svg>
    </button>
  );
}
