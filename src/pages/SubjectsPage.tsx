import { useNavigate } from 'react-router-dom';
import { BookOpen, Map, Compass, Globe, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const subjects = [
  {
    id: 'biology',
    name: '生物',
    grade: '七年级下册',
    description: '人教版（2025春版）·完整知识点+专项练习+模拟测试+知识脑图',
    available: true,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    Icon: BookOpen,
    stats: ['16个小节', '16套专项练习', '2套综合练习', '40题模拟测试'],
    path: '/biology',
  },
  {
    id: 'daofa',
    name: '道法',
    grade: '七年级下册',
    description: '道德与法治 · 知识点梳理 + 案例分析 + 期末模拟',
    available: true,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600 dark:text-orange-400',
    Icon: Compass,
    stats: ['4个单元', '11课', '25题真题模拟'],
    path: '/dao/mindmap',
  },
  {
    id: 'history',
    name: '历史',
    grade: '七年级下册',
    description: '中国历史 · 朝代脉络 + 事件梳理 + 专题训练',
    available: true,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600 dark:text-amber-400',
    Icon: Map,
    stats: ['3个单元', '21课', '知识脑图+核心归纳'],
    path: '/history/mindmap',
  },
  {
    id: 'geography',
    name: '地理',
    grade: '七年级下册',
    description: '世界地理 · 区域认知 + 地图技能 + 综合题',
    available: false,
    color: 'from-sky-500 to-blue-600',
    bgColor: 'bg-sky-50',
    iconColor: 'text-sky-600 dark:text-sky-400',
    Icon: Globe,
    stats: ['即将上线'],
    path: '',
  },
];

export default function SubjectsPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* 顶部工具栏 */}
      <div className="flex justify-between items-center mb-8">
        {/* 左侧：欢迎语 */}
        <div className="hidden sm:block">
          <p className="text-sm text-slate-400 dark:text-gray-500">欢迎回来</p>
          <p className="text-lg font-semibold text-slate-700 dark:text-gray-300">
            {localStorage.getItem('username') || '同学'} 👋
          </p>
        </div>

        {/* 右侧：操作按钮 */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all hover:scale-105"
            aria-label="切换主题"
          >
            {theme === 'light' ? (
              <Moon size={18} className="text-indigo-500" />
            ) : (
              <Sun size={18} className="text-amber-400" />
            )}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium"
          >
            <LogOut size={16} />
            <span>退出</span>
          </button>
        </div>
      </div>

      {/* 标题 */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
          <span className="text-3xl">📚</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">
          期末备考助手
        </h1>
        <p className="text-slate-400 dark:text-gray-500">选择学科，开始高效复习</p>
      </div>

      {/* 学科卡片 — 使用 grid 让每行等高，内部 flex-column 让按钮贴底 */}
      <div className="grid md:grid-cols-2 gap-5">
        {subjects.map(subject => {
          const Icon = subject.Icon;

          return (
            <div
              key={subject.id}
              className={`group relative bg-white dark:bg-gray-800/80 rounded-2xl border border-slate-100 dark:border-gray-700/50 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-900/40 hover:-translate-y-0.5 transition-all duration-300 ${
                subject.available ? 'cursor-pointer' : 'opacity-60'
              }`}
              onClick={() => {
                if (subject.available && subject.path) {
                  navigate(subject.path);
                }
              }}
            >
              {/* 顶部色条 */}
              <div className={`bg-gradient-to-r ${subject.color} h-1.5`} />

              {/* 卡片主体 — flex column 撑满高度，按钮推到底部 */}
              <div className="p-6 flex flex-col h-full min-h-[220px]">
                {/* 头部：图标 + 标题 */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${subject.bgColor} dark:bg-opacity-20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className={subject.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-slate-800 dark:text-white">{subject.name}</h2>
                      <span className="text-[10px] text-slate-400 dark:text-gray-500 bg-slate-100 dark:bg-gray-700 rounded-full px-1.5 py-0.5 leading-none">
                        {subject.grade}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-gray-500 leading-relaxed line-clamp-2">{subject.description}</p>
                  </div>
                </div>

                {/* 统计标签 */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {subject.stats.map((stat, i) => (
                    <span
                      key={i}
                      className={`text-[11px] px-2 py-0.5 rounded-md ${
                        subject.available
                          ? `${subject.bgColor} ${subject.iconColor}`
                          : 'bg-slate-100 dark:bg-gray-700 text-slate-400'
                      }`}
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                {/* 按钮 — mt-auto 推到底部，保证所有卡片的按钮在同一水平线 */}
                <div className="mt-auto pt-5">
                  {subject.available ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(subject.path || '/');
                      }}
                      className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${subject.color} text-white font-medium text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-sm`}
                    >
                      进入复习 →
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-gray-700 text-slate-350 dark:text-gray-500 font-medium text-sm cursor-not-allowed"
                    >
                      🔜 即将上线
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部提示 */}
      <p className="text-center text-xs text-slate-300 dark:text-gray-600 mt-8">
        © 2024 学科备考系统 · 助力期末复习
      </p>
    </div>
  );
}
