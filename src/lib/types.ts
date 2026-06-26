// 知识点节点（同时作为脑图节点）
export interface KnowledgePoint {
  id: string;
  title: string;
  content: string;
  keyTerms: string[];
  children?: KnowledgePoint[];
}

// 练习题题型
export type ExerciseType = 'true-false' | 'single-choice' | 'multi-choice' | 'fill-blank' | 'cloze' | 'judgement' | 'analysis';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  // 答案格式兼容两种写法：
  // - 判断题：boolean（true/false）或 string（'正确'/'错误'）
  // - 单选题：number（选项索引）或 string（选项标号如'A'）
  // - 多选题：number[]（选项索引数组）或 string[]（选项标号数组）
  // - 填空题：string[]（每个空格的正确答案，问题中用 ___ 标记空格）
  // - 辨析题：string（'正确'/'错误'）
  // - 分析说明题：string（参考答案）
  answer: string | string[] | boolean | number | number[];
  explanation: string;
  knowledgePoint?: string;
  difficulty?: 1 | 2 | 3;
  /** 题目配图路径（相对于 public/ 目录） */
  image?: string;
  /** 辨析题专用：正确答案（true=正确，false=错误） */
  correctJudgement?: boolean;
  /** 辨析题专用：判断理由 */
  judgementReason?: string;
  /** 分析说明题/综合题专用：参考答案 */
  referenceAnswer?: string;
  /** 辨析题专用：辨析答案（正确/错误） */
  judgementAnswer?: string;
  /** 本题分值（不填则按总分/题数平均分配） */
  score?: number;
}

// 小节数据
export interface SectionData {
  id: string;
  unitId: string;
  chapterId: string;
  title: string;
  learningGoals: string[];
  knowledgePoints: KnowledgePoint[];
  exercises: Exercise[];
}

// 章节导航结构
export interface SectionInfo {
  id: string;
  title: string;
  unitId: string;
  chapterId: string;
}

export interface ChapterInfo {
  id: string;
  title: string;
  unitId: string;
  sections: SectionInfo[];
}

export interface UnitInfo {
  id: string;
  title: string;
  chapters: ChapterInfo[];
}

// 模拟测试
export interface MockExam {
  title: string;
  timeLimit: number; // 分钟
  totalScore: number;
  questions: Exercise[];
}

// 核心知识归纳卡片
export interface SummaryCard {
  id: string;
  title: string;
  unitId: string;
  chapterId: string;
  points: string[];
  tips: string;
}
