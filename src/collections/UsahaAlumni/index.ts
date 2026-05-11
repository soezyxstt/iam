import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { toSlug } from '@/utilities/toSlug'

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
    slugField({
      useAsSlug: 'businessName',
      position: 'sidebar',
    }),
    {
      name: 'coverImage',
      label: 'Gambar sampul',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Foto bisnis atau logo untuk kartu di halaman Profil Usaha Alumni. Jika kosong, gambar default dipakai.',
      },
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
    {
      name: 'yearFounded',
      label: 'Tahun berdiri',
      type: 'number',
      admin: { description: 'Opsional — ditampilkan di halaman rincian (kartu ringkas).' },
    },
    {
      name: 'employeesSummary',
      label: 'Jumlah karyawan (ringkas)',
      type: 'text',
      admin: {
        description: 'Contoh: 150+ atau 25',
      },
    },
    {
      name: 'certifications',
      label: 'Sertifikasi',
      type: 'text',
      admin: { description: 'Contoh: ISO 9001' },
    },
    {
      name: 'ownerRole',
      label: 'Jabatan pemilik / penanggung jawab',
      type: 'text',
      admin: { description: 'Contoh: Founder & CEO' },
    },
    {
      name: 'ownerEducationLine',
      label: 'Latar pendidikan pemilik (satu baris)',
      type: 'text',
      admin: { description: 'Contoh: Teknik Mesin ITB 1998' },
    },
    {
      name: 'ownerBio',
      label: 'Bio pemilik (ringkas)',
      type: 'textarea',
      admin: { description: 'Paragraf singkat di kartu pemilik pada halaman rincian.' },
    },
    {
      name: 'featuredHighlight',
      label: 'Sorotan / program (baris promosi)',
      type: 'text',
      admin: {
        description:
          'Contoh: Program Kerja Praktik: Tersedia — ditampilkan di bawah tombol aksi pada rincian.',
      },
    },
    {
      name: 'gallery',
      label: 'Galeri foto',
      type: 'array',
      maxRows: 12,
      admin: {
        description: 'Foto tambahan untuk halaman rincian (di bawah kontak).',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (!data) return data
        const name = typeof data.businessName === 'string' ? data.businessName : ''
        const rawSlug = typeof data.slug === 'string' ? data.slug : ''
        if (operation === 'create' && name && !rawSlug.trim()) {
          return { ...data, slug: toSlug(name) }
        }
        return data
      },
    ],
  },
}
