export type SocialPlatform =
  | 'linkedin'
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'youtube'
  | 'website'
  | 'email'

export type SocialLink = {
  platform: SocialPlatform
  href: string
  /** Optional override label; falls back to the platform's default name. */
  label?: string
}

export type PreviousChairEntry = {
  slug: string
  name: string
  /** Display string shown on listing and detail page (e.g. "Periode 2025–2026"). */
  periodLabel: string
  /** Major + class year, e.g. "Teknik Mesin 1998". Rendered in brand-gold. */
  majorLabel: string
  /** Detail-page bio paragraphs. */
  bio: string[]
  /** Portrait image (next/image-compatible URL or `/...` path in `public/`). */
  portraitSrc: string
  socialLinks: SocialLink[]
}

const PLACEHOLDER_BIO = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
]

export const PREVIOUS_CHAIR_ENTRIES: PreviousChairEntry[] = [
  {
    slug: 'adi-haditya-nursyam-2025-2026',
    name: 'Adi Haditya Nursyam',
    periodLabel: 'Periode 2025–2026',
    majorLabel: 'Teknik Mesin 1998',
    bio: PLACEHOLDER_BIO,
    portraitSrc:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    socialLinks: [
      { platform: 'linkedin', href: 'https://www.linkedin.com/in/iamitb' },
      { platform: 'instagram', href: 'https://instagram.com/iamitb' },
      { platform: 'email', href: 'mailto:ketua@iamitb.org' },
    ],
  },
  {
    slug: 'adi-haditya-nursyam-2024-2025',
    name: 'Adi Haditya Nursyam',
    periodLabel: 'Periode 2024–2025',
    majorLabel: 'Teknik Mesin 1997',
    bio: PLACEHOLDER_BIO,
    portraitSrc:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    socialLinks: [
      { platform: 'linkedin', href: 'https://www.linkedin.com/in/iamitb' },
      { platform: 'website', href: 'https://iamitb.org' },
    ],
  },
  {
    slug: 'adi-haditya-nursyam-2023-2024',
    name: 'Adi Haditya Nursyam',
    periodLabel: 'Periode 2023–2024',
    majorLabel: 'Teknik Mesin 1996',
    bio: PLACEHOLDER_BIO,
    portraitSrc:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    socialLinks: [
      { platform: 'linkedin', href: 'https://www.linkedin.com/in/iamitb' },
      { platform: 'twitter', href: 'https://x.com/iamitb' },
      { platform: 'facebook', href: 'https://facebook.com/iamitb' },
    ],
  },
  {
    slug: 'adi-haditya-nursyam-2022-2023',
    name: 'Adi Haditya Nursyam',
    periodLabel: 'Periode 2022–2023',
    majorLabel: 'Teknik Mesin 1995',
    bio: PLACEHOLDER_BIO,
    portraitSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    socialLinks: [
      { platform: 'linkedin', href: 'https://www.linkedin.com/in/iamitb' },
      { platform: 'instagram', href: 'https://instagram.com/iamitb' },
    ],
  },
]

export function getPreviousChairBySlug(slug: string): PreviousChairEntry | undefined {
  return PREVIOUS_CHAIR_ENTRIES.find((entry) => entry.slug === slug)
}
