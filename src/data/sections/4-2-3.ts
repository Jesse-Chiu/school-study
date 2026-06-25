import type { SectionData } from '@/lib/types';

const sectionData: SectionData = {
  id: '4-2-3',
  unitId: 'unit4',
  chapterId: 'ch4-2',
  title: '第三节 合理营养与食品安全',
  learningGoals: [
    '说明什么是合理营养',
    '关注食品安全',
  ],
  knowledgePoints: [
    {
      id: '4-2-3-k1',
      title: '一、合理营养',
      content: '<strong>合理营养</strong>是指全面而平衡的营养。<br/>• <strong>全面</strong>：摄取的营养素种类齐全<br/>• <strong>平衡</strong>：摄取的营养素量适当，不多也不少<br/><br/><strong>平衡膳食宝塔</strong>（从下到上）：<br/>谷物类（底层，最多）→ 蔬菜水果类 → 肉蛋类等 → 奶豆类 → 油脂类（顶层，最少）<br/><br/>三餐能量分配：<strong>早餐30%、午餐40%、晚餐30%</strong>。',
      keyTerms: ['合理营养', '平衡膳食宝塔', '全面', '平衡'],
      children: [],
    },
    {
      id: '4-2-3-k2',
      title: '二、食品安全',
      content: '注意事项：<br/>• 购买食品时注意<strong>保质期</strong>和<strong>生产日期</strong><br/>• 食用蔬菜水果前要<strong>浸泡、冲洗</strong>（去除农药残留）<br/>• 不吃<strong>有毒</strong>的食品（如发芽的马铃薯、有毒蘑菇）<br/>• 厨房和炊具要<strong>保持清洁</strong><br/>• 购买食品认准<strong>QS标志</strong>（质量安全标志）',
      keyTerms: ['保质期', '生产日期', 'QS标志', '农药残留', '食品安全'],
      children: [],
    },
  ],
  exercises: [
    {
      id: '4-2-3-ex1',
      type: 'true-false',
      question: '为了保持身材，青少年应该少吃或不吃主食（谷物类）。',
      answer: '错误',
      explanation: '谷物类（主食）是人体能量的主要来源，青少年正处于生长发育期，需要充足的能量。应保持均衡饮食，不能极端节食。',
      difficulty: 1,
    },
    {
      id: '4-2-3-ex2',
      type: 'single-choice',
      question: '根据平衡膳食宝塔，每天摄入量最多的食物应该是？',
      options: ['A. 谷物类', 'B. 蔬菜水果类', 'C. 肉蛋鱼类', 'D. 油脂类'],
      answer: 'A',
      explanation: '平衡膳食宝塔底层是谷物类，每天摄入量最多，因为谷物类是人体能量的主要来源。油脂类在顶层，摄入量应最少。',
      difficulty: 1,
    },
    {
      id: '4-2-3-ex3',
      type: 'single-choice',
      question: '购买包装食品时，最需要关注的标志和信息是？',
      options: ['A. 品牌', 'B. 保质期和生产日期', 'C. 价格', 'D. 包装是否精美'],
      answer: 'B',
      explanation: '购买食品时，最重要的是查看保质期和生产日期，确保食品在保质期内，避免购买过期食品导致食物中毒。',
      difficulty: 1,
    },
  ],
};

export default sectionData;
