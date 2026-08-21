import test from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../src/data/products.js';
import { localizeProducts } from '../src/i18n/products.js';
import { translations } from '../src/i18n/translations.js';

test('中文、英文和日文均包含完整的核心列表', () => {
  for (const language of ['zh', 'en', 'ja']) {
    const copy = translations[language];
    assert.equal(copy.data.categories.length, 5);
    assert.equal(copy.data.categoryCards.length, 4);
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
    shortDesc: product.shortDesc,
    description: product.description,
    tags: product.tags,
    specs: product.specs,
  }));

  assert.doesNotMatch(JSON.stringify(visibleContent), /\p{Script=Han}/u);
});
