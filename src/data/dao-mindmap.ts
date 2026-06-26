import type { MindMapNode } from '@/lib/types/mindmap-types';

/**
 * 道法七年级下册知识脑图数据
 * 结构：4个单元 → 11课 → 知识点
 */

// 第四单元：生活在法治社会
const unit4: MindMapNode = {
  id: 'dao-u4',
  label: '第四单元 生活在法治社会',
  children: [
    {
      id: 'dao-u4-c9',
      label: '第9课 法律为我们护航',
      children: [
        {
          id: 'dao-u4-c9-1',
          label: '法律的本质与作用',
          children: [
            { id: 'dao-u4-c9-1-1', label: '法律是治理国家的重器' },
            { id: 'dao-u4-c9-1-2', label: '法律保障生活' },
            { id: 'dao-u4-c9-1-3', label: '法律维护秩序' },
          ]
        },
        {
          id: 'dao-u4-c9-2',
          label: '法律护我们成长',
          children: [
            { id: 'dao-u4-c9-2-1', label: '法律特殊保护' },
            { id: 'dao-u4-c9-2-2', label: '未成年人保护' },
            { id: 'dao-u4-c9-2-3', label: '六大保护体系' },
          ]
        },
      ]
    },
    {
      id: 'dao-u4-c10',
      label: '第10课 法律伴我们成长',
      children: [
        {
          id: 'dao-u4-c10-1',
          label: '学会依法办事',
          children: [
            { id: 'dao-u4-c10-1-1', label: '树立法治意识' },
            { id: 'dao-u4-c10-1-2', label: '养成守法习惯' },
            { id: 'dao-u4-c10-1-3', label: '依法维护权益' },
          ]
        },
        {
          id: 'dao-u4-c10-2',
          label: '预防违法犯罪',
          children: [
            { id: 'dao-u4-c10-2-1', label: '认清违法危害' },
            { id: 'dao-u4-c10-2-2', label: '远离不良行为' },
            { id: 'dao-u4-c10-2-3', label: '防微杜渐' },
          ]
        },
      ]
    },
    {
      id: 'dao-u4-c11',
      label: '第11课 树立总体国家安全观',
      children: [
        {
          id: 'dao-u4-c11-1',
          label: '国家安全重要性',
          children: [
            { id: 'dao-u4-c11-1-1', label: '国家安全是头等大事' },
            { id: 'dao-u4-c11-1-2', label: '维护国家案例' },
          ]
        },
        {
          id: 'dao-u4-c11-2',
          label: '履行国防义务',
          children: [
            { id: 'dao-u4-c11-2-1', label: '依法服兵役' },
            { id: 'dao-u4-c11-2-2', label: '保守国家秘密' },
          ]
        },
      ]
    },
  ]
};

// 第三单元：传承中华优秀传统文化
const unit3: MindMapNode = {
  id: 'dao-u3',
  label: '第三单元 传承中华优秀传统文化',
  children: [
    {
      id: 'dao-u3-c6',
      label: '第6课 传承核心思想理念',
      children: [
        {
          id: 'dao-u3-c6-1',
          label: '中华优秀传统文化的地位',
          children: [
            { id: 'dao-u3-c6-1-1', label: '中华民族的根和魂' },
            { id: 'dao-u3-c6-1-2', label: '涵养社会主义核心价值观' },
          ]
        },
        {
          id: 'dao-u3-c6-2',
          label: '核心思想理念',
          children: [
            { id: 'dao-u3-c6-2-1', label: '讲仁爱' },
            { id: 'dao-u3-c6-2-2', label: '重民本' },
            { id: 'dao-u3-c6-2-3', label: '守诚信' },
            { id: 'dao-u3-c6-2-4', label: '崇正义' },
            { id: 'dao-u3-c6-2-5', label: '尚和合' },
            { id: 'dao-u3-c6-2-6', label: '求大同' },
          ]
        },
      ]
    },
    {
      id: 'dao-u3-c7',
      label: '第7课 弘扬中华人文精神',
      children: [
        {
          id: 'dao-u3-c7-1',
          label: '中华人文精神的内容',
          children: [
            { id: 'dao-u3-c7-1-1', label: '求同存异' },
            { id: 'dao-u3-c7-1-2', label: '文以载道' },
            { id: 'dao-u3-c7-1-3', label: '俭约自守' },
          ]
        },
        {
          id: 'dao-u3-c7-2',
          label: '弘扬人文精神',
          children: [
            { id: 'dao-u3-c7-2-1', label: '促进社会和谐' },
            { id: 'dao-u3-c7-2-2', label: '增进文化自信' },
          ]
        },
      ]
    },
    {
      id: 'dao-u3-c8',
      label: '第8课 践行中华传统美德',
      children: [
        {
          id: 'dao-u3-c8-1',
          label: '中华传统美德内容',
          children: [
            { id: 'dao-u3-c8-1-1', label: '孝敬父母' },
            { id: 'dao-u3-c8-1-2', label: '尊师重道' },
            { id: 'dao-u3-c8-1-3', label: '团结友爱' },
            { id: 'dao-u3-c8-1-4', label: '勤奋好学' },
            { id: 'dao-u3-c8-1-5', label: '自强不息' },
          ]
        },
        {
          id: 'dao-u3-c8-2',
          label: '践行传统美德',
          children: [
            { id: 'dao-u3-c8-2-1', label: '潜移默化' },
            { id: 'dao-u3-c8-2-2', label: '身体力行' },
          ]
        },
      ]
    },
  ]
};

// 第二单元：焕发青春活力
const unit2: MindMapNode = {
  id: 'dao-u2',
  label: '第二单元 焕发青春活力',
  children: [
    {
      id: 'dao-u2-c3',
      label: '第3课 人贵自尊',
      children: [
        {
          id: 'dao-u2-c3-1',
          label: '自尊的含义',
          children: [
            { id: 'dao-u2-c3-1-1', label: '自我尊重' },
            { id: 'dao-u2-c3-1-2', label: '赢得尊重' },
          ]
        },
        {
          id: 'dao-u2-c3-2',
          label: '自尊的表现',
          children: [
            { id: 'dao-u2-c3-2-1', label: '维护人格尊严' },
            { id: 'dao-u2-c3-2-2', label: '适度的自尊' },
          ]
        },
      ]
    },
    {
      id: 'dao-u2-c4',
      label: '第4课 自信给人力量',
      children: [
        {
          id: 'dao-u2-c4-1',
          label: '自信的重要性',
          children: [
            { id: 'dao-u2-c4-1-1', label: '自信是成功的基石' },
            { id: 'dao-u2-c4-1-2', label: '自信激发潜能' },
          ]
        },
        {
          id: 'dao-u2-c4-2',
          label: '培养自信品质',
          children: [
            { id: 'dao-u2-c4-2-1', label: '欣赏自己' },
            { id: 'dao-u2-c4-2-2', label: '实践锻炼' },
            { id: 'dao-u2-c4-2-3', label: '积累成功' },
          ]
        },
      ]
    },
    {
      id: 'dao-u2-c5',
      label: '第5课 人生当自强',
      children: [
        {
          id: 'dao-u2-c5-1',
          label: '自强的意义',
          children: [
            { id: 'dao-u2-c5-1-1', label: '进取的动力' },
            { id: 'dao-u2-c5-1-2', label: '通向成功的阶梯' },
          ]
        },
        {
          id: 'dao-u2-c5-2',
          label: '如何做到自强',
          children: [
            { id: 'dao-u2-c5-2-1', label: '志存高远' },
            { id: 'dao-u2-c5-2-2', label: '勇于面对' },
            { id: 'dao-u2-c5-2-3', label: '战胜自我' },
          ]
        },
      ]
    },
  ]
};

// 第一单元：珍惜青春时光
const unit1: MindMapNode = {
  id: 'dao-u1',
  label: '第一单元 珍惜青春时光',
  children: [
    {
      id: 'dao-u1-c1',
      label: '第1课 青春正当时',
      children: [
        {
          id: 'dao-u1-c1-1',
          label: '青春的生理变化',
          children: [
            { id: 'dao-u1-c1-1-1', label: '身体外形的变化' },
            { id: 'dao-u1-c1-1-2', label: '内部器官的完善' },
            { id: 'dao-u1-c1-1-3', label: '性机能的成熟' },
          ]
        },
        {
          id: 'dao-u1-c1-2',
          label: '青春的心理变化',
          children: [
            { id: 'dao-u1-c1-2-1', label: '智力逐步发展到高峰期' },
            { id: 'dao-u1-c1-2-2', label: '自我意识迅速发展' },
            { id: 'dao-u1-c1-2-3', label: '情感更加丰富' },
          ]
        },
        {
          id: 'dao-u1-c1-3',
          label: '青春的美好',
          children: [
            { id: 'dao-u1-c1-3-1', label: '青春是活力的象征' },
            { id: 'dao-u1-c1-3-2', label: '青春是智慧的源泉' },
          ]
        },
      ]
    },
    {
      id: 'dao-u1-c2',
      label: '第2课 做情绪情感的主人',
      children: [
        {
          id: 'dao-u1-c2-1',
          label: '情绪的类型',
          children: [
            { id: 'dao-u1-c2-1-1', label: '喜、怒、哀、惧' },
            { id: 'dao-u1-c2-1-2', label: '复杂情绪' },
          ]
        },
        {
          id: 'dao-u1-c2-2',
          label: '情绪的作用',
          children: [
            { id: 'dao-u1-c2-2-1', label: '积极情绪激励向上' },
            { id: 'dao-u1-c2-2-2', label: '消极情绪影响健康' },
          ]
        },
        {
          id: 'dao-u1-c2-3',
          label: '调控情绪的方法',
          children: [
            { id: 'dao-u1-c2-3-1', label: '改变认知评价' },
            { id: 'dao-u1-c2-3-2', label: '转移注意' },
            { id: 'dao-u1-c2-3-3', label: '合理宣泄' },
            { id: 'dao-u1-c2-3-4', label: '放松训练' },
          ]
        },
        {
          id: 'dao-u1-c2-4',
          label: '情感的作用',
          children: [
            { id: 'dao-u1-c2-4-1', label: '情感是人基本的精神需求' },
            { id: 'dao-u1-c2-4-2', label: '情感影响判断选择' },
            { id: 'dao-u1-c2-4-3', label: '情感有助于观察探索' },
          ]
        },
      ]
    },
  ]
};

// 总览脑图
const daoMindMap: MindMapNode = {
  id: 'dao-root',
  label: '道法七年级下册',
  children: [unit1, unit2, unit3, unit4]
};

export default daoMindMap;
