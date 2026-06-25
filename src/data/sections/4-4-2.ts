import type { SectionData } from '@/lib/types';

const sectionData: SectionData = {
  id: '4-4-2',
  unitId: 'unit4',
  chapterId: 'ch4-4',
  title: '第二节 血流的管道—血管',
  learningGoals: [
    '描述动脉、毛细血管和静脉的结构特点',
    '说明不同类型血管的功能',
  ],
  knowledgePoints: [
    {
      id: '4-4-2-k1',
      title: '一、动脉',
      content: '<strong>动脉</strong>：把血液从<strong>心脏</strong>运到<strong>全身各部分</strong>的血管。<br/><br/>特点：<br/>• 管壁<strong>较厚</strong>、弹性<strong>大</strong><br/>• 管腔<strong>较小</strong><br/>• 血流速度<strong>最快</strong><br/>• 分布：一般较深（但颈动脉、桡动脉较浅，可摸到脉搏）<br/><br/>出血特点：<strong>喷出、鲜红色</strong>（压力大），需<strong>近心端</strong>止血。',
      keyTerms: ['动脉', '心脏→全身', '管壁厚', '血流快', '近心端止血'],
      children: [],
    },
    {
      id: '4-4-2-k2',
      title: '二、毛细血管',
      content: '<strong>毛细血管</strong>：连通最小的动脉和静脉之间的血管，是<strong>物质交换</strong>的场所。<br/><br/>特点（适合物质交换）：<br/>• 分布<strong>最广</strong>（遍布全身组织）<br/>• 数量<strong>最多</strong><br/>• 管壁<strong>最薄</strong>（只由一层上皮细胞构成）<br/>• 管腔<strong>最小</strong>（只允许<strong>红细胞单行通过</strong>）<br/>• 血流速度<strong>最慢</strong><br/><br/>意义：利于血液与组织细胞充分进行物质交换。',
      keyTerms: ['毛细血管', '物质交换', '单层细胞', '红细胞单行通过', '血流最慢'],
      children: [],
    },
    {
      id: '4-4-2-k3',
      title: '三、静脉',
      content: '<strong>静脉</strong>：把血液从<strong>全身各部分</strong>运回<strong>心脏</strong>的血管。<br/><br/>特点：<br/>• 管壁<strong>较薄</strong>、弹性<strong>小</strong><br/>• 管腔<strong>较大</strong><br/>• 血流速度<strong>较慢</strong><br/>• 分布：有的较深，有的较浅（如手臂上的"青筋"就是静脉）<br/>• 四肢静脉内有<strong>静脉瓣</strong>（防止血液倒流）<br/><br/>出血特点：<strong>流出、暗红色</strong>，需<strong>远心端</strong>止血。',
      keyTerms: ['静脉', '全身→心脏', '静脉瓣', '远心端止血', '青筋'],
      children: [],
    },
  ],
  exercises: [
    {
      id: '4-4-2-ex1',
      type: 'true-false',
      question: '毛细血管的管壁由多层细胞构成，以防止血液渗漏。',
      answer: '错误',
      explanation: '毛细血管壁只由一层上皮细胞构成，非常薄，这样有利于血液与组织细胞之间进行物质交换。',
      difficulty: 1,
    },
    {
      id: '4-4-2-ex2',
      type: 'single-choice',
      question: '抽血或输液时，针刺入的血管是？',
      options: ['A. 动脉', 'B. 毛细血管', 'C. 静脉', 'D. 以上都可以'],
      answer: 'C',
      explanation: '抽血或输液时通常刺入静脉，因为静脉分布较浅（如手臂上的青筋）、管壁较薄、血流速度较慢，容易穿刺且安全性高。',
      difficulty: 1,
    },
    {
      id: '4-4-2-ex3',
      type: 'single-choice',
      question: '下列属于毛细血管特点的是？',
      options: ['A. 管壁较厚，弹性大', 'B. 管腔大，血流快', 'C. 红细胞单行通过', 'D. 内有静脉瓣'],
      answer: 'C',
      explanation: '毛细血管的管腔极小，只允许红细胞单行通过，这是其适合物质交换的重要特点。A是动脉特点，D是静脉特点。',
      difficulty: 1,
    },
    {
      id: '4-4-2-ex4',
      type: 'multi-choice',
      question: '下列关于三种血管的说法，正确的是？（多选）',
      options: ['A. 动脉出血应近心端止血', 'B. 静脉内有静脉瓣防止血液倒流', 'C. 毛细血管是物质交换的场所', 'D. 动脉管壁最薄'],
      answer: ['A', 'B', 'C'],
      explanation: '动脉出血压力大，应近心端止血；静脉内有静脉瓣防止倒流；毛细血管是物质交换场所；动脉管壁最厚（不是最薄）。',
      difficulty: 2,
    },
  ],
};

export default sectionData;
