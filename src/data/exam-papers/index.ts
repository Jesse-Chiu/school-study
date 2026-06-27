/**
 * 模拟测试试卷注册中心
 * 新增试卷：在此 import 并添加到 papers 数组即可
 * 删除试卷：从 papers 数组中移除即可
 */
import type { ExamPaper } from './types';
import { defaultExam } from './default';
import { daoJiuxiao2024 } from './dao-jiuxiao-2024';
import { daoSanmu2024 } from './dao-sanmu-2024';
import { daoPingdong2024 } from './dao-pingdong-2024';
import { daoYangqiao2024 } from './dao-yangqiao-2024';
import { historyPingdong2024 } from './history-pingdong-2024';

/** 所有可用试卷 */
export const examPapers: ExamPaper[] = [
  defaultExam,
  daoJiuxiao2024,
  daoSanmu2024,
  daoPingdong2024,
  daoYangqiao2024,
  historyPingdong2024,
  // 后续新增试卷在此添加...
];

/** 按 ID 查找试卷 */
export function getExamPaper(id: string): ExamPaper | undefined {
  return examPapers.find(p => p.meta.id === id);
}

/** 获取试卷列表（仅含元数据，不含题目） */
export function getExamList() {
  return examPapers.map(p => p.meta);
}

export type { ExamPaper, ExamPaperMeta } from './types';
