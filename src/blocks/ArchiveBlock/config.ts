import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Konten Pembuka',
    },
    {
      name: 'populateBy',
      label: 'Sumber Data',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Otomatis (berita terbaru)',
          value: 'collection',
        },
        {
          label: 'Pilihan Manual',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'posts',
      label: 'Koleksi yang Ditampilkan',
      options: [
        {
          label: 'Berita',
          value: 'posts',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        description: 'Kosongkan untuk menampilkan semua kategori.',
      },
      hasMany: true,
      label: 'Filter Kategori',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Jumlah Berita',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Pilihan Berita',
      relationTo: ['posts'],
    },
  ],
  labels: {
    plural: 'Daftar Berita (Archive)',
    singular: 'Daftar Berita (Archive)',
  },
}
