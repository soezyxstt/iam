import type { GlobalConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublicRead } from '../../access/authenticatedOrPublicRead'
import { revalidateOrganizationProfile } from './hooks/revalidateOrganizationProfile'

export const ProfilOrganisasi: GlobalConfig = {
  slug: 'organizationProfile',
  label: 'Profil Organisasi',
  admin: {
    group: 'Organisasi & kegiatan',
  },
  access: {
    read: authenticatedOrPublicRead,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateOrganizationProfile],
  },
  fields: [
    {
      name: 'tagline',
      label: 'Tagline',
      type: 'text',
      admin: {
        description: 'Contoh: For Union Machine Strong',
      },
    },
    {
      name: 'aboutBrief',
      label: 'Ringkasan Tentang Kami (Beranda)',
      type: 'textarea',
      admin: {
        description: 'Ditampilkan di bagian "About" pada halaman beranda.',
      },
    },
    {
      name: 'vision',
      label: 'Visi',
      type: 'richText',
    },
    {
      name: 'mission',
      label: 'Misi',
      type: 'richText',
    },
    {
      name: 'currentChairman',
      label: 'Ketua Saat Ini',
      type: 'relationship',
      relationTo: 'iamPresidents',
    },
    {
      name: 'chairmanForeword',
      label: 'Kata Pengantar Ketua',
      type: 'richText',
    },
    {
      name: 'historyBrief',
      label: 'Ringkasan Latar Belakang',
      type: 'textarea',
    },
    {
      name: 'history',
      label: 'Sejarah IAM ITB (Lengkap)',
      type: 'richText',
    },
    {
      name: 'relationWithHmm',
      label: 'Hubungan dengan HMM ITB',
      type: 'richText',
    },
    {
      name: 'valuesAndPhilosophy',
      label: 'Nilai dan Filosofi',
      type: 'group',
      fields: [
        {
          name: 'genggamMesin',
          label: 'Genggam Mesin',
          type: 'richText',
        },
        {
          name: 'laguJerusalem',
          label: 'Lagu Jerusalem',
          type: 'richText',
        },
        {
          name: 'yellboys',
          label: 'Yellboys',
          type: 'richText',
        },
        {
          name: 'solidarityForever',
          label: 'Solidarity Forever',
          type: 'richText',
        },
        {
          name: 'septemberM',
          label: 'September M',
          type: 'richText',
        },
      ],
    },
    {
      name: 'contactEmail',
      label: 'Email Resmi',
      type: 'text',
      admin: {
        description: 'Contoh: info@iamitb.org',
      },
    },
    {
      name: 'contactWhatsapp',
      label: 'Nomor WhatsApp',
      type: 'text',
      admin: {
        description: 'Format internasional tanpa tanda +. Contoh: 6281234567890',
      },
    },
    {
      name: 'contactInstagram',
      label: 'Instagram Handle',
      type: 'text',
      admin: {
        description: 'Tanpa tanda @. Contoh: iamitb',
      },
    },
  ],
}
