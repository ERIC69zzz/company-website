import {
  Clock,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

export const company = {
  shortName: '友质科技',
  fullName: '北京友质科技有限公司',
  // 工信部备案号。境内网站须在首页底部展示并链到 beian.miit.gov.cn。
  // 放在数据层而不是翻译层：它是法定标识，三种语言下都原样显示，
  // 而翻译层的英文文案有「不得含汉字」的测试约束。
  icp: '京ICP备2026060391号-1',
  // 公安联网备案号，同样要挂在页脚，并链到全国互联网安全管理服务平台的查询页
  psbCode: '11010802050385',
  psb: '京公网安备11010802050385号',
  phone: '133-0133-5226',
  telHref: 'tel:13301335226',
  email: 'nancy@youzhiyes.com',
  supportEmail: 'contact@youzhiyes.com',
  address: '北京市海淀区知春路113号',
  addressDetail: '银网中心8层808室',
  // 结构化数据（schema.org PostalAddress）要分段的地址，与上面两行是同一个地址
  postalAddress: {
    addressRegion: '北京市',
    addressLocality: '海淀区',
    streetAddress: '知春路113号银网中心8层808室',
  },
  foundingDate: '2010-08',
  businessHours: '09:00 - 18:00',
};

export const contactCards = [
  // 只放翻译层不提供的东西：图标、锚点与链接。文案一律来自
  // translations.js 的 data.contactCards，写在这里不会生效。
  // 电话、邮箱带 href：手机上这两张卡是最显眼的号码，点不了就只能手抄。
  { icon: Phone, anchor: 'phone', href: company.telHref },
  { icon: MapPin, anchor: 'address' },
  { icon: Mail, anchor: 'email', href: `mailto:${company.email}` },
  { icon: Clock, anchor: 'hours' },
];

export const initialConsultForm = {
  name: '',
  phone: '',
  type: '产品咨询',
  content: '',
};
