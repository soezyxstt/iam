import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Komunitas: CollectionConfig = {
  slug: 'communities',
  labels: {
    singular: 'Komunitas',
    plural: 'Komunitas',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'communityName',
  },
  fields: [
    {
      name: 'communityName',
      label: 'Nama Komunitas',
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
      name: 'contactPerson',
      label: 'Kontak Pengelola',
      type: 'text',
    },
    {
      name: 'joinInformation',
      label: 'Informasi Cara Bergabung',
      type: 'richText',
    },
  ],
}
