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
    defaultColumns: ['companyName', 'supportPeriod', 'updatedAt'],
  },
  fields: [
    {
      name: 'companyName',
      label: 'Nama Perusahaan',
      type: 'text',
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
