# Desain: Landing Page Solusi

**Tanggal:** 2026-05-26  
**Status:** Disetujui  
**Pendekatan:** A — Single-page, all-in-one  

---

## 1. Konteks & Tujuan

Membangun landing page profesional untuk **Solusi**, bisnis jasa pengembangan software yang menyasar UMKM, startup, dan enterprise di Indonesia. Website berfungsi sebagai pintu masuk utama untuk lead generation (konsultasi gratis) dan membangun kepercayaan calon klien.

**Tagline:** Solusi Digital End-to-End untuk Bisnis Modern

**Layanan inti:** Aplikasi Mobile, Website & Web App, Sistem IoT, AI & Machine Learning

---

## 2. Stack Teknologi

| Teknologi | Versi | Peran |
|---|---|---|
| Astro.js | latest | Framework utama (zero-JS default) |
| Tailwind CSS | latest | Layout responsif saja |
| @astrojs/sitemap | latest | Generate sitemap.xml otomatis |
| @astrojs/partytown | latest | Isolasi script analytics |
| TypeScript | optional | Tipe data komponen |

---

## 3. Arsitektur File

```
/
├── public/
│   ├── robots.txt
│   └── favicon.svg               ← SVG "S" monogram, warna abu slate
│
├── src/
│   ├── components/
│   │   ├── Header.astro           ← sticky nav + logo teks
│   │   ├── Hero.astro             ← H1 + sub-heading + 2 CTA
│   │   ├── Services.astro         ← 4 kartu layanan
│   │   ├── WhyUs.astro            ← 3 keunggulan
│   │   ├── Process.astro          ← 5 langkah kerja
│   │   ├── Portfolio.astro        ← 6 proyek dummy
│   │   ├── TechStack.astro        ← daftar teknologi yang digunakan
│   │   ├── Testimonials.astro     ← 3 testimoni dummy
│   │   ├── FAQ.astro              ← 7 FAQ via <details>/<summary>
│   │   ├── CTASection.astro       ← section ajakan konsultasi
│   │   └── Footer.astro           ← kontak, sosmed, copyright
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro       ← <head>: meta + OG + Twitter + JSON-LD
│   │
│   ├── pages/
│   │   └── index.astro            ← import semua komponen secara berurutan
│   │
│   └── styles/
│       └── global.css             ← reset + CSS variables (≤50 baris)
│
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

**Prinsip arsitektur:** Semua konten (copy, data dummy portofolio, FAQ, testimoni) didefinisikan sebagai konstanta TypeScript di dalam masing-masing file komponen. Tidak ada file data terpisah. Dapat dipindah ke Astro Content Collections di iterasi berikutnya.

---

## 4. Desain Visual

### 4.1 Filosofi
"Classic Classless" — tampilan seperti dokumen yang well-written. Konten berbicara tanpa distraksi gradient, animasi berlebihan, atau warna mencolok.

### 4.2 Palet Warna
| Token | Nilai | Penggunaan |
|---|---|---|
| `--accent` | `#475569` | Link, border aktif, badge |
| `--accent-light` | `#f1f5f9` | Background section alternating |
| Putih | `#ffffff` | Background utama |
| Teks | `#1a1a1a` | Body text |
| Subtext | `#6b7280` | Caption, metadata |

### 4.3 Tipografi
| Token | Nilai |
|---|---|
| `--font-heading` | `Georgia, 'Times New Roman', serif` |
| `--font-body` | `system-ui, -apple-system, sans-serif` |

Zero Google Fonts request → tidak ada blocking render.

### 4.4 Penggunaan Tailwind
Tailwind **hanya** untuk:
- Responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Flexbox layout: `flex items-center justify-between`
- Container: `max-w-5xl mx-auto px-4 sm:px-6`
- Spacing: `py-16 md:py-24`

Tidak menggunakan: `bg-*`, `text-*`, `shadow-*`, `rounded-*` (kecuali netral seperti `bg-white`).

---

## 5. Konten Per Section

### 5.1 Header
- Logo: teks "Solusi" (Georgia, bold, aksen abu slate)
- Nav: `Layanan | Portofolio | Tentang | Kontak`
- CTA kecil: tombol "Konsultasi" di ujung kanan
- Perilaku: sticky, background putih solid saat scroll

### 5.2 Hero
```
H1: "Kami Bantu Bisnis Anda Tumbuh dengan Teknologi"
P:  "Dari aplikasi mobile hingga sistem AI — Solusi hadir sebagai
     mitra teknis jangka panjang untuk UMKM, startup, dan enterprise."
CTA primer:    [Mulai Konsultasi Gratis →]
CTA sekunder:  [Lihat Portofolio]
```

### 5.3 Layanan (4 kartu)
| Layanan | Deskripsi Singkat |
|---|---|
| Aplikasi Mobile | iOS & Android native/cross-platform dengan React Native atau Flutter |
| Website & Web App | Dari landing page berkecepatan tinggi hingga sistem web kompleks |
| Sistem IoT | Perangkat keras + firmware + dashboard monitoring real-time |
| AI & Machine Learning | Model prediktif, computer vision, NLP untuk kebutuhan bisnis |

Grid: 1 kolom (mobile) → 2 kolom (tablet) → 4 kolom (desktop)

### 5.4 Mengapa Solusi (3 keunggulan)
1. **Pengalaman Lintas Industri** — Sudah menangani proyek dari retail, logistik, kesehatan, hingga manufaktur
2. **Teknologi Terkini, Kode Bersih** — Arsitektur modern, dokumentasi rapi, handover mudah
3. **Support Pasca-Launch** — Tidak selesai di deployment; kami kawal hingga produk stabil di tangan pengguna

### 5.5 Proses Kerja (5 langkah)
```
1. Konsultasi  →  2. Desain  →  3. Development  →  4. Deployment  →  5. Maintenance
```
Ditampilkan sebagai `<ol>` dengan counter CSS, bukan library eksternal.

### 5.6 Portofolio (6 proyek dummy)
| Proyek | Kategori | Stack |
|---|---|---|
| Sistem POS Warung | Web App | React, Node.js, PostgreSQL |
| Monitoring Greenhouse | IoT | ESP32, MQTT, React Dashboard |
| Deteksi Kualitas Produk | AI/ML | Python, TensorFlow, FastAPI |
| Aplikasi Delivery UMKM | Mobile | React Native, Firebase |
| Platform E-Learning | Web App | Astro, Supabase |
| Analitik Penjualan | AI/ML | Python, Pandas, Plotly |

### 5.7 Tech Stack
React · React Native · Node.js · Python · FastAPI · TensorFlow · PostgreSQL · MongoDB · ESP32 · MQTT · Docker · Vercel · Supabase

### 5.8 Testimoni (3 dummy)
1. **Budi Santoso** — CEO, WarungKita — *"Tim Solusi memahami kebutuhan kami sejak hari pertama..."*
2. **Rina Kusuma** — CTO, StartupLogistik — *"Kode yang mereka tulis bersih dan mudah kami lanjutkan sendiri..."*
3. **Hendra Wijaya** — Pemilik, Toko Hijau — *"Aplikasi kami selesai tepat waktu dan sesuai anggaran..."*

### 5.9 FAQ (7 pertanyaan)
1. Berapa biaya pembuatan aplikasi?
2. Berapa lama waktu pengerjaan?
3. Teknologi apa yang digunakan?
4. Apakah ada garansi setelah launch?
5. Bagaimana proses pembayaran?
6. Apakah ada NDA untuk kerahasiaan proyek?
7. Berapa banyak revisi yang disertakan?

Implementasi: `<details>/<summary>` native — zero JavaScript, accessible, SEO-friendly.

### 5.10 CTA Section
Background: `--accent-light` (`#f1f5f9`)
```
H2: "Siap Memulai Proyek Anda?"
P:  "Konsultasi pertama gratis. Ceritakan kebutuhan Anda,
     kami siapkan solusi yang tepat."
CTA: [Hubungi Kami Sekarang →]
```

### 5.11 Footer
3 kolom:
- Kiri: Logo + tagline
- Tengah: Navigasi (Layanan, Portofolio, Tentang, Kontak)
- Kanan: Email dummy, WhatsApp dummy, kota (Jakarta)

Copyright: `© 2025 Solusi. Hak cipta dilindungi.`

---

## 6. SEO

### 6.1 Meta Tags
```html
<title>Solusi — Jasa Pembuatan Aplikasi, Website, IoT & AI Indonesia</title>
<meta name="description" content="Solusi adalah mitra teknologi terpercaya untuk UMKM, startup, dan enterprise Indonesia. Kami membangun aplikasi mobile, website, sistem IoT, dan solusi AI yang scalable.">
<meta name="keywords" content="jasa pembuatan aplikasi, jasa pembuatan website, jasa IoT Indonesia, konsultan AI, developer aplikasi custom, software house Indonesia">
<meta name="author" content="Solusi">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://solusi.id/">
```

### 6.2 Open Graph & Twitter Cards
```html
<meta property="og:type" content="website">
<meta property="og:title" content="Solusi — Jasa Pembuatan Aplikasi & Software Indonesia">
<meta property="og:description" content="...">
<meta property="og:url" content="https://solusi.id/">
<meta property="og:image" content="https://solusi.id/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```

### 6.3 JSON-LD Schemas
| Schema | Keterangan |
|---|---|
| `Organization` | Nama, URL, kontak, sosmed |
| `Service` × 4 | Satu per layanan, `provider` → Organization |
| `LocalBusiness` | Jakarta, area layanan Indonesia |
| `FAQPage` | Dibangun dari array konstanta yang sama dengan komponen FAQ |
| `BreadcrumbList` | Homepage saja (single-page) |

### 6.4 Teknis SEO
- `sitemap.xml` — via `@astrojs/sitemap`, generate otomatis
- `robots.txt` — allow all, cantumkan URL sitemap
- Hierarki heading: H1 hanya 1x di Hero, H2 per section, H3 di dalam section
- `alt` wajib untuk semua `<img>`
- `loading="lazy"` untuk semua gambar non-hero
- Anchor links antar section (`#layanan`, `#portofolio`, `#kontak`)

---

## 7. Konten Dummy (Kontak)

| Field | Nilai Dummy |
|---|---|
| Email | halo@solusi.id |
| WhatsApp | +62 812-3456-7890 |
| Kota | Jakarta, Indonesia |
| Domain | https://solusi.id |

---

## 8. Target Kualitas

| Metrik | Target |
|---|---|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 95+ |
| Lighthouse SEO | 100 |
| JS dikirim ke browser | 0 KB (zero hydration) |
| Render-blocking resources | 0 |

---

## 9. Out of Scope (Iterasi Berikutnya)

- Halaman terpisah per layanan (`/layanan/mobile-app`)
- Astro Content Collections untuk portofolio
- Form kontak fungsional (butuh backend/Formspree)
- Dark mode
- Animasi scroll (Intersection Observer)
- i18n (Inggris/Indonesia toggle)
