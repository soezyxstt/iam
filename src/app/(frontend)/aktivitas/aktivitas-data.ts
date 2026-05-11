export type AktivitasEntry = {
  slug: string
  title: string
  excerpt: string
  /** Longer body for detail page (plain text paragraphs). */
  bodyParagraphs: string[]
}

export const AKTIVITAS_ENTRIES: AktivitasEntry[] = [
  {
    slug: 'kongres-iam-itb',
    title: 'Kongres IAM ITB',
    excerpt:
      'Forum tertinggi alumni untuk menyelaraskan arah organisasi, memilih kepemimpinan, dan memperkuat ikatan lintas angkatan.',
    bodyParagraphs: [
      'Kongres IAM ITB menjadi ruang keputusan strategis sekaligus perayaan kebersamaan alumni Teknik Mesin ITB. Peserta membahas program kerja, anggaran, dan kolaborasi dengan fakultas serta industri.',
      'Melalui diskusi panel dan sesi networking, kongres memastikan aspirasi angkatan muda dan senior tercermin dalam kebijakan organisasi untuk periode berikutnya.',
    ],
  },
  {
    slug: 'workshop-teknis',
    title: 'Workshop Teknis',
    excerpt:
      'Pelatihan berkala mengenai tren manufaktur, energi, dan otomasi agar alumni tetap relevan di lapangan profesional.',
    bodyParagraphs: [
      'Workshop menghadirkan praktisi dan akademisi untuk membahas studi kasus nyata: dari optimasi proses hingga integrasi digital di lantai produksi.',
      'Sesi dirancang interaktif dengan ruang tanya jawab dan kelompok kecil agar peserta dapat membawa solusi konkret ke tempat kerja masing-masing.',
    ],
  },
  {
    slug: 'gathering-alumni',
    title: 'Gathering Alumni',
    excerpt:
      'Silaturahmi informal antarangkatan untuk menjaga jejaring, berbagi kabar, dan merayakan solidaritas IAM.',
    bodyParagraphs: [
      'Gathering diadakan di berbagai kota dengan format santai namun tetap bermakna: ice breaking, permainan yell, dan sesi kenangan kampus.',
      'Acara ini menjadi pintu masuk bagi alumni baru yang ingin mengenal lebih dekat aktivitas IAM dan kontribusi sosialnya.',
    ],
  },
  {
    slug: 'bakti-sosial',
    title: 'Bakti Sosial',
    excerpt:
      'Program pengabdian masyarakat yang menyalurkan kepedulian alumni kepada sekitar kampus dan komunitas marginal.',
    bodyParagraphs: [
      'Tim relawan alumni bersama mahasiswa menyelenggarakan donor darah, bantuan pendidikan, dan renovasi fasilitas umum.',
      'Program ini memperkuat identitas IAM sebagai organisasi yang tidak hanya profesional, tetapi juga peduli pada lingkungan sekitar.',
    ],
  },
  {
    slug: 'mentoring-karier',
    title: 'Mentoring Karier',
    excerpt:
      'Menghubungkan alumni senior dengan junior untuk panduan jalur karier, wawancara kerja, dan pengembangan kepemimpinan.',
    bodyParagraphs: [
      'Mentor dan mentee dipasangkan berdasarkan minat industri dan pengalaman agar diskusi lebih terarah dan berdampak.',
      'Selain sesi one-on-one, tersedia webinar topik umum seperti negosiasi gaji dan transisi ke peran manajerial.',
    ],
  },
  {
    slug: 'kolaborasi-kampus',
    title: 'Kolaborasi Kampus',
    excerpt:
      'Sinergi dengan FTMD ITB untuk penelitian, beasiswa, dan kegiatan kemahasiswaan yang melibatkan alumni sebagai narasumber.',
    bodyParagraphs: [
      'IAM memfasilitasi alumni untuk kembali ke kelas tamu, juri kompetisi, dan pendanaan kegiatan riset mahasiswa.',
      'Kolaborasi ini menjaga tali persaudaraan antara dunia kampus dan industri serta memperkaya pengalaman belajar mahasiswa.',
    ],
  },
]

export function getAktivitasBySlug(slug: string): AktivitasEntry | undefined {
  return AKTIVITAS_ENTRIES.find((p) => p.slug === slug)
}
