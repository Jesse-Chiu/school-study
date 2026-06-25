/**
 * 错题本 localStorage 工具
 * key: bio-wrong-book
 */

export interface WrongItem {
  id: string;
  question: string;
  type: string;
  options?: string[];
  answer: any; // 支持 boolean | number | number[] | string
  explanation: string;
  knowledgePoint?: string;
  sectionId: string;
  addedAt: number; // Date.now()
}

const KEY = 'bio-wrong-book';

export function getWrongItems(): WrongItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** 添加错题（同一 id 不重复添加） */
export function addWrongItem(item: WrongItem): void {
  const items = getWrongItems();
  if (items.some(x => x.id === item.id)) return;
  items.unshift(item);
  localStorage.setItem(KEY, JSON.stringify(items));
}

/** 移除一题 */
export function removeWrongItem(id: string): void {
  const items = getWrongItems().filter(x => x.id !== id);
  localStorage.setItem(KEY, JSON.stringify(items));
}

/** 清空错题本 */
export function clearWrongBook(): void {
  localStorage.removeItem(KEY);
}

/** 获取所有错题（去重后） */
export function getWrongCount(): number {
  return getWrongItems().length;
}
