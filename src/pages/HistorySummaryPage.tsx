import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Lightbulb, BookOpen, Globe, GraduationCap } from 'lucide-react';
import historyCoreData from '@/data/history-core';
import type { CoreSection } from '@/data/history-core';

/** 按单元分组的工具函数 */
function groupByUnit(data: CoreSection[]): Map<string, CoreSection[]> {
  const map = new Map<string, CoreSection[]>();
  for (const item of data) {
    const existing = map.get(item.unit);
    if (existing) {
      existing.push(item);
    } else {
      map.set(item.unit, [item]);
    }
  }
  return map;
}

/** 单元图标 */
function unitIcon(unit: string) {
  if (unit.includes('第一')) return '🏛️';
  if (unit.includes('第二')) return '🏯';
  return '👑';
}

export default function HistorySummaryPage() {
  // 按单元分组
  const unitGroups = useMemo(() => groupByUnit(historyCoreData), []);

  // 展开状态：单元级别
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(() => new Set(['第一单元 隋唐时期：繁荣与开放的时代']));
  // 展开状态：课级别
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());
  // 展开状态：知识点级别
  const [expandedConcepts, setExpandedConcepts] = useState<Set<string>>(new Set());

  const toggleUnit = (unitName: string) => {
    setExpandedUnits(prev => {
      const next = new Set(prev);
      if (next.has(unitName)) next.delete(unitName);
      else next.add(unitName);
      return next;
    });
  };

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons(prev => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  };

  const toggleConcept = (conceptId: string) => {
    setExpandedConcepts(prev => {
      const next = new Set(prev);
      if (next.has(conceptId)) next.delete(conceptId);
      else next.add(conceptId);
      return next;
    });
  };

  return (
    <div className="h-full">
      <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
        <span className="text-2xl">📜</span>
        历史核心归纳
      </h1>

      <p className="text-sm text-slate-500 mb-6">
        按单元 → 课 → 知识点三层整理，点击展开查看详细内容
      </p>

      {/* 单元列表 */}
      <div className="space-y-5">
        {Array.from(unitGroups.entries()).map(([unitName, sections]) => {
          const isUnitExpanded = expandedUnits.has(unitName);
          return (
            <div
              key={unitName}
              className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              {/* ── 第一层：单元标题 ── */}
              <button
                onClick={() => toggleUnit(unitName)}
                className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-amber-50 to-white hover:from-amber-100 hover:to-amber-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{unitIcon(unitName)}</span>
                  <div className="text-left">
                    <div className="font-bold text-base text-slate-800">{unitName}</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {sections.length} 课 · {sections.reduce((sum, s) => sum + s.concepts.length, 0)} 个知识点
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 bg-amber-50 rounded-full px-2 py-0.5">
                    {sections.length}课
                  </span>
                  {isUnitExpanded ? (
                    <ChevronDown size={18} className="text-slate-400" />
                  ) : (
                    <ChevronRight size={18} className="text-slate-400" />
                  )}
                </div>
              </button>

              {/* ── 第二层：课列表（缩进在单元内） ── */}
              {isUnitExpanded && (
                <div className="px-4 pb-4 pt-1">
                  <div className="border-l-2 border-amber-200 ml-5 pl-4 space-y-2">
                    {sections.map((section) => {
                      const isLessonExpanded = expandedLessons.has(section.id);
                      return (
                        <div key={section.id}>
                          {/* ── 第1.5层：课标题（缩进一层） ── */}
                          <button
                            onClick={() => toggleLesson(section.id)}
                            className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-amber-50/40 hover:bg-amber-50 transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <GraduationCap size={15} className="text-amber-600 flex-shrink-0" />
                              <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 transition-colors">
                                {section.lesson}
                              </span>
                              <span className="text-xs text-slate-400">
                                ({section.concepts.length}个知识点)
                              </span>
                            </div>
                            {isLessonExpanded ? (
                              <ChevronDown size={14} className="text-slate-400" />
                            ) : (
                              <ChevronRight size={14} className="text-slate-400" />
                            )}
                          </button>

                          {/* ── 第三层：知识点列表（再缩进一层） ── */}
                          {isLessonExpanded && (
                            <div className="ml-6 mt-1.5 border-l-2 border-amber-200 pl-4 space-y-2">
                              {section.concepts.map((concept) => {
                                const isConceptExpanded = expandedConcepts.has(concept.id);
                                return (
                                  <div
                                    key={concept.id}
                                    className="border border-slate-100 rounded-lg overflow-hidden bg-white"
                                  >
                                    {/* 知识点标题 */}
                                    <button
                                      onClick={() => toggleConcept(concept.id)}
                                      className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-50 transition-colors"
                                    >
                                      <div className="flex items-center gap-2">
                                        <BookOpen size={13} className="text-amber-600 flex-shrink-0" />
                                        <span className="text-sm font-medium text-slate-700">
                                          {concept.title}
                                        </span>
                                      </div>
                                      {isConceptExpanded ? (
                                        <ChevronDown size={13} className="text-slate-400" />
                                      ) : (
                                        <ChevronRight size={13} className="text-slate-400" />
                                      )}
                                    </button>

                                    {/* 知识点详情 */}
                                    {isConceptExpanded && (
                                      <div className="px-3.5 pb-3.5 pt-1 space-y-2.5 border-t border-slate-50">
                                        {/* 内容 */}
                                        <div className="text-sm text-slate-700 leading-relaxed pl-1">
                                          {concept.content}
                                        </div>

                                        {/* 例子 */}
                                        {concept.examples && concept.examples.length > 0 && (
                                          <div className="bg-slate-50/70 rounded-lg p-3 ml-1">
                                            <div className="text-xs font-medium text-slate-500 mb-1.5">
                                              📝 例子：
                                            </div>
                                            <ul className="space-y-1">
                                              {concept.examples.map((example, idx) => (
                                                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                                                  <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                                                  <span>{example}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}

                                        {/* 提示 */}
                                        {concept.tips && (
                                          <div className="bg-amber-50/70 border border-amber-100 rounded-lg p-3 flex items-start gap-2 ml-1">
                                            <Lightbulb size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                                            <div className="text-xs text-amber-800">{concept.tips}</div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 复习提示 */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
          <Globe size={18} />
          历史复习策略
        </h3>
        <ul className="space-y-2 text-sm text-amber-700">
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">①</span>
            <span><strong>梳理时间线</strong>：历史学习的核心是时间顺序，建议先理清朝代更替脉络</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">②</span>
            <span><strong>理解因果关系</strong>：每个历史事件都有前因后果，要理解而非死记硬背</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">③</span>
            <span><strong>横向对比</strong>：同时期的中外对比、不同朝代的制度对比都是常考题型</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">④</span>
            <span><strong>关键词记忆</strong>：事件名称、人物、时间、地点、意义是必背五大要素</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
