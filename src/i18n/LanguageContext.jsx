import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { translations } from './translations';
import { LanguageContext } from './language';
import { mustMatchServer, whenHydrated } from '../utils/hydration';

const STORAGE_KEY = 'youzhi-language';
const SUPPORTED_LANGUAGES = ['zh', 'en', 'ja'];
const HTML_LANGS = { zh: 'zh-CN', en: 'en', ja: 'ja' };

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'zh';

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED_LANGUAGES.includes(saved)) return saved;
  } catch {
    // 浏览器禁用本地存储时仍可正常使用语言切换。
  }

  return 'zh';
};

export function LanguageProvider({ children }) {
  // 预渲染的 HTML 是中文，hydrate 那一轮也得先用中文，整棵树 hydrate 完再切到访客保存的语言。
  // 不能在这里的 layout effect 里直接切：那时页面所在的 Suspense 边界还没 hydrate，
  // 语言一变它就整块退回客户端渲染。
  // 保存的语言在挂载时就读好：下面持久化的 effect 会在 hydrate 期间先写入 'zh'，晚了就读不到了。
  const [savedLanguage] = useState(getInitialLanguage);
  const [language, setLanguage] = useState(() => (mustMatchServer() ? 'zh' : savedLanguage));
  const copy = translations[language];

  useLayoutEffect(() => whenHydrated(() => setLanguage(savedLanguage)), [savedLanguage]);

  // title、description、canonical 与 og 要跟着路由变，由 DocumentMeta 统一维护。
  useEffect(() => {
    document.documentElement.lang = HTML_LANGS[language];
    // hydrate 期间的 'zh' 只是占位，不是访客的选择
    if (mustMatchServer()) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // 语言状态仍保留在当前会话中。
    }
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, copy }),
    [copy, language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
