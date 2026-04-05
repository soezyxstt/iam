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
    },
  ],
}
