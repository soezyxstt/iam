import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublicRead } from '../../access/authenticatedOrPublicRead'

export const Sponsor: CollectionConfig = {
  slug: 'sponsors',
  labels: {
    singular: 'Sponsor',
    plural: 'Sponsor',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublicRead,
    update: authenticated,
  },
  admin: {
    group: 'Organisasi & kegiatan',
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'category', 'supportPeriod', 'updatedAt'],
  },
  fields: [
    {
      name: 'companyName',
      label: 'Nama Perusahaan',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      label: 'Kategori Sponsor',
      type: 'select',
      options: [
        { label: 'Platinum', value: 'platinum' },
        { label: 'Gold', value: 'gold' },
        { label: 'Silver', value: 'silver' },
        { label: 'Bronze', value: 'bronze' },
        { label: 'Media Partner', value: 'media_partner' },
        { label: 'Lainnya', value: 'other' },
      ],
      defaultValue: 'other',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'shortDescription',
      label: 'Deskripsi Singkat',
      type: 'textarea',
      required: true,
    },
    {
      name: 'supportPeriod',
      label: 'Periode dukungan',
      type: 'text',
      admin: {
        description: 'Misalnya tahun ajaran atau periode program sponsorship.',
      },
    },
    {
      name: 'officialWebsite',
      label: 'Website Resmi',
      type: 'text',
    },
  ],
}
