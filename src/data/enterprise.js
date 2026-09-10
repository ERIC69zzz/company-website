// Series-level information from the supplied Exascend introduction, pp. 18–19.
// Do not treat these as individual purchasable SKUs or guaranteed inventory.
export const enterpriseSeries = [
  { id: 'SE4', copyKey: 'se4', interface: 'SATA', formFactors: '2.5″ / mSATA / M.2' },
  { id: 'PE4', copyKey: 'pe4', interface: 'PCIe Gen4', formFactors: 'U.2 / E1.S / M.2' },
];

// 企业级整机。文案（标题、亮点、规格行）在 translations.js 的
// business.enterprise.products 下，这里只放与语言无关的部分。
//
// images 的第一张同时用作企业页卡片的封面，其余按顺序进详情页轮播。
// 只有一张时轮播控件自动隐藏，退化成一张静态大图。
export const enterpriseProducts = [
  {
    id: 'zspace-p8-plus',
    name: 'P8+',
    brand: '极空间',
    series: 'ZES',
    images: [
      '/products/zspace-p8-plus.jpg',
      '/products/zspace-p8-plus-front-left.jpg',
      '/products/zspace-p8-plus-front-right.jpg',
      '/products/zspace-p8-plus-rear.jpg',
      '/products/zspace-p8-plus-three-view.jpg',
    ],
    // 规格行的顺序，标签与取值见 translations 里同名的 key
    specKeys: [
      'cpu', 'gpu', 'memory', 'emmc', 'bays', 'sata', 'esata',
      'm2', 'network', 'usb', 'hdmi', 'pcie', 'power', 'ups', 'raid',
    ],
    highlightKeys: ['bays', 'network', 'power', 'ecc'],
  },
];

export const findEnterpriseProduct = (id) =>
  enterpriseProducts.find((item) => item.id === id) || null;

export function enterpriseInquiryUrl(series) {
  const params = new URLSearchParams({ topic: 'enterprise' });
  if (enterpriseSeries.some((item) => item.id === series)) params.set('series', series);
  return `/consult?${params}`;
}

// 整机询价把型号带进咨询表单，与系列询价共用 topic=enterprise 通路
export const enterpriseProductInquiryUrl = (id) => {
  const product = findEnterpriseProduct(id);
  const params = new URLSearchParams({ topic: 'enterprise' });
  if (product) params.set('model', product.name);
  return `/consult?${params}`;
};

// 预填逻辑已并入 data/consult.js 的 getConsultPrefill，
// 企业询价只是其中一个主题，与四个服务入口共用同一条通路。
