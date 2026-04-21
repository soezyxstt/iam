import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const UsahaAlumni: CollectionConfig = {
  slug: 'alumniBusinesses',
  labels: {
    singular: 'Usaha Alumni',
    plural: 'Usaha Alumni',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Directory & komunitas',
    useAsTitle: 'businessName',
    description:
      'Usaha yang terlihat di situs harus berstatus diterbitkan. Kiriman dari formulir “Pengajuan Usaha Alumni” masuk sebagai draf untuk ditinjau.',
    defaultColumns: ['businessName', 'ownerName', '_status', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'ownerName',
      label: 'Pemilik Usaha',
      type: 'text',
      required: true,
    },
    {
      name: 'businessName',
      label: 'Nama Usaha',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      label: 'Kategori',
      type: 'select',
      options: [
        { label: 'Manufaktur', value: 'manufaktur' },
        { label: 'Jasa', value: 'jasa' },
        { label: 'F&B', value: 'fnb' },
        { label: 'Teknologi', value: 'teknologi' },
        { label: 'Lainnya', value: 'lainnya' },
      ],
      required: true,
    },
    {
      name: 'description',
      label: 'Narasi/Deskripsi',
      type: 'textarea',
      required: true,
    },
    {
      name: 'productsOrServices',
      label: 'Produk/Jasa',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      label: 'Alamat',
      type: 'textarea',
      required: true,
    },
    {
      name: 'phoneNumber',
      label: 'Nomor Telepon',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'website',
      label: 'Website',
      type: 'text',
    },
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'text',
    },
  ],
}
