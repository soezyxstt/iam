import type { Metadata } from 'next'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Heading } from '@/components/ui/typography'
import { Section } from '@/components/ui/section'

import { GALLERY_GROUPS } from './galeri-data'
import { GaleriView } from './GaleriView'

export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Album dokumentasi kegiatan IAM ITB.',
}

export default function GaleriPage() {
  return (
    <PageShell>
      <Section className="z-10 pb-2 pt-4" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <div className="border-b border-brand-dark/15 pb-8 md:pb-10">
            <Heading level={1} className="text-center">
              Galeri IAM ITB
            </Heading>
            <p className="mx-auto mt-3 max-w-lg text-center font-display text-sm text-brand-light">
              Dokumentasi kegiatan — gunakan daftar album di samping (desktop) atau di atas (mobile),
              lalu scroll untuk menjelajah.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      <GaleriView groups={GALLERY_GROUPS} />
    </PageShell>
  )
}
