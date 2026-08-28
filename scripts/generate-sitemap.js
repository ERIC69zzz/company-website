// 从路由和产品数据生成 sitemap.xml，避免新增产品后忘记同步。
// 由 package.json 的 prebuild 钩子在每次构建前自动执行。
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { products } from '../src/data/products.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = join(__dirname, '..', 'public', 'sitemap.xml');

const SITE_URL = (process.env.SITE_URL || 'https://www.bjyzyes.com').replace(/\/+$/, '');

// priority 反映页面重要性，不含 lastmod：
// 保持输出稳定，避免每次构建都产生无意义的 git diff。
const staticRoutes = [
  { path: '/', priority: '1.0' },
  { path: '/products', priority: '0.9' },
  { path: '/consult', priority: '0.8' },
  { path: '/contact', priority: '0.7' },
  { path: '/brand', priority: '0.6' },
  { path: '/privacy', priority: '0.3' },
];

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (char) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[char]);

const urls = [
  ...staticRoutes,
  ...products.map((product) => ({
    path: `/products/${product.id}`,
    priority: '0.5',
  })),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(({ path, priority }) =>
    [
      '  <url>',
      `    <loc>${escapeXml(SITE_URL + path)}</loc>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n');

writeFileSync(OUTPUT_FILE, xml, 'utf-8');
console.log(`✅ 已生成 sitemap.xml，共 ${urls.length} 条 URL`);
