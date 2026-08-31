import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

// 微信二维码。优先使用 public/wechat-qr.png，
// 文件未放入或加载失败时回退为占位图，避免出现破图。
export default function WechatQr({ alt, fallbackText, className = 'w-48 h-48' }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`${className} rounded-xl bg-white flex items-center justify-center mb-4 overflow-hidden`}>
      {failed ? (
        <div className="text-center text-ink-2">
          <MessageSquare className="w-12 h-12 mx-auto mb-2 text-ink-2" />
          <p className="text-xs">{fallbackText}</p>
        </div>
      ) : (
        <img
          src="/wechat-qr.png"
          alt={alt}
          className="w-full h-full object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
