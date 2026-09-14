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

  // --- Cẩm nang (PDF) — 2 tờ đi kèm 2 video, anh upload 11/09/2026 ---
  { nhom:"doc", pdf:true, ico:"&#128213;",
    name: { vi: "Bộ đồ nghề cho thực tập sinh boong",
            en: "The Deck Cadet Kit" },
    meta: { vi: "Tờ đi kèm video “Một ngày thật của thực tập sinh boong” · kiểm gì trước khi ký hợp đồng · một ngày trên tàu thật ra thế nào · cái sai làm mình mất trắng một năm",
            en: "Companion sheet to “A Real Day in the Life of a Deck Cadet” · what to check before you sign · what the day actually looks like · the mistake that cost me a year" },
    tag:  { vi: "PDF · 4 trang · Anh–Việt", en: "PDF · 4 pages · EN–VI" },
    id: "14UibAoJkq9dE_dqaqGjuI5X4DJwQQicD" },

  { nhom:"doc", pdf:true, ico:"&#128214;",
    name: { vi: "20 câu phỏng vấn sĩ quan boong — kèm câu trả lời",
            en: "The Officer Questions" },
    meta: { vi: "Tờ đi kèm video “Làm sao để lên sĩ quan” · 20 câu mình đã gặp trên đường lên ghế Phó ba · mỗi câu có: người phỏng vấn đang thử cái gì, câu mình sẽ trả lời, và chỗ trống để bạn viết câu của mình",
            en: "Companion sheet to “How to Become a Ship Officer” · the twenty questions I was asked on the way to the Third Officer chair · for each one: what the interviewer is really testing, the answer I would give, and a blank space for yours" },
    tag:  { vi: "PDF · 10 trang · Anh–Việt", en: "PDF · 10 pages · EN–VI" },
    id: "1MlOEUHtvcX6YJNDK7vlJMDin4xJEKr89" },

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
