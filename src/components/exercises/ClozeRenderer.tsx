import { useRef, useEffect, useCallback } from 'react';

interface ClozeRendererProps {
  /** 包含 ___ 标记的问题文本 */
  text: string;
  /** 每个空格的用户答案 */
  answers: string[];
  /** 答案变更回调 */
  onAnswerChange: (blankIndex: number, value: string) => void;
  /** 正确答案（仅阅卷模式使用） */
  correctAnswers?: string[];
  /** 是否阅卷模式 */
  reviewMode?: boolean;
  /** 输入框占位符 */
  placeholder?: string;
}

export default function ClozeRenderer({
  text,
  answers,
  onAnswerChange,
  correctAnswers,
  reviewMode = false,
  placeholder = '填空',
}: ClozeRendererProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const segments = text.split('___');
  const blankCount = segments.length - 1;

  // Tab / Shift+Tab 处理：在填空输入框之间跳转
  const handleClozeKeyDown = useCallback((blankIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (reviewMode) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        // 跳转到上一个输入框
        const prevIdx = blankIndex - 1;
        if (prevIdx >= 0) {
          inputRefs.current[prevIdx]?.focus();
          inputRefs.current[prevIdx]?.select();
        }
      } else {
        // 跳转到下一个输入框
        const nextIdx = blankIndex + 1;
        if (nextIdx < blankCount) {
          inputRefs.current[nextIdx]?.focus();
          inputRefs.current[nextIdx]?.select();
        }
      }
    }
  }, [reviewMode, blankCount]);

  return (
    <div className="text-base text-slate-800 leading-relaxed">
      {segments.map((seg, i) => (
        <span key={i}>
          {seg}
          {i < blankCount && (
            <ClozeBlank
              value={answers[i] || ''}
              correctAnswer={correctAnswers?.[i]}
              onChange={(val) => onAnswerChange(i, val)}
              onKeyDown={(e) => handleClozeKeyDown(i, e)}
              reviewMode={reviewMode}
              placeholder={placeholder}
              inputRef={(el) => { inputRefs.current[i] = el; }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

function ClozeBlank({
  value,
  correctAnswer,
  onChange,
  onKeyDown,
  reviewMode,
  placeholder,
  inputRef,
}: {
  value: string;
  correctAnswer?: string;
  onChange: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  reviewMode: boolean;
  placeholder: string;
  inputRef: (el: HTMLInputElement | null) => void;
}) {
  const isCorrect = reviewMode && correctAnswer !== undefined &&
    value.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

  if (reviewMode) {
    return (
      <span className="inline-flex items-center gap-1 mx-0.5 align-baseline">
        <span className={`inline-block min-w-[60px] px-2 py-0.5 rounded text-center border-b-2 font-medium ${
          isCorrect
            ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
            : 'bg-red-50 border-red-400 text-red-700'
        }`}>
          {value || '(未填)'}
        </span>
        {!isCorrect && correctAnswer && (
          <span className="text-xs text-emerald-600 font-medium ml-1">
            → {correctAnswer}
          </span>
        )}
      </span>
    );
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="inline-block w-[80px] px-1.5 py-0.5 mx-0.5 text-center border-b-2 border-emerald-300 bg-emerald-50/50 text-emerald-800 font-medium focus:outline-none focus:border-emerald-500 focus:bg-emerald-50 rounded-t text-sm align-baseline"
    />
  );
}
