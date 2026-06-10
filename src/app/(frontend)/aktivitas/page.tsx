import type { Metadata } from 'next'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/Card'
import { EmptyState } from '@/components/ui/empty-state'

export const metadata: Metadata = {
  title: 'Aktivitas — IAM ITB',
  description: 'Kegiatan dan agenda Ikatan Alumni Mesin ITB.',
}

export const revalidate = 600

export default async function AktivitasPage() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'activities',
    overrideAccess: false,
    limit: 100,
    sort: '-date',
    depth: 1,
  })

  const activities = result.docs

  return (
    <PageShell>
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Aktivitas" subtitle="Kegiatan & Agenda Alumni Mesin ITB" />
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-20 md:pt-0 md:pb-24">
        {activities.length === 0 ? (
          <ScrollReveal>
            <EmptyState
              tone="onLight"
              title="Belum Ada Aktivitas"
              description="Belum ada aktivitas yang tersedia saat ini."
            />
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => {
              return (
                <ScrollReveal key={activity.id}>
                  <Card type="aktivitas" tone="onLight" doc={activity} />
                </ScrollReveal>
              )
            })}
          </div>
        )}
      </Section>
    </PageShell>
  )
}
