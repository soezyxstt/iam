import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    label: 'Lebar Kolom',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'Sepertiga (1/3)',
        value: 'oneThird',
      },
      {
        label: 'Setengah (1/2)',
        value: 'half',
      },
      {
        label: 'Dua Pertiga (2/3)',
        value: 'twoThirds',
      },
      {
        label: 'Penuh',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    label: 'Aktifkan Tautan',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    singular: 'Konten Kolom',
    plural: 'Konten Kolom',
  },
  fields: [
    {
      name: 'columns',
      label: 'Kolom',
      labels: {
        singular: 'Kolom',
        plural: 'Kolom',
      },
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
