import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { PageShell } from '@/components/PageShell'
import { Pagination } from '@/components/Pagination'
import { ScrollReveal } from '@/components/ScrollReveal'
import { GlassCard } from '@/components/ui/glass-card'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Eyebrow } from '@/components/ui/typography'
import { EmptyState } from '@/components/ui/empty-state'
import { Section } from '@/components/ui/section'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import configPromise from '@payload-config'
import type { Where } from 'payload'

const PAGE_SIZE = 12

function buildBeritaUrl(q?: string, category?: string, page?: number): string {
  const params = new URLSearchParams()
  if (q?.trim()) params.set('q', q.trim())
  if (category) params.set('category', category)
  if (page && page > 1) params.set('page', String(page))
  const qs = params.toString()
  return qs ? `/berita?${qs}` : '/berita'
}

type SearchParams = Promise<{
  q?: string
  category?: string
  page?: string
}>

export default async function Page({
  searchParams: searchParamsPromise,
}: {
  searchParams: SearchParams
}) {
  const sp = await searchParamsPromise
  const qRaw = typeof sp.q === 'string' ? sp.q : ''
  const qTrim = qRaw.trim()
  const categoryParam = typeof sp.category === 'string' ? sp.category : ''
  const pageParsed = Number.parseInt(sp.page ?? '1', 10)
  const currentPage =
    Number.isFinite(pageParsed) && pageParsed > 0 ? Math.floor(pageParsed) : 1

  const payload = await getPayload({ config: configPromise })

  // Fetch categories dynamically
  const categoriesData = await payload.find({
    collection: 'categories',
    limit: 100,
    overrideAccess: false,
    sort: 'title',
  })

  const CATEGORY_FILTERS = [
    { value: '', label: 'Semua' },
    ...categoriesData.docs.map((cat) => ({
      value: cat.slug || '',
      label: cat.title,
    })),
  ]

  const whereParts: Where[] = []
  if (categoryParam) {
    whereParts.push({ 'categories.slug': { equals: categoryParam } })
  }
  if (qTrim) {
    whereParts.push({
      or: [
        { title: { like: qTrim } },
        { 'meta.description': { like: qTrim } },
      ],
    })
  }

  let where: Where | undefined
  if (whereParts.length === 1) {
    where = whereParts[0]
  } else if (whereParts.length > 1) {
    where = { and: whereParts }
  }

  let pageToFetch = currentPage
  let result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: PAGE_SIZE,
    page: pageToFetch,
    overrideAccess: false,
    sort: '-publishedAt',
    ...(where ? { where } : {}),
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
      heroImage: true,
    },
  })

  const totalPages = Math.max(1, result.totalPages ?? 1)
  if (pageToFetch > totalPages) {
    pageToFetch = totalPages
    result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: PAGE_SIZE,
      page: pageToFetch,
      overrideAccess: false,
      sort: '-publishedAt',
      ...(where ? { where } : {}),
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
        publishedAt: true,
        heroImage: true,
      },
    })
  }

  const pageForPager = pageToFetch
  const docs = result.docs
  const queryLink = {
    pathname: '/berita' as const,
    searchParams: {
      ...(qTrim ? { q: qTrim } : {}),
      ...(categoryParam ? { category: categoryParam } : {}),
    },
  }

  return (
    <PageShell className="pb-24">
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Berita" subtitle="Ikatan Alumni Mesin ITB" />
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-20 md:pt-0 md:pb-28">
        <ScrollReveal>
          <GlassCard
            id="berita-archive-grid"
            className="berita-card scroll-mt-14 md:scroll-mt-19"
            variant="stripes"
            contentClassName="p-6 md:p-8 lg:p-10"
          >
            <div className="relative space-y-8">
              <Eyebrow tone="gold" className="text-center block text-xs md:text-sm tracking-[0.28em]">
                Arsip Berita & Opini
              </Eyebrow>

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <form
                  action="/berita"
                  method="get"
                  className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center"
                  role="search"
                >
                  <Input
                    type="search"
                    name="q"
                    placeholder="Cari berita..."
                    defaultValue={qRaw}
                    className={cn(
                      'h-11 rounded-xl border-white/15 bg-white/8 font-sans text-sm text-white shadow-inner shadow-black/20 md:text-[15px]',
                      'placeholder:text-white/45 focus-visible:border-brand-gold/40 focus-visible:ring-brand-gold/25',
                      'sm:max-w-md sm:flex-1',
                    )}
                    aria-label="Cari berita"
                  />
                  {categoryParam ? (
                    <input type="hidden" name="category" value={categoryParam} />
                  ) : null}
                  <Button type="submit" variant="secondary" size="sm" className="shrink-0 rounded-full">
                    Cari
                  </Button>
                </form>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORY_FILTERS.map((filt) => {
                  const active = filt.value === categoryParam
                  const href = buildBeritaUrl(qTrim, filt.value, 1)
                  return (
                    <Link
                      key={filt.label}
                      href={href}
                      scroll={false}
                      className={cn(
                        'rounded-full px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-wider transition-colors',
                        active
                          ? 'bg-brand-gold text-brand-dark'
                          : 'border border-white/15 bg-white/6 text-white/85 hover:border-brand-gold/35 hover:bg-white/10 hover:text-white',
                      )}
                    >
                      {filt.label}
                    </Link>
                  )
                })}
              </div>

              <div className="font-sans text-sm text-white/80 md:text-[15px]">
                <PageRange
                  className="text-white/80"
                  currentPage={pageForPager}
                  limit={PAGE_SIZE}
                  totalDocs={result.totalDocs}
                  collectionLabels={{ plural: 'berita', singular: 'berita' }}
                />
              </div>

              {docs.length === 0 ? (
                <EmptyState
                  tone="onDark"
                  title="Belum ada berita yang ditemukan"
                  description={
                    qTrim || categoryParam
                      ? 'Coba ubah kata kunci atau filter kategori, atau hapus penyaring untuk melihat semua.'
                      : 'Arsip berita kosong.'
                  }
                  actionHref={qTrim || categoryParam ? '/berita' : undefined}
                  actionLabel="Tampilkan semua"
                />
              ) : (
                <>
                  <CollectionArchive posts={docs} />

                  {totalPages > 1 ? (
                    <div className="mt-16 flex justify-center border-t border-white/10 pt-12">
                      <Pagination
                        page={pageForPager}
                        totalPages={totalPages}
                        queryLink={queryLink}
                        tone="onDark"
                        scrollAlignId="berita-archive-grid"
                      />
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </GlassCard>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Berita`,
  }
}
