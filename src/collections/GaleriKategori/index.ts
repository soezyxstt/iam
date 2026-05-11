import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublicRead } from '../../access/authenticatedOrPublicRead'

export const GaleriKategori: CollectionConfig = {
  slug: 'galleryCategories',
  labels: {
    singular: 'Kategori Galeri',
    plural: 'Kategori Galeri',
  },
  admin: {
    group: 'Organisasi & kegiatan',
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublicRead,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      label: 'Judul Album / Kategori',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Sub-judul (Opsional)',
      type: 'text',
    },
  ],
}
