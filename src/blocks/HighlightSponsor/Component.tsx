'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { Sponsor, Media } from '@/payload-types'
import { Section } from '@/components/ui/section'
import { Heading, Eyebrow } from '@/components/ui/typography'

export type HighlightSponsorBlockProps = {
  sectionTitle: string
  sponsors: (number | Sponsor)[] | null | undefined
}

export const HighlightSponsorBlock: React.FC<HighlightSponsorBlockProps> = ({
  sectionTitle,
  sponsors,
}) => {
  const list = (sponsors ?? []).filter((s): s is Sponsor => typeof s === 'object' && s !== null)

  if (list.length === 0) return null

  return (
    <Section>
      {/* Section header */}
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <Eyebrow tone="red">Dukungan</Eyebrow>
        <Heading level={2} className="mt-1">
          {sectionTitle}
        </Heading>
        <div className="h-px w-16 bg-linear-to-r from-transparent via-brand-primary/30 to-transparent" />
      </div>

      {/* Glassmorphism logo grid */}
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {list.map((s, i) => {
          const logo = typeof s.logo === 'object' && s.logo !== null ? s.logo : null
          const href = s.officialWebsite
            ? s.officialWebsite.startsWith('http')
              ? s.officialWebsite
              : `https://${s.officialWebsite}`
            : null

          const tile = (
            <div className="sponsor-logo-tile group relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-dark/10 bg-white/85 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-dark/20 hover:shadow-xl hover:shadow-brand-dark/10">
              {/* Logo */}
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {logo && (logo as Media).url ? (
                  <Image
                    src={(logo as Media).url!}
                    alt={s.companyName}
                    fill
                    className="object-cover"
                    sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 20vw"
                  />
                ) : (
                  <span className="text-4xl font-bold text-brand-primary/20">
                    {s.companyName?.charAt(0)}
                  </span>
                )}
              </div>

              {/* Hover overlay — slides up from bottom */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-brand-dark/82 px-3 py-3 text-center backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-white line-clamp-1">
                  {s.companyName}
                </span>
              </div>

              {/* External link icon */}
              {href && (
                <div className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:bg-brand-dark/15 group-hover:opacity-100">
                  <svg
                    className="h-3 w-3 text-brand-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              )}
            </div>
          )

          return (
            <li key={s.id ?? i}>
              {href ? (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  title={s.companyName}
                >
                  {tile}
                </Link>
              ) : (
                tile
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
