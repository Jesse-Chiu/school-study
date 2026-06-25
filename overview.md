# 生物备考网站 — 模块化试卷系统 + 屏东真题

## 完成内容

### 1. 模块化试卷架构
- 创建 `src/data/exam-papers/` 目录，每份试卷独立文件
- `types.ts` — ExamPaper/ExamPaperMeta 接口定义
- `index.ts` — 试卷注册中心，增删只需改数组
- `default.ts` — 原期末综合模拟测试（40题）
- `pingdong-2024.ts` — 屏东中学2024-2025七下期末真题（31题）

### 2. 屏东中学真题入库
- 从PDF提取全部31道题目及答案解析
- 自动提取24张题目配图到 `public/exam-images/`
- 题目结构：选择题25道 + 判断题5道（26题拆为5子题） + 填空题6道
- 答案与题目分离存储

### 3. 模拟测试页面重构
- 新增试卷选择页（PaperSelector），展示所有可用试卷
- 每份试卷显示历史最佳成绩
- ExamSession 支持多试卷切换
- 历史记录支持按试卷ID分库

### 4. 提交后答案显示优化
- 提交后每道题内联显示3个区域：
  - 🎯 正确答案：绿色/琥珀色背景，高亮显示正确选项
  - 📝 你的答案：仅答错时显示，红底对比
  - ⚠️ 本题未作答：未答题提示
  - 💡 解析：灰底解析区

### 5. 关键Bug修复
- MockExamPage中 `historyExpanded` useState 移至顶层（修复Hooks顺序变化白屏）
- Exercise类型增加 `image?: string` 字段支持题目配图

## 技术栈
React 18 + TypeScript + Vite 7 + Tailwind CSS v4 + React Router v6 + Lucide React

## 新增文件
- `src/data/exam-papers/types.ts`
- `src/data/exam-papers/index.ts`  
- `src/data/exam-papers/default.ts`
- `src/data/exam-papers/pingdong-2024.ts`
- `public/exam-images/` (24张图片)

## 修改文件
- `src/lib/types.ts` — Exercise 增加 image 字段
- `src/lib/mock-history.ts` — 支持 per-paper 记录 + 自动迁移旧数据
- `src/pages/MockExamPage.tsx` — 完全重写，支持试卷选择、配图、优化答案显示

## 如何新增试卷
在 `src/data/exam-papers/` 创建新文件，import 到 `index.ts` 的 examPapers 数组即可。
删除只需从数组中移除对应项。
