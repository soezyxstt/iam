import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Section } from '@/components/ui/section'
import { Heading, Text, Eyebrow } from '@/components/ui/typography'

import { Card } from '@/components/Card'
import { EmptyState } from '@/components/ui/empty-state'
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
              <Card type="komunitas" tone="onLight" doc={community} />
            </ScrollReveal>
          ))}
          {communities.docs.length === 0 && (
            <div className="col-span-full">
              <EmptyState
                tone="onLight"
                title="Belum Ada Komunitas"
                description="Belum ada data komunitas yang tersedia saat ini."
              />
            </div>
          )}
        </div>
      </Section>
    </PageShell>
  )
}
