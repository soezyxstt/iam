import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Text } from '@/components/ui/typography'
import { GlassCard } from '@/components/ui/glass-card'

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
      <Section className="z-10 pb-10 pt-3 md:pb-14 md:pt-4">
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

      <Section className="relative z-10 pt-6 pb-16 md:pt-8 md:pb-24">
        <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-brand-primary to-brand-dark -z-10" />
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Content Body wrapped in GlassCard */}
            <div className="md:col-span-8">
              <GlassCard className="p-8 md:p-10 border-white/10 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl">
                <div className="space-y-6">
                  {aktivitas.bodyParagraphs.map((para, i) => (
                    <Text key={i} tone="inverse" className="text-[16px] leading-[1.85] text-white/80">
                      {para}
                    </Text>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Right: Info panel/Sidebar wrapped in GlassCard */}
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
                    <span className="mt-1 block font-sans text-sm font-semibold text-white capitalize">
                      {aktivitas.category}
                    </span>
                  </div>

                  <div className="pt-4">
                    <span className="block font-display text-[10px] font-medium uppercase tracking-wider text-white/40">
                      Penyelenggara
                    </span>
                    <span className="mt-1 block font-sans text-sm font-semibold text-white">
                      Ikatan Alumni Mesin ITB
                    </span>
                  </div>

                  <div className="pt-4">
                    <span className="block font-display text-[10px] font-medium uppercase tracking-wider text-white/40">
                      Status Program
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-brand-gold/15 px-2.5 py-0.5 text-xs font-semibold text-brand-gold">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
                      Terlaksana / Rutin
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
