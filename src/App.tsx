import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DaoLayout from '@/components/layout/DaoLayout';
import HistoryLayout from '@/components/layout/HistoryLayout';
import SubjectsPage from '@/pages/SubjectsPage';
import HomePage from '@/pages/HomePage';
import UnitPage from '@/pages/UnitPage';
import ChapterPage from '@/pages/ChapterPage';
import SectionPage from '@/pages/SectionPage';
import MindMapPage from '@/pages/MindMapPage';
import ExercisesPage from '@/pages/ExercisesPage';
import MockExamPage from '@/pages/MockExamPage';
import SummaryPage from '@/pages/SummaryPage';
import WrongBookPage from '@/pages/WrongBookPage';
import DaoMindMapPage from '@/pages/DaoMindMapPage';
import DaoSummaryPage from '@/pages/DaoSummaryPage';
import HistoryMindMapPage from '@/pages/HistoryMindMapPage';
import HistorySummaryPage from '@/pages/HistorySummaryPage';
import LoginPage from '@/pages/LoginPage';
import { ThemeProvider } from '@/hooks/useTheme';

// 路由守卫组件
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          {/* 登录页面 */}
          <Route path="/login" element={<LoginPage />} />

          {/* 多学科首页：全宽无侧边栏 */}
          <Route path="/" element={
            <PrivateRoute>
              <SubjectsPage />
            </PrivateRoute>
          } />

          {/* 生物学科内页：带侧边栏布局 */}
          <Route element={<Layout />}>
            <Route path="/biology" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/unit/:unitId" element={<PrivateRoute><UnitPage /></PrivateRoute>} />
            <Route path="/unit/:unitId/:chapterId" element={<PrivateRoute><ChapterPage /></PrivateRoute>} />
            <Route path="/section/:sectionId" element={<PrivateRoute><SectionPage /></PrivateRoute>} />
            <Route path="/mindmap" element={<PrivateRoute><MindMapPage /></PrivateRoute>} />
            <Route path="/mindmap/:unitId" element={<PrivateRoute><MindMapPage /></PrivateRoute>} />
            <Route path="/exercises" element={<PrivateRoute><ExercisesPage /></PrivateRoute>} />
            <Route path="/exercises/:unitId" element={<PrivateRoute><ExercisesPage /></PrivateRoute>} />
            <Route path="/mock-exam" element={<PrivateRoute><MockExamPage /></PrivateRoute>} />
            <Route path="/summary" element={<PrivateRoute><SummaryPage /></PrivateRoute>} />
            <Route path="/wrong-book" element={<PrivateRoute><WrongBookPage /></PrivateRoute>} />
          </Route>

          {/* 道法学科内页：带侧边栏布局 */}
          <Route element={<DaoLayout />}>
            <Route path="/dao/mindmap" element={<PrivateRoute><DaoMindMapPage /></PrivateRoute>} />
            <Route path="/dao/mindmap/:unitId" element={<PrivateRoute><DaoMindMapPage /></PrivateRoute>} />
            <Route path="/dao/summary" element={<PrivateRoute><DaoSummaryPage /></PrivateRoute>} />
            <Route path="/dao/mock-exam" element={<PrivateRoute><MockExamPage /></PrivateRoute>} />
          </Route>

          {/* 历史学科内页：带侧边栏布局 */}
          <Route element={<HistoryLayout />}>
            <Route path="/history/mindmap" element={<PrivateRoute><HistoryMindMapPage /></PrivateRoute>} />
            <Route path="/history/mindmap/:unitId" element={<PrivateRoute><HistoryMindMapPage /></PrivateRoute>} />
            <Route path="/history/summary" element={<PrivateRoute><HistorySummaryPage /></PrivateRoute>} />
            <Route path="/history/mock-exam" element={<PrivateRoute><MockExamPage /></PrivateRoute>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
