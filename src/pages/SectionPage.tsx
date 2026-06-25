import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getSectionInfo } from '@/data/structure';
import { addWrongItem } from '@/lib/wrong-book';
import { getCorrectAnswerText } from '@/lib/exercise-utils';
import ClozeRenderer from '@/components/exercises/ClozeRenderer';
// 动态导入小节数据
const sectionDataMap: Record<string, () => Promise<{ default: any }>> = {
  '3-1-1': () => import('@/data/sections/3-1-1'),
  '3-1-2': () => import('@/data/sections/3-1-2'),
  '3-1-3': () => import('@/data/sections/3-1-3'),
  '3-2-1': () => import('@/data/sections/3-2-1'),
  '3-2-2': () => import('@/data/sections/3-2-2'),
  '3-2-3': () => import('@/data/sections/3-2-3'),
  '3-2-4': () => import('@/data/sections/3-2-4'),
  '4-1-1': () => import('@/data/sections/4-1-1'),
  '4-1-2': () => import('@/data/sections/4-1-2'),
  '4-2-1': () => import('@/data/sections/4-2-1'),
  '4-2-2': () => import('@/data/sections/4-2-2'),
  '4-2-3': () => import('@/data/sections/4-2-3'),
  '4-3-1': () => import('@/data/sections/4-3-1'),
  '4-3-2': () => import('@/data/sections/4-3-2'),
  '4-4-1': () => import('@/data/sections/4-4-1'),
  '4-4-2': () => import('@/data/sections/4-4-2'),
  '4-4-3': () => import('@/data/sections/4-4-3'),
  '4-5':   () => import('@/data/sections/4-5'),
};

export default function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'knowledge' | 'exercises'>('knowledge');
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const info = sectionId ? getSectionInfo(sectionId) : null;

  // 加载数据
  const [sectionData, setSectionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sectionId) return;
    setLoading(true);
    const loader = sectionDataMap[sectionId];
    if (!loader) {
      setSectionData(null);
      setLoading(false);
      return;
    }
    loader().then(module => {
      setSectionData(module.default);
      setLoading(false);
    }).catch(() => {
      setSectionData(null);
      setLoading(false);
    });
  }, [sectionId]);

  if (loading) {
    return <div className="text-center py-20 text-slate-400">加载中...</div>;
  }

  if (!sectionId || !info || !sectionData) {
    return <div className="text-center py-20 text-slate-400">小节不存在</div>;
  }

  const { unit, chapter } = info;

  const handleAnswer = (exerciseId: string, answer: any) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: answer }));
  };

  const handleSubmit = (exerciseId: string) => {
    setShowResults(prev => ({ ...prev, [exerciseId]: true }));
    // 保存错题
    const exercise = sectionData.exercises.find((ex: any) => ex.id === exerciseId);
    if (exercise && !isCorrect(exercise)) {
      addWrongItem({
        id: exercise.id,
        question: exercise.question,
        type: exercise.type,
        options: exercise.options,
        answer: exercise.answer,
        explanation: exercise.explanation,
        knowledgePoint: exercise.knowledgePoint,
        sectionId: sectionId || '',
        addedAt: Date.now(),
      });
    }
  };

  const isCorrect = (exercise: any) => {
    const userAnswer = userAnswers[exercise.id];
    if (!userAnswer) return false;
    // 多选题：数组比较
    if (exercise.type === 'multi-choice') {
      const u = userAnswer as string[];
      const a = exercise.answer as string[];
      return u.length === a.length && u.every(v => a.includes(v));
    }
    // 填空题（cloze）：逐个比较每个空格
    if (exercise.type === 'fill-blank' && Array.isArray(exercise.answer) && Array.isArray(userAnswer)) {
      const blanks = exercise.answer as string[];
      const userBlanks = userAnswer as string[];
      if (blanks.length !== userBlanks.length) return false;
      return blanks.every((ans: string, i: number) =>
        (userBlanks[i] || '').trim().toLowerCase() === ans.trim().toLowerCase()
      );
    }
    return userAnswer === exercise.answer;
  };

  // 计算正确率
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = sectionData.exercises.filter((ex: any) => isCorrect(ex)).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 面包屑 */}
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mb-2">
          <ArrowLeft size={16} /> 返回
        </button>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{unit.title}</span>
          <span>/</span>
          <span>{chapter.title}</span>
        </div>
        <h1 className="text-xl font-bold text-slate-800 mt-1">{sectionData.title}</h1>
      </div>

      {/* 学习目标 */}
      {sectionData.learningGoals?.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-semibold text-emerald-800 mb-2">📌 本节学习目标</h3>
          <ul className="space-y-1">
            {sectionData.learningGoals.map((goal: string, i: number) => (
              <li key={i} className="text-sm text-emerald-700 flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                {goal}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tab 切换 */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'knowledge' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          📖 知识点
        </button>
        <button
          onClick={() => setActiveTab('exercises')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
            activeTab === 'exercises' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          📝 专项练习
          {answeredCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {answeredCount}
            </span>
          )}
        </button>
      </div>

      {/* 知识点内容 */}
      {activeTab === 'knowledge' && (
        <div className="space-y-4">
          {sectionData.knowledgePoints.map((kp: any) => (
            <KnowledgeCard key={kp.id} point={kp} />
          ))}
        </div>
      )}

      {/* 练习题内容 */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          {/* 题号导航 + 进度 */}
          <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                答题进度：<span className="text-emerald-600">{answeredCount}/{sectionData.exercises.length}</span>
                已答，<span className={correctCount > 0 ? 'text-emerald-600' : 'text-slate-400'}>{correctCount}</span> 正确
              </span>
              {answeredCount > 0 && (
                <span className="text-xs text-slate-400">
                  点击题号快速定位
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sectionData.exercises.map((ex: any, i: number) => {
                const answered = userAnswers[ex.id] !== undefined;
                const shown = showResults[ex.id];
                const correct = shown && isCorrect(ex);
                const wrong = shown && !isCorrect(ex);
                return (
                  <a
                    key={ex.id}
                    href={`#exercise-${ex.id}`}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-colors ${
                      correct
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : wrong
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : answered
                            ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    {i + 1}
                  </a>
                );
              })}
            </div>
          </div>

          {sectionData.exercises.map((exercise: any, index: number) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index}
              userAnswer={userAnswers[exercise.id]}
              showResult={showResults[exercise.id]}
              isCorrect={isCorrect(exercise)}
              onAnswer={(ans: boolean | number | number[] | string) => handleAnswer(exercise.id, ans)}
              onSubmit={() => handleSubmit(exercise.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 知识点卡片组件
function KnowledgeCard({ point }: { point: any }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div>
          <h3 className="font-semibold text-slate-800 text-sm">{point.title}</h3>
          {point.keyTerms?.length > 0 && (
            <div className="flex gap-1 mt-1 flex-wrap">
              {point.keyTerms.map((term: string, i: number) => (
                <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                  {term}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="text-slate-400 text-lg">{expanded ? '▾' : '▸'}</span>
      </button>
      {expanded && (
        <div className="px-5 pb-4 pt-0 border-t border-slate-50">
          <div className="text-base text-slate-600 leading-relaxed mt-3"
            dangerouslySetInnerHTML={{ __html: point.content }}
          />
          {point.children?.length > 0 && (
            <div className="mt-3 ml-4 space-y-2">
              {point.children.map((child: any) => (
                <div key={child.id} className="border-l-2 border-emerald-100 pl-3">
                  <h4 className="text-sm font-medium text-slate-700">{child.title}</h4>
                  <div className="text-xs text-slate-500 mt-1" dangerouslySetInnerHTML={{ __html: child.content }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 练习题卡片组件
interface ExerciseCardProps {
  exercise: any;
  index: number;
  userAnswer: any;
  showResult: boolean;
  isCorrect: boolean;
  onAnswer: (ans: any) => void;
  onSubmit: () => void;
}

function ExerciseCard({ exercise, index, userAnswer, showResult, isCorrect, onAnswer, onSubmit }: ExerciseCardProps) {
  const typeLabel = exercise.type === 'true-false' ? '判断题' : exercise.type === 'single-choice' ? '单选题' : exercise.type === 'multi-choice' ? '多选题' : '填空题';

  return (
    <div id={`exercise-${exercise.id}`} className={`bg-white rounded-xl border-2 p-5 transition-colors scroll-mt-20 ${
      showResult
        ? isCorrect ? 'border-emerald-200' : 'border-red-200'
        : 'border-slate-100'
    }`}>
      <div className="flex items-start gap-2 mb-3">
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
          exercise.difficulty === 1 ? 'bg-green-100 text-green-700' :
          exercise.difficulty === 2 ? 'bg-amber-100 text-amber-700' :
          'bg-red-100 text-red-700'
        }`}>
          {exercise.difficulty === 1 ? '基础' : exercise.difficulty === 2 ? '中等' : '提高'}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
          exercise.type === 'true-false' ? 'bg-sky-100 text-sky-700' :
          exercise.type === 'single-choice' ? 'bg-emerald-100 text-emerald-700' :
          exercise.type === 'multi-choice' ? 'bg-amber-100 text-amber-700' :
          'bg-purple-100 text-purple-700'
        }`}>{typeLabel}</span>
        <span className="text-xs text-slate-400">第{index + 1}题</span>
        {showResult && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-auto ${
            isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          }`}>
            {isCorrect ? '✅ 正确' : '❌ 错误'}
          </span>
        )}
      </div>

      <p className="text-base text-slate-800 mb-4">{exercise.question}</p>

      {/* 判断题 */}
      {exercise.type === 'true-false' && (
        <div className="flex gap-3">
          {['正确', '错误'].map(option => {
            const isSelected = userAnswer === option;
            const isCorrectAns = exercise.answer === option;
            let cls = 'px-6 py-2 rounded-lg border text-sm transition-colors';
            if (showResult) {
              if (isCorrectAns) cls += ' bg-green-100 border-green-400 text-green-700 font-semibold';
              else if (isSelected) cls += ' bg-red-100 border-red-400 text-red-700';
              else cls += ' bg-white border-slate-200 text-slate-400';
            } else {
              cls += isSelected
                ? ' bg-emerald-100 border-emerald-400 text-emerald-700'
                : ' bg-white border-slate-200 text-slate-600 hover:border-emerald-300';
            }
            return (
              <button key={option} onClick={() => !showResult && onAnswer(option)} disabled={showResult} className={cls}>
                {option}
                {showResult && isCorrectAns && <span className="text-xs ml-1">✓</span>}
                {showResult && isSelected && !isCorrectAns && <span className="text-xs ml-1">✗</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* 选择题 */}
      {(exercise.type === 'single-choice' || exercise.type === 'multi-choice') && (
        <div className="space-y-2">
          {exercise.options?.map((option: string, i: number) => {
            const label = option.match(/^([A-D]\.)\s/)?.[1] || String.fromCharCode(65 + i) + '.';
            const isSelected = exercise.type === 'multi-choice'
              ? (userAnswer as string[])?.some((a: string) => a === label || a === option)
              : userAnswer === label || userAnswer === option;
            const isCorrectAns = Array.isArray(exercise.answer)
              ? (exercise.answer as string[]).includes(label)
              : exercise.answer === label;

            let cls = 'w-full text-left px-4 py-2.5 rounded-lg border transition-colors text-base';
            if (showResult) {
              if (isCorrectAns) cls += ' bg-green-100 border-green-400 text-green-700 font-semibold';
              else if (isSelected && !isCorrectAns) cls += ' bg-red-100 border-red-400 text-red-700';
              else cls += ' bg-white border-slate-200 text-slate-400';
            } else {
              cls += isSelected
                ? ' bg-emerald-100 border-emerald-400 text-emerald-700'
                : ' bg-white border-slate-200 text-slate-700 hover:border-emerald-300';
            }

            return (
              <button
                key={i}
                onClick={() => {
                  if (showResult) return;
                  if (exercise.type === 'multi-choice') {
                    const current = (userAnswer as string[]) || [];
                    const updated = current.includes(label)
                      ? current.filter(a => a !== label)
                      : [...current, label];
                    onAnswer(updated);
                  } else {
                    onAnswer(label);
                  }
                }}
                disabled={showResult}
                className={cls}
              >
                {option}
                {showResult && isCorrectAns && <span className="ml-2 text-xs font-bold text-emerald-600">✓ 正确答案</span>}
                {showResult && isSelected && !isCorrectAns && <span className="ml-2 text-xs font-bold text-red-600">✗ 你的选择</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* 填空题 — Cloze 模式 */}
      {exercise.type === 'fill-blank' && exercise.question.includes('___') && (
        <div className="my-4">
          <ClozeRenderer
            text={exercise.question}
            answers={(userAnswer as string[]) || []}
            correctAnswers={showResult ? (exercise.answer as string[]) : undefined}
            reviewMode={showResult}
            onAnswerChange={(blankIndex, value) => {
              const current = (userAnswer as string[]) || [];
              const next = [...current];
              next[blankIndex] = value;
              onAnswer(next);
            }}
            placeholder="填"
          />
        </div>
      )}

      {/* 填空题 — 旧版兼容（不含 ___ 标记的题目） */}
      {exercise.type === 'fill-blank' && !exercise.question.includes('___') && (
        <div className="space-y-3">
          {!showResult ? (
            <input
              type="text"
              value={(userAnswer as string) || ''}
              onChange={e => onAnswer(e.target.value)}
              placeholder="请输入答案..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200"
            />
          ) : (
            <div className="space-y-3">
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <p className="text-xs font-medium text-slate-500 mb-1">你的答案：</p>
                <p className="text-sm text-slate-700">{userAnswer || '(未作答)'}</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                <p className="text-xs font-medium text-emerald-700 mb-1">参考答案：</p>
                <p className="text-sm text-slate-700">{getCorrectAnswerText(exercise)}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 提交按钮 */}
      {userAnswer && !showResult && (
        <button
          onClick={onSubmit}
          className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
        >
          提交答案
        </button>
      )}

      {/* 解析 */}
      {showResult && (
        <div className="mt-4 bg-slate-50 rounded-lg p-3 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">💡 解析：</p>
          <p className="text-sm text-slate-600 leading-relaxed">{exercise.explanation}</p>
        </div>
      )}
    </div>
  );
}
