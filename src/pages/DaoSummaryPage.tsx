import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Lightbulb, BookOpen, Scale, GraduationCap } from 'lucide-react';
import daoCoreData from '@/data/dao-core';
import type { CoreSection } from '@/data/dao-core';

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
  if (unit.includes('第一')) return '🌱';
  if (unit.includes('第二')) return '💪';
  if (unit.includes('第三')) return '🏛️';
  return '⚖️';
}

export default function DaoSummaryPage() {
  // 按单元分组
  const unitGroups = useMemo(() => groupByUnit(daoCoreData), []);

  // 展开状态：单元级别
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(() => new Set(['第一单元 珍惜青春时光']));
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
        <span className="text-2xl">📚</span>
        道法核心归纳
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
                className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-colors"
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
                  <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">
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
                  <div className="border-l-2 border-blue-100 ml-5 pl-4 space-y-2">
                    {sections.map((section) => {
                      const isLessonExpanded = expandedLessons.has(section.id);
                      return (
                        <div key={section.id}>
                          {/* ── 第1.5层：课标题（缩进一层） ── */}
                          <button
                            onClick={() => toggleLesson(section.id)}
                            className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-blue-50/40 hover:bg-blue-50 transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <GraduationCap size={15} className="text-blue-500 flex-shrink-0" />
                              <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
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
                            <div className="ml-6 mt-1.5 border-l-2 border-blue-100 pl-4 space-y-2">
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
                                        <BookOpen size={13} className="text-blue-500 flex-shrink-0" />
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
                                                  <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
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
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <Scale size={18} />
          道法复习策略
        </h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">①</span>
            <span><strong>理解为主</strong>：道法不是死记硬背，要理解概念的内涵和意义</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">②</span>
            <span><strong>联系生活</strong>：将知识点与日常生活联系起来，加深理解</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">③</span>
            <span><strong>案例分析</strong>：道法题目常以案例形式出现，要多练习案例分析题</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">④</span>
            <span><strong>辨析训练</strong>：辨析题是道法特色题型，要掌握辨析方法</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
