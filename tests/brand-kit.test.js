import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// brand-kit/ 是发给标识厂和商标代理的文件，出了错对方不会回来报。
// 这里守住两个已经出过的问题：图纸画布比白底大，下方留出一截透明空白；
// 商标候选 JPG 靠手工导出，脚本更新 SVG 后 JPG 悄悄过时。

const kit = new URL('../brand-kit/', import.meta.url);
const list = (dir, ext) => readdirSync(new URL(dir, kit)).filter((f) => f.endsWith(ext)).sort();

test('品牌图纸：白底铺满整张画布，不留透明空白', () => {
  const files = list('drawings/', '.svg');
  assert.ok(files.length > 0);
  for (const file of files) {
    const svg = readFileSync(new URL(`drawings/${file}`, kit), 'utf8');
    const canvas = svg.match(/<svg[^>]*\swidth="(\d+)"\s+height="(\d+)"/);
    const background = svg.match(/<rect\s+width="(\d+)"\s+height="(\d+)"/);
    assert.ok(canvas && background, `${file} 找不到画布或白底`);
    assert.deepEqual(background.slice(1), canvas.slice(1), `${file} 的白底与画布尺寸不一致`);
  }
});

// 不同渲染器的抗锯齿有细微出入，不要求逐像素相等，只统计明显不同
// （通道差 > 32）的比例。实测：脚本生成的 JPG 为 0，仅删掉一行小标语就到 0.13%。
const MAX_CHANGED = 0.0005;

const rgb = (file) => sharp(file).flatten({ background: '#FFFFFF' }).removeAlpha().raw().toBuffer();

test('商标候选图：每张 SVG 都有同名 JPG，且画面一致', async () => {
  const files = list('trademark-candidates/', '.svg');
  assert.ok(files.length > 0);
  for (const file of files) {
    const svgPath = fileURLToPath(new URL(`trademark-candidates/${file}`, kit));
    const jpgPath = svgPath.replace(/\.svg$/u, '.jpg');
    const jpg = file.replace(/\.svg$/u, '.jpg');
    assert.ok(existsSync(jpgPath), `缺少 ${jpg}，运行 npm run brand:build`);

    const { hasAlpha } = await sharp(jpgPath).metadata();
    assert.equal(hasAlpha, false, `${jpg} 带透明通道`);

    const [expected, actual] = await Promise.all([rgb(svgPath), rgb(jpgPath)]);
    assert.equal(actual.length, expected.length, `${jpg} 与 SVG 尺寸不一致`);
    let changed = 0;
    for (let i = 0; i < expected.length; i += 1) {
      if (Math.abs(expected[i] - actual[i]) > 32) changed += 1;
    }
    const ratio = changed / expected.length;
    assert.ok(
      ratio <= MAX_CHANGED,
      `${jpg} 与 SVG 不一致（${(ratio * 100).toFixed(3)}% 像素不同），运行 npm run brand:build 重新生成`,
    );
  }
});
