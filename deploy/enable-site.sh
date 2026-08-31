#!/usr/bin/env bash
# 备案通过、域名已解析到本机之后再执行。
# 申请 HTTPS 证书并启用站点配置。
#
#   sudo bash enable-site.sh

set -euo pipefail

DOMAIN=youzhiyes.com
WWW=www.youzhiyes.com

echo "==> 检查域名是否已解析到本机"
SERVER_IP=$(curl -fsS --max-time 10 https://api.ipify.org || echo "")
for d in "$DOMAIN" "$WWW"; do
  RESOLVED=$(getent hosts "$d" | awk '{print $1}' | head -1 || echo "")
  echo "    $d -> ${RESOLVED:-未解析}"
  if [ -z "$RESOLVED" ]; then
    echo "    ❌ $d 尚未解析，先去 DNS 配 A 记录指向 $SERVER_IP"
    exit 1
  fi
done

echo "==> 申请 Let's Encrypt 证书"
certbot certonly --webroot -w /var/www/certbot \
  -d "$DOMAIN" -d "$WWW" \
  --agree-tos --non-interactive --email nancy@bjyzyes.com

echo "==> 启用站点配置"
cp nginx.conf /etc/nginx/sites-available/youzhi.conf
ln -sf /etc/nginx/sites-available/youzhi.conf /etc/nginx/sites-enabled/youzhi.conf
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl reload nginx
systemctl restart youzhi-api

echo "==> 验证自动续期"
systemctl list-timers certbot.timer --no-pager || true
certbot renew --dry-run

echo
echo "✅ 站点已启用：https://$WWW"
