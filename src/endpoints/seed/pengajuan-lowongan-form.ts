import type { RequiredDataFromCollectionSlug } from 'payload'

export const pengajuanLowonganForm: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'Pengajuan Lowongan',
  confirmationType: 'message',
  confirmationMessage: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Terima kasih. Lowongan akan ditinjau admin sebelum ditampilkan di situs.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
  emails: [],
  fields: [
    {
      name: 'position',
      blockType: 'text',
      label: 'Posisi',
      required: true,
      width: 100,
    },
    {
      name: 'companyName',
      blockType: 'text',
      label: 'Nama perusahaan',
      required: true,
      width: 100,
    },
    {
      name: 'employmentType',
      blockType: 'select',
      label: 'Jenis pekerjaan',
      required: true,
      options: [
        { label: 'Full-time', value: 'full_time' },
        { label: 'Part-time', value: 'part_time' },
        { label: 'Magang', value: 'internship' },
      ],
      width: 100,
    },
    {
      name: 'jobDescription',
      blockType: 'textarea',
      label: 'Deskripsi pekerjaan',
      required: true,
      width: 100,
    },
    {
      name: 'officialLink',
      blockType: 'text',
      label: 'Tautan resmi lowongan',
      required: false,
      width: 100,
    },
  ],
  submitButtonLabel: 'Kirim pengajuan',
}
