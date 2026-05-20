import type { Metadata } from 'next'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'

import { GALLERY_GROUPS } from './galeri-data'
import { GaleriView } from './GaleriView'

export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Album dokumentasi kegiatan IAM ITB.',
}

export default function GaleriPage() {
  return (
    <PageShell className="pb-16 md:pb-24">
      <Section className="z-10 pb-4 pt-3 md:pb-8 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Galeri" subtitle="Ikatan Alumni Mesin ITB" />
        </ScrollReveal>
      </Section>

      <GaleriView groups={GALLERY_GROUPS} />
    </PageShell>
  )
}
