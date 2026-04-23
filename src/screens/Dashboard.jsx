import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StreakBar from '../components/StreakBar';
import XPBar from '../components/XPBar';
import WeeklyHeatmap from '../components/WeeklyHeatmap';
import SpeakButton from '../components/SpeakButton';

const DAILY_EXPRESSIONS = [
  { pt: 'Uai, que trem bao!', en: 'Wow, what a great thing!', notes: 'Classic Mineiro exclamation' },
  { pt: 'Ta bom demais, so!', en: 'It\'s really great, man!', notes: 'Very common BH affirmation' },
  { pt: 'Ja ja eu chego.', en: 'I\'ll be there in a bit.', notes: '"Ja ja" = very soon' },
  { pt: 'Pode contar comigo.', en: 'You can count on me.', notes: 'Reliable Mineiro promise' },
  { pt: 'Firmeza! Vamo nessa.', en: 'Solid! Let\'s do this.', notes: 'Motivating combo' },
  { pt: 'Num sei nao, so.', en: 'I really don\'t know, man.', notes: '"Num" = Mineiro "nao"' },
  { pt: 'Bora tomar um cafezinho?', en: 'Shall we get a coffee?', notes: 'Quintessential BH invitation' },
  { pt: 'Ce ta afim?', en: 'Are you up for it?', notes: '"Ce" = voce, "afim" = in the mood' },
  { pt: 'Que saudade, so!', en: 'I miss it so much!', notes: 'Saudade - uniquely Portuguese feeling' },
  { pt: 'Mio assim, obrigado.', en: 'Better like this, thanks.', notes: '"Mio" = melhor (better) in Mineiro' },
  { pt: 'A gente vai resolver isso.', en: 'We\'ll sort this out.', notes: '"A gente" = informal "we"' },
  { pt: 'Deixa de besteira, uai!', en: 'Stop being silly!', notes: 'Friendly dismissal' },
  { pt: 'To dentro, pode falar.', en: 'I\'m in, go ahead.', notes: '"To" = estou reduced' },
  { pt: 'Demais, pacas!', en: 'So much, a ton!', notes: 'Intensifiers used together' },
  { pt: 'Vai la, ce consegue.', en: 'Go for it, you can do it.', notes: 'Encouragement, BH style' },
  { pt: 'Faz tempo que num te via!', en: 'Long time no see!', notes: 'Classic Mineiro greeting' },
  { pt: 'Trem bom demais aqui!', en: 'Such a great thing here!', notes: '"Trem" = universal Mineiro noun' },
  { pt: 'Ce vem sempre aqui?', en: 'Do you come here often?', notes: 'Classic opener, Mineiro style' },
  { pt: 'Qual e sua graça?', en: 'What\'s your name? (informal)', notes: 'Old-fashioned but heard' },
  { pt: 'Fica a vontade, so!', en: 'Make yourself at home!', notes: 'Mineiro hospitality' },
  { pt: 'Vamo nessa! Ta na hora.', en: 'Let\'s go! It\'s time.', notes: '"Vamo" = vamos reduced' },
  { pt: 'Com certeza, pode contar.', en: 'Definitely, count on it.', notes: 'Strong affirmation' },
  { pt: 'Ta ligado no que to falando?', en: 'You know what I\'m saying?', notes: '"Ta ligado?" = casual check-in' },
  { pt: 'E bao demais, sô!', en: 'It\'s super good, man!', notes: 'Maximum Mineiro enthusiasm' },
  { pt: 'Que tal a gente ir la?', en: 'How about we go there?', notes: '"Que tal" = how about' },
  { pt: 'Isso ai, pode deixar.', en: 'Got it, leave it to me.', notes: 'Reliable Brazilian phrase' },
  { pt: 'Bao ou ruim?', en: 'Good or bad?', notes: '"Bao" = good, Mineiro style' },
  { pt: 'To com saudade de la.', en: 'I miss that place.', notes: 'Using saudade naturally' },
  { pt: 'Que trem maneiro, uai!', en: 'What a cool thing, wow!', notes: 'Pure BH enthusiasm' },
  { pt: 'Bacana demais essa ideia.', en: 'Really cool idea.', notes: '"Bacana" = nice/cool' },
];

const QUICK_TILES = [
  { to: '/grammar', icon: '📖', label: 'Grammar', desc: 'Verb tenses & conjugations' },
  { to: '/vocabulary', icon: '📝', label: 'Vocabulary', desc: '210 words with examples' },
  { to: '/mineires', icon: '🗣️', label: 'Mineirês', desc: 'Slang, pronunciation & more' },
  { to: '/flashcards', icon: '🃏', label: 'Flashcards', desc: 'Spaced repetition review' },
  { to: '/content', icon: '💬', label: 'Content', desc: 'Dialogues & reading texts' },
  { to: '/quiz', icon: '❓', label: 'Quiz', desc: 'Test your knowledge' },
];

export default function Dashboard({ streakData, xpData, weeklyData, quizHistory, deckCards, onNavigate }) {
  const navigate = useNavigate();

  const dailyExpression = useMemo(() => {
    const idx = Math.floor(Date.now() / 86400000) % 30;
    return DAILY_EXPRESSIONS[idx];
  }, []);

  const dailyMission = useMemo(() => {
    if (!quizHistory || quizHistory.length === 0) {
      return { category: 'Grammar', action: 'Study verb conjugations', to: '/grammar' };
    }
    const last = quizHistory[0];
    const bd = last.categoryBreakdown || {};
    let worst = 'grammar';
    let worstRate = 1;
    Object.entries(bd).forEach(([cat, d]) => {
      const rate = d.total > 0 ? d.correct / d.total : 1;
      if (rate < worstRate) { worstRate = rate; worst = cat; }
    });
    const map = {
      grammar: { category: 'Grammar', action: 'Review verb tenses', to: '/grammar' },
      vocabulary: { category: 'Vocabulary', action: 'Learn new words', to: '/vocabulary' },
      slang: { category: 'Mineirês', action: 'Practice slang expressions', to: '/mineires' },
      pronunciation: { category: 'Pronunciation', action: 'Practice sounds', to: '/mineires' },
      false_friends: { category: 'False Friends', action: 'Review false friends', to: '/mineires' },
    };
    return map[worst] || map.grammar;
  }, [quizHistory]);

  const lastWrongCards = useMemo(() => {
    if (!quizHistory || !quizHistory.length) return [];
    const wrongIds = quizHistory[0].wrongAnswers || [];
    return wrongIds.slice(0, 3);
  }, [quizHistory]);

  const dailyXP = xpData?.lastXPDate === new Date().toISOString().split('T')[0] ? xpData.dailyXP : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ paddingTop: '8px' }}>
        <p style={{ color: '#9CA3AF', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>Olá! 👋</p>
        <h1 style={{ color: '#1A1A2E', fontSize: '28px', fontWeight: 800, lineHeight: 1.2, marginBottom: '12px' }}>
          Aprenda Português
        </h1>
        <StreakBar streak={streakData?.currentStreak || 0} />
      </div>

      {/* Daily Expression card */}
      <div
        className="card"
        style={{ borderLeft: '4px solid #7B61FF', borderRadius: '0 24px 24px 0', paddingLeft: '16px' }}
      >
        <div className="section-label">Expressão do Dia</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span className="pt-word" style={{ fontSize: '20px', fontWeight: 700, color: '#1A1A2E' }}>
            {dailyExpression.pt}
          </span>
          <SpeakButton text={dailyExpression.pt} size="md" />
        </div>
        <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '4px' }}>{dailyExpression.en}</p>
        <p style={{ color: '#9CA3AF', fontSize: '12px', fontStyle: 'italic' }}>{dailyExpression.notes}</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <div style={{ color: '#7B61FF', fontSize: '32px', fontWeight: 800, lineHeight: 1 }}>{dailyXP}</div>
          <div style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '4px', marginBottom: '8px' }}>XP Today</div>
          <div style={{ height: '6px', background: '#F0EDFF', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${Math.min(100, (dailyXP / 200) * 100)}%`,
              background: '#7B61FF',
              borderRadius: '999px',
            }} />
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1, color: '#1A1A2E' }}>
            {streakData?.currentStreak || 0}
          </div>
          <div style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '4px' }}>🔥 day streak</div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="card">
        <WeeklyHeatmap weeklyData={weeklyData} />
      </div>

      {/* Daily Mission */}
      <div
        className="card"
        onClick={() => navigate(dailyMission.to)}
        style={{
          cursor: 'pointer',
          background: '#F0EDFF',
          borderLeft: '4px solid #7B61FF',
          borderRadius: '0 24px 24px 0',
          paddingLeft: '16px',
          transition: 'opacity 0.15s',
        }}
        onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
        onMouseOut={e => e.currentTarget.style.opacity = '1'}
      >
        <div className="section-label" style={{ color: '#7B61FF' }}>Daily Mission</div>
        <div style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>
          {dailyMission.category}
        </div>
        <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>{dailyMission.action}</div>
        <div style={{ color: '#7B61FF', fontSize: '13px', fontWeight: 600 }}>Start mission →</div>
      </div>

      {/* Weak spots */}
      {lastWrongCards.length > 0 && (
        <div>
          <h3 style={{ color: '#1A1A2E', fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>
            Review from last quiz
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {lastWrongCards.map((id) => (
              <div key={id} className="card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#EF4444', fontSize: '12px', fontFamily: 'monospace', fontWeight: 600 }}>Q#{id}</span>
                <span style={{ color: '#6B7280', fontSize: '13px' }}>Review in Quiz →</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Access */}
      <div>
        <h3 style={{ color: '#1A1A2E', fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>Quick Access</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {QUICK_TILES.map(tile => (
            <button
              key={tile.to}
              onClick={() => navigate(tile.to)}
              className="card"
              style={{
                textAlign: 'left',
                cursor: 'pointer',
                border: 'none',
                padding: '16px',
                transition: 'box-shadow 0.15s',
              }}
              type="button"
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)'}
              onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)'}
            >
              <span style={{ fontSize: '22px', display: 'block', marginBottom: '8px' }}>{tile.icon}</span>
              <div style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '14px', marginBottom: '2px' }}>{tile.label}</div>
              <div style={{ color: '#9CA3AF', fontSize: '12px' }}>{tile.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
