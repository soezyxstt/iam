import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Sponsor: CollectionConfig = {
  slug: 'sponsors',
  labels: {
    singular: 'Sponsor',
    plural: 'Sponsor',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'companyName',
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
      name: 'officialWebsite',
      label: 'Website Resmi',
      type: 'text',
    },
  ],
}
