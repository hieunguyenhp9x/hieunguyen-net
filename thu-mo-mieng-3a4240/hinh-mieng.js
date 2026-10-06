// Vẽ hình khẩu hình cho thư viện âm (không dùng ảnh — nhẹ, offline, đổi màu theo nền sáng/tối).
// hinhNghieng(a): mặt cắt nghiêng, mặt quay sang TRÁI — thấy lưỡi, răng, vòm, môi, luồng hơi, dây thanh.
// hinhTruoc(a):  môi nhìn thẳng — như khi soi gương.
// a = {luoi, moi, ham (0..1), rung, hoi}
(function(){
  const LUOI = {        // điểm lưỡi (khi hàm gần khép): gốc sau K, lưng D, mặt trước B, đầu T
    'nghi':           {K: [144, 96],  D: [112, 72], B: [78, 84],  T: [52, 96]},
    'rang':           {K: [144, 98],  D: [110, 74], B: [66, 84],  T: [40, 87]},
    'loi':            {K: [144, 96],  D: [110, 70], B: [72, 72],  T: [56, 63]},
    'loi-gan':        {K: [144, 96],  D: [110, 70], B: [70, 72],  T: [55, 68]},
    'sau-loi':        {K: [144, 96],  D: [108, 64], B: [76, 61],  T: [58, 78]},
    'cong':           {K: [144, 98],  D: [112, 76], B: [80, 78],  T: [66, 63]},
    'goc':            {K: [146, 94],  D: [128, 54], B: [84, 86],  T: [52, 98]},
    'cao-truoc':      {K: [146, 98],  D: [104, 58], B: [76, 60],  T: [51, 92]},
    'cao-truoc-long': {K: [146, 99],  D: [106, 63], B: [78, 66],  T: [51, 94]},
    'giua-truoc':     {K: [146, 100], D: [106, 70], B: [76, 74],  T: [51, 96]},
    'thap-truoc':     {K: [148, 104], D: [106, 84], B: [74, 90],  T: [50, 100]},
    'giua':           {K: [146, 100], D: [110, 72], B: [80, 80],  T: [52, 97]},
    'thap-sau':       {K: [150, 100], D: [118, 84], B: [80, 94],  T: [53, 102]},
    'giua-sau':       {K: [148, 96],  D: [126, 68], B: [84, 86],  T: [53, 100]},
    'cao-sau':        {K: [146, 94],  D: [128, 58], B: [86, 86],  T: [53, 100]},
  };
  // luồng hơi đi qua đâu (điểm hẹp nhất) để vẽ mũi tên
  const HEP = {'rang': [44, 86], 'loi': [56, 62], 'loi-gan': [55, 64], 'sau-loi': [74, 57], 'cong': [68, 58], 'goc': [128, 51]};

  const f = n => Math.round(n * 10) / 10;
  // đường cong mượt đi qua các điểm (Catmull-Rom -> Bezier)
  function muot(p){
    let d = `M${f(p[0][0])} ${f(p[0][1])}`;
    for (let i = 0; i < p.length - 1; i++){
      const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], e = p[i + 2] || c;
      d += ` C${f(b[0] + (c[0] - a[0]) / 6)} ${f(b[1] + (c[1] - a[1]) / 6)} ${f(c[0] - (e[0] - b[0]) / 6)} ${f(c[1] - (e[1] - b[1]) / 6)} ${f(c[0])} ${f(c[1])}`;
    }
    return d;
  }

  function hinhNghieng(a){
    const ham = Math.max(0, Math.min(1, a.ham || 0)), dy = ham * 18;      // hàm dưới hạ xuống
    const L = LUOI[a.luoi] || LUOI.nghi, keo = L === LUOI.nghi || /truoc|sau|giua/.test(a.luoi) ? 0.75 : 0.35;
    const P = k => [L[k][0], L[k][1] + dy * (k === 'K' ? 0.3 : keo)];
    const luoi = muot([[150, 150], [152, 126], P('K'), P('D'), P('B'), P('T')]) +
      ` C${f(P('T')[0] - 4)} ${f(P('T')[1] + 8)} 50 ${f(110 + dy)} 62 ${f(116 + dy)} C95 ${f(126 + dy)} 130 ${f(134 + dy * 0.5)} 150 150 Z`;
    // môi (nhìn nghiêng): x mép môi, độ chu, khe hở
    const m = a.moi;
    const chu = m === 'tron-chu' ? 7 : m === 'tron' ? 3 : m === 'be' ? -3 : 0;
    const x0 = 33 - chu;
    const moiTren = m === 'khep' ? 84 : m === 'rang-moi' ? 80 : (m === 'tron' || m === 'tron-chu') ? 81 : 81;
    let moiDuoiY = m === 'khep' ? 84 : m === 'rang-moi' ? 85 : (m === 'tron-chu' ? 86 : 87) + dy;
    if (m === 'tron' || m === 'tron-chu') moiDuoiY = Math.min(moiDuoiY, 89 + dy * 0.4);
    const xDuoi = m === 'rang-moi' ? 41 : x0;
    const S = [];
    // khoang mũi + vòm + yết hầu (cố định)
    S.push(`<path d="M30 30 C60 22 120 24 160 38" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width="1.5"/>`);
    S.push(`<path d="M50 66 C54 60 60 60 64 58 C80 48 104 46 120 48 C132 49 140 54 146 62 C150 68 152 74 150 80"
      fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`);
    S.push(`<path d="M168 52 L168 166" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`);
    // da mặt: trán-mũi-môi trên (cố định)
    S.push(`<path d="M44 8 C40 20 36 30 26 44 C22 50 24 54 32 56 C36 60 ${x0 + 2} 66 ${x0} 74 C${x0 - 1} 78 ${x0} ${moiTren} ${x0 + 6} ${moiTren}
      L46 ${moiTren}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`);
    // răng trên
    S.push(`<path d="M50 64 L49 70 C48 76 46 82 44 85 C42 86 41 84 42 80 L45 64 Z" fill="#fff" stroke="currentColor" stroke-width="1.4"/>`);
    // hàm dưới: răng dưới, môi dưới, cằm
    const rd = 88 + dy;
    S.push(`<path d="M46 ${f(rd + 20)} L47 ${f(rd + 8)} C47 ${f(rd + 3)} 46 ${f(rd)} 44 ${f(rd)} C42 ${f(rd)} 42 ${f(rd + 4)} 42 ${f(rd + 8)} L41 ${f(rd + 20)} Z"
      fill="#fff" stroke="currentColor" stroke-width="1.4"/>`);
    S.push(`<path d="M46 ${f(moiDuoiY)} L${xDuoi + 6} ${f(moiDuoiY)} C${xDuoi} ${f(moiDuoiY)} ${xDuoi - 2} ${f(moiDuoiY + 6)} ${xDuoi + 1} ${f(moiDuoiY + 11)}
      C${xDuoi + 4} ${f(moiDuoiY + 16)} 30 ${f(112 + dy)} 30 ${f(122 + dy)} C30 ${f(134 + dy)} 44 ${f(140 + dy)} 60 ${f(140 + dy)} L118 ${f(148 + dy * 0.4)}"
      fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`);
    // lưỡi
    S.push(`<path d="${luoi}" fill="#e98b8b" stroke="#b44f4f" stroke-width="1.6" stroke-linejoin="round"/>`);
    // dây thanh
    if (a.rung) S.push(`<path d="M180 128 l5 -4 l5 4 l5 -4 l5 4" fill="none" stroke="#c98a12" stroke-width="2"/><text x="174" y="142" font-size="10" fill="#c98a12">rung</text>`);
    else S.push(`<path d="M180 126 h20" stroke="currentColor" stroke-opacity=".4" stroke-width="2"/><text x="173" y="142" font-size="9.5" fill="currentColor" fill-opacity=".55">không rung</text>`);
    // luồng hơi
    const xRa = x0 - 4, yRa = (moiTren + moiDuoiY) / 2;
    const hep = HEP[a.luoi];
    const duong = hep ? `M160 132 C158 100 150 90 ${hep[0] + 18} ${hep[1] + 4} L${hep[0]} ${hep[1] + 2} L${xRa} ${f(yRa)}`
                      : `M160 132 C158 100 140 ${f(84 + dy * 0.4)} 100 ${f(84 + dy * 0.5)} L${xRa} ${f(yRa)}`;
    if (a.hoi === 'dung') {
      const c = hep || [57, 70];
      S.push(`<path d="M160 132 C158 100 150 90 ${c[0] + 18} ${c[1] + 6}" fill="none" stroke="#1e6fb8" stroke-width="1.8" stroke-dasharray="4 3"/>
        <path d="M${c[0] + 4} ${c[1] - 2} l8 12 M${c[0] + 12} ${c[1] - 2} l-8 12" stroke="#c0392b" stroke-width="2.4"/>`);
    } else if (m === 'khep') {                          // môi khép: hơi dồn sau môi rồi bật ra
      S.push(`<path d="M160 132 C158 100 140 84 100 84 L${x0 + 12} 84" fill="none" stroke="#1e6fb8" stroke-width="1.8" stroke-dasharray="4 3"/>`);
      S.push(`<path d="M${x0 - 4} 77 l-8 -4 M${x0 - 5} 84 h-10 M${x0 - 4} 91 l-8 4" stroke="#1e6fb8" stroke-width="2" stroke-linecap="round"/>`);
    } else {
      S.push(`<path d="${duong}" fill="none" stroke="#1e6fb8" stroke-width="1.8" stroke-dasharray="4 3" marker-end="url(#mt)"/>`);
      if (a.hoi === 'bat') S.push(`<path d="M${xRa - 6} ${f(yRa - 7)} l-8 -4 M${xRa - 7} ${f(yRa)} h-10 M${xRa - 6} ${f(yRa + 7)} l-8 4" stroke="#1e6fb8" stroke-width="2" stroke-linecap="round"/>`);
    }
    return `<svg viewBox="0 0 224 172" class="hinh-ng" role="img" aria-label="Mặt cắt miệng nhìn nghiêng"><defs><marker id="mt" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#1e6fb8"/></marker></defs>${S.join('')}</svg>`;
  }

  function hinhTruoc(a){
    const m = a.moi, ham = Math.max(0, Math.min(1, a.ham || 0));
    let rx = 30, ry = 4 + ham * 18, day = 9;              // nửa rộng, nửa cao khe miệng, độ dày môi
    if (m === 'be') { rx = 36; ry = Math.max(3, ry - 1); day = 7; }
    if (m === 'tron') { rx = 15; ry = Math.max(9, ry); day = 11; }
    if (m === 'tron-chu') { rx = 10; ry = 9; day = 13; }
    if (m === 'khep') { ry = 0; }
    if (m === 'mo-to') { rx = 27; }
    if (m === 'rang-moi') { ry = 3; }
    const cx = 70, cy = 46, S = [];
    // môi ngoài
    S.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx + day + 4}" ry="${ry + day + 2}" fill="#d9786f"/>`);
    if (m === 'khep') {
      S.push(`<path d="M${cx - rx - 8} ${cy} Q${cx} ${cy + 3} ${cx + rx + 8} ${cy}" stroke="#7a2a24" stroke-width="2.4" fill="none"/>`);
    } else {
      S.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${f(ry)}" fill="#3a1414"/>`);
      // răng trên lộ ra (trừ khi môi tròn nhỏ)
      const rTren = m === 'tron-chu' ? 0 : Math.min(ry, m === 'rang-moi' ? 7 : 6);
      if (rTren > 0) S.push(`<rect x="${cx - Math.min(rx, 26) + 3}" y="${f(cy - ry)}" width="${2 * Math.min(rx, 26) - 6}" height="${f(rTren + (m === 'rang-moi' ? 4 : 0))}" rx="2" fill="#fff"/>`);
      if (ry > 9 && m !== 'tron-chu') S.push(`<rect x="${cx - Math.min(rx, 24) + 4}" y="${f(cy + ry - 5)}" width="${2 * Math.min(rx, 24) - 8}" height="5" rx="2" fill="#eee"/>`);
      if (a.luoi === 'rang') S.push(`<ellipse cx="${cx}" cy="${cy + 1}" rx="${Math.min(rx - 6, 16)}" ry="4" fill="#e98b8b" stroke="#b44f4f"/>`);
      else if (ry > 8) S.push(`<ellipse cx="${cx}" cy="${f(cy + ry - 4)}" rx="${Math.min(rx - 4, 18)}" ry="5" fill="#e98b8b"/>`);
      if (m === 'rang-moi') S.push(`<path d="M${cx - rx - 6} ${cy + 3} Q${cx} ${cy + 9} ${cx + rx + 6} ${cy + 3}" stroke="#7a2a24" stroke-width="1.5" fill="none"/>`);
    }
    const nhan = {be: 'môi bè như cười', tron: 'môi tròn', 'tron-chu': 'môi tròn, chu ra trước', 'mo-to': 'mở miệng to', khep: 'hai môi khép', 'rang-moi': 'răng trên chạm môi dưới', 'luoi-giua': 'lưỡi giữa hai răng', 'tu-nhien': 'môi thả lỏng'}[m] || '';
    return `<svg viewBox="0 0 140 92" class="hinh-tr" role="img" aria-label="Môi nhìn thẳng: ${nhan}">${S.join('')}<text x="${cx}" y="88" font-size="10.5" text-anchor="middle" fill="currentColor">${nhan}</text></svg>`;
  }

  window.HinhMieng = {hinhNghieng, hinhTruoc};
})();
