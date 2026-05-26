# Prompt: Landing Page Solusi — Software Development Studio

Gunakan prompt ini untuk generate ulang project di model lain.

---

## Prompt

Buatkan landing page profesional menggunakan **Astro.js** untuk bisnis jasa pengembangan software bernama **Solusi** dengan spesifikasi berikut. Ikuti semua detail tanpa exception.

---

### Informasi Bisnis

- **Nama:** Solusi
- **Tagline:** Solusi Digital End-to-End untuk Bisnis Modern
- **Layanan:** Aplikasi Mobile, Website & Web App, Sistem IoT, AI & Machine Learning
- **Target:** UMKM, Startup, Enterprise di Indonesia
- **Kontak dummy:** halo@solusi.id · +62 812-3456-7890 · Jakarta, Indonesia
- **Domain:** https://solusi.id

---

### Stack Teknologi

```
astro@^4.16.19          ← pin ke v4, bukan v5
@astrojs/sitemap@^2     ← tambahkan override: { "sitemap": "7.1.1" } di package.json
@astrojs/tailwind@^5    ← applyBaseStyles: false
tailwindcss@^3
typescript (strict)
```

**`astro.config.mjs`:**
```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://solusi.id',
  integrations: [
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
});
```

---

### Struktur File

```
src/
  data/
    faq.ts              ← single source of truth untuk FAQ (dipakai komponen & JSON-LD)
  layouts/
    BaseLayout.astro    ← semua <head>: meta, OG, Twitter, JSON-LD
  components/
    Header.astro
    Hero.astro
    Services.astro
    WhyUs.astro
    Process.astro
    Portfolio.astro
    TechStack.astro
    Testimonials.astro
    FAQ.astro
    CTASection.astro
    Footer.astro
  pages/
    index.astro         ← merakit semua komponen
  styles/
    global.css          ← CSS variables + reset + nav a rule
public/
  robots.txt
  favicon.svg           ← SVG monogram "S"
```

---

### Design Philosophy — WAJIB DIIKUTI

**1. Classic Classless + Timeless + Modern Layout**
- Tampilan seperti dokumen monospace yang well-written
- Layout tetap modern: sticky navbar horizontal, grid cards, section spacing yang generous
- TIDAK ada gradient, animasi berlebihan, shadow tebal, atau warna mencolok

**2. Typography — Monospace Penuh**
```css
--font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro',
             Menlo, Consolas, 'Courier New', monospace;
```
Gunakan untuk SEMUA teks: heading, body, nav, buttons, tags, semua.

**3. Warna — Muted Neutral**
```css
--bg:       #ffffff;
--surface:  #f6f6f6;   /* alternating section background */
--text:     #111111;
--subtext:  #666666;
--muted:    #999999;
--border:   #dedede;
--accent:   #2d2d2d;

/* Aliases untuk backward compat komponen */
--font-heading:  var(--font-mono);
--font-body:     var(--font-mono);
--accent-light:  var(--surface);
```

**4. Aturan Link `<a>` — PALING PENTING**

> **Body/content `<a>` tags → BIARKAN BROWSER DEFAULT sepenuhnya.**
> Jangan tambahkan `color:`, `text-decoration:`, atau styling apapun pada selector `a {}` di global.css.

Satu-satunya exception yang diperbolehkan di global.css:
```css
/* Nav links = UI chrome, bukan content */
nav a {
  color: inherit;
  text-decoration: none;
}
nav a:hover { text-decoration: underline; }
```

Tombol CTA (`.btn-primary`, `.btn-ghost`, dll.) adalah **UI control**, bukan text link, jadi boleh punya `text-decoration: none`, `background`, `color` sendiri.

**5. Tailwind — Hanya untuk Layout**
Boleh digunakan:
- Responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Flexbox: `flex items-center justify-between gap-6`
- Container: `max-w-5xl mx-auto`
- Spacing: `py-12 mt-8 gap-4`

TIDAK boleh digunakan:
- Warna: `bg-slate-*`, `text-gray-*`, `border-blue-*`
- Shadow: `shadow-*`
- Typography: `font-mono` (gunakan CSS variable)

---

### `src/styles/global.css`

```css
/* Reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img { max-width: 100%; height: auto; display: block; }
ul, ol { list-style: none; }

/* Tokens */
:root {
  --bg: #ffffff; --surface: #f6f6f6; --text: #111111;
  --subtext: #666666; --muted: #999999; --border: #dedede; --accent: #2d2d2d;
  --font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'Courier New', monospace;
  --font-heading: var(--font-mono); --font-body: var(--font-mono);
  --accent-light: var(--surface);
  --max-w: 72rem; --px: 1.5rem;
}

/* Base */
html { scroll-behavior: smooth; }
body { font-family: var(--font-mono); color: var(--text); background: var(--bg); line-height: 1.8; font-size: 0.9375rem; }
h1, h2, h3, h4 { font-family: var(--font-mono); line-height: 1.3; color: var(--text); font-weight: bold; }

/* Nav links = UI chrome */
nav a { color: inherit; text-decoration: none; }
nav a:hover { text-decoration: underline; }

/* Layout */
.container { max-width: var(--max-w); margin-inline: auto; padding-inline: var(--px); }
section { padding-block: 5rem; }
section:nth-child(even) { background: var(--surface); }
```

---

### Komponen: Header.astro

Sticky navbar. Logo kiri, nav kanan.

```astro
<header>
  <div class="container flex items-center justify-between py-4">
    <a href="/" class="logo" aria-label="Solusi — Beranda">Solusi</a>
    <nav aria-label="Navigasi utama">
      <ul class="flex items-center gap-8">
        <li><a href="#layanan">Layanan</a></li>
        <li><a href="#portofolio">Portofolio</a></li>
        <li><a href="#tentang">Tentang</a></li>
        <li><a href="#kontak">Kontak</a></li>
        <li><a href="#kontak" class="nav-cta">Konsultasi</a></li>
      </ul>
    </nav>
  </div>
</header>
```

CSS (scoped `<style>`):
- `header`: `position: sticky; top: 0; z-index: 100; background: var(--bg); border-bottom: 1px solid var(--border);`
- `.logo`: bold, uppercase, `letter-spacing: 0.1em`, `font-size: 1rem`, `text-decoration: none`, `color: var(--text)`
- `nav a`: `font-size: 0.8rem; color: var(--subtext);`
- `nav a:hover`: `color: var(--text); text-decoration: none;`
- `.nav-cta`: bordered pill, `border: 1px solid var(--border); padding: 0.35rem 0.9rem; font-weight: bold; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.06em; color: var(--text);`
- `.nav-cta:hover`: `background: var(--text); color: var(--bg); border-color: var(--text);`
- Mobile `@media (max-width: 640px)`: hide `.nav-cta`, reduce gap dan font-size

---

### Komponen: Hero.astro

```astro
<section id="hero" aria-labelledby="hero-heading">
  <div class="container">
    <p class="eyebrow">Software Development Studio</p>
    <h1 id="hero-heading">Kami Bantu Bisnis Anda<br />Tumbuh dengan Teknologi</h1>
    <p class="lead">Dari aplikasi mobile hingga sistem AI — Solusi hadir sebagai
    mitra teknis jangka panjang untuk UMKM, startup, dan enterprise.</p>
    <div class="actions flex flex-wrap gap-3 mt-10">
      <a href="#kontak" class="btn-primary">Mulai Konsultasi Gratis →</a>
      <a href="#portofolio" class="btn-ghost">Lihat Portofolio</a>
    </div>
  </div>
</section>
```

CSS:
- `#hero`: `padding-block: 7rem 5rem;`
- `.eyebrow`: `font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--muted); margin-bottom: 1.5rem;`
- `h1`: `font-size: clamp(1.75rem, 4.5vw, 3rem); max-width: 20ch;`
- `.lead`: `font-size: 0.9375rem; color: var(--subtext); max-width: 52ch;`
- `.btn-primary`: `background: var(--text); color: var(--bg); text-decoration: none; padding: 0.65rem 1.4rem; font-weight: bold; font-size: 0.8rem;`
- `.btn-primary:hover`: `background: var(--accent);`
- `.btn-ghost`: `border: 1px solid var(--border); color: var(--text); text-decoration: none; padding: 0.65rem 1.4rem;`
- `.btn-ghost:hover`: `background: var(--surface); border-color: var(--text);`
- Keduanya: `focus-visible { outline: 2px solid var(--text); outline-offset: 3px; }`

---

### Komponen: Services.astro

4 service cards dalam grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`.

Data:
```js
const services = [
  { title: 'Aplikasi Mobile',     icon: '📱', description: 'iOS & Android native/cross-platform dengan React Native atau Flutter.' },
  { title: 'Website & Web App',   icon: '🌐', description: 'Landing page cepat hingga aplikasi web kompleks.' },
  { title: 'Sistem IoT',          icon: '🔌', description: 'Hardware, firmware ESP32, MQTT, dashboard monitoring real-time.' },
  { title: 'AI & Machine Learning', icon: '🤖', description: 'Model prediktif, computer vision, NLP untuk bisnis.' },
];
```

Card CSS:
- `border: 1px solid var(--border); padding: 1.5rem; background: var(--bg);`
- `.icon`: `font-size: 2rem; display: block; margin-bottom: 0.75rem;` dengan `aria-hidden="true"`
- `h3`: `font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.5rem;`
- `p`: `color: var(--subtext); font-size: 0.875rem; line-height: 1.7;`

---

### Komponen: WhyUs.astro

3 keunggulan dalam grid `grid-cols-1 md:grid-cols-3`, section `id="tentang"`.

Data:
1. **Pengalaman Lintas Industri** — retail, logistik, kesehatan, manufaktur
2. **Teknologi Terkini, Kode Bersih** — arsitektur modern, dokumentasi rapi, handover mudah
3. **Support Pasca-Launch** — monitoring dan hotfix pasca deployment

CSS h3: `border-left: 3px solid var(--accent); padding-left: 0.75rem;`

---

### Komponen: Process.astro

5 langkah `<ol>`, horizontal di md+. Section `id="proses"`.

Data: Konsultasi → Desain → Development → Deployment → Maintenance

Step number: `<span class="step-num">` dengan `border: 2px solid var(--accent); color: var(--accent);`, size 2.5rem × 2.5rem, centered. **Jangan pakai `aria-hidden` pada step-num** — angka ini penting untuk screen reader. **Jangan pakai `role="list"` pada `<ol>`** — ini akan merusak semantik ordered list.

---

### Komponen: Portfolio.astro

6 project cards dalam grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, section `id="portofolio"`.

Data:
```js
const projects = [
  { title: 'Sistem POS Warung',      category: 'Web App',  stack: 'React, Node.js, PostgreSQL',        description: 'Aplikasi kasir untuk warung makan dengan laporan penjualan harian.' },
  { title: 'Monitoring Greenhouse',   category: 'IoT',      stack: 'ESP32, MQTT, React Dashboard',      description: 'Sensor suhu, kelembaban, cahaya untuk greenhouse pertanian urban.' },
  { title: 'Deteksi Kualitas Produk', category: 'AI / ML',  stack: 'Python, TensorFlow, FastAPI',       description: 'Computer vision deteksi cacat produk di lini produksi, akurasi 96.4%.' },
  { title: 'Aplikasi Delivery UMKM',  category: 'Mobile',   stack: 'React Native, Firebase',            description: 'Pesan-antar untuk warung lokal dengan pelacakan kurir real-time.' },
  { title: 'Platform E-Learning',     category: 'Web App',  stack: 'Astro, Supabase',                   description: 'Kursus online dengan video streaming, kuis, sertifikat otomatis.' },
  { title: 'Analitik Penjualan',      category: 'AI / ML',  stack: 'Python, Pandas, Plotly',            description: 'Prediksi tren penjualan berbasis ML untuk retailer multi-cabang.' },
];
```

Card CSS:
- `border: 1px solid var(--border); padding: 1.5rem; background: var(--bg); display: flex; flex-direction: column; gap: 0.5rem;`
- `.badge`: `background: var(--surface); color: var(--accent); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.2rem 0.6rem; align-self: flex-start;`
- `.stack`: `margin-top: auto; padding-top: 0.5rem; border-top: 1px solid var(--border);`
- `.stack small`: `font-family: var(--font-mono); font-size: 0.75rem; color: var(--muted);`

---

### Komponen: TechStack.astro

15 tag dalam `flex flex-wrap gap-3`, section `id="teknologi"`.

Data: React · React Native · Node.js · Python · FastAPI · TensorFlow · PostgreSQL · MongoDB · ESP32 · MQTT · Docker · Vercel · Supabase · Flutter · TypeScript

Tag CSS: `border: 1px solid var(--border); padding: 0.35rem 0.9rem; font-family: var(--font-mono); font-size: 0.8rem;`

---

### Komponen: Testimonials.astro

3 testimonial dalam grid `grid-cols-1 md:grid-cols-3`, section `id="testimoni"`.

Data:
```js
const testimonials = [
  { quote: 'Tim Solusi memahami kebutuhan kami sejak hari pertama. Mereka tidak hanya menulis kode — mereka benar-benar memikirkan bisnis kami.', name: 'Budi Santoso',  role: 'CEO, WarungKita' },
  { quote: 'Kode yang mereka tulis bersih dan mudah kami lanjutkan sendiri. Dokumentasinya lengkap, onboarding developer baru jadi jauh lebih cepat.',  name: 'Rina Kusuma',  role: 'CTO, StartupLogistik' },
  { quote: 'Aplikasi kami selesai tepat waktu dan sesuai anggaran. Yang paling berkesan: mereka tetap responsif bahkan setelah proyek selesai.', name: 'Hendra Wijaya', role: 'Pemilik, Toko Hijau' },
];
```

Markup:
```html
<li>
  <blockquote>
    <p>"{t.quote}"</p>
    <footer>
      <cite><strong>{t.name}</strong><br /><small>{t.role}</small></cite>
    </footer>
  </blockquote>
</li>
```

CSS blockquote: `border-left: 3px solid var(--accent); padding-left: 1.25rem;`

---

### Komponen: FAQ.astro

7 FAQ menggunakan `<details>/<summary>` native — **zero JavaScript**.

**PENTING — struktur HTML yang valid:**
```html
<div class="faq-list" role="list">
  {faqs.map(f => (
    <div class="faq-item" role="listitem">
      <details>
        <summary>{f.q}</summary>
        <p class="faq-answer">{f.a}</p>
      </details>
    </div>
  ))}
</div>
```

> ⚠️ JANGAN gunakan `<dl>` sebagai wrapper `<details>` — itu HTML invalid.

Data FAQ diambil dari **`src/data/faq.ts`** (file terpisah) dan diimport ke komponen ini DAN ke BaseLayout.astro untuk JSON-LD. Pastikan jawaban identik di keduanya.

CSS:
```css
summary::-webkit-details-marker { display: none; }
summary::marker { display: none; }        /* Firefox */
summary::after { content: '+'; color: var(--accent); }
details[open] summary::after { content: '−'; }
.faq-item { border-bottom: 1px solid var(--border); }
.faq-item:first-child { border-top: 1px solid var(--border); }
```

---

### Komponen: CTASection.astro

Section `id="kontak"`, background `var(--surface)`.

```html
<h2>Siap Memulai Proyek Anda?</h2>
<p>Konsultasi pertama gratis dan tanpa komitmen...</p>
<a href="mailto:halo@solusi.id" class="btn-primary">Kirim Email →</a>
<a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer" class="btn-ghost">WhatsApp Kami</a>
<small>📍 Jakarta, Indonesia · halo@solusi.id · +62 812-3456-7890</small>
```

Tombol sama dengan Hero: `btn-primary` (near-black) dan `btn-ghost` (bordered).

---

### Komponen: Footer.astro

**Background LIGHT** (`var(--surface)`) dengan `border-top: 1px solid var(--border)`. JANGAN dark background — browser-default link color tidak terbaca di dark bg.

3 kolom `grid-cols-1 md:grid-cols-3`:
1. Logo + tagline
2. Nav links (#layanan, #portofolio, #tentang, #kontak)
3. Address: email, WhatsApp (`target="_blank"`), kota

CSS footer TIDAK boleh override warna link — biarkan browser default.

```css
footer { background: var(--surface); border-top: 1px solid var(--border); }
.logo { font-weight: bold; color: var(--text); /* bukan link */ }
h3 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); }
```

Copyright: `© {new Date().getFullYear()} Solusi. Hak cipta dilindungi.`

---

### BaseLayout.astro — SEO Lengkap

**CSS Import:** gunakan `import '../styles/global.css';` di frontmatter — BUKAN `<link>` tag.

**Canonical URL:** `Astro.site ? new URL(Astro.url.pathname, Astro.site).href : 'https://solusi.id/'`

**JSON-LD Schemas (8 total):**
1. Organization
2. LocalBusiness
3. Service × 4 (Mobile, Web, IoT, AI)
4. FAQPage — data dari `import { faqData } from '../data/faq.ts'`
5. BreadcrumbList

**Meta tags wajib:**
```html
<title>Solusi — Jasa Pembuatan Aplikasi, Website, IoT & AI Indonesia</title>
<meta name="description" content="Solusi adalah mitra teknologi terpercaya...">
<meta name="keywords" content="jasa pembuatan aplikasi, jasa pembuatan website, jasa IoT Indonesia, konsultan AI, developer aplikasi custom, software house Indonesia">
<meta name="robots" content="index, follow">
<link rel="canonical" href={canonicalURL}>
<!-- Open Graph: og:type, og:title, og:description, og:url, og:image, og:locale (id_ID), og:site_name -->
<!-- Twitter Card: twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image -->
```

---

### `src/data/faq.ts`

```typescript
export interface FAQItem { q: string; a: string; }

export const faqData: FAQItem[] = [
  { q: 'Berapa biaya pembuatan aplikasi?',    a: 'Biaya bergantung pada kompleksitas fitur, platform, dan timeline. Kami mulai dengan estimasi gratis.' },
  { q: 'Berapa lama waktu pengerjaan?',        a: 'Sederhana 2–4 minggu, menengah 1–3 bulan, kompleks 3–6 bulan. Timeline ditetapkan di awal.' },
  { q: 'Teknologi apa yang digunakan?',        a: 'React/React Native, Node.js, Python, FastAPI, TensorFlow, PostgreSQL, MongoDB, ESP32, Docker — sesuai kebutuhan.' },
  { q: 'Apakah ada garansi setelah launch?',   a: 'Ya, garansi bug-fix minimal 30 hari pasca-deployment tanpa biaya tambahan.' },
  { q: 'Bagaimana proses pembayaran?',         a: 'DP 50% di awal, 50% setelah selesai. Untuk proyek besar bisa per milestone.' },
  { q: 'Apakah ada NDA?',                      a: 'Ya, kami siap menandatangani NDA sebelum proyek dimulai.' },
  { q: 'Berapa banyak revisi?',                a: '2 putaran revisi per fase (desain dan development) tanpa biaya tambahan.' },
];
```

---

### `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://solusi.id/sitemap-index.xml
```

### `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#2d2d2d" rx="4"/>
  <text x="16" y="23" font-family="monospace" font-size="20" font-weight="bold"
        text-anchor="middle" fill="#ffffff">S</text>
</svg>
```

---

### `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import WhyUs from '../components/WhyUs.astro';
import Process from '../components/Process.astro';
import Portfolio from '../components/Portfolio.astro';
import TechStack from '../components/TechStack.astro';
import Testimonials from '../components/Testimonials.astro';
import FAQ from '../components/FAQ.astro';
import CTASection from '../components/CTASection.astro';
import Footer from '../components/Footer.astro';
---
<BaseLayout>
  <Header />
  <main id="main-content">
    <Hero />
    <Services />
    <WhyUs />
    <Process />
    <Portfolio />
    <TechStack />
    <Testimonials />
    <FAQ />
    <CTASection />
  </main>
  <Footer />
</BaseLayout>
```

---

### Checklist Verifikasi Setelah Build

Jalankan `npm run build` lalu cek:

```bash
# H1 hanya muncul sekali
grep -o '<h1[^>]*>' dist/index.html | wc -l   # → 1

# Semua section IDs ada
grep -o 'id="[^"]*"' dist/index.html | sort -u

# JSON-LD schema types
grep -o '"@type":"[^"]*"' dist/index.html | sort -u
# → harus ada: Organization, LocalBusiness, Service, FAQPage, BreadcrumbList

# Zero JavaScript dikirim ke browser
find dist/_astro -name "*.js" 2>/dev/null | wc -l   # → 0

# Sitemap terbentuk
ls dist/sitemap*.xml
```

---

### Hal yang HARUS DIHINDARI

| ❌ Jangan | ✅ Lakukan |
|---|---|
| `a { color: ...; }` di global.css | Biarkan browser default untuk body links |
| `<dl>` membungkus `<details>` | `<div role="list">` → `<div role="listitem">` → `<details>` |
| Dark footer | Light footer (`var(--surface)`) supaya link terbaca |
| FAQ data duplikat di BaseLayout & FAQ.astro | Import dari `src/data/faq.ts` di keduanya |
| `role="list"` pada `<ol>` Process | Hapus — merusak semantik ordered list |
| `aria-hidden` pada step number | Hapus — angka langkah penting untuk screen reader |
| Tailwind color utilities (`bg-slate-*`, `text-gray-*`) | Semua warna via CSS variables |
| `!important` pada color | Naikkan specificity selector |
| `og:image` tanpa file fisiknya | Buat `public/og-image.png` (1200×630px) sebelum deploy |
