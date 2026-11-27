import { createContext, useContext } from 'react';

export const LanguageContext = createContext(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}

export const languageOptions = [
  { value: 'zh', label: '中文', shortLabel: '中' },
  { value: 'en', label: 'English', shortLabel: 'EN' },
  { value: 'ja', label: '日本語', shortLabel: '日' },
];

const supportedLanguages = new Set(languageOptions.map(({ value }) => value));

export function resolvePreferredLanguage(savedLanguage, browserLanguages) {
  if (supportedLanguages.has(savedLanguage)) return savedLanguage;
  for (const tag of browserLanguages) {
    const primary = tag.toLowerCase().split('-')[0];
    if (supportedLanguages.has(primary)) return primary;
  }
  return 'zh';
}
