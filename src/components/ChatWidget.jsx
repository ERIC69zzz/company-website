import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/language';

export default function ChatWidget({ embedded = false }) {
  const location = useLocation();
  const { language, copy } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', isWelcome: true },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // 打开时聚焦输入框
  useEffect(() => {
    if (isOpen || embedded) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [embedded, isOpen]);

  // 首次访问显示红点提示
  useEffect(() => {
    if (embedded) return undefined;
    const timer = setTimeout(() => {
      if (!isOpen) setHasNewMessage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [embedded, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasNewMessage(false);
  };

  // 本地预设回复匹配
  const getPresetReply = (text) => {
    const lower = text.toLowerCase();
    for (const qa of copy.chat.presetQA) {
      if (qa.keywords.some((k) => lower.includes(k))) {
        return qa.answer;
      }
    }
    return copy.chat.unknown;
  };

  const callChatAPI = async (userMessages) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: userMessages.map((m) => ({
          role: m.role,
          content: m.isWelcome ? copy.chat.welcome : m.content,
        })),
        language,
      }),
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    const data = await response.json();
    return data.reply || copy.chat.unavailable;
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const reply = await callChatAPI([...messages, userMsg]);
      setAiAvailable(true);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      await new Promise((r) => setTimeout(r, 500));
      setAiAvailable(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `${copy.chat.offline}\n\n${getPresetReply(text)}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const panel = (
    <div
      className={`${embedded
        ? 'h-[560px] rounded-2xl border border-white/5'
        : 'fixed bottom-6 right-6 z-50 w-[90vw] max-w-[420px] h-[520px] max-h-[70vh] rounded-2xl shadow-2xl shadow-black/40'
      } overflow-hidden flex flex-col`}
      style={!embedded ? { animation: 'chatFadeIn 0.3s ease-out' } : undefined}
    >
      {/* 头部 */}
      <div className="flex items-center justify-between px-4 py-3 bg-brand-600 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              {copy.chat.botName}
            </div>
            <div className="text-xs text-white/70 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${aiAvailable ? 'bg-accent-400' : 'bg-amber-300'}`} />
              {aiAvailable ? copy.chat.online : copy.chat.fallback}
            </div>
          </div>
        </div>
        {!embedded && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label={copy.chat.close}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-800">
        {messages.map((msg, index) => (
          <div
            key={`${msg.role}-${index}`}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user'
                  ? 'bg-brand-600'
                  : 'bg-dark-700 border border-white/10'
              }`}
            >
              {msg.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-brand-400" />
              )}
            </div>
            <div
              className={`max-w-[75%] whitespace-pre-wrap px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-brand-600 text-white rounded-tr-sm'
                  : 'bg-dark-700 text-zinc-200 border border-white/5 rounded-tl-sm'
              }`}
            >
              {msg.isWelcome ? copy.chat.welcome : msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5">
            <div className="w-8 h-8 rounded-full bg-dark-700 border border-white/10 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-brand-400" />
            </div>
            <div className="bg-dark-700 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
              <Loader2 className="w-4 h-4 text-brand-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="px-3 py-3 bg-dark-900 border-t border-white/5 shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label={copy.chat.inputLabel}
            placeholder={copy.chat.placeholder}
            rows={1}
            className="flex-1 min-h-[40px] max-h-[100px] bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 resize-none focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || loading}
            className="w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:bg-dark-700 disabled:text-zinc-500 text-white flex items-center justify-center transition-all shrink-0 active:scale-95"
            aria-label={copy.chat.send}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-1.5 text-[10px] text-zinc-500 text-center">
          {copy.chat.hint}
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return panel;
  }

  if (location.pathname === '/consult') {
    return null;
  }

  return (
    <>
      {/* 浮动按钮 */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/40 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label={copy.chat.open}
        >
          <MessageCircle className="w-6 h-6" />
          {hasNewMessage && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-dark-900 animate-pulse" />
          )}
        </button>
      )}

      {/* 聊天窗口 */}
      {isOpen && panel}
    </>
  );
}
