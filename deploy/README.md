# 阿里云 ECS 部署

网站同时部署在两处，内容一致：

| 域名 | 托管 | 用途 |
|---|---|---|
| `www.youzhiyes.com` | 阿里云 ECS（本目录） | 已备案，对外主域名 |
| `www.bjyzyes.com` | Vercel | 备份，阿里云停用时仍可访问 |

两边由同一次 `git push` 触发更新：Vercel 用自身的 Git 集成，ECS 用
`.github/workflows/deploy-ecs.yml`。

构建时的 `SITE_URL` 决定 canonical、og:url、sitemap、robots.txt 指向哪个域名，
所以两份产物内容相同但自引用各自的域名，不会互相干扰 SEO。

## 首次部署

### 1. 服务器初始化

把本目录传到服务器后执行：

```bash
sudo bash setup.sh
```

装 nginx、Node 20、certbot，建 `youzhi` 运行用户和 `/opt/youzhi` 目录，
装 systemd 服务，开防火墙（22 / 80 / 443）。

### 2. 填环境变量

```bash
sudo nano /etc/youzhi/api.env
```

填入 `WECOM_WEBHOOK_URL`，值与 Vercel 环境变量里的相同。

### 3. 配置 GitHub Secrets

仓库 Settings → Secrets and variables → Actions：

| 名称 | 值 |
|---|---|
| `ECS_HOST` | 服务器公网 IP |
| `ECS_USER` | 部署用的 SSH 用户名 |
| `ECS_SSH_KEY` | 该用户的私钥（完整内容，含首尾行） |

再到同页的 **Variables** 标签新增仓库变量 `ECS_ENABLED` = `true`，
部署 workflow 才会真正执行。在此之前它会自动跳过，不会因缺凭据而失败。

### 4. 等备案通过后启用站点

**备案审核期间不要做这一步** —— 域名指向境内服务器并可访问会导致备案被驳回。

备案通过、DNS 的 A 记录指向服务器之后：

```bash
sudo bash enable-site.sh
```

申请 Let's Encrypt 证书、启用 nginx 站点、验证自动续期。

## 日常维护

- **部署**：push 到 `main` 即可，无需手动操作
- **看日志**：`journalctl -u youzhi-api -f`
- **重启 API**：`sudo systemctl restart youzhi-api`
- **证书续期**：certbot 自动处理，可用 `sudo certbot renew --dry-run` 验证
- **系统更新**：建议每月 `sudo apt update && sudo apt upgrade`

## 结构

```
/opt/youzhi/
  dist/        构建产物，nginx 直接托管
  api/         业务逻辑，与 Vercel 共用同一份源码
  server.js    平台适配层（Vercel 特性 → 裸 Node）
/etc/youzhi/
  api.env      环境变量，不进 git
```

`server.js` 只做三件适配：解析 body、补 `res.status().json()`、路由分发。
业务逻辑仍在 `api/notify.js`，两个部署共用，避免行为漂移。
