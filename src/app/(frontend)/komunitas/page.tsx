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
  title: 'Komunitas',
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
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Komunitas" subtitle="Wadah Penyaluran Hobi & Minat" />
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-16 md:pt-0 md:pb-24">
        <ScrollReveal>
          <div className="max-w-2xl mb-12 text-center md:text-left">
            <Eyebrow tone="red">Ekosistem IAM ITB</Eyebrow>
            <Heading level={2} className="mt-3">
              Satu Mesin, Berbagai Minat
            </Heading>
            <Text variant="editorial" className="mt-6 leading-relaxed">
              Jelajahi berbagai komunitas di bawah naungan IAM ITB. Wadah bagi alumni untuk tetap terhubung melalui hobi dan minat yang sama.
            </Text>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.docs.map((community) => (
            <ScrollReveal key={community.id}>
              <Link href={`/komunitas/${community.slug}`} className="group relative block h-full overflow-hidden rounded-2xl border border-brand-dark/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative aspect-16/9 w-full overflow-hidden bg-brand-khaki/30 p-8 flex items-center justify-center">
                  <div className="relative w-24 h-24 transition-transform duration-500 group-hover:scale-110">
                    {typeof community.logo === 'object' && community.logo !== null ? (
                      <Media resource={community.logo} fill className="object-contain filter drop-shadow-md" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <span className="text-brand-primary font-bold text-2xl">{community.communityName?.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col h-full">
                  <Heading level={3} className="mb-3 text-xl transition-colors group-hover:text-brand-red">
                    {community.communityName}
                  </Heading>
                  <Text variant="small" tone="muted" className="line-clamp-2">
                    {community.shortDescription}
                  </Text>
                  <div className="mt-6 pt-4 border-t border-brand-dark/5 flex items-center justify-between">
                    <span className="font-display text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 group-hover:text-brand-red transition-colors">
                      Lihat Detail
                    </span>
                    <span className="text-brand-dark/20 group-hover:text-brand-red transition-colors transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
          {communities.docs.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-brand-dark/5 rounded-3xl">
              <Text variant="editorial" tone="muted">
                Belum ada data komunitas yang tersedia saat ini.
              </Text>
            </div>
          )}
        </div>
      </Section>
    </PageShell>
  )
}
