import type { SectionData } from '@/lib/types';

const sectionData: SectionData = {
  id: '3-2-4',
  unitId: 'unit3',
  chapterId: 'ch3-2',
  title: '第四节 植物在自然界中的作用',
  learningGoals: [
    '说明植物为生物圈中的其他生物提供有机物',
    '说明植物参与生物圈的水循环',
    '说明植物维持生物圈的碳氧平衡',
  ],
  knowledgePoints: [
    {
      id: '3-2-4-k1',
      title: '一、植物为其他生物提供有机物',
      content: '绿色植物通过<strong>光合作用</strong>制造有机物，不仅满足自身需要，还为其他生物提供<strong>食物来源</strong>。<br/><br/>植食性动物直接以植物为食，肉食性动物间接以植物为食，细菌和真菌分解植物遗体获取能量。<br/><br/>"包括人类在内的其他生物是攀附着植物的茎蔓才站在这个星球上的。"',
      keyTerms: ['有机物', '食物来源', '食物链', '分解'],
      children: [],
    },
    {
      id: '3-2-4-k2',
      title: '二、植物参与生物圈的水循环',
      content: '植物的<strong>蒸腾作用</strong>参与水循环：<br/><br/>1. 植物吸收的水，约99%通过蒸腾作用散失到大气中<br/>2. 蒸腾作用提高大气湿度，增加降水<br/>3. 植物的根和枯枝落叶能涵养水源，补充地下水<br/><br/>"一片森林就是一座绿色的水库"。保护森林和植被对维持水循环具有重要意义。',
      keyTerms: ['蒸腾作用', '水循环', '大气湿度', '涵养水源', '绿色水库'],
      children: [],
    },
    {
      id: '3-2-4-k3',
      title: '三、植物维持碳氧平衡',
      content: '<strong>碳氧平衡</strong>：植物通过光合作用吸收二氧化碳、释放氧气，维持大气中二氧化碳和氧气的相对平衡。<br/><br/><strong>碳中和</strong>：碳排放量 = 碳吸收量。<br/>• 植物通过光合作用吸收CO₂（碳吸收）<br/>• 人类活动（化石燃料燃烧等）排放CO₂（碳排放）<br/>• 实现碳中和需要：减少排放 + 增加吸收（植树造林）<br/><br/>我国承诺：<strong>2030年前碳达峰，2060年前碳中和</strong>。',
      keyTerms: ['碳氧平衡', '碳中和', '碳达峰', '碳排放', '碳吸收'],
      children: [],
    },
    {
      id: '3-2-4-k4',
      title: '四、保护植被，从我做起',
      content: '我国已颁布《森林法》和《草原法》，实行退耕还林、还草、还湖。<br/>每年的<strong>3月12日</strong>为植树节。<br/><br/>个人可以做到：<br/>• 爱护植被，不践踏草坪<br/>• 节约用纸（减少木材消耗）<br/>• 参加植树活动<br/>• 低碳生活（步行、骑车、节约用电）',
      keyTerms: ['植树节', '退耕还林', '低碳生活', '爱护植被'],
      children: [],
    },
  ],
  exercises: [
    {
      id: '3-2-4-ex1',
      type: 'true-false',
      question: '植物的蒸腾作用对植物自身是一种浪费，因为99%的水都散失了。',
      answer: '错误',
      explanation: '蒸腾作用对植物有重要意义：拉动水和无机盐运输、降低叶片温度、参与水循环。不是浪费。',
      difficulty: 1,
    },
    {
      id: '3-2-4-ex2',
      type: 'single-choice',
      question: '维持生物圈碳氧平衡主要依靠植物的哪种作用？',
      options: ['A. 光合作用', 'B. 呼吸作用', 'C. 蒸腾作用', 'D. 吸收作用'],
      answer: 'A',
      explanation: '光合作用吸收二氧化碳、释放氧气，是维持碳氧平衡的主要过程。',
      difficulty: 1,
    },
    {
      id: '3-2-4-ex3',
      type: 'single-choice',
      question: '我国实现碳中和的目标年份是？',
      options: ['A. 2030年', 'B. 2040年', 'C. 2060年', 'D. 2050年'],
      answer: 'C',
      explanation: '我国宣布：二氧化碳排放力争于2030年前达到峰值（碳达峰），努力争取2060年前实现碳中和。',
      difficulty: 1,
    },
    {
      id: '3-2-4-ex4',
      type: 'fill-blank',
      question: '在生物圈水循环中，水通过___和植物___进入大气，再以___形式回到陆地，形成循环。黄河水"奔流到海"后又会通过___重新参与循环。',
      answer: ['蒸发', '蒸腾作用', '降水', '蒸发'],
      explanation: '水循环是一个闭合的循环系统，陆地水通过蒸发和植物蒸腾进入大气，再以降水形式回到陆地，形成循环。',
      difficulty: 3,
    },
  ],
};

export default sectionData;
