import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const LowonganKerja: CollectionConfig = {
  slug: 'jobVacancies',
  labels: {
    singular: 'Lowongan Kerja',
    plural: 'Lowongan Kerja',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Directory & komunitas',
    useAsTitle: 'position',
    description:
      'Lowongan yang terlihat di situs harus berstatus diterbitkan. Kiriman dari formulir “Pengajuan Lowongan” masuk sebagai draf untuk ditinjau.',
    defaultColumns: ['position', 'companyName', '_status', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'position',
      label: 'Posisi',
      type: 'text',
      required: true,
    },
    {
      name: 'companyName',
      label: 'Nama Perusahaan',
      type: 'text',
      required: true,
    },
    {
      name: 'employmentType',
      label: 'Jenis Pekerjaan',
      type: 'radio',
      options: [
        { label: 'Full-time', value: 'full_time' },
        { label: 'Part-time', value: 'part_time' },
        { label: 'Internship', value: 'internship' },
      ],
      required: true,
    },
    {
      name: 'jobDescription',
      label: 'Deskripsi Pekerjaan',
      type: 'richText',
      required: true,
    },
    {
      name: 'officialLink',
      label: 'Tautan Resmi',
      type: 'text',
    },
  ],
}
