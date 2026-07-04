import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: 'Media (Gambar/Video)',
    plural: 'Media (Gambar/Video)',
  },
  fields: [
    {
      name: 'media',
      label: 'Media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Pilih gambar/video dari Media Library. Caption pada entri Media ikut tampil.',
      },
    },
  ],
}
