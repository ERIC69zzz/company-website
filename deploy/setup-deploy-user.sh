#!/usr/bin/env bash
# 创建 GitHub Actions 用的部署账号。
#
# 用法：以 root 在服务器上执行，把你的 SSH 公钥作为参数传入
#   sudo bash setup-deploy-user.sh "ssh-ed25519 AAAA... your@mac"
#
# 不用 root 做 CI 部署：这个账号只能写 /opt/youzhi，
# 以及重启 youzhi-api 这一个服务，别的什么都干不了。

set -euo pipefail

PUBKEY="${1:-}"
if [ -z "$PUBKEY" ]; then
  echo "❌ 需要传入 SSH 公钥，例如："
  echo "   sudo bash setup-deploy-user.sh \"ssh-ed25519 AAAA... you@mac\""
  exit 1
fi

DEPLOY_USER=deploy
APP_DIR=/opt/youzhi

echo "==> 创建部署账号 $DEPLOY_USER"
id -u "$DEPLOY_USER" >/dev/null 2>&1 || useradd --create-home --shell /bin/bash "$DEPLOY_USER"

echo "==> 写入授权公钥"
install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
echo "$PUBKEY" > "/home/$DEPLOY_USER/.ssh/authorized_keys"
chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys"
chown "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh/authorized_keys"

echo "==> 授予应用目录写权限"
# 让 deploy 与运行服务的 youzhi 用户同组，目录设 setgid 保证新文件继承组
usermod -aG youzhi "$DEPLOY_USER"
chown -R youzhi:youzhi "$APP_DIR"
chmod -R g+w "$APP_DIR"
find "$APP_DIR" -type d -exec chmod g+s {} \;

echo "==> 只允许重启这一个服务，不给其它 sudo 权限"
cat > /etc/sudoers.d/youzhi-deploy <<SUDOEOF
$DEPLOY_USER ALL=(root) NOPASSWD: /usr/bin/systemctl restart youzhi-api
SUDOEOF
chmod 440 /etc/sudoers.d/youzhi-deploy
visudo -c -f /etc/sudoers.d/youzhi-deploy

echo
echo "✅ 完成。GitHub Secrets 填："
echo "   ECS_HOST = $(curl -fsS --max-time 5 https://api.ipify.org 2>/dev/null || echo '你的公网 IP')"
echo "   ECS_USER = $DEPLOY_USER"
echo "   ECS_SSH_KEY = 对应的私钥全文（含首尾 BEGIN/END 行）"
