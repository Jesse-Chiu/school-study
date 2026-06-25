import { useParams, useNavigate } from 'react-router-dom';
import { getChapterById } from '@/data/structure';

export default function ChapterPage() {
  const { unitId, chapterId } = useParams<{ unitId: string; chapterId: string }>();
  const navigate = useNavigate();
  const data = chapterId ? getChapterById(chapterId) : null;

  if (!data || !unitId) {
    return <div className="text-center py-20 text-slate-400">页面不存在</div>;
  }

  const { unit, chapter } = data;

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate(`/unit/${unitId}`)} className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mb-4">
        ← 返回{unit.title}
      </button>

      <div className="bg-white rounded-xl border border-slate-100 p-6 mb-6">
        <h1 className="text-xl font-bold text-slate-800">{chapter.title}</h1>
        <p className="text-sm text-slate-500 mt-1">{unit.title}</p>
      </div>

      <div className="space-y-3">
        {chapter.sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => navigate(`/section/${section.id}`)}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left group"
          >
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
              {index + 1}
            </span>
            <span className="text-sm text-slate-700 group-hover:text-emerald-700 font-medium">{section.title}</span>
            <span className="ml-auto text-xs text-slate-400 group-hover:text-emerald-500">开始学习 →</span>
          </button>
        ))}
      </div>
    </div>
  );
}
