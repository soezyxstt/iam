import type { GlobalConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const ProfilOrganisasi: GlobalConfig = {
  slug: 'organizationProfile',
  label: 'Profil Organisasi',
  admin: {
    group: 'Organisasi & kegiatan',
  },
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'chairmanForeword',
      label: 'Kata Pengantar Ketua',
      type: 'richText',
    },
    {
      name: 'history',
      label: 'Sejarah IAM ITB',
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
  ],
}
