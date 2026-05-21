import type { Metadata } from 'next'
import React from 'react'
import { Calendar, Clock, Wrench } from 'lucide-react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Aktivitas — IAM ITB',
  description: 'Halaman Aktivitas Ikatan Alumni Mesin ITB sedang dalam pengembangan.',
}

export default function AktivitasPage() {
  return (
    <PageShell>
      {/* Hero Header Section */}
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader
            title="Aktivitas"
            subtitle="Kegiatan & Agenda Alumni Mesin ITB"
          />
        </ScrollReveal>
      </Section>

      {/* Main Content Area */}
      <Section className="z-10 pt-0 pb-20 md:pt-0 md:pb-24">
        <ScrollReveal>
          <GlassCard
            variant="stripes"
            className="border-white/10"
            contentClassName="p-8 md:p-10 text-center flex flex-col items-center"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 px-3.5 py-1 text-xs font-semibold text-brand-gold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
              </span>
              Dalam Pengembangan
            </div>

            <Heading level={2} tone="inverse" className="text-2xl md:text-3xl font-bold tracking-tight">
              Halaman Aktivitas Sedang dalam Pengembangan
            </Heading>

            <Text variant="body" tone="inverse" className="mt-4 max-w-lg text-white/80 text-center leading-relaxed">
              Kami sedang menyiapkan ruang interaktif bagi alumni Mesin ITB untuk memantau, mendaftar, dan berpartisipasi dalam berbagai agenda mendatang.
            </Text>

            {/* Divider line */}
            <div className="w-full mt-10 border-t border-white/10" />

            {/* Feature Teasers */}
            <div className="w-full mt-8 text-center">
              <Text variant="small" tone="accent" className="font-display font-bold uppercase tracking-wider block mb-8">
                Rencana Fitur yang Sedang Disiapkan:
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
                <div className="flex flex-col items-center p-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4">
                    <Calendar className="w-6 h-6 text-brand-gold" />
                  </div>
                  <Text variant="body" tone="inverse" className="font-semibold text-base">Kalender Agenda</Text>
                  <Text variant="small" tone="inverse" className="text-white/60 mt-2 max-w-xs mx-auto">
                    Jadwal lengkap temu alumni, reuni, seminar, dan agenda sosial.
                  </Text>
                </div>

                <div className="flex flex-col items-center p-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4">
                    <Clock className="w-6 h-6 text-brand-gold" />
                  </div>
                  <Text variant="body" tone="inverse" className="font-semibold text-base">Registrasi Terintegrasi</Text>
                  <Text variant="small" tone="inverse" className="text-white/60 mt-2 max-w-xs mx-auto">
                    Pendaftaran mudah untuk setiap kegiatan langsung melalui situs ini.
                  </Text>
                </div>

                <div className="flex flex-col items-center p-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4">
                    <Wrench className="w-6 h-6 text-brand-gold" />
                  </div>
                  <Text variant="body" tone="inverse" className="font-semibold text-base">Dokumentasi & Laporan</Text>
                  <Text variant="small" tone="inverse" className="text-white/60 mt-2 max-w-xs mx-auto">
                    Arsip dokumentasi, materi pembicara, dan rangkuman kegiatan sebelumnya.
                  </Text>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full justify-center">
              <Button variant="secondary" size="md" href="/">
                Kembali ke Beranda
              </Button>
              <Button
                variant="outline"
                size="md"
                href="/berita"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Lihat Berita Terbaru
              </Button>
            </div>
          </GlassCard>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}

