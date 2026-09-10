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
//   image       '/products/<id>.jpg'，文件放 public/products/ 下；
//               缺图或加载失败时自动回退为占位块，不会破图
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
export const products = [];
