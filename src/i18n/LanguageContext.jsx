import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { translations } from './translations';
import { LanguageContext, resolvePreferredLanguage } from './language';
import { mustMatchServer, whenHydrated } from '../utils/hydration';

const STORAGE_KEY = 'youzhi-language';
const HTML_LANGS = { zh: 'zh-CN', en: 'en', ja: 'ja' };

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'zh';

  let savedLanguage;
  try {
    savedLanguage = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // 禁用本地存储时仍然跟随浏览器。
  }
  const { languages, language } = window.navigator;
  return resolvePreferredLanguage(savedLanguage, languages?.length ? languages : [language || 'zh']);
};

export function LanguageProvider({ children }) {
  // 中文静态页完成 hydrate 后，再应用访客的语言偏好。
  const [initialLanguage] = useState(getInitialLanguage);
  const [language, setCurrentLanguage] = useState(() => (mustMatchServer() ? 'zh' : initialLanguage));
  const copy = translations[language];

  useLayoutEffect(() => whenHydrated(() => setCurrentLanguage(initialLanguage)), [initialLanguage]);

  // title、description、canonical 与 og 要跟着路由变，由 DocumentMeta 统一维护。
  useEffect(() => {
    document.documentElement.lang = HTML_LANGS[language];
  }, [language]);

  // 只有访客手动切换才保存。自动识别的访客下次进入时仍可跟随设备设置。
  const setLanguage = useCallback((selectedLanguage) => {
    setCurrentLanguage(selectedLanguage);
    try {
      window.localStorage.setItem(STORAGE_KEY, selectedLanguage);
    } catch {
      // 语言状态仍保留在当前会话中。
    }
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, copy }),
    [copy, language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
