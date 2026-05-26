# Deployment

## Vercel (Recommended)

1. Push repo ke GitHub.
2. Buka vercel.com → New Project → Import repo.
3. Framework: **Astro** (auto-detected).
4. Environment Variables: tidak diperlukan.
5. Deploy. Vercel menyediakan HTTPS + CDN secara otomatis.

## Netlify

1. Push repo ke GitHub.
2. netlify.com → New Site → Import from Git.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy.

## Post-Deploy SEO Checklist

- [ ] Update `canonicalURL` dan `site` di `astro.config.mjs` dengan domain asli
- [ ] Buat `public/og-image.png` (1200×630px) — gambar preview untuk sharing sosial
- [ ] Submit `sitemap-index.xml` ke Google Search Console
- [ ] Verifikasi JSON-LD di Google Rich Results Test (https://search.google.com/test/rich-results)
- [ ] Jalankan Lighthouse di Chrome DevTools (target: 95+ semua kategori)
- [ ] Isi `sameAs` array di Organization schema (`src/layouts/BaseLayout.astro`) dengan akun sosmed resmi
- [ ] Ganti kontak dummy (halo@solusi.id, +62 812-3456-7890) dengan kontak asli
- [ ] Ganti nama brand dummy di semua komponen dengan nama brand asli
