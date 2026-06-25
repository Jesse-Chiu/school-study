import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ChevronLeft } from 'lucide-react';
import { getWrongItems, removeWrongItem, clearWrongBook, type WrongItem } from '../lib/wrong-book';
import { getSectionInfo } from '../data/structure';

export default function WrongBookPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<WrongItem[]>([]);
  const [clearConfirm, setClearConfirm] = useState(false);

  useEffect(() => {
    setItems(getWrongItems());
  }, []);

  const handleRemove = (id: string) => {
    removeWrongItem(id);
    setItems(getWrongItems());
  };

  const handleClearAll = () => {
    clearWrongBook();
    setItems([]);
    setClearConfirm(false);
  };

  // 按小节分组
  const grouped = items.reduce<Record<string, WrongItem[]>>((acc, item) => {
    const key = item.sectionId || 'other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-slate-100">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">📕 错题本</h1>
        <span className="text-xs text-slate-400 ml-2">共 {items.length} 题</span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-10 text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-slate-500">暂无错题</p>
          <p className="text-xs text-slate-400 mt-1">练习或测试中答错的题目会自动记录在这里</p>
        </div>
      ) : (
        <>
          {/* 操作栏 */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setClearConfirm(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-red-500 border border-red-200 hover:bg-red-50"
            >
              <Trash2 size={14} /> 清空错题本
            </button>
          </div>

          {clearConfirm && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center justify-between">
              <span className="text-sm text-red-700">确定要清空全部错题吗？此操作不可恢复。</span>
              <div className="flex gap-2">
                <button onClick={() => setClearConfirm(false)} className="px-3 py-1 rounded text-xs border border-slate-200 bg-white">取消</button>
                <button onClick={handleClearAll} className="px-3 py-1 rounded text-xs bg-red-500 text-white">确认清空</button>
              </div>
            </div>
          )}

          {/* 错题列表 */}
          <div className="space-y-4">
            {Object.entries(grouped).map(([sectionId, sectionItems]) => {
              const info = sectionId !== 'other' ? getSectionInfo(sectionId) : null;
              return (
                <div key={sectionId} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  {info && (
                    <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 text-sm text-slate-600">
                      {info.unit.title} / {info.chapter.title} / {info.section.title}
                    </div>
                  )}
                  <div className="divide-y divide-slate-50">
                    {sectionItems.map((item, idx) => (
                      <div key={item.id} className="px-5 py-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                                {item.type === 'true-false' ? '判断' : item.type === 'single-choice' ? '单选' : item.type === 'multi-choice' ? '多选' : '简答'}
                              </span>
                              <span className="text-xs text-slate-400">第{idx + 1}题</span>
                            </div>
                            <p className="text-base text-slate-800 mb-2">{item.question}</p>
                            <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-sm">
                              <p className="font-medium text-red-800 mb-1">正确答案：</p>
                              <p className="text-slate-700">{Array.isArray(item.answer) ? item.answer.join('、') : item.answer}</p>
                            </div>
                            {item.explanation && (
                              <p className="text-xs text-slate-500 mt-2">💡 {item.explanation}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                            title="移除"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
