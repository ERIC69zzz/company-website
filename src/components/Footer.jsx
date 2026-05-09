import { HardDrive } from 'lucide-react';

const links = [
  {
    title: '产品',
    items: ['机械硬盘', '固态硬盘', 'NAS私有云', '存储配件'],
  },
  {
    title: '服务',
    items: ['方案定制', '上门部署', '售后维保', '云迁移'],
  },
  {
    title: '公司',
    items: ['关于我们', '联系方式', '营业时间', '隐私政策'],
  },
];

export default function Footer() {
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
                  <li key={item}>
                    <span className="text-sm text-zinc-500 hover:text-brand-400 transition-colors cursor-default">
                      {item}
                    </span>
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
