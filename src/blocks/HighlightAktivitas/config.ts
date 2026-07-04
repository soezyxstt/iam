import type { Block } from 'payload'

export const HighlightAktivitas: Block = {
  slug: 'highlightActivities',
  labels: {
    singular: 'Highlight Aktivitas',
    plural: 'Highlight Aktivitas',
  },
  fields: [
    {
      name: 'sectionTitle',
      label: 'Judul Section',
      type: 'text',
      required: true,
    },
    {
      name: 'activities',
      label: 'Aktivitas Pilihan',
      type: 'relationship',
      relationTo: 'activities',
      hasMany: true,
      maxRows: 3,
      required: true,
      admin: {
        description:
          'Maksimal 3. Buat entri di Organisasi & Kegiatan → Aktivitas dulu; kartu memakai Gambar Utama dan Ringkasan dari entri tersebut.',
      },
    },
  ],
}
