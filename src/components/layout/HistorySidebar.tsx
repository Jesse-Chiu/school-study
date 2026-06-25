import { NavLink, useLocation } from 'react-router-dom';

interface HistorySidebarProps {
  onNavigate?: () => void;
}

export default function HistorySidebar({ onNavigate }: HistorySidebarProps) {
  const location = useLocation();
  const isHistoryPath = location.pathname.startsWith('/history');

  if (!isHistoryPath) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 标题区域 */}
      <div className="p-5 border-b border-slate-100 shrink-0">
        <h2 className="text-lg font-bold text-amber-700">📜 历史期末备考</h2>
        <p className="text-xs text-slate-500 mt-1">七年级下册</p>
        <NavLink
          to="/"
          className="text-xs text-slate-400 hover:text-amber-600 mt-2 inline-block transition-colors"
        >
          ← 学科选择
        </NavLink>
      </div>

      {/* 导航区域 */}
      <nav className="flex-1 overflow-y-auto p-3">
        {/* 知识脑图 */}
        <NavLink
          to="/history/mindmap"
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
              isActive
                ? 'bg-amber-50 text-amber-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`
          }
        >
          🧠 知识脑图
        </NavLink>

        {/* 核心归纳 */}
        <NavLink
          to="/history/summary"
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
              isActive
                ? 'bg-amber-50 text-amber-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`
          }
        >
          📚 核心归纳
        </NavLink>

        {/* 模拟测试 */}
        <NavLink
          to="/history/mock-exam"
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
              isActive
                ? 'bg-amber-50 text-amber-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`
          }
        >
          📋 模拟测试
        </NavLink>
      </nav>
    </div>
  );
}
