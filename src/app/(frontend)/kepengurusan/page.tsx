import Image from 'next/image'
import type { Metadata } from 'next'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Heading, Text } from '@/components/ui/typography'
import { Section } from '@/components/ui/section'
import { KepengurusanBoard } from './KepengurusanBoard'

export const metadata: Metadata = {
  title: 'Kepengurusan',
  description: 'Organogram dan struktur kepengurusan IAM ITB.',
}

const ORG_PLACEHOLDER_LINES = [0, 1, 2].map((i) => (
  <div
    key={i}
    className="h-px w-full bg-white/20"
    style={{ opacity: 0.35 + i * 0.2 }}
  />
))

const TEAM = [
  {
    src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    name: 'Adi Haditya Nursyam',
    role: 'Ketua',
  },
  {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    name: 'Budi Santoso',
    role: 'Wakil Ketua',
  },
  {
    src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    name: 'Citra Lestari',
    role: 'Sekretaris',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    name: 'Dedi Kurniawan',
    role: 'Bendahara',
  },
]

export default function KepengurusanPage() {
  return (
    <PageShell>
      <Section className="z-10 pb-8" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <Heading level={1} className="text-center">
            Organogram
          </Heading>
          <Text className="mt-3 text-center font-display text-base text-brand-light md:text-lg">
            Kepengurusan IAM ITB
          </Text>
        </ScrollReveal>
      </Section>

      {/* Organogram placeholder: full-width band, no rounded card frame */}
      <section className="relative z-10 mb-16 md:mb-20">
        <div className="border-y border-white/10 bg-linear-to-b from-brand-primary via-brand-dark to-[#03060c]">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
            <ScrollReveal>
              <div className="flex min-h-[260px] flex-col md:min-h-[300px]">
                <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-8">
                  <div className="relative h-11 w-11 md:h-14 md:w-14">
                    <Image src="/logo.png" alt="" fill className="object-contain opacity-95" />
                  </div>
                  <div className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold">
                    Struktur
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-8 py-12 md:gap-10 md:py-16">
                  {ORG_PLACEHOLDER_LINES}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Section className="z-10 pt-0" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-red">
              Struktur kerja
            </span>
            <Heading level={2} className="mt-3">
              Dewan dan Bidang Kerja
            </Heading>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <KepengurusanBoard />
        </ScrollReveal>
      </Section>

      <Section className="z-10 border-t border-brand-dark/10 pb-20 pt-16 md:pt-20" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-12 text-center md:text-left">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-red">
              Tim
            </span>
            <Heading level={2} className="mt-3">
              Pengurus
            </Heading>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {TEAM.map((member) => (
            <ScrollReveal key={member.name}>
              <div className="group">
                <div className="relative aspect-3/4 overflow-hidden bg-muted">
                  <Image
                    src={member.src}
                    alt={member.name}
                    fill
                    className="object-cover grayscale-[0.15] transition-[filter,transform] duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>
                <div className="mt-5 border-t border-brand-dark/10 pt-4">
                  <p className="font-serif text-lg font-bold text-brand-dark">{member.name}</p>
                  <p className="mt-1 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-red">
                    {member.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
