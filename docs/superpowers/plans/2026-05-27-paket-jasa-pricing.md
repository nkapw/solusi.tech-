# Paket Jasa (Pricing) Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Paket Jasa" pricing section to the Solusi landing page with three service packages (Starter, Professional, Enterprise), displayed in a responsive three-column card grid with zero JavaScript.

**Architecture:** A single `Pricing.astro` component contains package data as a typed array in the frontmatter and renders a three-column grid using Tailwind utility classes for layout and scoped CSS for card styling. The component is inserted between `<Services />` and `<WhyUs />` in `index.astro`.

**Tech Stack:** Astro.js v4, Tailwind CSS v3 (layout only), scoped CSS (card styles), existing CSS design tokens (`--border`, `--text`, `--subtext`, `--muted`, `--bg`, `--surface`).

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/components/Pricing.astro` | Render pricing cards — data + markup + scoped styles |
| Modify | `src/pages/index.astro` | Import and insert `<Pricing />` between Services and WhyUs |

---

### Task 1: Create the Pricing component

**Files:**
- Create: `src/components/Pricing.astro`

- [ ] **Step 1: Create `src/components/Pricing.astro` with this exact content**

```astro
---
// src/components/Pricing.astro

interface Package {
  id: string;
  name: string;
  price: string;
  highlight: boolean;
  badge?: string;
  features: string[];
}

const packages: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Rp 5.000.000',
    highlight: false,
    features: [
      '1 platform (web atau mobile)',
      'Desain dari template pilihan',
      'Fitur dasar sesuai brief',
      '30 hari garansi bug-fix',
      'Source code diserahkan',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 'Rp 25.000.000',
    highlight: true,
    badge: 'Paling Populer',
    features: [
      'Semua yang ada di Starter',
      'Desain UI custom (bukan template)',
      'Integrasi API pihak ketiga',
      'Panel admin / dashboard',
      '60 hari garansi bug-fix',
      'Dokumentasi teknis',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Rp 100.000.000',
    highlight: false,
    features: [
      'Semua yang ada di Professional',
      'AI, IoT, atau sistem kompleks',
      'Dedicated project manager',
      'SLA & priority support',
      'Training tim klien',
      'NDA + kerahasiaan penuh',
    ],
  },
];
---
<section id="paket" aria-labelledby="paket-heading">
  <div class="container">
    <p class="section-label">Paket Jasa</p>
    <h2 id="paket-heading">Pilih Paket yang Tepat</h2>
    <p class="section-sub">Semua paket dapat dikustomisasi sesuai kebutuhan proyek Anda.</p>
    <div class="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {packages.map(pkg => (
        <article class={`pricing-card${pkg.highlight ? ' pricing-card--highlight' : ''}`}>
          {pkg.badge && (
            <p class="badge" aria-label="Paket yang paling banyak dipilih">{pkg.badge}</p>
          )}
          <h3>{pkg.name}</h3>
          <p class="price-label">mulai dari</p>
          <p class="price">{pkg.price}</p>
          <ul class="feature-list" role="list">
            {pkg.features.map(f => (
              <li>
                <span aria-hidden="true">✓</span> {f}
              </li>
            ))}
          </ul>
          <a href="#kontak" class="cta-link">Hubungi Kami →</a>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .section-sub { color: var(--subtext); margin-top: 0.5rem; }

  .pricing-grid { align-items: start; }

  .pricing-card {
    border: 1px solid var(--border);
    padding: 2rem;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .pricing-card--highlight {
    border: 2px solid var(--text);
  }

  .badge {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--muted);
    margin-bottom: 0.75rem;
  }

  h3 {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    font-weight: bold;
    color: var(--text);
    margin-bottom: 0.5rem;
  }

  .price-label {
    font-size: 0.75rem;
    color: var(--subtext);
    margin-bottom: 0.15rem;
  }

  .price {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: bold;
    color: var(--text);
    margin-bottom: 1.5rem;
  }

  .feature-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 2rem;
  }

  .feature-list li {
    font-size: 0.9rem;
    color: var(--subtext);
    line-height: 1.5;
  }

  .feature-list li span {
    color: var(--text);
    font-weight: bold;
    margin-right: 0.35rem;
  }

  /* CTA link styled as btn-secondary (matches CTASection pattern) */
  .cta-link {
    display: inline-block;
    border: 1px solid var(--text);
    color: var(--text);
    text-decoration: none;
    padding: 0.6rem 1.25rem;
    font-family: var(--font-body);
    font-size: 0.875rem;
    text-align: center;
    align-self: stretch;
  }

  .cta-link:hover {
    background: var(--surface);
  }

  .cta-link:focus-visible {
    outline: 2px solid var(--text);
    outline-offset: 3px;
  }
</style>
```

- [ ] **Step 2: Verify the file was created**

```bash
ls src/components/Pricing.astro
```
Expected output: `src/components/Pricing.astro`

---

### Task 2: Insert Pricing into the page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Open `src/pages/index.astro` and add the import**

Add this line after the `import Services` line (line 6):

```astro
import Pricing from '../components/Pricing.astro';
```

- [ ] **Step 2: Insert `<Pricing />` between `<Services />` and `<WhyUs />`**

Replace:
```astro
    <Services />
    <WhyUs />
```

With:
```astro
    <Services />
    <Pricing />
    <WhyUs />
```

- [ ] **Step 3: Verify the updated file looks correct**

The frontmatter imports block should now be:
```astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Pricing from '../components/Pricing.astro';
import WhyUs from '../components/WhyUs.astro';
import Process from '../components/Process.astro';
import Portfolio from '../components/Portfolio.astro';
import TechStack from '../components/TechStack.astro';
import Testimonials from '../components/Testimonials.astro';
import FAQ from '../components/FAQ.astro';
import CTASection from '../components/CTASection.astro';
import Footer from '../components/Footer.astro';
```

---

### Task 3: Build and verify

**Files:** none new

- [ ] **Step 1: Run the dev server and check for errors**

```bash
npm run build 2>&1 | tail -20
```

Expected: build completes with `0 errors`. If errors appear, check that `Pricing.astro` has no syntax issues and that the import path in `index.astro` matches exactly `'../components/Pricing.astro'`.

- [ ] **Step 2: Manual smoke-check (optional but recommended)**

```bash
npm run dev
```

Open `http://localhost:4321` and verify:
- "Paket Jasa" section appears between Services and WhyUs
- Three cards render side-by-side on a wide viewport
- Professional card has a thicker border than the other two
- "Paling Populer" label appears above the Professional card header
- "Hubungi Kami →" links resolve to `#kontak`
- On a narrow viewport (< 768px) cards stack vertically

- [ ] **Step 3: Commit**

```bash
git add src/components/Pricing.astro src/pages/index.astro
git commit -m "feat: add paket jasa pricing section

Three-column pricing cards (Starter / Professional / Enterprise)
with feature checklists and CTA links to #kontak. Zero JS.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
