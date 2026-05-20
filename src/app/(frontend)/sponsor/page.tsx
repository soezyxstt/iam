import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Section } from '@/components/ui/section'
import { Heading, Eyebrow, Text } from '@/components/ui/typography'
import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import type { Sponsor, Media } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sponsor & Mitra',
  description: 'Mitra dan sponsor yang mendukung IAM ITB.',
}

const CATEGORIES: Record<string, string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  silver: 'Silver',
  bronze: 'Bronze',
  media_partner: 'Media Partner',
  other: 'Lainnya',
}

const CATEGORY_ORDER = ['platinum', 'gold', 'silver', 'bronze', 'media_partner', 'other']

// Number of columns per category tier (bigger tiers = fewer, larger tiles)
const CATEGORY_COLS: Record<string, string> = {
  platinum: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3',
  gold: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
  silver: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
  bronze: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
  media_partner: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  other: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
}

export default async function SponsorPage() {
  const payload = await getPayload({ config: configPromise })

  const sponsorsData = await payload.find({
    collection: 'sponsors',
    overrideAccess: false,
    limit: 100,
  })

  // Group sponsors by category
  const groupedSponsors: Record<string, Sponsor[]> = {}
  sponsorsData.docs.forEach((sponsor) => {
    const cat = sponsor.category || 'other'
    if (!groupedSponsors[cat]) groupedSponsors[cat] = []
    groupedSponsors[cat].push(sponsor)
  })

  return (
    <PageShell>
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Sponsor & Mitra" subtitle="Dukungan dan Kolaborasi" />
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-16 md:pt-0 md:pb-24">
        {Object.keys(groupedSponsors).length === 0 ? (
          <div className="py-24 text-center">
            <Text variant="editorial" tone="muted">
              Belum ada data sponsor yang terdaftar.
            </Text>
          </div>
        ) : (
          <div className="space-y-24">
            {CATEGORY_ORDER.map((catKey) => {
              const sponsors = groupedSponsors[catKey]
              if (!sponsors || sponsors.length === 0) return null

              const cols = CATEGORY_COLS[catKey] ?? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'

              return (
                <div key={catKey}>
                  <ScrollReveal>
                    <div className="mb-10 text-center">
                      <Eyebrow tone="red">Kategori</Eyebrow>
                      <Heading level={3} className="mt-2 text-3xl">
                        {CATEGORIES[catKey as keyof typeof CATEGORIES]}
                      </Heading>
                      <div className="mx-auto mt-4 h-px w-16 bg-linear-to-r from-transparent via-brand-primary/30 to-transparent" />
                    </div>
                  </ScrollReveal>

                  {/* Glassmorphism logo grid */}
                  <div className={`grid gap-5 ${cols}`}>
                    {sponsors.map((sponsor) => {
                      const logo =
                        typeof sponsor.logo === 'object' && sponsor.logo !== null
                          ? sponsor.logo
                          : null
                      const href = sponsor.officialWebsite
                        ? sponsor.officialWebsite.startsWith('http')
                          ? sponsor.officialWebsite
                          : `https://${sponsor.officialWebsite}`
                        : null

                      const tile = (
                        <div className="sponsor-logo-tile group relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-dark/10 bg-white/85 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-dark/20 hover:shadow-xl hover:shadow-brand-dark/10">
                          {/* Logo */}
                          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                            {logo && (logo as Media).url ? (
                              <Image
                                src={(logo as Media).url!}
                                alt={sponsor.companyName}
                                fill
                                className="object-cover"
                                sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 20vw"
                              />
                            ) : (
                              <span className="text-4xl font-bold text-brand-primary/20">
                                {sponsor.companyName?.charAt(0)}
                              </span>
                            )}
                          </div>

                          {/* Hover overlay — slides up from bottom */}
                          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-brand-dark/82 px-3 py-3 text-center backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-white line-clamp-1">
                              {sponsor.companyName}
                            </span>
                            {sponsor.shortDescription && (
                              <span className="mt-0.5 block text-[10px] text-white/60 line-clamp-1">
                                {sponsor.shortDescription}
                              </span>
                            )}
                          </div>

                          {/* External link icon (top-right, appears on hover) */}
                          {href && (
                            <div className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-dark/0 opacity-0 transition-all duration-300 group-hover:bg-brand-dark/15 group-hover:opacity-100">
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
                        <ScrollReveal key={sponsor.id}>
                          {href ? (
                            <Link
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                              title={sponsor.companyName}
                            >
                              {tile}
                            </Link>
                          ) : (
                            tile
                          )}
                        </ScrollReveal>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Section>
    </PageShell>
  )
}
