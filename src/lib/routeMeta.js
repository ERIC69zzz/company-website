// 每个路由的 title 与 description。客户端的 DocumentMeta 和构建时的预渲染
// （scripts/prerender.mjs）共用这一份，静态 HTML 与 JS 渲染后的 <head> 因此一致。
import { findEnterpriseProduct } from '../data/enterprise.js';
import { products } from '../data/products.js';
import { localizeProducts } from '../i18n/products.js';

// 描述超过这个长度会被搜索结果截断，不如自己截干净。
const MAX_DESCRIPTION = 150;

export const trimDescription = (text) => {
  const characters = Array.from(String(text || ''));
  return characters.length > MAX_DESCRIPTION
    ? `${characters.slice(0, MAX_DESCRIPTION - 1).join('').trimEnd()}…`
    : characters.join('');
};

// 返回该路由的 title 与 description。首页用站点级文案，
// 其余页面复用页面自己已有的标题和引导语，不额外维护一套 SEO 文案。
export function routeMeta(pathname, copy, language) {
  if (pathname === '/') {
    return { title: copy.meta.title, description: copy.meta.description };
  }

  const site = copy.nav.brand;

  // 企业级整机详情
  if (pathname.startsWith('/enterprise/')) {
    const product = findEnterpriseProduct(pathname.slice('/enterprise/'.length));
    const text = product ? copy.business.enterprise.products[product.id] : null;
    if (product && text) {
      return {
        title: `${text.brand} ${product.name} - ${site}`,
        description: text.summary,
      };
    }
  }

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

