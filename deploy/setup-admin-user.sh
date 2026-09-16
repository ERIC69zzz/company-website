#!/usr/bin/env bash
# 创建日常运维用的管理员账号，替代直接用 root 登录。
#
# 用法：以 root 在服务器上执行，把你自己的 SSH 公钥作为参数传入
#   sudo bash setup-admin-user.sh "ssh-ed25519 AAAA... you@mac"
#
# 注意：这个脚本【不会】关闭 root 登录。
# 关 root 是第二步，必须等你确认新账号能登进来之后再手动做，
# 否则一旦公钥写错，你就把自己锁在服务器外面了。

set -euo pipefail

PUBKEY="${1:-}"
if [ -z "$PUBKEY" ]; then
  echo "❌ 需要传入 SSH 公钥，例如："
  echo "   sudo bash setup-admin-user.sh \"ssh-ed25519 AAAA... you@mac\""
  exit 1
fi

case "$PUBKEY" in
  ssh-ed25519\ *|ssh-rsa\ *|ecdsa-sha2-*) ;;
  *) echo "❌ 这不像一个 SSH 公钥。要以 ssh-ed25519 / ssh-rsa 开头。"; exit 1 ;;
esac

ADMIN_USER=ops

echo "==> 创建管理员账号 $ADMIN_USER"
id -u "$ADMIN_USER" >/dev/null 2>&1 || useradd --create-home --shell /bin/bash "$ADMIN_USER"
usermod -aG sudo "$ADMIN_USER"

echo "==> 写入授权公钥"
install -d -m 700 -o "$ADMIN_USER" -g "$ADMIN_USER" "/home/$ADMIN_USER/.ssh"
echo "$PUBKEY" > "/home/$ADMIN_USER/.ssh/authorized_keys"
chmod 600 "/home/$ADMIN_USER/.ssh/authorized_keys"
chown "$ADMIN_USER:$ADMIN_USER" "/home/$ADMIN_USER/.ssh/authorized_keys"

# 没有密码就没法用 sudo（Ubuntu 默认 sudo 要求输密码）。
# 这里不设密码，改成免密 sudo —— 因为登录本身已经是纯密钥，
# 再加一道密码只会让你把密码写在某个不安全的地方。
echo "==> 配置免密 sudo"
cat > /etc/sudoers.d/youzhi-ops <<SUDOEOF
$ADMIN_USER ALL=(ALL) NOPASSWD: ALL
SUDOEOF
chmod 440 /etc/sudoers.d/youzhi-ops
visudo -c -f /etc/sudoers.d/youzhi-ops

echo
echo "✅ 账号已创建。现在【不要关掉当前这个 root 会话】。"
echo
echo "   1. 另开一个终端，验证能登进来："
echo "        ssh $ADMIN_USER@$(curl -fsS --max-time 5 https://api.ipify.org 2>/dev/null || echo '服务器IP')"
echo "        sudo whoami        # 应该输出 root"
echo
echo "   2. 上面两条都成功之后，再回到 root 会话执行："
echo "        sudo sed -i 's/^#\\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config"
echo "        sudo sshd -t && sudo systemctl reload ssh"
echo
echo "   3. 万一锁在外面了：阿里云控制台 → 实例 → 远程连接 → VNC，"
echo "      走带外通道进系统改回来，不依赖 SSH。"
