import type { Block } from 'payload'

export const HeroHeaderBlock: Block = {
  slug: 'heroHeader',
  interfaceName: 'HeroHeaderBlock',
  labels: {
    singular: 'Hero Header',
    plural: 'Hero Headers',
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'eyebrowStyle',
      label: 'Style Eyebrow',
      type: 'select',
      options: [
        { label: 'Gold', value: 'gold' },
        { label: 'Red Light', value: 'red-light' },
        { label: 'White', value: 'white' },
        { label: 'Muted', value: 'muted' },
      ],
      defaultValue: 'gold',
    },
    {
      name: 'title',
      label: 'Judul Utama',
      type: 'text',
      required: true,
    },
    {
      name: 'highlightText',
      label: 'Teks Sorotan (Highlight)',
      type: 'text',
    },
    {
      name: 'highlightStyle',
      label: 'Style Sorotan',
      type: 'select',
      options: [
        { label: 'Gold', value: 'gold' },
        { label: 'Gradient (Gold-Red-Gold)', value: 'gradient' },
        { label: 'Red Underline', value: 'red-underline' },
      ],
      defaultValue: 'gold',
    },
    {
      name: 'author',
      label: 'Penulis / Oleh (Opsional)',
      type: 'text',
    },
    {
      name: 'intro',
      label: 'Paragraf Pengantar',
      type: 'textarea',
      required: true,
    },
    {
      name: 'introStyle',
      label: 'Style Pengantar',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Italic & Serif (September-M Style)', value: 'italic' },
        { label: 'Large Serif (Solidarity Forever Style)', value: 'large-quote' },
      ],
      defaultValue: 'default',
    },
  ],
}

export const SplitContentBlock: Block = {
  slug: 'splitContent',
  interfaceName: 'SplitContentBlock',
  labels: {
    singular: 'Split Content (2 Kolom)',
    plural: 'Split Content (2 Kolom)',
  },
  fields: [
    {
      name: 'leftColumnType',
      label: 'Tipe Kolom Kiri',
      type: 'select',
      options: [
        { label: 'Judul Saja', value: 'title' },
        { label: 'Daftar Info (Metadata/Konteks)', value: 'info-list' },
      ],
      defaultValue: 'title',
    },
    // If leftColumnType == 'title'
    {
      name: 'leftTitleEyebrow',
      label: 'Eyebrow Kolom Kiri',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.leftColumnType === 'title',
      },
    },
    {
      name: 'leftTitleEyebrowStyle',
      label: 'Style Eyebrow Kolom Kiri',
      type: 'select',
      enumName: 'split_left_eyebrow_style',
      options: [
        { label: 'Gold', value: 'gold' },
        { label: 'Red Light', value: 'red-light' },
        { label: 'White', value: 'white' },
      ],
      defaultValue: 'gold',
      admin: {
        condition: (_, siblingData) => siblingData?.leftColumnType === 'title',
      },
    },
    {
      name: 'leftTitle',
      label: 'Judul Kolom Kiri',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.leftColumnType === 'title',
      },
    },
    {
      name: 'leftTitleHighlight',
      label: 'Teks Sorotan Kolom Kiri',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.leftColumnType === 'title',
      },
    },
    {
      name: 'leftTitleHighlightStyle',
      label: 'Style Sorotan Kolom Kiri',
      type: 'select',
      enumName: 'split_left_highlight_style',
      options: [
        { label: 'Gold', value: 'gold' },
        { label: 'Red Light', value: 'red-light' },
      ],
      defaultValue: 'red-light',
      admin: {
        condition: (_, siblingData) => siblingData?.leftColumnType === 'title',
      },
    },
    // If leftColumnType == 'info-list'
    {
      name: 'leftInfoItems',
      label: 'Daftar Item Info',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData?.leftColumnType === 'info-list',
      },
      fields: [
        {
          name: 'eyebrow',
          label: 'Eyebrow Info',
          type: 'text',
          required: true,
        },
        {
          name: 'eyebrowStyle',
          label: 'Style Eyebrow Info',
          type: 'select',
          enumName: 'split_left_info_eyebrow_style',
          options: [
            { label: 'Red Light', value: 'red-light' },
            { label: 'Gold', value: 'gold' },
            { label: 'White / Muted', value: 'white-muted' },
          ],
          defaultValue: 'red-light',
        },
        {
          name: 'title',
          label: 'Judul Info',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Keterangan Info',
          type: 'textarea',
          required: true,
        },
      ],
    },
    // Right Column
    {
      name: 'bodyText',
      label: 'Teks Utama (Kolom Kanan)',
      type: 'richText',
      required: true,
    },
  ],
}

export const DialogueBlock: Block = {
  slug: 'dialogue',
  interfaceName: 'DialogueBlock',
  labels: {
    singular: 'Yel-Yel / Dialog',
    plural: 'Yel-Yel / Dialog',
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow Kiri',
      type: 'text',
      required: true,
    },
    {
      name: 'eyebrowStyle',
      label: 'Style Eyebrow Kiri',
      type: 'select',
      options: [
        { label: 'Red Light', value: 'red-light' },
        { label: 'Gold', value: 'gold' },
        { label: 'White', value: 'white' },
      ],
      defaultValue: 'red-light',
    },
    {
      name: 'title',
      label: 'Judul Kiri',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Deskripsi Kiri',
      type: 'richText',
      required: true,
    },
    {
      name: 'dialogueItems',
      label: 'Daftar Dialog/Yel-yel (Kanan)',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'speaker',
          label: 'Pembicara / Aksi',
          type: 'text',
          required: true,
        },
        {
          name: 'speakerColor',
          label: 'Warna Pembicara',
          type: 'select',
          enumName: 'dial_speaker_color',
          options: [
            { label: 'Red Light', value: 'red-light' },
            { label: 'Gold', value: 'gold' },
            { label: 'White / Muted', value: 'white-muted' },
          ],
          defaultValue: 'red-light',
        },
        {
          name: 'speech',
          label: 'Isi Ucapan',
          type: 'text',
          required: true,
        },
        {
          name: 'speechColor',
          label: 'Warna Ucapan',
          type: 'select',
          enumName: 'dial_speech_color',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Gold', value: 'gold' },
            { label: 'Red Light', value: 'red-light' },
          ],
          defaultValue: 'white',
        },
        {
          name: 'subtext',
          label: 'Keterangan Tambahan (Opsional)',
          type: 'text',
        },
      ],
    },
  ],
}

export const PillarsBlock: Block = {
  slug: 'pillars',
  interfaceName: 'PillarsBlock',
  labels: {
    singular: 'Pilar Filosofi (Grid/List)',
    plural: 'Pilar Filosofi (Grid/List)',
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'eyebrowStyle',
      label: 'Style Eyebrow',
      type: 'select',
      options: [
        { label: 'Gold', value: 'gold' },
        { label: 'Red Light', value: 'red-light' },
        { label: 'White', value: 'white' },
      ],
      defaultValue: 'gold',
    },
    {
      name: 'title',
      label: 'Judul Bagian',
      type: 'text',
      required: true,
    },
    {
      name: 'displayStyle',
      label: 'Style Tampilan',
      type: 'select',
      options: [
        { label: '3 Kolom Horizontal (Genggam Mesin Style)', value: 'three-columns' },
        { label: 'Baris List dengan Metadata Kiri (Solidarity Forever Style)', value: 'rows-with-left-meta' },
      ],
      defaultValue: 'three-columns',
    },
    {
      name: 'pillars',
      label: 'Daftar Pilar',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'number',
          label: 'Nomor Pilar (e.g. 01)',
          type: 'text',
          required: true,
        },
        {
          name: 'numberStyle',
          label: 'Style Nomor',
          type: 'select',
          options: [
            { label: 'Red Light', value: 'red-light' },
            { label: 'Gold', value: 'gold' },
            { label: 'White / Muted', value: 'white-muted' },
          ],
          defaultValue: 'red-light',
        },
        {
          name: 'subLabel',
          label: 'Label Pendukung (Opsional, e.g. Brotherhood)',
          type: 'text',
        },
        {
          name: 'subLabelStyle',
          label: 'Style Label Pendukung',
          type: 'select',
          options: [
            { label: 'Gold', value: 'gold' },
            { label: 'Red Light', value: 'red-light' },
            { label: 'White / Muted', value: 'white-muted' },
          ],
          defaultValue: 'gold',
        },
        {
          name: 'title',
          label: 'Judul Pilar',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          label: 'Deskripsi Pilar',
          type: 'richText',
          required: true,
        },
        {
          name: 'subpoints',
          label: 'Sub-poin Pendukung (Opsional, e.g. di Solidarity Forever)',
          type: 'array',
          fields: [
            {
              name: 'emoji',
              label: 'Emoji / Icon',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              label: 'Judul Sub-poin',
              type: 'text',
              required: true,
            },
            {
              name: 'body',
              label: 'Deskripsi Sub-poin',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export const ClosingBlock: Block = {
  slug: 'closing',
  interfaceName: 'ClosingBlock',
  labels: {
    singular: 'Penutup / Link Sinergi',
    plural: 'Penutup / Link Sinergi',
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'eyebrowStyle',
      label: 'Style Eyebrow',
      type: 'select',
      options: [
        { label: 'Gold', value: 'gold' },
        { label: 'Red Light', value: 'red-light' },
        { label: 'White', value: 'white' },
      ],
      defaultValue: 'gold',
    },
    {
      name: 'title',
      label: 'Judul Penutup',
      type: 'text',
      required: true,
    },
    {
      name: 'titleStyle',
      label: 'Style Judul',
      type: 'select',
      options: [
        { label: 'Accent (Gold)', value: 'accent' },
        { label: 'Inverse (White)', value: 'inverse' },
      ],
      defaultValue: 'accent',
    },
    {
      name: 'quoteText',
      label: 'Teks Kutipan / Lead (Opsional)',
      type: 'textarea',
    },
    {
      name: 'quoteStyle',
      label: 'Style Kutipan',
      type: 'select',
      options: [
        { label: 'Italic & Serif (September-M Style)', value: 'italic' },
        { label: 'Default', value: 'default' },
      ],
      defaultValue: 'italic',
    },
    {
      name: 'bodyText',
      label: 'Teks Deskripsi (Opsional)',
      type: 'richText',
    },
    {
      name: 'links',
      label: 'Link Navigasi Lain (e.g. Baca Genggam Mesin)',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Label Link',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL Link (e.g. /seputar-kami/genggam-mesin)',
          type: 'text',
          required: true,
        },
        {
          name: 'hoverColor',
          label: 'Warna Hover',
          type: 'select',
          options: [
            { label: 'Gold', value: 'gold' },
            { label: 'Red Light', value: 'red-light' },
            { label: 'White', value: 'white' },
          ],
          defaultValue: 'gold',
        },
      ],
    },
  ],
}
