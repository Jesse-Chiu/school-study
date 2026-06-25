import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HistorySidebar from './HistorySidebar';

interface HistoryLayoutProps {
  children?: React.ReactNode;
}

export default function HistoryLayout({ children }: HistoryLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      {/* 侧边栏 */}
      {sidebarOpen && (
        <aside className="w-72 border-r border-slate-200 bg-white shrink-0 overflow-y-auto">
          <HistorySidebar onNavigate={() => {}} />
        </aside>
      )}

      {/* 主内容区 */}
      <main className="flex-1 overflow-y-auto">
        {/* 顶部栏 */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
          <div className="text-sm text-slate-500">
            历史七年级下册 · 期末备考系统
          </div>
          <div className="w-10" /> {/* 占位 */}
        </div>

        {/* 页面内容 */}
        <div className="p-6">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}
