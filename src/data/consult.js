// 带扩展名：这个模块会被 node --test 直接加载，Node 的 ESM 不做扩展名补全。
import { enterpriseSeries } from './enterprise.js';

// 服务入口带到咨询表单的主题。value 一律用 consultationTypes 里的中文字面量，
// 它跨语言稳定（只翻 label 不翻 value），所以这张表三种语言共用一份。
//
// 数据迁移没有对应的咨询类型，归到「方案定制」，靠预填的需求描述点明是迁移。
export const consultTopics = {
  solution: '方案定制',
  onsite: '上门部署',
  support: '售后支持',
  migration: '方案定制',
};

export const consultUrl = (topic) =>
  consultTopics[topic] ? `/consult?topic=${topic}` : '/consult';

// 企业询价走单独的模板（要拼系列号），其余服务主题共用 consultTopics 文案。
const readTopic = (searchParams) => String(searchParams.get('topic') || '');

// 返回填进表单的字段，没有匹配的主题时返回 null。
// 只回填咨询类型与需求描述，绝不预填姓名、电话等客户个人信息。
export function getConsultPrefill(searchParams, copy) {
  const topic = readTopic(searchParams);

  if (topic === 'enterprise') {
    const series = enterpriseSeries.find((item) => item.id === searchParams.get('series'));
    return {
      type: '方案定制',
      content: copy.business.enterprise.inquiryTemplate.replace(
        '{series}',
        series ? `Exascend ${series.id} ` : '',
      ),
    };
  }

  const type = consultTopics[topic];
  if (!type) return null;

  return { type, content: copy.consultTopics[topic].template };
}

// 表单上方的来源说明，让用户知道自己是从哪个入口过来的。
export function getConsultContext(searchParams, copy) {
  const topic = readTopic(searchParams);
  if (topic === 'enterprise') return copy.business.enterprise.consultContext;
  return consultTopics[topic] ? copy.consultTopics[topic].context : null;
}
