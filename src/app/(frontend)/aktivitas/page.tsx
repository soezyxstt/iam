import type { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'

import { AKTIVITAS_ENTRIES } from './aktivitas-data'
import { AktivitasScrollToGridButton } from './AktivitasScrollToGridButton'

export const metadata: Metadata = {
  title: 'Aktivitas',
  description:
    'Aktivitas dan program kerja Ikatan Alumni Mesin ITB — silaturahmi, pengembangan profesional, dan kontribusi bagi almamater.',
}

const INTRO_HERO =
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80'

const OVERVIEW_P1 =
  'IAM ITB menyelenggarakan beragam aktivitas agar alumni tetap terhubung, saling menguatkan di dunia profesional, dan bersama-sama memberi manfaat bagi almamater serta masyarakat. Setiap kegiatan dirancang untuk menjembatani angkatan, memelihara tradisi kebersamaan, dan merespons kebutuhan zaman.'

const OVERVIEW_P2 =
  'Dari forum kebijakan hingga workshop teknis dan aksi sosial, aktivitas-aktivitas ini menjadi wadah nyata untuk berbagi pengetahuan, membuka peluang kolaborasi, dan meneguhkan identitas alumni Teknik Mesin ITB di berbagai sektor.'

export default function AktivitasPage() {
  return (
    <PageShell>
      <Section className="z-10 pb-10 pt-3 md:pb-14 md:pt-4" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <PageHeroHeader 
            title="Aktivitas" 
            subtitle="Ikatan Alumni Mesin ITB" 
          />

          <div className="mx-auto mt-6 max-w-6xl text-left lg:mt-8">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
              <div className="flex flex-col gap-6 lg:col-span-6">
                <div className="space-y-5 text-justify">
                  <Text variant="editorial">{OVERVIEW_P1}</Text>
                  <Text variant="editorial">{OVERVIEW_P2}</Text>
                </div>
                <div className="pt-1">
                  <AktivitasScrollToGridButton />
                </div>
              </div>

              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-brand-dark/10 bg-muted shadow-lg shadow-brand-dark/15 lg:col-span-6">
                <Image
                  src={INTRO_HERO}
                  alt="Ilustrasi kegiatan IAM ITB"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-20 md:pt-0 md:pb-28" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <GlassCard id="aktivitas-grid" className="scroll-mt-14 md:scroll-mt-[4.75rem]" contentClassName="p-8 md:p-10 lg:p-12">
            <div className="relative">
              <div className="mt-2 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {AKTIVITAS_ENTRIES.map((item) => (
                  <article
                    key={item.slug}
                    className="berita-item-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/4 shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-gold/25 hover:shadow-2xl hover:shadow-black/35"
                  >
                    <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-brand-dark/40">
                      <Image
                        src="/media/tangga.jpg"
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
                      <Heading level={3} tone="inverse">{item.title}</Heading>
                      <Text tone="inverse" variant="small" className="md:text-sm">
                        {item.excerpt}
                      </Text>
                      <div className="mt-auto pt-4">
                        <Button href={`/aktivitas/${item.slug}`} variant="secondary" size="sm">
                          Explore More
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}
