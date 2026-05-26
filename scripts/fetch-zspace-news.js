import { writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = 'https://vapi.zenithspace.net/api/v1/content/contentmedia/list?pageIndex=1&pageSize=9';
const OUTPUT_FILE = join(__dirname, '..', 'src', 'data', 'zspace-news.json');

async function fetchNews() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(API_URL, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();

    if (data.code !== 200 || !data.data?.list) {
      throw new Error(`API error: ${data.msg || 'unknown'}`);
    }

    const news = data.data.list.map((item) => ({
      id: item.id,
      title: item.title,
      desc: item.content,
      url: item.url,
      media: item.from_media,
      date: item.createdAt?.split('T')[0] || '',
      image: item.pic || '',
    }));

    writeFileSync(OUTPUT_FILE, JSON.stringify(news, null, 2) + '\n', 'utf-8');
    console.log(`✅ 成功抓取 ${news.length} 条极空间新闻`);
    return true;
  } catch (err) {
    console.error('❌ 抓取失败:', err.message);

    // API 失败时不覆盖旧数据（如果存在）
    if (existsSync(OUTPUT_FILE)) {
      console.log('ℹ️ 保留旧数据不覆盖');
    } else {
      // 首次运行且失败，写入空数组避免构建报错
      writeFileSync(OUTPUT_FILE, '[]\n', 'utf-8');
    }
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

fetchNews();
