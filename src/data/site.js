import {
  Clock,
  Cloud,
  HeadphonesIcon,
  Mail,
  MapPin,
  Phone,
  Settings,
  Wrench,
} from 'lucide-react';

export const company = {
  shortName: '友质科技',
  fullName: '北京友质科技有限公司',
  phone: '133-0133-5226',
  telHref: 'tel:13301335226',
  email: 'nancy@bjyzyes.com',
  supportEmail: 'support@bjyzyes.com',
  address: '北京市海淀区知春路113号',
  addressDetail: '银网中心8层808室',
  businessDays: '周一至周五',
  businessHours: '09:00 - 18:00',
};

export const contactCards = [
  // 只放翻译层不提供的东西：图标与锚点。文案一律来自
  // translations.js 的 data.contactCards，写在这里不会生效。
  { icon: Phone, anchor: 'phone' },
  { icon: MapPin, anchor: 'address' },
  { icon: Mail, anchor: 'email' },
  { icon: Clock, anchor: 'hours' },
];

export const services = [
  {
    icon: Settings,
    title: '方案定制',
    desc: '根据数据规模与场景，量身定制硬盘选型与NAS架构方案。',
  },
  {
    icon: Wrench,
    title: '上门部署',
    desc: '北京地区专业技术人员上门安装调试，全程无忧。',
  },
  {
    icon: HeadphonesIcon,
    title: '售后维保',
    desc: '全生命周期售后服务，7×12小时响应，质保跟踪到底。',
  },
  {
    icon: Cloud,
    title: '云迁移服务',
    desc: '协助企业将公有云数据平滑迁移至私有NAS环境。',
  },
];

export const consultationTopics = [
  '产品选型',
  '方案定制',
  '售后支持',
  '价格询价',
  '上门部署',
  '数据恢复',
];

export const consultationTypes = [
  '产品咨询',
  '方案定制',
  '售后支持',
  '价格询价',
  '上门部署',
  '其他',
];

export const initialConsultForm = {
  name: '',
  phone: '',
  type: '产品咨询',
  content: '',
};
