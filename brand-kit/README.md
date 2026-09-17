# 友质科技品牌生产资料包

本目录将网站中的新版 Logo 整理为可审阅、可重复生成的品牌生产资料。它解决版本、矢量格式、黑白/反白、比例、色值和商标候选图样问题，但**不能替代现场勘测和标识厂施工深化**。

## 当前状态

- 几何来源：`public/logo-mark.svg`、`public/logo-lockup.svg`
- 数据状态：临时生产母版，尚未与原设计方 AI/EPS/PDF 逐点核对
- 实体颜色：尚未通过 Pantone/RAL/油漆或材料实物色板签样
- 施工状态：等待确定安装位置、成品尺寸、材质、厚度、发光方式及墙体结构

因此，本资料包可以用于报价、打样和内部审批；在上述三项签字完成前，不建议直接批量开模或提交最终商标申请。

## 文件入口

- `master/`：彩色、黑色、白色，以及带/不带标语的 SVG 母版
- `drawings/logo-proportion-sheet.svg`：比例与安全空间参考
- `drawings/brand-color-proof-sheet.svg`：实体颜色打样单
- `drawings/signage-shop-drawing-template.svg`：正视、侧视、剖面及审批栏施工图模板
- `spec/brand-production-spec.md`：品牌与制作规范
- `spec/brand-data.csv`：可直接发送给供应商的色值数据表
- `spec/fabrication-brief.md`：交给标识厂填写和报价的施工需求单
- `spec/approval-record.md`：品牌、色板、施工图签字记录
- `trademark-candidates/`：商标申请候选图，不代表已经选定申报策略

## 禁止使用

`public/logo.png` 是另一套旧图形，且只有 630 × 630 像素，不得发送给标识厂或用于新商标申请。

## 重新生成

在仓库根目录运行：

```bash
npm run brand:build
```

重新生成不会改变网站现有 Logo，只会刷新本目录内的派生矢量资料和商标候选 JPG。JPG 由脚本从同名 SVG 渲染，不要手工导出替换。
