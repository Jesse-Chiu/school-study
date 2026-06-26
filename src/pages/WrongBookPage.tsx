import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ChevronLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getWrongQuestions, removeWrongQuestion, clearWrongQuestions } from '../lib/database';
import { getSectionInfo } from '../data/structure';

interface WrongItem {
  id: number;
  user_id: number;
  question_id: string;
  subject: string;
  unit_id: string;
  chapter_id: string;
  question_data: any;
  added_at: string;
}

export default function WrongBookPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState<WrongItem[]>([]);
  const [clearConfirm, setClearConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      loadWrongQuestions();
    }
  }, [user]);

  const loadWrongQuestions = () => {
    if (!user) return;
    const data = getWrongQuestions(user.id);
    setItems(data);
  };

  const handleRemove = (questionId: string) => {
    if (!user) return;
    removeWrongQuestion(user.id, questionId);
    loadWrongQuestions();
  };

  const handleClearAll = () => {
    if (!user) return;
    clearWrongQuestions(user.id);
    setItems([]);
    setClearConfirm(false);
  };

  // 按小节分组
  const grouped = items.reduce<Record<string, WrongItem[]>>((acc, item) => {
    const key = item.question_data?.sectionId || 'other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">📕 错题本</h1>
        <span className="text-xs text-slate-400 ml-2">共 {items.length} 题</span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-100 dark:border-gray-700 p-10 text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-slate-500 dark:text-gray-400">暂无错题</p>
          <p className="text-xs text-slate-400 dark:text-gray-500 mt-1">练习或测试中答错的题目会自动记录在这里</p>
        </div>
      ) : (
        <>
          {/* 操作栏 */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setClearConfirm(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-red-500 border border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 size={14} /> 清空错题本
            </button>
          </div>

          {clearConfirm && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4 flex items-center justify-between">
              <span className="text-sm text-red-700 dark:text-red-400">确定要清空全部错题吗？此操作不可恢复。</span>
              <div className="flex gap-2">
                <button onClick={() => setClearConfirm(false)} className="px-3 py-1 rounded text-xs border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700">取消</button>
                <button onClick={handleClearAll} className="px-3 py-1 rounded text-xs bg-red-500 text-white">确认清空</button>
              </div>
            </div>
          )}

          {/* 错题列表 */}
          <div className="space-y-4">
            {Object.entries(grouped).map(([sectionId, sectionItems]) => {
              const info = sectionId !== 'other' ? getSectionInfo(sectionId) : null;
              return (
                <div key={sectionId} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-100 dark:border-gray-700 overflow-hidden">
                  {info && (
                    <div className="px-5 py-3 bg-slate-50 dark:bg-gray-700 border-b border-slate-100 dark:border-gray-600 text-sm text-slate-600 dark:text-gray-300">
                      <span className="font-medium">{info.unit.title}</span>
                      <span className="text-slate-400 mx-1">·</span>
                      <span>{info.section.title}</span>
                      <span className="text-slate-400 mx-1">·</span>
                      <span className="text-xs">{sectionItems.length} 题</span>
                    </div>
                  )}
                  <ul className="divide-y divide-slate-50 dark:divide-gray-700">
                    {sectionItems.map((item) => {
                      const q = item.question_data;
                      return (
                        <li key={item.id} className="px-5 py-3 flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-gray-700/50">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-700 dark:text-gray-300 truncate">{q?.question || '题目加载失败'}</p>
                            {q?.yourAnswer && (
                              <p className="text-xs text-red-500 mt-1">你的答案：{q.yourAnswer}</p>
                            )}
                            {q?.correctAnswer && (
                              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">正确答案：{q.correctAnswer}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemove(item.question_id)}
                            className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                            aria-label="删除"
                          >
                            <Trash2 size={16} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
