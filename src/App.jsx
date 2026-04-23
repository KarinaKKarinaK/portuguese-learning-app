import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import Dashboard from './screens/Dashboard';
import Grammar from './screens/Grammar';
import Vocabulary from './screens/Vocabulary';
import Mineires from './screens/Mineires';
import Flashcards from './screens/Flashcards';
import Content from './screens/Content';
import Quiz from './screens/Quiz';
import YouTube from './screens/YouTube';
import { useStreak } from './hooks/useStreak';
import { useXP } from './hooks/useXP';
import { useQuizHistory } from './hooks/useQuizHistory';
import { useFlashcards } from './hooks/useFlashcards';

export default function App() {
  const { streakData, recordActivity } = useStreak();
  const { xpData, getWeeklyData, getDailyXP } = useXP();
  const { history } = useQuizHistory();
  const { getAllCards } = useFlashcards();

  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    recordActivity();
    setWeeklyData(getWeeklyData());
  }, []);

  const dailyXP = getDailyXP();

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#FAF7F2' }}>
        <TopNav xp={xpData?.totalXP || 0} streak={streakData?.currentStreak || 0} />
        <main style={{ maxWidth: '480px', margin: '0 auto', padding: '16px', paddingBottom: '90px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <Dashboard
                streakData={streakData}
                xpData={{ ...xpData, dailyXP }}
                weeklyData={weeklyData.length ? weeklyData : Array(7).fill({ date: '', xp: 0 })}
                quizHistory={history}
                deckCards={getAllCards()}
              />
            } />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/mineires" element={<Mineires />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/content" element={<Content />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/youtube" element={<YouTube />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
