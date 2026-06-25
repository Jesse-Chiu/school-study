import type { SectionData } from '@/lib/types';

const sectionData: SectionData = {
  id: '4-3-2',
  unitId: 'unit4',
  chapterId: 'ch4-3',
  title: '第二节 发生在肺内的气体交换',
  learningGoals: [
    '描述肺与外界的气体交换过程',
    '描述肺泡与血液的气体交换过程',
  ],
  knowledgePoints: [
    {
      id: '4-3-2-k1',
      title: '一、肺与外界的气体交换（呼吸运动）',
      content: '<strong>呼吸运动</strong>：通过<strong>肋间肌</strong>和<strong>膈肌</strong>的收缩和舒张，使胸廓扩大和缩小，完成吸气和呼气。<br/><br/><strong>吸气</strong>：肋间肌和膈肌<strong>收缩</strong> → 胸廓<strong>扩大</strong> → 肺内压<strong>低于</strong>大气压 → 气体进入肺<br/><strong>呼气</strong>：肋间肌和膈肌<strong>舒张</strong> → 胸廓<strong>缩小</strong> → 肺内压<strong>高于</strong>大气压 → 气体排出肺<br/><br/>平静呼吸时，<strong>吸气是主动的</strong>（肌肉收缩），<strong>呼气是被动的</strong>（肌肉舒张）。',
      keyTerms: ['呼吸运动', '肋间肌', '膈肌', '吸气', '呼气', '胸廓'],
      children: [],
    },
    {
      id: '4-3-2-k2',
      title: '二、肺泡与血液的气体交换',
      content: '气体交换在<strong>肺泡</strong>与血液之间进行：<br/><br/>• <strong>肺泡</strong>：肺泡壁和毛细血管壁都只由<strong>一层上皮细胞</strong>构成，适合气体交换<br/>• <strong>过程</strong>：肺泡中氧气浓度高 → 氧气扩散进入血液；血液中二氧化碳浓度高 → 二氧化碳扩散进入肺泡<br/>• <strong>结果</strong>：静脉血（含CO₂多、O₂少）→ 动脉血（含O₂多、CO₂少）<br/><br/>进入血液中的氧气通过<strong>红细胞中的血红蛋白</strong>运输。',
      keyTerms: ['肺泡', '气体交换', '扩散', '血红蛋白', '静脉血', '动脉血'],
      children: [],
    },
    {
      id: '4-3-2-k3',
      title: '三、肺泡适合气体交换的特点',
      content: '1. <strong>数量多</strong>（约3亿个肺泡，表面积约100平方米）<br/>2. <strong>壁薄</strong>：肺泡壁和毛细血管壁都只由一层上皮细胞构成<br/>3. <strong>缠绕丰富的毛细血管</strong><br/>4. <strong>肺泡壁外有弹性纤维</strong>（利于肺泡回缩）',
      keyTerms: ['数量多', '壁薄', '毛细血管', '表面积'],
      children: [],
    },
  ],
  exercises: [
    {
      id: '4-3-2-ex1',
      type: 'true-false',
      question: '吸气时，肋间肌和膈肌舒张，胸廓扩大。',
      answer: '错误',
      explanation: '吸气时，肋间肌和膈肌收缩（不是舒张），胸廓扩大，肺内压低于大气压，气体进入肺。呼气时肌肉才舒张。',
      difficulty: 1,
    },
    {
      id: '4-3-2-ex2',
      type: 'single-choice',
      question: '肺泡与血液之间进行气体交换的结构基础是？',
      options: ['A. 肺泡壁和毛细血管壁都很薄（一层上皮细胞）', 'B. 肺泡数量多', 'C. 肺泡外有弹性纤维', 'D. 支气管在肺内分支多'],
      answer: 'A',
      explanation: '肺泡壁和毛细血管壁都只由一层上皮细胞构成，气体可以很容易地通过扩散作用进行交换。这是肺泡与血液进行气体交换的结构基础。',
      difficulty: 2,
    },
    {
      id: '4-3-2-ex3',
      type: 'single-choice',
      question: '经过肺泡内的气体交换后，血液发生的变化是？',
      options: ['A. 静脉血变成动脉血', 'B. 动脉血变成静脉血', 'C. 氧气减少，二氧化碳增多', 'D. 颜色变暗红'],
      answer: 'A',
      explanation: '肺泡中氧气浓度高，血液中二氧化碳浓度高。气体交换后，血液中氧气增多、二氧化碳减少，静脉血变成含氧丰富的动脉血（颜色鲜红）。',
      difficulty: 1,
    },
  ],
};

export default sectionData;
