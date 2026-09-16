import assert from 'node:assert/strict';
import test from 'node:test';
import handler from '../api/notify.js';
import { __testing } from '../api/_lib/guard.js';

// 企业微信的业务错误藏在 200 响应体里：key 失效、机器人被删、超出发送频率
// 限制，都是 HTTP 200 + errcode != 0。只看状态码就会对客户说「提交成功」
// 而群里什么都没有，线索静默丢失。这里守住这条边界。

const makeRes = () => {
  const res = { statusCode: 0, body: null, headers: {} };
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (body) => { res.body = body; return res; };
  res.setHeader = (k, v) => { res.headers[k] = v; };
  return res;
};

const makeReq = (ip) => ({
  method: 'POST',
  headers: {
    host: 'www.bjyzyes.com',
    origin: 'https://www.bjyzyes.com',
    'x-forwarded-for': ip,
  },
  body: {
    name: '张三',
    phone: '13800138000',
    type: '产品咨询',
    content: '想了解 4 盘位 NAS 方案',
    // 渲染于 30 秒前，越过「填得太快」的反垃圾检查
    renderedAt: Date.now() - 30_000,
  },
});

// 伪造企业微信的响应。返回一个还原函数，避免污染其它测试。
const stubFetch = (response) => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => response;
  return () => { globalThis.fetch = original; };
};

const wecomReply = (body, { ok = true, status = 200 } = {}) => ({
  ok,
  status,
  json: async () => {
    if (typeof body === 'string') throw new SyntaxError('Unexpected token');
    return body;
  },
  text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
});

test.beforeEach(() => {
  __testing.reset();
  process.env.WECOM_WEBHOOK_URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=test';
});

test.afterEach(() => {
  delete process.env.WECOM_WEBHOOK_URL;
});

test('errcode 为 0 才算发送成功', async () => {
  const restore = stubFetch(wecomReply({ errcode: 0, errmsg: 'ok' }));
  const res = makeRes();
  await handler(makeReq('203.0.113.21'), res);
  restore();
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { success: true });
});

test('errcode 非 0 时返回失败，不对客户谎报成功', async () => {
  // 93000 是 key 失效 / 机器人被删时企业微信的返回
  const restore = stubFetch(wecomReply({ errcode: 93000, errmsg: 'invalid webhook url' }));
  const res = makeRes();
  await handler(makeReq('203.0.113.22'), res);
  restore();
  assert.equal(res.statusCode, 500);
  assert.notDeepEqual(res.body, { success: true });
});

test('响应体不是 JSON 时按失败处理', async () => {
  const restore = stubFetch(wecomReply('<html>网关错误</html>'));
  const res = makeRes();
  await handler(makeReq('203.0.113.23'), res);
  restore();
  assert.equal(res.statusCode, 500);
});

test('HTTP 状态码本身失败时返回失败', async () => {
  const restore = stubFetch(wecomReply('Bad Gateway', { ok: false, status: 502 }));
  const res = makeRes();
  await handler(makeReq('203.0.113.24'), res);
  restore();
  assert.equal(res.statusCode, 500);
});
