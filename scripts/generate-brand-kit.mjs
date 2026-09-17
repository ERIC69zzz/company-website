import { mkdir, readFile, writeFile, copyFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const publicDir = path.join(repoRoot, 'public');
const kitDir = path.join(repoRoot, 'brand-kit');
const masterDir = path.join(kitDir, 'master');
const filingDir = path.join(kitDir, 'trademark-candidates');
const drawingDir = path.join(kitDir, 'drawings');

await Promise.all([
  mkdir(masterDir, { recursive: true }),
  mkdir(filingDir, { recursive: true }),
  mkdir(drawingDir, { recursive: true }),
]);

const markSource = await readFile(path.join(publicDir, 'logo-mark.svg'), 'utf8');
const lockupSource = await readFile(path.join(publicDir, 'logo-lockup.svg'), 'utf8');

function innerSvg(svg) {
  return svg
    .replace(/^\s*<\?xml[^>]*>\s*/u, '')
    .replace(/^\s*<svg[^>]*>/u, '')
    .replace(/<\/svg>\s*$/u, '')
    .replace(/\s+inkscape:(?:groupmode|label)="[^"]*"/gu, '')
    .trim();
}

function withNotice(svg, notice) {
  return svg.replace(/(<svg[^>]*>)/u, `$1\n  <!-- ${notice} -->`);
}

function recolor(svg, color) {
  return svg.replace(/fill="#[0-9a-f]{6}"/giu, `fill="${color}"`);
}

function removeGroup(svg, groupId) {
  const expression = new RegExp(`\\n?\\s*<g id="${groupId}"[\\s\\S]*?<\\/g>`, 'u');
  return svg.replace(expression, '');
}

const provenanceNotice = 'PROVISIONAL MASTER: derived exactly from public logo assets; visual approval against the original designer artwork is still required.';
const markColor = withNotice(markSource, provenanceNotice);
const markBlack = withNotice(recolor(markSource, '#000000'), provenanceNotice);
const markWhite = withNotice(recolor(markSource, '#FFFFFF'), provenanceNotice);
const lockupColor = withNotice(lockupSource, provenanceNotice);
const lockupBlack = withNotice(recolor(lockupSource, '#000000'), provenanceNotice);
const lockupWhite = withNotice(recolor(lockupSource, '#FFFFFF'), provenanceNotice);
const lockupNoTaglineColor = withNotice(removeGroup(lockupSource, 'tagline'), provenanceNotice);
const lockupNoTaglineBlack = withNotice(recolor(removeGroup(lockupSource, 'tagline'), '#000000'), provenanceNotice);
const lockupNoTaglineWhite = withNotice(recolor(removeGroup(lockupSource, 'tagline'), '#FFFFFF'), provenanceNotice);

const masterFiles = {
  'logo-mark-color.svg': markColor,
  'logo-mark-black.svg': markBlack,
  'logo-mark-white.svg': markWhite,
  'logo-lockup-full-color.svg': lockupColor,
  'logo-lockup-full-black.svg': lockupBlack,
  'logo-lockup-full-white.svg': lockupWhite,
  'logo-lockup-signage-color.svg': lockupNoTaglineColor,
  'logo-lockup-signage-black.svg': lockupNoTaglineBlack,
  'logo-lockup-signage-white.svg': lockupNoTaglineWhite,
};

await Promise.all(Object.entries(masterFiles).map(([filename, contents]) => (
  writeFile(path.join(masterDir, filename), contents)
)));

await copyFile(path.join(publicDir, 'logo-lockup.svg'), path.join(masterDir, 'source-web-lockup.svg'));
await copyFile(path.join(publicDir, 'logo-mark.svg'), path.join(masterDir, 'source-web-mark.svg'));

function filingSvg({ width, height, viewBox, contents, title }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}">
  <title>${title}</title>
  <desc>Candidate export only. Confirm the filing strategy and final artwork before submission.</desc>
  <rect width="${width}" height="${height}" fill="#FFFFFF"/>
  <svg x="60" y="60" width="${width - 120}" height="${height - 120}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">
    ${contents}
  </svg>
</svg>
`;
}

const filingFiles = {
  'mark-color-1500.svg': filingSvg({
    width: 1500,
    height: 1500,
    viewBox: '24 24 248 282',
    contents: innerSvg(markColor),
    title: '友质科技图形标志彩色申请候选图',
  }),
  'mark-black-1500.svg': filingSvg({
    width: 1500,
    height: 1500,
    viewBox: '24 24 248 282',
    contents: innerSvg(markBlack),
    title: '友质科技图形标志黑白申请候选图',
  }),
  'lockup-signage-color-1500.svg': filingSvg({
    width: 1500,
    height: 1500,
    viewBox: '0 0 964 338',
    contents: innerSvg(lockupNoTaglineColor),
    title: '友质科技组合标志彩色申请候选图',
  }),
  'lockup-signage-black-1500.svg': filingSvg({
    width: 1500,
    height: 1500,
    viewBox: '0 0 964 338',
    contents: innerSvg(lockupNoTaglineBlack),
    title: '友质科技组合标志黑白申请候选图',
  }),
  'lockup-full-color-1500.svg': filingSvg({
    width: 1500,
    height: 1500,
    viewBox: '0 0 964 338',
    contents: innerSvg(lockupColor),
    title: '友质科技完整组合标志彩色申请候选图',
  }),
  'lockup-full-black-1500.svg': filingSvg({
    width: 1500,
    height: 1500,
    viewBox: '0 0 964 338',
    contents: innerSvg(lockupBlack),
    title: '友质科技完整组合标志黑白申请候选图',
  }),
};

const obsoleteCandidateFiles = [
  'mark-color-1200.svg',
  'mark-black-1200.svg',
  'mark-color-1200.jpg',
  'mark-black-1200.jpg',
  'lockup-signage-color-1500x526.svg',
  'lockup-signage-black-1500x526.svg',
  'lockup-full-color-1500x526.svg',
  'lockup-full-black-1500x526.svg',
  'lockup-signage-color-1500x526.jpg',
  'lockup-signage-black-1500x526.jpg',
  'lockup-full-color-1500x526.jpg',
  'lockup-full-black-1500x526.jpg',
];

await Promise.all(obsoleteCandidateFiles.map((filename) => (
  rm(path.join(filingDir, filename), { force: true })
)));

await Promise.all(Object.entries(filingFiles).map(([filename, contents]) => (
  writeFile(path.join(filingDir, filename), contents)
)));

// 商标申请系统只收 JPG。JPG 必须和 SVG 同一次生成，手工导出的迟早会和矢量稿对不上。
// 白底铺满、不留透明通道；4:4:4 采样，避免橙蓝交界处发虚。
await Promise.all(Object.entries(filingFiles).map(([filename, contents]) => (
  sharp(Buffer.from(contents))
    .flatten({ background: '#FFFFFF' })
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .withIccProfile('srgb')
    .withMetadata({ density: 72 })
    .toFile(path.join(filingDir, filename.replace(/\.svg$/u, '.jpg')))
)));

const proportionSheet = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
  <title>友质科技 Logo 比例与安全空间参考图</title>
  <rect width="1600" height="1100" fill="#FFFFFF"/>
  <g font-family="Arial, 'PingFang SC', sans-serif" fill="#20211F">
    <text x="80" y="72" font-size="34" font-weight="700">友质科技 Logo 比例与安全空间参考</text>
    <text x="80" y="108" font-size="18" fill="#606060">临时生产标准；以 H 为基准，四周安全空间不得小于 0.1H。</text>
  </g>

  <g transform="translate(80 180)">
    <rect x="0" y="0" width="620" height="700" rx="16" fill="#F6F8FB"/>
    <text x="32" y="48" font-family="Arial, 'PingFang SC', sans-serif" font-size="24" font-weight="700" fill="#20211F">独立图形标志</text>
    <rect x="84" y="100" width="452" height="514" fill="none" stroke="#93BFF0" stroke-width="2" stroke-dasharray="10 8"/>
    <svg x="130" y="151" width="360" height="410" viewBox="24 24 248 282" preserveAspectRatio="xMidYMid meet">
      ${innerSvg(markColor)}
    </svg>
    <g font-family="Arial, 'PingFang SC', sans-serif" font-size="18" fill="#606060">
      <text x="232" y="650">W</text>
      <text x="555" y="365">H = 1.1371W</text>
      <text x="32" y="684">虚线框为推荐安全空间：X = 0.1H</text>
    </g>
  </g>

  <g transform="translate(760 180)">
    <rect x="0" y="0" width="760" height="700" rx="16" fill="#F6F8FB"/>
    <text x="32" y="48" font-family="Arial, 'PingFang SC', sans-serif" font-size="24" font-weight="700" fill="#20211F">横向组合标志</text>
    <rect x="56" y="190" width="648" height="308" fill="none" stroke="#93BFF0" stroke-width="2" stroke-dasharray="10 8"/>
    <svg x="92" y="225" width="576" height="202" viewBox="0 0 964 338" preserveAspectRatio="xMidYMid meet">
      ${innerSvg(lockupColor)}
    </svg>
    <g font-family="Arial, 'PingFang SC', sans-serif" font-size="18" fill="#606060">
      <text x="372" y="535">W</text>
      <text x="708" y="350">H = 0.35062W</text>
      <text x="32" y="684">四周安全空间：X = 0.1H；不得拉伸、压缩或重新排字。</text>
    </g>
  </g>

  <g transform="translate(80 940)" font-family="Arial, 'PingFang SC', sans-serif">
    <rect width="1440" height="100" rx="12" fill="#FFF5ED"/>
    <text x="24" y="40" font-size="18" font-weight="700" fill="#A83F00">审批提醒</text>
    <text x="24" y="72" font-size="16" fill="#7D2F00">当前轮廓来自网站矢量重建稿。开模、切割或商标提交前，必须与原设计方文件逐项核对并签字确认。</text>
  </g>
</svg>
`;

await writeFile(path.join(drawingDir, 'logo-proportion-sheet.svg'), proportionSheet);

const swatchSheet = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="760" viewBox="0 0 1400 760">
  <title>友质科技品牌色校样表</title>
  <rect width="1400" height="760" fill="#FFFFFF"/>
  <g font-family="Arial, 'PingFang SC', sans-serif">
    <text x="70" y="70" font-size="34" font-weight="700" fill="#20211F">品牌色校样表</text>
    <text x="70" y="108" font-size="18" fill="#606060">屏幕色值已确定；Pantone、RAL 与油漆色号必须通过实体色板确认。</text>
    <g transform="translate(70 160)">
      <rect width="600" height="210" rx="18" fill="#FF6A00"/>
      <text x="28" y="150" font-size="30" font-weight="700" fill="#FFFFFF">品牌橙</text>
      <text x="28" y="184" font-size="18" fill="#FFFFFF">HEX #FF6A00 · RGB 255 / 106 / 0</text>
    </g>
    <g transform="translate(730 160)">
      <rect width="600" height="210" rx="18" fill="#0D2340"/>
      <text x="28" y="150" font-size="30" font-weight="700" fill="#FFFFFF">品牌深蓝</text>
      <text x="28" y="184" font-size="18" fill="#FFFFFF">HEX #0D2340 · RGB 13 / 35 / 64</text>
    </g>
    <g transform="translate(70 430)">
      <rect width="390" height="150" rx="18" fill="#20211F"/>
      <text x="24" y="96" font-size="24" font-weight="700" fill="#FFFFFF">近黑 #20211F</text>
      <text x="24" y="126" font-size="16" fill="#FFFFFF">RGB 32 / 33 / 31</text>
    </g>
    <g transform="translate(505 430)">
      <rect width="390" height="150" rx="18" fill="#606060"/>
      <text x="24" y="96" font-size="24" font-weight="700" fill="#FFFFFF">灰 #606060</text>
      <text x="24" y="126" font-size="16" fill="#FFFFFF">RGB 96 / 96 / 96</text>
    </g>
    <g transform="translate(940 430)">
      <rect width="390" height="150" rx="18" fill="#D6D6D6"/>
      <text x="24" y="96" font-size="24" font-weight="700" fill="#20211F">分隔线 #D6D6D6</text>
      <text x="24" y="126" font-size="16" fill="#20211F">RGB 214 / 214 / 214</text>
    </g>
    <text x="70" y="660" font-size="17" fill="#606060">印刷 CMYK 为名义换算值，不可代替 ICC 转换；实体制作以经签字确认的 100 × 100 mm 喷涂/材料色板为准。</text>
  </g>
</svg>
`;

await writeFile(path.join(drawingDir, 'brand-color-proof-sheet.svg'), swatchSheet);

const shopDrawingTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1800" viewBox="0 0 1800 1800">
  <title>友质科技实体标志施工图模板</title>
  <rect width="1800" height="1800" fill="#FFFFFF"/>
  <g font-family="Arial, 'PingFang SC', sans-serif" fill="#20211F">
    <text x="70" y="72" font-size="36" font-weight="700">友质科技实体标志施工图模板</text>
    <text x="70" y="112" font-size="18" fill="#A83F00">报价/深化模板，不是已批准施工图；所有空白参数必须由现场勘测和供应商深化补齐。</text>

    <g transform="translate(70 160)">
      <rect width="1660" height="620" fill="#F6F8FB" stroke="#D3DBE4"/>
      <text x="28" y="44" font-size="24" font-weight="700">A. 正视图 FRONT ELEVATION</text>
      <svg x="170" y="115" width="1320" height="360" viewBox="0 0 964 338" preserveAspectRatio="xMidYMid meet">
        ${innerSvg(lockupNoTaglineColor)}
      </svg>
      <line x1="170" y1="535" x2="1490" y2="535" stroke="#1C62B0" stroke-width="2"/>
      <line x1="170" y1="520" x2="170" y2="550" stroke="#1C62B0" stroke-width="2"/>
      <line x1="1490" y1="520" x2="1490" y2="550" stroke="#1C62B0" stroke-width="2"/>
      <text x="760" y="575" font-size="20" fill="#1C62B0">总宽 W = ______ mm</text>
      <text x="1380" y="88" font-size="17" fill="#606060">H = 0.35062W</text>
    </g>

    <g transform="translate(70 830)">
      <rect width="790" height="510" fill="#FFFFFF" stroke="#D3DBE4"/>
      <text x="28" y="44" font-size="24" font-weight="700">B. 侧视图 SIDE VIEW</text>
      <line x1="610" y1="92" x2="610" y2="390" stroke="#20211F" stroke-width="8"/>
      <rect x="350" y="150" width="150" height="190" fill="#EEF2F7" stroke="#0D2340" stroke-width="3"/>
      <line x1="500" y1="245" x2="610" y2="245" stroke="#FF6A00" stroke-width="5"/>
      <text x="334" y="385" font-size="18">成品厚度 D = ____ mm</text>
      <text x="500" y="425" font-size="18">离墙 S = ____ mm</text>
      <text x="625" y="250" font-size="17" fill="#606060">墙体/基层</text>
      <text x="28" y="470" font-size="16" fill="#606060">面板、围边、背板、灯源、电源与检修空间由供应商标注。</text>
    </g>

    <g transform="translate(940 830)">
      <rect width="790" height="510" fill="#FFFFFF" stroke="#D3DBE4"/>
      <text x="28" y="44" font-size="24" font-weight="700">C. 典型剖面 SECTION</text>
      <rect x="520" y="90" width="40" height="310" fill="#D6D6D6"/>
      <rect x="210" y="140" width="90" height="210" fill="#EEF2F7" stroke="#0D2340" stroke-width="3"/>
      <line x1="300" y1="190" x2="520" y2="190" stroke="#0D2340" stroke-width="5"/>
      <line x1="300" y1="300" x2="520" y2="300" stroke="#0D2340" stroke-width="5"/>
      <circle cx="410" cy="245" r="18" fill="#FF6A00"/>
      <text x="80" y="130" font-size="17">面板/围边</text>
      <text x="330" y="170" font-size="17">螺杆/龙骨</text>
      <text x="370" y="235" font-size="17">光源（可选）</text>
      <text x="575" y="250" font-size="17">墙体</text>
      <text x="28" y="470" font-size="16" fill="#606060">必须标注材料牌号、厚度、固定件、出线、防水、排水及公差。</text>
    </g>

    <g transform="translate(70 1390)">
      <rect width="1660" height="320" fill="#F6F8FB" stroke="#D3DBE4"/>
      <text x="24" y="42" font-size="22" font-weight="700">项目参数 / 审批栏</text>
      <g font-size="17" fill="#20211F">
        <text x="24" y="88">项目：________________________</text>
        <text x="560" y="88">安装地址：________________________</text>
        <text x="1120" y="88">图号/版本：________________</text>
        <text x="24" y="132">材质及厚度：________________________</text>
        <text x="560" y="132">表面处理：________________________</text>
        <text x="1120" y="132">发光方式/色温：________________</text>
        <text x="24" y="176">安装方式：________________________</text>
        <text x="560" y="176">实体色板编号：____________________</text>
        <text x="1120" y="176">尺寸公差：____________________</text>
        <text x="24" y="236">品牌方批准：________________ 日期：________</text>
        <text x="560" y="236">供应商技术负责人：____________ 日期：________</text>
      </g>
      <text x="24" y="292" font-size="16" fill="#A83F00">未完成原设计稿核对、实体色板签样及施工图签字前，不得批量生产。</text>
    </g>
  </g>
</svg>
`;

await writeFile(path.join(drawingDir, 'signage-shop-drawing-template.svg'), shopDrawingTemplate);

console.log(`Brand kit generated in ${kitDir}`);
