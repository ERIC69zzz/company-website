// ECS 上运行的 API 服务。
//
// 这里只做 Vercel 平台特性的适配，业务逻辑仍然复用 api/notify.js，
// 避免两套部署出现行为差异。适配的三件事：
//   1. Vercel 自动解析 req.body，裸 Node 要自己读流
//   2. Vercel 提供 res.status().json()，这里补一个等价实现
//   3. 入口由 export default handler 改为 HTTP 路由分发
//
// 监听 127.0.0.1，只允许 nginx 反向代理访问，不直接暴露到公网。
import { createServer } from 'node:http';
import notifyHandler from './api/notify.js';

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '127.0.0.1';
const MAX_BODY_BYTES = 16 * 1024;

const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let size = 0;
    let stopped = false;
    const chunks = [];
    req.on('data', (chunk) => {
      if (stopped) return;
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        // 这里不能直接 destroy：连接一断，下面的 413 就发不出去，
        // 客户端只会看到连接被重置。先停止收数据，等响应写完再断开。
        stopped = true;
        req.pause();
        reject(new Error('payload too large'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf-8').trim();
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('invalid json'));
      }
    });
    req.on('error', reject);
  });

// 补齐 handler 依赖的 res.status().json()
const decorate = (res) => {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    if (!res.headersSent) res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(body));
    return res;
  };
  return res;
};

const server = createServer(async (req, res) => {
  decorate(res);

  const path = (req.url || '').split('?')[0];

  if (path === '/api/health') {
    return res.status(200).json({ ok: true });
  }

  if (path !== '/api/notify') {
    return res.status(404).json({ error: 'Not found' });
  }

  try {
    req.body = await readJsonBody(req);
  } catch (err) {
    const tooLarge = err.message === 'payload too large';
    // 剩余的请求体不再读取，等响应确实写出去之后再断开连接。
    res.setHeader('Connection', 'close');
    res.on('finish', () => req.destroy());
    return res.status(tooLarge ? 413 : 400).json({
      error: tooLarge ? 'Payload too large' : 'Invalid JSON',
    });
  }

  try {
    await notifyHandler(req, res);
  } catch (err) {
    console.error('notify handler failed:', err);
    if (!res.headersSent) res.status(500).json({ error: 'Internal error' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`youzhi-api listening on http://${HOST}:${PORT}`);
});
