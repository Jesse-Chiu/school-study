/**
 * 练习答案判断工具
 * 兼容两种数据格式：
 * - 判断题：boolean（true/false）或 string（'正确'/'错误'）
 * - 单选题：number（选项索引）或 string（选项标号如'A'）
 * - 多选题：number[]（选项索引）或 string[]（选项标号如['A','B']）
 * - 简答题：string（参考答案）
 */

export function isCorrectAnswer(
  exercise: { type: string; answer: unknown },
  userAnswer: unknown
): boolean {
  const { type, answer } = exercise;

  // 判断题
  if (type === 'true-false') {
    if (typeof answer === 'boolean' && typeof userAnswer === 'boolean') {
      return answer === userAnswer;
    }
    if (typeof answer === 'string' && typeof userAnswer === 'string') {
      return answer === userAnswer;
    }
    // 混合格式：boolean vs string
    if (typeof answer === 'boolean' && typeof userAnswer === 'string') {
      return (answer === true && userAnswer === '正确') || (answer === false && userAnswer === '错误');
    }
    if (typeof answer === 'string' && typeof userAnswer === 'boolean') {
      return (answer === '正确' && userAnswer === true) || (answer === '错误' && userAnswer === false);
    }
    return false;
  }

  // 单选题
  if (type === 'single-choice') {
    if (typeof answer === 'number' && typeof userAnswer === 'number') {
      return answer === userAnswer;
    }
    if (typeof answer === 'string' && typeof userAnswer === 'string') {
      return answer === userAnswer;
    }
    // 混合格式：number（索引）vs string（标号）
    if (typeof answer === 'number' && typeof userAnswer === 'string') {
      const label = String.fromCharCode(65 + answer); // 0->A, 1->B
      return label === userAnswer;
    }
    if (typeof answer === 'string' && typeof userAnswer === 'number') {
      const label = String.fromCharCode(65 + userAnswer);
      return label === answer;
    }
    return false;
  }

  // 多选题
  if (type === 'multi-choice') {
    const a = Array.isArray(answer) ? answer : [];
    const u = Array.isArray(userAnswer) ? userAnswer : [];
    if (a.length !== u.length) return false;

    // 都转成 string 标号比较
    const normalize = (v: unknown): string => {
      if (typeof v === 'number') return String.fromCharCode(65 + v);
      return String(v);
    };
    const aNorm = [...a].map(normalize).sort();
    const uNorm = [...u].map(normalize).sort();
    return aNorm.every((v, i) => v === uNorm[i]);
  }

  // 简答题：非空即认为已作答（实际批改需人工）
  if (type === 'fill-blank') {
    return typeof userAnswer === 'string' && userAnswer.trim().length > 0;
  }

  return false;
}

/**
 * 获取题目的正确答案文本（用于显示解析）
 */
export function getCorrectAnswerText(exercise: { type: string; answer: unknown; options?: string[] }): string {
  const { type, answer, options } = exercise;

  if (type === 'true-false') {
    if (typeof answer === 'boolean') return answer ? '正确' : '错误';
    return String(answer);
  }

  if (type === 'single-choice' && options) {
    if (typeof answer === 'number') return `${String.fromCharCode(65 + answer)}. ${options[answer] || ''}`;
    return String(answer);
  }

  if (type === 'multi-choice' && options) {
    const ans = answer; // unknown | number[] | string[]
    let indices: number[];
    if (Array.isArray(ans)) {
      if (typeof ans[0] === 'number') {
        indices = ans as number[];
      } else {
        indices = (ans as string[]).map(l => l.charCodeAt(0) - 65);
      }
    } else {
      indices = [];
    }
    return indices.map(i => `${String.fromCharCode(65 + i)}. ${options[i] || ''}`).join('，');
  }

  if (type === 'fill-blank') {
    return String(answer);
  }

  return String(answer);
}
