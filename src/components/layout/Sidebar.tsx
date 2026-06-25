import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { units } from '@/data/structure';

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const [expandedUnits, setExpandedUnits] = useState<string[]>(['unit3', 'unit4']);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev =>
      prev.includes(unitId) ? prev.filter(id => id !== unitId) : [...prev, unitId]
    );
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId) ? prev.filter(id => id !== chapterId) : [...prev, chapterId]
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 标题区域 */}
      <div className="p-5 border-b border-slate-100 shrink-0">
        <h2 className="text-lg font-bold text-emerald-700">📘 生物期末备考</h2>
        <p className="text-xs text-slate-500 mt-1">七年级下册</p>
        <NavLink
          to="/"
          className="text-xs text-slate-400 hover:text-emerald-600 mt-2 inline-block transition-colors"
        >
          ← 学科选择
        </NavLink>
      </div>

      {/* 导航区域 */}
      <nav className="flex-1 overflow-y-auto p-3">
        {/* 首页链接 */}
        <NavLink
          to="/biology"
          end
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
              isActive
                ? 'bg-emerald-50 text-emerald-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`
          }
        >
          🏠 首页
        </NavLink>

        {units.map(unit => (
          <div key={unit.id} className="mb-1">
            <button
              onClick={() => toggleUnit(unit.id)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <span className="truncate" title={unit.title}>{unit.title}</span>
              {expandedUnits.includes(unit.id) ? (
                <ChevronDown size={16} className="text-slate-400" />
              ) : (
                <ChevronRight size={16} className="text-slate-400" />
              )}
            </button>

            {expandedUnits.includes(unit.id) && (
              <div className="ml-3 pl-3 border-l-2 border-emerald-200 py-1">
                {unit.chapters.map(chapter => (
                  <div key={chapter.id}>
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="flex items-center justify-between w-full px-2 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <span className="truncate">{chapter.title}</span>
                      {expandedChapters.includes(chapter.id) ? (
                        <ChevronDown size={14} className="text-slate-400 shrink-0 ml-1" />
                      ) : (
                        <ChevronRight size={14} className="text-slate-400 shrink-0 ml-1" />
                      )}
                    </button>

                    {expandedChapters.includes(chapter.id) && (
                      <div className="ml-3 pl-3 border-l border-slate-200 py-0.5">
                        {chapter.sections.map(section => (
                          <NavLink
                            key={section.id}
                            to={`/section/${section.id}`}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                              `block px-2 py-1.5 rounded-lg text-sm transition-colors ${
                                isActive
                                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-600'
                              }`
                            }
                          >
                            {section.title}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* 功能入口 */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <NavLink
            to="/mindmap"
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            🧠 知识脑图
          </NavLink>
          <NavLink
            to="/exercises"
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            📝 综合练习
          </NavLink>
          <NavLink
            to="/mock-exam"
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            📋 模拟测试
          </NavLink>
          <NavLink
            to="/summary"
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            📌 核心归纳
          </NavLink>
          <NavLink
            to="/wrong-book"
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-xl text-base mb-1 transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            📕 错题本
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
