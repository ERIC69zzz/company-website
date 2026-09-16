import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// deploy/server.js 里写的是 `import './api/notify.js'`，只在服务器的
// /opt/youzhi/ 布局下成立（server.js 与 api/ 同级），仓库里那个相对路径
// 指向不存在的 deploy/api/。所以这里把真实布局在临时目录里重建一遍，
// 跑的是即将部署的那个文件本身，而不是它的副本或改写版。
//
// server.js 在模块加载时就 listen 且不导出 server，直接 import 会让
// 测试进程挂住，因此当子进程起。

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const PORT = 34117;
const BASE = `http://127.0.0.1:${PORT}`;

let workDir;
let child;

const post = (path, body, headers = {}) =>
  fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body,
  });

before(async () => {
  workDir = mkdtempSync(join(tmpdir(), 'youzhi-api-'));
  cpSync(join(repoRoot, 'deploy', 'server.js'), join(workDir, 'server.js'));
  cpSync(join(repoRoot, 'api'), join(workDir, 'api'), { recursive: true });

  child = spawn(process.execPath, [join(workDir, 'server.js')], {
    env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const stderr = [];
  child.stderr.on('data', (chunk) => stderr.push(String(chunk)));

  await new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`服务未在 5 秒内启动。stderr:\n${stderr.join('')}`)),
      5000,
    );
    child.stdout.on('data', (chunk) => {
      if (String(chunk).includes('listening')) {
        clearTimeout(timer);
        resolve();
      }
    });
    child.on('exit', (code) => {
      clearTimeout(timer);
      reject(new Error(`服务退出，code=${code}。stderr:\n${stderr.join('')}`));
    });
  });
});

after(() => {
  child?.kill();
  if (workDir) rmSync(workDir, { recursive: true, force: true });
});

test('健康检查可用，未知路径返回 404', async () => {
  const health = await fetch(`${BASE}/api/health`);
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { ok: true });

  const missing = await fetch(`${BASE}/api/nope`);
  assert.equal(missing.status, 404);
});

test('超过体积上限的请求体返回 413，且不会把半截数据交给业务逻辑', async () => {
  // 适配层的上限是 16KB
  const res = await post('/api/notify', JSON.stringify({ content: 'x'.repeat(32 * 1024) }));
  assert.equal(res.status, 413);
  assert.equal((await res.json()).error, 'Payload too large');
});

test('非法 JSON 返回 400', async () => {
  const res = await post('/api/notify', '{"name": ');
  assert.equal(res.status, 400);
  assert.equal((await res.json()).error, 'Invalid JSON');
});

test('合法请求会走到业务逻辑，来源校验照常生效', async () => {
  // 不带 Origin，guard 判定为非浏览器客户端并拒绝。
  // 能拿到 403 说明 body 解析、res.status().json() 补丁和路由分发都通了。
  const res = await post('/api/notify', JSON.stringify({ name: '测试', phone: '13000000000' }));
  assert.equal(res.status, 403);
  assert.equal((await res.json()).error, 'Forbidden');
});
