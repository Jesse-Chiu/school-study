/**
 * 知识脑图 Markdown 生成器（增强版）
 * - 完整版（all）：展示所有知识点，截断长文本到 150 字
 * - 单元版（unitX）：更详细，不截断，嵌入插图
 */
import type { SectionData, KnowledgePoint } from '@/lib/types';
import { units } from '@/data/structure';
import { findIllustration } from './mindmap-illustrations';

// 导入所有小节数据
import s311 from '@/data/sections/3-1-1';
import s312 from '@/data/sections/3-1-2';
import s313 from '@/data/sections/3-1-3';
import s321 from '@/data/sections/3-2-1';
import s322 from '@/data/sections/3-2-2';
import s323 from '@/data/sections/3-2-3';
import s324 from '@/data/sections/3-2-4';
import s411 from '@/data/sections/4-1-1';
import s412 from '@/data/sections/4-1-2';
import s421 from '@/data/sections/4-2-1';
import s422 from '@/data/sections/4-2-2';
import s423 from '@/data/sections/4-2-3';
import s431 from '@/data/sections/4-3-1';
import s432 from '@/data/sections/4-3-2';
import s441 from '@/data/sections/4-4-1';
import s442 from '@/data/sections/4-4-2';
import s443 from '@/data/sections/4-4-3';
import s45 from '@/data/sections/4-5';

/** Section ID → SectionData 映射 */
const sectionMap: Record<string, SectionData> = {};
[
  s311, s312, s313, s321, s322, s323, s324,
  s411, s412, s421, s422, s423, s431, s432, s441, s442, s443, s45,
].forEach(s => {
  sectionMap[s.id] = s;
});

/**
 * 从 HTML content 中提取纯文本
 */
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 提取摘要：overview 模式截断到 maxLen，detailed 模式保持完整
 */
function extractSummary(content: string, maxLen: number): string {
  const text = stripHtml(content);
  if (text.length <= maxLen) return text;
  return text.substring(0, maxLen - 3) + '...';
}

/**
 * 将 SVG 字符串内嵌为 data URI 的小图标（缩略图版本）
 */
function inlineSvgIcon(svg: string, width: number = 80): string {
  if (!svg) return '';
  // 取出 viewBox 并保持比例
  const vbMatch = svg.match(/viewBox="([^"]*)"/);
  const vb = vbMatch ? vbMatch[1] : '0 0 200 150';
  const parts = vb.split(/\s+/);
  const vw = parseFloat(parts[2] || '200');
  const vh = parseFloat(parts[3] || '150');
  const ratio = vh / vw;
  const height = Math.round(width * ratio);

  // 简化：直接用 data URI 嵌入
  const encoded = encodeURIComponent(svg)
    .replace(/%2F/g, '/')
    .replace(/%3A/g, ':')
    .replace(/%3D/g, '=')
    .replace(/%22/g, "'")
    .replace(/%20/g, ' ')
    .replace(/%3C/g, '<')
    .replace(/%3E/g, '>')
    .replace(/%23/g, '#');
  return `<img src="data:image/svg+xml,${encoded}" style="width:${width}px;height:${height}px;display:block;margin:4px 0;border-radius:6px;border:1px solid #e2e8f0" />`;
}

/**
 * 生成内嵌图的 HTML（用于 markmap 节点内容）
 */
function makeIllustrationHtml(sectionId: string): string {
  const sectionData = sectionMap[sectionId];
  if (!sectionData) return '';
  const svg = findIllustration(sectionData.title);
  if (!svg) return '';
  return inlineSvgIcon(svg, 140);
}

/**
 * 递归生成知识点的 Markdown（overview 模式）
 */
function renderKPOverview(kp: KnowledgePoint, depth: number = 0): string {
  const indent = '  '.repeat(depth);
  let md = '';

  const title = kp.title.replace(/^[一二三四五六七八九十]+、\s*/, '');
  const summary = extractSummary(kp.content, 120);
  md += `${indent}- **${title}**：${summary}\n`;

  // 最多 4 个关键词
  if (kp.keyTerms && kp.keyTerms.length > 0) {
    const terms = kp.keyTerms.slice(0, 4);
    md += `${indent}  - 关键词：${terms.join('、')}\n`;
  }

  if (kp.children && kp.children.length > 0) {
    for (const child of kp.children) {
      md += renderKPOverview(child, depth + 1);
    }
  }

  return md;
}

/**
 * 递归生成知识点的 Markdown（detailed 模式，单元专用）
 */
function renderKPDetailed(kp: KnowledgePoint, depth: number = 0): string {
  const indent = '  '.repeat(depth);
  let md = '';

  const title = kp.title.replace(/^[一二三四五六七八九十]+、\s*/, '');
  const summary = extractSummary(kp.content, 300);
  md += `${indent}- **${title}**：${summary}\n`;

  // 全部关键词
  if (kp.keyTerms && kp.keyTerms.length > 0) {
    md += `${indent}  - 关键词：${kp.keyTerms.join('、')}\n`;
  }

  if (kp.children && kp.children.length > 0) {
    for (const child of kp.children) {
      md += renderKPDetailed(child, depth + 1);
    }
  }

  return md;
}

/**
 * 生成脑图 Markdown
 * @param unitId - 'all' 为全局概览，'unit3'/'unit4' 为单元详细版
 */
export function generateMindMapMD(unitId?: string): string {
  const isDetail = unitId && unitId !== 'all';
  const targetUnits = isDetail
    ? units.filter(u => u.id === unitId)
    : units;

  if (targetUnits.length === 0) return '# 未找到数据';

  let md = '';

  // 总览模式：单个顶层标题
  if (!isDetail) {
    md += '# 🌱 七年级下册生物 · 期末总复习\n\n';
  }

  for (const unit of targetUnits) {
    const unitIcon = unit.id === 'unit3' ? '🌿' : '🫀';

    if (isDetail) {
      // 单元详细版：单元标题作为顶层
      md += `# ${unitIcon} ${unit.title}\n\n`;
    } else {
      md += `## ${unitIcon} ${unit.title}\n\n`;
    }

    for (const chapter of unit.chapters) {
      if (isDetail) {
        md += `## ${chapter.title}\n\n`;
      } else {
        md += `### ${chapter.title}\n\n`;
      }

      for (const sectionInfo of chapter.sections) {
        const sectionData = sectionMap[sectionInfo.id];
        if (!sectionData) continue;

        if (isDetail) {
          md += `### ${sectionData.title}\n\n`;
        } else {
          md += `#### ${sectionData.title}\n\n`;
        }

        // 检查是否有插图（仅在详细版嵌入图像）
        if (isDetail) {
          const illustrationHtml = makeIllustrationHtml(sectionInfo.id);
          if (illustrationHtml) {
            md += `${illustrationHtml}\n\n`;
          }
        }

        // 学习目标
        if (sectionData.learningGoals.length > 0) {
          const goals = isDetail
            ? sectionData.learningGoals
            : sectionData.learningGoals.slice(0, 2);
          md += `**学习目标：**\n`;
          for (const goal of goals) {
            md += `- ${goal}\n`;
          }
          md += '\n';
        }

        // 知识点
        const renderFn = isDetail ? renderKPDetailed : renderKPOverview;
        for (const kp of sectionData.knowledgePoints) {
          md += renderFn(kp, 0);
        }

        md += '\n';
      }
    }
  }

  return md;
}

/**
 * 获取所有插图的映射（section id → SVG 字符串）
 */
export function getIllustrations(): Record<string, string> {
  const result: Record<string, string> = {};
  for (const unit of units) {
    for (const chapter of unit.chapters) {
      for (const sectionInfo of chapter.sections) {
        const sectionData = sectionMap[sectionInfo.id];
        if (!sectionData) continue;
        const illustration = findIllustration(sectionData.title);
        if (illustration) {
          result[sectionInfo.id] = illustration;
        }
      }
    }
  }
  return result;
}
