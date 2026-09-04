import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../data/products';
import { useLanguage } from '../i18n/language';
import { localizeProducts } from '../i18n/products';

// 构建时注入，与 index.html 里的 %SITE_URL% 同源，
// 双域名部署（youzhiyes.com / bjyzyes.com）各自指向自身。
const SITE_URL = __SITE_URL__;

// 描述超过这个长度会被搜索结果截断，不如自己截干净。
const MAX_DESCRIPTION = 150;

const trim = (text) => {
  const characters = Array.from(String(text || ''));
  return characters.length > MAX_DESCRIPTION
    ? `${characters.slice(0, MAX_DESCRIPTION - 1).join('').trimEnd()}…`
    : characters.join('');
};

// 返回该路由的 title 与 description。首页用站点级文案，
// 其余页面复用页面自己已有的标题和引导语，不额外维护一套 SEO 文案。
function routeMeta(pathname, copy, language) {
  if (pathname === '/') {
    return { title: copy.meta.title, description: copy.meta.description };
  }

  const site = copy.nav.brand;
  const productId = pathname.startsWith('/products/') ? pathname.slice('/products/'.length) : null;

  if (productId) {
    const source = products.find((item) => item.id === productId);
    if (source) {
      const product = localizeProducts([source], language)[0];
      return {
        title: `${product.brand} ${product.name} - ${site}`,
        description: product.shortDesc,
      };
    }
    // 落到 NotFoundPage，标题也应该跟着变，不能停在上一页
  }

  const [title, description] = {
    '/products': [copy.productsPage.title, copy.business.home.description],
    '/enterprise': [copy.business.enterpriseNav, copy.business.enterprise.description],
    '/brand': [copy.brandPage.title, copy.brandPage.intro],
    '/contact': [copy.contactPage.title, copy.contactPage.intro],
    '/consult': [copy.consultPage.title, copy.consultPage.formDesc],
    '/privacy': [copy.privacyPage.title, copy.privacyPage.intro],
  }[pathname] || [copy.notFound.title, copy.notFound.desc];

  return { title: `${title} - ${site}`, description };
}

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

// index.html 里的静态 og / canonical 保持中文首页版本：抓取器不执行 JS，
// 那份是它们唯一能看到的内容。这里覆盖的是会执行 JS 的一侧（如 Googlebot）。
// 要让不执行 JS 的抓取器也拿到正确的元信息，得上预渲染。
export default function DocumentMeta() {
  const { pathname } = useLocation();
  const { language, copy } = useLanguage();

  useEffect(() => {
    const { title, description } = routeMeta(pathname, copy, language);
    const shortDescription = trim(description);
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
