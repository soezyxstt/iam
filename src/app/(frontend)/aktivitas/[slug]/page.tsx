import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Text } from '@/components/ui/typography'
import { GlassCard } from '@/components/ui/glass-card'
import RichText from '@/components/RichText'

type PageProps = {
  params: Promise<{ slug: string }>
}

const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  pulang_kampus: 'Pulang Kampus',
  beasiswa: 'Beasiswa IAM ITB',
  reuni: 'Reuni Akbar',
  kongres: 'Kongres IAM ITB',
  agenda_rutin: 'Agenda Rutin',
  lainnya: 'Lainnya',
}

async function getActivity(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'activities',
    overrideAccess: false,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'activities',
    overrideAccess: false,
    limit: 1000,
  })
  return result.docs.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const activity = await getActivity(slug)
  if (!activity) return { title: 'Aktivitas' }
  return {
    title: activity.activityName,
    description: activity.excerpt ?? undefined,
  }
}

export default async function AktivitasDetailPage({ params }: PageProps) {
  const { slug } = await params
  const activity = await getActivity(slug)
  if (!activity) notFound()

  const hero =
    typeof activity.heroImage === 'object' && activity.heroImage !== null
      ? (activity.heroImage as { url?: string; alt?: string })
      : null

  const dateStr = activity.date
    ? new Date(activity.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  const typeLabel = ACTIVITY_TYPE_LABELS[activity.activityType ?? 'lainnya'] ?? 'Lainnya'

  return (
    <PageShell>
      <Section className="z-10 pb-10 pt-3 md:pb-14 md:pt-4">
        <ScrollReveal>
          <div className="mb-6 flex justify-start">
            <Button href="/aktivitas" variant="outline" size="sm" className="border-brand-dark/25">
              ← Kembali ke Aktivitas
            </Button>
          </div>
          <PageHeroHeader
            title={activity.activityName}
            subtitle="Ikatan Alumni Mesin ITB"
            description={
              activity.excerpt ? (
                <Text className="text-brand-dark/80">{activity.excerpt}</Text>
              ) : undefined
            }
          />
        </ScrollReveal>
      </Section>

      {hero?.url && (
        <Section className="z-10 pt-0 pb-8 md:pb-12">
          <ScrollReveal>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={hero.url}
                alt={hero.alt ?? activity.activityName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          </ScrollReveal>
        </Section>
      )}

      <Section className="relative z-10 pt-6 pb-16 md:pt-8 md:pb-24">
        <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-brand-primary to-brand-dark -z-10" />
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8">
              <GlassCard className="p-8 md:p-10 border-white/10 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl">
                <RichText data={activity.description} enableGutter={false} />
              </GlassCard>
            </div>

            <div className="md:col-span-4">
              <GlassCard className="p-6 border-white/10 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl space-y-6">
                <div>
                  <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                    Detail Aktivitas
                  </h3>
                  <div className="h-[2px] w-8 bg-brand-gold/60 mt-2" />
                </div>

                <div className="divide-y divide-white/10 space-y-4">
                  <div className="pt-2">
                    <span className="block font-display text-[10px] font-medium uppercase tracking-wider text-white/40">
                      Kategori
                    </span>
                    <span className="mt-1 block font-sans text-sm font-semibold text-white">
                      {typeLabel}
                    </span>
                  </div>

                  {dateStr && (
                    <div className="pt-4">
                      <span className="block font-display text-[10px] font-medium uppercase tracking-wider text-white/40">
                        Tanggal
                      </span>
                      <span className="mt-1 block font-sans text-sm font-semibold text-white">
                        {dateStr}
                      </span>
                    </div>
                  )}

                  <div className="pt-4">
                    <span className="block font-display text-[10px] font-medium uppercase tracking-wider text-white/40">
                      Penyelenggara
                    </span>
                    <span className="mt-1 block font-sans text-sm font-semibold text-white">
                      Ikatan Alumni Mesin ITB
                    </span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <Section className="z-10 py-12 md:py-16">
        <ScrollReveal>
          <div className="flex flex-col items-start gap-6 border-t border-brand-dark/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md font-display text-sm text-brand-dark/70">
              Tertarik dengan aktivitas lain IAM ITB? Jelajahi daftar lengkap kegiatan kami.
            </p>
            <Button href="/aktivitas" variant="secondary" size="md">
              Lihat semua aktivitas
            </Button>
          </div>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}
