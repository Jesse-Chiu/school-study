import { useState, useCallback, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const SIDEBAR_MIN = 200;
const SIDEBAR_MAX = 420;
const SIDEBAR_DEFAULT = 260;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem('bio-sidebar-width');
    return saved ? Number(saved) : SIDEBAR_DEFAULT;
  });
  const [dragging, setDragging] = useState(false);
  const sidebarRef = useRef<number>(sidebarWidth);

  // 保存宽度到 localStorage
  useEffect(() => {
    localStorage.setItem('bio-sidebar-width', String(sidebarWidth));
  }, [sidebarWidth]);

  // 拖拽处理
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    sidebarRef.current = sidebarWidth;
  }, [sidebarWidth]);

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = sidebarRef.current + e.movementX;
      setSidebarWidth(Math.max(SIDEBAR_MIN, Math.min(SIDEBAR_MAX, newWidth)));
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ========== 移动端 ========== */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}
        <aside
          className={`
            fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-slate-200
            transform transition-transform duration-300 ease-in-out shadow-xl
            ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </aside>
        <Header onToggleSidebar={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 p-5">
          <Outlet />
        </main>
      </div>

      {/* ========== 桌面端：自定义可缩放布局 ========== */}
      <div className="hidden lg:flex h-screen overflow-hidden">
        {/* 侧边栏 */}
        <aside
          className="h-full flex-shrink-0 bg-white border-r border-slate-200 overflow-hidden relative"
          style={{ width: sidebarWidth }}
        >
          <Sidebar />
        </aside>

        {/* 拖拽手柄 */}
        <div
          className={`
            relative z-20 flex-shrink-0 w-1.5 -ml-0.5 cursor-col-resize
            hover:bg-emerald-400 active:bg-emerald-500 transition-colors
            group
            ${dragging ? 'bg-emerald-500' : 'bg-transparent'}
          `}
          onMouseDown={handleMouseDown}
        >
          {/* 可视化把手 */}
          <div className={`
            absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2
            w-1 h-12 rounded-full transition-all
            ${dragging ? 'bg-emerald-600 scale-110' : 'bg-slate-300 group-hover:bg-emerald-400 group-hover:scale-110'}
          `} />
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header onToggleSidebar={() => {}} />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* 拖拽时的全局 overlay，防止 iframe/音频中断鼠标事件 */}
      {dragging && (
        <div className="fixed inset-0 z-30 cursor-col-resize" />
      )}
    </div>
  );
}
