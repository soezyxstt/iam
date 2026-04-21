import Image from 'next/image'
import { Handshake, Lightbulb, UserRound } from 'lucide-react'
import type { Metadata } from 'next'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Heading, Text } from '@/components/ui/typography'
import { Section } from '@/components/ui/section'

export const metadata: Metadata = {
  title: 'Organisasi',
  description:
    'Profil, visi misi, dan latar belakang Ikatan Alumni Mesin ITB — IAM ITB.',
}

const PLACEHOLDER_BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

const FOREWORD_AVATAR =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'

const PREVIOUS_CHAIRS = [
  { name: 'Adi Haditya Nursyam', period: 'Periode 2025–2026' },
  { name: 'Adi Haditya Nursyam', period: 'Periode 2024–2025' },
  { name: 'Adi Haditya Nursyam', period: 'Periode 2023–2024' },
  { name: 'Adi Haditya Nursyam', period: 'Periode 2022–2023' },
]

export default function OrganisasiPage() {
  return (
    <PageShell>
      {/* Kata Pengantar — editorial split, no card chrome */}
      <Section
        className="z-10 pb-12 md:pb-20"
        containerClassName="max-w-6xl px-4 md:px-8"
      >
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-0">
            <div className="relative lg:col-span-5 lg:pr-10">
              <div className="absolute -left-4 top-0 hidden h-32 w-px bg-brand-red/35 lg:block" aria-hidden />
              <div className="relative mx-auto max-w-[280px] lg:mx-0 lg:max-w-none">
                <div className="relative aspect-3/4 w-full max-w-[260px] overflow-hidden lg:max-w-none">
                  <Image
                    src={FOREWORD_AVATAR}
                    alt="Ketua IAM ITB"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 280px, 40vw"
                    priority
                  />
                </div>
                <div className="mt-8 border-t border-brand-dark/15 pt-6">
                  <p className="font-serif text-2xl font-bold tracking-tight text-brand-dark">Adi Haditya</p>
                  <p className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
                    Ketua IAM ITB
                  </p>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-7 lg:border-l lg:border-brand-dark/10 lg:pl-12 lg:pt-2">
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-red">
                Pembukaan
              </span>
              <Heading level={2} className="mt-3 mb-8">
                Kata Pengantar
              </Heading>
              <div className="flex max-w-2xl flex-col gap-5">
                <Text className="text-[15px] leading-[1.75]">{PLACEHOLDER_BODY}</Text>
                <Text className="text-[15px] leading-[1.75]">{PLACEHOLDER_BODY}</Text>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Visi dan Misi — dark band: gold accents read better on navy than red */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-brand-primary to-brand-dark" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-8">
          <ScrollReveal className="max-w-2xl">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold">
              Arah organisasi
            </span>
            <Heading level={2} tone="inverse" className="mt-3">
              Visi dan Misi
            </Heading>
            <p className="mt-4 font-display text-sm font-medium text-brand-gold/90">
              Lorem Ipsum Dolor Sit Amet
            </p>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-12 border-t border-white/15 pt-12 lg:grid-cols-2 lg:gap-0 lg:border-t-0 lg:pt-0">
            {[
              {
                title: 'Visi',
                icon: Lightbulb,
                body: PLACEHOLDER_BODY,
              },
              {
                title: 'Misi',
                icon: Handshake,
                body: PLACEHOLDER_BODY,
              },
            ].map((item, idx) => (
              <ScrollReveal key={item.title}>
                <div
                  className={
                    idx === 1 ? 'lg:border-l lg:border-white/15 lg:pl-12 xl:pl-16' : 'lg:pr-8'
                  }
                >
                  <div className="flex items-baseline gap-3">
                    <item.icon
                      className="size-5 shrink-0 text-brand-gold"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span className="font-serif text-3xl font-bold text-white md:text-4xl">{item.title}</span>
                  </div>
                  <div className="mt-6 h-px w-12 bg-brand-gold/55" />
                  <Text tone="inverse" className="mt-6 max-w-prose text-[15px] leading-[1.75] text-white/72">
                    {item.body}
                  </Text>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latar Belakang — text + logo as figure, no frame */}
      <Section className="z-10" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
            <div className="max-w-xl lg:max-w-[52%]">
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-red">
                Konteks
              </span>
              <Heading level={2} className="mt-3 mb-8">
                Latar Belakang
              </Heading>
              <div className="flex flex-col gap-5">
                <Text className="text-[15px] leading-[1.75]">{PLACEHOLDER_BODY}</Text>
                <Text className="text-[15px] leading-[1.75]">{PLACEHOLDER_BODY}</Text>
              </div>
            </div>
            <div className="relative flex flex-1 justify-center lg:justify-end">
              <div className="relative w-full max-w-[220px] opacity-[0.92] lg:max-w-[260px]">
                <div className="pointer-events-none absolute -inset-8 rounded-full bg-brand-primary/5 blur-3xl" aria-hidden />
                <div className="relative aspect-square">
                  <Image
                    src="/logo.png"
                    alt="Lambang IAM ITB"
                    fill
                    className="object-contain drop-shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Profil Ketua Sebelumnya — full-bleed tone, list rows not tiles */}
      <section className="relative z-10 mt-8 border-t border-brand-dark/10 bg-linear-to-b from-brand-dark/3 to-transparent py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <ScrollReveal className="mb-12 text-center lg:text-left">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-red">
              Jejak kepemimpinan
            </span>
            <Heading level={2} className="mt-3">
              Profil Ketua Sebelumnya
            </Heading>
          </ScrollReveal>

          <div className="divide-y divide-brand-dark/10 border-y border-brand-dark/10">
            {PREVIOUS_CHAIRS.map((row, idx) => (
              <ScrollReveal key={idx}>
                <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 md:py-7">
                  <div className="flex items-center gap-4">
                    <UserRound
                      className="size-5 shrink-0 text-brand-red/90"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <p className="font-display text-base font-semibold text-brand-dark">{row.name}</p>
                  </div>
                  <p className="font-display text-sm tabular-nums text-brand-light sm:text-right">{row.period}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center lg:justify-start">
            <Button type="button" variant="outline" size="sm" className="border-brand-dark/25">
              Lihat Lebih Banyak
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
