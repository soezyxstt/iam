import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Pengaturan situs',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'logoText',
      type: 'textarea',
      label: 'Teks Logo',
      defaultValue: 'IAM\nITB',
      admin: {
        description: 'Teks di samping logo, gunakan baris baru untuk memisahkan baris.',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Tautan Media Sosial',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'X / Twitter', value: 'twitter' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL Tautan',
          required: true,
        },
        {
          name: 'ariaLabel',
          type: 'text',
          label: 'Aria Label (Aksesibilitas)',
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Teks Hak Cipta',
      defaultValue: 'IAM ITB. Hak Cipta Dilindungi.',
      admin: {
        description: 'Teks hak cipta (Tahun dan simbol hak cipta © ditambahkan secara otomatis).',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}

