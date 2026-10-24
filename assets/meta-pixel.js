/* META PIXEL cho hieunguyen.net (anh duyệt 24/10/2026) — cùng mã 1640492557473756 với sale page app (do-luong.js).
   Vụ: camp lead VHF01 chỉ chọn được mục tiêu "lượt xem trang đích" vì web không báo cho Facebook ai đã để email
   -> PH tiêu 54k, 111 lượt xem, ~0 email. Có Pixel + sự kiện Lead thì camp sau mới tối ưu theo người để email thật.
   3 mốc: PageView (mọi trang gắn file này) · ViewContent (trang quà /qua/...) · Lead (đúng lúc trang bắn GA4 sign_up = để email xong).
   Không gửi email/tên cho Facebook (không bật advanced matching). Địa chỉ có tham số nhạy cảm (email, mã, token) -> không bật Pixel. */
(function () {
  var PIXEL = '1640492557473756';
  if (/[?&#](email|e|ma|otp|token|k|vao)=/i.test(location.search + location.hash)) return;
  !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', PIXEL); fbq('track', 'PageView');
  var trang = location.pathname.replace(/\/+$/, '') || '/';
  if (/^\/qua\//.test(trang)) fbq('track', 'ViewContent', {content_name: 'qua ' + trang.split('/')[2], content_category: 'lead_magnet'});
  // Lead: bám vào GA4 'sign_up' mà mọi form thu email đã bắn sẵn (index, tai-lieu, quet-ma, qua/70-cau, qua/vhf) — không sửa code từng trang.
  var daBan = false;
  function boc() {
    var g = window.gtag;
    if (!g || g.__fbBoc) return !!g;
    var moi = function () {
      try { if (arguments[0] === 'event' && arguments[1] === 'sign_up' && !daBan) { daBan = true; fbq('track', 'Lead', {content_name: trang}); } } catch (e) {}
      return g.apply(this, arguments);
    };
    moi.__fbBoc = true; window.gtag = moi; return true;
  }
  if (!boc()) { var lan = 0, hen = setInterval(function () { if (boc() || ++lan > 40) clearInterval(hen); }, 250); }
})();
