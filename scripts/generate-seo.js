// 生成 sitemap.xml 与 robots.txt。
// 两者都含绝对域名，一律用规范域名（src/data/domain.js）：
// 备用站 bjyzyes.com 上的这两个文件也指向主域名，与页面的 canonical 一致。
// 由 package.json 的 prebuild 钩子在每次构建前自动执行。
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { SITE_URL } from '../src/data/domain.js';
import { siteRoutes } from '../src/data/sitemap.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITEMAP_FILE = join(__dirname, '..', 'public', 'sitemap.xml');
const ROBOTS_FILE = join(__dirname, '..', 'public', 'robots.txt');

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (char) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[char]);

const urls = siteRoutes;

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
