import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { publicDirectoryOrAuthenticated } from '../../access/publicDirectoryOrAuthenticated'
import { readAuthenticatedOnly } from '../../access/fieldAccess/authenticatedOnly'

export const AlumniMembers: CollectionConfig = {
  slug: 'alumniMembers',
  labels: {
    singular: 'Alumni',
    plural: 'Basis Data Alumni',
  },
  admin: {
    group: 'Directory & komunitas',
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'graduationYear', 'listPublicly', 'updatedAt'],
    listSearchableFields: ['fullName', 'employer', 'headline'],
    description:
      'Data alumni untuk direktori publik. Hanya entri dengan “Tampil di direktori publik” yang terlihat di situs untuk pengunjung. Email dan telepon hanya terlihat oleh admin.',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: publicDirectoryOrAuthenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'fullName',
      label: 'Nama lengkap',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      label: 'Foto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'graduationYear',
      label: 'Angkatan (tahun)',
      type: 'number',
      admin: {
        description: 'Tahun kelulusan atau angkatan masuk — sesuai konvensi IAM.',
      },
    },
    {
      name: 'headline',
      label: 'Judul ringkas / profesi',
      type: 'text',
    },
    {
      name: 'employer',
      label: 'Instansi / perusahaan',
      type: 'text',
    },
    {
      name: 'role',
      label: 'Jabatan',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          access: {
            read: readAuthenticatedOnly,
          },
        },
        {
          name: 'phone',
          label: 'Telepon',
          type: 'text',
          access: {
            read: readAuthenticatedOnly,
          },
        },
      ],
    },
    {
      name: 'linkedInUrl',
      label: 'Tautan LinkedIn',
      type: 'text',
      validate: (value: string | null | undefined) => {
        if (!value || value === '') return true
        try {
          const u = new URL(value.startsWith('http') ? value : `https://${value}`)
          if (!['http:', 'https:'].includes(u.protocol)) return 'Gunakan URL http(s)'
          if (!u.hostname.includes('linkedin.com')) return 'Gunakan URL profil LinkedIn'
          return true
        } catch {
          return 'URL tidak valid'
        }
      },
    },
    {
      name: 'bio',
      label: 'Bio singkat',
      type: 'textarea',
    },
    {
      name: 'listPublicly',
      label: 'Tampil di direktori publik',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Jika diaktifkan, profil ini muncul di situs untuk pengunjung (tanpa email/telepon).',
      },
    },
  ],
}
