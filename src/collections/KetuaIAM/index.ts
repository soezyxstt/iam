import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const KetuaIAM: CollectionConfig = {
  slug: 'iamPresidents',
  labels: {
    singular: 'Ketua IAM',
    plural: 'Ketua IAM',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Nama',
      type: 'text',
      required: true,
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
      name: 'linkedInLabel',
      label: 'Tautan LinkedIn',
      type: 'text',
    },
  ],
}
