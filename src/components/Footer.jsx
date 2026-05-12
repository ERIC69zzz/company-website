import { HardDrive } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const links = [
  {
    title: '产品',
    items: [
      { label: '机械硬盘', href: '/products?category=hdd' },
      { label: '固态硬盘', href: '/products?category=ssd' },
      { label: 'NAS私有云', href: '/products?category=nas' },
      { label: '存储配件', href: '/products?category=accessory' },
    ],
  },
  {
    title: '服务',
    items: [
      { label: '方案定制', href: '/consult' },
      { label: '上门部署', href: '/consult' },
      { label: '售后维保', href: '/consult' },
      { label: '云迁移', href: '/consult' },
    ],
  },
  {
    title: '公司',
    items: [
      { label: '品牌天地', href: '/brand' },
      { label: '联系方式', href: '/contact' },
      { label: '营业时间', href: null },
      { label: '隐私政策', href: null },
    ],
  },
];

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="relative border-t border-white/5 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <HardDrive className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white">北京友质科技有限公司</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mb-6">
              成立于2010年，专注硬盘与NAS私有云存储领域，为个人及企业客户提供一站式数据存储解决方案。
            </p>
            <div className="text-xs text-zinc-600">
              <div>北京市海淀区中关村南大街甲2号数码大厦B座901</div>
              <div className="mt-1">电话：133-0133-5226</div>
            </div>
          </div>

          {links.map((group) => (
            <div key={group.title}>
              <div className="text-sm font-semibold text-white mb-4">{group.title}</div>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <span
                        onClick={() => navigate(item.href)}
                        className="text-sm text-zinc-500 hover:text-brand-400 transition-colors cursor-pointer"
                      >
                        {item.label}
                      </span>
                    ) : (
                      <span className="text-sm text-zinc-500 cursor-default">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-600">
            © {new Date().getFullYear()} 北京友质科技有限公司 版权所有
          </div>
          <div className="text-xs text-zinc-600">
            专注存储 · 值得信赖
          </div>
        </div>
      </div>
    </footer>
  );
}
