import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Section } from '@/components/ui/section'
import { Heading, Text, Eyebrow } from '@/components/ui/typography'

import { Media } from '@/components/Media'
import Link from 'next/link'
import { Metadata } from 'next'
import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'

export const metadata: Metadata = {
  title: 'Komunitas | IAM ITB',
  description: 'Komunitas di bawah naungan IAM ITB.',
}

export default async function KomunitasPage() {
  const payload = await getPayload({ config: configPromise })
  
  const communities = await payload.find({
    collection: 'communities',
    overrideAccess: false,
    limit: 100,
  })

  return (
    <PageShell>
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <PageHeroHeader title="Komunitas" subtitle="Wadah Penyaluran Hobi & Minat" />
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-12 md:pt-0 md:pb-20" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <div className="max-w-prose mb-16 text-center md:text-left">
            <Eyebrow tone="red">Ekosistem IAM ITB</Eyebrow>
            <Heading level={2} className="mt-3 mb-7 md:mb-8">
              Satu Mesin, Berbagai Minat
            </Heading>
            <Text variant="editorial" className="leading-loose">
              Jelajahi berbagai komunitas di bawah naungan IAM ITB. Bergabunglah dengan alumni lain yang memiliki minat dan hobi yang sama untuk mempererat tali silaturahmi.
            </Text>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {communities.docs.map((community) => (
            <ScrollReveal key={community.id}>
              <Link href={`/komunitas/${community.slug}`} className="block group h-full">
                <div className="h-full flex flex-col items-center text-center p-8 transition-all duration-500 rounded-3xl bg-white/40 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-2xl hover:bg-white/60">
                  <div className="w-28 h-28 relative mb-6 rounded-full overflow-hidden border border-brand-dark/10 shadow-lg bg-white flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-105">
                    {typeof community.logo === 'object' && community.logo !== null ? (
                      <Media resource={community.logo} fill className="object-contain" />
                    ) : null}
                  </div>
                  <Heading level={3} tone="default" className="mb-3 group-hover:text-brand-red transition-colors text-xl font-bold text-brand-dark">
                    {community.communityName}
                  </Heading>
                  <Text variant="small" tone="muted" className="line-clamp-3">
                    {community.shortDescription}
                  </Text>
                  <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Text variant="small" tone="strong" className="font-display uppercase tracking-widest text-brand-red">
                      Eksplorasi &rarr;
                    </Text>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
          {communities.docs.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <Text variant="editorial" tone="muted">
                Belum ada data komunitas.
              </Text>
            </div>
          )}
        </div>
      </Section>
    </PageShell>
  )
}
