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

  useEffect(() => {
    document.documentElement.lang = HTML_LANGS[language];
    document.title = copy.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', copy.meta.description);

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // 语言状态仍保留在当前会话中。
    }
  }, [copy, language]);

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
