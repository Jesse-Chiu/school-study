import type { Exercise } from '../../lib/types';

/** 试卷元数据 */
export interface ExamPaperMeta {
  id: string;
  title: string;        // 试卷名称，如 "七下生物真题-屏东中学2024"
  subject: string;      // 学科
  timeLimit: number;    // 考试时长（秒）
  totalScore: number;
  questionCount: number;
  description?: string; // 试卷简介
  source?: string;      // 来源
}

/** 完整试卷 = 元数据 + 题目列表 */
export interface ExamPaper {
  meta: ExamPaperMeta;
  exercises: Exercise[];
}
