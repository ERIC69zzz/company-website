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
//   highlights  可选。详情页「关键特性」区块，每条 { title, desc }；
//               省略时整段跳过，可以先只录规格、之后再补
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
    id: 'zspace-z2-ultra',
    name: 'Z2 Ultra',
    brand: '极空间',
    category: 'nas',
    // 官网未标价，先走「询价」
    price: '询价',
    // 工作区没有 zspace-z2-ultra.jpg，用正面左视图兼作封面
    image: '/products/zspace-z2-ultra-front-left.jpg',
    images: [
      '/products/zspace-z2-ultra-front-left.jpg',
      '/products/zspace-z2-ultra-front-right.jpg',
      '/products/zspace-z2-ultra-rear.jpg',
    ],
    shortDesc: '全闪双盘位 NAS，Intel N150 四核，内存可升级至 16GB',
    description: '极空间 Z2 Ultra 是一台面向进阶家庭与个人工作室的全闪私有云。处理器为最新一代 Intel N150 四核 3.6GHz，配 24 执行单元的 UHD 核显，8GB DDR4 内存可自行升级到 16GB，跑 Docker 与虚拟机都有余量。两个主盘位兼容 SATA 与 U.2 固态盘、单盘最高 8TB，另有两个 M.2 NVMe 位可做缓存加速，存储模式支持 ZDR 与 RAID1。机身采用直通式风道与悬浮式硬盘架，兼顾散热与静音。HDMI 2.1 支持 4K@60Hz 直连电视，并可本地部署 DeepSeek R1 7B 模型，推理全程不出设备。',
    // 规格取自极空间官网「硬件参数表」（zspace.cn/z2ultra/）
    specs: {
      '处理器': 'Intel N150 · 四核 3.6GHz',
      '核显': 'Intel UHD Graphics · 24 执行单元',
      '内存': '8GB DDR4 · 可升级至 16GB',
      '系统存储': 'eMMC 32GB · V5.1',
      '盘位': 'SATA / U.2 × 2 · 单盘最高 8TB',
      'M.2': 'NVMe 8GT/s × 2',
      '网口': '2.5GbE RJ-45 × 1',
      'USB': 'USB-A 3.2 Gen2 × 1 / USB-C 3.2 Gen2 × 1',
      'HDMI': 'HDMI 2.1 · 4K@60Hz',
      '存储模式': 'ZDR / RAID1 · 支持读写缓存',
    },
    tags: ['全闪双盘位', '内存可升级', '本地 AI'],
    highlights: [
      { title: '新一代 Intel N150', desc: '四核 3.6GHz 搭配 24 执行单元的 UHD 核显，能效与静音比上一代更进一步。' },
      { title: '全闪双盘位', desc: '两个主盘位兼容 SATA 与 U.2 固态盘、单盘最高 8TB，另有两个 M.2 NVMe 位可做缓存加速。' },
      { title: '内存可自行升级', desc: '出厂 8GB DDR4，可升级到 16GB，Docker 容器与虚拟机同时跑也有余量。' },
      { title: 'AI 推理不出设备', desc: '官方内置 DeepSeek R1 7B 本地部署，一键安装；相册的人像、文字与自然语言搜索全部本地完成。' },
    ],
  },
];
