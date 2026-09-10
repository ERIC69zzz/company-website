import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { products } from '../src/data/products.js';
import { localizeProducts } from '../src/i18n/products.js';
import { translations } from '../src/i18n/translations.js';

test('中文、英文和日文均包含完整的核心列表', () => {
  for (const language of ['zh', 'en', 'ja']) {
    const copy = translations[language];
    assert.equal(copy.data.categories.length, 5);
    assert.equal(copy.data.services.length, 4);
    assert.equal(copy.data.contactCards.length, 4);
    assert.equal(copy.data.consultationTypes.length, 6);
  }
});

test('英文和日文产品目录覆盖全部产品', () => {
  for (const language of ['en', 'ja']) {
    const localized = localizeProducts(products, language);
    assert.equal(localized.length, products.length);

    for (const product of localized) {
      assert.ok(product.name);
      assert.ok(product.brand);
      assert.ok(product.shortDesc);
      assert.ok(product.description);
      assert.ok(product.tags.length > 0);
      assert.ok(Object.keys(product.specs).length > 0);
    }
  }
});

test('英文产品文案不残留中文字符', () => {
  const englishProducts = localizeProducts(products, 'en');
  const visibleContent = englishProducts.map((product) => ({
    name: product.name,
    brand: product.brand,
    // price 也会显示给访客：「询价」这类非数字占位必须翻译
    price: product.price,
    shortDesc: product.shortDesc,
    description: product.description,
    tags: product.tags,
    specs: product.specs,
    // 亮点是整个数组被覆盖，漏译时中文会整段漏到英文页
    highlights: product.highlights,
  }));

  assert.doesNotMatch(JSON.stringify(visibleContent), /\p{Script=Han}/u);
});

test('中英日公司介绍包含完整的企业档案与能力内容', () => {
  for (const language of ['zh', 'en', 'ja']) {
    const copy = translations[language];
    const profile = copy.brandPage.profile;

    assert.equal(copy.nav.brandWorld, copy.brandPage.title);
    assert.equal(profile.paragraphs.length, 2);
    assert.equal(profile.metrics.length, 4);
    assert.equal(profile.facts.length, 4);
    assert.equal(profile.capabilities.length, 4);
    assert.equal(profile.industries.length, 5);
    assert.ok(profile.cta);

    for (const item of [...profile.metrics, ...profile.facts, ...profile.capabilities]) {
      assert.ok(item.label || item.title);
      assert.ok(item.value || item.description);
    }
  }
});

const publicDir = fileURLToPath(new URL('../public', import.meta.url));

test('产品目录里引用的图片都真实存在，图廊不重复', () => {
  for (const product of products) {
    // 封面缺图时页面会回退成占位块，不算错，但路径写法要规范
    assert.match(product.image, /^\/products\/.+\.(jpg|png|webp)$/, `${product.id} 封面路径不规范`);

    if (!product.images) continue;

    // 图廊没有缺图回退，文件名打错会直接留下破图
    for (const src of product.images) {
      assert.match(src, /^\/products\/.+\.(jpg|png|webp)$/, `${product.id} 图廊路径不规范：${src}`);
      assert.ok(existsSync(`${publicDir}${src}`), `${product.id} 图廊引用了不存在的图片：${src}`);
    }
    assert.equal(new Set(product.images).size, product.images.length, `${product.id} 图廊有重复图片`);
    assert.equal(product.images[0], product.image, `${product.id} 图廊第一张应与封面一致`);
  }
});
