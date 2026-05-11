import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Handshake, Lightbulb } from 'lucide-react'
import type { Metadata } from 'next'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'

import { PREVIOUS_CHAIR_ENTRIES } from './previous-chairs-data'

export const metadata: Metadata = {
  title: 'Organisasi',
  description:
    'Profil, visi misi, dan latar belakang Ikatan Alumni Mesin ITB — IAM ITB.',
}

const PLACEHOLDER_BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

const FOREWORD_AVATAR =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'

export default function OrganisasiPage() {
  return (
    <PageShell>
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <PageHeroHeader title="Organisasi" subtitle="Ikatan Alumni Mesin ITB" />
        </ScrollReveal>
      </Section>

      {/* Kata Pengantar — editorial split, no card chrome */}
      <Section
        className="z-10 pt-0 pb-12 md:pt-0 md:pb-20"
        containerClassName="max-w-6xl px-4 md:px-8"
      >
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-0 lg:gap-y-0">
            <div className="flex flex-col items-center lg:col-span-3 lg:items-end lg:pr-7">
              <div className="relative w-full max-w-[200px] sm:max-w-[220px] lg:w-[220px] lg:max-w-none lg:shrink-0">
                <div
                  className="absolute -left-3 top-0 hidden h-30 w-px bg-brand-red/35 lg:block"
                  aria-hidden
                />
                <div className="relative aspect-4/5 w-full overflow-hidden">
                  <Image
                    src={FOREWORD_AVATAR}
                    alt="Ketua IAM ITB"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 200px, 220px"
                    priority
                  />
                </div>
                <div className="mt-7 border-t border-brand-dark/15 pt-6">
                  <Text tone="strong" className="font-serif text-xl font-bold tracking-tight sm:text-[1.35rem]">
                    Adi Haditya
                  </Text>
                  <Eyebrow tone="muted" className="mt-2 tracking-[0.2em]">
                    Ketua IAM ITB
                  </Eyebrow>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-9 lg:border-l lg:border-brand-dark/12 lg:pl-8 lg:pr-2 lg:pt-1 xl:pl-10">
              <Eyebrow tone="red">Pembukaan</Eyebrow>
              <Heading level={2} className="mt-3 mb-7 md:mb-8">
                Kata Pengantar
              </Heading>
              <div className="flex flex-col gap-6 max-w-prose mx-auto lg:mx-0">
                <Text variant="editorial" className="leading-loose">{PLACEHOLDER_BODY}</Text>
                <Text variant="editorial" className="leading-loose">{PLACEHOLDER_BODY}</Text>
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
            <Eyebrow tone="gold">Arah organisasi</Eyebrow>
            <Heading level={2} tone="inverse" className="mt-3">
              Visi dan Misi
            </Heading>
            <Text variant="editorial" tone="accent" className="mt-4 font-display font-medium">
              Lorem Ipsum Dolor Sit Amet
            </Text>
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
                    <Heading level={2} tone="inverse" className="text-3xl md:text-4xl">{item.title}</Heading>
                  </div>
                  <div className="mt-6 h-px w-12 bg-brand-gold/55" />
                  <Text variant="editorial" tone="inverse" className="mt-6 max-w-prose text-white/72 leading-loose">
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
              <Eyebrow tone="red">Konteks</Eyebrow>
              <Heading level={2} className="mt-3 mb-8">
                Latar Belakang
              </Heading>
              <div className="flex flex-col gap-6 max-w-prose mx-auto lg:mx-0">
                <Text variant="editorial" className="leading-loose">{PLACEHOLDER_BODY}</Text>
                <Text variant="editorial" className="leading-loose">{PLACEHOLDER_BODY}</Text>
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
            <Eyebrow tone="red">Jejak kepemimpinan</Eyebrow>
            <Heading level={2} className="mt-3">
              Profil Ketua Sebelumnya
            </Heading>
          </ScrollReveal>

          <ul className="divide-y divide-brand-dark/10 border-y border-brand-dark/10">
            {PREVIOUS_CHAIR_ENTRIES.map((chair) => (
              <li key={chair.slug}>
                <ScrollReveal>
                  <Link
                    href={`/organisasi/ketua-sebelumnya/${chair.slug}`}
                    aria-label={`Lihat profil ${chair.name}, ${chair.periodLabel}`}
                    className="group relative flex flex-col gap-3 py-6 transition-colors duration-300 hover:bg-brand-dark/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2 sm:flex-row sm:items-center sm:justify-between sm:gap-8 md:py-7"
                  >
                    <div className="flex items-center gap-4">
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-1 ring-brand-dark/10 sm:size-14">
                        <Image
                          src={chair.portraitSrc}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </span>
                      <div>
                        <Text variant="body" tone="strong" className="font-display text-base font-semibold transition-colors duration-300 group-hover:text-brand-primary">
                          {chair.name}
                        </Text>
                        <Eyebrow tone="muted" className="mt-0.5 tracking-[0.18em]">
                          {chair.majorLabel}
                        </Eyebrow>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Text variant="small" tone="light" className="font-display tabular-nums transition-colors duration-300 group-hover:text-brand-dark sm:text-right">
                        {chair.periodLabel}
                      </Text>
                      <ChevronRight
                        className="size-4 shrink-0 text-brand-dark/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-red"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </div>
                  </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  )
}
