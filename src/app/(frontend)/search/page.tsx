import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageShell } from '@/components/PageShell'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Text } from '@/components/ui/typography'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { GlassCard } from '@/components/ui/glass-card'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <PageShell className="pb-24">
      <PageClient />
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4">
        <PageHeroHeader title="Pencarian" subtitle="Ikatan Alumni Mesin ITB" />
        <div className="mx-auto mt-6 max-w-2xl">
          <Search />
        </div>
      </Section>

      <Section className="z-10 py-8 md:py-12">
        <GlassCard className="berita-card" variant="stripes" contentClassName="p-6 md:p-8 lg:p-10">
          {posts.docs && posts.docs.length > 0 ? (
            <CollectionArchive posts={posts.docs as CardPostData[]} />
          ) : (
            <Text tone="inverse" className="text-white/60">Tidak ada hasil ditemukan.</Text>
          )}
        </GlassCard>
      </Section>
    </PageShell>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Pencarian`,
  }
}
