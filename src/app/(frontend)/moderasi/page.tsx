import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Heading, Text } from '@/components/ui/typography'
import { ShieldAlert, LogIn } from 'lucide-react'
import { ModerasiClient } from './ModerasiClient'
import type { AlumniBusiness, JobVacancy } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Moderasi Pengajuan | Admin IAM ITB',
  description: 'Halaman persetujuan untuk pendaftaran usaha alumni dan lowongan kerja.',
}

export default async function ModerasiPage() {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return (
      <PageShell className="pb-24">
        <Section className="z-10 pb-8 pt-3 md:pb-12 md:pt-4">
          <ScrollReveal>
            <PageHeroHeader title="Akses Dibatasi" subtitle="Halaman Moderasi — IAM ITB" />
          </ScrollReveal>
        </Section>

        <Section className="z-10 pt-0 pb-20 md:pt-0 max-w-2xl mx-auto">
          <ScrollReveal>
            <GlassCard variant="stripes" contentClassName="p-8 md:p-12 text-center flex flex-col items-center space-y-6">
              <div className="size-16 rounded-full bg-brand-red/10 border border-brand-red/25 flex items-center justify-center text-brand-red">
                <ShieldAlert className="size-8 animate-pulse" />
              </div>
              <div className="space-y-2">
                <Heading level={3} tone="inverse" className="text-xl md:text-2xl font-bold font-serif">
                  Hak Akses Administrator Diperlukan
                </Heading>
                <Text variant="body" tone="inverse" className="text-white/80 max-w-md mx-auto leading-relaxed">
                  Halaman ini berisi daftar pengajuan usaha alumni dan lowongan kerja yang membutuhkan persetujuan pengurus IAM ITB sebelum diterbitkan.
                </Text>
              </div>
              <Button
                asChild
                variant="secondary"
                className="rounded-full bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-sans font-bold px-8 py-3 flex items-center gap-2 cursor-pointer shadow-lg shadow-black/20"
              >
                <a href={`/admin/login?redirect=${encodeURIComponent('/moderasi')}`}>
                  <LogIn className="size-4" /> Masuk sebagai Admin
                </a>
              </Button>
            </GlassCard>
          </ScrollReveal>
        </Section>
      </PageShell>
    )
  }

  // Fetch pending submissions (overrideAccess: false to follow safety guidelines)
  const [draftBusinessesRes, draftJobsRes] = await Promise.all([
    payload.find({
      collection: 'alumniBusinesses',
      where: {
        _status: {
          equals: 'draft',
        },
      },
      depth: 1,
      limit: 100,
      user,
      overrideAccess: false,
      sort: '-updatedAt',
    }),
    payload.find({
      collection: 'jobVacancies',
      where: {
        _status: {
          equals: 'draft',
        },
      },
      depth: 1,
      limit: 100,
      user,
      overrideAccess: false,
      sort: '-updatedAt',
    }),
  ])

  const draftBusinesses = draftBusinessesRes.docs as unknown as AlumniBusiness[]
  const draftJobs = draftJobsRes.docs as unknown as JobVacancy[]

  return (
    <PageShell className="pb-24">
      <Section className="z-10 pb-8 pt-3 md:pb-12 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Moderasi Pengajuan" subtitle="Halaman Persetujuan Pengurus" />
          <div className="mx-auto mt-6 max-w-2xl text-center font-sans text-[15px] leading-relaxed text-brand-dark/85">
            Tinjau data pendaftaran usaha alumni dan lowongan kerja dari alumni. Klik <strong>Setujui</strong> untuk menerbitkan konten ke situs secara langsung, atau <strong>Tolak</strong> untuk menghapusnya.
          </div>
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-20 md:pt-0 max-w-5xl mx-auto">
        <ScrollReveal>
          <ModerasiClient initialBusinesses={draftBusinesses} initialJobs={draftJobs} />
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}
