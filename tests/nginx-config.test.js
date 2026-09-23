import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

// 服务器上跑不了测试，nginx 配置写错只能等上线后才发现。
// 这里对配置文本做静态检查，守住已经踩过的坑。

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

// 去掉注释，免得注释里提到的反例被误判
const conf = read('../deploy/nginx.conf').replace(/#.*$/gm, '');
const vercel = JSON.parse(read('../vercel.json'));

// 配置里 location 不嵌套，截到第一个右花括号就是完整正文
const locations = [...conf.matchAll(/location\s+(\S+)\s*\{([^}]*)\}/g)]
  .map(([, path, body]) => ({ path, body }));

test('nginx: location 里不写 add_header，否则该路径下 server 级安全头全部丢失', () => {
  assert.ok(locations.length > 0);
  for (const { path, body } of locations) {
    assert.doesNotMatch(body, /\badd_header\b/, `location ${path} 里有 add_header`);
  }
});

test('nginx: SPA 回退不检查目录，public/ 下的同名目录不能吞掉路由', () => {
  const dirs = readdirSync(new URL('../public', import.meta.url), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `/${entry.name}`);
  const root = locations.find((l) => l.path === '/' && /try_files/.test(l.body));
  assert.ok(root, '缺少带 try_files 的 location /');
  assert.doesNotMatch(
    root.body,
    /\$uri\//,
    `try_files 检查了目录，${dirs.join('、')} 这些路径会被当成目录返回 403`,
  );
});

test('nginx: 首页单独匹配，其余按预渲染的 $uri.html 查找，未知地址返回 404 页', () => {
  // try_files 只认文件，"/" 是目录；没有这条精确匹配，首页会落到 404
  assert.match(conf, /location\s*=\s*\/\s*\{\s*try_files\s+\/index\.html\s+=404;/);

  const root = locations.find((l) => l.path === '/' && /try_files/.test(l.body));
  assert.match(root.body, /try_files\s+\$uri\s+\$uri\.html\s+=404;/);
  assert.match(root.body, /error_page\s+404\s+\/404\.html;/);
  // 不能再回退到 index.html：那样每个不存在的地址都是一份 200 的首页（soft 404）
  assert.doesNotMatch(root.body, /\/index\.html/);
});

test('vercel: 与 nginx 同样按 xxx.html 提供预渲染页，没有兜底到首页的 rewrite', () => {
  assert.equal(vercel.cleanUrls, true);
  assert.equal(vercel.trailingSlash, false);
  assert.equal(vercel.rewrites, undefined);
});

test('nginx: 安全响应头与 vercel.json 逐条一致', () => {
  const expected = Object.fromEntries(
    vercel.headers
      .find((rule) => rule.source === '/(.*)')
      .headers.map(({ key, value }) => [key.toLowerCase(), value]),
  );
  const actual = Object.fromEntries(
    [...conf.matchAll(/add_header\s+(\S+)\s+"([^"]*)"\s+always;/g)]
      .map(([, key, value]) => [key.toLowerCase(), value]),
  );
  assert.deepEqual(actual, expected);
});
