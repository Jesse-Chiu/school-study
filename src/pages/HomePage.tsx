import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, FileText, Trophy, Clock } from 'lucide-react';
import { units } from '@/data/structure';

/** 构建时间戳（构建时自动更新） */
const BUILD_TIME = new Date().toISOString().replace('T', ' ').slice(0, 19);

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto">
      {/* 顶部横幅 */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
        <h1 className="text-2xl font-bold mb-2">📘 七年级下册生物 · 期末备考</h1>
        <p className="text-emerald-100 text-sm mb-4">
          人教版（2026春版）· 完整知识点 + 专项练习 + 模拟测试
        </p>
        {/* 版本号 */}
        <div className="flex items-center gap-1.5 text-xs text-white/60 mt-3 font-mono">
          <Clock size={12} />
          <span>v{BUILD_TIME}</span>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate('/mindmap')}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            🧠 开始复习
          </button>
          <button
            onClick={() => navigate('/mock-exam')}
            className="bg-white text-emerald-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors"
          >
            📋 模拟测试
          </button>
        </div>
      </div>

      {/* 功能卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, label: '知识点学习', desc: '16个小节完整知识点', path: '/section/3-1-1', color: 'bg-blue-50 text-blue-600' },
          { icon: Brain, label: '知识脑图', desc: '交互式脑图复习', path: '/mindmap', color: 'bg-purple-50 text-purple-600' },
          { icon: FileText, label: '专项练习', desc: '每节配套练习题', path: '/exercises', color: 'bg-amber-50 text-amber-600' },
          { icon: Trophy, label: '模拟测试', desc: '期末模拟考试', path: '/mock-exam', color: 'bg-rose-50 text-rose-600' },
        ].map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="bg-white rounded-xl p-5 border border-slate-100 hover:shadow-md transition-all text-left group"
          >
            <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <item.icon size={20} />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.label}</h3>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </button>
        ))}
      </div>

      {/* 单元入口 */}
      <div className="grid md:grid-cols-2 gap-6">
        {units.map(unit => (
          <div key={unit.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-white">
              <h2 className="font-bold text-lg">{unit.title}</h2>
              <p className="text-emerald-100 text-xs mt-1">
                {unit.chapters.reduce((sum, ch) => sum + ch.sections.length, 0)} 个小节
              </p>
            </div>
            <div className="p-5 space-y-3">
              {unit.chapters.map(chapter => (
                <div key={chapter.id}>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">{chapter.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {chapter.sections.map(section => (
                      <button
                        key={section.id}
                        onClick={() => navigate(`/section/${section.id}`)}
                        className="text-xs bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-1.5 rounded-lg border border-slate-100 transition-colors"
                      >
                        {section.title.replace(/第[一二三四]节 /, '').replace('人体内废物的排出', '废物排出')}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
