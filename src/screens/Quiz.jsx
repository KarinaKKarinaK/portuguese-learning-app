import { useState, useCallback, useEffect, useRef } from 'react';
import { QUIZ_POOL } from '../data/quizPool';
import { useQuizHistory } from '../hooks/useQuizHistory';
import { useFlashcards } from '../hooks/useFlashcards';
import { useXP } from '../hooks/useXP';

const TOTAL_QUESTIONS = 17;

function selectQuestions(history) {
  const pool = [...QUIZ_POOL];
  const weakCategories = [];

  if (history.length > 0) {
    const last = history[0];
    const bd = last.categoryBreakdown || {};
    Object.entries(bd).forEach(([cat, d]) => {
      if (d.total > 0 && d.correct / d.total < 0.6) weakCategories.push(cat);
    });
  }

  const lastWrong = history.length > 0 ? (history[0].wrongAnswers || []) : [];
  const wrongQuestions = pool.filter(q => lastWrong.includes(q.id)).slice(0, 3);
  const weakPool = pool.filter(q => weakCategories.includes(q.category) && !lastWrong.includes(q.id));
  const rest = pool.filter(q => !weakCategories.includes(q.category) && !lastWrong.includes(q.id));

  const selected = [...wrongQuestions];
  const needed = TOTAL_QUESTIONS - selected.length;

  const weakCount = Math.min(Math.ceil(needed * 0.4), weakPool.length);
  const shuffledWeak = weakPool.sort(() => Math.random() - 0.5).slice(0, weakCount);
  selected.push(...shuffledWeak);

  const remaining = TOTAL_QUESTIONS - selected.length;
  const shuffledRest = rest.sort(() => Math.random() - 0.5).slice(0, remaining);
  selected.push(...shuffledRest);

  return selected.sort(() => Math.random() - 0.5);
}

function QuestionDisplay({ question, onAnswer, timeElapsed }) {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = (optIdx) => {
    if (confirmed) return;
    setSelected(optIdx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    const isCorrect = selected === question.correct;
    setTimeout(() => {
      onAnswer(isCorrect, question.id, selected);
      setSelected(null);
      setConfirmed(false);
    }, 1200);
  };

  const isTrueFalse = question.type === 'true_false';
  const options = isTrueFalse ? ['True', 'False'] : question.options;
  const correctIdx = isTrueFalse
    ? (question.correct === 'true' ? 0 : 1)
    : question.correct;

  const timerStr = `${Math.floor(timeElapsed / 60).toString().padStart(2, '0')}:${(timeElapsed % 60).toString().padStart(2, '0')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="badge-purple">{question.category}</span>
        <span
          style={{
            background: '#F3F4F6',
            color: '#6B7280',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '13px',
            fontFamily: 'monospace',
            fontWeight: 600,
          }}
        >
          ⏱ {timerStr}
        </span>
      </div>

      <div
        className="card"
        style={{ background: '#FFFFFF', padding: '20px' }}
      >
        <p style={{ color: '#1A1A2E', fontSize: '17px', lineHeight: 1.6, fontWeight: 500 }}>{question.question}</p>
      </div>

      <p style={{ color: '#9CA3AF', fontSize: '13px', fontWeight: 500, textAlign: 'center' }}>
        Choose the correct answer
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {options.map((opt, i) => {
          let bg = '#FFFFFF';
          let border = '#EBEBF0';
          let color = '#1A1A2E';

          if (confirmed) {
            if (i === correctIdx) { bg = '#DCFCE7'; border = '#22C55E'; color = '#16A34A'; }
            else if (i === selected) { bg = '#FEE2E2'; border = '#EF4444'; color = '#DC2626'; }
          } else if (i === selected) {
            bg = '#F0EDFF';
            border = '#7B61FF';
            color = '#7B61FF';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                background: bg,
                border: `2px solid ${border}`,
                borderRadius: '16px',
                padding: '14px 12px',
                color,
                fontSize: '14px',
                fontWeight: i === selected || (confirmed && i === correctIdx) ? 700 : 500,
                minHeight: '56px',
                cursor: confirmed ? 'default' : 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              type="button"
            >
              {opt}
            </button>
          );
        })}
      </div>

      {!confirmed && (
        <button
          onClick={handleConfirm}
          disabled={selected === null}
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '15px',
            border: 'none',
            cursor: selected !== null ? 'pointer' : 'not-allowed',
            background: selected !== null ? '#1A1A2E' : '#F3F4F6',
            color: selected !== null ? 'white' : '#9CA3AF',
            transition: 'all 0.15s',
          }}
          type="button"
        >
          Confirm Answer
        </button>
      )}
    </div>
  );
}

function Feedback({ isCorrect, question, onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        className="card"
        style={{
          background: isCorrect ? '#DCFCE7' : '#FEE2E2',
          border: `1.5px solid ${isCorrect ? '#22C55E' : '#EF4444'}`,
          padding: '20px',
        }}
      >
        <div style={{ color: isCorrect ? '#16A34A' : '#DC2626', fontWeight: 800, fontSize: '18px', marginBottom: '10px' }}>
          {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
        </div>
        {!isCorrect && (
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#9CA3AF', fontSize: '13px' }}>Correct answer: </span>
            <span style={{ color: '#16A34A', fontWeight: 700, fontSize: '14px' }}>
              {question.type === 'true_false'
                ? (question.correct === 'true' ? 'True' : 'False')
                : question.options?.[question.correct]
              }
            </span>
          </div>
        )}
        <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.7, marginBottom: question.mnemonic ? '10px' : '0' }}>
          {question.explanation}
        </p>
        {question.mnemonic && (
          <p style={{ color: '#D97706', fontSize: '13px', fontStyle: 'italic', background: '#FFFBEB', padding: '8px 12px', borderRadius: '8px' }}>
            💡 {question.mnemonic}
          </p>
        )}
      </div>

      <button
        onClick={onNext}
        style={{
          width: '100%',
          height: '52px',
          borderRadius: '999px',
          fontWeight: 700,
          fontSize: '15px',
          border: 'none',
          cursor: 'pointer',
          background: '#1A1A2E',
          color: 'white',
        }}
        type="button"
      >
        Next →
      </button>
    </div>
  );
}

export default function Quiz() {
  const { history, saveSession } = useQuizHistory();
  const { addCard } = useFlashcards();
  const { addXP } = useXP();

  const [phase, setPhase] = useState('intro');
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState([]);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (phase === 'question') {
      timerRef.current = setInterval(() => setTimeElapsed(t => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase, currentIdx]);

  const startQuiz = () => {
    const selected = selectQuestions(history);
    setQuestions(selected);
    setCurrentIdx(0);
    setResults([]);
    setTimeElapsed(0);
    setPhase('question');
  };

  const handleAnswer = (isCorrect, questionId, selectedIdx) => {
    if (isCorrect) addXP(10);
    const result = { questionId, isCorrect, selectedIdx };
    setLastAnswer(result);
    setResults(prev => [...prev, result]);
    clearInterval(timerRef.current);
    setPhase('feedback');
  };

  const handleNext = () => {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= questions.length) {
      finishQuiz();
    } else {
      setCurrentIdx(nextIdx);
      setTimeElapsed(0);
      setPhase('question');
    }
  };

  const finishQuiz = () => {
    const allResults = [...results, lastAnswer].filter(Boolean);
    const score = allResults.filter(r => r.isCorrect).length;
    const wrongIds = allResults.filter(r => !r.isCorrect).map(r => r.questionId);

    const breakdown = {};
    questions.forEach((q, i) => {
      const cat = q.category;
      if (!breakdown[cat]) breakdown[cat] = { correct: 0, total: 0 };
      breakdown[cat].total++;
      if (allResults[i]?.isCorrect) breakdown[cat].correct++;
    });

    const session = { score, total: questions.length, categoryBreakdown: breakdown, wrongAnswers: wrongIds };
    saveSession(session);
    addXP(20);
    setPhase('results');
  };

  const weakCategories = (() => {
    if (!history.length) return [];
    const last = history[0];
    const bd = last.categoryBreakdown || {};
    return Object.entries(bd)
      .filter(([, d]) => d.total > 0 && d.correct / d.total < 0.6)
      .map(([cat]) => cat);
  })();

  const lastScore = history.length ? history[0] : null;

  if (phase === 'intro') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ color: '#1A1A2E', fontWeight: 800, fontSize: '24px', marginBottom: '4px' }}>Quiz</h2>
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Test your knowledge</p>
        </div>

        {lastScore && (
          <div className="card">
            <div style={{ color: '#9CA3AF', fontSize: '12px', marginBottom: '6px', fontWeight: 600 }}>Last session</div>
            <div style={{ color: '#7B61FF', fontWeight: 800, fontSize: '28px', lineHeight: 1 }}>
              {lastScore.score}/{lastScore.total}
            </div>
            <div style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '4px' }}>
              {new Date(lastScore.date).toLocaleDateString()}
            </div>
          </div>
        )}

        {weakCategories.length > 0 && (
          <div className="card" style={{ border: '1.5px solid #FECACA' }}>
            <div style={{ color: '#DC2626', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Weak areas to improve:</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {weakCategories.map(cat => (
                <span key={cat} className="badge-red">{cat}</span>
              ))}
            </div>
          </div>
        )}

        <div
          className="card"
          style={{ background: '#F0EDFF', border: '1.5px solid #C4B5FD' }}
        >
          <div style={{ color: '#7B61FF', fontWeight: 700, marginBottom: '6px' }}>{TOTAL_QUESTIONS} questions</div>
          <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.7 }}>
            Questions are selected from your weak categories and previous wrong answers.
            Grammar, vocabulary, slang, pronunciation, and false friends.
          </p>
        </div>

        <button
          onClick={startQuiz}
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            background: '#7B61FF',
            color: 'white',
            boxShadow: '0 4px 20px rgba(123,97,255,0.35)',
          }}
          type="button"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (phase === 'results') {
    const allResults = results;
    const score = allResults.filter(r => r.isCorrect).length;
    const wrongOnes = questions.filter((_q, i) => !allResults[i]?.isCorrect);
    const pct = Math.round((score / questions.length) * 100);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: '60px', marginBottom: '12px' }}>
            {pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '💪'}
          </div>
          <h2 style={{ color: '#1A1A2E', fontWeight: 800, fontSize: '28px', marginBottom: '4px' }}>{score}/{questions.length}</h2>
          <p style={{ color: '#9CA3AF', fontSize: '15px' }}>{pct}% correct</p>
        </div>

        {wrongOnes.length > 0 && (
          <div>
            <h3 style={{ color: '#1A1A2E', fontWeight: 700, fontSize: '15px', marginBottom: '12px' }}>
              Wrong answers — Add to deck:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {wrongOnes.map(q => (
                <div key={q.id} className="card" style={{ padding: '14px 16px' }}>
                  <p style={{ color: '#1A1A2E', fontSize: '13px', marginBottom: '6px' }}>{q.question}</p>
                  <p style={{ color: '#16A34A', fontSize: '12px', marginBottom: '10px', fontWeight: 600 }}>
                    ✓ {q.type === 'true_false' ? (q.correct === 'true' ? 'True' : 'False') : q.options?.[q.correct]}
                  </p>
                  <button
                    onClick={() => addCard(q.question, q.options?.[q.correct] || q.correct.toString(), q.explanation)}
                    style={{
                      padding: '5px 14px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      background: '#EDE9FF',
                      color: '#7B61FF',
                    }}
                    type="button"
                  >
                    + Add to deck
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setPhase('intro')}
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '15px',
            border: 'none',
            cursor: 'pointer',
            background: '#1A1A2E',
            color: 'white',
          }}
          type="button"
        >
          Back to Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  return (
    <div>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ color: '#9CA3AF', fontSize: '13px', fontWeight: 500 }}>
          Question {currentIdx + 1} of {questions.length}
        </span>
        <span style={{ color: '#7B61FF', fontWeight: 700, fontSize: '13px' }}>
          {currentIdx + 1}/{questions.length}
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: '6px',
          background: '#F0EDFF',
          borderRadius: '999px',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: `${(currentIdx / questions.length) * 100}%`,
            height: '100%',
            background: '#7B61FF',
            borderRadius: '999px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {phase === 'question' && currentQuestion && (
        <QuestionDisplay
          question={currentQuestion}
          onAnswer={handleAnswer}
          timeElapsed={timeElapsed}
        />
      )}

      {phase === 'feedback' && lastAnswer && (
        <Feedback
          isCorrect={lastAnswer.isCorrect}
          question={currentQuestion}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
