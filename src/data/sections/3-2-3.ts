import type { SectionData } from '@/lib/types';

const sectionData: SectionData = {
  id: '3-2-3',
  unitId: 'unit3',
  chapterId: 'ch3-2',
  title: '第三节 呼吸作用',
  learningGoals: [
    '描述呼吸作用的过程',
    '比较光合作用和呼吸作用的区别与联系',
    '举例说明呼吸作用原理在农业生产上的应用',
  ],
  knowledgePoints: [
    {
      id: '3-2-3-k1',
      title: '一、呼吸作用的概念和公式',
      content: '<strong>呼吸作用</strong>：细胞利用<strong>氧气</strong>，将<strong>有机物</strong>分解成二氧化碳和水，并且将储存在有机物中的<strong>能量释放</strong>出来，供给生命活动的需要。<br/><br/><strong>公式</strong>：<br/>有机物 + 氧气 → 二氧化碳 + 水 + <strong>能量</strong><br/><br/>呼吸作用在<strong>所有活细胞</strong>中进行（线粒体是主要场所）。',
      keyTerms: ['呼吸作用', '有机物', '氧气', '二氧化碳', '水', '能量', '线粒体'],
      children: [],
    },
    {
      id: '3-2-3-k2',
      title: '二、光合作用与呼吸作用的区别',
      content: '<table class="text-xs"><tr><th>项目</th><th>光合作用</th><th>呼吸作用</th></tr><tr><td>场所</td><td>叶绿体</td><td>线粒体（主要）</td></tr><tr><td>条件</td><td>需要光</td><td>有光无光都进行</td></tr><tr><td>原料</td><td>CO₂、水</td><td>有机物、O₂</td></tr><tr><td>产物</td><td>有机物、O₂</td><td>CO₂、水</td></tr><tr><td>能量</td><td>储存能量</td><td>释放能量</td></tr></table><br/><strong>联系</strong>：光合作用制造的有机物，是呼吸作用的<strong>原料</strong>；呼吸作用释放的能量，是光合作用<strong>储存</strong>在有机物中的能量。',
      keyTerms: ['区别', '联系', '储存能量', '释放能量'],
      children: [],
    },
    {
      id: '3-2-3-k3',
      title: '三、呼吸作用原理的应用',
      content: '农业应用：<br/>• <strong>促进呼吸作用</strong>：中耕松土（增加土壤空气）、及时排涝<br/>• <strong>抑制呼吸作用</strong>：低温保存水果蔬菜、气调储藏（充氮气）、干燥储存粮食<br/><br/>原理：降低温度、减少氧气含量可以<strong>抑制呼吸作用</strong>，减少有机物消耗，延长保存时间。',
      keyTerms: ['促进', '抑制', '低温', '充氮', '保存'],
      children: [],
    },
  ],
  exercises: [
    {
      id: '3-2-3-ex1',
      type: 'true-false',
      question: '光合作用只在白天进行，呼吸作用只在夜晚进行。',
      answer: '错误',
      explanation: '光合作用需要光，只在白天（有光时）进行。但呼吸作用在有光和无光条件下都进行（所有活细胞时刻都在进行呼吸作用）。',
      difficulty: 1,
    },
    {
      id: '3-2-3-ex2',
      type: 'single-choice',
      question: '呼吸作用的实质是？',
      options: ['A. 合成有机物，储存能量', 'B. 合成有机物，释放能量', 'C. 分解有机物，释放能量', 'D. 分解有机物，储存能量'],
      answer: 'C',
      explanation: '呼吸作用的实质是分解有机物，释放能量，供给生命活动需要。光合作用则是合成有机物、储存能量。',
      difficulty: 1,
    },
    {
      id: '3-2-3-ex3',
      type: 'single-choice',
      question: '下列农业措施中，主要是为了抑制呼吸作用的是？',
      options: ['A. 农田淹水后及时排涝', 'B. 种庄稼时合理密植', 'C. 向封闭粮仓充入氮气并保持低温', 'D. 给植物松土'],
      answer: 'C',
      explanation: '充入氮气（减少氧气）并保持低温，可以抑制呼吸作用，减少有机物消耗，利于粮食保存。A、B、D都是促进呼吸作用的措施。',
      difficulty: 2,
    },
    {
      id: '3-2-3-ex4',
      type: 'multi-choice',
      question: '下列哪些过程与呼吸作用有关？（多选）',
      options: ['A. 释放能量供给生命活动', 'B. 产生氧气', 'C. 消耗有机物', 'D. 在线粒体中进行'],
      answer: ['A', 'C', 'D'],
      explanation: '呼吸作用分解有机物、释放能量（供生命活动利用）、主要在线粒体中进行。产生氧气是光合作用的过程，不是呼吸作用。',
      difficulty: 2,
    },
    {
      id: '3-2-3-ex5',
      type: 'fill-blank',
      question: '光合作用___能量，呼吸作用___能量。两者共同维持生物圈的___平衡。',
      answer: ['储存', '释放', '碳氧'],
      explanation: '光合作用和呼吸作用是植物体内两个最重要的生理过程，它们既对立又统一，共同维持植物的生命活动和生物圈的平衡。',
      difficulty: 2,
    },
  ],
};

export default sectionData;
