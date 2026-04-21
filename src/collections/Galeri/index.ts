import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublicRead } from '../../access/authenticatedOrPublicRead'

export const Galeri: CollectionConfig = {
  slug: 'galleries',
  labels: {
    singular: 'Galeri',
    plural: 'Galeri',
  },
  admin: {
    group: 'Organisasi & kegiatan',
    defaultColumns: ['description', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublicRead,
    update: authenticated,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const hasMedia = Boolean(data?.media)
        const hasEmbed = typeof data?.embedUrl === 'string' && data.embedUrl.trim().length > 0
        if (!hasMedia && !hasEmbed) {
          throw new Error('Unggah berkas di Media atau isi URL video sematan (YouTube/Vimeo).')
        }
      },
    ],
  },
  fields: [
    {
      name: 'media',
      label: 'Gambar atau file video',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Opsional jika memakai URL sematan. Unggah gambar atau video (mp4/webm).',
      },
    },
    {
      name: 'embedUrl',
      label: 'URL video sematan',
      type: 'text',
      admin: {
        description:
          'Opsional. Tautan YouTube/Vimeo untuk menyematkan video tanpa unggah file besar.',
      },
    },
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
    },
  ],
}
