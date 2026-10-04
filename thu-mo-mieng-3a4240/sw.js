// Máy chạy ngầm của app Mở Miệng: giữ vỏ app + bài đã tải để học khi không có mạng.
// Sửa code app thì TĂNG số phiên bản VO để máy người học lấy bản mới.
const VO = 'mm-vo-v2';
const VO_FILES = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './bai-01.json', './audio/bai-01/kich-thuoc.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VO).then(c => c.addAll(VO_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  // chỉ dọn vỏ app cũ; gói bài học (mm-bai-*) giữ nguyên
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith('mm-vo-') && k !== VO).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  if (url.pathname.endsWith('.mp3')) { e.respondWith(audio(req)); return; }
  // trang + file nội dung: lấy bản mới khi có mạng, mất mạng thì dùng bản đã lưu
  e.respondWith(mangTruoc(req));
});

async function mangTruoc(req) {
  try {
    const r = await fetch(req);
    if (r.ok) {
      const c = await caches.open(VO);
      c.put(new URL(req.url).pathname, r.clone());
    }
    return r;
  } catch (err) {
    const hit = await caches.match(new URL(req.url).pathname, { ignoreSearch: true })
      || (req.mode === 'navigate' && await caches.match('./index.html'));
    return hit || new Response('Đang không có mạng và trang này chưa được tải về máy.',
      { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

// audio: ưu tiên bản đã tải. iPhone xin audio theo từng đoạn (Range) nên phải cắt đúng đoạn trả về.
async function audio(req) {
  const hit = await caches.match(req.url, { ignoreSearch: true });
  if (!hit) return fetch(req);
  const range = req.headers.get('range');
  if (!range) return hit;
  const buf = await hit.arrayBuffer();
  const m = /bytes=(\d*)-(\d*)/.exec(range) || [];
  let start = m[1] ? +m[1] : 0;
  let end = m[2] ? +m[2] : buf.byteLength - 1;
  if (!m[1] && m[2]) { start = buf.byteLength - +m[2]; end = buf.byteLength - 1; }
  end = Math.min(end, buf.byteLength - 1);
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes'
    }
  });
}
