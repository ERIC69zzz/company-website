#!/usr/bin/env bash
# 阿里云 ECS 一次性初始化脚本（Ubuntu 22.04）
#
# 用法：以 root 身份在服务器上执行
#   sudo bash setup.sh
#
# 做完这些事：装 nginx/node/certbot、建运行用户和目录、装 systemd 服务。
# 不含证书申请和站点启用 —— 那两步要等备案通过、域名解析过来之后再做。

set -euo pipefail

APP_DIR=/opt/youzhi
ENV_DIR=/etc/youzhi
RUN_USER=youzhi

echo "==> 更新软件包索引"
apt-get update -qq

echo "==> 安装 nginx / certbot / 基础工具"
apt-get install -y -qq nginx certbot python3-certbot-nginx rsync ufw

echo "==> 安装 Node.js 20 LTS"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
fi
node --version

echo "==> 创建运行用户与目录"
id -u "$RUN_USER" >/dev/null 2>&1 || useradd --system --shell /usr/sbin/nologin --home "$APP_DIR" "$RUN_USER"
mkdir -p "$APP_DIR/dist" "$ENV_DIR" /var/www/certbot
chown -R "$RUN_USER:$RUN_USER" "$APP_DIR"
chmod 750 "$ENV_DIR"

echo "==> 准备环境变量文件"
if [ ! -f "$ENV_DIR/api.env" ]; then
  cat > "$ENV_DIR/api.env" <<'ENVEOF'
# 企业微信机器人 Webhook，从 Vercel 环境变量里复制同一个值
WECOM_WEBHOOK_URL=
# 可选：额外放行的来源，逗号分隔
ALLOWED_ORIGINS=
ENVEOF
  chmod 640 "$ENV_DIR/api.env"
  echo "    已创建 $ENV_DIR/api.env —— 记得填入 WECOM_WEBHOOK_URL"
else
  echo "    $ENV_DIR/api.env 已存在，跳过"
fi

echo "==> 安装 systemd 服务"
cp youzhi-api.service /etc/systemd/system/youzhi-api.service
systemctl daemon-reload
systemctl enable youzhi-api

echo "==> 配置防火墙"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status

echo
echo "✅ 初始化完成。接下来："
echo "   1. 编辑 $ENV_DIR/api.env 填入 WECOM_WEBHOOK_URL"
echo "   2. 等备案通过、域名解析到本机后，再执行 enable-site.sh 申请证书并启用站点"
