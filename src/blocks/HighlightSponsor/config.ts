import type { Block } from 'payload'

export const HighlightSponsor: Block = {
  slug: 'highlightSponsors',
  labels: {
    singular: 'Highlight Sponsor',
    plural: 'Highlight Sponsor',
  },
  fields: [
    {
      name: 'sectionTitle',
      label: 'Judul Section',
      type: 'text',
      required: true,
    },
    {
      name: 'sponsors',
      label: 'Sponsor Pilihan',
      type: 'relationship',
      relationTo: 'sponsors',
      hasMany: true,
      required: true,
    },
  ],
}
