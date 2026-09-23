// 站点的全部可索引页面。sitemap.xml 与构建时预渲染共用这一份，
// 保证「提交给搜索引擎的地址」和「真的有静态 HTML 的地址」始终一致。
// 带扩展名：这个模块会被 node 脚本直接加载，Node 的 ESM 不做扩展名补全。
import { enterpriseProducts } from './enterprise.js';
import { products } from './products.js';

// priority 反映页面重要性，不含 lastmod：
// 保持输出稳定，避免每次构建都产生无意义的 git diff。
const staticRoutes = [
  { path: '/', priority: '1.0' },
  { path: '/products', priority: '0.9' },
  { path: '/enterprise', priority: '0.9' },
  { path: '/consult', priority: '0.8' },
  { path: '/contact', priority: '0.7' },
  { path: '/brand', priority: '0.6' },
  { path: '/privacy', priority: '0.3' },
];

export const siteRoutes = [
  ...staticRoutes,
  ...enterpriseProducts.map((product) => ({
    path: `/enterprise/${product.id}`,
    priority: '0.7',
  })),
  ...products.map((product) => ({
    path: `/products/${product.id}`,
    priority: '0.5',
  })),
];
