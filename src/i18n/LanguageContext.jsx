import { useEffect, useMemo, useState } from 'react';
import { translations } from './translations';
import { LanguageContext } from './language';

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
  const [language, setLanguage] = useState(getInitialLanguage);
  const copy = translations[language];

  // title、description、canonical 与 og 由 DocumentMeta 统一维护：
  // 它们要跟着路由变，而 Provider 在 Router 外面，拿不到当前路由。
  useEffect(() => {
    document.documentElement.lang = HTML_LANGS[language];

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
