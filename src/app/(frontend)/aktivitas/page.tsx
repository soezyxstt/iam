import type { Metadata } from 'next'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Aktivitas — IAM ITB',
  description: 'Kegiatan dan agenda Ikatan Alumni Mesin ITB.',
}

export const revalidate = 600

const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  pulang_kampus: 'Pulang Kampus',
  beasiswa: 'Beasiswa IAM ITB',
  reuni: 'Reuni Akbar',
  kongres: 'Kongres IAM ITB',
  agenda_rutin: 'Agenda Rutin',
  lainnya: 'Lainnya',
}

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
            <div className="py-20 text-center border-2 border-dashed border-brand-dark/5 rounded-3xl">
              <Text variant="editorial" tone="muted">
                Belum ada aktivitas yang tersedia saat ini.
              </Text>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => {
              const hero =
                typeof activity.heroImage === 'object' && activity.heroImage !== null
                  ? (activity.heroImage as { url?: string; alt?: string })
                  : null
              const typeLabel =
                ACTIVITY_TYPE_LABELS[activity.activityType ?? 'lainnya'] ?? 'Lainnya'
              const dateStr = activity.date
                ? new Date(activity.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : null

              return (
                <ScrollReveal key={activity.id}>
                  <Link
                    href={`/aktivitas/${activity.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-brand-dark/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div className="relative aspect-video overflow-hidden bg-brand-khaki/30">
                      {hero?.url ? (
                        <Image
                          src={hero.url}
                          alt={hero.alt ?? activity.activityName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-primary/10">
                          <span className="font-display text-4xl font-bold text-brand-primary/20">
                            IAM
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center rounded-full bg-brand-dark/80 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                          {typeLabel}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-2">
                      {dateStr && (
                        <Eyebrow tone="red" className="text-[10px]">
                          {dateStr}
                        </Eyebrow>
                      )}
                      <Heading
                        level={3}
                        className="text-lg leading-snug transition-colors group-hover:text-brand-red"
                      >
                        {activity.activityName}
                      </Heading>
                      {activity.excerpt && (
                        <Text variant="small" tone="muted" className="line-clamp-2 mt-1">
                          {activity.excerpt}
                        </Text>
                      )}
                      <div className="mt-4 pt-4 border-t border-brand-dark/5 flex items-center justify-between">
                        <span className="font-display text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 group-hover:text-brand-red transition-colors">
                          Selengkapnya
                        </span>
                        <span className="text-brand-dark/20 transition-all group-hover:text-brand-red group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        )}
      </Section>
    </PageShell>
  )
}
