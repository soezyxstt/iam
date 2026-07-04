import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Tipe Hero',
      options: [
        {
          label: 'Tanpa Hero',
          value: 'none',
        },
        {
          label: 'High Impact (layar penuh + gambar)',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact (besar + gambar)',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact (teks saja)',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
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
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      label: 'Gambar Latar',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
        description: 'Gunakan gambar resolusi tinggi (lebar ≥ 1920px).',
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
