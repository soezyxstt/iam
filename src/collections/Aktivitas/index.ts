import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Aktivitas: CollectionConfig = {
  slug: 'activities',
  labels: {
    singular: 'Aktivitas',
    plural: 'Aktivitas',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'activityName',
  },
  fields: [
    {
      name: 'activityName',
      label: 'Nama Kegiatan',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      label: 'Tanggal',
      type: 'date',
      required: true,
    },
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'richText',
      required: true,
    },
  ],
}
