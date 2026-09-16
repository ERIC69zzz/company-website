import test from 'node:test';
import assert from 'node:assert/strict';
import { consultErrorMessage } from '../src/data/consult.js';

// 表单提交失败时页面上显示什么，直接决定客户是再试一次还是直接走人。
// 服务端的错误文案分两类，这里守住这条边界。

const fallback = '提交失败，请稍后重试';

test('400 的校验提示按语言返回，可以直接显示给客户', () => {
  assert.equal(
    consultErrorMessage(400, { error: '联系电话格式不正确' }, fallback),
    '联系电话格式不正确',
  );
  assert.equal(
    consultErrorMessage(400, { error: 'Please enter a valid phone number.' }, fallback),
    'Please enter a valid phone number.',
  );
});

test('500 系列的内部英文报错不外露', () => {
  for (const error of ['Webhook not configured', 'Webhook failed', 'Notify failed']) {
    assert.equal(consultErrorMessage(500, { error }, fallback), fallback);
  }
});

test('限流提示只有中文，英文和日文界面下回落到本地文案', () => {
  const enFallback = 'Submission failed. Please try again later.';
  assert.equal(
    consultErrorMessage(429, { error: '请求过于频繁，请稍后再试' }, enFallback),
    enFallback,
  );
});

test('响应体缺失或为空时回落', () => {
  assert.equal(consultErrorMessage(400, {}, fallback), fallback);
  assert.equal(consultErrorMessage(400, { error: '' }, fallback), fallback);
  assert.equal(consultErrorMessage(400, undefined, fallback), fallback);
  assert.equal(consultErrorMessage(403, { error: 'Forbidden' }, fallback), fallback);
});
