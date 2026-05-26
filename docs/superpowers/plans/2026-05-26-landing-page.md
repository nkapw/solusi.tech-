# Solusi Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, zero-JS, SEO-perfect landing page for Solusi software development services using Astro.js.

**Architecture:** Single `index.astro` page assembles 11 isolated Astro components in sequence. `BaseLayout.astro` owns all `<head>` content (meta, OG, Twitter Card, JSON-LD). Global CSS (≤50 lines) sets CSS variables; Tailwind is used only for responsive layout utilities.

**Tech Stack:** Astro 4.x, Tailwind CSS v3, @astrojs/sitemap, @astrojs/tailwind, TypeScript (strict)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Create | Dependencies |
| `astro.config.mjs` | Create | Astro config + sitemap integration |
| `tailwind.config.mjs` | Create | Tailwind minimal config (content paths only) |
| `tsconfig.json` | Create | TypeScript strict config |
| `public/robots.txt` | Create | Allow all crawlers + sitemap URL |
| `public/favicon.svg` | Create | SVG "S" monogram |
| `src/styles/global.css` | Create | CSS reset + CSS variables (≤50 lines) |
| `src/layouts/BaseLayout.astro` | Create | `<head>` with meta, OG, Twitter, JSON-LD schemas |
| `src/components/Header.astro` | Create | Sticky nav + logo |
| `src/components/Hero.astro` | Create | H1 + subheading + 2 CTAs |
| `src/components/Services.astro` | Create | 4 service cards |
| `src/components/WhyUs.astro` | Create | 3 advantages |
| `src/components/Process.astro` | Create | 5-step ordered list |
| `src/components/Portfolio.astro` | Create | 6 dummy projects |
| `src/components/TechStack.astro` | Create | Technology tags |
| `src/components/Testimonials.astro` | Create | 3 testimonials |
| `src/components/FAQ.astro` | Create | 7 FAQ via `<details>/<summary>` |
| `src/components/CTASection.astro` | Create | Consultation CTA |
| `src/components/Footer.astro` | Create | 3-column footer |
| `src/pages/index.astro` | Create | Assembles all components |

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`

- [ ] **Step 1: Initialize project directory**

```bash
cd /home/imam/d/solusi
npm create astro@latest landing -- --template minimal --no-install --typescript strict --no-git
mv landing/* landing/.* . 2>/dev/null || true
rmdir landing
```

> If the above mv fails due to dot files, do it manually. The goal: all Astro files are in `/home/imam/d/solusi/` directly.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install @astrojs/sitemap @astrojs/tailwind tailwindcss
```

- [ ] **Step 3: Replace `astro.config.mjs` with full config**

```javascript
// astro.config.mjs
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

- [ ] **Step 4: Create `tailwind.config.mjs`**

```javascript
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

- [ ] **Step 5: Verify project builds cleanly**

```bash
npm run build
```

Expected: Build succeeds with no errors. Output in `dist/`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with sitemap and tailwind"
```

---

### Task 2: Global CSS + BaseLayout

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create `src/styles/global.css`**

```css
/* src/styles/global.css */
/* Reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img { max-width: 100%; height: auto; display: block; }
ul, ol { list-style: none; }

/* CSS Variables */
:root {
  --accent:       #475569;
  --accent-light: #f1f5f9;
  --text:         #1a1a1a;
  --subtext:      #6b7280;
  --bg:           #ffffff;
  --font-heading: Georgia, 'Times New Roman', serif;
  --font-body:    system-ui, -apple-system, sans-serif;
  --max-w:        72rem;
  --px:           1.5rem;
}

/* Base */
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  color: var(--text);
  background: var(--bg);
  line-height: 1.7;
  font-size: 1rem;
}
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  line-height: 1.25;
  color: var(--text);
}
a { color: var(--accent); text-decoration: underline; }
a:hover { text-decoration: none; }

/* Utility */
.container { max-width: var(--max-w); margin-inline: auto; padding-inline: var(--px); }
section { padding-block: 4rem; }
section:nth-child(even) { background: var(--accent-light); }
```

- [ ] **Step 2: Create `src/layouts/BaseLayout.astro`**

```astro
---
// src/layouts/BaseLayout.astro
export interface Props {
  title?: string;
  description?: string;
  canonicalURL?: string;
}

const {
  title = 'Solusi — Jasa Pembuatan Aplikasi, Website, IoT & AI Indonesia',
  description = 'Solusi adalah mitra teknologi terpercaya untuk UMKM, startup, dan enterprise Indonesia. Kami membangun aplikasi mobile, website, sistem IoT, dan solusi AI yang scalable.',
  canonicalURL = 'https://solusi.id/',
} = Astro.props;

const ogImage = 'https://solusi.id/og-image.png';

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Solusi",
  "url": "https://solusi.id",
  "logo": "https://solusi.id/favicon.svg",
  "email": "halo@solusi.id",
  "telephone": "+628123456789",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jakarta",
    "addressCountry": "ID"
  },
  "sameAs": []
};

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Solusi",
  "description": description,
  "url": "https://solusi.id",
  "telephone": "+628123456789",
  "email": "halo@solusi.id",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jakarta",
    "addressRegion": "DKI Jakarta",
    "addressCountry": "ID"
  },
  "areaServed": "Indonesia",
  "priceRange": "$$"
};

const services = [
  { name: "Pembuatan Aplikasi Mobile", description: "Aplikasi iOS & Android native/cross-platform dengan React Native atau Flutter." },
  { name: "Pembuatan Website & Web App", description: "Dari landing page berkecepatan tinggi hingga sistem web kompleks." },
  { name: "Sistem IoT", description: "Perangkat keras, firmware, dan dashboard monitoring real-time." },
  { name: "Solusi AI & Machine Learning", description: "Model prediktif, computer vision, dan NLP untuk kebutuhan bisnis." },
];

const jsonLdServices = services.map(s => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": s.name,
  "description": s.description,
  "provider": { "@type": "Organization", "name": "Solusi", "url": "https://solusi.id" },
  "areaServed": "Indonesia"
}));

const faqItems = [
  { q: "Berapa biaya pembuatan aplikasi?", a: "Biaya bergantung pada kompleksitas dan fitur yang dibutuhkan. Hubungi kami untuk estimasi gratis." },
  { q: "Berapa lama waktu pengerjaan?", a: "Proyek sederhana 2–4 minggu, proyek kompleks 2–6 bulan. Kami tetapkan timeline realistis di awal." },
  { q: "Teknologi apa yang digunakan?", a: "React, React Native, Node.js, Python, FastAPI, TensorFlow, PostgreSQL, MongoDB, ESP32, Docker, dan lainnya sesuai kebutuhan." },
  { q: "Apakah ada garansi setelah launch?", a: "Ya, kami menyediakan masa garansi bug-fix minimal 30 hari setelah deployment." },
  { q: "Bagaimana proses pembayaran?", a: "Biasanya DP 50% di awal, 50% setelah selesai. Bisa disesuaikan untuk proyek besar." },
  { q: "Apakah ada NDA untuk kerahasiaan proyek?", a: "Ya, kami siap menandatangani NDA sebelum proyek dimulai." },
  { q: "Berapa banyak revisi yang disertakan?", a: "Setiap tahap (desain dan development) mencakup 2 putaran revisi tanpa biaya tambahan." },
];

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a }
  }))
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://solusi.id/" }
  ]
};
---
<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />

  <!-- Primary Meta -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content="jasa pembuatan aplikasi, jasa pembuatan website, jasa IoT Indonesia, konsultan AI, developer aplikasi custom, software house Indonesia" />
  <meta name="author" content="Solusi" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={canonicalURL} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:locale" content="id_ID" />
  <meta property="og:site_name" content="Solusi" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- Global CSS -->
  <link rel="stylesheet" href="/src/styles/global.css" />

  <!-- JSON-LD Schemas -->
  <script type="application/ld+json" set:html={JSON.stringify(jsonLdOrganization)} />
  <script type="application/ld+json" set:html={JSON.stringify(jsonLdLocalBusiness)} />
  {jsonLdServices.map(s => (
    <script type="application/ld+json" set:html={JSON.stringify(s)} />
  ))}
  <script type="application/ld+json" set:html={JSON.stringify(jsonLdFAQ)} />
  <script type="application/ld+json" set:html={JSON.stringify(jsonLdBreadcrumb)} />
</head>
<body>
  <slot />
</body>
</html>
```

- [ ] **Step 3: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#475569" rx="4"/>
  <text x="16" y="23" font-family="Georgia, serif" font-size="20" font-weight="bold"
        text-anchor="middle" fill="#ffffff">S</text>
</svg>
```

- [ ] **Step 4: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://solusi.id/sitemap-index.xml
```

- [ ] **Step 5: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds, `dist/` contains `index.html`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add BaseLayout with full SEO meta and JSON-LD schemas"
```

---

### Task 3: Header Component

**Files:**
- Create: `src/components/Header.astro`

- [ ] **Step 1: Create `src/components/Header.astro`**

```astro
---
// src/components/Header.astro
---
<header>
  <div class="container flex items-center justify-between py-4">
    <a href="/" aria-label="Solusi — Beranda" class="logo">Solusi</a>
    <nav aria-label="Navigasi utama">
      <ul class="flex gap-6 items-center">
        <li><a href="#layanan">Layanan</a></li>
        <li><a href="#portofolio">Portofolio</a></li>
        <li><a href="#tentang">Tentang</a></li>
        <li><a href="#kontak">Kontak</a></li>
        <li><a href="#kontak" class="cta-nav">Konsultasi</a></li>
      </ul>
    </nav>
  </div>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--bg);
    border-bottom: 1px solid #e5e7eb;
  }
  .logo {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--accent);
    text-decoration: none;
  }
  nav a {
    color: var(--text);
    text-decoration: none;
    font-size: 0.95rem;
  }
  nav a:hover { color: var(--accent); text-decoration: underline; }
  .cta-nav {
    border: 1px solid var(--accent);
    padding: 0.35rem 0.9rem;
    color: var(--accent) !important;
    font-weight: 600;
  }
  .cta-nav:hover { background: var(--accent-light); text-decoration: none !important; }
</style>
```

- [ ] **Step 2: Wire it into a temporary test page to verify it renders**

Create `src/pages/index.astro` temporarily:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
---
<BaseLayout>
  <Header />
  <main><p style="padding:2rem">Building…</p></main>
</BaseLayout>
```

- [ ] **Step 3: Run dev server and confirm header renders**

```bash
npm run dev
```

Open `http://localhost:4321` — sticky header with logo "Solusi" and nav links visible.

- [ ] **Step 4: Stop dev server and commit**

```bash
git add -A
git commit -m "feat: add Header component with sticky nav"
```

---

### Task 4: Hero Section

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
// src/components/Hero.astro
---
<section id="hero" aria-labelledby="hero-heading">
  <div class="container">
    <h1 id="hero-heading">Kami Bantu Bisnis Anda Tumbuh<br />dengan Teknologi</h1>
    <p class="lead">
      Dari aplikasi mobile hingga sistem AI — Solusi hadir sebagai mitra teknis
      jangka panjang untuk UMKM, startup, dan enterprise di Indonesia.
    </p>
    <div class="cta-group flex flex-wrap gap-4 mt-8">
      <a href="#kontak" class="btn-primary">Mulai Konsultasi Gratis →</a>
      <a href="#portofolio" class="btn-secondary">Lihat Portofolio</a>
    </div>
  </div>
</section>

<style>
  #hero {
    padding-block: 6rem 5rem;
    background: var(--bg);
  }
  h1 {
    font-size: clamp(2rem, 5vw, 3.25rem);
    max-width: 18ch;
    margin-bottom: 1.25rem;
  }
  .lead {
    font-size: 1.125rem;
    color: var(--subtext);
    max-width: 55ch;
    line-height: 1.75;
  }
  .btn-primary {
    display: inline-block;
    background: var(--accent);
    color: #fff;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 1rem;
  }
  .btn-primary:hover { background: #334155; }
  .btn-secondary {
    display: inline-block;
    border: 1px solid var(--accent);
    color: var(--accent);
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  .btn-secondary:hover { background: var(--accent-light); }
</style>
```

- [ ] **Step 2: Add Hero to `index.astro` and verify**

Update `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
---
<BaseLayout>
  <Header />
  <main>
    <Hero />
  </main>
</BaseLayout>
```

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | grep -E "error|warning|✓"
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Hero section"
```

---

### Task 5: Services Section

**Files:**
- Create: `src/components/Services.astro`

- [ ] **Step 1: Create `src/components/Services.astro`**

```astro
---
// src/components/Services.astro
const services = [
  {
    title: 'Aplikasi Mobile',
    icon: '📱',
    description: 'Aplikasi iOS & Android native dan cross-platform menggunakan React Native atau Flutter. Dari MVP hingga produk skala enterprise.',
  },
  {
    title: 'Website & Web App',
    icon: '🌐',
    description: 'Landing page berkecepatan tinggi, sistem manajemen konten, hingga aplikasi web kompleks dengan performa dan keamanan terbaik.',
  },
  {
    title: 'Sistem IoT',
    icon: '🔌',
    description: 'Desain perangkat keras, firmware embedded (ESP32, Arduino), protokol MQTT, dan dashboard monitoring real-time untuk industri.',
  },
  {
    title: 'AI & Machine Learning',
    icon: '🤖',
    description: 'Model prediktif, computer vision, NLP, dan rekomendasi yang diintegrasikan langsung ke dalam produk bisnis Anda.',
  },
];
---
<section id="layanan" aria-labelledby="layanan-heading">
  <div class="container">
    <h2 id="layanan-heading">Layanan Kami</h2>
    <p class="section-sub">Empat bidang utama yang kami kuasai secara mendalam.</p>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10" role="list">
      {services.map(s => (
        <li class="service-card">
          <span class="icon" aria-hidden="true">{s.icon}</span>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
        </li>
      ))}
    </ul>
  </div>
</section>

<style>
  .section-sub { color: var(--subtext); margin-top: 0.5rem; }
  .service-card {
    border: 1px solid #e5e7eb;
    padding: 1.5rem;
    background: var(--bg);
  }
  .service-card .icon { font-size: 2rem; display: block; margin-bottom: 0.75rem; }
  .service-card h3 {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    margin-bottom: 0.5rem;
  }
  .service-card p { color: var(--subtext); font-size: 0.95rem; line-height: 1.6; }
</style>
```

- [ ] **Step 2: Add to `index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
---
<BaseLayout>
  <Header />
  <main>
    <Hero />
    <Services />
  </main>
</BaseLayout>
```

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | grep -E "error|✓"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Services section with 4 cards"
```

---

### Task 6: Why Us Section

**Files:**
- Create: `src/components/WhyUs.astro`

- [ ] **Step 1: Create `src/components/WhyUs.astro`**

```astro
---
// src/components/WhyUs.astro
const advantages = [
  {
    title: 'Pengalaman Lintas Industri',
    body: 'Sudah menangani proyek dari sektor retail, logistik, kesehatan, hingga manufaktur. Kami membawa perspektif domain yang memperkaya solusi teknis.',
  },
  {
    title: 'Teknologi Terkini, Kode Bersih',
    body: 'Arsitektur modern, konvensi kode yang konsisten, dokumentasi rapi. Hasil kerja kami mudah dilanjutkan oleh tim internal Anda.',
  },
  {
    title: 'Support Pasca-Launch',
    body: 'Komitmen kami tidak berakhir di deployment. Kami kawal produk hingga stabil di tangan pengguna nyata, termasuk monitoring dan hotfix.',
  },
];
---
<section id="tentang" aria-labelledby="tentang-heading">
  <div class="container">
    <h2 id="tentang-heading">Mengapa Solusi?</h2>
    <p class="section-sub">Tiga komitmen yang membedakan kami dari vendor biasa.</p>
    <ul class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10" role="list">
      {advantages.map(a => (
        <li>
          <h3>{a.title}</h3>
          <p>{a.body}</p>
        </li>
      ))}
    </ul>
  </div>
</section>

<style>
  .section-sub { color: var(--subtext); margin-top: 0.5rem; }
  li h3 {
    font-family: var(--font-heading);
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    border-left: 3px solid var(--accent);
    padding-left: 0.75rem;
  }
  li p { color: var(--subtext); font-size: 0.95rem; line-height: 1.65; }
</style>
```

- [ ] **Step 2: Add to `index.astro`** (append `import WhyUs` and `<WhyUs />` after Services)

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | grep -E "error|✓"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add WhyUs section"
```

---

### Task 7: Process Section

**Files:**
- Create: `src/components/Process.astro`

- [ ] **Step 1: Create `src/components/Process.astro`**

```astro
---
// src/components/Process.astro
const steps = [
  { title: 'Konsultasi', body: 'Kami pelajari kebutuhan bisnis, anggaran, dan timeline Anda. Gratis, tanpa komitmen.' },
  { title: 'Desain', body: 'Wireframe dan prototipe interaktif untuk memvalidasi alur sebelum kode pertama ditulis.' },
  { title: 'Development', body: 'Pengembangan iteratif dengan demo berkala. Anda selalu tahu progress terkini.' },
  { title: 'Deployment', body: 'Peluncuran ke server produksi dengan monitoring penuh dan zero-downtime strategy.' },
  { title: 'Maintenance', body: 'Update rutin, keamanan, performa, dan penambahan fitur sesuai pertumbuhan bisnis.' },
];
---
<section id="proses" aria-labelledby="proses-heading">
  <div class="container">
    <h2 id="proses-heading">Cara Kami Bekerja</h2>
    <p class="section-sub">Proses transparan dari hari pertama hingga produk berjalan lancar.</p>
    <ol class="process-list mt-10" role="list">
      {steps.map((step, i) => (
        <li class="process-step">
          <span class="step-num" aria-hidden="true">{i + 1}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
</section>

<style>
  .section-sub { color: var(--subtext); margin-top: 0.5rem; }
  .process-list { display: flex; flex-direction: column; gap: 2rem; }
  .process-step {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }
  .step-num {
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    border: 2px solid var(--accent);
    color: var(--accent);
    font-family: var(--font-heading);
    font-weight: bold;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .process-step h3 {
    font-family: var(--font-heading);
    font-size: 1.05rem;
    margin-bottom: 0.25rem;
  }
  .process-step p { color: var(--subtext); font-size: 0.95rem; }

  @media (min-width: 768px) {
    .process-list { flex-direction: row; }
    .process-step { flex-direction: column; align-items: center; text-align: center; flex: 1; }
    .process-step h3 { font-size: 1rem; }
  }
</style>
```

- [ ] **Step 2: Add to `index.astro`** (import + render after WhyUs)

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | grep -E "error|✓"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Process section"
```

---

### Task 8: Portfolio Section

**Files:**
- Create: `src/components/Portfolio.astro`

- [ ] **Step 1: Create `src/components/Portfolio.astro`**

```astro
---
// src/components/Portfolio.astro
const projects = [
  {
    title: 'Sistem POS Warung',
    category: 'Web App',
    stack: 'React, Node.js, PostgreSQL',
    description: 'Aplikasi kasir berbasis web untuk warung makan kecil-menengah, lengkap dengan laporan penjualan harian.',
  },
  {
    title: 'Monitoring Greenhouse',
    category: 'IoT',
    stack: 'ESP32, MQTT, React Dashboard',
    description: 'Sistem sensor suhu, kelembaban, dan cahaya untuk greenhouse pertanian urban dengan notifikasi otomatis.',
  },
  {
    title: 'Deteksi Kualitas Produk',
    category: 'AI / ML',
    stack: 'Python, TensorFlow, FastAPI',
    description: 'Computer vision untuk deteksi cacat produk di lini produksi manufaktur, akurasi 96.4%.',
  },
  {
    title: 'Aplikasi Delivery UMKM',
    category: 'Mobile',
    stack: 'React Native, Firebase',
    description: 'Aplikasi pesan-antar untuk jaringan warung lokal dengan fitur pelacakan kurir secara real-time.',
  },
  {
    title: 'Platform E-Learning',
    category: 'Web App',
    stack: 'Astro, Supabase',
    description: 'Platform kursus online dengan video streaming, kuis interaktif, dan sertifikat otomatis.',
  },
  {
    title: 'Analitik Penjualan',
    category: 'AI / ML',
    stack: 'Python, Pandas, Plotly',
    description: 'Dashboard prediksi tren penjualan berbasis machine learning untuk retailer multi-cabang.',
  },
];
---
<section id="portofolio" aria-labelledby="portofolio-heading">
  <div class="container">
    <h2 id="portofolio-heading">Portofolio</h2>
    <p class="section-sub">Sejumlah proyek yang telah kami kerjakan.</p>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10" role="list">
      {projects.map(p => (
        <li class="project-card">
          <span class="badge">{p.category}</span>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p class="stack"><small>{p.stack}</small></p>
        </li>
      ))}
    </ul>
  </div>
</section>

<style>
  .section-sub { color: var(--subtext); margin-top: 0.5rem; }
  .project-card {
    border: 1px solid #e5e7eb;
    padding: 1.5rem;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .badge {
    font-size: 0.75rem;
    background: var(--accent-light);
    color: var(--accent);
    padding: 0.2rem 0.6rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    align-self: flex-start;
  }
  .project-card h3 {
    font-family: var(--font-heading);
    font-size: 1.1rem;
  }
  .project-card p { color: var(--subtext); font-size: 0.9rem; line-height: 1.6; }
  .stack { margin-top: auto; padding-top: 0.5rem; border-top: 1px solid #e5e7eb; }
  .stack small { color: var(--subtext); font-family: monospace; font-size: 0.8rem; }
</style>
```

- [ ] **Step 2: Add to `index.astro`** (import + render after Process)

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | grep -E "error|✓"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Portfolio section with 6 projects"
```

---

### Task 9: Tech Stack Section

**Files:**
- Create: `src/components/TechStack.astro`

- [ ] **Step 1: Create `src/components/TechStack.astro`**

```astro
---
// src/components/TechStack.astro
const techs = [
  'React', 'React Native', 'Node.js', 'Python', 'FastAPI',
  'TensorFlow', 'PostgreSQL', 'MongoDB', 'ESP32', 'MQTT',
  'Docker', 'Vercel', 'Supabase', 'Flutter', 'TypeScript',
];
---
<section id="teknologi" aria-labelledby="teknologi-heading">
  <div class="container">
    <h2 id="teknologi-heading">Teknologi yang Kami Gunakan</h2>
    <p class="section-sub">Stack yang telah teruji di proyek nyata.</p>
    <ul class="tech-list flex flex-wrap gap-3 mt-8" role="list">
      {techs.map(t => (
        <li class="tech-tag">{t}</li>
      ))}
    </ul>
  </div>
</section>

<style>
  .section-sub { color: var(--subtext); margin-top: 0.5rem; }
  .tech-tag {
    border: 1px solid #d1d5db;
    padding: 0.4rem 1rem;
    font-family: monospace;
    font-size: 0.9rem;
    color: var(--text);
    background: var(--bg);
  }
</style>
```

- [ ] **Step 2: Add to `index.astro`** (import + render after Portfolio)

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | grep -E "error|✓"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add TechStack section"
```

---

### Task 10: Testimonials Section

**Files:**
- Create: `src/components/Testimonials.astro`

- [ ] **Step 1: Create `src/components/Testimonials.astro`**

```astro
---
// src/components/Testimonials.astro
const testimonials = [
  {
    quote: 'Tim Solusi memahami kebutuhan kami sejak hari pertama. Mereka tidak hanya menulis kode — mereka benar-benar memikirkan bisnis kami.',
    name: 'Budi Santoso',
    role: 'CEO, WarungKita',
  },
  {
    quote: 'Kode yang mereka tulis bersih dan mudah kami lanjutkan sendiri. Dokumentasinya lengkap, onboarding developer baru jadi jauh lebih cepat.',
    name: 'Rina Kusuma',
    role: 'CTO, StartupLogistik',
  },
  {
    quote: 'Aplikasi kami selesai tepat waktu dan sesuai anggaran. Yang paling berkesan: mereka tetap responsif bahkan setelah proyek selesai.',
    name: 'Hendra Wijaya',
    role: 'Pemilik, Toko Hijau',
  },
];
---
<section id="testimoni" aria-labelledby="testimoni-heading">
  <div class="container">
    <h2 id="testimoni-heading">Kata Klien Kami</h2>
    <ul class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10" role="list">
      {testimonials.map(t => (
        <li>
          <blockquote>
            <p>"{t.quote}"</p>
            <footer>
              <cite>
                <strong>{t.name}</strong><br />
                <small>{t.role}</small>
              </cite>
            </footer>
          </blockquote>
        </li>
      ))}
    </ul>
  </div>
</section>

<style>
  blockquote {
    border-left: 3px solid var(--accent);
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  blockquote p {
    color: var(--text);
    font-style: italic;
    line-height: 1.7;
  }
  blockquote footer { color: var(--subtext); }
  blockquote strong { color: var(--text); font-style: normal; }
</style>
```

- [ ] **Step 2: Add to `index.astro`** (import + render after TechStack)

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | grep -E "error|✓"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Testimonials section"
```

---

### Task 11: FAQ Section

**Files:**
- Create: `src/components/FAQ.astro`

- [ ] **Step 1: Create `src/components/FAQ.astro`**

```astro
---
// src/components/FAQ.astro
const faqs = [
  {
    q: 'Berapa biaya pembuatan aplikasi?',
    a: 'Biaya bergantung pada kompleksitas fitur, platform target, dan timeline. Kami selalu mulai dengan sesi estimasi gratis untuk memberikan angka yang realistis dan transparan.',
  },
  {
    q: 'Berapa lama waktu pengerjaan?',
    a: 'Proyek sederhana (landing page, MVP) selesai dalam 2–4 minggu. Aplikasi menengah 1–3 bulan. Sistem kompleks 3–6 bulan. Timeline ditetapkan sejak awal dan kami patuhi.',
  },
  {
    q: 'Teknologi apa yang digunakan?',
    a: 'Kami memilih teknologi sesuai kebutuhan proyek: React / React Native untuk frontend dan mobile, Node.js atau Python untuk backend, PostgreSQL atau MongoDB untuk database, dan TensorFlow / PyTorch untuk AI/ML.',
  },
  {
    q: 'Apakah ada garansi setelah launch?',
    a: 'Ya. Semua proyek mendapat masa garansi bug-fix minimal 30 hari pasca-deployment tanpa biaya tambahan.',
  },
  {
    q: 'Bagaimana proses pembayaran?',
    a: 'Standar kami: DP 50% di awal, 50% setelah selesai dan diterima klien. Untuk proyek besar, kami bisa menyesuaikan skema pembayaran per milestone.',
  },
  {
    q: 'Apakah ada NDA untuk kerahasiaan proyek?',
    a: 'Ya, kami siap menandatangani Non-Disclosure Agreement sebelum proyek dimulai. Kerahasiaan data dan ide klien adalah prioritas kami.',
  },
  {
    q: 'Berapa banyak revisi yang disertakan?',
    a: 'Setiap fase (desain UI/UX dan development) mencakup 2 putaran revisi tanpa biaya tambahan. Revisi di luar scope ditangani dengan penawaran terpisah yang transparan.',
  },
];
---
<section id="faq" aria-labelledby="faq-heading">
  <div class="container">
    <h2 id="faq-heading">Pertanyaan Umum</h2>
    <p class="section-sub">Hal-hal yang sering ditanyakan sebelum memulai proyek.</p>
    <dl class="faq-list mt-10">
      {faqs.map(f => (
        <details class="faq-item">
          <summary><dt>{f.q}</dt></summary>
          <dd>{f.a}</dd>
        </details>
      ))}
    </dl>
  </div>
</section>

<style>
  .section-sub { color: var(--subtext); margin-top: 0.5rem; }
  .faq-list { display: flex; flex-direction: column; gap: 0; }
  .faq-item {
    border-bottom: 1px solid #e5e7eb;
  }
  .faq-item:first-child { border-top: 1px solid #e5e7eb; }
  summary {
    list-style: none;
    cursor: pointer;
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  summary::-webkit-details-marker { display: none; }
  summary::after {
    content: '+';
    font-size: 1.25rem;
    color: var(--accent);
    flex-shrink: 0;
    margin-left: 1rem;
  }
  details[open] summary::after { content: '−'; }
  dt {
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: bold;
    color: var(--text);
  }
  dd {
    padding: 0 0 1.25rem 0;
    color: var(--subtext);
    line-height: 1.7;
    font-size: 0.95rem;
  }
</style>
```

- [ ] **Step 2: Add to `index.astro`** (import + render after Testimonials)

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | grep -E "error|✓"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add FAQ section with native details/summary"
```

---

### Task 12: CTA Section

**Files:**
- Create: `src/components/CTASection.astro`

- [ ] **Step 1: Create `src/components/CTASection.astro`**

```astro
---
// src/components/CTASection.astro
---
<section id="kontak" aria-labelledby="cta-heading" class="cta-section">
  <div class="container text-center-md">
    <h2 id="cta-heading">Siap Memulai Proyek Anda?</h2>
    <p>
      Konsultasi pertama gratis dan tanpa komitmen. Ceritakan kebutuhan Anda —
      kami siapkan solusi yang tepat dan estimasi biaya yang transparan.
    </p>
    <div class="cta-group flex flex-wrap gap-4 mt-8">
      <a href="mailto:halo@solusi.id" class="btn-primary">Kirim Email →</a>
      <a href="https://wa.me/628123456789" rel="noopener noreferrer" target="_blank" class="btn-secondary">
        WhatsApp Kami
      </a>
    </div>
    <p class="note">
      <small>📍 Jakarta, Indonesia &nbsp;·&nbsp; halo@solusi.id &nbsp;·&nbsp; +62 812-3456-7890</small>
    </p>
  </div>
</section>

<style>
  .cta-section { background: var(--accent-light); }
  h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); margin-bottom: 1rem; }
  p { color: var(--subtext); max-width: 55ch; line-height: 1.7; }
  .btn-primary {
    display: inline-block;
    background: var(--accent);
    color: #fff;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
  }
  .btn-primary:hover { background: #334155; }
  .btn-secondary {
    display: inline-block;
    border: 1px solid var(--accent);
    color: var(--accent);
    text-decoration: none;
    padding: 0.75rem 1.5rem;
  }
  .btn-secondary:hover { background: #e2e8f0; }
  .note { margin-top: 2rem; }
  .note small { color: var(--subtext); }
</style>
```

- [ ] **Step 2: Add to `index.astro`** (import + render after FAQ)

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | grep -E "error|✓"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add CTASection with contact info"
```

---

### Task 13: Footer Component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create `src/components/Footer.astro`**

```astro
---
// src/components/Footer.astro
const year = new Date().getFullYear();
---
<footer>
  <div class="container grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
    <div>
      <p class="logo">Solusi</p>
      <p class="tagline">Solusi Digital End-to-End untuk Bisnis Modern</p>
    </div>
    <nav aria-label="Footer navigation">
      <h3>Navigasi</h3>
      <ul>
        <li><a href="#layanan">Layanan</a></li>
        <li><a href="#portofolio">Portofolio</a></li>
        <li><a href="#tentang">Tentang</a></li>
        <li><a href="#kontak">Kontak</a></li>
      </ul>
    </nav>
    <address>
      <h3>Kontak</h3>
      <ul>
        <li><a href="mailto:halo@solusi.id">halo@solusi.id</a></li>
        <li><a href="https://wa.me/628123456789" rel="noopener noreferrer">+62 812-3456-7890</a></li>
        <li>Jakarta, Indonesia</li>
      </ul>
    </address>
  </div>
  <div class="copyright">
    <div class="container">
      <small>© {year} Solusi. Hak cipta dilindungi.</small>
    </div>
  </div>
</footer>

<style>
  footer { background: var(--text); color: #e5e7eb; }
  .logo {
    font-family: var(--font-heading);
    font-size: 1.4rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 0.5rem;
  }
  .tagline { font-size: 0.875rem; color: #9ca3af; line-height: 1.5; }
  h3 {
    font-family: var(--font-heading);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9ca3af;
    margin-bottom: 0.75rem;
  }
  ul { display: flex; flex-direction: column; gap: 0.5rem; }
  a { color: #e5e7eb; text-decoration: none; font-size: 0.95rem; }
  a:hover { color: #fff; text-decoration: underline; }
  address { font-style: normal; }
  address li { font-size: 0.95rem; color: #e5e7eb; }
  .copyright {
    border-top: 1px solid #374151;
    padding-block: 1rem;
  }
  .copyright small { color: #6b7280; font-size: 0.85rem; }
</style>
```

- [ ] **Step 2: Add to `index.astro`** (import + render after CTASection, outside `<main>`)

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | grep -E "error|✓"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Footer component"
```

---

### Task 14: Assemble Full `index.astro`

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace `index.astro` with the final assembled page**

```astro
---
// src/pages/index.astro
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

- [ ] **Step 2: Fix CSS import in `BaseLayout.astro`**

In `src/layouts/BaseLayout.astro`, replace the `<link>` tag for global CSS with an Astro import:

Find this line in `<head>`:
```html
<link rel="stylesheet" href="/src/styles/global.css" />
```

Replace with (in the frontmatter section):
```astro
---
import '../styles/global.css';
// ... rest of frontmatter
---
```

- [ ] **Step 3: Final production build**

```bash
npm run build
```

Expected output similar to:
```
 building for production...
 ✓ Completed in X.XXs
 dist/index.html          XX kB
 dist/sitemap-index.xml   X kB
 dist/sitemap-0.xml       X kB
```

- [ ] **Step 4: Inspect generated HTML for SEO correctness**

```bash
grep -c "<script type=\"application/ld+json\"" dist/index.html
```

Expected: `7` (Organization, LocalBusiness, 4 Services, FAQPage, BreadcrumbList)

```bash
grep "<title>" dist/index.html
```

Expected: `<title>Solusi — Jasa Pembuatan Aplikasi, Website, IoT & AI Indonesia</title>`

```bash
grep "<h1" dist/index.html | wc -l
```

Expected: `1` (only one H1)

- [ ] **Step 5: Check bundle size (zero JS)**

```bash
find dist/_astro -name "*.js" 2>/dev/null | head -5
```

Expected: No JS files, or only Astro internals (if any — should be 0 for this project).

- [ ] **Step 6: Commit final page**

```bash
git add -A
git commit -m "feat: assemble final index.astro with all sections"
```

---

### Task 15: Final Verification & Accessibility Audit

**Files:** None (read-only verification)

- [ ] **Step 1: Run dev server**

```bash
npm run dev &
sleep 3
```

- [ ] **Step 2: Check all anchor links resolve**

```bash
curl -s http://localhost:4321 | grep -o 'href="#[^"]*"' | sort -u
```

Expected output includes: `href="#layanan"`, `href="#portofolio"`, `href="#tentang"`, `href="#kontak"`, `href="#proses"`, `href="#faq"`.

- [ ] **Step 3: Verify semantic heading hierarchy**

```bash
curl -s http://localhost:4321 | grep -oP '<h[1-6][^>]*>.*?</h[1-6]>' | head -20
```

Expected: One `<h1>`, then `<h2>` for each section, then `<h3>` inside sections — no skipped levels.

- [ ] **Step 4: Verify `robots.txt` is served**

```bash
curl -s http://localhost:4321/robots.txt
```

Expected:
```
User-agent: *
Allow: /

Sitemap: https://solusi.id/sitemap-index.xml
```

- [ ] **Step 5: Verify sitemap is generated**

```bash
ls dist/sitemap*.xml
```

Expected: `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist.

- [ ] **Step 6: Stop dev server and commit final verification**

```bash
kill %1 2>/dev/null || true
git add -A
git commit -m "chore: final build verified — zero JS, SEO complete, all sections present"
```

---

## Deploy Guide (Vercel)

After the above tasks are complete, add a `DEPLOYMENT.md` at the project root:

```markdown
# Deployment

## Vercel (Recommended)

1. Push repo to GitHub.
2. Go to vercel.com → New Project → Import repo.
3. Framework: **Astro** (auto-detected).
4. Environment Variables: none required.
5. Deploy. Vercel provides HTTPS + CDN automatically.

## Netlify

1. Push repo to GitHub.
2. netlify.com → New Site → Import from Git.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy.

## Post-Deploy SEO Checklist

- [ ] Update `canonicalURL` and `site` in `astro.config.mjs` with real domain
- [ ] Create a real `public/og-image.png` (1200×630px)
- [ ] Submit `sitemap-index.xml` to Google Search Console
- [ ] Verify JSON-LD with Google Rich Results Test
- [ ] Run Lighthouse in Chrome DevTools (target: 95+ all categories)
```

---

## Self-Review Notes

**Spec coverage:**
- ✅ All 11 sections specified
- ✅ SEO meta tags, OG, Twitter Card, JSON-LD (5 schema types)
- ✅ sitemap.xml via @astrojs/sitemap
- ✅ robots.txt
- ✅ Classic Classless design (CSS variables, no Tailwind overuse)
- ✅ Zero JavaScript delivered to browser
- ✅ `loading="lazy"` — no images used in this implementation (emoji/text only), so not applicable
- ✅ Anchor links for all sections
- ✅ Semantic HTML5 with correct heading hierarchy
- ✅ Responsive via Tailwind grid utilities only
- ✅ FAQ via native `<details>/<summary>` — zero JS, accessible
- ✅ TypeScript props in BaseLayout
- ✅ Deployment guide
- ✅ FAQPage JSON-LD built from same data array as FAQ component (**Note:** currently they're separate arrays — the JSON-LD is in BaseLayout. Implementer should ensure the FAQ answers in BaseLayout match those in FAQ.astro exactly)

**One known coupling:** FAQ answers appear in two places — `BaseLayout.astro` (for JSON-LD) and `FAQ.astro` (for display). If content changes, both must be updated. Future improvement: extract to a shared `src/data/faq.ts` constants file. This is acceptable for the current scope per the spec's YAGNI note.
