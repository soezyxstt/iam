import type { Metadata } from 'next/types'
import Image from 'next/image'
import Link from 'next/link'
import { User } from 'lucide-react'
import React from 'react'
import configPromise from '@payload-config'
import type { Where } from 'payload'
import { getPayload } from 'payload'

import type { AlumniBusiness } from '@/payload-types'
import { PageShell } from '@/components/PageShell'
import { Pagination } from '@/components/Pagination'
import { PageRange } from '@/components/PageRange'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Text } from '@/components/ui/typography'
import { cn } from '@/utilities/ui'

import { labelForCategory } from './constants'

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
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4" containerClassName="max-w-6xl px-4 md:px-8">
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

      <Section className="z-10 pt-0 pb-20 md:pt-0 md:pb-28" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <div
            id="direktori-usaha-alumni"
            className="relative scroll-mt-14 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-brand-dark via-brand-primary to-brand-dark p-8 shadow-2xl md:scroll-mt-19 md:p-10 lg:p-12"
          >
            <div className="pointer-events-none absolute top-0 left-1/2 z-10 h-px w-3/5 -translate-x-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative space-y-8">
              <h2 className="text-center font-display text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold md:text-sm">
                Direktori usaha alumni
              </h2>

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
                <div className="rounded-2xl border border-white/10 bg-white/6 px-6 py-12 text-center backdrop-blur-sm">
                  <p className="font-serif text-lg font-bold text-white md:text-xl">
                    Belum ada usaha yang ditampilkan
                  </p>
                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/75 md:text-sm">
                    {qTrim || categoryParam
                      ? 'Coba ubah kata kunci atau filter kategori, atau hapus penyaring untuk melihat semua.'
                      : 'Entri baru akan muncul setelah pengajuan disetujui dan diterbitkan oleh pengurus.'}
                  </p>
                  {(qTrim || categoryParam) && (
                    <Button href="/usaha-alumni" variant="secondary" size="sm" className="mt-8">
                      Tampilkan semua
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="mt-2 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {docs.map((biz) => (
                      <UsahaCard key={biz.id} biz={biz as AlumniBusiness} />
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
          </div>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}

const USHA_CARD_FALLBACK_COVER = '/media/tangga.jpg'

function UsahaCard({ biz }: { biz: AlumniBusiness }) {
  const catLabel = labelForCategory(biz.category)
  const cover =
    typeof biz.coverImage === 'object' && biz.coverImage !== null && 'url' in biz.coverImage && biz.coverImage.url
      ? biz.coverImage
      : null
  const coverSrc = cover?.url ?? USHA_CARD_FALLBACK_COVER
  const href = `/usaha-alumni/${encodeURIComponent(biz.slug)}`

  return (
    <Link
      href={href}
      className="block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
    >
    <article className="berita-item-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-5 shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/25 hover:shadow-2xl hover:shadow-black/35 md:p-6">
      <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-2xl bg-brand-dark/40">
        <Image
          src={coverSrc}
          alt={biz.businessName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-dark/50 via-transparent to-transparent" />
        <span className="absolute top-3 right-3 z-10 rounded-full bg-brand-gold px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark shadow-md md:top-3.5 md:right-3.5 md:px-3.5 md:text-[11px]">
          {catLabel}
        </span>
      </div>

      <div className="mt-5 flex min-h-0 flex-1 flex-col md:mt-6">
        <h3 className="font-serif text-lg font-bold leading-snug text-white md:text-xl">
          {biz.businessName}
        </h3>
        <p className="mt-3 line-clamp-4 font-sans text-[13px] leading-relaxed text-white/78 md:text-sm md:leading-relaxed">
          {biz.description}
        </p>

        <div className="mt-5 flex items-start gap-3.5 border-t border-white/10 pt-5 md:mt-6">
          <User className="mt-0.5 size-[22px] shrink-0 text-brand-gold" strokeWidth={1.65} aria-hidden />
          <div className="min-w-0">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Pemilik
            </p>
            <p className="mt-1 font-serif text-sm font-bold leading-snug text-white md:text-base">
              {biz.ownerName}
            </p>
          </div>
        </div>
      </div>
    </article>
    </Link>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Profil Usaha Alumni — IAM ITB',
    description:
      'Direktori usaha alumni Ikatan Alumni Mesin ITB — telusuri menurut kategori atau kata kunci.',
  }
}
