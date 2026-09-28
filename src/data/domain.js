// 站点的规范域名。
//
// 网站同时部署在阿里云（www.youzhiyes.com，已备案的主域名）和 Vercel
// （www.bjyzyes.com，备用站），两边内容完全相同。canonical、og:url、结构化数据、
// sitemap、robots.txt 一律指向主域名：搜索引擎据此把两边当成同一个站，
// 收录和排名集中在主域名上，不会被两个域名分走。备用站照常可以访问。
//
// 故意不从环境变量读：Vercel 项目里要是设过 SITE_URL，备用站就又会声明自己是正版。
export const SITE_URL = 'https://www.youzhiyes.com';
