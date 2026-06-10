import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'

import { PageShell } from '@/components/PageShell'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { ScrollReveal } from '@/components/ScrollReveal'
import { GlassCard } from '@/components/ui/glass-card'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'
import configPromise from '@payload-config'
import type { Where } from 'payload'
import { LowonganPageClient } from './LowonganPageClient'
import type { JobVacancy } from '@/payload-types'

const PAGE_SIZE = 12

const CATEGORY_FILTERS = [
  { value: '', label: 'Semua' },
  { value: 'kp', label: 'Kerja Praktik (KP)' },
  { value: 'magang', label: 'Magang (Internship)' },
  { value: 'full_time', label: 'Full Time' },
]

function buildLowonganUrl(q?: string, type?: string, page?: number): string {
  const params = new URLSearchParams()
  if (q?.trim()) params.set('q', q.trim())
  if (type) params.set('type', type)
  if (page && page > 1) params.set('page', String(page))
  const qs = params.toString()
  return qs ? `/lowongan-kerja?${qs}` : '/lowongan-kerja'
}

type SearchParams = Promise<{
  q?: string
  type?: string
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
  const typeParam = typeof sp.type === 'string' ? sp.type : ''
  const pageParsed = Number.parseInt(sp.page ?? '1', 10)
  const currentPage =
    Number.isFinite(pageParsed) && pageParsed > 0 ? Math.floor(pageParsed) : 1

  const payload = await getPayload({ config: configPromise })

  const whereParts: Where[] = []
  if (typeParam) {
    whereParts.push({ employmentType: { equals: typeParam } })
  }
  if (qTrim) {
    whereParts.push({
      or: [
        { position: { like: qTrim } },
        { companyName: { like: qTrim } },
        { location: { like: qTrim } },
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
    collection: 'jobVacancies',
    depth: 1,
    limit: PAGE_SIZE,
    page: pageToFetch,
    overrideAccess: false,
    sort: '-updatedAt',
    ...(where ? { where } : {}),
  })

  const totalPages = Math.max(1, result.totalPages ?? 1)
  if (pageToFetch > totalPages) {
    pageToFetch = totalPages
    result = await payload.find({
      collection: 'jobVacancies',
      depth: 1,
      limit: PAGE_SIZE,
      page: pageToFetch,
      overrideAccess: false,
      sort: '-updatedAt',
      ...(where ? { where } : {}),
    })
  }

  const pageForPager = pageToFetch
  const docs = result.docs as unknown as JobVacancy[]
  const queryLink = {
    pathname: '/lowongan-kerja' as const,
    searchParams: {
      ...(qTrim ? { q: qTrim } : {}),
      ...(typeParam ? { type: typeParam } : {}),
    },
  }

  return (
    <PageShell className="pb-24">

      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Lowongan Kerja" subtitle="Karier & Peluang Profesional" />
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-20 md:pt-0 md:pb-28">
        <ScrollReveal>
          <GlassCard
            id="lowongan-grid"
            className="berita-card scroll-mt-14 md:scroll-mt-19"
            variant="stripes"
            contentClassName="p-6 md:p-8 lg:p-10"
          >
            <div className="relative space-y-8">
              <Eyebrow tone="gold" className="text-center block text-xs md:text-sm tracking-[0.28em]">
                Direktori Lowongan Kerja
              </Eyebrow>

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <form
                  action="/lowongan-kerja"
                  method="get"
                  className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center"
                  role="search"
                >
                  <Input
                    type="search"
                    name="q"
                    placeholder="Cari posisi, perusahaan..."
                    defaultValue={qRaw}
                    className={cn(
                      'h-11 rounded-xl border-white/15 bg-white/8 font-sans text-sm text-white shadow-inner shadow-black/20 md:text-[15px]',
                      'placeholder:text-white/45 focus-visible:border-brand-gold/40 focus-visible:ring-brand-gold/25',
                      'sm:max-w-md sm:flex-1',
                    )}
                    aria-label="Cari lowongan kerja"
                  />
                  {typeParam ? <input type="hidden" name="type" value={typeParam} /> : null}
                  <Button type="submit" variant="secondary" size="sm" className="shrink-0 rounded-full">
                    Cari
                  </Button>
                </form>

                <Button href="/pengajuan-lowongan" variant="secondary" size="sm" className="shrink-0">
                  + Pasang Lowongan
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORY_FILTERS.map((filt) => {
                  const active = filt.value === typeParam
                  const href = buildLowonganUrl(qTrim, filt.value, 1)
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
                  collectionLabels={{ plural: 'lowongan', singular: 'lowongan' }}
                />
              </div>

              <LowonganPageClient initialDocs={docs} />

              {totalPages > 1 && docs.length > 0 ? (
                <div className="mt-16 flex justify-center border-t border-white/10 pt-12">
                  <Pagination
                    page={pageForPager}
                    totalPages={totalPages}
                    queryLink={queryLink}
                    tone="onDark"
                    scrollAlignId="lowongan-grid"
                  />
                </div>
              ) : null}
            </div>
          </GlassCard>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Lowongan Kerja`,
  }
}
