import assert from 'node:assert/strict';
import test from 'node:test';
import handler from '../api/notify.js';
import { __testing } from '../api/_lib/guard.js';

// 构造一个最小的 res 替身，记录状态码与响应体
const makeRes = () => {
  const res = { statusCode: 0, body: null, headers: {} };
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (body) => { res.body = body; return res; };
  res.setHeader = (k, v) => { res.headers[k] = v; };
  return res;
};

const makeReq = (body, ip = '203.0.113.9') => ({
  method: 'POST',
  headers: {
    host: 'www.bjyzyes.com',
    origin: 'https://www.bjyzyes.com',
    'x-forwarded-for': ip,
  },
  body,
});

const validForm = {
  name: '张三',
  phone: '13800138000',
  type: '产品咨询',
  content: '想了解 4 盘位 NAS 方案',
};

test.beforeEach(() => __testing.reset());

test('蜜罐字段被填写时静默当作成功，不发送通知', async () => {
  const res = makeRes();
  // 故意不设置 WECOM_WEBHOOK_URL：若逻辑走到发送分支会返回 500，
  // 返回 200 即证明在此之前就被拦下了
  delete process.env.WECOM_WEBHOOK_URL;
  await handler(makeReq({ ...validForm, fax: 'http://spam.example' }), res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true });
});

test('提交过快时静默当作成功，不发送通知', async () => {
  const res = makeRes();
  delete process.env.WECOM_WEBHOOK_URL;
  await handler(makeReq({ ...validForm, renderedAt: Date.now() }), res, 'ip-fast');
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true });
});

test('正常填写耗时的提交会走到发送逻辑', async () => {
  const res = makeRes();
  delete process.env.WECOM_WEBHOOK_URL;
  // 渲染于 30 秒前，属于真人正常填写速度
  await handler(makeReq({ ...validForm, renderedAt: Date.now() - 30_000 }), res);
  // 未配置 webhook 时应返回 500，说明已越过反垃圾检查
  assert.equal(res.statusCode, 500);
});

test('蜜罐为空字符串不影响正常提交', async () => {
  const res = makeRes();
  delete process.env.WECOM_WEBHOOK_URL;
  await handler(makeReq({ ...validForm, fax: '', renderedAt: Date.now() - 30_000 }), res);
  assert.equal(res.statusCode, 500);
});
