const productCopy = {
  en: {
    'zspace-z4-pro': {
      shortDesc: 'High-performance 4-bay NAS with Intel N97 and 4K media library support',
      description: 'The ZSpace Z4 Pro is a high-performance 4-bay NAS for homes and small studios. It features an Intel N97 processor, a choice of 4GB or 8GB DDR5 memory, and a rich suite of media, photo and music apps. HDMI 2.0 output lets you play 4K content directly on a TV.',
      tags: ['4 bays', 'Media library', 'HDMI output'],
    },
    'zspace-z2-pro': {
      shortDesc: 'Entry-level 2-bay NAS designed for home data backup',
      description: 'The ZSpace Z2 Pro is an entry-level home NAS with two drive bays and RAID 1 support. Its quad-core ARM processor and 2GB memory handle automatic phone photo backup, WeChat file backup and media-library features, making it an affordable choice for household data management.',
      tags: ['2 bays', 'Easy entry', 'Quiet design'],
    },
    'zspace-q2c': {
      shortDesc: 'Affordable 2-bay home NAS with a quad-core processor',
      description: 'The ZSpace Q2C is an accessible entry-level home NAS powered by a quad-core Rockchip RK3568 and 2GB DDR4 memory. Its two bays support drives up to 22TB each. Built-in media and photo apps, automatic phone backup and remote access make it an easy starting point for home storage.',
      tags: ['2 bays', 'Great value', 'Entry-level'],
    },
    'zspace-t2': {
      shortDesc: 'Portable all-flash NAS with two M.2 slots for data on the move',
      description: 'The ZSpace T2 is a portable all-flash NAS with two M.2 2280 SSD slots. It has a built-in battery and can be powered from a power bank. Its pocketable design, HDMI casting, SD card reader and Wi-Fi connectivity make it ideal for photographers and mobile professionals.',
      tags: ['All-flash', 'Portable', 'For creators'],
    },
    'ugreen-dxp4800-plus': {
      shortDesc: 'Flagship 4-bay NAS with 10GbE and AI-powered photo management',
      description: 'The UGREEN DXP4800 Plus is a flagship NAS powered by an Intel Pentium Gold 8505. Its 8GB memory can be expanded to 64GB, while 10GbE networking supports transfers up to 1,000MB/s. UGOS Pro includes AI photo management, a media library and Docker expansion.',
      tags: ['10GbE', 'AI photos', 'Docker'],
    },
    'ugreen-dxp2800': {
      shortDesc: 'Value-focused 2-bay NAS with 2.5GbE for home media',
      description: 'The UGREEN DXP2800 is a 2-bay home NAS with an Intel N100 processor and 4GB memory. It includes 2.5GbE networking and SSD cache support. UGOS Pro provides media-library, photo-backup and file-sync features for a capable home entertainment hub.',
      tags: ['2 bays', '2.5GbE', 'Home media'],
    },
    'ugreen-dxp8800-plus': {
      shortDesc: 'Enterprise 8-bay NAS with dual 10GbE for professional storage',
      description: 'The UGREEN DXP8800 Plus is a high-end 8-bay NAS for SMEs and professional users. It combines an Intel Core i5-1235U with expandable 16GB memory, dual 10GbE ports with link aggregation, a PCIe expansion slot and mixed SAS/SATA drive support.',
      tags: ['8 bays', 'Enterprise', 'Dual 10GbE'],
    },
    'seagate-ironwolf-4t': {
      name: 'IronWolf 4TB', shortDesc: 'NAS hard drive with CMR recording and a 180TB/year workload rating',
      description: 'Seagate IronWolf drives are engineered for NAS systems with CMR recording and 24/7 operation. The 4TB model has a 64MB cache, runs at 5,400RPM and is rated for 180TB of workload per year, making it suitable for home and small-office NAS systems.',
      tags: ['NAS optimized', 'CMR', 'Quiet'],
    },
    'seagate-ironwolf-8t': {
      name: 'IronWolf 8TB', shortDesc: 'NAS hard drive with 256MB cache and AgileArray technology',
      description: 'The Seagate IronWolf 8TB pairs a 256MB cache and 7,200RPM speed with AgileArray technology for optimized RAID performance and power management. IronWolf Health Management integrates with leading NAS platforms, and the drive is rated for 180TB per year.',
      tags: ['NAS optimized', '7,200RPM', 'Large cache'],
    },
    'seagate-ironwolf-16t': {
      name: 'IronWolf Pro 16TB', shortDesc: 'Professional NAS drive rated for 550TB/year with a 5-year warranty',
      description: 'The Seagate IronWolf Pro 16TB is a professional NAS drive running at 7,200RPM with a 256MB cache. It is rated for 550TB per year, supports NAS systems with up to 24 bays, and includes a 5-year warranty plus 3 years of Rescue Data Recovery Services.',
      tags: ['Professional', 'High capacity', '5-year warranty'],
    },
    'seagate-ironwolf-18t': {
      name: 'IronWolf Pro 18TB', shortDesc: 'High-capacity professional NAS drive with CMR and a 5-year warranty',
      description: 'The Seagate IronWolf Pro 18TB belongs to the professional NAS drive line, running at 7,200RPM with CMR recording. Built for multi-bay NAS and 24/7 operation, it carries a 5-year warranty. Contact us to confirm detailed specifications and current pricing.',
      tags: ['Professional', 'High capacity', '5-year warranty'],
    },
    'seagate-ironwolf-20t': {
      name: 'IronWolf Pro 20TB', shortDesc: 'High-capacity professional NAS drive with CMR and a 5-year warranty',
      description: 'The Seagate IronWolf Pro 20TB belongs to the professional NAS drive line, running at 7,200RPM with CMR recording. Built for multi-bay NAS and 24/7 operation, it carries a 5-year warranty. Contact us to confirm detailed specifications and current pricing.',
      tags: ['Professional', 'High capacity', '5-year warranty'],
    },
    'seagate-ironwolf-22t': {
      name: 'IronWolf Pro 22TB', shortDesc: 'High-capacity professional NAS drive with CMR and a 5-year warranty',
      description: 'The Seagate IronWolf Pro 22TB belongs to the professional NAS drive line, running at 7,200RPM with CMR recording. Built for multi-bay NAS and 24/7 operation, it carries a 5-year warranty. Contact us to confirm detailed specifications and current pricing.',
      tags: ['Professional', 'High capacity', '5-year warranty'],
    },
    'seagate-ironwolf-24t': {
      name: 'IronWolf Pro 24TB', shortDesc: 'High-capacity professional NAS drive with CMR and a 5-year warranty',
      description: 'The Seagate IronWolf Pro 24TB belongs to the professional NAS drive line, running at 7,200RPM with CMR recording. Built for multi-bay NAS and 24/7 operation, it carries a 5-year warranty. Contact us to confirm detailed specifications and current pricing.',
      tags: ['Professional', 'High capacity', '5-year warranty'],
    },
    'seagate-ironwolf-32t': {
      name: 'IronWolf Pro 32TB', shortDesc: 'Ultra-high-capacity professional NAS drive for dense storage',
      description: 'The Seagate IronWolf Pro 32TB is the ultra-high-capacity model in the professional NAS drive line, aimed at video archives and surveillance storage. Contact us to confirm detailed specifications and current pricing.',
      tags: ['Professional', 'Ultra capacity'],
    },
    'toshiba-n300': {
      name: 'N300 NAS Hard Drive', shortDesc: 'Toshiba NAS drive, multiple capacities available',
      description: 'The Toshiba N300 series is a dedicated hard drive for NAS and small servers, rated for 24/7 operation and suited to home media libraries and small-business file sharing. Several capacities are available — contact us to confirm capacity and pricing.',
      tags: ['NAS-ready', 'Multiple capacities'],
    },
    'samsung-990-pro-1t': {
      shortDesc: 'PCIe 4.0 NVMe SSD with 7,450MB/s reads, ideal for NAS caching',
      description: 'The Samsung 990 PRO is a flagship PCIe 4.0 NVMe SSD with sequential reads up to 7,450MB/s and writes up to 6,900MB/s. Samsung V-NAND and an in-house controller make it an excellent NAS cache drive for accelerating small-file workloads.',
      tags: ['PCIe 4.0', 'High-speed cache', 'Flagship'],
    },
    'crucial-mx500-1t': {
      shortDesc: 'Reliable SATA SSD with reads up to 560MB/s',
      description: 'The Crucial MX500 is a proven SATA SSD with sequential reads up to 560MB/s and writes up to 510MB/s. Micron 3D TLC NAND and a DRAM cache deliver excellent stability and endurance for NAS system drives or laptop and desktop upgrades.',
      tags: ['SATA', 'Reliable', 'Great value'],
    },
    'ugreen-hdd-enclosure': {
      name: '2.5/3.5-inch Drive Enclosure', shortDesc: 'Tool-free USB 3.0 enclosure supporting drives up to 10TB',
      description: 'This UGREEN enclosure supports 2.5-inch and 3.5-inch SATA drives over USB 3.0 at up to 5Gbps. Its tool-free sliding cover makes installation easy, while the included power adapter provides stable power for 3.5-inch drives up to 10TB.',
      tags: ['Tool-free', 'High capacity', 'USB 3.0'],
    },
    'ugreen-m2-enclosure': {
      name: 'M.2 NVMe Enclosure', shortDesc: '10Gbps USB 3.2 Gen 2 enclosure for both NVMe and SATA',
      description: 'This UGREEN M.2 enclosure supports both NVMe and SATA drives over a 10Gbps USB 3.2 Gen 2 connection. Its aluminum body dissipates heat effectively and accepts 2230, 2242, 2260 and 2280 M.2 drives with plug-and-play operation.',
      tags: ['Dual protocol', 'High speed', 'Aluminum cooling'],
    },
    'sata-expansion-card': {
      name: 'PCIe to SATA Expansion Card', shortDesc: 'PCIe 3.0 x1 card with four SATA 3.0 ports for NAS expansion',
      description: 'This UGREEN PCIe-to-SATA card turns one motherboard PCIe slot into four SATA 3.0 ports. It supports RAID 0, 1 and 10 for NAS or desktop storage expansion, using a Marvell controller for stable, reliable transfers.',
      tags: ['NAS expansion', 'RAID support', 'Plug and play'],
    },
  },
  ja: {
    'zspace-z4-pro': {
      shortDesc: 'Intel N97搭載、4Kメディアライブラリ対応の高性能4ベイNAS',
      description: 'ZSpace Z4 Proは、家庭や小規模スタジオ向けの高性能4ベイNASです。Intel N97、4GBまたは8GBのDDR5メモリを搭載し、映像・写真・音楽向けの多彩なアプリを利用できます。HDMI 2.0でテレビへ直接4K映像を出力できます。',
      tags: ['4ベイ', 'メディアライブラリ', 'HDMI出力'],
    },
    'zspace-z2-pro': {
      shortDesc: '家庭のデータバックアップに適した入門向け2ベイNAS',
      description: 'ZSpace Z2 ProはRAID 1に対応する入門向け2ベイ家庭用NASです。クアッドコアARMプロセッサと2GBメモリを搭載し、スマートフォン写真の自動バックアップ、WeChatファイルの保存、メディアライブラリなどを手頃な価格で利用できます。',
      tags: ['2ベイ', '入門向け', '静音設計'],
    },
    'zspace-q2c': {
      shortDesc: 'クアッドコア搭載、コストパフォーマンスに優れた2ベイ家庭用NAS',
      description: 'ZSpace Q2Cは、Rockchip RK3568クアッドコアと2GB DDR4メモリを搭載した入門向け家庭用NASです。2ベイ構成で各22TBまで対応。メディア・写真アプリ、スマートフォンの自動バックアップ、リモートアクセスを備え、家庭用ストレージを手軽に始められます。',
      tags: ['2ベイ', '高コスパ', '入門向け'],
    },
    'zspace-t2': {
      shortDesc: 'M.2を2基搭載する持ち運べるオールフラッシュNAS',
      description: 'ZSpace T2は、M.2 2280 SSDを2基搭載できるポータブル・オールフラッシュNASです。バッテリー内蔵でモバイルバッテリーからも給電可能。ポケットに収まるサイズに、HDMI出力、SDカードリーダー、Wi-Fiを備え、写真家やモバイルワーカーに適しています。',
      tags: ['オールフラッシュ', 'ポータブル', 'クリエイター向け'],
    },
    'ugreen-dxp4800-plus': {
      shortDesc: '10GbEとAI写真管理を備えたフラッグシップ4ベイNAS',
      description: 'UGREEN DXP4800 PlusはIntel Pentium Gold 8505を搭載するフラッグシップNASです。8GBメモリは64GBまで拡張でき、10GbEで最大1,000MB/sの転送に対応。UGOS ProにはAI写真管理、メディアライブラリ、Docker拡張が含まれます。',
      tags: ['10GbE', 'AI写真管理', 'Docker'],
    },
    'ugreen-dxp2800': {
      shortDesc: '2.5GbE対応、家庭の映像管理に適した2ベイNAS',
      description: 'UGREEN DXP2800はIntel N100と4GBメモリを搭載する2ベイ家庭用NASです。2.5GbEとSSDキャッシュに対応し、UGOS Proのメディアライブラリ、写真バックアップ、ファイル同期により、家庭用メディアセンターを構築できます。',
      tags: ['2ベイ', '2.5GbE', '家庭用メディア'],
    },
    'ugreen-dxp8800-plus': {
      shortDesc: 'デュアル10GbE搭載の法人向け8ベイNAS',
      description: 'UGREEN DXP8800 Plusは中小企業とプロフェッショナル向けの上位8ベイNASです。Intel Core i5-1235U、拡張可能な16GBメモリ、リンクアグリゲーション対応の10GbEポート2基、PCIe拡張スロットを備え、SAS/SATAドライブの混在にも対応します。',
      tags: ['8ベイ', '法人向け', 'デュアル10GbE'],
    },
    'seagate-ironwolf-4t': {
      name: 'IronWolf 4TB', shortDesc: 'CMR方式、年間180TBのワークロードに対応するNAS向けHDD',
      description: 'Seagate IronWolfは、CMR記録方式と24時間365日の稼働を想定したNAS向けHDDです。4TBモデルは64MBキャッシュ、5,400RPM、年間180TBのワークロードに対応し、家庭や小規模オフィスのNASに適しています。',
      tags: ['NAS向け', 'CMR', '静音'],
    },
    'seagate-ironwolf-8t': {
      name: 'IronWolf 8TB', shortDesc: '256MBキャッシュとAgileArrayを備えたNAS向けHDD',
      description: 'Seagate IronWolf 8TBは256MBキャッシュと7,200RPMに加え、RAID性能と電源管理を最適化するAgileArrayを搭載しています。IronWolf Health Managementで主要NASと連携し、年間180TBのワークロードに対応します。',
      tags: ['NAS向け', '7,200RPM', '大容量キャッシュ'],
    },
    'seagate-ironwolf-16t': {
      name: 'IronWolf Pro 16TB', shortDesc: '年間550TB、5年保証のプロ向けNAS HDD',
      description: 'Seagate IronWolf Pro 16TBは7,200RPM、256MBキャッシュを備えたプロ向けNAS HDDです。年間550TBのワークロードと最大24ベイのNASに対応し、5年保証と3年間のRescueデータ復旧サービスが付属します。',
      tags: ['プロ向け', '大容量', '5年保証'],
    },
    'seagate-ironwolf-18t': {
      name: 'IronWolf Pro 18TB', shortDesc: 'CMR方式・5年保証の大容量プロ向けNAS HDD',
      description: 'Seagate IronWolf Pro 18TBはプロ向けNAS HDDシリーズの製品で、7,200RPM、CMR記録方式を採用しています。マルチベイNASや24時間365日の連続運転を想定し、5年保証が付属します。詳細仕様と価格はお問い合わせください。',
      tags: ['プロ向け', '大容量', '5年保証'],
    },
    'seagate-ironwolf-20t': {
      name: 'IronWolf Pro 20TB', shortDesc: 'CMR方式・5年保証の大容量プロ向けNAS HDD',
      description: 'Seagate IronWolf Pro 20TBはプロ向けNAS HDDシリーズの製品で、7,200RPM、CMR記録方式を採用しています。マルチベイNASや24時間365日の連続運転を想定し、5年保証が付属します。詳細仕様と価格はお問い合わせください。',
      tags: ['プロ向け', '大容量', '5年保証'],
    },
    'seagate-ironwolf-22t': {
      name: 'IronWolf Pro 22TB', shortDesc: 'CMR方式・5年保証の大容量プロ向けNAS HDD',
      description: 'Seagate IronWolf Pro 22TBはプロ向けNAS HDDシリーズの製品で、7,200RPM、CMR記録方式を採用しています。マルチベイNASや24時間365日の連続運転を想定し、5年保証が付属します。詳細仕様と価格はお問い合わせください。',
      tags: ['プロ向け', '大容量', '5年保証'],
    },
    'seagate-ironwolf-24t': {
      name: 'IronWolf Pro 24TB', shortDesc: 'CMR方式・5年保証の大容量プロ向けNAS HDD',
      description: 'Seagate IronWolf Pro 24TBはプロ向けNAS HDDシリーズの製品で、7,200RPM、CMR記録方式を採用しています。マルチベイNASや24時間365日の連続運転を想定し、5年保証が付属します。詳細仕様と価格はお問い合わせください。',
      tags: ['プロ向け', '大容量', '5年保証'],
    },
    'seagate-ironwolf-32t': {
      name: 'IronWolf Pro 32TB', shortDesc: '高密度ストレージ向けの超大容量プロ向けNAS HDD',
      description: 'Seagate IronWolf Pro 32TBはプロ向けNAS HDDシリーズの超大容量モデルで、映像アーカイブや監視映像の保存を想定しています。詳細仕様と価格はお問い合わせください。',
      tags: ['プロ向け', '超大容量'],
    },
    'toshiba-n300': {
      name: 'N300 NAS ハードディスク', shortDesc: '東芝のNAS向けHDD、複数容量から選択可能',
      description: '東芝N300シリーズはNASや小規模サーバー向けの専用HDDで、24時間365日の連続運転に対応し、家庭のメディアライブラリや中小企業のファイル共有に適しています。複数の容量をご用意しています。容量と価格はお問い合わせください。',
      tags: ['NAS対応', '複数容量'],
    },
    'samsung-990-pro-1t': {
      shortDesc: '最大7,450MB/s、NASキャッシュに適したPCIe 4.0 NVMe SSD',
      description: 'Samsung 990 PROは、最大7,450MB/sのシーケンシャル読み込みと6,900MB/sの書き込みに対応するPCIe 4.0 NVMe SSDです。V-NANDと自社製コントローラーにより、NASのSSDキャッシュとして小さなファイルの処理を高速化します。',
      tags: ['PCIe 4.0', '高速キャッシュ', 'フラッグシップ'],
    },
    'crucial-mx500-1t': {
      shortDesc: '最大560MB/s、安定性に優れたSATA SSD',
      description: 'Crucial MX500は、最大560MB/sのシーケンシャル読み込みと510MB/sの書き込みに対応する定番SATA SSDです。Micron 3D TLC NANDとDRAMキャッシュを採用し、NASのシステムドライブやPCのアップグレードに適した安定性と耐久性を備えます。',
      tags: ['SATA', '安定・高耐久', '高コスパ'],
    },
    'ugreen-hdd-enclosure': {
      name: '2.5/3.5インチ ドライブケース', shortDesc: '最大10TB対応、工具不要のUSB 3.0ドライブケース',
      description: 'UGREENのドライブケースは2.5/3.5インチSATAドライブに対応し、USB 3.0で最大5Gbpsの転送が可能です。工具不要のスライドカバーで簡単に取り付けられ、付属ACアダプターにより最大10TBの3.5インチドライブにも安定して給電します。',
      tags: ['工具不要', '大容量対応', 'USB 3.0'],
    },
    'ugreen-m2-enclosure': {
      name: 'M.2 NVMeケース', shortDesc: 'NVMe/SATA両対応、10Gbps USB 3.2 Gen 2ケース',
      description: 'UGREEN M.2ケースはNVMeとSATAの両方式に対応し、USB 3.2 Gen 2で最大10Gbpsの転送が可能です。放熱性に優れたアルミ製で、2230/2242/2260/2280サイズのM.2ドライブを工具不要で利用できます。',
      tags: ['両方式対応', '高速転送', 'アルミ放熱'],
    },
    'sata-expansion-card': {
      name: 'PCIe - SATA拡張カード', shortDesc: 'NAS増設向け、PCIe 3.0 x1からSATA 3.0を4ポート増設',
      description: 'UGREEN PCIe-SATA拡張カードは、マザーボードのPCIeスロット1基をSATA 3.0ポート4基へ拡張します。RAID 0/1/10に対応し、NASやデスクトップPCのドライブ増設に最適。Marvellコントローラーで安定した転送を実現します。',
      tags: ['NAS増設', 'RAID対応', 'プラグ＆プレイ'],
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
