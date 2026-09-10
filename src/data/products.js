// 分类是产品页的筛选框架，与具体产品无关，不随产品增删变化。
// 显示名称来自 translations.js 的 data.categories（按顺序一一对应）。
export const categories = [
  { id: 'all', name: '全部产品' },
  { id: 'nas', name: 'NAS私有云' },
  { id: 'hdd', name: '机械硬盘' },
  { id: 'ssd', name: '固态硬盘' },
  { id: 'accessory', name: '存储配件' },
];

// 产品目录，逐款补充。空数组时产品页显示 productsPage.empty 的空状态，
// 产品详情路由全部落到 404，sitemap 只含七条静态路由 —— 都是预期行为。
//
// 新增一款照下面的模板填，字段含义：
//   id          URL 片段，也是图片文件名与译文的索引键，用小写连字符
//   name        型号，一般不翻译
//   brand       品牌，中文写；英日显示名查 i18n/products.js 的 brandNames
//   category    必须是上面 categories 里除 'all' 之外的某个 id
//   price       '¥1,299' 这类字面量，或 '询价'（后者会按 priceLabels 翻译）
//   image       列表卡片的封面，'/products/<id>.jpg'，文件放 public/products/ 下；
//               缺图或加载失败时自动回退为占位块，不会破图
//   images      可选。详情页大图，两张以上时变成可左右滑动的图廊；
//               省略或只有一张时详情页沿用 image 那张（带缺图占位）
//   shortDesc   列表卡片上的一行简介
//   description 详情页正文
//   specs       规格表，键名查 specLabels、值查 specValues 做翻译，
//               查不到的原样显示，所以尽量复用已有键名
//   tags        详情页的标签，2-3 个
//
// export const products = [
//   {
//     id: 'zspace-z4-pro',
//     name: 'Z4 Pro',
//     brand: '极空间',
//     category: 'nas',
//     price: '¥2,999',
//     image: '/products/zspace-z4-pro.jpg',
//     shortDesc: '4盘位高性能NAS，Intel N97处理器，支持4K影视墙',
//     description: '完整介绍，两三句话说清定位、配置与适用场景。',
//     specs: {
//       '处理器': 'Intel N97',
//       '内存': '4GB / 8GB DDR5',
//       '盘位': '4盘位（2.5/3.5英寸）',
//     },
//     tags: ['4盘位', '极影视', 'HDMI输出'],
//   },
// ];
//
// 补完中文后，英日文案加到 i18n/products.js 的 productCopy 里，
// 键用同一个 id —— 缺译时会回落到中文原文。
export const products = [
  {
    id: 'zspace-q2c',
    name: 'Q2C',
    brand: '极空间',
    category: 'nas',
    // 官网未标价，先走「询价」；要显示价格就换成 '¥1,399' 这类字面量
    price: '询价',
    image: '/products/zspace-q2c.jpg',
    images: [
      '/products/zspace-q2c.jpg',
      '/products/zspace-q2c-front-left.jpg',
      '/products/zspace-q2c-front-right.jpg',
      '/products/zspace-q2c-rear.jpg',
    ],
    shortDesc: '2 盘位入门家用 NAS，RK3568 四核处理器，单盘最高 32TB',
    description: '极空间 Q2C 是面向家庭的入门级双盘位私有云。瑞芯微 RK3568 四核处理器搭配 2GB DDR4 内存，另有 1Tops NPU 支撑相册的人像与场景识别。两个 3.5 英寸盘位单盘最高支持 32TB，配合自研 ZDR 存储方案在容量与冗余之间取舍。机身为一体化注塑结构，采用悬浮式硬盘架与硅胶减震阀，配 7015 智能温控风扇，可立可卧摆放。支持手机与电脑备份、微信附件备份、苹果时光机，以及 BT/PT 多协议下载。',
    // 规格取自极空间官网「小身材 大能量」参数表（zspace.cn/q2c/）
    specs: {
      '处理器': '瑞芯微 RK3568 · Cortex-A55 四核 2.0GHz',
      '核显': 'ARM Mali G52',
      'NPU': 'Neural Networks 1Tops',
      '内存': '2GB DDR4',
      '系统存储': 'eMMC 16GB · V5.1',
      '盘位': '2 盘位 · 3.5 英寸 · 单盘最高 32TB',
      '接口': 'SATA3 6Gbps × 2',
      '网口': '1GbE × 1',
      'USB': 'USB 3.0 × 1 / USB 2.0 × 1',
      '风扇': '7015 智能温控风扇 × 1',
      '电源': '12V · 5.5×2.5mm',
    },
    tags: ['2盘位', '入门首选', 'AI 相册'],
  },
];
