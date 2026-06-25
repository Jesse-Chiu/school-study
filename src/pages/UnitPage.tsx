import { useParams, useNavigate } from 'react-router-dom';
import type { ChapterInfo, SectionInfo, UnitInfo } from '@/lib/types';
import { getUnitById } from '@/data/structure';

export default function UnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const unit: UnitInfo | null = unitId ? getUnitById(unitId) : null;

  if (!unit || !unitId) {
    return <div className="text-center py-20 text-slate-400">单元不存在</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate('/biology')} className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mb-4">
        ← 返回首页
      </button>

      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white mb-8">
        <h1 className="text-xl font-bold">{unit.title}</h1>
        <p className="text-emerald-100 text-sm mt-1">
          共 {unit.chapters.reduce((s: number, c: ChapterInfo) => s + c.sections.length, 0)} 个小节
        </p>
      </div>

      <div className="space-y-6">
        {unit.chapters.map((chapter: ChapterInfo) => (
          <div key={chapter.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">{chapter.title}</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-3">
                {chapter.sections.map((section: SectionInfo) => (
                  <button
                    key={section.id}
                    onClick={() => navigate(`/section/${section.id}`)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group text-left"
                  >
                    <span className="text-sm text-slate-700 group-hover:text-emerald-700">{section.title}</span>
                    <span className="text-xs text-slate-400 group-hover:text-emerald-500">学习 →</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
