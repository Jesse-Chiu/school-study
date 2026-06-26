import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Scale } from 'lucide-react';

interface DaoSidebarProps {
  onNavigate?: () => void;
}

export default function DaoSidebar({ onNavigate }: DaoSidebarProps) {
  const location = useLocation();
  const isDaoPath = location.pathname.startsWith('/dao');

  if (!isDaoPath) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 标题区域 */}
      <div className="p-5 border-b border-slate-100 shrink-0">
        <h2 className="text-lg font-bold text-blue-700">⚖️ 道法期末备考</h2>
        <p className="text-xs text-slate-500 mt-1">七年级下册</p>
        <NavLink
          to="/"
          className="text-xs text-slate-400 hover:text-blue-600 mt-2 inline-block transition-colors"
        >
          ← 学科选择
        </NavLink>
      </div>

      {/* 导航区域 */}
      <nav className="flex-1 overflow-y-auto p-3">
        {/* 知识脑图 */}
        <NavLink
          to="/dao/mindmap"
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`
          }
        >
          🧠 知识脑图
        </NavLink>

        {/* 核心归纳 */}
        <NavLink
          to="/dao/summary"
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`
          }
        >
          📚 核心归纳
        </NavLink>

        {/* 模拟测试 */}
        <NavLink
          to="/dao/mock-exam"
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700 font-semibold'
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
