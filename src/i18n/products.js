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
  en: {
    'zspace-z425': {
      shortDesc: 'Core Ultra 4-bay NAS with dual Thunderbolt 4, 10GbE, and room to run a 14B model locally',
      description: 'The ZSpace Z425 is a flagship four-bay private cloud on the Intel Core Ultra platform, offered in two configurations: the standard model pairs a Core Ultra 225H at 4.9GHz with 16GB of DDR5, while the Lite edition uses a Core Ultra 125H at 4.5GHz with 8GB — both keep one memory slot free for expansion. Storage spans two SATA3 bays plus two SATA3/U.2-compatible bays, alongside four M.2 NVMe 2280 slots (three on PCIe 4.0 ×4, one on PCIe 3.0 ×4). Networking combines a 10GbE and a 1GbE port, and two Thunderbolt 4 ports supply 40Gbps for an external GPU enclosure — NVIDIA 4090 or 5090 class cards included — or a direct Thunderbolt bridge. Three fans work in concert, two on the CPU plus a system fan with ducting tuned for SSDs. An Intel AI Boost NPU lets DeepSeek R1 14B run locally, so inference never leaves the device.',
      tags: ['Core Ultra', 'Dual Thunderbolt 4', '10GbE'],
      highlights: [
        { title: 'Dual Thunderbolt 4 for an external GPU', desc: 'Two Thunderbolt 4 ports provide 40Gbps, enough for an external GPU enclosure running NVIDIA 4090 or 5090 class cards, or a direct Thunderbolt bridge.' },
        { title: 'Four bays plus four M.2 slots', desc: 'Two SATA3 bays and two SATA3/U.2-compatible bays, with four further M.2 NVMe slots — three of them on PCIe 4.0 ×4.' },
        { title: '10GbE and 1GbE', desc: 'One port of each, so they can serve separate subnets, or the 10GbE link can carry high-bitrate video and source footage.' },
        { title: 'A 14B model, on the box', desc: 'An Intel AI Boost NPU supports one-step deployment of DeepSeek R1 14B; inference and retrieval both run on the device rather than in the cloud.' },
      ],
    },
    'zspace-z4-pro-plus': {
      shortDesc: '4-bay NAS on the Twin Lake platform, with two M.2 slots and dual 2.5GbE',
      description: 'The ZSpace Z4 Pro+ is a four-bay private cloud for homes and studios, offered in two configurations: the standard model runs an Intel N150 at 3.60GHz, while the performance model steps up to an Intel Core 3 N355 at 3.90GHz with 16GB of memory as standard. Four SATA3 bays take 2.5 and 3.5-inch drives up to 32TB each, and two M.2 NVMe 2280 slots (up to 8TB each) can serve as cache or an all-flash pool, with single-drive, ZDR, RAID1 and RAID5 modes available. Cooling combines temperature-controlled twin fans with a silent heat-pipe sink and a phase-change pad, while a soft mount between drives and chassis plus silicone isolation at several points damp vibration. The aircraft-grade aluminium body has a magnetic front cover and a removable dust filter for easy upkeep. Dual 2.5GbE ports, HDMI 2.0b and eSATA round out the connections, and DeepSeek R1 7B can be deployed locally.',
      tags: ['4 bays', 'Dual 2.5GbE', 'Two M.2 slots'],
      highlights: [
        { title: 'Four bays plus two M.2 slots', desc: 'Four SATA3 bays take 2.5 or 3.5-inch drives up to 32TB each, and two M.2 NVMe slots hold up to 8TB apiece for cache acceleration or an all-flash pool.' },
        { title: 'Two configurations', desc: 'The standard model runs an Intel N150 at 3.60GHz; the performance model moves to a Core 3 N355 at 3.90GHz with 16GB of DDR5 as standard.' },
        { title: 'Dual 2.5GbE', desc: 'Two 2.5GbE RJ-45 ports for link aggregation or separate subnets, alongside eSATA and HDMI 2.0b for expansion.' },
        { title: 'Glacier cooling architecture', desc: 'Temperature-controlled twin fans with a silent heat-pipe sink and a phase-change pad; drives are soft-mounted and isolated with silicone at several points to damp vibration.' },
      ],
    },
    'zspace-z2-ultra': {
      shortDesc: 'All-flash 2-bay NAS with a quad-core Intel N150 and memory upgradable to 16GB',
      description: 'The ZSpace Z2 Ultra is an all-flash private cloud for enthusiast homes and one-person studios. A latest-generation Intel N150 runs four cores at 3.6GHz alongside UHD graphics with 24 execution units, and the 8GB of DDR4 can be upgraded to 16GB — enough headroom for Docker containers and virtual machines together. The two main bays take SATA or U.2 solid-state drives up to 8TB each, with two further M.2 NVMe slots available for cache acceleration, and storage can be configured as ZDR or RAID1. A straight-through cooling duct and floating drive tray keep it cool and quiet. HDMI 2.1 drives a TV at 4K@60Hz, and DeepSeek R1 7B can be deployed locally so inference never leaves the device.',
      tags: ['All-flash 2-bay', 'Upgradable memory', 'On-device AI'],
      highlights: [
        { title: 'Latest-generation Intel N150', desc: 'Four cores at 3.6GHz with UHD graphics and 24 execution units — a step up in both efficiency and quiet running.' },
        { title: 'All-flash, two bays', desc: 'Both main bays take SATA or U.2 SSDs up to 8TB each, with two more M.2 NVMe slots for cache acceleration.' },
        { title: 'Memory you can upgrade', desc: 'Ships with 8GB of DDR4 and takes 16GB, leaving room to run Docker containers and virtual machines at the same time.' },
        { title: 'Inference stays on the device', desc: 'DeepSeek R1 7B deploys locally in one step, and photo search by face, text or plain language all runs on the box.' },
      ],
    },
  },
  ja: {
    'zspace-z425': {
      shortDesc: 'Core Ultra搭載の4ベイNAS。Thunderbolt 4×2と10GbEを備え、14Bモデルをローカル実行可能',
      description: 'ZSpace Z425 はIntel Core Ultraプラットフォームを採用したフラッグシップ4ベイ・プライベートクラウドで、2つの構成があります。標準版はCore Ultra 225H（4.9GHz）とDDR5 16GB、軽量版（轻享版）はCore Ultra 125H（4.5GHz）と8GBの構成で、いずれも増設用スロットを1基残しています。ストレージはSATA3ベイ2基とSATA3 / U.2対応ベイ2基に加え、M.2 NVMe 2280スロット4基（うち3基はPCIe 4.0 ×4、1基はPCIe 3.0 ×4）を搭載。ネットワークは10GbEと1GbEを各1ポート、Thunderbolt 4を2ポート備え、40Gbpsの帯域で外付けGPUボックス（NVIDIA 4090 / 5090クラス対応）やThunderboltブリッジ直結に対応します。冷却はCPUファン2基とシステムファンの3基が連動し、SSD向けに風路を最適化。Intel AI Boost NPUにより DeepSeek R1 14B をローカル実行でき、推論が機器の外に出ることはありません。',
      tags: ['Core Ultra', 'Thunderbolt 4×2', '10GbE'],
      highlights: [
        { title: 'Thunderbolt 4×2で外付けGPUに対応', desc: 'Thunderbolt 4を2ポート搭載し40Gbpsの帯域を確保。NVIDIA 4090 / 5090クラスを搭載した外付けGPUボックスやThunderboltブリッジ直結に対応します。' },
        { title: '4ベイ＋M.2スロット4基', desc: 'SATA3ベイ2基とSATA3 / U.2対応ベイ2基に加え、M.2 NVMeスロットを4基搭載。うち3基はPCIe 4.0 ×4接続です。' },
        { title: '10GbEと1GbE', desc: '各1ポートを搭載。別セグメントへの接続にも、10GbE側で高ビットレートの映像や素材の読み出しにも使えます。' },
        { title: '14Bモデルを本体で実行', desc: 'Intel AI Boost NPUにより DeepSeek R1 14B をワンステップで展開。推論も検索もクラウドではなく本体で処理します。' },
      ],
    },
    'zspace-z4-pro-plus': {
      shortDesc: 'Twin Lakeプラットフォーム採用の4ベイNAS。M.2スロット2基と2.5GbE×2を搭載',
      description: 'ZSpace Z4 Pro+ は家庭やスタジオ向けの4ベイ・プライベートクラウドで、2つの構成が用意されています。標準版はIntel N150（3.60GHz）、性能版はIntel Core 3 N355（3.90GHz）にメモリ16GBを標準搭載します。SATA3ベイ4基は2.5および3.5インチドライブに対応し1台最大32TB、さらにM.2 NVMe 2280スロット2基（1枚最大8TB）をキャッシュまたはオールフラッシュプールとして利用できます。ストレージは単一ドライブ、ZDR、RAID1、RAID5に対応。冷却はスマート温度制御のツインファンに静音ヒートパイプシンクと相変化パッドを組み合わせ、ドライブと筐体はソフトマウントのうえ複数箇所をシリコンで隔離して振動の伝わりを抑えます。航空機グレードのアルミ筐体はマグネット式フロントカバーと着脱可能なダストフィルターを備え、日常の手入れが容易です。2.5GbEポート2基、HDMI 2.0b、eSATAを備え、DeepSeek R1 7B のローカル展開にも対応します。',
      tags: ['4ベイ', '2.5GbE×2', 'M.2×2'],
      highlights: [
        { title: '4ベイ＋M.2スロット2基', desc: 'SATA3ベイ4基は2.5 / 3.5インチに対応し1台最大32TB。M.2 NVMeスロット2基は1枚最大8TBで、キャッシュ高速化やオールフラッシュプールに使えます。' },
        { title: '2つの構成から選べる', desc: '標準版はIntel N150（3.60GHz）、性能版はCore 3 N355（3.90GHz）にDDR5 16GBを標準搭載します。' },
        { title: '2.5GbEを2ポート', desc: '2.5GbE RJ-45を2基搭載し、リンクアグリゲーションや別セグメントへの接続が可能。eSATAとHDMI 2.0bも備えます。' },
        { title: 'グレイシア冷却構造', desc: 'スマート温度制御のツインファンに静音ヒートパイプシンクと相変化パッドを併用。ドライブはソフトマウントと複数箇所のシリコン隔離で振動を抑えます。' },
      ],
    },
    'zspace-z2-ultra': {
      shortDesc: 'Intel N150クアッドコア搭載、メモリ16GBまで増設可能なオールフラッシュ2ベイNAS',
      description: 'ZSpace Z2 Ultra は、こだわりの家庭や個人スタジオ向けのオールフラッシュ・プライベートクラウドです。最新世代のIntel N150は4コア3.6GHzで動作し、24実行ユニットのUHDグラフィックスを内蔵。8GBのDDR4は16GBまで増設でき、Dockerコンテナと仮想マシンを同時に動かす余裕があります。メインの2ベイはSATAまたはU.2のSSDに対応し1台最大8TB、さらにM.2 NVMeスロット2基をキャッシュ高速化に利用できます。ストレージはZDRまたはRAID1で構成可能。直通式の冷却風路とフローティング式ドライブトレイにより、冷却と静音を両立します。HDMI 2.1は4K@60Hzでのテレビ接続に対応し、DeepSeek R1 7B をローカル展開すれば推論が機器の外に出ることはありません。',
      tags: ['オールフラッシュ2ベイ', 'メモリ増設可', 'ローカルAI'],
      highlights: [
        { title: '最新世代 Intel N150', desc: '4コア3.6GHzと24実行ユニットのUHDグラフィックスを搭載し、省電力性と静音性がさらに向上。' },
        { title: 'オールフラッシュの2ベイ', desc: 'メイン2ベイはSATA / U.2 SSDに対応し1台最大8TB。加えてM.2 NVMeスロット2基をキャッシュ高速化に使えます。' },
        { title: '自分で増設できるメモリ', desc: '出荷時8GB DDR4、16GBまで増設可能。Dockerコンテナと仮想マシンの同時稼働にも余裕があります。' },
        { title: '推論は機器の中で完結', desc: 'DeepSeek R1 7B をワンステップでローカル展開。アルバムの人物・文字・自然言語検索もすべて本体で処理します。' },
      ],
    },
  },
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
    核显: 'Graphics', NPU: 'NPU', 系统存储: 'System storage', 风扇: 'Fan', 电源: 'Power adapter',
    'M.2': 'M.2', 存储模式: 'Storage modes', eSATA: 'eSATA', UPS: 'UPS',
  },
  ja: {
    处理器: 'プロセッサ', 内存: 'メモリ', 盘位: 'ドライブベイ', 网口: 'ネットワーク', 最大容量: '最大容量',
    特色: '特長', 扩展: '拡張', 容量: '容量', 转速: '回転速度', 缓存: 'キャッシュ', 接口: 'インターフェース',
    记录技术: '記録方式', 年工作负载: '年間ワークロード', 质保: '保証', 顺序读取: 'シーケンシャル読み込み',
    顺序写入: 'シーケンシャル書き込み', 颗粒: 'NAND', 适用硬盘: '対応ドライブ', 传输速度: '転送速度',
    供电: '電源', 材质: '素材', 支持协议: '対応方式', 支持规格: '対応サイズ', 支持RAID: 'RAID対応',
    主控: 'コントローラー', 支持系统: '対応OS', USB: 'USB', HDMI: 'HDMI',
    系列: 'シリーズ', 适用: '用途',
    核显: '内蔵GPU', NPU: 'NPU', 系统存储: 'システム領域', 风扇: 'ファン', 电源: '電源アダプター',
    'M.2': 'M.2', 存储模式: 'ストレージ構成', eSATA: 'eSATA', UPS: 'UPS',
  },
};

const specValues = {
  en: {
    '标准版 Intel 酷睿 Ultra 225H 4.9GHz 14 核 / 轻享版 Ultra 125H 4.5GHz 14 核': 'Standard: Intel Core Ultra 225H 4.9GHz 14-core / Lite: Core Ultra 125H 4.5GHz 14-core',
    '标准版 Intel Arc 130T 2.2GHz 7 核 / 轻享版 Intel Arc graphics 2.2GHz 7 核': 'Standard: Intel Arc 130T 2.2GHz 7-core / Lite: Intel Arc graphics 2.2GHz 7-core',
    'Intel AI Boost': 'Intel AI Boost',
    'DDR5 · 标准版预装 16GB / 轻享版预装 8GB · 另留一条可扩展插槽': 'DDR5 · 16GB preinstalled (8GB on Lite) · one expansion slot free',
    'eMMC 32GB · V5.1': 'eMMC 32GB · V5.1',
    'SATA3 × 2 + SATA3 / U.2 兼容 × 2': 'SATA3 × 2 + SATA3 / U.2-compatible × 2',
    'NVMe 2280 × 4（PCIe 4.0 ×4 三个 + PCIe 3.0 ×4 一个）': 'NVMe 2280 × 4 (three on PCIe 4.0 ×4, one on PCIe 3.0 ×4)',
    'SATA2.0 × 1': 'SATA2.0 × 1',
    '10GbE RJ-45 × 1 + 1GbE RJ-45 × 1': '10GbE RJ-45 × 1 + 1GbE RJ-45 × 1',
    '雷电 4 × 2 · USB-A 3.2 Gen2 × 1': 'Thunderbolt 4 × 2 · USB-A 3.2 Gen2 × 1',
    'HDMI 2.1 × 1 · 4K@60Hz': 'HDMI 2.1 × 1 · 4K@60Hz',
    '专用接口 × 1（轻享版的 UPS 电源需单独购买）': 'Dedicated port × 1 (the UPS unit is sold separately for the Lite edition)',
    '19V / 7.9A · 接口 5521': '19V / 7.9A · 5521 connector',
    '标准版 Intel N150 3.60GHz / 性能版 Intel 酷睿 3 N355 3.90GHz': 'Standard: Intel N150 3.60GHz / Performance: Intel Core 3 N355 3.90GHz',
    '标准版 Intel Graphics 1.0GHz 24U / 性能版 1.35GHz 32U': 'Standard: Intel Graphics 1.0GHz 24U / Performance: 1.35GHz 32U',
    'DDR5-4800 · 8GB 或 16GB（性能版 16GB）· 支持更换': 'DDR5-4800 · 8GB or 16GB (16GB on the performance model) · replaceable',
    'eMMC 32GB · V5.1 HS400': 'eMMC 32GB · V5.1 HS400',
    'SATA3 × 4 · 兼容 2.5/3.5 英寸 · 单盘最高 32TB': 'SATA3 × 4 · 2.5 / 3.5-inch · up to 32TB per drive',
    'NVMe 2280 × 2 · 单条最高 8TB': 'NVMe 2280 × 2 · up to 8TB each',
    'SATA2 3Gbps × 1': 'SATA2 3Gbps × 1',
    '2.5GbE RJ-45 × 2': '2.5GbE RJ-45 × 2',
    'Type-C 3.2 Gen2 × 1 / Type-A 3.2 Gen2 × 1 / Type-A 2.0 × 1': 'Type-C 3.2 Gen2 × 1 / Type-A 3.2 Gen2 × 1 / Type-A 2.0 × 1',
    'HDMI 2.0b': 'HDMI 2.0b',
    '单盘 / ZDR / RAID1 / RAID5': 'Single drive / ZDR / RAID1 / RAID5',
    '机身 14025 + CPU 7010 · 均为智能温控': 'Chassis 14025 + CPU 7010 · both temperature-controlled',
    '12V / 8A · 接口 5.5×2.5mm': '12V / 8A · 5.5×2.5mm connector',
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
    '瑞芯微 RK3568 · Cortex-A55 四核 2.0GHz': 'Rockchip RK3568 · quad-core Cortex-A55 2.0GHz',
    'Neural Networks 1Tops': 'Neural Networks 1Tops',
    'eMMC 16GB · V5.1': 'eMMC 16GB · V5.1',
    '2 盘位 · 3.5 英寸 · 单盘最高 32TB': '2 bays · 3.5-inch · up to 32TB per drive',
    'SATA3 6Gbps × 2': 'SATA3 6Gbps × 2',
    '1GbE × 1': '1GbE × 1',
    'USB 3.0 × 1 / USB 2.0 × 1': 'USB 3.0 × 1 / USB 2.0 × 1',
    '7015 智能温控风扇 × 1': '7015 temperature-controlled fan × 1',
    '12V · 5.5×2.5mm': '12V · 5.5×2.5mm',
    'Intel N150 · 四核 3.6GHz': 'Intel N150 · quad-core 3.6GHz',
    'Intel UHD Graphics · 24 执行单元': 'Intel UHD Graphics · 24 execution units',
    '8GB DDR4 · 可升级至 16GB': '8GB DDR4 · upgradable to 16GB',
    'SATA / U.2 × 2 · 单盘最高 8TB': 'SATA / U.2 × 2 · up to 8TB per drive',
    'NVMe 8GT/s × 2': 'NVMe 8GT/s × 2',
    '2.5GbE RJ-45 × 1': '2.5GbE RJ-45 × 1',
    'USB-A 3.2 Gen2 × 1 / USB-C 3.2 Gen2 × 1': 'USB-A 3.2 Gen2 × 1 / USB-C 3.2 Gen2 × 1',
    'HDMI 2.1 · 4K@60Hz': 'HDMI 2.1 · 4K@60Hz',
    'ZDR / RAID1 · 支持读写缓存': 'ZDR / RAID1 · read-write cache supported',
  },
  ja: {
    '标准版 Intel 酷睿 Ultra 225H 4.9GHz 14 核 / 轻享版 Ultra 125H 4.5GHz 14 核': '標準版: Intel Core Ultra 225H 4.9GHz 14コア / 軽量版: Core Ultra 125H 4.5GHz 14コア',
    '标准版 Intel Arc 130T 2.2GHz 7 核 / 轻享版 Intel Arc graphics 2.2GHz 7 核': '標準版: Intel Arc 130T 2.2GHz 7コア / 軽量版: Intel Arc graphics 2.2GHz 7コア',
    'Intel AI Boost': 'Intel AI Boost',
    'DDR5 · 标准版预装 16GB / 轻享版预装 8GB · 另留一条可扩展插槽': 'DDR5 · 出荷時16GB（軽量版は8GB）· 増設スロット1基空き',
    'eMMC 32GB · V5.1': 'eMMC 32GB · V5.1',
    'SATA3 × 2 + SATA3 / U.2 兼容 × 2': 'SATA3 × 2 + SATA3 / U.2対応 × 2',
    'NVMe 2280 × 4（PCIe 4.0 ×4 三个 + PCIe 3.0 ×4 一个）': 'NVMe 2280 × 4（PCIe 4.0 ×4 が3基、PCIe 3.0 ×4 が1基）',
    'SATA2.0 × 1': 'SATA2.0 × 1',
    '10GbE RJ-45 × 1 + 1GbE RJ-45 × 1': '10GbE RJ-45 × 1 + 1GbE RJ-45 × 1',
    '雷电 4 × 2 · USB-A 3.2 Gen2 × 1': 'Thunderbolt 4 × 2 · USB-A 3.2 Gen2 × 1',
    'HDMI 2.1 × 1 · 4K@60Hz': 'HDMI 2.1 × 1 · 4K@60Hz',
    '专用接口 × 1（轻享版的 UPS 电源需单独购买）': '専用ポート × 1（軽量版のUPS本体は別売）',
    '19V / 7.9A · 接口 5521': '19V / 7.9A · 5521コネクタ',
    '标准版 Intel N150 3.60GHz / 性能版 Intel 酷睿 3 N355 3.90GHz': '標準版: Intel N150 3.60GHz / 性能版: Intel Core 3 N355 3.90GHz',
    '标准版 Intel Graphics 1.0GHz 24U / 性能版 1.35GHz 32U': '標準版: Intel Graphics 1.0GHz 24U / 性能版: 1.35GHz 32U',
    'DDR5-4800 · 8GB 或 16GB（性能版 16GB）· 支持更换': 'DDR5-4800 · 8GB または 16GB（性能版は16GB）· 交換可',
    'eMMC 32GB · V5.1 HS400': 'eMMC 32GB · V5.1 HS400',
    'SATA3 × 4 · 兼容 2.5/3.5 英寸 · 单盘最高 32TB': 'SATA3 × 4 · 2.5 / 3.5インチ対応 · 1台最大32TB',
    'NVMe 2280 × 2 · 单条最高 8TB': 'NVMe 2280 × 2 · 1枚最大8TB',
    'SATA2 3Gbps × 1': 'SATA2 3Gbps × 1',
    '2.5GbE RJ-45 × 2': '2.5GbE RJ-45 × 2',
    'Type-C 3.2 Gen2 × 1 / Type-A 3.2 Gen2 × 1 / Type-A 2.0 × 1': 'Type-C 3.2 Gen2 × 1 / Type-A 3.2 Gen2 × 1 / Type-A 2.0 × 1',
    'HDMI 2.0b': 'HDMI 2.0b',
    '单盘 / ZDR / RAID1 / RAID5': '単一ドライブ / ZDR / RAID1 / RAID5',
    '机身 14025 + CPU 7010 · 均为智能温控': '筐体 14025 + CPU 7010 · いずれもスマート温度制御',
    '12V / 8A · 接口 5.5×2.5mm': '12V / 8A · コネクタ 5.5×2.5mm',
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
    '瑞芯微 RK3568 · Cortex-A55 四核 2.0GHz': 'Rockchip RK3568 · Cortex-A55 クアッドコア 2.0GHz',
    'Neural Networks 1Tops': 'Neural Networks 1Tops',
    'eMMC 16GB · V5.1': 'eMMC 16GB · V5.1',
    '2 盘位 · 3.5 英寸 · 单盘最高 32TB': '2ベイ · 3.5インチ · 1台最大32TB',
    'SATA3 6Gbps × 2': 'SATA3 6Gbps × 2',
    '1GbE × 1': '1GbE × 1',
    'USB 3.0 × 1 / USB 2.0 × 1': 'USB 3.0 × 1 / USB 2.0 × 1',
    '7015 智能温控风扇 × 1': '7015 スマート温度制御ファン × 1',
    '12V · 5.5×2.5mm': '12V · 5.5×2.5mm',
    'Intel N150 · 四核 3.6GHz': 'Intel N150 · クアッドコア 3.6GHz',
    'Intel UHD Graphics · 24 执行单元': 'Intel UHD Graphics · 24実行ユニット',
    '8GB DDR4 · 可升级至 16GB': '8GB DDR4 · 16GBまで増設可',
    'SATA / U.2 × 2 · 单盘最高 8TB': 'SATA / U.2 × 2 · 1台最大8TB',
    'NVMe 8GT/s × 2': 'NVMe 8GT/s × 2',
    '2.5GbE RJ-45 × 1': '2.5GbE RJ-45 × 1',
    'USB-A 3.2 Gen2 × 1 / USB-C 3.2 Gen2 × 1': 'USB-A 3.2 Gen2 × 1 / USB-C 3.2 Gen2 × 1',
    'HDMI 2.1 · 4K@60Hz': 'HDMI 2.1 · 4K@60Hz',
    'ZDR / RAID1 · 支持读写缓存': 'ZDR / RAID1 · リード/ライトキャッシュ対応',
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
