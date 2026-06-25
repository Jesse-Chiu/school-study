import type { SectionData } from '@/lib/types';

const sectionData: SectionData = {
  id: '4-1-2',
  unitId: 'unit4',
  chapterId: 'ch4-1',
  title: '第二节 青春期',
  learningGoals: [
    '描述青春期的身体变化和心理变化',
    '说明青春期卫生保健的重要性',
  ],
  knowledgePoints: [
    {
      id: '4-1-2-k1',
      title: '一、青春期的身体变化',
      content: '<strong>青春期</strong>：一般指10～20岁，是<strong>身体发育和智力发展</strong>的黄金时期。<br/><br/><strong>显著特点</strong>：<strong>身高突增</strong>（下肢骨迅速长长）<br/><br/><strong>生理变化</strong>：<br/>• 男孩：睾丸分泌雄激素 → <strong>出现遗精</strong>、长胡须、喉结突出、声音变粗<br/>• 女孩：卵巢分泌雌激素 → <strong>月经来潮</strong>、骨盆宽大、乳房增大、声音变高<br/><br/><strong>月经</strong>：子宫内膜周期性变化，脱落出血经阴道排出。月经期要注意卫生。',
      keyTerms: ['青春期', '身高突增', '遗精', '月经', '第二性征'],
      children: [],
    },
    {
      id: '4-1-2-k2',
      title: '二、青春期的心理变化',
      content: '心理特点：<br/>• <strong>独立意识</strong>增强，但有依赖性<br/>• <strong>内心世界复杂</strong>，不想与大人交流<br/>• 对异性由疏远到<strong>产生好感</strong><br/>• 情绪<strong>波动大</strong><br/><br/><strong>正确对待</strong>：多与父母、老师沟通，把精力集中在学习和有益的活动上。',
      keyTerms: ['独立意识', '情绪波动', '异性好感', '沟通'],
      children: [],
    },
    {
      id: '4-1-2-k3',
      title: '三、青春期的卫生保健',
      content: '• 注意<strong>个人卫生</strong>（勤洗澡、勤换内衣）<br/>• 女生注意<strong>月经期卫生</strong>（使用清洁卫生巾、避免剧烈运动）<br/>• 保证<strong>充足睡眠</strong><br/>• 适当<strong>体育锻炼</strong><br/>• 合理<strong>营养</strong><br/>• 正确看待身体变化，不自卑、不焦虑',
      keyTerms: ['个人卫生', '月经期卫生', '充足睡眠', '体育锻炼'],
      children: [],
    },
  ],
  exercises: [
    {
      id: '4-1-2-ex1',
      type: 'true-false',
      question: '青春期是指身体完全发育成熟的时期。',
      answer: '错误',
      explanation: '青春期是身体发育和智力发展的黄金时期（约10～20岁），但身体并未完全发育成熟。身体完全成熟一般要到20～25岁左右。',
      difficulty: 1,
    },
    {
      id: '4-1-2-ex2',
      type: 'single-choice',
      question: '青春期的显著特点是？',
      options: ['A. 体重迅速增加', 'B. 身高突增', 'C. 第二性征出现', 'D. 智力迅速提高'],
      answer: 'B',
      explanation: '青春期的显著特点是身高突增，主要是因为下肢骨迅速长长。第二性征出现也是重要变化，但"显著特点"指的是身高突增。',
      difficulty: 1,
    },
    {
      id: '4-1-2-ex3',
      type: 'single-choice',
      question: '下列关于月经的说法，正确的是？',
      options: ['A. 月经是病灶出血', 'B. 月经是卵巢出血', 'C. 月经是子宫内膜周期性脱落出血', 'D. 月经只在青春期出现一次'],
      answer: 'C',
      explanation: '月经是指女孩子进入青春期后，每月一次的子宫内膜脱落出血现象。月经周期一般为28～30天，月经期要注意卫生。',
      difficulty: 1,
    },
    {
      id: '4-1-2-ex4',
      type: 'fill-blank',
      question: '青春期的身体变化主要体现在___和___两个方面，心理变化包括___和___。',
      answer: ['身高突增', '出现第二性征', '独立意识增强', '情绪波动大'],
      explanation: '青春期是身体和心理都发生显著变化的时期，正确了解和对待这些变化，有助于健康成长。',
      difficulty: 2,
    },
  ],
};

export default sectionData;
