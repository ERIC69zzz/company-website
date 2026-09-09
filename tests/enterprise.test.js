import test from 'node:test';
import assert from 'node:assert/strict';
import { enterpriseInquiryUrl } from '../src/data/enterprise.js';
import { consultTopics, consultUrl, getConsultContext, getConsultPrefill } from '../src/data/consult.js';
import { translations } from '../src/i18n/translations.js';

test('企业系列链接把选择带到咨询表单，不预填客户个人信息', () => {
  for (const series of ['SE4', 'PE4']) {
    const url = new URL(enterpriseInquiryUrl(series), 'https://example.test');
    assert.equal(url.pathname, '/consult');
    const inquiry = getConsultPrefill(url.searchParams, translations.zh);
    assert.equal(inquiry.type, '方案定制');
    assert.ok(inquiry.content.includes(`Exascend ${series}`));
    assert.equal(inquiry.name, undefined);
    assert.equal(inquiry.phone, undefined);
  }
});

test('普通咨询不会误带企业信息，未知系列不会进入预填内容', () => {
  const copy = translations.zh;
  assert.equal(getConsultPrefill(new URLSearchParams('series=PE4'), copy), null);
  assert.equal(getConsultPrefill(new URLSearchParams('topic=personal'), copy), null);
  const unrecognized = new URLSearchParams({ topic: 'enterprise', series: 'UNCONFIRMED-MODEL' });
  assert.ok(!getConsultPrefill(unrecognized, copy).content.includes('UNCONFIRMED-MODEL'));
  assert.equal(enterpriseInquiryUrl('UNCONFIRMED-MODEL'), '/consult?topic=enterprise');
});

test('个人分类与企业询价在三种语言中均有完整文案', () => {
  for (const language of ['zh', 'en', 'ja']) {
    const b = translations[language].business;
    for (const category of ['hdd', 'ssd', 'nas']) {
      assert.ok(b.home.categories[category].title);
      assert.ok(b.home.categories[category].detail);
    }
    const inquiry = getConsultPrefill(new URLSearchParams('topic=enterprise&series=PE4'), translations[language]);
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

test('四个服务入口各自带主题进入咨询表单，且预填的类型是表单里真实存在的选项', () => {
  const validTypes = new Set(translations.zh.data.consultationTypes.map((item) => item.value));

  for (const topic of Object.keys(consultTopics)) {
    assert.equal(consultUrl(topic), `/consult?topic=${topic}`);

    for (const language of ['zh', 'en', 'ja']) {
      const copy = translations[language];
      const prefill = getConsultPrefill(new URLSearchParams(`topic=${topic}`), copy);

      assert.ok(validTypes.has(prefill.type), `${topic} 预填了下拉里不存在的类型：${prefill.type}`);
      assert.equal(prefill.content, copy.consultTopics[topic].template);
      // 只回填诉求，绝不预填客户个人信息
      assert.equal(prefill.name, undefined);
      assert.equal(prefill.phone, undefined);
      assert.ok(getConsultContext(new URLSearchParams(`topic=${topic}`), copy));
    }
  }
});

test('未知主题不预填，也不会拼出带主题的地址', () => {
  assert.equal(getConsultPrefill(new URLSearchParams('topic=unknown'), translations.zh), null);
  assert.equal(getConsultContext(new URLSearchParams('topic=unknown'), translations.zh), null);
  assert.equal(consultUrl('unknown'), '/consult');
  assert.equal(consultUrl(undefined), '/consult');
});

test('页脚服务组与首页服务卡片使用同一套叫法，三种语言均一致', () => {
  for (const language of ['zh', 'en', 'ja']) {
    const copy = translations[language];
    assert.deepEqual(
      copy.footer.groups[1].items,
      copy.data.services.map((service) => service.title),
      `${language} 的页脚服务组与 data.services 叫法不一致`,
    );
  }
});
