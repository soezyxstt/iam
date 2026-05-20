import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { Card } from '@/components/Card'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/Pagination'
import { PageRange } from '@/components/PageRange'
import { cn } from '@/utilities/ui'

import { AKTIVITAS_ENTRIES } from './aktivitas-data'
import { AktivitasScrollToGridButton } from './AktivitasScrollToGridButton'

export const metadata: Metadata = {
  title: 'Aktivitas',
  description:
    'Aktivitas dan program kerja Ikatan Alumni Mesin ITB — silaturahmi, pengembangan profesional, dan kontribusi bagi almamater.',
}

const PAGE_SIZE = 6

const CATEGORY_FILTERS = [
  { value: '', label: 'Semua' },
  { value: 'organisasi', label: 'Organisasi' },
  { value: 'profesional', label: 'Profesional' },
  { value: 'sosial', label: 'Sosial' },
]

function buildAktivitasUrl(q?: string, category?: string, page?: number): string {
  const params = new URLSearchParams()
  if (q?.trim()) params.set('q', q.trim())
  if (category) params.set('category', category)
  if (page && page > 1) params.set('page', String(page))
  const qs = params.toString()
  return qs ? `/aktivitas?${qs}` : '/aktivitas'
}

const INTRO_HERO =
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80'

const OVERVIEW_TEXT =
  'Aktivitas IAM ITB menjadi wadah nyata untuk mempererat silaturahmi, berkolaborasi secara profesional, serta berkontribusi bagi almamater dan masyarakat melalui berbagai workshop teknis, diskusi panel, hingga aksi sosial.'

type SearchParams = Promise<{
  q?: string
  category?: string
  page?: string
}>

export default async function AktivitasPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: SearchParams
}) {
  const sp = await searchParamsPromise
  const qRaw = typeof sp.q === 'string' ? sp.q : ''
  const qTrim = qRaw.trim().toLowerCase()
  const categoryParam = typeof sp.category === 'string' ? sp.category : ''
  const pageParsed = Number.parseInt(sp.page ?? '1', 10)
  const currentPage =
    Number.isFinite(pageParsed) && pageParsed > 0 ? Math.floor(pageParsed) : 1

  // Filter local data
  let filtered = AKTIVITAS_ENTRIES
  if (categoryParam) {
    filtered = filtered.filter((item) => item.category === categoryParam)
  }
  if (qTrim) {
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(qTrim) ||
        item.excerpt.toLowerCase().includes(qTrim),
    )
  }

  const totalDocs = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / PAGE_SIZE))
  const pageForPager = Math.min(currentPage, totalPages)

  const startIdx = (pageForPager - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const docs = filtered.slice(startIdx, endIdx)

  const queryLink = {
    pathname: '/aktivitas' as const,
    searchParams: {
      ...(qTrim ? { q: qTrim } : {}),
      ...(categoryParam ? { category: categoryParam } : {}),
    },
  }

  return (
    <PageShell>
      <Section className="z-10 pb-10 pt-3 md:pb-14 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Aktivitas" subtitle="Ikatan Alumni Mesin ITB" />

          <div className="mt-6 text-left lg:mt-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
              <div className="flex flex-col gap-6 lg:col-span-6">
                <div className="text-justify">
                  <Text variant="editorial" className="leading-relaxed">
                    {OVERVIEW_TEXT}
                  </Text>
                </div>
                <div className="pt-1">
                  <AktivitasScrollToGridButton />
                </div>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-brand-dark/10 bg-muted shadow-lg shadow-brand-dark/15 lg:col-span-6 lg:max-h-[300px]">
                <Image
                  src={INTRO_HERO}
                  alt="Ilustrasi kegiatan IAM ITB"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-20 md:pt-0 md:pb-28">
        <ScrollReveal>
          <GlassCard
            id="aktivitas-grid"
            className="berita-card scroll-mt-14 md:scroll-mt-[4.75rem]"
            variant="stripes"
            contentClassName="p-8 md:p-10 lg:p-14"
          >
            <div className="relative space-y-8">
              <h2 className="text-center font-display text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold md:text-sm">
                Direktori Aktivitas
              </h2>

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <form
                  action="/aktivitas"
                  method="get"
                  className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center"
                  role="search"
                >
                  <Input
                    type="search"
                    name="q"
                    placeholder="Cari aktivitas..."
                    defaultValue={qRaw}
                    className={cn(
                      'h-11 rounded-xl border-white/15 bg-white/8 font-sans text-sm text-white shadow-inner shadow-black/20 md:text-[15px]',
                      'placeholder:text-white/45 focus-visible:border-brand-gold/40 focus-visible:ring-brand-gold/25',
                      'sm:max-w-md sm:flex-1',
                    )}
                    aria-label="Cari aktivitas"
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
                  const href = buildAktivitasUrl(qTrim, filt.value, 1)
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
                  totalDocs={totalDocs}
                  collectionLabels={{ plural: 'aktivitas', singular: 'aktivitas' }}
                />
              </div>

              {docs.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/6 px-6 py-12 text-center backdrop-blur-sm">
                  <p className="font-serif text-lg font-bold text-white md:text-xl">
                    Belum ada aktivitas yang ditemukan
                  </p>
                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/75 md:text-sm">
                    {qTrim || categoryParam
                      ? 'Coba ubah kata kunci atau filter kategori, atau hapus penyaring untuk melihat semua.'
                      : 'Belum ada program kerja yang diterbitkan.'}
                  </p>
                  {(qTrim || categoryParam) && (
                    <Button href="/aktivitas" variant="secondary" size="sm" className="mt-8">
                      Tampilkan semua
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="mt-2 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {docs.map((item) => (
                      <Card
                        key={item.slug}
                        type="aktivitas"
                        doc={{
                          title: item.title,
                          slug: item.slug,
                          excerpt: item.excerpt,
                          image: '/media/tangga.jpg',
                        }}
                      />
                    ))}
                  </div>

                  {totalPages > 1 ? (
                    <Pagination
                      page={pageForPager}
                      totalPages={totalPages}
                      queryLink={queryLink}
                      tone="onDark"
                      scrollAlignId="aktivitas-grid"
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
