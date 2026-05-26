# Paket Jasa (Pricing) Section — Design Spec
Date: 2026-05-27

## Overview

Add a "Paket Jasa" section to the Solusi landing page presenting three service packages with pricing and feature checklists. The section follows the existing Classic Classless + monospace design system with zero JavaScript.

---

## Packages

### Starter — mulai dari Rp 5.000.000
1. 1 platform (web atau mobile)
2. Desain dari template pilihan
3. Fitur dasar sesuai brief
4. 30 hari garansi bug-fix
5. Source code diserahkan

### Professional — mulai dari Rp 25.000.000 *(Paling Populer)*
1. Semua yang ada di Starter
2. Desain UI custom (bukan template)
3. Integrasi API pihak ketiga
4. Panel admin / dashboard
5. 60 hari garansi bug-fix
6. Dokumentasi teknis

### Enterprise — mulai dari Rp 100.000.000
1. Semua yang ada di Professional
2. AI, IoT, atau sistem kompleks
3. Dedicated project manager
4. SLA & priority support
5. Training tim klien
6. NDA + kerahasiaan penuh

---

## Architecture

**New file:** `src/components/Pricing.astro`

Package data is defined as a typed array inside the component frontmatter — no separate data file needed (simple enough to keep co-located).

**Insertion point in `src/pages/index.astro`:** between `<Services />` and `<Process />`.

---

## Layout

Three-column grid on desktop (`repeat(3, 1fr)`), single-column stack on mobile (breakpoint: `48rem`).

```
Desktop:
┌──────────┐  ┌══════════╗  ┌──────────┐
│ Starter  │  ║Profesional║  │Enterprise│
│          │  ║Paling Pop.║  │          │
│ Rp 5jt   │  ║ Rp 25jt  ║  │ Rp 100jt │
│ mulai dr │  ║ mulai dr  ║  │ mulai dr │
│ ✓ fitur  │  ║ ✓ fitur   ║  │ ✓ fitur  │
│ [CTA]    │  ║ [CTA]     ║  │ [CTA]    │
└──────────┘  ╚══════════╝  └──────────┘
```

---

## Styling Rules

- **Design system:** uses existing CSS tokens only — no new variables
- **All cards:** `border: 1px solid var(--border)`, `padding: 2rem`, `background: var(--bg)`
- **Professional card (highlight):** `border: 2px solid var(--text)` — thicker border, no color difference
- **"Paling Populer" label:** `font-size: 0.7rem`, `text-transform: uppercase`, `letter-spacing: 0.12em`, `color: var(--muted)` — subtle, not loud
- **Price:** large (`clamp(1.5rem, 3vw, 2rem)`), bold; "mulai dari" label above in `var(--subtext)` at small size
- **Feature list:** `✓` prefix plain text, `color: var(--subtext)`, no custom bullet images
- **CTA button per card:** "Hubungi Kami →" links to `#kontak`, styled as `btn-secondary` (existing pattern from CTASection)
- **Zero JavaScript:** no interactivity, no hydration

---

## Accessibility

- Section wrapped in `<section id="paket" aria-labelledby="paket-heading">`
- Each card: semantic `<article>` with `<h3>` for package name
- Feature list: `<ul>` with `<li>` items (plain list semantics sufficient)
- CTA links: descriptive text + context from surrounding card heading

---

## No JSON-LD for pricing

Pricing schema (Offer/Product) is not added — pricing is indicative ("mulai dari") and may change. Adding structured data for non-exact prices risks misleading rich results.

---

## Out of Scope

- Currency switching
- Annual/monthly toggle
- Package comparison table
- Contact form embedded in card
