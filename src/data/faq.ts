// src/data/faq.ts
export interface FAQItem {
  q: string;
  a: string;
}

export const faqData: FAQItem[] = [
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
