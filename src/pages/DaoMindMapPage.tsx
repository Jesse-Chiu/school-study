import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Scale, Gavel, Shield, Maximize2 } from 'lucide-react';

export default function DaoMindMapPage() {
  const { unitId } = useParams<{ unitId?: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const activeUnitId = unitId || 'all';
  const [fullscreen, setFullscreen] = useState(false);

  // 动态加载 markmap 并生成脑图
  useEffect(() => {
    let cancelled = false;
    let markmapInstance: { destroy: () => void } | null = null;

    async function initMarkmap() {
      const { Transformer } = await import('markmap-lib');
      const { Markmap } = await import('markmap-view');

      // 动态导入道法生成器
      const { generateDaoMindMapMD } = await import('../lib/dao-mindmap-generator');

      if (cancelled) return;

      const md = generateDaoMindMapMD(activeUnitId);
      const transformer = new Transformer();
      const { root } = transformer.transform(md);

      if (containerRef.current && !cancelled) {
        containerRef.current.innerHTML = '';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        containerRef.current.appendChild(svg);

        const mm = Markmap.create(
          svg,
          {
            paddingX: 16,
            duration: 400,
            maxWidth: activeUnitId === 'all' ? 320 : 400,
            initialExpandLevel: activeUnitId === 'all' ? 2 : 3,
            autoFit: true,
          },
          root,
        );
        markmapInstance = mm;
      }
    }

    initMarkmap();
    return () => {
      cancelled = true;
      if (markmapInstance && typeof markmapInstance.destroy === 'function') {
        markmapInstance.destroy();
      }
    };
  }, [activeUnitId]);

  const tabs = [
    {
      id: 'all',
      label: '总复习脑图',
      shortLabel: '总览',
      icon: BookOpen,
      bg: 'bg-slate-600',
      desc: '四单元完整知识网络',
    },
    {
      id: 'u1',
      label: '第一单元·珍惜青春时光',
      shortLabel: '青春',
      icon: Scale,
      bg: 'bg-blue-600',
      desc: '详细版，含完整知识点',
    },
    {
      id: 'u2',
      label: '第二单元·焕发青春活力',
      shortLabel: '活力',
      icon: Scale,
      bg: 'bg-green-600',
      desc: '详细版，含完整知识点',
    },
    {
      id: 'u3',
      label: '第三单元·传承中华优秀传统文化',
      shortLabel: '文化',
      icon: Shield,
      bg: 'bg-amber-600',
      desc: '详细版，含完整知识点',
    },
    {
      id: 'u4',
      label: '第四单元·生活在法治社会',
      shortLabel: '法治',
      icon: Gavel,
      bg: 'bg-red-600',
      desc: '详细版，含完整知识点',
    },
  ] as const;

  const activeTab = tabs.find(t => t.id === activeUnitId) || tabs[0];

  return (
    <div className={fullscreen ? 'fixed inset-0 z-50 bg-white' : 'h-full'}>
      {/* 顶部控制栏 */}
      <div className={`
        flex items-center justify-between flex-wrap gap-3 mb-4
        ${fullscreen ? 'px-6 py-4 bg-slate-50 border-b' : ''}
      `}>
        {/* 左侧：标题 + 说明 */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            道法知识脑图
          </h1>
          <span className="hidden sm:inline text-xs text-slate-400 bg-slate-100 rounded-full px-2.5 py-1">
            {activeTab.desc}
          </span>
        </div>

        {/* 右侧：操作按钮 */}
        <div className="flex items-center gap-2">
          {/* 切换标签 */}
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            {tabs.map(t => {
              const isActive = activeUnitId === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => navigate(t.id === 'all' ? '/dao/mindmap' : `/dao/mindmap/${t.id}`)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{t.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* 全屏按钮 */}
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
            title={fullscreen ? '退出全屏' : '全屏查看'}
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* 使用提示 */}
      <div className={`
        flex items-center gap-4 text-xs text-slate-400 bg-amber-50/50 rounded-lg border border-amber-100 px-4 py-2 mb-4
        ${fullscreen ? 'mx-6' : ''}
      `}>
        <span>🖱️ 滚轮缩放</span>
        <span>✋ 拖拽平移</span>
        <span>👆 点击节点展开/折叠</span>
        {activeUnitId !== 'all' && (
          <span className="text-blue-500 font-medium">📚 单元详细脑图</span>
        )}
      </div>

      {/* 脑图容器 */}
      <div
        className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm"
        style={{ height: fullscreen ? 'calc(100vh - 120px)' : 'calc(100vh - 260px)', minHeight: '500px' }}
      >
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
