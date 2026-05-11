import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Section } from '@/components/ui/section'
import { Heading, Text, Eyebrow } from '@/components/ui/typography'
import { Media } from '@/components/Media'
import { Metadata } from 'next'
import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import type { Sponsor } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Sponsor | IAM ITB',
  description: 'Mitra dan sponsor yang mendukung IAM ITB.',
}

export default async function SponsorPage() {
  const payload = await getPayload({ config: configPromise })
  
  const sponsorsData = await payload.find({
    collection: 'sponsors',
    overrideAccess: false,
    limit: 100,
  })

  // Group sponsors by category
  const categories = {
    platinum: 'Platinum',
    gold: 'Gold',
    silver: 'Silver',
    bronze: 'Bronze',
    media_partner: 'Media Partner',
    other: 'Lainnya',
  }

  const groupedSponsors: Record<string, Sponsor[]> = {}
  
  sponsorsData.docs.forEach((sponsor) => {
    const cat = sponsor.category || 'other'
    if (!groupedSponsors[cat]) {
      groupedSponsors[cat] = []
    }
    groupedSponsors[cat].push(sponsor)
  })

  // Order of categories
  const categoryOrder = ['platinum', 'gold', 'silver', 'bronze', 'media_partner', 'other']

  return (
    <PageShell>
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <PageHeroHeader title="Sponsor & Mitra" subtitle="Dukungan dan Kolaborasi" />
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-16 md:pt-0 md:pb-24" containerClassName="max-w-6xl px-4 md:px-8">
        <div className="space-y-24">
          {categoryOrder.map((catKey) => {
            const sponsors = groupedSponsors[catKey]
            if (!sponsors || sponsors.length === 0) return null

            return (
              <div key={catKey} className="relative">
                <ScrollReveal>
                  <div className="mb-10 text-center">
                    <Eyebrow tone="red">
                      Kategori
                    </Eyebrow>
                    <Heading level={3} className="mt-2 text-3xl">
                      {categories[catKey as keyof typeof categories]}
                    </Heading>
                  </div>
                </ScrollReveal>
                
                {/* Free-standing logo grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
                  {sponsors.map((sponsor) => {
                    const logo = typeof sponsor.logo === 'object' && sponsor.logo !== null ? sponsor.logo : null
                    
                    const cardContent = (
                      <div className="group relative flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2">
                        <div className="relative w-full aspect-[3/2] flex items-center justify-center p-4">
                          {logo ? (
                            <Media resource={logo} className="object-contain w-full h-full drop-shadow-sm transition-all duration-500 group-hover:drop-shadow-xl group-hover:scale-105" />
                          ) : (
                            <div className="w-24 h-24 bg-brand-primary/5 rounded-full" />
                          )}
                        </div>
                        {/* Hover Overlay with Glassmorphism */}
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center z-10">
                          <Text variant="body" tone="strong" className="font-bold mb-1 font-serif text-brand-dark">
                            {sponsor.companyName}
                          </Text>
                          <div className="w-4 h-[2px] bg-brand-red my-2" />
                          <Text variant="small" tone="muted" className="line-clamp-2 text-xs">
                            {sponsor.shortDescription}
                          </Text>
                        </div>
                      </div>
                    )

                    return (
                      <ScrollReveal key={sponsor.id} className="w-full">
                        {sponsor.officialWebsite ? (
                          <a href={sponsor.officialWebsite} target="_blank" rel="noopener noreferrer" className="block w-full">
                            {cardContent}
                          </a>
                        ) : (
                          <div className="w-full">{cardContent}</div>
                        )}
                      </ScrollReveal>
                    )
                  })}
                </div>
              </div>
            )
          })}
          
          {Object.keys(groupedSponsors).length === 0 && (
            <div className="text-center py-24">
              <Text variant="editorial" tone="muted">
                Belum ada data sponsor yang terdaftar.
              </Text>
            </div>
          )}
        </div>
      </Section>
    </PageShell>
  )
}
