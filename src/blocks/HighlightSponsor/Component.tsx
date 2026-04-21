'use client'

import Image from 'next/image'
import React from 'react'

import type { Sponsor } from '@/payload-types'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'
import { cn } from '@/utilities/ui'

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
    <Section className="bg-brand-dark/4">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <header className="mb-10 text-center">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-red/90">
            Dukungan
          </span>
          <Heading level={2} className="mt-2">
            {sectionTitle}
          </Heading>
        </header>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => {
            const logo = typeof s.logo === 'object' && s.logo?.url ? s.logo : null
            return (
              <li key={s.id ?? i}>
                <article
                  className={cn(
                    'flex h-full flex-col rounded-2xl border border-brand-dark/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md',
                  )}
                >
                  {logo && (
                    <div className="relative mb-4 h-16 w-full">
                      <Image
                        src={logo.url!}
                        alt={s.companyName}
                        fill
                        className="object-contain object-left"
                        sizes="(max-width:768px) 100vw, 200px"
                      />
                    </div>
                  )}
                  <Heading level={3} className="text-lg">
                    {s.companyName}
                  </Heading>
                  <Text className="mt-2 line-clamp-4 text-sm text-brand-light">{s.shortDescription}</Text>
                  {s.officialWebsite && (
                    <a
                      href={s.officialWebsite.startsWith('http') ? s.officialWebsite : `https://${s.officialWebsite}`}
                      className="mt-4 text-sm font-medium text-brand-red hover:underline"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Website sponsor
                    </a>
                  )}
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
