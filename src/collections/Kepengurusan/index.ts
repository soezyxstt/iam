import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublicRead } from '../../access/authenticatedOrPublicRead'

export const Kepengurusan: CollectionConfig = {
  slug: 'managements',
  labels: {
    singular: 'Kepengurusan',
    plural: 'Kepengurusan',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublicRead,
    update: authenticated,
  },
  admin: {
    group: 'Organisasi & kegiatan',
    useAsTitle: 'period',
  },
  fields: [
    {
      name: 'period',
      label: 'Periode',
      type: 'text',
      required: true,
    },
    {
      name: 'organizationChart',
      label: 'Organogram',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
