(function() {
var PIXEL = "1640492557473756";
if (/[?&#](email|e|ma|otp|token|k|vao)=/i.test(location.search + location.hash)) return;
try {
var q = new URLSearchParams(location.search);
if (q.has("notrack")) localStorage.setItem("hn_notrack", "1"); else if (q.has("track")) localStorage.removeItem("hn_notrack");
if (q.has("notrack") || localStorage.getItem("hn_notrack") === "1") return;
} catch (e) {
if (/[?&]notrack/.test(location.search)) return;
}
!function(f, b, e, v, n, t, s) {
if (f.fbq) return;
n = f.fbq = function() {
n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
};
if (!f._fbq) f._fbq = n;
n.push = n;
n.loaded = !0;
n.version = "2.0";
n.queue = [];
t = b.createElement(e);
t.async = !0;
t.src = v;
s = b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t, s);
}(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
fbq("init", PIXEL);
fbq("track", "PageView");
var trang = location.pathname.replace(/\/+$/, "") || "/";
if (/^\/qua\//.test(trang)) fbq("track", "ViewContent", {
content_name: "qua " + trang.split("/")[2],
content_category: "lead_magnet"
});
var daBan = false;
function boc() {
var g = window.gtag;
if (!g || g.__fbBoc) return !!g;
var moi = function() {
try {
if (arguments[0] === "event" && arguments[1] === "sign_up" && !daBan) {
daBan = true;
fbq("track", "Lead", {
content_name: trang
});
}
} catch (e) {}
return g.apply(this, arguments);
};
moi.__fbBoc = true;
window.gtag = moi;
return true;
}
if (!boc()) {
var lan = 0, hen = setInterval((function() {
if (boc() || ++lan > 40) clearInterval(hen);
}), 250);
}
})();