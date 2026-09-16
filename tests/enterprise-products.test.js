import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  enterpriseProductInquiryUrl,
  enterpriseProducts,
  findEnterpriseProduct,
} from '../src/data/enterprise.js';
import { getConsultPrefill } from '../src/data/consult.js';
import { translations } from '../src/i18n/translations.js';

const publicDir = fileURLToPath(new URL('../public', import.meta.url));

test('每台整机在三种语言下都有完整的亮点与规格文案', () => {
  assert.ok(enterpriseProducts.length > 0, '整机列表不应为空');

  for (const product of enterpriseProducts) {
    for (const language of ['zh', 'en', 'ja']) {
      const text = translations[language].business.enterprise.products[product.id];
      assert.ok(text, `${language} 缺少 ${product.id} 的文案`);
      assert.ok(text.tagline && text.summary && text.description);
      // 展示用品牌名按语言给，否则英日页面会出现中文品牌
      assert.ok(text.brand, `${language} 缺少 ${product.id} 的展示品牌名`);

      // 页面按 specKeys / highlightKeys 的顺序渲染，缺一个键就会渲染出 undefined
      for (const key of product.specKeys) {
        assert.ok(text.specs[key]?.label, `${language} 的 ${product.id} 缺规格标签 ${key}`);
        assert.ok(text.specs[key]?.value, `${language} 的 ${product.id} 缺规格取值 ${key}`);
      }
      for (const key of product.highlightKeys) {
        assert.ok(text.highlights[key]?.title, `${language} 的 ${product.id} 缺亮点标题 ${key}`);
        assert.ok(text.highlights[key]?.desc, `${language} 的 ${product.id} 缺亮点说明 ${key}`);
      }
    }
  }
});

test('整机图片都真实存在，第一张是卡片与轮播的封面', () => {
  for (const product of enterpriseProducts) {
    assert.ok(product.images.length > 0, `${product.id} 至少要有一张图`);
    for (const src of product.images) {
      assert.match(src, /^\/products\/.+\.(jpg|png|webp)$/);
      assert.ok(existsSync(`${publicDir}${src}`), `图片不存在：${src}`);
    }
    // 重复的图会让轮播出现两张一样的幻灯片，且 React key 撞车
    assert.equal(new Set(product.images).size, product.images.length, `${product.id} 有重复图片`);
  }
});

test('整机询价把型号带进咨询表单，未知型号不进入预填内容', () => {
  const copy = translations.zh;

  for (const product of enterpriseProducts) {
    const url = new URL(enterpriseProductInquiryUrl(product.id), 'https://example.test');
    assert.equal(url.pathname, '/consult');
    assert.equal(url.searchParams.get('model'), product.name);

    const prefill = getConsultPrefill(url.searchParams, copy);
    assert.equal(prefill.type, '方案定制');
    assert.ok(prefill.content.includes(`${product.brand} ${product.name}`));
    // 只带诉求，不预填客户个人信息
    assert.equal(prefill.name, undefined);
    assert.equal(prefill.phone, undefined);
  }

  const unknown = new URLSearchParams({ topic: 'enterprise', model: 'NOT-A-MODEL' });
  assert.ok(!getConsultPrefill(unknown, copy).content.includes('NOT-A-MODEL'));
  assert.equal(enterpriseProductInquiryUrl('nope'), '/consult?topic=enterprise');
  assert.equal(findEnterpriseProduct('nope'), null);
});
