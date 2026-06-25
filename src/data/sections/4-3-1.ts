import type { SectionData } from '@/lib/types';

const sectionData: SectionData = {
  id: '4-3-1',
  unitId: 'unit4',
  chapterId: 'ch4-3',
  title: '第一节 呼吸道对空气的处理',
  learningGoals: [
    '描述呼吸系统的组成',
    '说明呼吸道的作用',
  ],
  knowledgePoints: [
    {
      id: '4-3-1-k1',
      title: '一、呼吸系统的组成',
      content: '呼吸系统由<strong>呼吸道</strong>和<strong>肺</strong>组成：<br/><br/><strong>呼吸道</strong>（气体进出肺的通道）：<br/>鼻 → <strong>咽</strong> → <strong>喉</strong> → 气管 → 支气管<br/><br/><strong>肺</strong>：<strong>气体交换的场所</strong>（呼吸系统的主要器官）<br/><br/>注意：<strong>咽</strong>是<strong>呼吸道和消化道的共同通道</strong>。',
      keyTerms: ['呼吸道', '肺', '鼻', '咽', '喉', '气管', '支气管', '共同通道'],
      children: [],
    },
    {
      id: '4-3-1-k2',
      title: '二、呼吸道的作用',
      content: '呼吸道不仅能保证<strong>气体顺畅通过</strong>，还能对吸入的气体进行处理：<br/><br/>1. <strong>清洁</strong>：鼻毛阻挡灰尘，黏液粘住灰尘和细菌<br/>2. <strong>温暖</strong>：鼻腔内毛细血管温暖冷空气<br/>3. <strong>湿润</strong>：黏膜分泌黏液，湿润空气<br/><br/>但呼吸道的处理能力是<strong>有限的</strong>，空气严重污染时仍会危害健康。',
      keyTerms: ['清洁', '温暖', '湿润', '鼻毛', '黏液', '毛细血管'],
      children: [],
    },
    {
      id: '4-3-1-k3',
      title: '三、喉与发声',
      content: '<strong>喉</strong>不仅是气体通道，还有<strong>发声</strong>功能。<br/>发声原理：喉部有声带，当气流通过时引起声带振动而发声。<br/><br/>青春期后，男性喉部增大，声带变长变厚，声音变低沉（变声）。',
      keyTerms: ['喉', '声带', '发声', '变声'],
      children: [],
    },
  ],
  exercises: [
    {
      id: '4-3-1-ex1',
      type: 'true-false',
      question: '呼吸道只是气体进出肺的通道，没有其它作用。',
      answer: '错误',
      explanation: '呼吸道不仅能保证气体顺畅通过，还能对吸入的空气进行清洁、温暖和湿润处理，使到达肺的空气更适合气体交换。',
      difficulty: 1,
    },
    {
      id: '4-3-1-ex2',
      type: 'single-choice',
      question: '呼吸道和消化道的共同通道是？',
      options: ['A. 口腔', 'B. 鼻腔', 'C. 咽', 'D. 喉'],
      answer: 'C',
      explanation: '咽是呼吸道和消化道的共同通道。食物和空气都要经过咽。吞咽时，会厌软骨盖住喉口，防止食物进入气管。',
      difficulty: 1,
    },
    {
      id: '4-3-1-ex3',
      type: 'single-choice',
      question: '用鼻呼吸比用口呼吸好，主要原因是？',
      options: ['A. 鼻腔能清洁、温暖和湿润空气', 'B. 鼻腔更宽大', 'C. 鼻腔中有嗅觉感受器', 'D. 用口呼吸会吸入更多细菌'],
      answer: 'A',
      explanation: '鼻腔内有鼻毛（清洁）、毛细血管（温暖）、黏液（湿润），能对吸入的空气进行处理，使空气更适合肺部。口呼吸没有这些处理功能。',
      difficulty: 1,
    },
  ],
};

export default sectionData;
