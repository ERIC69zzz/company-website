import {
  Clock,
  Cloud,
  Database,
  HardDrive,
  HeadphonesIcon,
  Layers,
  Mail,
  MapPin,
  Phone,
  Server,
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

export const productCategoryCards = [
  {
    icon: HardDrive,
    title: '机械硬盘',
    category: 'hdd',
    desc: '希捷酷狼、东芝等企业级NAS专用硬盘，7×24小时稳定运行。',
  },
  {
    icon: Database,
    title: '固态硬盘',
    category: 'ssd',
    desc: '高速NVMe与SATA SSD，满足NAS缓存加速与高性能存储需求。',
  },
  {
    icon: Server,
    title: 'NAS私有云',
    category: 'nas',
    desc: '绿联、极空间全系产品，从双盘位到八盘位，搭载自研系统。',
  },
  {
    icon: Layers,
    title: '存储配件',
    category: 'accessory',
    desc: '硬盘盒、扩展卡、RAID卡等周边配件，一站式配齐存储方案。',
  },
];

export const contactCards = [
  {
    icon: Phone,
    title: '电话咨询',
    label: '联系电话',
    content: company.phone,
    value: company.phone,
    desc: '工作日 9:00 - 18:00',
  },
  {
    icon: MapPin,
    title: '公司地址',
    label: '公司地址',
    content: company.address,
    value: company.address,
    desc: company.addressDetail,
  },
  {
    icon: Mail,
    title: '电子邮箱',
    label: '电子邮箱',
    content: company.email,
    value: company.email,
    desc: '24小时内回复',
  },
  {
    icon: Clock,
    title: '营业时间',
    label: '工作时间',
    content: company.businessDays,
    value: `${company.businessDays} 9:00 - 18:00`,
    desc: company.businessHours,
  },
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
