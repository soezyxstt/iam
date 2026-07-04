import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Banner: Block = {
  slug: 'banner',
  fields: [
    {
      name: 'style',
      label: 'Gaya',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info (biru)', value: 'info' },
        { label: 'Peringatan (kuning)', value: 'warning' },
        { label: 'Penting (merah)', value: 'error' },
        { label: 'Sukses (hijau)', value: 'success' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: true,
    },
  ],
  interfaceName: 'BannerBlock',
}
