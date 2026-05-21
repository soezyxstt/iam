import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageShell } from '@/components/PageShell'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { ScrollReveal } from '@/components/ScrollReveal'
import { GlassCard } from '@/components/ui/glass-card'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  return (
    <PageShell className="relative overflow-hidden pb-24">
      {/* ── Ambient background geometry ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
        <div className="absolute -top-44 -right-44 h-[640px] w-[580px] rounded-full bg-brand-gold/12 blur-[110px]" />
        <div className="absolute top-[16%] -left-64 h-[700px] w-[520px] rounded-full bg-brand-primary/15 blur-[110px]" />
        <div className="absolute top-[45%] left-1/2 h-[450px] w-[500px] -translate-x-1/2 rounded-full bg-brand-red/8 blur-[100px]" />
        <div className="absolute bottom-[10%] -left-24 h-[550px] w-[500px] rounded-full bg-brand-gold/10 blur-[110px]" />
        <div className="absolute -bottom-40 -right-40 h-[640px] w-[540px] rounded-full bg-brand-dark/15 blur-[130px]" />
      </div>

      <PageClient />
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <PageHeroHeader title="Berita" subtitle="Ikatan Alumni Mesin ITB" />
        </ScrollReveal>
      </Section>

      <Section className="z-10 py-8 md:py-12" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <GlassCard className="berita-card" variant="stripes" contentClassName="p-6 md:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
              <PageRange
                className="text-white/80"
                collection="posts"
                currentPage={posts.page}
                limit={12}
                totalDocs={posts.totalDocs}
                collectionLabels={{ plural: 'Berita', singular: 'Berita' }}
              />
            </div>

            <CollectionArchive posts={posts.docs} className="px-0 md:px-0" />

            {posts.totalPages > 1 && posts.page && (
              <div className="mt-16 flex justify-center border-t border-white/10 pt-12">
                <Pagination page={posts.page} totalPages={posts.totalPages} tone="onDark" />
              </div>
            )}
          </GlassCard>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Berita - Halaman ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
