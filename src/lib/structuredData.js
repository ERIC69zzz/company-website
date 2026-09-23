// 预渲染时写进每个页面 <head> 的 schema.org 结构化数据（JSON-LD）。
// 首页声明公司本身（名称、地址、电话、Logo），其余页面给出面包屑，
// 搜索结果可以据此显示公司信息卡和层级路径。
//
// 不给产品页写 Product：Google 要求 Product 必须带报价或评价，
// 我们的价格是「询价」，写了反而会在 Search Console 里报结构化数据错误。
import { findEnterpriseProduct } from '../data/enterprise.js';
import { products } from '../data/products.js';
import { company } from '../data/site.js';

const organization = (siteUrl) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.fullName,
  alternateName: company.shortName,
  url: `${siteUrl}/`,
  logo: `${siteUrl}/logo-mark.svg`,
  foundingDate: company.foundingDate,
  email: company.email,
  telephone: `+86-${company.phone}`,
  address: {
    '@type': 'PostalAddress',
    ...company.postalAddress,
    addressCountry: 'CN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `+86-${company.phone}`,
    contactType: 'customer service',
    availableLanguage: ['zh-CN', 'en', 'ja'],
  },
});

const website = (siteUrl) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: company.fullName,
  url: `${siteUrl}/`,
  inLanguage: 'zh-CN',
});

const breadcrumb = (siteUrl, trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    item: `${siteUrl}${path}`,
  })),
});

// copy 用中文文案：预渲染的静态页就是中文版。
export function structuredData(pathname, siteUrl, copy) {
  if (pathname === '/') return [organization(siteUrl), website(siteUrl)];

  const home = [copy.nav.home, '/'];
  const sections = {
    '/products': copy.productsPage.title,
    '/enterprise': copy.business.enterpriseNav,
    '/brand': copy.brandPage.title,
    '/contact': copy.contactPage.title,
    '/consult': copy.consultPage.title,
    '/privacy': copy.privacyPage.title,
  };
  if (sections[pathname]) return [breadcrumb(siteUrl, [home, [sections[pathname], pathname]])];

  const productId = pathname.startsWith('/products/') && pathname.slice('/products/'.length);
  const product = productId && products.find((item) => item.id === productId);
  if (product) {
    return [breadcrumb(siteUrl, [
      home,
      [sections['/products'], '/products'],
      [`${product.brand} ${product.name}`, pathname],
    ])];
  }

  const enterpriseId = pathname.startsWith('/enterprise/') && pathname.slice('/enterprise/'.length);
  const machine = enterpriseId && findEnterpriseProduct(enterpriseId);
  if (machine) {
    return [breadcrumb(siteUrl, [
      home,
      [sections['/enterprise'], '/enterprise'],
      [`${machine.brand} ${machine.name}`, pathname],
    ])];
  }

  return [];
}
