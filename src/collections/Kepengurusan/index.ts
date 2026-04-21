import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Kepengurusan: CollectionConfig = {
  slug: 'managements',
  labels: {
    singular: 'Kepengurusan',
    plural: 'Kepengurusan',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
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
