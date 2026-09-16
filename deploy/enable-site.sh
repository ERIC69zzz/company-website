#!/usr/bin/env bash
# 备案通过、域名已解析到本机之后再执行。
# 申请 HTTPS 证书并启用站点配置。
#
#   sudo bash enable-site.sh
#
# 顺序有讲究：证书申请必须先于正式配置。
#   1. 正式配置里的 443 server 块引用的证书文件此时还不存在，直接启用会让 nginx -t 失败；
#   2. 默认站点的 root 是 /var/www/html，certbot 写到 /var/www/certbot 的验证文件访问不到。
# 所以先放一个只处理 acme-challenge 的临时 HTTP 配置，拿到证书后再换成正式配置。

set -euo pipefail
cd "$(dirname "$0")"

DOMAIN=youzhiyes.com
WWW=www.youzhiyes.com
EMAIL=nancy@youzhiyes.com

echo "==> 检查域名是否已解析到本机"
SERVER_IP=$(curl -fsS --max-time 10 https://api.ipify.org || echo "")
for d in "$DOMAIN" "$WWW"; do
  RESOLVED=$(getent ahostsv4 "$d" | awk '{print $1}' | head -1 || true)
  echo "    $d -> ${RESOLVED:-未解析}（本机公网 IP：${SERVER_IP:-未取到}）"
  if [ -z "$RESOLVED" ]; then
    echo "    ❌ $d 尚未解析，先去 DNS 添加 A 记录指向 ${SERVER_IP:-本机公网 IP}"
    exit 1
  fi
  if [ -n "$SERVER_IP" ] && [ "$RESOLVED" != "$SERVER_IP" ]; then
    echo "    ❌ $d 解析到的是 $RESOLVED，不是本机；DNS 填错了或还没生效，稍后再试"
    exit 1
  fi
done

echo "==> 临时启用只处理证书验证的 HTTP 配置"
mkdir -p /var/www/certbot
cat > /etc/nginx/sites-available/youzhi-acme.conf <<NGINX_EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN $WWW;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 404;
    }
}
NGINX_EOF
ln -sf /etc/nginx/sites-available/youzhi-acme.conf /etc/nginx/sites-enabled/youzhi-acme.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "==> 申请 Let's Encrypt 证书"
# --deploy-hook 会写进续期配置：自动续期成功后重载 nginx，
# 否则 nginx 会一直用内存里的旧证书，90 天后浏览器报证书过期。
certbot certonly --webroot -w /var/www/certbot \
  -d "$DOMAIN" -d "$WWW" \
  --agree-tos --non-interactive --email "$EMAIL" \
  --deploy-hook "systemctl reload nginx"

echo "==> 换成正式站点配置"
cp nginx.conf /etc/nginx/sites-available/youzhi.conf
ln -sf /etc/nginx/sites-available/youzhi.conf /etc/nginx/sites-enabled/youzhi.conf
rm -f /etc/nginx/sites-enabled/youzhi-acme.conf
nginx -t
systemctl reload nginx
systemctl restart youzhi-api

echo "==> 验证自动续期"
systemctl list-timers certbot.timer --no-pager || true
certbot renew --dry-run

echo
echo "✅ 站点已启用：https://$WWW"
