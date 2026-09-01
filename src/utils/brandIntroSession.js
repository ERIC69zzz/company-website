const BRAND_INTRO_SESSION_KEY = 'youzhi-brand-intro-played';

const getSessionStorage = () => {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export function hasPlayedBrandIntro(storage = getSessionStorage()) {
  try {
    return storage?.getItem(BRAND_INTRO_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function markBrandIntroPlayed(storage = getSessionStorage()) {
  try {
    storage?.setItem(BRAND_INTRO_SESSION_KEY, '1');
  } catch {
    // Storage can be disabled; the website and animation must still work.
  }
}
