import type { Metadata } from 'next'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Text } from '@/components/ui/typography'

import type { GalleryGroup } from './GaleriView'
import { GaleriView } from './GaleriView'

export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Album dokumentasi kegiatan IAM ITB.',
}

export const revalidate = 600

export default async function GaleriPage() {
  const payload = await getPayload({ config: configPromise })

  const categoriesResult = await payload.find({
    collection: 'galleryCategories',
    overrideAccess: false,
    limit: 100,
    sort: 'createdAt',
  })

  const groups: GalleryGroup[] = []

  for (const cat of categoriesResult.docs) {
    const items = await payload.find({
      collection: 'galleries',
      overrideAccess: false,
      where: { category: { equals: cat.id } },
      limit: 100,
      depth: 1,
    })

    const images = items.docs
      .filter((item) => typeof item.media === 'object' && item.media !== null)
      .map((item) => {
        const media = item.media as { url?: string; alt?: string; filename?: string }
        return {
          src: media.url ?? '',
          alt: item.description ?? media.alt ?? media.filename ?? 'Foto kegiatan',
          caption: item.description ?? undefined,
        }
      })

    if (images.length > 0) {
      groups.push({
        id: String(cat.id),
        title: cat.title,
        subtitle: cat.subtitle ?? undefined,
        images,
      })
    }
  }

  return (
    <PageShell className="pb-16 md:pb-24">
      <Section className="z-10 pb-4 pt-3 md:pb-8 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Galeri" subtitle="Ikatan Alumni Mesin ITB" />
        </ScrollReveal>
      </Section>

      {groups.length === 0 ? (
        <Section className="z-10 py-20">
          <div className="py-20 text-center border-2 border-dashed border-brand-dark/5 rounded-3xl">
            <Text variant="editorial" tone="muted">
              Belum ada album galeri yang tersedia saat ini.
            </Text>
          </div>
        </Section>
      ) : (
        <GaleriView groups={groups} />
      )}
    </PageShell>
  )
}
