import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/language';
import { routeMeta, trimDescription } from '../lib/routeMeta';

// 构建时注入，与 index.html 里的 %SITE_URL% 同源，
// 双域名部署（youzhiyes.com / bjyzyes.com）各自指向自身。
const SITE_URL = __SITE_URL__;

const upsert = (selector, create) => {
  const existing = document.head.querySelector(selector);
  if (existing) return existing;
  const created = create();
  document.head.appendChild(created);
  return created;
};

const setContent = (selector, attribute, value, name) => {
  upsert(selector, () => {
    const element = document.createElement('meta');
    element.setAttribute(attribute, name);
    return element;
  }).setAttribute('content', value);
};

// 每个页面的静态 HTML 在构建时已写好中文版的 title、description、canonical 与 og，
// 不执行 JS 的抓取器（百度、微信分享卡片）读的就是那一份。
// 这里负责客户端路由切换和切换语言之后的更新。
export default function DocumentMeta() {
  const { pathname } = useLocation();
  const { language, copy } = useLanguage();

  useEffect(() => {
    const { title, description } = routeMeta(pathname, copy, language);
    const shortDescription = trimDescription(description);
    // 查询串只是同一个页面的筛选态（如 /products?category=nas），不进 canonical
    const url = `${SITE_URL}${pathname}`;

    document.title = title;
    upsert('link[rel="canonical"]', () => {
      const element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      return element;
    }).setAttribute('href', url);

    setContent('meta[name="description"]', 'name', shortDescription, 'description');
    setContent('meta[property="og:url"]', 'property', url, 'og:url');
    setContent('meta[property="og:title"]', 'property', title, 'og:title');
    setContent('meta[property="og:description"]', 'property', shortDescription, 'og:description');
    setContent('meta[name="twitter:title"]', 'name', title, 'twitter:title');
    setContent('meta[name="twitter:description"]', 'name', shortDescription, 'twitter:description');
  }, [pathname, copy, language]);

  return null;
}
