import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublicRead } from '../../access/authenticatedOrPublicRead'
import { slugField } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Komunitas: CollectionConfig = {
  slug: 'communities',
  labels: {
    singular: 'Komunitas',
    plural: 'Komunitas',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublicRead,
    update: authenticated,
  },
  admin: {
    group: 'Directory & komunitas',
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
      name: 'heroImage',
      label: 'Gambar Background Hero',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortDescription',
      label: 'Deskripsi Singkat',
      type: 'textarea',
      required: true,
    },
    {
      name: 'visionMission',
      label: 'Visi dan Misi',
      type: 'richText',
      editor: lexicalEditor({}),
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
    {
      name: 'relatedPosts',
      label: 'Berita Terkait Komunitas',
      type: 'relationship',
      hasMany: true,
      relationTo: 'posts',
    },
    slugField({ useAsSlug: 'communityName' }),
  ],
}
