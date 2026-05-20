import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
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
      name: 'companyLogo',
      label: 'Logo Perusahaan',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'location',
      label: 'Lokasi',
      type: 'text',
    },
    {
      name: 'workSetup',
      label: 'Sistem Kerja',
      type: 'select',
      options: [
        { label: 'On-site', value: 'on_site' },
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'Remote', value: 'remote' },
      ],
      defaultValue: 'on_site',
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
      name: 'experienceLevel',
      label: 'Tingkat Pengalaman',
      type: 'select',
      options: [
        { label: 'Entry Level (Fresh Graduate)', value: 'entry' },
        { label: 'Mid Level (1-3 Tahun)', value: 'mid' },
        { label: 'Senior Level (3-5+ Tahun)', value: 'senior' },
        { label: 'Executive/Managerial', value: 'executive' },
      ],
    },
    {
      name: 'salaryRange',
      label: 'Rentang Gaji (Opsional)',
      type: 'text',
      admin: {
        placeholder: 'Contoh: IDR 5.000.000 - 10.000.000',
      },
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
    slugField({ useAsSlug: 'position' }),
  ],
}
