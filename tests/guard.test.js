import assert from 'node:assert/strict';
import test from 'node:test';
import { __testing, guard } from '../api/_lib/guard.js';

const WINDOW_MS = 60_000;

const request = ({
  origin = 'https://www.bjyzyes.com',
  host = 'www.bjyzyes.com',
  ip = '203.0.113.1',
} = {}) => ({
  headers: {
    host,
    origin,
    'x-forwarded-for': ip,
  },
});

test.beforeEach(() => {
  __testing.reset();
});

test.after(() => {
  __testing.reset();
});

test('拒绝非同源请求', () => {
  const result = guard(
    request({ origin: 'https://example.com' }),
    { name: 'origin', limit: 2, windowMs: WINDOW_MS },
  );

  assert.equal(result?.status, 403);
});

test('同源请求按 IP 限流并返回 Retry-After', () => {
  const options = { name: 'per-ip', limit: 2, windowMs: WINDOW_MS };

  assert.equal(guard(request(), options), null);
  assert.equal(guard(request(), options), null);

  const blocked = guard(request(), options);
  assert.equal(blocked?.status, 429);
  assert.match(blocked?.headers?.['Retry-After'] || '', /^\d+$/);
});

test('实例级总量限制不能通过切换 IP 绕过', () => {
  const options = {
    name: 'global',
    limit: 10,
    globalLimit: 2,
    windowMs: WINDOW_MS,
  };

  assert.equal(guard(request({ ip: '203.0.113.10' }), options), null);
  assert.equal(guard(request({ ip: '203.0.113.11' }), options), null);
  assert.equal(guard(request({ ip: '203.0.113.12' }), options)?.status, 429);
});

test('限流桶始终受硬上限约束且保留全局桶', () => {
  const globalKey = 'capacity:__global__';
  __testing.takeToken(globalKey, 1, WINDOW_MS);

  for (let index = 0; index < __testing.maxBuckets + 250; index += 1) {
    __testing.takeToken(`capacity:203.0.113.${index}`, 1, WINDOW_MS);
  }

  assert.equal(__testing.bucketCount(), __testing.maxBuckets);
  assert.equal(__testing.hasBucket(globalKey), true);
  assert.equal(__testing.takeToken(globalKey, 1, WINDOW_MS).allowed, false);
});
