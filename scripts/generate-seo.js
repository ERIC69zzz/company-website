// 生成 sitemap.xml 与 robots.txt。
// 两者都含绝对域名，必须随构建时的 SITE_URL 变化，
// 否则双域名部署时其中一份会指向另一个站点。
// 由 package.json 的 prebuild 钩子在每次构建前自动执行。
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { products } from '../src/data/products.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITEMAP_FILE = join(__dirname, '..', 'public', 'sitemap.xml');
const ROBOTS_FILE = join(__dirname, '..', 'public', 'robots.txt');

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

writeFileSync(SITEMAP_FILE, xml, 'utf-8');

const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  '',
].join('\n');

writeFileSync(ROBOTS_FILE, robots, 'utf-8');

console.log(`✅ 已生成 sitemap.xml（${urls.length} 条 URL）与 robots.txt，站点地址 ${SITE_URL}`);
