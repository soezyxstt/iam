import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublicRead } from '../../access/authenticatedOrPublicRead'

export const OrgAnggota: CollectionConfig = {
  slug: 'orgMembers',
  labels: {
    singular: 'Anggota Organisasi',
    plural: 'Anggota Organisasi',
  },
  admin: {
    group: 'Organisasi & kegiatan',
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'memberType', 'treeLevel', 'order'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublicRead,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      label: 'Nama Lengkap',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      label: 'Jabatan',
      type: 'text',
      admin: {
        description: 'Kosongkan untuk Dewan Penasihat / Dewan Pakar yang tidak punya jabatan spesifik.',
      },
    },
    {
      name: 'photo',
      label: 'Foto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'memberType',
      label: 'Tipe Anggota',
      type: 'select',
      required: true,
      options: [
        { label: 'Pengurus Inti / Ketua Bidang', value: 'main' },
        { label: 'Dewan Penasihat', value: 'advisory' },
        { label: 'Dewan Pakar', value: 'expert' },
      ],
      admin: {
        description: 'Menentukan posisi di organogram dan tab di halaman Organisasi.',
      },
    },
    {
      name: 'treeLevel',
      label: 'Level Organogram',
      type: 'number',
      admin: {
        description:
          'Hanya untuk tipe "Pengurus Inti". 1 = Ketua Umum, 2 = SekJen/Bendahara, 3 = Wakil KU, 4 = Ketua Bidang.',
        condition: (data) => data?.memberType === 'main',
      },
    },
    {
      name: 'order',
      label: 'Urutan',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Urutan tampil dalam level/tipe yang sama. Angka lebih kecil = lebih kiri/atas.',
      },
    },
    {
      name: 'linkedIn',
      label: 'LinkedIn URL',
      type: 'text',
      admin: {
        description: 'Tautan profil LinkedIn untuk pengurus.',
      },
    },
  ],
}
