import type { RequiredDataFromCollectionSlug } from 'payload'

/** Fallback when DB has no `pages` document with slug `home` (e.g. before seed). */
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  title: 'Beranda',
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Ikatan Alumni Mesin ITB',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Edit halaman Beranda dari dasbor admin (slug: home) atau jalankan seed untuk konten lengkap.',
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
  },
  meta: {
    description:
      'Ikatan Alumni Mahasiswa Teknik Mesin ITB — komunikasi, kolaborasi, dan jejaring profesional.',
    title: 'Beranda | IAM ITB',
  },
  layout: [],
}
