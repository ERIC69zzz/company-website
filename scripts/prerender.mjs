// 构建时预渲染。`npm run build` 的最后一步，依次需要：
//   dist/                 vite build 产出的客户端（index.html 作模板）
//   dist-ssr/             vite build --ssr src/entry-server.jsx 产出的服务端渲染入口
//
// 为 sitemap 里的每个地址生成一份带正文、带本页 title / description / canonical /
// 结构化数据的静态 HTML，另生成 404.html。不执行 JS 的抓取器（百度、微信分享）
// 读到的就是这些文件；浏览器拿到后由 main.jsx 原地 hydrate。
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildPage, chunkFiles, outputFile } from './prerender-html.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const manifestFile = join(dist, '.vite', 'manifest.json');

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'));
const server = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);

const write = (file, content) => {
  const target = join(dist, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, 'utf8');
};

const renderPage = async (pathname, { route = pathname, canonical, noindex = false }) => {
  const { html, title, description, jsonLd } = await server.render(pathname);
  if (!html.trim()) throw new Error(`${pathname} 渲染结果为空`);
  return buildPage(template, {
    route,
    html,
    title,
    description,
    canonical,
    jsonLd,
    noindex,
    modulepreload: chunkFiles(manifest, server.pageModule(pathname)),
  });
};

for (const { path } of server.siteRoutes) {
  write(outputFile(path), await renderPage(path, { canonical: `${server.SITE_URL}${path}` }));
}

// 任意一个不存在的地址都会落到 NotFoundPage；nginx 对未知地址返回它并带 404 状态码
write('404.html', await renderPage('/__not-found__', { route: '404', canonical: null, noindex: true }));

// manifest 只在构建期使用，不随站点发布
rmSync(join(dist, '.vite'), { recursive: true, force: true });

console.log(`✅ 已预渲染 ${server.siteRoutes.length} 个页面与 404.html，站点地址 ${server.SITE_URL}`);
