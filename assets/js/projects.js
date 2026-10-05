/* ============================================================
   PORTFOLIO PROJECTS — single source of truth for the Portfolio grid.

   To publish a store link once an app goes live, fill in its URL below
   (e.g. play: 'https://play.google.com/store/apps/details?id=...').
   Empty play/ios/web values render as "Coming soon" buttons.

   status:  live      → Live / published
            soon      → Launching soon (store release in progress)
            dev       → Under development
            internal  → Enterprise / internal deployment
            delivered → Delivered to client
            private   → Private repository
   cats:    sbp | hbl | jsbank | dusky | freelance | business | commerce | education | healthcare | media | web | tools
============================================================ */
const PROJECTS = [
  {
    id: 'sbp-uma',
    title: 'State Bank of Pakistan — Unified App',
    sub: 'Official SBP mobile app · Flutter (Android & iOS)',
    org: 'State Bank of Pakistan',
    cats: ['sbp'],
    tag: 'SBP · Central Bank',
    status: 'soon',
    cover: 'assets/img/portfolio/sbp-uma/cover.jpg',
    gallery: ['sbp-uma/home', 'sbp-uma/investment', 'sbp-uma/learn', 'sbp-uma/drawer', 'sbp-uma/settings', 'sbp-uma/help'].map(p => `assets/img/portfolio/${p}.jpg`),
    desc: 'The official cross-platform app of Pakistan\'s central bank. It brings SBP\'s public services together in one bilingual (English / اردو) experience: live economic indicators, press releases and circulars, investment schemes, an ATM/branch locator and the AskSBP AI assistant. It is fully config-driven: content, URLs and feature flags come from an encrypted remote config, so they can change without a store release. The app passed a formal source-code review and VAPT before release.',
    features: [
      'Key Economic Indicators — Policy Rate, KIBOR, PKR-USD (daily with monthly fallback)',
      'AskSBP AI chatbot with voice input, text-to-speech and reasoning disclosure',
      'ATM & branch locator — GPS, 3 km bounding-box search, directions',
      'Press Releases, Circulars & Notifications feed with in-app PDF viewer',
      'Global voice/text search across screens, rates, news and apps',
      'Investment hub — Roshan Digital, Naya Pakistan Certificates, Prize Bonds',
      'Native vacancies (active / closed), FCM push with remote kill-switch',
      'English/Urdu RTL, dark mode, text sizing, read-aloud — WCAG 2.1 AA target',
      'Security: AES-256-GCM config, Keystore/Keychain, root/jailbreak/Frida detection, TLS pinning, Firebase App Check, R8 + obfuscation'
    ],
    tech: ['Flutter', 'Dart', 'GetX', 'Riverpod', 'Dio', 'Firebase (FCM, Crashlytics, RTDB, App Check)', 'Kotlin / Swift channels', 'AES-256-GCM'],
    links: { web: 'https://www.sbp.org.pk', play: '', ios: '' },
    note: 'Store release in progress — Google Play & App Store links will be published here once live.'
  },
  {
    id: 'sunwai',
    title: 'SUNWAI — Customer Complaint Portal',
    sub: 'SBP complaint management · Mobile app + ASP.NET web portal',
    org: 'State Bank of Pakistan',
    cats: ['sbp', 'web'],
    tag: 'SBP · Complaints',
    status: 'live',
    cover: 'assets/img/portfolio/sunwai/cover.jpg',
    gallery: ['assets/img/portfolio/sbp/sunwai.jpg', 'assets/img/portfolio/sunwai/web_usertype.jpg', 'assets/img/portfolio/sunwai/web_home.jpg', 'assets/img/portfolio/sunwai/web_login.jpg', 'assets/img/portfolio/sunwai/web_signup.jpg'],
    desc: 'State Bank of Pakistan\'s official consumer complaint system. Pakistani residents, overseas Pakistanis and foreigners use it to lodge and track complaints against banks, Roshan Digital Account (RDA) and RAAST. I maintain the cross-platform Flutter app (live on Google Play and the App Store). I also rebuilt it as an ASP.NET Core 8 MVC web portal with full feature parity, on the same live REST and CA Service Desk (SOAP) backends. The portal adds an agent / call-centre dashboard.',
    features: [
      'Three onboarding paths — CNIC, NICOP/POC and Passport — with OTP verification',
      'RDA, General Banking and RAAST complaint modules with guided questionnaires',
      'Cascading bank → city → branch pickers, attachment upload via token + SOAP',
      'Dashboard with Total / Open / Closed complaints and per-complaint detail',
      'English / Urdu with RTL & Nastaleeq; root detection and in-app update prompts',
      'Web: Clean Architecture (Web / Core / Infrastructure / Domain) on .NET 8',
      'Web: agent search by CNIC / mobile / passport to raise complaints on behalf of customers',
      'Web: antiforgery, secure cookies, HSTS & security headers, Serilog, Swagger docs for 24 endpoints'
    ],
    tech: ['Flutter', 'Dart', 'ASP.NET Core 8 MVC', 'C# 12', 'REST + SOAP', 'Bootstrap 5 RTL', 'Serilog', 'Swagger / OpenAPI'],
    links: {
      web: 'https://sunwai.sbp.org.pk',
      play: 'https://play.google.com/store/apps/details?id=com.sbp.sbp_complaints_management',
      ios: 'https://apps.apple.com/us/app/sunwai-customer-complaint/id1631334727'
    },
    note: 'The mobile app is live. The new ASP.NET web portal is being rolled out within SBP.'
  },
  {
    id: 'smelevate',
    title: 'SMElevate — SME Loan Portal',
    sub: 'Smart loan request management · Mobile + Web',
    org: 'State Bank of Pakistan',
    cats: ['sbp', 'web'],
    tag: 'SBP · SME Finance',
    status: 'dev',
    cover: 'assets/img/portfolio/smelevate/cover.jpg',
    gallery: [1, 2, 3].map(i => `assets/img/portfolio/smelevate/screen_${i}.jpg`),
    desc: 'A loan-request platform that links SMEs, commercial banks and the State Bank of Pakistan. Applicants apply through an iOS/Android app or the web portal, which share one API and workflow. Commercial banks review and approve applications over a secure VPN, and SBP administrators oversee the process from an internal, MFA-protected admin portal. I designed the end-to-end solution and network-security architecture and the mobile UI.',
    features: [
      'Applicant mobile app + web portal on a single shared API and workflow',
      'Create → submit → bank review → approve / reject → status notifications',
      'Per-bank role-based access — each bank sees only its own applications',
      'Six-zone network design (Internet, DMZ, App, Integration, Data, SBP Internal)',
      'Cloudflare DDoS / bot protection, WAF, reverse proxy & load balancing',
      'Admin portal reachable only from SBP\'s internal network, with MFA',
      'Central audit logging, monitoring, backup & disaster recovery'
    ],
    tech: ['Flutter', 'Solution Architecture', 'Cloudflare', 'WAF', 'VPN', 'MFA', 'RBAC'],
    links: { web: '', play: '', ios: '' },
    note: 'Under development — Android & iOS links will be added after launch.'
  },
  {
    id: 'therapyhome',
    title: 'Therapy Home — Special Education School',
    sub: 'School management for a special-needs school · Nagan Chowrangi, Karachi',
    org: 'Paxees · Client project',
    cats: ['freelance', 'education', 'healthcare', 'web'],
    tag: 'EdTech · Special Needs',
    status: 'live',
    cover: 'assets/img/portfolio/therapyhome/cover.jpg',
    gallery: ['assets/img/portfolio/therapyhome/landing.jpg', 'assets/img/portfolio/therapyhome/fee_sessions.jpg', 'assets/img/portfolio/therapyhome/fee_records.jpg'],
    desc: 'Therapy Home is a special-education school and therapy centre at Nagan Chowrangi, Karachi. It serves children with autism spectrum disorder, Down syndrome, cerebral palsy, speech and language difficulties, learning challenges, slow learning, hearing or vision impairment, and physical or intellectual challenges. I built its school-management platform. It runs student admissions with an individual therapy plan per child (for example occupational, behaviour and speech therapy), classes and sessions, teachers and staff, attendance and progress, and the full fee and payroll cycle. The platform started from an open-source MERN school-management base, which I heavily customised for a special-needs school.',
    features: [
      'Student admissions with an individual therapy / session plan per child',
      'Per-session billing — the same therapy can carry a different rate for each child, with live net-fee totals',
      'Sequential invoices and bilingual A4 / PDF fee slips with reprint',
      'Fee records: search, billed vs paid charts, outstanding dues',
      'Staff salary payments, salary slips and salary records',
      'Animated dashboard with fees, dues and salaries analytics',
      'Admin / Teacher & Staff / Student roles, attendance, progress marks, notices and parent complaints',
      'OTP-protected edits and deletes, light/dark theme with accent colours'
    ],
    tech: ['React 18', 'MUI 5', 'Redux Toolkit', 'Recharts', 'Node.js', 'Express', 'MongoDB Atlas', 'Vercel'],
    links: { web: 'https://xeeshansami.github.io/therapyhome/', play: null, ios: null },
    note: ''
  },
  {
    id: 'sareena',
    title: 'Sareena PartHub — Mobile Parts ERP & Marketplace',
    sub: 'Multi-shop ERP · Web panel · Flutter app · Consumer marketplace',
    org: 'Paxees · Client project',
    cats: ['freelance', 'business', 'commerce', 'web'],
    tag: 'Retail ERP · Marketplace',
    status: 'live',
    cover: 'assets/img/portfolio/sareena/cover.jpg',
    gallery: ['assets/img/portfolio/sareena/admin_login.jpg', 'assets/img/portfolio/sareena/storefront.jpg', 'assets/img/portfolio/sareena/storefront_mobile.jpg'],
    desc: 'A multi-tenant ERP and marketplace for mobile-phone parts markets. A Super Admin manages markets and shops. Each shopkeeper runs inventory, point of sale, purchasing, supplier and customer ledgers and profit reports, and publishes products to a public storefront. Its standout feature is supplier-invoice import from a PDF or a camera photo (OCR), which matches lines to products and stocks them after a review step.',
    features: [
      'Super Admin → markets → shops, with strict per-shop data isolation and role gating',
      'Brands, models, categories; one part mapped to many compatible handsets',
      'Central stock-movement service with weighted-average costing',
      'POS sales, purchase orders, estimates, returns, supplier & customer ledgers',
      'Invoice import from PDF / camera OCR (ML Kit), preview cut from ~10s to ~0.5s',
      'Part-name parser: "MI 15C/POCO C85 K-COMBO PANEL" → brand, model, technology',
      'Public storefront & in-app store with cart, checkout and orders',
      'Flutter shopkeeper app with barcode scanning (Panel Hisab)'
    ],
    tech: ['React 18', 'Vite', 'Flutter', 'Riverpod', 'Node.js 22', 'Express', 'MongoDB', 'JWT', 'Google ML Kit', 'Vercel'],
    links: { web: 'https://xeeshansami.github.io/sareenawebpanel/', webLabel: 'Open marketplace & admin', play: '', ios: '' },
    note: 'Web panel and marketplace are live. The Panel Hisab mobile app (Android / iOS) is preparing for store release.'
  },
  {
    id: 'pytools',
    title: 'Paxees Developer Tool Suite',
    sub: 'Python desktop toolkit — API, JSON, PDF, image & APK tools',
    org: 'Personal / Internal tooling',
    cats: ['tools'],
    tag: 'Python · Desktop',
    status: 'private',
    cover: 'assets/img/portfolio/pytools/cover.jpg',
    gallery: ['assets/img/portfolio/pytools/launcher.jpg', 'assets/img/portfolio/pytools/api_client.jpg'],
    desc: 'A Windows desktop toolkit with 12 tools behind one launcher, built for day-to-day mobile and backend work. It includes a Postman-style API client, JSON/XML diff, inspection and formatting tools, a PDF editor and converters, image converters with background removal, and an APK/AAB signing inspector. Heavy work runs on background threads, and modules load lazily, so a missing optional library disables only the tool that needs it.',
    features: [
      'Secure API Client — collections, history, environments ({{baseURL}}), cURL import/export',
      'JSON / XML Compare — ignore order, match by key, numeric tolerance, export JSON/CSV/TXT',
      'JSON Inspector — node/key stats, 4 duplicate detectors, schema view (180k nodes in ~0.7s)',
      'JSON Formatter — validate, auto-repair, JSONL/CSV, VS Code-style folding (47s → 2.3s fix)',
      'PDF editor — pages, merge/split, watermark, AES-256 encryption, metadata, extraction',
      'PDF ⇄ Word batch conversion, PDF/TIFF compression',
      'PNG → JPEG batch and JPEG → transparent PNG (OpenCV / rembg)',
      'Keystore / APK / AAB SHA checker with apksigner, aapt2 and JADX'
    ],
    tech: ['Python 3', 'Tkinter / ttkbootstrap', 'PyMuPDF', 'Pillow', 'OpenCV', 'pdf2docx', 'requests', 'pywin32'],
    links: { web: null, play: null, ios: null },
    note: 'Private repository — demo available on request.'
  },

  /* ---------- HBL ---------- */
  L('hbl-hr', 'HBL — People Connect On the GO', 'HBL Bank HR app', 'Habib Bank Limited', 'hbl', 'HBL · HR', 'internal', 'HR/hr.jpg', ['HR/PeopleConnectOnTheGo.jpg'],
    'HR self-service mobile app for Habib Bank employees, built at HBL’s Innovation & IT Center.', ['Android', 'Kotlin', 'Java']),
  L('hbl-rda', 'HBL — Roshan Digital Account', 'Tablet application', 'Habib Bank Limited', 'hbl', 'HBL · Banking', 'internal', 'tablet/tablet.PNG', ['tablet/flow_tablet_app_2.jpg'],
    'Tablet application for Roshan Digital Account customer onboarding at HBL.', ['Android', 'Kotlin', 'Java']),
  L('hbl-assets', 'HBL — Bank Assets Survey', 'HBL Bank mobile app', 'Habib Bank Limited', 'hbl', 'HBL · Operations', 'internal', 'vlinks/image4.png', [],
    'Mobile app for surveying HBL bank assets.', ['Android', 'Kotlin']),
  L('hbl-branch', 'HBL — Branch Survey', 'HBL Bank mobile app', 'Habib Bank Limited', 'hbl', 'HBL · Operations', 'internal', 'aomchecklist/image1.png', [],
    'Branch survey and checklist mobile app for HBL.', ['Android', 'Kotlin']),

  /* ---------- JS Bank ---------- */
  {
    id: 'jsbvs',
    title: 'JS BVS — Biometric Verification',
    sub: 'Contactless fingerprint verification with the phone camera',
    org: 'JS Bank',
    cats: ['jsbank'],
    tag: 'JS Bank · Biometrics',
    status: 'live',
    cover: 'assets/img/portfolio/jsbvs/cover.jpg',
    gallery: ['cnic', 'capture', 'guidance', 'bvs_for'].map(n => `assets/img/portfolio/jsbvs/${n}.jpg`),
    desc: 'JS Bank\'s public biometric verification app (100K+ downloads). Customers who opened a digital account, such as Zindigi, JS Blink, Asaan Digital, Freelancer Digital or Asaan Digital Remittance, complete NADRA biometric verification from home, as SBP regulations require. There is no branch visit and no fingerprint scanner: the phone\'s rear camera captures the fingerprints and they are verified against NADRA in real time.',
    features: [
      'Contactless 4-finger capture from the rear camera, with on-screen hand guidance',
      'Real-time NADRA biometric verification for digital-account customers',
      'CNIC entry with consent, then the guided capture flow',
      'Account-type selection: Zindigi, JS Blink, Asaan Digital and more',
      'Saves a branch visit inside the 60-day regulatory verification window',
      'Android and iOS releases'
    ],
    tech: ['Android (Kotlin / Java)', 'iOS', 'Camera fingerprint SDK', 'NADRA biometric API', 'REST'],
    links: { play: 'https://play.google.com/store/apps/details?id=com.jsbl.bvs', ios: 'https://apps.apple.com/pk/app/js-bvs/id1618188083' },
    note: ''
  },
  {
    id: 'jsbl-aof',
    title: 'JS Bank One Window — Account Opening',
    sub: 'In-branch digital account opening with NADRA biometrics',
    org: 'JS Bank',
    cats: ['jsbank'],
    tag: 'JS Bank · Onboarding',
    status: 'internal',
    cover: 'assets/img/portfolio/jsbl/splash.png',
    gallery: ['assets/img/portfolio/jsbl/splash.png', 'assets/img/portfolio/jsbl/acccountOpening.png'],
    desc: 'One Window is JS Bank\'s in-branch onboarding app. Branch staff use it to open accounts and create customer records (CIF) on a tablet or phone, without paper forms. It verifies the customer with NADRA (Verisys and fingerprint biometrics, from a USB scanner or the phone camera), fills dynamic e-forms, captures documents and signatures, and submits the case for processing.',
    features: [
      'Guided CIF / account-opening wizard: customer info, contact and next of kin, PEP and demographics, account details, summary',
      'NADRA Verisys and fingerprint biometric verification (Nitgen USB scanner or contactless camera capture)',
      'Customer signature capture and document / picture upload with on-device processing (OpenCV)',
      'Dynamic e-forms with reusable form components and searchable pick-lists',
      'Existing-to-bank (ETB) case handling, meeting and call scheduling for relationship staff',
      'PDF generation and printing of account forms'
    ],
    tech: ['Android', 'Kotlin', 'Java', 'Nitgen biometric SDK', 'OpenCV', 'NADRA Verisys', 'REST'],
    links: {},
    note: 'Internal enterprise app, distributed to JS Bank branches.'
  },

  /* ---------- Client apps ---------- */
  L('realtorscrm', 'Realtors CRM', 'Flutter iOS / Android application', 'Paxees · Client project', 'freelance business', 'CRM', 'live', 'realtorscrm/image1.jpeg', ['realtorscrm/realtorscrm.jpeg'],
    'CRM application for real-estate professionals.', ['Flutter'], { play: 'https://play.google.com/store/apps/details?id=com.amr.realtorscrm' }),
  L('bidfeed', 'Bidfeed Home', 'Bidfeed Home mobile application', 'Paxees · Client project', 'freelance commerce', 'Business', 'live', 'bidfeed/Bidfeed.PNG', [],
    'Mobile ordering application for Bidfood customers.', ['Android'], { play: 'https://play.google.com/store/apps/details?id=com.retailak.bidfoods' }),
  L('ags', 'AGS Multi Order Booking', 'Pharmacy app', 'Paxees · Client project', 'freelance business healthcare', 'Pharmacy', 'live', 'ags/ags.PNG', ['ags/agsflow.PNG'],
    'Multi order-booking app for a pharmaceutical distributor.', ['Android'], { play: 'https://play.google.com/store/apps/details?id=com.agsadil.agssalesandroidclientorderdocter' }),
  L('offtheschool', 'Off The School', 'Flutter iOS / Android application', 'Paxees · Client project', 'freelance education', 'Education', 'delivered', 'offtheschool/image1.jpeg', ['offtheschool/offtheschool.jpeg'],
    'Education application for iOS and Android.', ['Flutter']),
  L('dawngroup', 'Dawn Group', 'Flutter iOS / Android application', 'Paxees · Client project', 'freelance business', 'Business', 'delivered', 'dawngroup/image10.jpeg', ['dawngroup/dawngroup.jpeg'],
    'Business application for iOS and Android.', ['Flutter']),
  L('tengram', 'Tengram', 'Coupon app', 'Paxees · Client project', 'freelance commerce', 'Coupons', 'delivered', 'tengram/tengram.png', ['tengram/tengramflow.png'],
    'Coupon and deals mobile app.', ['Android']),
  L('tcc', 'The Clone Conservatory', 'Plants e-commerce app', 'Paxees · Client project', 'freelance commerce', 'E-Commerce', 'delivered', 'tcc/tcc.png', ['tcc/tccdarkflow.jpeg'],
    'E-commerce app for a plants store.', ['Mobile']),
  L('youniform', 'YouniForm', 'School-uniform e-commerce app', 'Dusky Solutions', 'dusky commerce', 'E-Commerce', 'delivered', 'youniform/youniform.JPEG', ['youniform/youniform.png'],
    'E-commerce mobile app.', ['Android']),
  L('urdunovels', 'UrduNovels', 'Novels app', 'Paxees · Client project', 'freelance media', 'Reading', 'delivered', 'UrduNovels/urduNovels.JPEG', ['UrduNovels/urduNovels.png'],
    'Urdu novels reading app.', ['Android']),
  L('gatak', 'جاتك الفزعه — Gatak Alfazaa', 'Arabic e-commerce & services app', 'Dusky Solutions', 'dusky commerce', 'E-Commerce', 'delivered', 'gatak/screen-0.jpg', ['gatak/Gatak.png'],
    'Arabic (RTL) e-commerce service app.', ['Android', 'RTL']),
  L('khutalkhair', 'خطى الخير — Khuta Alkhair', 'Arabic e-commerce & services app', 'Dusky Solutions', 'dusky commerce', 'E-Commerce', 'delivered', 'khutalkhair/zee1.png', ['khutalkhair/khuatlkhair.png'],
    'Arabic (RTL) e-commerce service app.', ['Android', 'RTL']),
  L('reliance', 'Reliance Engineering', 'Business app', 'Paxees · Client project', 'freelance business', 'Business', 'delivered', 'relainceEngineering/relainceEng.JPEG', ['relainceEngineering/relianceEng.png'],
    'Business app for an engineering company.', ['Android']),

  /* ---------- Utility & media ---------- */
  L('vpnx', 'VPNx', 'Tool app', 'Paxees · Client project', 'freelance media', 'Tool', 'delivered', 'vpn/vpnapp.PNG', ['vpn/vpn.png'], 'VPN utility app.', ['Android']),
  L('bihar', 'Bihar Land Records', 'बिहार भूमि · Khatian app', 'Paxees · Client project', 'freelance media', 'Records', 'delivered', 'bihar/app.PNG', ['bihar/flow.PNG'], 'Land-records (Khatian) lookup app.', ['Android']),
  L('videotor', 'Videotor Video Editor', 'Media tool app', 'Paxees · Client project', 'freelance media', 'Media', 'delivered', 'Downloader2/app.PNG', ['Downloader2/flow.PNG'], 'Video editor app.', ['Android']),
  L('hddownloader', 'All Video HD Downloader', 'Media tool app', 'Paxees · Client project', 'freelance media', 'Media', 'delivered', 'Downloader3/app.PNG', ['Downloader3/flow.PNG'], 'HD video downloader app.', ['Android']),
  L('primeflix', 'PrimeFlix', 'Movie app', 'Paxees · Client project', 'freelance media', 'Movies', 'delivered', 'PrimeFlix/primeFlix.JPEG', ['PrimeFlix/primeFlix.png'], 'Movie app.', ['Android']),
  L('mediaplayer', 'Media Player', 'Media app', 'Paxees · Client project', 'freelance media', 'Media', 'delivered', 'mediaplayer/1.png', ['mediaplayer/mediaplayer.png'], 'Media player app.', ['Android']),
  L('convertor', 'Convertor', 'Media tool app', 'Paxees · Client project', 'freelance media', 'Media', 'delivered', 'convertor/2019_11_13_11_07_IMG_1541.JPG', ['convertor/convertor.png'], 'Media converter app.', ['Android']),
  L('recorder', 'Call Recorder', 'Media tool app', 'Paxees · Client project', 'freelance media', 'Media', 'delivered', 'recorder/Android splash.png', ['recorder/recoreder.png'], 'Call recorder app.', ['Android']),
  L('mxdownloader', 'MX Video Downloader', 'Media tool app', 'Paxees · Client project', 'freelance media', 'Media', 'delivered', 'Downloader/sp cahnge.jpg', ['Downloader/MX-Video-Downloder-workflow.jpg'], 'Video downloader app.', ['Android'])
];

/* Compact helper for the shorter legacy entries (function declarations are hoisted). */
function L(id, title, sub, org, cat, tag, status, cover, extra, desc, tech, links) {
  const base = 'assets/img/portfolio/';
  return { id, title, sub, org, cats: cat.split(' '), tag, status, cover: base + cover, gallery: [cover, ...extra].map(p => base + p), desc, tech, links: links || {} };
}
