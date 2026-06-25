import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const location = useLocation();

  // 生成面包屑
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/') return '首页';
    if (path.startsWith('/section/')) return '知识点学习';
    if (path.startsWith('/mindmap')) return '知识脑图';
    if (path.startsWith('/exercises')) return '综合练习';
    if (path.startsWith('/mock-exam')) return '模拟测试';
    if (path.startsWith('/summary')) return '核心归纳';
    if (path.startsWith('/wrong-book')) return '错题本';
    return '';
  };

  return (
    <header className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
          aria-label="打开菜单"
        >
          <Menu size={20} className="text-slate-600" />
        </button>
        <h1 className="text-lg font-semibold text-slate-800">{getBreadcrumb()}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-xs text-slate-400">
          人教版·七年级下册
        </div>
      </div>
    </header>
  );
}
