import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Clock, CheckCircle, RotateCcw, Bookmark, ChevronDown, ChevronUp, FileText, ChevronRight } from 'lucide-react';
import { examPapers, getExamPaper, getExamList, type ExamPaper } from '../data/exam-papers';
import { addMockRecord, getPaperHistory, type MockRecord } from '../lib/mock-history';
import { addWrongItem, removeWrongItem, getWrongItems } from '../lib/wrong-book';
import ClozeRenderer from '../components/exercises/ClozeRenderer';
import type { Exercise } from '../lib/types';

// ────────── 工具函数 ──────────

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

const typeLabel = (type: string) => {
  switch (type) {
    case 'true-false': return '判断题';
    case 'single-choice': return '单选题';
    case 'multi-choice': return '多选题';
    case 'fill-blank': return '填空题';
    case 'judgement': return '辨析题';
    case 'analysis': return '分析说明题';
    default: return type;
  }
};

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// ────────── 试卷选择页面 ──────────

function PaperSelector({ onSelect, subject }: { onSelect: (paper: ExamPaper) => void; subject?: string }) {
  const navigate = useNavigate();
  const papers = subject ? getExamList().filter(p => p.subject === subject) : getExamList();
  const homePath = subject === '道法' ? '/dao/mindmap' : subject === '历史' ? '/history/mindmap' : '/biology';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
          <Trophy size={36} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">📋 模拟测试</h1>
        <p className="text-slate-500 text-sm mb-8">选择一份试卷开始考试，检验你的学习成果</p>
      </div>

      <div className="space-y-3">
        {papers.map(p => {
          const history = getPaperHistory(p.id);
          const bestScore = history.length ? Math.max(...history.map(r => r.score)) : null;

          return (
            <button
              key={p.id}
              onClick={() => {
                const paper = getExamPaper(p.id);
                if (paper) onSelect(paper);
              }}
              className="w-full bg-white rounded-xl border border-slate-100 p-5 text-left hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>⏱ {Math.floor(p.timeLimit / 60)}分钟</span>
                      <span>📝 {p.questionCount}题</span>
                      <span>🏆 {p.totalScore}分</span>
                      {p.source && <span>📌 {p.source}</span>}
                    </div>
                    {p.description && (
                      <p className="text-xs text-slate-400 mt-1">{p.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {bestScore !== null && (
                    <div className="text-right">
                      <div className="text-xs text-slate-400">历史最佳</div>
                      <div className={`text-lg font-bold ${bestScore >= 90 ? 'text-emerald-600' : bestScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                        {bestScore}分
                      </div>
                    </div>
                  )}
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-400 transition-colors" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <button onClick={() => navigate(homePath)} className="text-sm text-slate-400 hover:text-slate-600">
          ← 返回首页
        </button>
      </div>
    </div>
  );
}

// ────────── 考试界面 ──────────

function ExamSession({ paper, onBack }: { paper: ExamPaper; onBack: () => void }) {
  const { exercises } = paper;
  const TOTAL = exercises.length;
  const TIME_LIMIT = paper.meta.timeLimit;

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean | number | number[] | string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [wrongBookIds, setWrongBookIds] = useState<Set<string>>(() => new Set(getWrongItems().map(w => w.id)));
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong'>('all');
  const [historyExpanded, setHistoryExpanded] = useState(false);

  const filteredIndices = useMemo(() => {
    if (!submitted || reviewFilter !== 'wrong') return exercises.map((_, i) => i);
    return exercises
      .map((ex, i) => ({ ex, i }))
      .filter(({ ex }) => !checkAnswer(ex, answers[ex.id]))
      .map(({ i }) => i);
  }, [submitted, reviewFilter, exercises, answers]);

  const correctCount = exercises.filter(ex => checkAnswer(ex, answers[ex.id])).length;
  const score = Math.round((correctCount / TOTAL) * paper.meta.totalScore);

  // 计时器
  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft <= 0) { handleSubmitCore(); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [started, submitted, timeLeft]);

  const handleAnswer = useCallback((exId: string, value: boolean | number | number[] | string | string[]) => {
    setAnswers(prev => ({ ...prev, [exId]: value }));
  }, []);

  // 键盘快捷键
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!started) return;
    const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;

    // 左右方向键
    if (e.key === 'ArrowLeft') {
      if (isInput && !submitted) return;
      e.preventDefault();
      setCurrentIndex(i => Math.max(0, i - 1));
      return;
    }
    if (e.key === 'ArrowRight') {
      if (isInput && !submitted) return;
      e.preventDefault();
      setCurrentIndex(i => Math.min(TOTAL - 1, i + 1));
      return;
    }

    if (submitted || isInput) return;

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
      const updated = cur.includes(optionIndex) ? cur.filter((v: number) => v !== optionIndex) : [...cur, optionIndex];
      handleAnswer(ex.id, updated);
    } else {
      handleAnswer(ex.id, optionIndex);
    }
  }, [started, submitted, currentIndex, exercises, answers, handleAnswer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSubmitCore = useCallback(() => {
    setSubmitted(true);
    const record: MockRecord = {
      paperId: paper.meta.id,
      paperTitle: paper.meta.title,
      date: new Date().toLocaleString('zh-CN'),
      score: correctCount > 0 ? score : Math.round((exercises.filter(ex => checkAnswer(ex, answers[ex.id])).length / TOTAL) * paper.meta.totalScore),
      correct: exercises.filter(ex => checkAnswer(ex, answers[ex.id])).length,
      total: TOTAL,
      timeSpent: TIME_LIMIT - timeLeft,
    };
    addMockRecord(record);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [paper, exercises, answers, timeLeft, correctCount, score, TOTAL, TIME_LIMIT]);

  const handleSubmit = () => handleSubmitCore();

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentIndex(0);
    setTimeLeft(TIME_LIMIT);
  };

  const handleToggleWrongBook = (exId: string) => {
    setWrongBookIds(prev => {
      const next = new Set(prev);
      if (next.has(exId)) { next.delete(exId); removeWrongItem(exId); }
      else {
        const ex = exercises.find(e => e.id === exId);
        if (ex) {
          next.add(exId);
          addWrongItem({ id: ex.id, question: ex.question, type: ex.type, options: ex.options, answer: ex.answer, explanation: ex.explanation, knowledgePoint: ex.knowledgePoint, sectionId: paper.meta.id, addedAt: Date.now() });
        }
      }
      return next;
    });
  };

  // ========== 未开始 ==========
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
            <Trophy size={36} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">{paper.meta.title}</h1>
          {paper.meta.description && <p className="text-sm text-slate-400 mb-6">{paper.meta.description}</p>}

          <div className="bg-slate-50 rounded-xl p-5 mb-8 text-left space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Clock size={16} className="text-emerald-600" />
              <span>考试时长：<strong>{Math.floor(paper.meta.timeLimit / 60)}分钟</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <FileText size={16} className="text-amber-600" />
              <span>题目数量：<strong>{paper.meta.questionCount}题</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <CheckCircle size={16} className="text-sky-600" />
              <span>总分：<strong>{paper.meta.totalScore}分</strong></span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={onBack} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50">← 换试卷</button>
            <button onClick={() => setStarted(true)} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-10 py-3 rounded-xl text-base font-medium transition-all shadow-lg shadow-emerald-200">开始考试</button>
          </div>
        </div>
      </div>
    );
  }

  // ========== 考试中 / 已提交 ==========
  const currentEx = exercises[currentIndex];
  const isLast = currentIndex === TOTAL - 1;
  const unansweredCount = exercises.filter(ex => answers[ex.id] === undefined).length;
  const paperHistory = getPaperHistory(paper.meta.id);
  const isCorrect = submitted ? checkAnswer(currentEx, answers[currentEx.id]) : false;
  const isUnanswered = submitted && answers[currentEx.id] === undefined;
  const userAnswer = answers[currentEx.id];

  // 获取正确答案文本（用于提交后显示）
  const correctAnswerText = (ex: Exercise) => {
    if (ex.type === 'true-false') return ex.answer ? '正确' : '错误';
    if (ex.type === 'single-choice' && ex.options) {
      const idx = ex.answer as number;
      return `【${OPTION_LABELS[idx] || ''}】${ex.options[idx] || ''}`;
    }
    if (ex.type === 'multi-choice' && ex.options) {
      return (ex.answer as number[]).map(i => `${OPTION_LABELS[i] || ''}. ${ex.options![i] || ''}`).join('；');
    }
    if (ex.type === 'fill-blank' && Array.isArray(ex.answer)) {
      return (ex.answer as string[]).join('；');
    }
    return String(ex.answer);
  };

  // 获取用户答案文本
  const userAnswerText = (ex: Exercise) => {
    const ua = userAnswer;
    if (ua === undefined) return '未作答';
    if (ex.type === 'true-false') return ua ? '正确' : '错误';
    if (ex.type === 'single-choice' && ex.options) {
      const idx = ua as number;
      return `【${OPTION_LABELS[idx] || ''}】${ex.options[idx] || ''}`;
    }
    if (ex.type === 'multi-choice' && ex.options) {
      return (ua as number[]).map(i => `${OPTION_LABELS[i] || ''}. ${ex.options![i] || ''}`).join('；');
    }
    return String(ua);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* ========== 成绩总览横幅（仅已提交） ========== */}
      {submitted && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            score >= 90 ? 'bg-emerald-100' : score >= 60 ? 'bg-amber-100' : 'bg-red-100'
          }`}>
            <Trophy size={28} className={score >= 90 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'} />
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-2">考试完成！</h2>
          <div className={`text-4xl font-bold mb-3 ${score >= 90 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
            {score}<span className="text-xl">分</span>
          </div>
          <p className="text-sm text-slate-500 mb-1">
            答对 <strong>{correctCount}</strong>/{TOTAL} 题 · 用时 {formatTime(TIME_LIMIT - timeLeft)}
          </p>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
            score >= 90 ? 'bg-emerald-100 text-emerald-700' : score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
          }`}>
            {score >= 90 ? '🎉 优秀！继续加油！' : score >= 60 ? '✅ 良好，还有提升空间' : '💪 需加强复习，再接再厉！'}
          </div>

          <div className="flex gap-3 justify-center mb-6">
            <button onClick={handleRetry} className="flex items-center gap-2 px-5 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50">
              <RotateCcw size={14} /> 重新测试
            </button>
            <button onClick={onBack} className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm hover:bg-emerald-600">
              换试卷
            </button>
          </div>

          {paperHistory.length > 1 && (
            <div className="text-left max-w-md mx-auto">
              <button onClick={() => setHistoryExpanded(!historyExpanded)}
                className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 hover:text-emerald-600 transition-colors">
                📊 历史记录 {historyExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {historyExpanded && (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2">
                  {paperHistory.slice(0, 10).map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 text-xs">
                      <span className="text-slate-500">{r.date}</span>
                      <span className="text-slate-400">对{r.correct}/{r.total}</span>
                      <span className="text-slate-400">用时{Math.floor(r.timeSpent / 60)}分</span>
                      <span className={`font-bold ${r.score >= 90 ? 'text-emerald-600' : r.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{r.score}分</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========== 顶部信息栏 ========== */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 mb-4 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 text-sm">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs text-slate-400 font-medium truncate max-w-[160px]">{paper.meta.title}</span>
            {!submitted && (
              <>
                <span className={`font-mono font-bold text-base tabular-nums ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
                  {formatTime(timeLeft)}
                </span>
              </>
            )}
            {submitted && <span className="text-slate-500">用时 {formatTime(TIME_LIMIT - timeLeft)}</span>}
          </div>
          <span className="text-slate-400">{currentIndex + 1}/{TOTAL}</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all"
            style={{ width: `${((currentIndex + 1) / TOTAL) * 100}%` }} />
        </div>
        {!submitted && unansweredCount > 0 && (
          <span className="text-xs text-amber-600">还有{unansweredCount}题未答</span>
        )}

        {/* 题号导航 + 筛选 */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-50">
          <div className="flex flex-wrap gap-1">
            {(submitted && reviewFilter === 'wrong' ? filteredIndices : exercises.map((_, i) => i)).map((realIdx) => {
              const ex = exercises[realIdx];
              const answered = answers[ex.id] !== undefined;
              const active = realIdx === currentIndex;
              const correct = submitted ? checkAnswer(ex, answers[ex.id]) : false;
              return (
                <button key={ex.id} onClick={() => setCurrentIndex(realIdx)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-all ${
                    active ? 'bg-emerald-500 text-white scale-110 shadow-md' :
                    submitted ? (correct ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-red-50 text-red-600 hover:bg-red-100') :
                    answered ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}>
                  {realIdx + 1}
                </button>
              );
            })}
          </div>
          {submitted && (
            <div className="flex gap-1.5">
              <button onClick={() => { setReviewFilter('all'); setCurrentIndex(0); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium ${reviewFilter === 'all' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>全部</button>
              <button onClick={() => { setReviewFilter('wrong'); setCurrentIndex(0); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium ${reviewFilter === 'wrong' ? 'bg-red-100 text-red-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>仅错题 ({TOTAL - correctCount})</button>
            </div>
          )}
        </div>
      </div>

      {/* ========== 题目卡片 ========== */}
      <div className={`bg-white rounded-xl border-2 p-6 mb-6 ${
        submitted ? (isCorrect ? 'border-emerald-200' : isUnanswered ? 'border-slate-200' : 'border-red-200') : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
            currentEx.type === 'true-false' ? 'bg-sky-100 text-sky-700' :
            currentEx.type === 'single-choice' ? 'bg-emerald-100 text-emerald-700' :
            currentEx.type === 'multi-choice' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
          }`}>{typeLabel(currentEx.type)}</span>
          <span className="text-xs text-slate-400">第{currentIndex + 1}题 / 共{TOTAL}题</span>
          {submitted && (
            isUnanswered ? <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">未作答</span> :
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {isCorrect ? '✅ 正确' : '❌ 错误'}
            </span>
          )}
          {submitted && (
            <button onClick={() => handleToggleWrongBook(currentEx.id)} className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-500 hover:bg-amber-50 hover:text-amber-600">
              <Bookmark size={13} fill={wrongBookIds.has(currentEx.id) ? 'currentColor' : 'none'} />{wrongBookIds.has(currentEx.id) ? '已收藏' : '错题本'}
            </button>
          )}
        </div>

        <p className="text-base text-slate-800 mb-4 leading-relaxed">{currentEx.question}</p>

        {/* 题目配图 */}
        {currentEx.image && (
          <div className="mb-4 p-2 bg-slate-50 rounded-lg flex justify-center">
            <img src={currentEx.image} alt="题目配图" className="max-w-full max-h-80 object-contain rounded" loading="lazy" />
          </div>
        )}

        {/* 判断题 */}
        {currentEx.type === 'true-false' && (
          <div className="flex gap-3">
            {[true, false].map(val => {
              const selected = answers[currentEx.id] === val;
              const isCorrectAns = currentEx.answer === val;
              let cls = selected
                ? 'bg-emerald-100 border-emerald-400 text-emerald-700 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600';
              if (!submitted) cls = selected ? cls : cls + ' hover:border-emerald-300';
              if (submitted && isCorrectAns) cls = 'border-emerald-400 bg-emerald-50 text-emerald-700';
              if (submitted && selected && !isCorrectAns) cls = 'border-red-400 bg-red-50 text-red-700';
              return (
                <button key={String(val)} onClick={() => !submitted && handleAnswer(currentEx.id, val)} disabled={submitted}
                  className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all flex flex-col items-center ${submitted ? 'cursor-default' : ''} ${cls}`}>
                  <span>{val ? '✅ 正确' : '❌ 错误'}</span>
                  {submitted && isCorrectAns && <span className="text-xs mt-0.5 text-emerald-600">✓ 正确答案</span>}
                  {submitted && selected && !isCorrectAns && <span className="text-xs mt-0.5 text-red-600">✗ 你的选择</span>}
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
                ? 'bg-emerald-100 border-emerald-400 text-emerald-700 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600';
              if (!submitted) cls = selected ? cls : cls + ' hover:border-emerald-300';
              if (submitted && isCorrectAns) cls = 'border-emerald-400 bg-emerald-50 text-emerald-700';
              if (submitted && selected && !isCorrectAns) cls = 'border-red-400 bg-red-50 text-red-700';
              return (
                <button key={i} onClick={() => !submitted && handleAnswer(currentEx.id, i)} disabled={submitted}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center ${submitted ? 'cursor-default' : ''} ${cls}`}>
                  <span className="font-bold mr-2">{OPTION_LABELS[i]}.</span>
                  <span className="flex-1">{opt}</span>
                  {submitted && isCorrectAns && <span className="text-xs font-bold text-emerald-600">✓ 正确答案</span>}
                  {submitted && selected && !isCorrectAns && <span className="text-xs font-bold text-red-600">✗ 你的选择</span>}
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
                ? 'bg-emerald-100 border-emerald-400 text-emerald-700 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600';
              if (!submitted) cls = selected ? cls : cls + ' hover:border-emerald-300';
              if (submitted && isCorrectAns) cls = 'border-emerald-400 bg-emerald-50 text-emerald-700';
              if (submitted && selected && !isCorrectAns) cls = 'border-red-400 bg-red-50 text-red-700';
              return (
                <button key={i} onClick={() => {
                  if (submitted) return;
                  const curr = (answers[currentEx.id] as number[] || []);
                  const next = selected ? curr.filter(v => v !== i) : [...curr, i];
                  handleAnswer(currentEx.id, next);
                }} disabled={submitted}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center ${submitted ? 'cursor-default' : ''} ${cls}`}>
                  <span className="font-bold mr-2">{OPTION_LABELS[i]}.</span>
                  <span className="flex-1">{opt}</span>
                  {submitted && isCorrectAns && <span className="text-xs font-bold text-emerald-600">✓ 正确</span>}
                  {submitted && selected && !isCorrectAns && <span className="text-xs font-bold text-red-600">✗ 你的选择</span>}
                </button>
              );
            })}
            {!submitted && <p className="text-xs text-slate-400">（可选多个答案，再次点击取消选择）</p>}
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

        {/* 辨析题 */}
        {currentEx.type === 'judgement' && (
          <div className="my-4">
            {!submitted ? (
              <div className="space-y-3">
                <p className="text-sm text-slate-600 mb-2">请判断并说明理由：</p>
                <div className="flex gap-3">
                  {[
                    { value: true, label: '正确' },
                    { value: false, label: '错误' }
                  ].map(opt => {
                    const selected = answers[currentEx.id] === opt.value;
                    return (
                      <button
                        key={String(opt.value)}
                        onClick={() => handleAnswer(currentEx.id, opt.value)}
                        className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all ${
                          selected
                            ? 'bg-blue-100 border-blue-400 text-blue-700 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className={`rounded-lg p-3 ${answers[currentEx.id] === currentEx.correctJudgement ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  <p className="text-xs font-medium text-slate-500 mb-1">你的判断：</p>
                  <p className={`text-sm font-bold ${answers[currentEx.id] === currentEx.correctJudgement ? 'text-emerald-700' : 'text-red-700'}`}>
                    {answers[currentEx.id] ? '正确' : '错误'}
                    {answers[currentEx.id] === currentEx.correctJudgement ? ' ✓' : ' ✗'}
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-emerald-50">
                  <p className="text-xs font-medium text-slate-500 mb-1">正确答案：</p>
                  <p className="text-sm font-bold text-emerald-700">
                    {currentEx.correctJudgement ? '正确' : '错误'}
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-blue-50">
                  <p className="text-xs font-medium text-slate-500 mb-1">理由：</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{currentEx.judgementReason}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 分析说明题 */}
        {currentEx.type === 'analysis' && (
          <div className="my-4">
            {submitted && (
              <div className="space-y-3">
                <div className="rounded-lg p-3 bg-emerald-50">
                  <p className="text-xs font-medium text-slate-500 mb-1">💡 参考答案：</p>
                  <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{currentEx.answer as string}</div>
                </div>
              </div>
            )}
            {!submitted && (
              <div className="p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-700">💡 这是分析说明题，提交后将显示参考答案。</p>
              </div>
            )}
          </div>
        )}

        {/* 提交后：用户答案 vs 正确答案 汇总条 */}
        {submitted && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            {/* 正确答案区域 */}
            <div className={`rounded-lg p-3 ${isCorrect ? 'bg-emerald-50' : 'bg-amber-50'}`}>
              <p className="text-xs font-medium text-slate-500 mb-1">🎯 正确答案：</p>
              <p className="text-sm font-bold text-emerald-700">{correctAnswerText(currentEx)}</p>
            </div>

            {/* 用户答案区域（错误时显示） */}
            {!isCorrect && !isUnanswered && (
              <div className="rounded-lg p-3 bg-red-50">
                <p className="text-xs font-medium text-slate-500 mb-1">📝 你的答案：</p>
                <p className="text-sm font-bold text-red-700">{userAnswerText(currentEx)}</p>
              </div>
            )}

            {isUnanswered && (
              <div className="rounded-lg p-3 bg-slate-50">
                <p className="text-xs font-medium text-slate-500">⚠️ 本题未作答</p>
              </div>
            )}

            {/* 解析 */}
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs font-medium text-slate-500 mb-1">💡 解析：</p>
              <p className="text-sm text-slate-600 leading-relaxed">{currentEx.explanation}</p>
            </div>
          </div>
        )}
      </div>

      {/* ========== 导航按钮 ========== */}
      <div className="flex justify-between items-center mb-10">
        <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50">
          <span className="text-xs text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">←</span> 上一题
        </button>
        <div className="text-xs text-slate-400">
          {!submitted && (answers[currentEx.id] !== undefined ? '已作答' : '未作答')}
        </div>
        {isLast ? (
          !submitted ? (
            <button onClick={handleSubmit}
              className="px-6 py-2 rounded-lg text-sm bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:from-red-600 hover:to-orange-600 shadow-lg shadow-red-100">
              📋 交卷
            </button>
          ) : (
            <button onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100">
              <RotateCcw size={14} /> 重新测试
            </button>
          )
        ) : (
          <button onClick={() => setCurrentIndex(i => i + 1)}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm bg-emerald-500 text-white hover:bg-emerald-600">
            下一题 <span className="text-xs text-emerald-200 bg-emerald-600/30 rounded px-1.5 py-0.5">→</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ────────── 主组件 ──────────

export default function MockExamPage() {
  const location = useLocation();
  const isDao = location.pathname.startsWith('/dao');
  const isHistory = location.pathname.startsWith('/history');
  const subjectFilter = isDao ? '道法' : isHistory ? '历史' : '生物';
  const [selectedPaper, setSelectedPaper] = useState<ExamPaper | null>(null);

  if (selectedPaper) {
    return <ExamSession paper={selectedPaper} onBack={() => setSelectedPaper(null)} />;
  }

  return <PaperSelector onSelect={setSelectedPaper} subject={subjectFilter} />;
}
