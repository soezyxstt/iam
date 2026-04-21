import type { Header } from '@/payload-types'

/**
 * Shown when Payload `header` global has no nav items (e.g. empty DB).
 * Keep in sync with seed `updateGlobal({ slug: 'header' })` in `src/endpoints/seed/index.ts`.
 */
export const defaultHeaderNavItems: NonNullable<Header['navItems']> = [
  {
    link: {
      type: 'custom',
      label: 'Organisasi',
      url: '/organisasi',
    },
  },
  {
    link: {
      type: 'custom',
      label: 'Kepengurusan',
      url: '/kepengurusan',
    },
  },
  {
    link: {
      type: 'custom',
      label: 'Galeri',
      url: '/galeri',
    },
  },
  {
    link: {
      type: 'custom',
      label: 'Seputar Kami',
      url: '/posts',
    },
    hasDropdown: true,
    dropdownItems: [
      {
        link: {
          type: 'custom',
          label: 'Berita',
          url: '/posts',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Hubungi Kami',
          url: '/contact',
        },
      },
    ],
  },
  {
    link: {
      type: 'custom',
      label: 'Direktori Alumni',
      url: '/alumni',
    },
  },
  {
    link: {
      type: 'custom',
      label: 'Komunitas',
      url: '/komunitas',
    },
  },
]
