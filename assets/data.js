    var STACK = [
      {
        c: "be", l: "BACKEND", l_id: "BACKEND", n: "Laravel",
        r: "REST API & Full Stack Web", r_id: "REST API & Web Full Stack", lv: 3,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"/><path d="M3 7l9 5 9-5"/><path d="M12 22V12"/><path d="M7.5 4.5l9 5"/></svg>'
      },
      {
        c: "fe", l: "MOBILE", l_id: "MOBILE", n: "Flutter",
        r: "Cross Platform Android App", r_id: "Aplikasi Android Lintas Platform", lv: 2,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2L4 12l3.5 3.5L21 2h-7z"/><path d="M14 11l-6.5 6.5L14 22h7l-6.5-5.5L21 11h-7z"/></svg>'
      },
      {
        c: "be", l: "BACKEND", l_id: "BACKEND", n: "PHP Native",
        r: "Server Side Web & Logic", r_id: "Pemrograman Web & Logika Server", lv: 3,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="10" ry="6"/><path d="M7 14l1-4h2a1.5 1.5 0 0 1 0 3H7.5"/><path d="M15 14l1-4h2a1.5 1.5 0 0 1 0 3h-2.5"/><path d="M11.5 14l1-4"/><path d="M14 10l-1 4"/><path d="M11.8 12h2"/></svg>'
      },
      {
        c: "fe", l: "FRONTEND", l_id: "FRONTEND", n: "JavaScript",
        r: "Interactive UI & DOM Logic", r_id: "Antarmuka Interaktif & Logika DOM", lv: 2,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M10 10v6a2 2 0 0 1-2 2H7"/><path d="M17 11a2 2 0 0 0-2-1h-1a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-1a2 2 0 0 1-2-1"/></svg>'
      },
      {
        c: "fe", l: "FRONTEND", l_id: "FRONTEND", n: "React",
        r: "Component Based Interfaces", r_id: "Antarmuka Berbasis Komponen", lv: 1,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>'
      },
      {
        c: "fe", l: "FRONTEND", l_id: "FRONTEND", n: "Next.js",
        r: "SSR & Modern Web Framework", r_id: "SSR & Framework Web Modern", lv: 1,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 16V8l8 10"/><path d="M15 8v4"/></svg>'
      },
      {
        c: "fe", l: "FRONTEND", l_id: "FRONTEND", n: "Tailwind CSS",
        r: "Utility First Responsive Styling", r_id: "Styling Responsif Berbasis Utility", lv: 2,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10c1.3-2.7 3.3-4 6-4 4 0 4.7 3 6.7 3.5 1.3.3 2.5-.2 3.3-1.5-1.3 2.7-3.3 4-6 4-4 0-4.7-3-6.7-3.5C8 8.2 6.8 8.7 6 10z"/><path d="M2 16c1.3-2.7 3.3-4 6-4 4 0 4.7 3 6.7 3.5 1.3.3 2.5-.2 3.3-1.5-1.3 2.7-3.3 4-6 4-4 0-4.7-3-6.7-3.5C4 14.2 2.8 14.7 2 16z"/></svg>'
      },
      {
        c: "be", l: "BACKEND", l_id: "BACKEND", n: "Node.js",
        r: "Scalable Backend & Services", r_id: "Layanan Backend & REST API", lv: 1,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z"/><path d="M9.5 9.5v5l5-2.5-5-2.5z"/></svg>'
      },
      {
        c: "be", l: "DATABASE", l_id: "DATABASE", n: "MySQL",
        r: "Relational Database Design", r_id: "Perancangan Basis Data Relasional", lv: 3,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg>'
      },
      {
        c: "be", l: "DATABASE", l_id: "DATABASE", n: "PostgreSQL",
        r: "Advanced SQL & Data Storage", r_id: "Manajemen Basis Data SQL", lv: 1,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>'
      },
      {
        c: "data", l: "DATA & AI", l_id: "DATA & AI", n: "Python",
        r: "Computer Vision, AI & Scripting", r_id: "Computer Vision, AI & Otomasi", lv: 2,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-4 0-4 2-4 4v2h5v1H6c-2 0-3 1.5-3 4s1 4 3 4h2v-2c0-2 1.5-3 3.5-3h4c1.5 0 2.5-1 2.5-2.5V7c0-2-1.5-4-6-4z"/><path d="M12 21c4 0 4-2 4-4v-2h-5v-1h7c2 0 3-1.5 3-4s-1-4-3-4h-2v2c0 2-1.5 3-3.5 3h-4C7 11 6 12 6 13.5V17c0 2 1.5 4 6 4z"/></svg>'
      },
      {
        c: "data", l: "DATA & AI", l_id: "DATA & AI", n: "Streamlit",
        r: "Interactive ML Web Deployment", r_id: "Deployment Web Interaktif Model ML", lv: 2,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>'
      },
      {
        c: "tools", l: "TOOLS", l_id: "PERANGKAT", n: "Git & GitHub",
        r: "Version Control & Collaboration", r_id: "Kontrol Versi & Kolaborasi Kode", lv: 2,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><path d="M6 8v8"/><path d="M18 8c0 4-3 6-12 6"/></svg>'
      },
      {
        c: "tools", l: "TOOLS", l_id: "PERANGKAT", n: "Docker",
        r: "Containerized App Environments", r_id: "Kontainerisasi Lingkungan Aplikasi", lv: 1,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="3" height="3"/><rect x="8" y="10" width="3" height="3"/><rect x="12" y="10" width="3" height="3"/><rect x="8" y="6" width="3" height="3"/><rect x="12" y="6" width="3" height="3"/><path d="M2 13h16c1.5 0 3-1 4-2.5-.5 4.5-3 8.5-9.5 8.5S2 16 2 13z"/></svg>'
      },
      {
        c: "tools", l: "TOOLS", l_id: "PERANGKAT", n: "Postman",
        r: "API Testing & Documentation", r_id: "Pengujian & Dokumentasi REST API", lv: 2,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>'
      },
      {
        c: "fe", l: "DESIGN", l_id: "DESAIN", n: "Figma",
        r: "UI/UX Wireframing & Prototyping", r_id: "Desain Antarmuka & Prototyping UI/UX", lv: 2,
        ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h3v6H9a3 3 0 0 1 0-6z"/><path d="M12 3h3a3 3 0 0 1 0 6h-3V3z"/><path d="M12 9h3a3 3 0 0 1 0 6h-3V9z"/><path d="M9 9h3v6H9a3 3 0 0 1 0-6z"/><path d="M9 15h3v3a3 3 0 0 1-3-3z"/></svg>'
      }
    ];

    var PROJ = [
      {
        c: "web", n: "RocketPrintz",
        d: "A production management and raw material inventory system for a printing business, with order management, production planning, and role-based access for admins, supervisors, and operators.",
        d_id: "Sistem manajemen produksi dan persediaan bahan baku untuk usaha percetakan, dengan manajemen order, planning produksi, dan akses berbasis peran untuk admin, supervisor, dan operator.",
        t: ["Expo", "TypeScript", "Firebase"], y: "2026", img: "assets/projects/rocketprintz/rocketprintz2.png"
      }

    ];

    var CERT = [
      { n: "Sertifikat Member Resmi IMPHNEN", o: "IMPHNEN Community, Banten", y: "2026", k: "community", img: "assets/certs/imphnen.png", url: "https://imphnen.dev/sertifikat/pmbyungs" }
    ];

    var I18N = {
      en: {
        nav: ["About", "Skills", "Projects", "Certifications"],
        cta: "CONTACT →",
        script: "Hello, I'm",
        pill: "WEB & MOBILE DEVELOPER ",
        heroD: "I build <strong>fast, clean web applications</strong>, from interface design to APIs and databases, for small businesses and product teams.",
        btnProj: "VIEW PROJECTS →",
        btnTalk: "LET'S TALK",
        st1: "Project shipped",
        st2Val: "1 yr",
        st2: "Experience",
        st3: "Certificate",
        badge: '<span class="pd"></span>OPEN TO WORK',
        hc1Cat: "WEB & MOBILE", hc1T: "Web & Mobile Apps", hc1P: "Building web and Android apps from one codebase with Expo, React Native, and TypeScript.",
        hc2Cat: "BACKEND", hc2T: "Real-time Backend", hc2P: "Authentication, role-based access, and real-time data with Firebase and Cloud Firestore.",
        hc3Cat: "LEARNING", hc3T: "Always Learning", hc3P: "Growing my stack with Laravel, Flutter, and Docker, one project at a time.",
        abChip: "PROFILE",
        abH2: "Background & journey",
        abDesc: "A closer look at who I am, what I build, and my academic & internship background.",
        abSub1: "// WHO I AM",
        abH3: "Informatics Engineering student building clean, usable applications.",
        abP1: "I'm <strong>Kaka Anditya Pambayung</strong>, a web and mobile developer based in South Tangerang, Indonesia. I'm a <strong>6th-semester Informatics Engineering student</strong> at <strong>Universitas Pamulang</strong>, where I build real world applications alongside my studies.",
        abP2: "My latest project is RocketPrintz, a production and inventory management system for a printing business, built with Expo, TypeScript, and Firebase.",
        m1L: "UNIVERSITY", m1V: "Universitas Pamulang",
        m2L: "PROGRAM", m2V: "Informatics Eng. (S1)",
        m3L: "MAIN FOCUS", m3V: "Web & Mobile",
        m4L: "STATUS", m4V: "● Open to Work",
        quote: "“I learn by building things that real people use.”",
        abSub2: "// EDUCATION & EXPERIENCE",
        tl1Yr: "6TH SEMESTER · 2026", tl1Tag: "BACHELOR'S DEGREE",
        tl1Title: "Informatics Engineering (S1)",
        tl1Org: "Universitas Pamulang, South Tangerang",
        tl1Desc: "Currently in the 6th semester of the Informatics Engineering undergraduate program, focusing on software and web & mobile development.",
        tl2Yr: "INTERNSHIP · 2026", tl2Tag: "EXPERIENCE",
        tl2Title: "Developer Intern (Kerja Praktik)",
        tl2Org: "Rocket Printz",
        tl2Desc: "Built RocketPrintz, a production management and raw material inventory system with order management, production planning, and role-based access for admins, supervisors, and operators.",
        skChip: "TECH STACK",
        skH2: "Skills & technology",
        skDesc: "Tools and technologies I use to build web, mobile, and data applications.",
        skTabs: { all: "ALL", fe: "FRONTEND & MOBILE", be: "BACKEND & DB", data: "DATA & AI", tools: "TOOLS" },
        lvLabels: { 3: "CORE STACK", 2: "PROFICIENT", 1: "FAMILIAR" },
        prChip: "PROJECT LIST",
        prH2: "Projects I've built",
        prTabs: { all: "ALL", web: "WEB APP", mobile: "MOBILE", data: "DATA & AI" },
        prLab: { web: "WEB APP", mobile: "MOBILE", data: "DATA & AI" },
        prGo: "VIEW DETAILS →",
        crChip: "CREDENTIALS",
        crH2: "Certifications",
        mdVf: "✓ Verified",
        mdYr: "Year / Period: ",
        ctChip: "GET IN TOUCH",
        ctH2: "Got an idea? Let's build it.",
        ctP: "I take on freelance projects, long term collaborations, and short consulting sessions about the web.",
        copyBtn: "COPY EMAIL",
        footer: "© 2026 Kaka Anditya Pambayung. All rights reserved.",
        toastCopy: "Email copied: ",
        toastManual: "Copy manually: ",
        phText: "COVER NOT ADDED YET"
      },
      id: {
        nav: ["Tentang", "Keahlian", "Proyek", "Sertifikasi"],
        cta: "KONTAK →",
        script: "Halo, Saya",
        pill: "PENGEMBANG WEB & MOBILE ",
        heroD: "Saya membangun <strong>aplikasi web & mobile yang cepat dan rapi</strong>, mulai dari desain antarmuka hingga API dan database, untuk bisnis maupun tim produk.",
        btnProj: "LIHAT PROYEK →",
        btnTalk: "DISKUSI YUK",
        st1: "Proyek selesai",
        st2Val: "1 thn",
        st2: "Pengalaman",
        st3: "Sertifikat",
        badge: '<span class="pd"></span>SIAP BEKERJA',
       hc1Cat: "WEB & MOBILE", hc1T: "Aplikasi Web & Mobile", hc1P: "Membangun aplikasi web dan Android dari satu basis kode dengan Expo, React Native, dan TypeScript.",
        hc2Cat: "BACKEND", hc2T: "Backend Real-time", hc2P: "Autentikasi, akses berbasis peran, dan data real-time dengan Firebase dan Cloud Firestore.",
        hc3Cat: "BELAJAR", hc3T: "Terus Belajar", hc3P: "Mengembangkan keahlian dengan Laravel, Flutter, dan Docker, satu project demi satu project.",
        abChip: "PROFIL",
        abH2: "Latar Belakang & Perjalanan",
        abDesc: "Mengenal lebih dekat siapa saya, apa yang saya bangun, serta latar belakang akademik & pengalaman magang saya.",
        abSub1: "// TENTANG SAYA",
        abH3: "Mahasiswa Teknik Informatika yang membangun aplikasi rapi dan fungsional.",
        abP1: "Saya <strong>Kaka Anditya Pambayung</strong>, pengembang web dan mobile yang berdomisili di Tangerang Selatan, Indonesia. Saya <strong>mahasiswa semester 6 Teknik Informatika</strong> di <strong>Universitas Pamulang</strong>, tempat saya membangun aplikasi nyata di sela perkuliahan.",
        abP2: "Project terbaru saya adalah RocketPrintz, sistem manajemen produksi dan persediaan untuk usaha percetakan, dibangun dengan Expo, TypeScript, dan Firebase.",
        m1L: "UNIVERSITAS", m1V: "Universitas Pamulang",
        m2L: "PRODI", m2V: "Teknik Informatika (S1)",
        m3L: "FOKUS UTAMA", m3V: "Web & Mobile",
        m4L: "STATUS", m4V: "● Siap Bekerja",
        quote: "“Saya belajar dengan membangun hal yang benar-benar dipakai orang.”",
        abSub2: "// PENDIDIKAN & PENGALAMAN",
        tl1Yr: "SEMESTER 6 · 2026", tl1Tag: "SARJANA (S1)",
        tl1Title: "Teknik Informatika (S1)",
        tl1Org: "Universitas Pamulang, Tangerang Selatan",
        tl1Desc: "Sedang menempuh semester 6 program S1 Teknik Informatika, dengan fokus pada pengembangan perangkat lunak serta web & mobile.",
        tl2Yr: "MAGANG · 2026", tl2Tag: "PENGALAMAN",
        tl2Title: "Developer Magang (Kerja Praktik)",
        tl2Org: "Rocket Printz",
        tl2Desc: "Membangun RocketPrintz, sistem manajemen produksi dan persediaan bahan baku dengan manajemen order, planning produksi, dan akses berbasis peran untuk admin, supervisor, dan operator.",
        skChip: "TEKNOLOGI",
        skH2: "Keahlian & Teknologi",
        skDesc: "Perangkat dan teknologi yang saya gunakan untuk membangun aplikasi web, mobile, dan data.",
        skTabs: { all: "SEMUA", fe: "FRONTEND & MOBILE", be: "BACKEND & DB", data: "DATA & AI", tools: "PERANGKAT" },
        lvLabels: { 3: "KEAHLIAN UTAMA", 2: "MAHIR", 1: "MENENGAH" },
        prChip: "DAFTAR PROYEK",
        prH2: "Proyek yang Telah Saya Bangun",
        prTabs: { all: "SEMUA", web: "APLIKASI WEB", mobile: "MOBILE", data: "DATA & AI" },
        prLab: { web: "APLIKASI WEB", mobile: "MOBILE", data: "DATA & AI" },
        prGo: "LIHAT DETAIL →",
        crChip: "KREDENSIAL",
        crH2: "Sertifikasi",
        mdVf: "✓ Terverifikasi",
        mdYr: "Tahun / Periode: ",
        ctChip: "HUBUNGI SAYA",
        ctH2: "Punya ide menarik? Mari wujudkan.",
        ctP: "Saya menerima proyek freelance, kolaborasi jangka panjang, maupun sesi konsultasi singkat seputar pengembangan web dan aplikasi.",
        copyBtn: "SALIN EMAIL",
        footer: "© 2026 Kaka Anditya Pambayung. Seluruh hak cipta dilindungi.",
        toastCopy: "Email disalin: ",
        toastManual: "Salin manual: ",
        phText: "COVER BELUM DITAMBAHKAN"
      }
    };

    var EMAIL = "kakapambayungajah@gmail.com";
