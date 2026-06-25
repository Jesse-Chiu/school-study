/**
 * 道法知识脑图 Markdown 生成器
 * - 总览模式（all）：展示4个单元的主要知识点
 * - 单元模式（unitX）：展示单个单元的详细知识点
 */
import type { MindMapNode } from '@/lib/types/mindmap-types';
import daoMindMap from '@/data/dao-mindmap';

/**
 * 递归生成节点的 Markdown
 */
function renderNode(node: MindMapNode, depth: number = 0): string {
  if (!node) return '';
  
  let md = '';
  const indent = '  '.repeat(depth > 0 ? 1 : 0); // 根节点不缩进
  
  // 根节点用 #，一级节点用 ##，其他用列表
  if (depth === 0) {
    md += `# ${node.label}\n\n`;
  } else if (depth === 1) {
    md += `## ${node.label}\n\n`;
  } else if (depth === 2) {
    md += `### ${node.label}\n\n`;
  } else {
    md += `${indent}- **${node.label}**\n`;
  }
  
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      md += renderNode(child, depth + 1);
    }
  }
  
  return md;
}

/**
 * 生成脑图 Markdown
 * @param unitId - 'all' 为全局概览，'unitX' 为单元详细版
 */
export function generateDaoMindMapMD(unitId: string = 'all'): string {
  if (!daoMindMap || !daoMindMap.children) return '# 未找到数据';
  
  if (unitId === 'all') {
    // 总览模式
    let md = '# ⚖️ 七年级下册道法 · 期末总复习\n\n';
    for (const unit of daoMindMap.children) {
      md += renderNode(unit, 1);
    }
    return md;
  } else {
    // 单元模式
    const unit = daoMindMap.children.find((u: any) => u.id === `dao-${unitId}`);
    if (!unit) return '# 未找到数据';
    return renderNode(unit, 0);
  }
}

export default generateDaoMindMapMD;
