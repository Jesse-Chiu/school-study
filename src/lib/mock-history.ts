/**
 * 模拟测试历史记录 localStorage 工具
 * key: bio-mock-history-v2
 * 支持多份试卷的历史记录
 */

export interface MockRecord {
  paperId: string;     // 试卷ID
  paperTitle: string;  // 试卷名称
  date: string;        // ISO 日期字符串
  score: number;       // 得分（0-100）
  correct: number;     // 答对题数
  total: number;       // 总题数
  timeSpent: number;   // 用时（秒）
}

const KEY = 'bio-mock-history-v2';
const MAX_RECORDS = 50;

export function getMockHistory(): MockRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      // 迁移旧数据
      const oldRaw = localStorage.getItem('bio-mock-history');
      if (oldRaw) {
        const old = JSON.parse(oldRaw) as any[];
        const migrated: MockRecord[] = old.map(r => ({
          paperId: 'default', paperTitle: '期末综合模拟测试', date: r.date,
          score: r.score, correct: r.correct, total: r.total, timeSpent: r.timeSpent,
        }));
        localStorage.setItem(KEY, JSON.stringify(migrated.slice(0, MAX_RECORDS)));
        return migrated.slice(0, MAX_RECORDS);
      }
      return [];
    }
    return JSON.parse(raw);
  } catch { return []; }
}

/** 添加一条测试记录 */
export function addMockRecord(record: MockRecord): void {
  const history = getMockHistory();
  history.unshift(record);
  if (history.length > MAX_RECORDS) history.length = MAX_RECORDS;
  localStorage.setItem(KEY, JSON.stringify(history));
}

/** 获取某份试卷的历史记录 */
export function getPaperHistory(paperId: string): MockRecord[] {
  return getMockHistory().filter(r => r.paperId === paperId);
}

/** 清空历史 */
export function clearMockHistory(): void {
  localStorage.removeItem(KEY);
}

/** 获取某份试卷的最佳成绩 */
export function getBestScore(paperId: string): number {
  const records = getPaperHistory(paperId);
  if (records.length === 0) return 0;
  return Math.max(...records.map(r => r.score));
}
