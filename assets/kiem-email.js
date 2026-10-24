/* KIỂM EMAIL TRƯỚC KHI GỬI KIT — dùng chung mọi form thu email trên hieunguyen.net (anh duyệt 24/10/2026).
   Vụ: Kit nhận lead "daogiap@1221988.com" (gõ nhầm, đúng ra daogiap1221988@gmail.com) vì form chỉ kiểm dạng email.
   Cách chạy: bắt sự kiện submit ở pha capture trên document (trước code riêng của từng trang). Email chưa kiểm thì dừng lại, kiểm xong:
     - đuôi gõ nhầm (gmial.com…) hoặc phần sau @ toàn số (1221988.com) -> chặn + gợi ý, có nút sửa nhanh
     - tra MX (rồi A) qua DNS công khai dns.google, dự phòng cloudflare-dns.com: không có cả hai -> chặn
     - DNS lỗi / quá 3 giây (mạng tàu) -> CHO QUA, không chặn khách thật
   Hợp lệ -> gửi lại form (requestSubmit) để code cũ của trang chạy như bình thường.
   GA4: form_loi_email, form_location = "loi_email:<goi_y|goi_y_so|khong_mx>:<trang>" — đọc trong scripts/soi_tuan.py. */
(function () {
  var DUOI_NHAM = {'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmaill.com': 'gmail.com', 'gmali.com': 'gmail.com',
    'gnail.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gmil.com': 'gmail.com', 'gimail.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmail.con': 'gmail.com',
    'gmail.cm': 'gmail.com', 'gmail.om': 'gmail.com', 'gmail.vn': 'gmail.com', 'gmaii.com': 'gmail.com', 'gmeil.com': 'gmail.com', 'gmail.comm': 'gmail.com',
    'yahoo.con': 'yahoo.com', 'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com', 'yahoo.co': 'yahoo.com',
    'hotmial.com': 'hotmail.com', 'hotmai.com': 'hotmail.com', 'hotmail.con': 'hotmail.com', 'hotmail.co': 'hotmail.com',
    'outlok.com': 'outlook.com', 'outlook.con': 'outlook.com', 'outloo.com': 'outlook.com', 'icloud.con': 'icloud.com', 'iclod.com': 'icloud.com'};
  var QUEN = /^(gmail|yahoo|hotmail|outlook|icloud|live|msn|aol|proton|protonmail|yandex|mail|gmx|zoho)\.[a-z.]+$|\.edu(\.[a-z]+)?$/;
  var CHU = {
    vi: {sai: 'Email này có vẻ chưa đúng, bạn kiểm tra lại giúp nhé.', goi: 'Có phải bạn định gõ ', sua: 'Sửa thành '},
    en: {sai: "This email doesn't look right. Please check it again.", goi: 'Did you mean ', sua: 'Change to '},
    fil: {sai: 'Mukhang mali ang email na ito. Pakisuri ulit.', goi: 'Ito ba ang ibig mong sabihin: ', sua: 'Palitan ng '},
    id: {sai: 'Email ini sepertinya belum benar. Coba cek lagi ya.', goi: 'Maksud kamu ', sua: 'Ganti jadi '},
    my: {sai: 'ဤအီးမေးလ် မှားနေပုံရသည်။ ပြန်စစ်ပေးပါ။', goi: 'ဆိုလိုတာ ဒါလား: ', sua: 'ဤသို့ပြင်ရန် '}
  };
  function lg() { var l = (document.documentElement.getAttribute('data-lang') || document.documentElement.lang || 'vi').slice(0, 3).toLowerCase(); return CHU[l] ? l : (CHU[l.slice(0, 2)] ? l.slice(0, 2) : 'en'); }
  function ga(ly) { try { if (window.gtag) gtag('event', 'form_loi_email', {ly_do: ly, form_location: 'loi_email:' + ly + ':' + location.pathname}); } catch (e) {} }   // lý do đọc ở form_location (tham số đã đăng ký)
  var nho = {};
  function hoi(url, ms) {
    return new Promise(function (ok, hong) {
      var t = setTimeout(function () { hong(new Error('cham')); }, ms);
      fetch(url, {headers: {'Accept': 'application/dns-json'}}).then(function (r) { return r.json(); }).then(function (j) { clearTimeout(t); ok(j); }, function (e) { clearTimeout(t); hong(e); });
    });
  }
  function coBanGhi(mien, kieu, ms) {
    var q = 'name=' + encodeURIComponent(mien) + '&type=' + kieu;
    return hoi('https://dns.google/resolve?' + q, ms).catch(function () { return hoi('https://cloudflare-dns.com/dns-query?' + q, ms); })
      .then(function (j) { return j.Status === 3 ? false : !!(j.Answer && j.Answer.length); });
  }
  // true = có thể nhận thư · false = chắc chắn không · null = không tra được (cho qua)
  function mienNhanThu(mien) {
    if (mien in nho) return Promise.resolve(nho[mien]);
    var bat = Date.now();
    var chay = coBanGhi(mien, 'MX', 2800).then(function (mx) {
      if (mx) return true;
      var con = Math.max(300, 3000 - (Date.now() - bat));
      return coBanGhi(mien, 'A', con);
    });
    var han = new Promise(function (ok) { setTimeout(function () { ok(null); }, 3000); });
    return Promise.race([chay, han]).catch(function () { return null; }).then(function (v) { if (v !== null) nho[mien] = v; return v; });
  }
  function goiY(email) {
    var m = /^([^@\s]+)@([^@\s]+)$/.exec(String(email || '').trim().toLowerCase());
    if (!m) return null;
    if (DUOI_NHAM[m[2]]) return {email: m[1] + '@' + DUOI_NHAM[m[2]], ly: 'goi_y'};
    var nhan = m[2].split('.')[0];
    if (/^\d{4,}$/.test(nhan)) return {email: m[1] + nhan + '@gmail.com', ly: 'goi_y_so'};
    return null;
  }
  function hop(o) {
    var p = o.form.querySelector('.kiem-email');
    if (!p) { p = document.createElement('p'); p.className = 'kiem-email'; p.style.cssText = 'color:#ff9a9a;font-size:14px;margin:-4px 0 12px;line-height:1.45'; o.insertAdjacentElement('afterend', p); }
    return p;
  }
  function an(o) { var p = o.form && o.form.querySelector('.kiem-email'); if (p) p.remove(); }
  function bao(o, msg, sua) {
    var p = hop(o), c = CHU[lg()];
    p.textContent = msg;
    if (sua) {
      var b = document.createElement('button'); b.type = 'button';
      b.style.cssText = 'display:inline-block;margin:6px 0 0;border:1px solid currentColor;background:none;color:inherit;border-radius:8px;padding:5px 10px;font:inherit;font-weight:700;cursor:pointer';
      b.textContent = c.sua + sua;
      b.onclick = function () { o.value = sua; an(o); o.focus(); };
      p.appendChild(document.createElement('br')); p.appendChild(b);
    }
    o.focus();
  }
  document.addEventListener('submit', function (ev) {
    var f = ev.target, o = f && f.querySelector && f.querySelector('input[type=email], input[name=email], input[name=email_address]');
    if (!o) return;
    var v = String(o.value || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return;          // sai dạng: để code cũ của trang báo
    if (f.dataset.emailDaKiem === v) return;                         // đã kiểm xong email này -> cho code cũ chạy
    ev.preventDefault(); ev.stopImmediatePropagation();
    var c = CHU[lg()], g = goiY(v);
    if (g) { ga(g.ly); bao(o, c.goi + g.email + '?', g.email); return; }
    var mien = v.split('@')[1].toLowerCase();
    var tra = QUEN.test(mien) ? Promise.resolve(true) : mienNhanThu(mien);
    tra.then(function (ok) {
      if (ok === false) { ga('khong_mx'); bao(o, c.sai); return; }
      an(o); f.dataset.emailDaKiem = v;
      // 24/10 SỬA LỖI: đuôi quen (gmail…) xong NGAY trong lượt submit đầu -> trình duyệt bỏ qua requestSubmit gọi lúc form
      // còn đang "bắn sự kiện submit" (luật HTML) -> khách bấm mà không có gì xảy ra. Đẩy sang lượt sau cho chắc.
      setTimeout(function () { if (f.requestSubmit) f.requestSubmit(); else f.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true})); }, 0);
    });
  }, true);
  document.addEventListener('input', function (ev) { if (ev.target && ev.target.form && ev.target.matches('input[type=email], input[name=email], input[name=email_address]')) { an(ev.target); delete ev.target.form.dataset.emailDaKiem; } }, true);
  window.kiemEmail = {goiY: goiY, mienNhanThu: mienNhanThu};
})();
