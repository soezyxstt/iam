import type { Block } from 'payload'

export const HighlightLowongan: Block = {
  slug: 'highlightJobVacancies',
  labels: {
    singular: 'Highlight Lowongan',
    plural: 'Highlight Lowongan',
  },
  fields: [
    {
      name: 'sectionTitle',
      label: 'Judul Section',
      type: 'text',
      required: true,
    },
    {
      name: 'vacancies',
      label: 'Lowongan Pilihan',
      type: 'relationship',
      relationTo: 'jobVacancies',
      hasMany: true,
      maxRows: 6,
      required: true,
      admin: {
        description:
          'Maksimal 6. Hanya lowongan berstatus Published yang tampil di situs — lowongan draft tidak akan muncul.',
      },
    },
  ],
}
