import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublicRead } from '../../access/authenticatedOrPublicRead'

export const Aktivitas: CollectionConfig = {
  slug: 'activities',
  labels: {
    singular: 'Aktivitas',
    plural: 'Aktivitas',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublicRead,
    update: authenticated,
  },
  admin: {
    group: 'Organisasi & kegiatan',
    useAsTitle: 'activityName',
    defaultColumns: ['activityName', 'activityType', 'date', 'updatedAt'],
  },
  fields: [
    {
      name: 'activityName',
      label: 'Nama Kegiatan',
      type: 'text',
      required: true,
    },
    {
      name: 'activityType',
      label: 'Tipe kegiatan',
      type: 'select',
      options: [
        { label: 'Pulang Kampus', value: 'pulang_kampus' },
        { label: 'Beasiswa IAM ITB', value: 'beasiswa' },
        { label: 'Reuni Akbar', value: 'reuni' },
        { label: 'Kongres IAM ITB', value: 'kongres' },
        { label: 'Agenda Rutin', value: 'agenda_rutin' },
        { label: 'Lainnya', value: 'lainnya' },
      ],
      defaultValue: 'lainnya',
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
