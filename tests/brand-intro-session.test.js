import test from 'node:test';
import assert from 'node:assert/strict';
import { hasPlayedBrandIntro, markBrandIntroPlayed } from '../src/utils/brandIntroSession.js';

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test('品牌开场在同一个浏览会话中只播放一次', () => {
  const storage = createStorage();
  assert.equal(hasPlayedBrandIntro(storage), false);
  markBrandIntroPlayed(storage);
  assert.equal(hasPlayedBrandIntro(storage), true);
});

test('浏览器禁用会话存储时不会影响网站运行', () => {
  const blockedStorage = {
    getItem: () => { throw new Error('blocked'); },
    setItem: () => { throw new Error('blocked'); },
  };
  assert.equal(hasPlayedBrandIntro(blockedStorage), false);
  assert.doesNotThrow(() => markBrandIntroPlayed(blockedStorage));
});
