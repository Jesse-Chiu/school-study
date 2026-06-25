import type { SectionData } from '@/lib/types';

const sectionData: SectionData = {
  id: '3-2-2',
  unitId: 'unit3',
  chapterId: 'ch3-2',
  title: '第二节 光合作用',
  learningGoals: [
    '阐明光合作用的场所、原料、产物和条件',
    '说明光合作用的实质',
    '举例说明光合作用原理在农业生产上的应用',
  ],
  knowledgePoints: [
    {
      id: '3-2-2-k1',
      title: '一、绿叶在光下制造有机物（经典实验）',
      content: '<strong>实验步骤</strong>：<br/>1. <strong>暗处理</strong>：把天竺葵放到黑暗处一昼夜（耗尽原有淀粉）<br/>2. <strong>遮光</strong>：用黑纸片遮住叶片一部分<br/>3. <strong>光照</strong>：几小时后摘下叶片<br/>4. <strong>脱色</strong>：用酒精隔水加热（脱去叶绿素）<br/>5. <strong>滴碘液</strong>：检验是否有淀粉生成<br/>6. <strong>冲洗</strong>：观察颜色变化<br/><br/><strong>结果</strong>：见光部分<strong>变蓝</strong>（有淀粉），遮光部分<strong>不变蓝</strong>（无淀粉）<br/><strong>结论</strong>：①淀粉是光合作用的产物；②<strong>光是光合作用的必要条件</strong>',
      keyTerms: ['暗处理', '遮光', '脱色', '碘液', '淀粉', '光'],
      children: [],
    },
    {
      id: '3-2-2-k2',
      title: '二、光合作用的定义和公式',
      content: '<strong>光合作用</strong>：绿色植物通过<strong>叶绿体</strong>，利用<strong>光能</strong>，把二氧化碳和水转化成储存能量的<strong>有机物</strong>（如淀粉），并且释放出<strong>氧气</strong>的过程。<br/><br/><strong>公式</strong>：<br/>二氧化碳 + 水 →<sub>（光能/叶绿体）</sub>→ 有机物 + 氧气<br/><br/><strong>六要素</strong>：<br/>• 场所：<strong>叶绿体</strong><br/>• 条件：<strong>光</strong><br/>• 原料：<strong>二氧化碳、水</strong><br/>• 产物：<strong>有机物、氧气</strong>',
      keyTerms: ['光合作用', '叶绿体', '光能', '二氧化碳', '水', '有机物', '氧气'],
      children: [],
    },
    {
      id: '3-2-2-k3',
      title: '三、光合作用的实质和意义',
      content: '<strong>实质</strong>：<br/>• <strong>物质转化</strong>：无机物（CO₂、H₂O）→ 有机物<br/>• <strong>能量转化</strong>：光能 → 化学能（储存在有机物中）<br/><br/><strong>意义</strong>：<br/>1. 满足自身生长、发育、繁殖的需要<br/>2. 为生物圈中其他生物提供<strong>食物和氧气</strong><br/>3. 维持生物圈中<strong>碳氧平衡</strong>',
      keyTerms: ['物质转化', '能量转化', '食物', '氧气', '碳氧平衡'],
      children: [],
    },
    {
      id: '3-2-2-k4',
      title: '四、光合作用在农业上的应用',
      content: '增加产量方法：<br/>• <strong>合理密植</strong>：充分利用光照<br/>• <strong>延长光照时间</strong>：如温室补充光照<br/>• <strong>增加二氧化碳浓度</strong>：如温室通风、施用二氧化碳<br/>• <strong>合理灌溉</strong>：保证水的供应',
      keyTerms: ['合理密植', '延长光照', '增加CO₂'],
      children: [],
    },
  ],
  exercises: [
    {
      id: '3-2-2-ex1',
      type: 'true-false',
      question: '光合作用的原料是有机物和氧气，产物是二氧化碳和水。',
      answer: '错误',
      explanation: '光合作用以二氧化碳和水为原料，产物是有机物和氧气。呼吸作用的原料和产物正好相反。',
      difficulty: 1,
    },
    {
      id: '3-2-2-ex2',
      type: 'single-choice',
      question: '在"绿叶在光下制造有机物"的实验中，把天竺葵先进行暗处理（放到黑暗处一昼夜）的目的是？',
      options: ['A. 消耗掉叶片中原有的淀粉', 'B. 消耗掉叶片中原有的叶绿素', 'C. 使叶片更好地吸收光能', 'D. 使叶片更好地吸收二氧化碳'],
      answer: 'A',
      explanation: '暗处理的目的是让叶片通过呼吸作用消耗掉原有的淀粉，排除原有淀粉对实验结果的干扰。',
      difficulty: 2,
    },
    {
      id: '3-2-2-ex3',
      type: 'single-choice',
      question: '光合作用的场所是？',
      options: ['A. 线粒体', 'B. 叶绿体', 'C. 细胞核', 'D. 液泡'],
      answer: 'B',
      explanation: '光合作用的场所是叶绿体，其中含有光合色素（叶绿素等），能捕获光能。线粒体是呼吸作用的场所。',
      difficulty: 1,
    },
    {
      id: '3-2-2-ex4',
      type: 'single-choice',
      question: '合理密植是为了提高光合作用的效率，其主要原理是？',
      options: ['A. 增加二氧化碳浓度', 'B. 充分利用光照', 'C. 增加温度', 'D. 提供充足的水'],
      answer: 'B',
      explanation: '合理密植可以让每株植物都能充分接受光照，提高光能利用率，从而提高光合作用效率。',
      difficulty: 1,
    },
    {
      id: '3-2-2-ex5',
      type: 'fill-blank',
      question: '光合作用的原料是___和___，条件是___，场所是___，产物是___和___。',
      answer: ['二氧化碳', '水', '光', '叶绿体', '有机物', '氧气'],
      explanation: '光合作用是地球上最重要的化学反应之一，它制造的有机物养活了几乎所有生物，释放的氧气是生物呼吸的来源。',
      difficulty: 2,
    },
  ],
};

export default sectionData;
