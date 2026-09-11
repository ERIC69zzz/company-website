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
    id: 'zspace-z425',
    name: 'Z425',
    brand: '极空间',
    category: 'nas',
    price: '询价',
    // 工作区的图是轻享版实机，两个版本同机身，用正面左视图兼作封面
    image: '/products/zspace-z425-lite-front-left.jpg',
    images: [
      '/products/zspace-z425-lite-front-left.jpg',
      '/products/zspace-z425-lite-front-right.jpg',
      '/products/zspace-z425-lite-rear.jpg',
    ],
    shortDesc: '酷睿 Ultra 平台四盘位 NAS，双雷电 4 与万兆网口，可本地跑 14B 模型',
    description: '极空间 Z425 是搭载 Intel 酷睿 Ultra 平台的四盘位旗舰私有云，分标准版与轻享版两个配置：标准版为 Core Ultra 225H 4.9GHz 并预装 16GB DDR5，轻享版为 Core Ultra 125H 4.5GHz 预装 8GB，两版均保留一条可扩展内存插槽。存储侧有两个 SATA3 盘位与两个 SATA3/U.2 兼容盘位，另配四个 M.2 NVMe 2280 位（三个 PCIe 4.0 ×4、一个 PCIe 3.0 ×4）。网络为万兆与千兆双口，两个雷电 4 接口提供 40Gbps 带宽，可外接显卡坞使用英伟达 4090、5090 等算力卡，也可做雷电网桥直连。散热为三风扇智能联动，双 CPU 风扇加系统风扇并针对 SSD 优化风道。内置 Intel AI Boost NPU，官方支持本地部署 DeepSeek R1 14B 模型，推理全程不出设备。',
    // 规格取自极空间官网 Z425 页尾「硬件参数表」（zspace.cn/z425/），
    // 该表用 [轻享版] 标注两个版本的差异项，此处照此分段写明。
    specs: {
      '处理器': '标准版 Intel 酷睿 Ultra 225H 4.9GHz 14 核 / 轻享版 Ultra 125H 4.5GHz 14 核',
      '核显': '标准版 Intel Arc 130T 2.2GHz 7 核 / 轻享版 Intel Arc graphics 2.2GHz 7 核',
      'NPU': 'Intel AI Boost',
      '内存': 'DDR5 · 标准版预装 16GB / 轻享版预装 8GB · 另留一条可扩展插槽',
      '系统存储': 'eMMC 32GB · V5.1',
      '盘位': 'SATA3 × 2 + SATA3 / U.2 兼容 × 2',
      'M.2': 'NVMe 2280 × 4（PCIe 4.0 ×4 三个 + PCIe 3.0 ×4 一个）',
      'eSATA': 'SATA2.0 × 1',
      '网口': '10GbE RJ-45 × 1 + 1GbE RJ-45 × 1',
      'USB': '雷电 4 × 2 · USB-A 3.2 Gen2 × 1',
      'HDMI': 'HDMI 2.1 × 1 · 4K@60Hz',
      'UPS': '专用接口 × 1（轻享版的 UPS 电源需单独购买）',
      '电源': '19V / 7.9A · 接口 5521',
    },
    tags: ['酷睿 Ultra', '双雷电 4', '万兆网口'],
    highlights: [
      { title: '双雷电 4 可扩显卡', desc: '两个雷电 4 提供 40Gbps 带宽，可外接显卡坞使用英伟达 4090、5090 等算力卡，也能做雷电网桥一线直连。' },
      { title: '四盘位加四个 M.2', desc: '两个 SATA3 盘位与两个 SATA3/U.2 兼容盘位，另有四个 M.2 NVMe 位，其中三个走 PCIe 4.0 ×4。' },
      { title: '万兆加千兆双网口', desc: '10GbE 与 1GbE 各一口，可分别接入不同网段，或用万兆口承载高码率影视与素材调取。' },
      { title: '本地跑 14B 模型', desc: '内置 Intel AI Boost NPU，官方支持一键部署 DeepSeek R1 14B，推理与检索全部在设备内完成，不上云。' },
    ],
  },
  {
    // 官网注明 Z4Pro+ 与 Z4ProPlus 是同一型号，系统里两种写法都会出现
    id: 'zspace-z4-pro-plus',
    name: 'Z4 Pro+',
    brand: '极空间',
    category: 'nas',
    price: '询价',
    // 工作区没有 zspace-z4-pro-plus.jpg，用正面左视图兼作封面
    image: '/products/zspace-z4-pro-plus-front-left.jpg',
    images: [
      '/products/zspace-z4-pro-plus-front-left.jpg',
      '/products/zspace-z4-pro-plus-front-right.jpg',
      '/products/zspace-z4-pro-plus-rear.jpg',
    ],
    shortDesc: '4 盘位 NAS，Twin Lake 平台，另有两个 M.2 与双 2.5G 网口',
    description: '极空间 Z4 Pro+ 是四盘位家用与工作室级私有云，分标准版与性能版两个配置：标准版为 Intel N150 3.60GHz，性能版为 Intel 酷睿 3 N355 3.90GHz 并标配 16GB 内存。四个 SATA3 盘位兼容 2.5 与 3.5 英寸硬盘、单盘最高 32TB，另有两个 M.2 NVMe 2280 位（单条最高 8TB）可做缓存或全闪存储池，存储模式支持单盘、ZDR、RAID1 与 RAID5。散热采用智能温控双风扇配静音热管散热器与相变散热片，硬盘与机身之间软连接并多处硅胶隔离以抑制震动传导。机身为航空级铝材，磁吸前盖与可拆卸防尘网便于日常维护。双 2.5GbE 网口、HDMI 2.0b 与 eSATA 扩展接口齐备，并可本地部署 DeepSeek R1 7B 模型。',
    // 规格取自极空间官网 Z4Pro+ 页尾参数表（zspace.cn/z4pro+/）。
    // 两个配置版本的差异写在同一行，以「性能版」标注区分。
    specs: {
      '处理器': '标准版 Intel N150 3.60GHz / 性能版 Intel 酷睿 3 N355 3.90GHz',
      '核显': '标准版 Intel Graphics 1.0GHz 24U / 性能版 1.35GHz 32U',
      '内存': 'DDR5-4800 · 8GB 或 16GB（性能版 16GB）· 支持更换',
      '系统存储': 'eMMC 32GB · V5.1 HS400',
      '盘位': 'SATA3 × 4 · 兼容 2.5/3.5 英寸 · 单盘最高 32TB',
      'M.2': 'NVMe 2280 × 2 · 单条最高 8TB',
      'eSATA': 'SATA2 3Gbps × 1',
      '网口': '2.5GbE RJ-45 × 2',
      'USB': 'Type-C 3.2 Gen2 × 1 / Type-A 3.2 Gen2 × 1 / Type-A 2.0 × 1',
      'HDMI': 'HDMI 2.0b',
      '存储模式': '单盘 / ZDR / RAID1 / RAID5',
      '风扇': '机身 14025 + CPU 7010 · 均为智能温控',
      '电源': '12V / 8A · 接口 5.5×2.5mm',
    },
    tags: ['4盘位', '双2.5G网口', '双M.2'],
    highlights: [
      { title: '四盘位加双 M.2', desc: '四个 SATA3 盘位单盘最高 32TB，兼容 2.5 与 3.5 英寸；另有两个 M.2 NVMe 位单条最高 8TB，可做缓存加速或全闪存储池。' },
      { title: '两个配置可选', desc: '标准版 Intel N150 3.60GHz，性能版换 酷睿 3 N355 3.90GHz 并标配 16GB DDR5，按算力需求选。' },
      { title: '双 2.5G 网口', desc: '两个 2.5GbE RJ-45，可做链路聚合或分别接入不同网段，另配 eSATA 与 HDMI 2.0b 扩展。' },
      { title: '冰川架构散热', desc: '智能温控双风扇配静音热管散热器与相变散热片；硬盘与机身软连接、多处硅胶隔离，抑制震动传导。' },
    ],
  },
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
