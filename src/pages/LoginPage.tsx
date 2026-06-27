import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

/** 构建时间戳（npm run build 时自动更新） */
const BUILD_TIME = new Date().toISOString().replace('T', ' ').slice(0, 19);

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { loginWithCode } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = code.trim();
    if (!trimmed) {
      setError('请输入登入码');
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginWithCode(trimmed);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch {
      setError('登入失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      {/* 主题切换按钮 */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
        aria-label="切换主题"
      >
        {theme === 'light' ? (
          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </button>

      {/* 登入卡片 */}
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in">
          {/* 标题 */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-2 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              好好学习系统
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              书山有路勤为径，学海无涯苦作舟
            </p>
          </div>

          {/* 二维码区域 */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-green-100 dark:border-green-900/50 shadow-lg">
                <img
                  src={import.meta.env.BASE_URL + 'qrcode.jpeg'}
                  alt="牛油果学习俱乐部公众号二维码"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                扫码关注「牛油果学习俱乐部」
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                关注后发送 STUDY 获取登入码
              </p>
            </div>
          </div>

          {/* 登入码输入 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="loginCode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                登入码
              </label>
              <input
                id="loginCode"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-center text-lg tracking-widest font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="关注后发送 STUDY 获取"
                autoComplete="off"
                maxLength={20}
              />
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3 animate-shake">
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  验证中...
                </>
              ) : (
                '进入学习'
              )}
            </button>
          </form>
        </div>

        {/* 免责声明 */}
        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500 leading-relaxed px-4">
          本网站内容整理自公开网络资源，仅供个人非商业参考。无需注册，不收集任何用户信息，完全免费。
          如涉及版权问题，请通过公众号联系我们，会在第一时间配合处理。
        </p>

        {/* 底部信息 */}
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2026 好好学习系统 · 仅供学习交流使用
          </p>
          <p className="text-xs text-gray-400/60 dark:text-gray-500/60 font-mono">
            v{BUILD_TIME}
          </p>
        </div>
      </div>
    </div>
  );
}

/*
 * ============================================================
 * 以下为原有的登录/注册组件代码（隐藏，后续可用）
 * ============================================================
 *
 * 原表单逻辑：
 * - 用户名 + 密码 → login()
 * - 用户名 + 密码 + 推荐码 → register() → 再 login()
 * - 推荐码从公众号获取
 *
 * 切换开关：isLoginMode
 * 状态：username, password, inviteCode, error, success, isLoading
 *
 * 如需恢复原有登录/注册模式，将上面的 JSX 替换为下方注释掉的表单代码即可。
 * ============================================================
 */
