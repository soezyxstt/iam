import type { Metadata } from 'next/types'
import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import type { Where } from 'payload'
import { getPayload } from 'payload'

import type { AlumniBusiness } from '@/payload-types'
import { PageShell } from '@/components/PageShell'
import { GlassCard } from '@/components/ui/glass-card'
import { Card } from '@/components/Card'
import { Pagination } from '@/components/Pagination'
import { PageRange } from '@/components/PageRange'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Eyebrow, Text } from '@/components/ui/typography'
import { cn } from '@/utilities/ui'
import { EmptyState } from '@/components/ui/empty-state'


const PAGE_SIZE = 9

const CATEGORY_FILTERS: { value: AlumniBusiness['category'] | ''; label: string }[] = [
  { value: '', label: 'Semua' },
  { value: 'fnb', label: 'Kuliner' },
  { value: 'manufaktur', label: 'Manufaktur' },
  { value: 'teknologi', label: 'Teknologi' },
  { value: 'jasa', label: 'Jasa Konsultasi' },
  { value: 'lainnya', label: 'Lainnya' },
]

const VALID_CATEGORY_VALUES = new Set(
  CATEGORY_FILTERS.filter((f) => f.value !== '').map((f) => f.value),
)

function normalizeCategory(raw: string | undefined): AlumniBusiness['category'] | '' {
  if (!raw || raw === 'semua') return ''
  if (VALID_CATEGORY_VALUES.has(raw as AlumniBusiness['category'])) {
    return raw as AlumniBusiness['category']
  }
  return ''
}

function buildUsahaListUrl(opts: {
  q?: string
  category?: AlumniBusiness['category'] | ''
  page?: number
}): string {
  const params = new URLSearchParams()
  const qTrim = opts.q?.trim()
  if (qTrim) params.set('q', qTrim)
  if (opts.category) params.set('category', opts.category)
  if (opts.page && opts.page > 1) params.set('page', String(opts.page))
  const qs = params.toString()
  return qs ? `/usaha-alumni?${qs}` : '/usaha-alumni'
}

type SearchParams = Promise<{
  q?: string
  category?: string
  page?: string
}>

export default async function UsahaAlumniPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: SearchParams
}) {
  const sp = await searchParamsPromise
  const qRaw = typeof sp.q === 'string' ? sp.q : ''
  const categoryParam = normalizeCategory(sp.category)
  const pageParsed = Number.parseInt(sp.page ?? '1', 10)
  const currentPage =
    Number.isFinite(pageParsed) && pageParsed > 0 ? Math.floor(pageParsed) : 1

  const payload = await getPayload({ config: configPromise })

  const whereParts: Where[] = []
  if (categoryParam) {
    whereParts.push({ category: { equals: categoryParam } })
  }
  const qTrim = qRaw.trim()
  if (qTrim) {
    whereParts.push({
      or: [
        { businessName: { like: qTrim } },
        { ownerName: { like: qTrim } },
        { productsOrServices: { like: qTrim } },
        { description: { like: qTrim } },
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
    collection: 'alumniBusinesses',
    depth: 1,
    limit: PAGE_SIZE,
    page: pageToFetch,
    overrideAccess: false,
    sort: 'businessName',
    ...(where ? { where } : {}),
    select: {
      slug: true,
      businessName: true,
      ownerName: true,
      category: true,
      description: true,
      productsOrServices: true,
      coverImage: true,
    },
  })

  const totalPages = Math.max(1, result.totalPages ?? 1)

  if (pageToFetch > totalPages) {
    pageToFetch = totalPages
    result = await payload.find({
      collection: 'alumniBusinesses',
      depth: 1,
      limit: PAGE_SIZE,
      page: pageToFetch,
      overrideAccess: false,
      sort: 'businessName',
      ...(where ? { where } : {}),
      select: {
        slug: true,
        businessName: true,
        ownerName: true,
        category: true,
        description: true,
        productsOrServices: true,
        coverImage: true,
      },
    })
  }

  const pageForPager = pageToFetch
  const docs = result.docs
  const queryLink = {
    pathname: '/usaha-alumni' as const,
    searchParams: {
      ...(qTrim ? { q: qTrim } : {}),
      ...(categoryParam ? { category: categoryParam } : {}),
    },
  }

  return (
    <PageShell className="pb-24">
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader
            title="Profil Usaha Alumni"
            subtitle="Ikatan Alumni Mesin ITB"
            description={
              <Text className="text-[15px] leading-relaxed text-brand-light">
                Temukan bisnis alumni Teknik Mesin ITB untuk kolaborasi, dukungan lokal, dan jaringan
                profesional.
              </Text>
            }
          />
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-20 md:pt-0 md:pb-28">
        <ScrollReveal>
          <GlassCard
            id="direktori-usaha-alumni"
            className="berita-card scroll-mt-14 md:scroll-mt-19"
            variant="stripes"
            contentClassName="p-6 md:p-8 lg:p-10"
          >
            <div className="relative space-y-8">
              <Eyebrow tone="gold" className="text-center block text-xs md:text-sm tracking-[0.28em]">
                Direktori usaha alumni
              </Eyebrow>

              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                <form
                  action="/usaha-alumni"
                  method="get"
                  className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center"
                  role="search"
                >
                  <Input
                    type="search"
                    name="q"
                    placeholder="Cari nama usaha, produk, alumni"
                    defaultValue={qRaw}
                    className={cn(
                      'h-11 rounded-xl border-white/15 bg-white/8 font-sans text-sm text-white shadow-inner shadow-black/20 md:text-[15px]',
                      'placeholder:text-white/45 focus-visible:border-brand-gold/40 focus-visible:ring-brand-gold/25',
                      'sm:max-w-md sm:flex-1',
                    )}
                    aria-label="Cari usaha alumni"
                  />
                  {categoryParam ? (
                    <input type="hidden" name="category" value={categoryParam} />
                  ) : null}
                  <Button type="submit" variant="secondary" size="sm" className="shrink-0 rounded-full">
                    Cari
                  </Button>
                </form>

                <Button href="/pengajuan-usaha-alumni" variant="secondary" size="sm" className="shrink-0">
                  + Daftarkan Bisnis
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORY_FILTERS.map((filt) => {
                  const active = filt.value === categoryParam
                  const href = buildUsahaListUrl({
                    q: qTrim,
                    category: filt.value === '' ? '' : filt.value,
                  })
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
                  currentPage={pageForPager}
                  limit={PAGE_SIZE}
                  totalDocs={result.totalDocs}
                  collectionLabels={{ plural: 'usaha', singular: 'usaha' }}
                />
              </div>

              {docs.length === 0 ? (
                <EmptyState
                  tone="onDark"
                  title="Belum ada usaha yang ditampilkan"
                  description={
                    qTrim || categoryParam
                      ? 'Coba ubah kata kunci atau filter kategori, atau hapus penyaring untuk melihat semua.'
                      : 'Entri baru akan muncul setelah pengajuan disetujui dan diterbitkan oleh pengurus.'
                  }
                  actionHref={qTrim || categoryParam ? '/usaha-alumni' : undefined}
                  actionLabel="Tampilkan semua"
                />
              ) : (
                <>
                  <div className="mt-2 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {docs.map((biz) => (
                      <Card key={biz.id} type="usaha" doc={biz as AlumniBusiness} />
                    ))}
                  </div>

                  {totalPages > 1 ? (
                    <Pagination
                      page={pageForPager}
                      totalPages={totalPages}
                      queryLink={queryLink}
                      tone="onDark"
                      scrollAlignId="direktori-usaha-alumni"
                      className="my-10"
                    />
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Profil Usaha Alumni',
    description:
      'Direktori usaha alumni Ikatan Alumni Mesin ITB — telusuri menurut kategori atau kata kunci.',
  }
}
