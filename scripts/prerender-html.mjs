// 预渲染的纯函数部分：把一页的正文与元信息填进 Vite 构建出的 index.html 模板。
// 与 prerender.mjs 分开，是为了能在 node --test 里直接测，不必先跑一遍构建。

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);

// JSON-LD 放在 <script> 里，正文中的 </script> 会提前闭合标签，统一转义 <
const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

// 模板里的标签必须一个不少地找到：Vite 改了输出格式时宁可构建失败，
// 也不要悄悄产出一批标题全是首页的页面。
const replaceOnce = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) throw new Error(`index.html 模板里找不到 ${label}`);
  // 用函数形式，避免替换内容里的 $& 之类被当成特殊序列
  return html.replace(pattern, () => replacement);
};

const metaPattern = (attribute, name) =>
  new RegExp(`<meta ${attribute}="${name}" content="[^"]*" />`);

export function buildPage(template, {
  route,
  html,
  title,
  description,
  canonical = null,
  jsonLd = [],
  modulepreload = [],
  noindex = false,
}) {
  if (/<div id="root" data-route=/.test(template)) {
    throw new Error('模板已经是预渲染过的页面，请先重新执行 vite build');
  }

  let page = template;
  const text = (value) => escapeHtml(value);

  page = replaceOnce(page, /<title>[^<]*<\/title>/, `<title>${text(title)}</title>`, '<title>');
  for (const [attribute, name, value] of [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
  ]) {
    page = replaceOnce(
      page,
      metaPattern(attribute, name),
      `<meta ${attribute}="${name}" content="${text(value)}" />`,
      name,
    );
  }

  const canonicalPattern = /<link rel="canonical" href="[^"]*" \/>/;
  const ogUrlPattern = metaPattern('property', 'og:url');
  if (canonical) {
    page = replaceOnce(page, canonicalPattern, `<link rel="canonical" href="${text(canonical)}" />`, 'canonical');
    page = replaceOnce(page, ogUrlPattern, `<meta property="og:url" content="${text(canonical)}" />`, 'og:url');
  } else {
    // 404 页没有自己的规范地址
    page = replaceOnce(page, canonicalPattern, '', 'canonical');
    page = replaceOnce(page, ogUrlPattern, '', 'og:url');
  }

  // 入口与 vendor 等公共块 Vite 已经写进模板，只补本页独有的
  const extraPreloads = [...new Set(modulepreload)].filter((href) => !template.includes(`href="${href}"`));
  const head = [
    noindex ? '<meta name="robots" content="noindex, follow" />' : '',
    ...extraPreloads.map((href) => `<link rel="modulepreload" crossorigin href="${text(href)}">`),
    ...jsonLd.map((data) => `<script type="application/ld+json">${serializeJsonLd(data)}</script>`),
  ].filter(Boolean);
  if (head.length) {
    page = replaceOnce(page, /<\/head>/, `  ${head.join('\n    ')}\n  </head>`, '</head>');
  }

  return replaceOnce(
    page,
    /<div id="root"><\/div>/,
    `<div id="root" data-route="${text(route)}">${html}</div>`,
    '<div id="root">',
  );
}

// 路由 → dist 下的文件。不写成 products/index.html：
// public/products/ 是产品图目录，nginx 按目录处理会 301 再 403（见 deploy/nginx.conf）。
export const outputFile = (route) => (route === '/' ? 'index.html' : `${route.slice(1)}.html`);

// 页面 chunk 及其依赖在 Vite manifest 里的文件，入口已经预加载的除外
export function chunkFiles(manifest, moduleKey) {
  const files = [];
  const seen = new Set();
  const visit = (key) => {
    const entry = manifest[key];
    if (!entry || seen.has(key)) return;
    seen.add(key);
    if (entry.isEntry) return;
    files.push(`/${entry.file}`);
    for (const dependency of entry.imports || []) visit(dependency);
  };
  if (moduleKey) visit(moduleKey);
  return files;
}
