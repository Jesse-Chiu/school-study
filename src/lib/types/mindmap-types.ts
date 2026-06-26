/**
 * 知识脑图节点类型
 * 用于道法/历史学科的知识脑图（markmap）数据结构
 */
export interface MindMapNode {
  /** 节点唯一标识 */
  id: string;
  /** 显示标签 */
  label: string;
  /** 子节点 */
  children?: MindMapNode[];
}
