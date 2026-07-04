import type { Metadata } from 'next'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { EmptyState } from '@/components/ui/empty-state'

import type { GalleryGroup } from './GaleriView'
import { GaleriView } from './GaleriView'
import type { GalleryImage } from './GalleryImageGrid'
import { parseVideoEmbed } from '@/utilities/videoEmbed'

export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Album dokumentasi kegiatan IAM ITB.',
}

export const dynamic = 'force-dynamic'

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

    const images: GalleryImage[] = []

    for (const item of items.docs) {
      if (typeof item.media === 'object' && item.media !== null) {
        const media = item.media as { url?: string; alt?: string; filename?: string }
        images.push({
          src: media.url ?? '',
          alt: item.description ?? media.alt ?? media.filename ?? 'Foto kegiatan',
          caption: item.description ?? undefined,
        })
        continue
      }

      // Embed-only entries (YouTube/Vimeo URL without an uploaded file)
      const embed = typeof item.embedUrl === 'string' ? parseVideoEmbed(item.embedUrl) : null
      if (embed) {
        images.push({
          src: embed.thumbnail ?? '',
          alt: item.description ?? 'Video kegiatan',
          caption: item.description ?? undefined,
          embedSrc: embed.embedSrc,
        })
      }
    }

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
          <EmptyState
            tone="onLight"
            title="Belum Ada Galeri"
            description="Belum ada album galeri yang tersedia saat ini."
          />
        </Section>
      ) : (
        <GaleriView groups={groups} />
      )}
    </PageShell>
  )
}
