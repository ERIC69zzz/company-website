// 各产品的英日文案，键用 data/products.js 里的产品 id。
// 缺某个 id 时该产品回落到中文原文，不会报错，所以可以先补中文、后补翻译。
//
// 只需要列出与中文不同的字段；name 一般不用写（型号不翻译），
// 除了「酷狼 4TB」这类含中文的型号才需要覆盖。
//
// const productCopy = {
//   en: {
//     'zspace-z4-pro': {
//       shortDesc: 'High-performance 4-bay NAS with Intel N97 and 4K media library support',
//       description: 'Full description in English.',
//       tags: ['4 bays', 'Media library', 'HDMI output'],
//     },
//   },
//   ja: {
//     'zspace-z4-pro': {
//       shortDesc: 'Intel N97搭載、4Kメディアライブラリ対応の高性能4ベイNAS',
//       description: '日本語の説明。',
//       tags: ['4ベイ', 'メディアライブラリ', 'HDMI出力'],
//     },
//   },
// };
const productCopy = {
  en: {},
  ja: {},
};


// 非数字的价格占位（如「询价」）需要翻译，否则会原样显示给外语访客
const priceLabels = {
  en: { '询价': 'Contact us' },
  ja: { '询价': 'お問い合わせ' },
};

const brandNames = {
  en: { 极空间: 'ZSpace', 绿联: 'UGREEN', 希捷: 'Seagate', 东芝: 'Toshiba', 三星: 'Samsung', 英睿达: 'Crucial' },
  ja: { 极空间: 'ZSpace', 绿联: 'UGREEN', 希捷: 'Seagate', 东芝: 'Toshiba', 三星: 'Samsung', 英睿达: 'Crucial' },
};

const specLabels = {
  en: {
    处理器: 'Processor', 内存: 'Memory', 盘位: 'Drive bays', 网口: 'Network', 最大容量: 'Maximum capacity',
    特色: 'Features', 扩展: 'Expansion', 容量: 'Capacity', 转速: 'Spindle speed', 缓存: 'Cache', 接口: 'Interface',
    记录技术: 'Recording technology', 年工作负载: 'Annual workload', 质保: 'Warranty', 顺序读取: 'Sequential read',
    顺序写入: 'Sequential write', 颗粒: 'NAND', 适用硬盘: 'Compatible drives', 传输速度: 'Transfer speed',
    供电: 'Power', 材质: 'Material', 支持协议: 'Protocols', 支持规格: 'Form factors', 支持RAID: 'RAID support',
    主控: 'Controller', 支持系统: 'OS support', USB: 'USB', HDMI: 'HDMI',
    系列: 'Series', 适用: 'Designed for',
  },
  ja: {
    处理器: 'プロセッサ', 内存: 'メモリ', 盘位: 'ドライブベイ', 网口: 'ネットワーク', 最大容量: '最大容量',
    特色: '特長', 扩展: '拡張', 容量: '容量', 转速: '回転速度', 缓存: 'キャッシュ', 接口: 'インターフェース',
    记录技术: '記録方式', 年工作负载: '年間ワークロード', 质保: '保証', 顺序读取: 'シーケンシャル読み込み',
    顺序写入: 'シーケンシャル書き込み', 颗粒: 'NAND', 适用硬盘: '対応ドライブ', 传输速度: '転送速度',
    供电: '電源', 材质: '素材', 支持协议: '対応方式', 支持规格: '対応サイズ', 支持RAID: 'RAID対応',
    主控: 'コントローラー', 支持系统: '対応OS', USB: 'USB', HDMI: 'HDMI',
    系列: 'シリーズ', 适用: '用途',
  },
};

const specValues = {
  en: {
    'NAS / 小型服务器': 'NAS / small servers',
    '4GB / 8GB DDR5': '4GB / 8GB DDR5', 'ARM 四核 1.7GHz': 'Quad-core ARM 1.7GHz', '瑞芯微 RK3568 四核 2.0GHz': 'Quad-core Rockchip RK3568 2.0GHz',
    '4盘位（2.5/3.5英寸）': '4 bays (2.5 / 3.5 in)', '2盘位（2.5/3.5英寸）': '2 bays (2.5 / 3.5 in)',
    '双 M.2 2280': 'Dual M.2 2280', '内置电池 / SD卡槽': 'Built-in battery / SD card slot',
    '8GB DDR5（可扩至64GB）': '8GB DDR5 (expandable to 64GB)', '16GB DDR5（可扩至64GB）': '16GB DDR5 (expandable to 64GB)',
    '2盘位 + M.2 缓存 × 2': '2 bays + 2 × M.2 cache slots', '8盘位 + M.2 × 2': '8 bays + 2 × M.2 slots',
    'CMR（垂直记录）': 'CMR', '3年': '3 years', '5年': '5 years', '5年 / 600TBW': '5 years / 600TBW', '5年 / 360TBW': '5 years / 360TBW',
    '2.5/3.5英寸 SATA': '2.5 / 3.5-inch SATA', '12V/2A 外接电源': 'External 12V / 2A adapter',
    'ABS+金属散热片': 'ABS + metal heat sink', 'NVMe / SATA 双协议': 'NVMe / SATA', '铝合金': 'Aluminum alloy',
    '免工具安装': 'Tool-free installation', '即插即用，免驱': 'Plug and play, no driver required',
  },
  ja: {
    'NAS / 小型服务器': 'NAS / 小規模サーバー',
    '4GB / 8GB DDR5': '4GB / 8GB DDR5', 'ARM 四核 1.7GHz': 'ARM クアッドコア 1.7GHz', '瑞芯微 RK3568 四核 2.0GHz': 'Rockchip RK3568 クアッドコア 2.0GHz',
    '4盘位（2.5/3.5英寸）': '4ベイ（2.5 / 3.5インチ）', '2盘位（2.5/3.5英寸）': '2ベイ（2.5 / 3.5インチ）',
    '双 M.2 2280': 'M.2 2280 × 2', '内置电池 / SD卡槽': '内蔵バッテリー / SDカードスロット',
    '8GB DDR5（可扩至64GB）': '8GB DDR5（最大64GB）', '16GB DDR5（可扩至64GB）': '16GB DDR5（最大64GB）',
    '2盘位 + M.2 缓存 × 2': '2ベイ + M.2キャッシュ × 2', '8盘位 + M.2 × 2': '8ベイ + M.2 × 2',
    'CMR（垂直记录）': 'CMR', '3年': '3年', '5年': '5年', '5年 / 600TBW': '5年 / 600TBW', '5年 / 360TBW': '5年 / 360TBW',
    '2.5/3.5英寸 SATA': '2.5 / 3.5インチ SATA', '12V/2A 外接电源': '12V / 2A ACアダプター',
    'ABS+金属散热片': 'ABS + 金属ヒートシンク', 'NVMe / SATA 双协议': 'NVMe / SATA', '铝合金': 'アルミ合金',
    '免工具安装': '工具不要', '即插即用，免驱': 'プラグ＆プレイ、ドライバー不要',
  },
};

export function localizeProducts(products, language) {
  if (language === 'zh') return products;

  return products.map((product) => {
    const localized = productCopy[language]?.[product.id] || {};
    const specs = Object.fromEntries(
      Object.entries(product.specs).map(([key, value]) => [
        specLabels[language]?.[key] || key,
        specValues[language]?.[value] || value,
      ]),
    );

    return {
      ...product,
      ...localized,
      brand: brandNames[language]?.[product.brand] || product.brand,
      price: priceLabels[language]?.[product.price] || product.price,
      specs,
    };
  });
}
