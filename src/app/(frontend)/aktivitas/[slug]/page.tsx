import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Text } from '@/components/ui/typography'

import { getAktivitasBySlug, AKTIVITAS_ENTRIES } from '../aktivitas-data'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return AKTIVITAS_ENTRIES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const aktivitas = getAktivitasBySlug(slug)
  if (!aktivitas) {
    return { title: 'Aktivitas' }
  }
  return {
    title: aktivitas.title,
    description: aktivitas.excerpt,
  }
}

export default async function AktivitasDetailPage({ params }: PageProps) {
  const { slug } = await params
  const aktivitas = getAktivitasBySlug(slug)
  if (!aktivitas) notFound()

  return (
    <PageShell>
      <Section className="z-10 pb-10 pt-3 md:pb-14 md:pt-4" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-6 flex justify-start">
            <Button href="/aktivitas" variant="outline" size="sm" className="border-brand-dark/25">
              ← Kembali ke Aktivitas
            </Button>
          </div>
          <PageHeroHeader
            title={aktivitas.title}
            subtitle="Ikatan Alumni Mesin ITB"
            description={<Text className="text-brand-dark/80">{aktivitas.excerpt}</Text>}
          />
        </ScrollReveal>
      </Section>

      <section className="relative z-10 pt-6 pb-16 md:pt-8 md:pb-24">
        <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-brand-primary to-brand-dark" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl space-y-6">
              {aktivitas.bodyParagraphs.map((para, i) => (
                <Text key={i} tone="inverse" className="text-[15px] leading-[1.75] text-white/75">
                  {para}
                </Text>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Section className="z-10 py-12 md:py-16" containerClassName="max-w-6xl px-4 md:px-8">
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
