import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RotateCcw, Trophy, ChevronLeft, Bookmark } from 'lucide-react';
import { unit3ComprehensiveExercises } from '../data/exercises/unit3-comprehensive';
import { unit4ComprehensiveExercises } from '../data/exercises/unit4-comprehensive';
import { addWrongItem, removeWrongItem, getWrongItems } from '../lib/wrong-book';
import ClozeRenderer from '../components/exercises/ClozeRenderer';
import type { Exercise } from '../lib/types';

const UNIT_MAP: Record<string, { name: string; exercises: Exercise[] }> = {
  'unit3': { name: '第三单元 植物的生活', exercises: unit3ComprehensiveExercises },
  'unit4': { name: '第四单元 人体生理与健康（一）', exercises: unit4ComprehensiveExercises },
};

function checkAnswer(ex: Exercise, userAns: boolean | number | number[] | string | string[] | undefined) {
  if (userAns === undefined) return false;
  if (ex.type === 'true-false') return userAns === ex.answer;
  if (ex.type === 'single-choice') return userAns === ex.answer;
  if (ex.type === 'multi-choice') {
    const u = userAns as number[];
    const a = ex.answer as number[];
    return u.length === a.length && u.every(v => a.includes(v));
  }
  if (ex.type === 'fill-blank' && Array.isArray(ex.answer) && Array.isArray(userAns)) {
    const blanks = ex.answer as string[];
    const userBlanks = userAns as string[];
    return blanks.length === userBlanks.length &&
      blanks.every((ans, i) => (userBlanks[i] || '').trim().toLowerCase() === ans.trim().toLowerCase());
  }
  return false;
}

export default function ExercisesPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();

  // ───────────────── 所有 hooks 必须在顶层 ─────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean | number | number[] | string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong'>('all');
  const [wrongBookIds, setWrongBookIds] = useState<Set<string>>(new Set());

  const isValid = !!(unitId && UNIT_MAP[unitId]);
  const unit = isValid ? UNIT_MAP[unitId!]! : null;
  const exercises = unit?.exercises ?? [];
  const total = exercises.length;

  // 重置状态：当 unitId 改变时
  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setReviewFilter('all');
  }, [unitId]);

  const handleAnswer = useCallback((exId: string, value: boolean | number | number[] | string | string[]) => {
    setAnswers(prev => ({ ...prev, [exId]: value }));
  }, []);

  // 键盘快捷键
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isValid || total === 0) return;
    // 输入框聚焦时只处理方向键（用于题目跳转，但也要避免干扰输入）
    const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;

    // 左右方向键：上一题/下一题（仅在非输入框或已提交时）
    if (e.key === 'ArrowLeft') {
      if (isInput && !submitted) return; // 答题模式输入框中让光标正常移动
      e.preventDefault();
      setCurrentIndex(i => Math.max(0, i - 1));
      return;
    }
    if (e.key === 'ArrowRight') {
      if (isInput && !submitted) return;
      e.preventDefault();
      setCurrentIndex(i => Math.min(total - 1, i + 1));
      return;
    }

    // 已提交模式不响应选项键
    if (submitted) return;
    // 输入框聚焦时不响应选项键
    if (isInput) return;

    const ex = exercises[currentIndex];
    if (!ex || (ex.type !== 'single-choice' && ex.type !== 'multi-choice' && ex.type !== 'true-false')) return;

    const key = e.key.toUpperCase();
    if (ex.type === 'true-false') {
      if (key === 'A') handleAnswer(ex.id, true);
      else if (key === 'B') handleAnswer(ex.id, false);
      return;
    }
    const optionIndex = key.charCodeAt(0) - 65;
    if (optionIndex < 0 || optionIndex >= (ex.options?.length || 0)) return;
    if (ex.type === 'multi-choice') {
      const cur = (answers[ex.id] as number[]) || [];
      const updated = cur.includes(optionIndex)
        ? cur.filter((v: number) => v !== optionIndex)
        : [...cur, optionIndex];
      handleAnswer(ex.id, updated);
    } else {
      handleAnswer(ex.id, optionIndex);
    }
  }, [isValid, total, submitted, currentIndex, exercises, answers, handleAnswer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // ───────────────── useMemo（必须在 early return 之前） ─────────────────
  const exerciseResults = useMemo(() => {
    if (!submitted) return null;
    return exercises.map(ex => {
      const userAns = answers[ex.id];
      const correct = checkAnswer(ex, userAns);
      return { id: ex.id, correct, unanswered: userAns === undefined };
    });
  }, [submitted, exercises, answers]);

  const correctCount = submitted
    ? (exerciseResults?.filter(r => r.correct).length ?? 0)
    : 0;

  const percent = submitted ? Math.round((correctCount / total) * 100) : 0;

  const filteredIndices = useMemo(() => {
    if (!submitted || reviewFilter !== 'wrong') return exercises.map((_, i) => i);
    return exercises
      .map((ex, i) => ({ ex, i }))
      .filter(({ ex }) => {
        const userAns = answers[ex.id];
        return !checkAnswer(ex, userAns);
      })
      .map(({ i }) => i);
  }, [submitted, reviewFilter, exercises, answers]);

  // ───────────────── 无有效 unitId → 显示单元列表 ─────────────────
  if (!isValid) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold text-slate-800 mb-2">📝 综合练习</h1>
        <p className="text-sm text-slate-500 mb-8">选择单元开始综合练习</p>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(UNIT_MAP).map(([id, u]) => (
            <button
              key={id}
              onClick={() => navigate(`/exercises/${id}`)}
              className="text-left bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-white">
                <h2 className="font-bold">{u.name}</h2>
                <p className="text-emerald-100 text-xs mt-1">共 {u.exercises.length} 题</p>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-500">涵盖本单元所有小节知识点</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ───────────────── 以下：有效单元 ─────────────────
  const currentEx = exercises[currentIndex];
  const isLast = currentIndex === total - 1;
  const allAnswered = exercises.every(ex => answers[ex.id] !== undefined);

  const handleSubmit = () => {
    setSubmitted(true);
    setWrongBookIds(new Set(getWrongItems().map(w => w.id)));
    exercises.forEach(ex => {
      const userAns = answers[ex.id];
      const correct = checkAnswer(ex, userAns);
      if (!correct && userAns !== undefined) {
        addWrongItem({
          id: ex.id,
          question: ex.question,
          type: ex.type,
          options: ex.options,
          answer: ex.answer,
          explanation: ex.explanation,
          knowledgePoint: ex.knowledgePoint || '',
          sectionId: unitId || '',
          addedAt: Date.now(),
        });
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentIndex(0);
  };

  const toggleWrongBook = (exId: string) => {
    setWrongBookIds(prev => {
      const next = new Set(prev);
      if (next.has(exId)) {
        next.delete(exId);
        removeWrongItem(exId);
      } else {
        const ex = exercises.find(e => e.id === exId);
        if (ex) {
          next.add(exId);
          addWrongItem({
            id: ex.id, question: ex.question, type: ex.type,
            options: ex.options, answer: ex.answer,
            explanation: ex.explanation, knowledgePoint: ex.knowledgePoint || '',
            sectionId: '', addedAt: Date.now(),
          });
        }
      }
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* ========== 成绩总览横幅（仅已提交） ========== */}
      {submitted && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center mb-6">
          <Trophy size={40} className="text-amber-500 mx-auto mb-2" />
          <h2 className="text-lg font-bold text-slate-800 mb-1">练习完成！</h2>
          <div className="text-4xl font-bold my-3" style={{ color: percent >= 80 ? '#059669' : percent >= 60 ? '#d97706' : '#dc2626' }}>
            {percent}分
          </div>
          <p className="text-sm text-slate-500 mb-4">答对 {correctCount}/{total} 题</p>
          <div className="flex gap-3 justify-center">
            <button onClick={handleRetry} className="flex items-center gap-2 px-5 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50">
              <RotateCcw size={14} /> 重新练习
            </button>
            <button onClick={() => navigate('/exercises')} className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm hover:bg-emerald-600">
              返回选择
            </button>
          </div>
        </div>
      )}

      {/* ========== 顶部信息 + 题号导航 ========== */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 mb-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/exercises')} className="p-1 rounded-lg hover:bg-slate-100">
              <ChevronLeft size={18} />
            </button>
            <span className="font-bold text-base text-slate-800">{unit!.name} · 综合练习</span>
          </div>
          <span className="text-emerald-600 font-medium">
            {Object.keys(answers).length}/{total} 已答
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${((currentIndex + 1) / total) * 100}%` }} />
        </div>

        {/* 题号导航 + 筛选（已提交时） */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-50">
          <div className="flex flex-wrap gap-1">
            {(submitted && reviewFilter === 'wrong' ? filteredIndices : exercises.map((_, i) => i)).map((realIdx) => {
              const ex = exercises[realIdx];
              const answered = answers[ex.id] !== undefined;
              const active = realIdx === currentIndex;
              const isCorrect = submitted ? exerciseResults![realIdx].correct : false;
              return (
                <button
                  key={ex.id}
                  onClick={() => setCurrentIndex(realIdx)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-all ${
                    active
                      ? 'bg-emerald-500 text-white scale-110 shadow-md'
                      : submitted
                        ? (isCorrect ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-red-50 text-red-600 hover:bg-red-100')
                        : answered
                          ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                          : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {realIdx + 1}
                </button>
              );
            })}
          </div>
          {submitted && (
            <div className="flex gap-1.5">
              <button onClick={() => { setReviewFilter('all'); setCurrentIndex(0); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium ${reviewFilter === 'all' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                全部
              </button>
              <button onClick={() => { setReviewFilter('wrong'); setCurrentIndex(0); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium ${reviewFilter === 'wrong' ? 'bg-red-100 text-red-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                仅错题
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========== 题目卡片 ========== */}
      <div className={`bg-white rounded-xl border-2 p-6 mb-6 ${
        submitted
          ? (checkAnswer(currentEx, answers[currentEx.id])
              ? 'border-emerald-200'
              : answers[currentEx.id] === undefined
                ? 'border-slate-200'
                : 'border-red-200')
          : 'border-slate-100'
      }`}>
        {/* 题号 + 类型标签 + 正误标签 */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500">
            {currentEx.type === 'true-false' ? '判断题' : currentEx.type === 'single-choice' ? '单选题' : currentEx.type === 'multi-choice' ? '多选题' : '填空题'}
          </span>
          <span className="text-xs text-slate-400">第{currentIndex + 1}题</span>
          {submitted && (
            answers[currentEx.id] === undefined
              ? <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">未作答</span>
              : <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${checkAnswer(currentEx, answers[currentEx.id]) ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {checkAnswer(currentEx, answers[currentEx.id]) ? '✅ 正确' : '❌ 错误'}
                </span>
          )}
          {/* 错题本按钮（仅已提交） */}
          {submitted && (
            <button onClick={() => toggleWrongBook(currentEx.id)} className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-500 hover:bg-amber-50 hover:text-amber-600">
              <Bookmark size={13} fill={wrongBookIds.has(currentEx.id) ? 'currentColor' : 'none'} />{wrongBookIds.has(currentEx.id) ? '已收藏' : '错题本'}
            </button>
          )}
        </div>

        <p className="text-base text-slate-800 mb-6 leading-relaxed">{currentEx.question}</p>

        {/* 判断题 */}
        {currentEx.type === 'true-false' && (
          <div className="flex gap-3">
            {[true, false].map(val => {
              const selected = answers[currentEx.id] === val;
              const isCorrectAns = currentEx.answer === val;
              let cls = selected
                ? 'bg-emerald-100 border-emerald-400 text-emerald-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300';
              if (submitted && isCorrectAns) cls = 'border-emerald-400 bg-emerald-50 text-emerald-700';
              if (submitted && selected && !isCorrectAns) cls = 'border-red-400 bg-red-50 text-red-700';
              return (
                <button
                  key={String(val)}
                  onClick={() => !submitted && handleAnswer(currentEx.id, val)}
                  disabled={submitted}
                  className={`px-6 py-2.5 rounded-lg border text-sm transition-colors ${submitted ? 'cursor-default' : ''} ${cls}`}
                >
                  {val ? '正确 (A)' : '错误 (B)'}
                  {submitted && isCorrectAns && <span className="block text-xs mt-0.5 text-emerald-600">✓ 正确答案</span>}
                  {submitted && selected && !isCorrectAns && <span className="block text-xs mt-0.5 text-red-600">✗ 你的选择</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* 单选题 */}
        {currentEx.type === 'single-choice' && currentEx.options && (
          <div className="space-y-2">
            {currentEx.options.map((opt, i) => {
              const selected = answers[currentEx.id] === i;
              const isCorrectAns = currentEx.answer === i;
              let cls = selected
                ? 'bg-emerald-100 border-emerald-400 text-emerald-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300';
              if (submitted && isCorrectAns) cls = 'border-emerald-400 bg-emerald-50 text-emerald-700';
              if (submitted && selected && !isCorrectAns) cls = 'border-red-400 bg-red-50 text-red-700';
              return (
                <button
                  key={i}
                  onClick={() => !submitted && handleAnswer(currentEx.id, i)}
                  disabled={submitted}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors flex items-center ${submitted ? 'cursor-default' : ''} ${cls}`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                  <span>{opt}</span>
                  {submitted && isCorrectAns && <span className="ml-auto text-xs font-bold text-emerald-600">✓ 正确</span>}
                  {submitted && selected && !isCorrectAns && <span className="ml-auto text-xs font-bold text-red-600">✗ 你的选择</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* 多选题 */}
        {currentEx.type === 'multi-choice' && currentEx.options && (
          <div className="space-y-2">
            {currentEx.options.map((opt, i) => {
              const selected = (answers[currentEx.id] as number[] || []).includes(i);
              const isCorrectAns = (currentEx.answer as number[]).includes(i);
              let cls = selected
                ? 'bg-emerald-100 border-emerald-400 text-emerald-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300';
              if (submitted && isCorrectAns) cls = 'border-emerald-400 bg-emerald-50 text-emerald-700';
              if (submitted && selected && !isCorrectAns) cls = 'border-red-400 bg-red-50 text-red-700';
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (submitted) return;
                    const curr = (answers[currentEx.id] as number[] || []);
                    const next = selected ? curr.filter(v => v !== i) : [...curr, i];
                    handleAnswer(currentEx.id, next);
                  }}
                  disabled={submitted}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors flex items-center ${submitted ? 'cursor-default' : ''} ${cls}`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                  <span>{opt}</span>
                  {submitted && isCorrectAns && <span className="ml-auto text-xs font-bold text-emerald-600">✓ 正确</span>}
                  {submitted && selected && !isCorrectAns && <span className="ml-auto text-xs font-bold text-red-600">✗ 你的选择</span>}
                </button>
              );
            })}
            {!submitted && <p className="text-xs text-slate-400 mt-1">（可选多个答案）</p>}
          </div>
        )}

        {/* 填空题 — Cloze */}
        {currentEx.type === 'fill-blank' && currentEx.question.includes('___') && (
          <div className="my-2">
            <ClozeRenderer
              text={currentEx.question}
              answers={(answers[currentEx.id] as string[]) || []}
              correctAnswers={submitted ? (currentEx.answer as string[]) : undefined}
              reviewMode={submitted}
              onAnswerChange={submitted ? () => {} : (blankIndex, value) => {
                const cur = (answers[currentEx.id] as string[]) || [];
                const next = [...cur];
                next[blankIndex] = value;
                handleAnswer(currentEx.id, next);
              }}
              placeholder="填"
            />
          </div>
        )}

        {/* 填空题 — 旧版兼容 */}
        {currentEx.type === 'fill-blank' && !currentEx.question.includes('___') && (
          <div className="space-y-3">
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="请输入答案..."
              value={(answers[currentEx.id] as string) || ''}
              onChange={e => !submitted && handleAnswer(currentEx.id, e.target.value)}
              disabled={submitted}
            />
            {submitted && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-base">
                <p className="font-medium text-emerald-800 mb-1">参考答案：</p>
                <p className="text-slate-700">{Array.isArray(currentEx.answer) ? (currentEx.answer as string[]).join('、') : String(currentEx.answer)}</p>
              </div>
            )}
          </div>
        )}

        {/* 解析（仅已提交） */}
        {submitted && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs font-medium text-slate-500 mb-1">💡 解析：</p>
              <p className="text-sm text-slate-600 leading-relaxed">{currentEx.explanation}</p>
            </div>
          </div>
        )}
      </div>

      {/* ========== 导航按钮 ========== */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50"
        >
          <span className="text-xs text-slate-400 bg-slate-100 rounded px-1.5 py-0.5 mr-1">←</span>
          上一题
        </button>
        <span className="text-xs text-slate-400">
          {currentIndex + 1} / {total}
          {submitted && ` · 快捷键: ← →`}
        </span>
        {isLast ? (
          !submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="px-6 py-2 rounded-lg text-sm bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-40 shadow-sm"
            >
              提交练习
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
            >
              <RotateCcw size={14} /> 重新练习
            </button>
          )
        ) : (
          <button
            onClick={() => setCurrentIndex(i => i + 1)}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
          >
            下一题
            <span className="text-xs text-emerald-200 bg-emerald-600/30 rounded px-1.5 py-0.5 ml-1">→</span>
          </button>
        )}
      </div>
    </div>
  );
}
