import test from 'node:test';
import assert from 'node:assert/strict';
import { enterpriseInquiryUrl, getEnterpriseInquiry } from '../src/data/enterprise.js';
import { translations } from '../src/i18n/translations.js';

test('企业系列链接把选择带到咨询表单，不预填客户个人信息', () => {
  for (const series of ['SE4', 'PE4']) {
    const url = new URL(enterpriseInquiryUrl(series), 'https://example.test');
    assert.equal(url.pathname, '/consult');
    const inquiry = getEnterpriseInquiry(url.searchParams, translations.zh.business.enterprise.inquiryTemplate);
    assert.equal(inquiry.type, '方案定制');
    assert.ok(inquiry.content.includes(`Exascend ${series}`));
    assert.equal(inquiry.name, undefined);
    assert.equal(inquiry.phone, undefined);
  }
});

test('普通咨询不会误带企业信息，未知系列不会进入预填内容', () => {
  const template = translations.zh.business.enterprise.inquiryTemplate;
  assert.equal(getEnterpriseInquiry(new URLSearchParams('series=PE4'), template), null);
  assert.equal(getEnterpriseInquiry(new URLSearchParams('topic=personal'), template), null);
  const unrecognized = new URLSearchParams({ topic: 'enterprise', series: 'UNCONFIRMED-MODEL' });
  assert.ok(!getEnterpriseInquiry(unrecognized, template).content.includes('UNCONFIRMED-MODEL'));
  assert.equal(enterpriseInquiryUrl('UNCONFIRMED-MODEL'), '/consult?topic=enterprise');
});

test('个人分类与企业询价在三种语言中均有完整文案', () => {
  for (const language of ['zh', 'en', 'ja']) {
    const b = translations[language].business;
    for (const category of ['hdd', 'ssd', 'nas']) {
      assert.ok(b.home.categories[category].title);
      assert.ok(b.home.categories[category].detail);
    }
    const inquiry = getEnterpriseInquiry(new URLSearchParams('topic=enterprise&series=PE4'), b.enterprise.inquiryTemplate);
    assert.ok(inquiry.content.includes('Exascend PE4'));
    assert.doesNotMatch(inquiry.content, /\{series\}|undefined/);
    assert.equal(b.enterprise.steps.length, 3);
    assert.deepEqual(Object.keys(b.scenarios.items), ['home', 'creator', 'team', 'enterprise']);
    for (const scenario of Object.values(b.scenarios.items)) {
      assert.ok(scenario.label);
      assert.ok(scenario.title);
      assert.equal(scenario.points.length, 3);
      assert.ok(scenario.products.length >= 2);
    }
  }
  assert.doesNotMatch(JSON.stringify(translations.en.business), /\p{Script=Han}/u);
});
