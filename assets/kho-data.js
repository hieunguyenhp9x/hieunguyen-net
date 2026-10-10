/* ============================================================================
   DANH SÁCH TÀI LIỆU — NGUỒN DUY NHẤT, DÙNG CHUNG CHO CẢ 2 TRANG
   ---------------------------------------------------------------------------
   Dùng bởi:  /tai-lieu.html  (cửa vào: bấm "Tải ngay" -> hiện form tên+email)
              /kho.html       (người đã điền: bấm là tải, không hỏi lại)

   ⚠️ THÊM FILE MỚI = THÊM 1 KHỐI TRONG `FILES` Ở ĐÂY, KHÔNG ĐỤNG TRANG NÀO KHÁC.
   Tách ra file này ngày 11/09/2026, khi trang /tai-lieu đổi sang kiểu "bấm Tải
   ngay rồi mới hiện form" — nếu để danh sách nằm trong cả 2 trang thì sớm muộn
   hai bên lệch nhau, và người ta sẽ thấy ở cửa một kho, vào trong lại một kho khác.
   ========================================================================== */

/* Ba NHÓM của kho. Thứ tự ở đây là thứ tự hiện trên trang. */
var NHOM = [
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
    mota: { vi:"File âm thanh thật, không dàn dựng. Bấm Nghe ngay là phát luôn trong trình duyệt.",
            en:"Real audio, nothing staged. Hit Listen now and it plays right in the browser." } },
  { key:"moi",
    ten:  { vi:"Mới thêm vào kho", en:"Recently added" },
    mota: { vi:"File vừa bỏ vào folder, mình chưa kịp viết mô tả.",
            en:"Just dropped into the folder; I haven't written the description yet." } },
];

/* DANH SÁCH FILE — "id" là phần XXXXX trong drive.google.com/file/d/XXXXX/view.
   pdf:true -> thêm nút "Đọc trước" mở thẳng trong trình duyệt, khỏi tải về mới biết là gì. */
var FILES = [
  // --- Sổ tay vấn đáp C/O — 80 trang, dựng lại có QR 12/09/2026, anh upload cùng ngày ---
  { nhom:"doc", pdf:true, ico:"&#127891;",
    name: { vi: "Sổ tay vấn đáp chức danh Đại phó (C/O)",
            en: "Chief Officer Oral Exam Handbook" },
    meta: { vi: "Toàn bộ phần mình ôn vấn đáp C/O gom lại một chỗ · 12 mục, 94 câu: nhiệm vụ đại phó, ổn định – sức bền, draft survey, xếp hàng, chứng từ, ballast, COLREG, tránh bão · mỗi câu có câu giám khảo hay hỏi + cách trả lời + xử lý thực tế · có mục lục bấm nhảy thẳng",
            en: "My whole C/O oral-exam revision in one place · 12 topics, 94 Q&As: C/O duties, stability & strength, draft survey, stowage, documents, ballast, COLREG, storm avoidance · each item: the examiner's question + a model answer + what you actually do on board · clickable table of contents" },
    tag:  { vi: "PDF · 80 trang · Anh–Việt", en: "PDF · 80 pages · EN–VI" },
    id: "18VwwkYbCj38eRrBrXWN12n-ebesuIJyG" },

  // --- Sổ tay nghiệp vụ Đại phó — 18 trang, anh lệnh lên kho + tự kéo lên Drive 23/09/2026
  // (service account không tạo được file mới trong My Drive, chỉ ghi đè — file mới anh phải thả tay 1 lần).
  { nhom:"doc", pdf:true, ico:"&#128221;",
    name: { vi: "Sổ tay nghiệp vụ Đại phó — ghi chép lúc học",
            en: "Chief Officer Study Notes" },
    meta: { vi: "Ghi chép mình gom lại lúc học lớp Đại phó, xếp theo tình huống thật trên tàu · 7 phần: xử lý tình huống · chuẩn bị xếp hàng (IMSBC, than, hàng hạt, thép cuộn) · tính toán (max intake, trim, ổn định, draft survey) · chứng từ & hợp đồng (B/L, LOI, NOR, laycan) · boong (neo, dây, cẩu) · luật & giấy chứng nhận (MARPOL, BWM, ISPS, MLC, ISM) · bảng số giới hạn + lỗi hay nhầm khi tính · mục lục bấm nhảy thẳng",
            en: "Notes I compiled while studying for Chief Officer, arranged by real situations on board · 7 parts: handling situations · cargo preparation (IMSBC, coal, grain, steel coils) · calculations (max intake, trim, stability, draft survey) · documents & contracts (B/L, LOI, NOR, laycan) · deck (anchoring, mooring, cranes) · regulations & certificates (MARPOL, BWM, ISPS, MLC, ISM) · limit-figure tables + common calculation mistakes · clickable table of contents" },
    tag:  { vi: "PDF · 18 trang · Anh–Việt", en: "PDF · 18 pages · EN–VI" },
    id: "1VZtBdbPUJomomLRRKkleWyI0Gj2iZxAF" },

  // --- PV Đại phó tàu hàng rời — 114 câu song ngữ, dựng 07-08/10/2026 (production/hoc-dai-pho/pv-co-hpm-114-cau/cong-khai), máy upload 08/10 ---
  { nhom:"doc", pdf:true, ico:"&#127894;",
    name: { vi: "114 câu phỏng vấn Đại phó tàu hàng rời, kèm câu trả lời",
            en: "The Chief Officer Interview — 114 questions, bulk carriers" },
    meta: { vi: "Bộ câu hỏi phỏng vấn Đại phó thật của một hãng tàu hàng rời, mình soạn câu trả lời mẫu khi chuẩn bị đi phỏng vấn · 3 phần: bản thân & kinh nghiệm · nghiệp vụ Đại phó (hàng hoá IMSBC, than, quặng, hạt, nắp hầm, neo – buộc tàu, PSC, ISM/ISPS, ballast, MARPOL) · câu Phó hai/Phó ba (ECDIS, GMDSS, COLREG) · mỗi câu: trả lời mẫu Anh | Việt đặt cạnh nhau, câu hỏi thêm hay gặp, người phỏng vấn đang thử cái gì · 20 câu nên học trước · mục lục bấm nhảy thẳng",
            en: "A real Chief Officer interview questionnaire from a bulk carrier company, with the sample answers I prepared for my own interview · 3 parts: about you · C/O duties (IMSBC cargoes, coal, ore, grain, hatch covers, anchoring & mooring, PSC, ISM/ISPS, ballast, MARPOL) · 2/O & 3/O questions (ECDIS, GMDSS, COLREG) · each one: English | Vietnamese answers side by side, the usual follow-ups, and what the interviewer is testing · 20 to learn first · clickable table of contents" },
    tag:  { vi: "PDF · 116 trang · Anh–Việt", en: "PDF · 116 pages · EN–VI" },
    id: "1VEoUnZLpyp1_H8f-bUtnfBWLwy3lW8cI" },

  // --- Phần CADET (15/09/2026) — PDF dựng ở production/magnet/, anh upload Drive rồi dán ID ---
  // Còn "PASTE_" ở đầu id thì trang tự ẩn món đó, không lộ nút chết.
  { nhom:"cadet", pdf:true, ico:"&#129517;",
    name: { vi: "Date đầu — cần làm gì, từ lúc rời nhà tới ngày rời tàu",
            en: "Your First Contract — what to do, from leaving home to signing off" },
    meta: { vi: "Lo gì trước khi rời nhà · tuần đầu trên tàu · tự xẻ giờ học từ tháng đầu · những ngày thấy mình vô dụng · nhớ nhà · tháng cuối gom gì để mang vào buổi phỏng vấn lên sĩ quan",
            en: "Before you leave home · the first week on board · making study time from month one · the days you feel useless · missing home · what to collect in the last month for your officer interview" },
    tag:  { vi: "PDF · 5 trang · Anh–Việt", en: "PDF · 5 pages · EN–VI" },
    id: "1Lu5oxuje6gZ964jJrARz4V9QOhmtVHfg" },

  { nhom:"cadet", pdf:true, ico:"&#127919;",
    name: { vi: "Phỏng vấn cadet — COLREG, MARPOL Phụ lục V & VI, thái độ",
            en: "The Cadet Interview — COLREG, MARPOL Annex V & VI, attitude" },
    meta: { vi: "20 câu hay gặp kèm câu trả lời mẫu · 5 tình huống tránh va có hình vẽ · rác và khí thải theo MARPOL · nhóm câu thái độ quyết định đậu hay trượt · mọi điều luật đã đối chiếu văn bản IMO",
            en: "20 common questions with model answers · 5 collision situations with diagrams · garbage and air pollution under MARPOL · the attitude questions that decide it · every rule checked against IMO texts" },
    tag:  { vi: "PDF · 11 trang · Anh–Việt", en: "PDF · 11 pages · EN–VI" },
    id: "1IExpeaoooGkb0Mw88TLzVEFG96-sy3SM" },

  // --- Cẩm nang (PDF) — 2 tờ đi kèm 2 video, anh upload 11/09/2026 ---
  { nhom:"cadet", pdf:true, ico:"&#128213;",
    name: { vi: "Bộ đồ nghề cho thực tập sinh boong",
            en: "The Deck Cadet Kit" },
    meta: { vi: "Tờ đi kèm video “Một ngày thật của thực tập sinh boong” · kiểm gì trước khi ký hợp đồng · một ngày trên tàu thật ra thế nào · cái sai làm mình mất trắng một năm",
            en: "Companion sheet to “A Real Day in the Life of a Deck Cadet” · what to check before you sign · what the day actually looks like · the mistake that cost me a year" },
    tag:  { vi: "PDF · 4 trang · Anh–Việt", en: "PDF · 4 pages · EN–VI" },
    id: "14UibAoJkq9dE_dqaqGjuI5X4DJwQQicD" },

  { nhom:"doc", pdf:true, ico:"&#128214;",
    name: { vi: "70 câu phỏng vấn sĩ quan boong — Phó ba & Phó hai, kèm câu trả lời",
            en: "The Deck Officer Interview — 70 questions, 3/O & 2/O" },
    meta: { vi: "Phần 1: 20 câu mình đã gặp trên đường lên ghế Phó ba · Phần 2: 50 câu cho ghế Phó hai, 18 câu trong đó người ta hỏi chính mình ở buổi phỏng vấn Phó hai năm 2022 · mỗi câu có: người phỏng vấn đang thử cái gì và một câu trả lời mẫu hoàn chỉnh để học thuộc",
            en: "Part 1: the twenty questions I was asked on the way to the Third Officer chair · Part 2: fifty for the Second Officer chair, eighteen of them asked in my own 2/O interview in 2022 · for each one: what the interviewer is really testing and a full sample answer to learn by heart" },
    tag:  { vi: "PDF · 32 trang · Anh–Việt", en: "PDF · 32 pages · EN–VI" },
    ma: "70-cau",   // link tặng quà /t/70-cau/ -> /tai-lieu.html?chi=70-cau (chỉ hiện món này, vẫn hỏi email)
    id: "1MlOEUHtvcX6YJNDK7vlJMDin4xJEKr89" },

  // --- Bản vẽ GA tàu hàng rời 76.000 DWT — 10/10/2026. Bản GỐC là bản vẽ nhà máy có tên tàu + IMO + ô bảo mật:
  //     ĐÃ CHE bằng scripts/che_ban_ve_ga.py (xoá tên tàu, IMO, logo ống khói, ô tên + chữ chìm nhà máy). Cấm đăng bản gốc.
  { nhom:"doc", pdf:true, ico:"&#128208;",
    name: { vi: "Bản vẽ bố trí chung (GA) tàu hàng rời 76.000 DWT",
            en: "General Arrangement plan — 76,000 DWT bulk carrier" },
    meta: { vi: "Bản vẽ General Arrangement thật của một tàu hàng rời 7 hầm, dài 225 m, rộng 32,24 m · đủ mặt cắt dọc, boong chính, tank top, mặt cắt giữa tàu, khu ở từ boong 2 lên buồng lái · ôn thi phần kết cấu, két ballast, bố trí hầm hàng thì mở cái này ra đối chiếu, phóng to xem từng chi tiết",
            en: "A real GA plan of a seven-hold bulk carrier, 225 m long, 32.24 m beam · profile, upper deck, tank top, midship section, and the accommodation from 2nd deck up to the bridge · open it next to your notes when you study hull structure, ballast tanks and hold layout, and zoom in on any detail" },
    tag:  { vi: "PDF · 1 tờ khổ lớn · tiếng Anh", en: "PDF · 1 large sheet · English" },
    ma: "ban-ve-ga",   // link kéo lead /t/ban-ve-ga/ -> /tai-lieu.html?chi=ban-ve-ga (chỉ hiện món này, bắt tên + email)
    id: "1Z_OVMtpr1Y_3r9kYTxyS3Mc71QRrX1Qa" },

  // --- PV thuỷ thủ AB boong — 43 câu, dựng 06/10/2026 (production/magnet/ab-interview.pdf), anh thả Drive tay ---
  { nhom:"doc", pdf:true, ico:"&#9875;",
    name: { vi: "43 câu phỏng vấn thuỷ thủ AB boong, kèm câu trả lời",
            en: "The AB Interview — 43 questions for Able Seamen" },
    meta: { vi: "Câu phòng crewing và sĩ quan hay hỏi AB · trực ca, cảnh giới, khẩu lệnh lái, làm dây – thả neo, cầu thang, thang hoa tiêu, không gian kín, drill · mỗi câu có: người phỏng vấn đang thử cái gì và một câu trả lời mẫu ngắn để học thuộc · kèm bảng khẩu lệnh lái theo IMO SMCP",
            en: "What crewing offices and officers ask an AB · watchkeeping, lookout, steering orders, mooring and anchoring, gangway, pilot ladder, enclosed spaces, drills · for each one: what the interviewer is really testing and a short sample answer to learn by heart · with the IMO SMCP steering orders table" },
    tag:  { vi: "PDF · 15 trang · Anh–Việt", en: "PDF · 15 pages · EN–VI" },
    id: "1COZpuXfh086B2yjldq5BqphZM5tyS1wu" },

  // --- PV Bosun — 39 câu, dựng 06/10/2026 (production/magnet/bosun-interview.pdf), máy tự upload (drive_tai_len.py) ---
  { nhom:"doc", pdf:true, ico:"&#129693;",
    name: { vi: "39 câu phỏng vấn Bosun (thuỷ thủ trưởng), kèm câu trả lời",
            en: "The Bosun Interview — 39 questions" },
    meta: { vi: "Câu phòng crewing và sĩ quan hay hỏi Bosun · lên kế hoạch việc và dẫn đội, giờ làm – giờ nghỉ, bảo dưỡng dây cáp và nắp hầm, chuẩn bị hầm hàng, làm dây – thả neo, ghế Bosun, không gian kín, việc nóng, thời tiết xấu · mỗi câu có: người phỏng vấn đang thử cái gì và một câu trả lời mẫu ngắn để học thuộc",
            en: "What crewing offices and officers ask a Bosun · planning the work and leading the team, hours of work and rest, ropes, wires and hatch covers, hold preparation, mooring and anchoring, the bosun's chair, enclosed spaces, hot work, heavy weather · for each one: what the interviewer is really testing and a short sample answer to learn by heart" },
    tag:  { vi: "PDF · 14 trang · Anh–Việt", en: "PDF · 14 pages · EN–VI" },
    id: "1vtY_V9edO6HyRt-A_5ORjuMKy4Xv-Qj0" },

  // --- Ghi âm phỏng vấn 2/O Zodiac (MP3) — anh upload 14/09/2026. nghe:true -> nút "Nghe ngay" ---
  { nhom:"nghe", nghe:true, ico:"&#127911;",
    name: { vi: "Buổi phỏng vấn Phó hai thật của mình — Zodiac, 2022",
            en: "My real Second Officer interview — Zodiac, 2022" },
    meta: { vi: "Bản ghi âm thật buổi phỏng vấn chức danh Phó hai (2/O) của mình với công ty Zodiac năm 2022 — sau buổi này mình nhận chức danh 2/O. Nghe để biết một buổi phỏng vấn sĩ quan thật diễn ra thế nào: người ta hỏi gì, hỏi tới đâu, và ứng viên trả lời ra sao khi không có kịch bản.",
            en: "The actual recording of my Second Officer (2/O) interview with Zodiac in 2022 — the interview that got me the rank. Listen to how a real officer interview goes: what they ask, how far they push, and how a candidate answers with no script." },
    tag:  { vi: "MP3 · ghi âm thật · 2022", en: "MP3 · real recording · 2022" },
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

  // Bảng tính Tự do tài chính — trước 24/08 là magnet RIÊNG của trang chủ.
  // Gom về kho để cả site chỉ còn MỘT lời hứa (anh chốt 24/08).
  { nhom:"dung", ico:"&#128202;",
    name: { vi: "Bảng tính Tự do tài chính",
            en: "The Financial Freedom spreadsheet" },
    meta: { vi: "4 hướng đi sự nghiệp tính theo từng tháng · sửa số của bạn vào là ra tuổi tự do tài chính",
            en: "Four career paths month by month · put your own numbers in for your freedom age" },
    tag:  { vi: "Excel", en: "Excel" },
    id: "11KItVWjahcbs0FteisbSqYZj4mgYj4Gu" },
];
