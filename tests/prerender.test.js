import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildPage, chunkFiles, outputFile } from '../scripts/prerender-html.mjs';
import { siteRoutes } from '../src/data/sitemap.js';
import { products } from '../src/data/products.js';
import { enterpriseProducts } from '../src/data/enterprise.js';
import { translations } from '../src/i18n/translations.js';
import { structuredData } from '../src/lib/structuredData.js';
import { findPageRoute, pageRoutes } from '../src/routes.js';

// 与 Vite 构建出的 index.html 同样格式的最小模板
const template = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta name="description" content="首页描述" />
    <link rel="canonical" href="https://www.example.com/" />
    <title>首页标题</title>
    <meta property="og:url" content="https://www.example.com/" />
    <meta property="og:title" content="首页标题" />
    <meta property="og:description" content="首页描述" />
    <meta name="twitter:title" content="首页标题" />
    <meta name="twitter:description" content="首页描述" />
    <script type="module" crossorigin src="/assets/index.js"></script>
    <link rel="modulepreload" crossorigin href="/assets/vendor.js">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

test('预渲染：本页的 title、description、canonical、og 全部替换，正文写进 #root', () => {
  const page = buildPage(template, {
    route: '/products',
    html: '<main>产品中心</main>',
    title: '产品中心 - 友质科技',
    description: '存储 "产品" <目录>',
    canonical: 'https://www.example.com/products',
    jsonLd: [{ '@type': 'BreadcrumbList', name: '</script><script>alert(1)</script>' }],
    modulepreload: ['/assets/ProductsPage.js', '/assets/vendor.js'],
  });

  assert.match(page, /<title>产品中心 - 友质科技<\/title>/);
  assert.match(page, /<link rel="canonical" href="https:\/\/www.example.com\/products" \/>/);
  assert.match(page, /<meta property="og:url" content="https:\/\/www.example.com\/products" \/>/);
  // 属性值要转义，否则一个引号就能截断 meta
  assert.match(page, /<meta name="description" content="存储 &quot;产品&quot; &lt;目录&gt;" \/>/);
  assert.equal(page.match(/首页/g), null, '模板里的首页文案应全部被替换');
  assert.match(page, /<div id="root" data-route="\/products"><main>产品中心<\/main><\/div>/);
  // JSON-LD 里的 </script> 不能提前闭合标签
  assert.doesNotMatch(page, /<\/script><script>alert/);
  // 模板里已有的公共块不重复预加载
  assert.equal(page.match(/href="\/assets\/vendor.js"/g).length, 1);
  assert.match(page, /<link rel="modulepreload" crossorigin href="\/assets\/ProductsPage.js">/);
});

test('预渲染：404 页不带 canonical 与 og:url，带 noindex', () => {
  const page = buildPage(template, {
    route: '404', html: '<p>没有找到</p>', title: '页面不存在', description: '说明', canonical: null, noindex: true,
  });
  assert.doesNotMatch(page, /rel="canonical"/);
  assert.doesNotMatch(page, /og:url/);
  assert.match(page, /<meta name="robots" content="noindex, follow" \/>/);
  assert.match(page, /data-route="404"/);
});

test('预渲染：模板格式对不上时构建失败，不能悄悄产出标题全是首页的页面', () => {
  assert.throws(() => buildPage(template.replace(/<title>[^<]*<\/title>/, ''), {
    route: '/', html: 'x', title: 't', description: 'd', canonical: 'https://www.example.com/',
  }), /title/);
  const once = buildPage(template, { route: '/', html: 'x', title: 't', description: 'd', canonical: 'https://www.example.com/' });
  assert.throws(() => buildPage(once, { route: '/', html: 'x', title: 't', description: 'd' }), /vite build/);
});

test('首页保留百度站点验证标签，删掉会失去搜索资源平台的站点权限', () => {
  const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(indexHtml, /<meta name="baidu-site-verification" content="codeva-kNHq0AlOyL" \/>/);
});

test('预渲染：路由写成 xxx.html，不写成目录，避开 public/products/ 图片目录', () => {
  assert.equal(outputFile('/'), 'index.html');
  assert.equal(outputFile('/products'), 'products.html');
  assert.equal(outputFile('/products/zspace-z425'), 'products/zspace-z425.html');
});

test('预渲染：modulepreload 取页面 chunk 及其依赖，跳过入口', () => {
  const manifest = {
    'index.html': { file: 'assets/index.js', isEntry: true },
    'src/pages/A.jsx': { file: 'assets/A.js', imports: ['_shared.js', 'index.html'] },
    '_shared.js': { file: 'assets/shared.js', imports: ['src/pages/A.jsx'] },
  };
  assert.deepEqual(chunkFiles(manifest, 'src/pages/A.jsx'), ['/assets/A.js', '/assets/shared.js']);
  assert.deepEqual(chunkFiles(manifest, null), []);
});

test('sitemap 里的每个地址都对应真实页面，不会预渲染出一堆 404', () => {
  for (const { path } of siteRoutes) {
    assert.ok(findPageRoute(path), `${path} 没有对应的路由`);
  }
  for (const product of products) {
    assert.ok(siteRoutes.some(({ path }) => path === `/products/${product.id}`), product.id);
  }
  for (const product of enterpriseProducts) {
    assert.ok(siteRoutes.some(({ path }) => path === `/enterprise/${product.id}`), product.id);
  }
});

test('routes.js 的路由表与 App.jsx 的 <Routes> 一致', () => {
  // main.jsx 靠 routes.js 判断能否 hydrate、预加载哪个 chunk，两边不一致就会整页重画
  const appSource = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const appPaths = [...appSource.matchAll(/<Route path="([^"]+)"/g)]
    .map(([, path]) => path)
    .filter((path) => path !== '*');
  assert.deepEqual([...appPaths].sort(), pageRoutes.map(({ path }) => path).sort());
});

test('结构化数据：首页声明公司信息，详情页给出面包屑', () => {
  const copy = translations.zh;
  const site = 'https://www.example.com';

  const [organization] = structuredData('/', site, copy);
  assert.equal(organization['@type'], 'Organization');
  assert.equal(organization.name, '北京友质科技有限公司');
  assert.match(organization.telephone, /^\+86-/);
  assert.equal(organization.address.addressCountry, 'CN');

  const product = products[0];
  const [crumbs] = structuredData(`/products/${product.id}`, site, copy);
  assert.equal(crumbs['@type'], 'BreadcrumbList');
  assert.deepEqual(crumbs.itemListElement.map((item) => item.item), [
    `${site}/`, `${site}/products`, `${site}/products/${product.id}`,
  ]);

  assert.deepEqual(structuredData('/no-such-page', site, copy), []);
});
