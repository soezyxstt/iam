import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublicRead } from '../../access/authenticatedOrPublicRead'

import { slugField } from 'payload'

export const KetuaIAM: CollectionConfig = {
  slug: 'iamPresidents',
  labels: {
    singular: 'Ketua IAM',
    plural: 'Ketua IAM',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublicRead,
    update: authenticated,
  },
  admin: {
    group: 'Organisasi & kegiatan',
    useAsTitle: 'name',
    defaultColumns: ['name', 'period', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      label: 'Nama',
      type: 'text',
      required: true,
    },
    slugField({ useAsSlug: 'name' }),
    {
      name: 'portraitImage',
      label: 'Foto Profil',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'majorLabel',
      label: 'Angkatan / Jurusan',
      type: 'text',
      admin: {
        placeholder: 'contoh: Mesin 98',
      },
    },
    {
      name: 'period',
      label: 'Periode',
      type: 'text',
      required: true,
    },
    {
      name: 'shortBiography',
      label: 'Biografi Singkat',
      type: 'textarea',
      required: true,
    },
    {
      name: 'professionalCareer',
      label: 'Riwayat Karier Profesional',
      type: 'richText',
    },
    {
      name: 'personalStory',
      label: 'Cerita Personal',
      type: 'textarea',
    },
    {
      name: 'linkedInUrl',
      label: 'Tautan LinkedIn',
      type: 'text',
      validate: (value: string | null | undefined) => {
        if (!value || value === '') return true
        try {
          const u = new URL(value.startsWith('http') ? value : `https://${value}`)
          if (!['http:', 'https:'].includes(u.protocol)) return 'Gunakan URL http(s)'
          if (!u.hostname.includes('linkedin.com')) return 'Gunakan URL profil LinkedIn'
          return true
        } catch {
          return 'URL tidak valid'
        }
      },
    },
  ],
}
