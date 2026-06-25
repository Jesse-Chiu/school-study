import type { UnitInfo } from '@/lib/types';

export const units: UnitInfo[] = [
  {
    id: 'unit3',
    title: '第三单元 植物的生活',
    chapters: [
      {
        id: 'ch3-1',
        title: '第一章 被子植物的一生',
        unitId: 'unit3',
        sections: [
          { id: '3-1-1', title: '第一节 种子的萌发', unitId: 'unit3', chapterId: 'ch3-1' },
          { id: '3-1-2', title: '第二节 植株的生长', unitId: 'unit3', chapterId: 'ch3-1' },
          { id: '3-1-3', title: '第三节 开花和结果', unitId: 'unit3', chapterId: 'ch3-1' },
        ],
      },
      {
        id: 'ch3-2',
        title: '第二章 植物体内的物质与能量变化',
        unitId: 'unit3',
        sections: [
          { id: '3-2-1', title: '第一节 水的利用与散失', unitId: 'unit3', chapterId: 'ch3-2' },
          { id: '3-2-2', title: '第二节 光合作用', unitId: 'unit3', chapterId: 'ch3-2' },
          { id: '3-2-3', title: '第三节 呼吸作用', unitId: 'unit3', chapterId: 'ch3-2' },
          { id: '3-2-4', title: '第四节 植物在自然界中的作用', unitId: 'unit3', chapterId: 'ch3-2' },
        ],
      },
    ],
  },
  {
    id: 'unit4',
    title: '第四单元 人体生理与健康（一）',
    chapters: [
      {
        id: 'ch4-1',
        title: '第一章 人的生殖和发育',
        unitId: 'unit4',
        sections: [
          { id: '4-1-1', title: '第一节 人的生殖', unitId: 'unit4', chapterId: 'ch4-1' },
          { id: '4-1-2', title: '第二节 青春期', unitId: 'unit4', chapterId: 'ch4-1' },
        ],
      },
      {
        id: 'ch4-2',
        title: '第二章 人体的营养',
        unitId: 'unit4',
        sections: [
          { id: '4-2-1', title: '第一节 食物中的营养物质', unitId: 'unit4', chapterId: 'ch4-2' },
          { id: '4-2-2', title: '第二节 消化和吸收', unitId: 'unit4', chapterId: 'ch4-2' },
          { id: '4-2-3', title: '第三节 合理营养与食品安全', unitId: 'unit4', chapterId: 'ch4-2' },
        ],
      },
      {
        id: 'ch4-3',
        title: '第三章 人体的呼吸',
        unitId: 'unit4',
        sections: [
          { id: '4-3-1', title: '第一节 呼吸道对空气的处理', unitId: 'unit4', chapterId: 'ch4-3' },
          { id: '4-3-2', title: '第二节 发生在肺内的气体交换', unitId: 'unit4', chapterId: 'ch4-3' },
        ],
      },
      {
        id: 'ch4-4',
        title: '第四章 人体内物质的运输',
        unitId: 'unit4',
        sections: [
          { id: '4-4-1', title: '第一节 流动的组织—血液', unitId: 'unit4', chapterId: 'ch4-4' },
          { id: '4-4-2', title: '第二节 血流的管道—血管', unitId: 'unit4', chapterId: 'ch4-4' },
          { id: '4-4-3', title: '第三节 输送血液的泵—心脏', unitId: 'unit4', chapterId: 'ch4-4' },
        ],
      },
      {
        id: 'ch4-5',
        title: '第五章 人体内废物的排出',
        unitId: 'unit4',
        sections: [
          { id: '4-5', title: '人体内废物的排出', unitId: 'unit4', chapterId: 'ch4-5' },
        ],
      },
    ],
  },
];

// 根据 section id 查找单元和章节信息
export function getSectionInfo(sectionId: string) {
  for (const unit of units) {
    for (const chapter of unit.chapters) {
      const section = chapter.sections.find(s => s.id === sectionId);
      if (section) return { unit, chapter, section };
    }
  }
  return null;
}

export function getUnitById(unitId: string) {
  return units.find(u => u.id === unitId) || null;
}

export function getChapterById(chapterId: string) {
  for (const unit of units) {
    const chapter = unit.chapters.find(c => c.id === chapterId);
    if (chapter) return { unit, chapter };
  }
  return null;
}
