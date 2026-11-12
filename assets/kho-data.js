/* ============================================================================
   DANH SÁCH TÀI LIỆU — NGUỒN DUY NHẤT, DÙNG CHUNG CHO CẢ 2 TRANG
   ---------------------------------------------------------------------------
   Dùng bởi:  /tai-lieu.html  (cửa vào: bấm "Tải ngay" -> hiện form tên+email)
              /kho.html       (người đã điền: bấm là tải, không hỏi lại)

   ⚠️ THÊM FILE MỚI = THÊM 1 KHỐI TRONG `FILES` Ở ĐÂY, KHÔNG ĐỤNG TRANG NÀO KHÁC.
   ⚠️ MỌI TÀI LIỆU SHARE PHẢI CÓ KHUNG GIỚI THIỆU APP + LINK SALE PAGE (anh lệnh 02/11/2026): PDF dùng
      production/magnet/khung_app.py · Excel dùng scripts/gan_khung_app_xlsx.py · MP3 dùng trường `app` dưới đây.
   Tách ra file này ngày 11/09/2026, khi trang /tai-lieu đổi sang kiểu "bấm Tải
   ngay rồi mới hiện form" — nếu để danh sách nằm trong cả 2 trang thì sớm muộn
   hai bên lệch nhau, và người ta sẽ thấy ở cửa một kho, vào trong lại một kho khác.
   ========================================================================== */

/* Ba NHÓM của kho. Thứ tự ở đây là thứ tự hiện trên trang. */
var NHOM = [
  // 21/10/2026 anh lệnh: bộ 70 câu Phó ba – Phó hai lên ĐẦU kho (comment "tài liệu" lấy file 3/O–2/O được Botcake gửi link kho)
  { key:"pv-sq", noibat:true,
    nhan: { vi:"Phó ba & Phó hai", en:"Third & Second Officer" },
    ten:  { vi:"70 câu phỏng vấn sĩ quan boong", en:"The Deck Officer Interview — 70 questions" },
    mota: { vi:"Bộ câu hỏi phỏng vấn Phó ba – Phó hai kèm câu trả lời mẫu. PDF song ngữ Anh–Việt, đọc ngay trên điện thoại.",
            en:"Third and Second Officer interview questions with sample answers. Bilingual English–Vietnamese PDF, readable on your phone." } },
  // noibat:true -> khung vàng + nhãn riêng, đứng ĐẦU trang (anh chốt 15/09: cadet có phần riêng
  // ở đầu trang tài liệu, vì 10 video list cadet đổ người về đây).
  { key:"cadet", noibat:true,
    nhan: { vi:"Cadet & sinh viên sắp ra trường", en:"Cadets & final-year students" },
    ten:  { vi:"Date đầu và buổi phỏng vấn đầu tiên", en:"Your first contract and your first interview" },
    mota: { vi:"Ba tài liệu cho người sắp đi date đầu: cần làm gì từ lúc rời nhà tới ngày rời tàu, phỏng vấn cadet hỏi gì, và bộ đồ nghề trên tàu. PDF song ngữ Anh–Việt, đọc ngay trên điện thoại.",
            en:"Three guides for your first contract: what to do from leaving home to signing off, what a cadet interview asks, and the kit for life on board. Bilingual English–Vietnamese PDFs, readable on your phone." } },
  { key:"doc",
    ten:  { vi:"Cẩm nang để đọc",  en:"Guides to read" },
    mota: { vi:"PDF song ngữ Anh–Việt. Đọc trên điện thoại được, in ra mang lên tàu cũng được.",
            en:"Bilingual English–Vietnamese PDFs. Read them on your phone, or print them and take them on board." } },
  { key:"dung",
    ten:  { vi:"Bảng tính để dùng việc", en:"Spreadsheets to work with" },
    mota: { vi:"File Excel mình dựng để tự dùng trên tàu — điền số của bạn vào là ra kết quả.",
            en:"Excel files I built for my own work at sea — put your own numbers in and read the answer." } },
  { key:"nghe",
    ten:  { vi:"Ghi âm để nghe", en:"Recordings to listen to" },
    mota: { vi:"File ghi âm buổi phỏng vấn, không dàn dựng. Bấm Nghe ngay là phát luôn trong trình duyệt.",
            en:"Interview recordings, nothing staged. Hit Listen now and it plays right in the browser." } },
  { key:"moi",
    ten:  { vi:"Mới thêm vào kho", en:"Recently added" },
    mota: { vi:"File vừa bỏ vào folder, mình chưa kịp viết mô tả.",
            en:"Just dropped into the folder; I haven't written the description yet." } },
];

/* DANH SÁCH FILE — "id" là phần XXXXX trong drive.google.com/file/d/XXXXX/view.
   pdf:true -> thêm nút "Đọc trước" mở thẳng trong trình duyệt, khỏi tải về mới biết là gì. */
var FILES = [
  // (26/10/2026 anh lệnh gỡ "Sổ tay vấn đáp C/O" 94 câu khỏi kho, chỉ giữ bản 118 câu; file /files/so-tay-van-dap-dai-pho.pdf + /doc/?f=so-tay-van-dap-dai-pho vẫn để nguyên cho link cũ)
  // (01/11/2026 anh lệnh chuyển "Sổ tay nghiệp vụ Đại phó" 18 trang vào app, trang Phỏng vấn của C/O, gỡ khỏi kho, xoá luôn file trên web và cắt link Drive; bản gốc giữ ở production/hoc-dai-pho, bản app ở app-mau/tai-lieu-pv)

  // --- PV Đại phó tàu hàng rời — 118 câu song ngữ (19/10 thêm 115-118 từ training), dựng 07-08/10/2026 (production/hoc-dai-pho/pv-co-hpm-114-cau/cong-khai), máy upload 08/10 ---
  { nhom:"doc", pdf:true, ico:"&#127894;",
    name: { vi: "118 câu phỏng vấn Đại phó tàu hàng rời, kèm câu trả lời",
            en: "The Chief Officer Interview — 118 questions, bulk carriers" },
    meta: { vi: "Bộ câu hỏi phỏng vấn Đại phó của một hãng tàu hàng rời, mình soạn câu trả lời mẫu khi chuẩn bị đi phỏng vấn · 4 phần: bản thân & kinh nghiệm · nghiệp vụ Đại phó (hàng hoá IMSBC, than, quặng, hạt, nắp hầm, neo – buộc tàu, PSC, ISM/ISPS, ballast, MARPOL) · câu Phó hai/Phó ba (ECDIS, GMDSS, COLREG) · phần bổ sung sau buổi training Đại phó (khiếu nại, port of refuge, cuộn thép, hậu quả cargo care) · mỗi câu: trả lời mẫu Anh | Việt đặt cạnh nhau, câu hỏi thêm hay gặp, người phỏng vấn đang thử cái gì · 20 câu nên học trước · mục lục bấm nhảy thẳng",
            en: "A Chief Officer interview questionnaire from a bulk carrier company, with the sample answers I prepared for my own interview · 4 parts: about you · C/O duties (IMSBC cargoes, coal, ore, grain, hatch covers, anchoring & mooring, PSC, ISM/ISPS, ballast, MARPOL) · 2/O & 3/O questions (ECDIS, GMDSS, COLREG) · extra questions from a C/O training session (complaints, port of refuge, steel coils, poor cargo care) · each one: English | Vietnamese answers side by side, the usual follow-ups, and what the interviewer is testing · 20 to learn first · clickable table of contents" },
    tag:  { vi: "PDF · 123 trang · Anh–Việt", en: "PDF · 123 pages · EN–VI" },
    web: "118-cau-dai-pho",   // trang đọc lật sách /doc/?f=118-cau-dai-pho + file /files/118-cau-dai-pho.pdf (19/10: đổi từ 114; link cũ ?f=114-cau-dai-pho vẫn mở nhờ doc/index.html)
    id: "1VEoUnZLpyp1_H8f-bUtnfBWLwy3lW8cI" },

  // --- Phần CADET (15/09/2026) — PDF dựng ở production/magnet/, anh upload Drive rồi dán ID ---
  // Còn "PASTE_" ở đầu id thì trang tự ẩn món đó, không lộ nút chết.
  { nhom:"cadet", pdf:true, ico:"&#129517;",
    name: { vi: "Date đầu — cần làm gì, từ lúc rời nhà tới ngày rời tàu",
            en: "Your First Contract — what to do, from leaving home to signing off" },
    meta: { vi: "Lo gì trước khi rời nhà · tuần đầu trên tàu · tự xẻ giờ học từ tháng đầu · những ngày thấy mình vô dụng · nhớ nhà · tháng cuối gom gì để mang vào buổi phỏng vấn lên sĩ quan",
            en: "Before you leave home · the first week on board · making study time from month one · the days you feel useless · missing home · what to collect in the last month for your officer interview" },
    tag:  { vi: "PDF · 5 trang · Anh–Việt", en: "PDF · 5 pages · EN–VI" },
    web: "date-dau",   // trang đọc lật sách /doc/?f=date-dau + file /files/date-dau.pdf (13/10/2026)
    id: "1Lu5oxuje6gZ964jJrARz4V9QOhmtVHfg" },

  // --- 12/11/2026 anh lệnh: tiếng Anh đi nhận tàu (production/magnet/joining-ship.html). Trang quà riêng /qua/di-nhan-tau/ ---
  { nhom:"doc", pdf:true, ico:"&#9992;&#65039;",
    name: { vi: "Tiếng Anh đi nhận tàu — từ sân bay tới cầu thang mạn",
            en: "Joining Your Ship — English from the airport to the gangway" },
    meta: { vi: "Làm thủ tục và nhập cảnh với vé một chiều + thư bảo lãnh · trên máy bay và lúc nối chuyến · gặp đại lý · không gặp được đại lý thì gọi ai, nói gì, đứng đâu chờ (kể cả khi không SIM, không mạng, hết pin) · lên tàu: cầu thang mạn, sĩ quan trực, thuyền trưởng, ký sign-on, nhận bàn giao",
            en: "Check-in and immigration on a one-way ticket with a Letter of Guarantee · the flight and your connection · meeting the agent · when nobody meets you: who to call, what to say, where to wait (even with no SIM, no internet or a dead phone) · joining: gangway, duty officer, the Master, signing on, handover" },
    tag:  { vi: "PDF · Anh–Việt", en: "PDF · EN–VI" },
    web: "di-nhan-tau",   // trang đọc /doc/?f=di-nhan-tau + file /files/di-nhan-tau.pdf; id PASTE_ = ẨN khỏi kho tới khi anh duyệt (trang đọc /doc vẫn mở theo web); anh duyệt thì bỏ chữ PASTE_
    id: "PASTE_web-di-nhan-tau" },

  { nhom:"cadet", pdf:true, ico:"&#127919;",
    name: { vi: "Phỏng vấn cadet — COLREG, MARPOL Phụ lục V & VI, thái độ",
            en: "The Cadet Interview — COLREG, MARPOL Annex V & VI, attitude" },
    meta: { vi: "20 câu hay gặp kèm câu trả lời mẫu · 5 tình huống tránh va có hình vẽ · rác và khí thải theo MARPOL · nhóm câu thái độ quyết định đậu hay trượt · mọi điều luật đã đối chiếu văn bản IMO",
            en: "20 common questions with model answers · 5 collision situations with diagrams · garbage and air pollution under MARPOL · the attitude questions that decide it · every rule checked against IMO texts" },
    tag:  { vi: "PDF · 12 trang · Anh–Việt", en: "PDF · 12 pages · EN–VI" },
    web: "phong-van-cadet",   // trang đọc lật sách /doc/?f=phong-van-cadet + file /files/phong-van-cadet.pdf (13/10/2026)
    id: "1IExpeaoooGkb0Mw88TLzVEFG96-sy3SM" },

  // --- Cẩm nang (PDF) — 2 tờ đi kèm 2 video, anh upload 11/09/2026 ---
  { nhom:"cadet", pdf:true, ico:"&#128213;",
    name: { vi: "Bộ đồ nghề cho cadet",
            en: "The Cadet Kit" },
    meta: { vi: "Tờ đi kèm video một ngày làm việc của cadet · kiểm gì trước khi ký hợp đồng · một ngày trên tàu ra sao · cái sai làm mình mất trắng một năm",
            en: "Companion sheet to the video on a cadet's day on board · what to check before you sign · what a day on board looks like · the mistake that cost me a year" },
    tag:  { vi: "PDF · 4 trang · Anh–Việt", en: "PDF · 4 pages · EN–VI" },
    web: "do-nghe-cadet",   // trang đọc lật sách /doc/?f=do-nghe-cadet + file /files/do-nghe-cadet.pdf (13/10/2026)
    id: "14UibAoJkq9dE_dqaqGjuI5X4DJwQQicD" },

  { nhom:"pv-sq", pdf:true, ico:"&#128214;",
    name: { vi: "70 câu phỏng vấn sĩ quan boong — Phó ba & Phó hai, kèm câu trả lời",
            en: "The Deck Officer Interview — 70 questions, 3/O & 2/O" },
    meta: { vi: "Phần 1: 20 câu mình đã gặp trên đường lên ghế Phó ba · Phần 2: 50 câu cho ghế Phó hai, 18 câu trong đó người ta hỏi chính mình ở buổi phỏng vấn Phó hai năm 2022 · mỗi câu có: người phỏng vấn đang thử cái gì và một câu trả lời mẫu hoàn chỉnh để học thuộc",
            en: "Part 1: the twenty questions I was asked on the way to the Third Officer chair · Part 2: fifty for the Second Officer chair, eighteen of them asked in my own 2/O interview in 2022 · for each one: what the interviewer is testing and a full sample answer to learn by heart" },
    tag:  { vi: "PDF · 81 trang · Anh–Việt", en: "PDF · 81 pages · EN–VI" },
    ma: "70-cau",   // link tặng quà /t/70-cau/ -> /tai-lieu.html?chi=70-cau (chỉ hiện món này, vẫn hỏi email)
    web: "70-cau",   // trang đọc lật sách /doc/?f=70-cau + file /files/70-cau.pdf (13/10/2026)
    id: "1MlOEUHtvcX6YJNDK7vlJMDin4xJEKr89" },

  // --- Bản vẽ GA tàu hàng rời 76.000 DWT — 10/10/2026. Bản GỐC là bản vẽ nhà máy có tên tàu + IMO + ô bảo mật:
  //     ĐÃ CHE bằng scripts/che_ban_ve_ga.py (xoá tên tàu, IMO, logo ống khói, ô tên + chữ chìm nhà máy). Cấm đăng bản gốc.
  { nhom:"doc", pdf:true, ico:"&#128208;",
    name: { vi: "Bản vẽ bố trí chung (GA) tàu hàng rời 76.000 DWT",
            en: "General Arrangement plan — 76,000 DWT bulk carrier" },
    meta: { vi: "Bản vẽ General Arrangement của một tàu hàng rời 7 hầm, dài 225 m, rộng 32,24 m · đủ mặt cắt dọc, boong chính, tank top, mặt cắt giữa tàu, khu ở từ boong 2 lên buồng lái · ôn thi phần kết cấu, két ballast, bố trí hầm hàng thì mở cái này ra đối chiếu, phóng to xem từng chi tiết",
            en: "The GA plan of a seven-hold bulk carrier, 225 m long, 32.24 m beam · profile, upper deck, tank top, midship section, and the accommodation from 2nd deck up to the bridge · open it next to your notes when you study hull structure, ballast tanks and hold layout, and zoom in on any detail" },
    tag:  { vi: "PDF · 1 tờ khổ lớn · tiếng Anh", en: "PDF · 1 large sheet · English" },
    ma: "ban-ve-ga",   // link kéo lead /t/ban-ve-ga/ -> /tai-lieu.html?chi=ban-ve-ga (chỉ hiện món này, bắt tên + email)
    web: "ban-ve-ga",   // trang đọc lật sách /doc/?f=ban-ve-ga + file /files/ban-ve-ga.pdf (13/10/2026)
    id: "1Z_OVMtpr1Y_3r9kYTxyS3Mc71QRrX1Qa" },

  // --- PV thuỷ thủ AB boong — 43 câu, dựng 06/10/2026 (production/magnet/ab-interview.pdf), anh thả Drive tay ---
  { nhom:"doc", pdf:true, ico:"&#9875;",
    name: { vi: "43 câu phỏng vấn thuỷ thủ AB boong, kèm câu trả lời",
            en: "The AB Interview — 43 questions for Able Seamen" },
    meta: { vi: "Câu phòng crewing và sĩ quan hay hỏi AB · trực ca, cảnh giới, khẩu lệnh lái, làm dây – thả neo, cầu thang, thang hoa tiêu, không gian kín, drill · mỗi câu có: người phỏng vấn đang thử cái gì và một câu trả lời mẫu ngắn để học thuộc · kèm bảng khẩu lệnh lái theo IMO SMCP",
            en: "What crewing offices and officers ask an AB · watchkeeping, lookout, steering orders, mooring and anchoring, gangway, pilot ladder, enclosed spaces, drills · for each one: what the interviewer is testing and a short sample answer to learn by heart · with the IMO SMCP steering orders table" },
    tag:  { vi: "PDF · 46 trang · Anh–Việt", en: "PDF · 46 pages · EN–VI" },
    web: "ab-43-cau",   // trang đọc lật sách /doc/?f=ab-43-cau + file /files/ab-43-cau.pdf (13/10/2026)
    id: "1COZpuXfh086B2yjldq5BqphZM5tyS1wu" },

  // --- PV Bosun — 39 câu, dựng 06/10/2026 (production/magnet/bosun-interview.pdf), máy tự upload (drive_tai_len.py) ---
  { nhom:"doc", pdf:true, ico:"&#129693;",
    name: { vi: "39 câu phỏng vấn Bosun (thuỷ thủ trưởng), kèm câu trả lời",
            en: "The Bosun Interview — 39 questions" },
    meta: { vi: "Câu phòng crewing và sĩ quan hay hỏi Bosun · lên kế hoạch việc và dẫn đội, giờ làm – giờ nghỉ, bảo dưỡng dây cáp và nắp hầm, chuẩn bị hầm hàng, làm dây – thả neo, ghế Bosun, không gian kín, việc nóng, thời tiết xấu · mỗi câu có: người phỏng vấn đang thử cái gì và một câu trả lời mẫu ngắn để học thuộc",
            en: "What crewing offices and officers ask a Bosun · planning the work and leading the team, hours of work and rest, ropes, wires and hatch covers, hold preparation, mooring and anchoring, the bosun's chair, enclosed spaces, hot work, heavy weather · for each one: what the interviewer is testing and a short sample answer to learn by heart" },
    tag:  { vi: "PDF · 41 trang · Anh–Việt", en: "PDF · 41 pages · EN–VI" },
    web: "bosun-39-cau",   // trang đọc lật sách /doc/?f=bosun-39-cau + file /files/bosun-39-cau.pdf (13/10/2026)
    id: "1vtY_V9edO6HyRt-A_5ORjuMKy4Xv-Qj0" },

  // --- Ghi âm phỏng vấn 2/O Zodiac (MP3) — anh upload 14/09/2026. nghe:true -> nút "Nghe ngay" ---
  { nhom:"nghe", nghe:true, ico:"&#127911;",
    name: { vi: "Buổi phỏng vấn Phó hai của mình — Zodiac, 2022",
            en: "My Second Officer interview — Zodiac, 2022" },
    meta: { vi: "Bản ghi âm buổi phỏng vấn chức danh Phó hai (2/O) của mình với công ty Zodiac năm 2022 — sau buổi này mình nhận chức danh 2/O. Nghe để biết một buổi phỏng vấn sĩ quan diễn ra thế nào: người ta hỏi gì, hỏi tới đâu, và ứng viên trả lời ra sao khi không có kịch bản.",
            en: "The recording of my Second Officer (2/O) interview with Zodiac in 2022 — the interview that got me the rank. Listen to how an officer interview goes: what they ask, how far they push, and how a candidate answers with no script." },
    tag:  { vi: "MP3 · ghi âm buổi phỏng vấn · 2022", en: "MP3 · interview recording · 2022" },
    // MP3 không chứa được link bấm nên khung app nằm trên thẻ, chỉ hiện bản tiếng Việt như khung PDF (sale page chỉ có tiếng Việt)
    app: { chu: "Muốn tự tập trả lời thành tiếng như buổi này? Mình làm app SpeakAtSea để anh em đi tàu luyện nói tiếng Anh, cả phỏng vấn lẫn giao tiếp trên tàu.",
           nut: "Xem 1 bài học mẫu →",
           url: "https://app.hieunguyen.net/gioi-thieu?nguon=web-kho-mp3&utm_source=web&utm_medium=kho&utm_campaign=ghi-am-pv-2o&utm_content=the#b02" },
    id: "1cLgcCPRrejNBe7jQ7E4YRc7pN-fZ3joi" },

  // --- Bảng tính (Excel) ---
  { nhom:"dung", ico:"&#128202;",
    name: { vi: "Bảng tính Max Cargo Intake",
            en: "Max Cargo Intake sheet" },
    meta: { vi: "Từ mớn nước cho phép ra số hàng xếp được (Displacement → DWT → cargo)",
            en: "From your draft restriction to the tonnage you can load (displacement → DWT → cargo)" },
    tag:  { vi: "Excel", en: "Excel" },
    id: "1qK99mCCmupqC3vV3AtPL2dvpYkldbAuz" },

  { nhom:"dung", ico:"&#128202;",
    name: { vi: "Bảng nội suy tra bảng hàng hải",
            en: "Interpolation sheet for nautical tables" },
    meta: { vi: "Nội suy tuyến tính · parabol 3 điểm · nội suy kép 2 chiều",
            en: "Linear · three-point parabolic · two-way double interpolation" },
    tag:  { vi: "Excel", en: "Excel" },
    id: "16TuOT63vz1IhfbTQChXJbyH_Z_5LvkGf" },

  // Bảng tính thời gian nghỉ hưu (tên cũ Tự do tài chính, anh đổi 01/11) — trước 24/08 là magnet RIÊNG của trang chủ.
  // Gom về kho để cả site chỉ còn MỘT lời hứa (anh chốt 24/08).
  { nhom:"dung", ico:"&#128202;",
    name: { vi: "Bảng tính thời gian nghỉ hưu",
            en: "The Retirement Timeline spreadsheet" },
    meta: { vi: "4 hướng đi sự nghiệp tính theo từng tháng · sửa số của bạn vào là ra tuổi nghỉ hưu",
            en: "Four career paths month by month · put your own numbers in for your retirement age" },
    tag:  { vi: "Excel", en: "Excel" },
    id: "11KItVWjahcbs0FteisbSqYZj4mgYj4Gu" },
];
