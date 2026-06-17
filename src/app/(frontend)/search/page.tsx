import type { Metadata } from 'next/types'
import Link from 'next/link'
import Image from 'next/image'
import { PageShell } from '@/components/PageShell'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Text, Heading } from '@/components/ui/typography'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { GlassCard } from '@/components/ui/glass-card'
import { ScrollReveal } from '@/components/ScrollReveal'
import type { Search as SearchDoc, Media } from '@/payload-types'
import { Calendar, ArrowRight, SearchIcon } from 'lucide-react'

type Args = {
  searchParams: Promise<{
    q?: string
    type?: string
  }>
}

const tabs = [
  { label: 'Semua Kategori', value: 'all' },
  { label: 'Berita', value: 'posts' },
  { label: 'Lowongan Kerja', value: 'jobVacancies' },
  { label: 'Usaha Alumni', value: 'alumniBusinesses' },
  { label: 'Aktivitas', value: 'activities' },
  { label: 'Komunitas', value: 'communities' },
]

function getCollectionBadge(relationTo: string) {
  switch (relationTo) {
    case 'posts':
      return {
        label: 'Berita',
        className: 'bg-brand-red/15 text-red-300 border-brand-red/30',
      }
    case 'jobVacancies':
      return {
        label: 'Lowongan',
        className: 'bg-brand-gold/10 text-brand-gold border-brand-gold/20',
      }
    case 'alumniBusinesses':
      return {
        label: 'Usaha Alumni',
        className: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      }
    case 'activities':
      return {
        label: 'Aktivitas',
        className: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
      }
    case 'communities':
      return {
        label: 'Komunitas',
        className: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      }
    default:
      return {
        label: 'Konten',
        className: 'bg-white/10 text-white/80 border-white/20',
      }
  }
}

function getCollectionLink(relationTo: string, slug: string) {
  switch (relationTo) {
    case 'posts':
      return `/berita/${slug}`
    case 'jobVacancies':
      return `/lowongan-kerja/${slug}`
    case 'alumniBusinesses':
      return `/usaha-alumni/${slug}`
    case 'activities':
      return `/aktivitas/${slug}`
    case 'communities':
      return `/komunitas/${slug}`
    default:
      return `/${slug}`
  }
}

function SearchResultCard({ docItem }: { docItem: SearchDoc }) {
  const relationTo = docItem.doc?.relationTo
  const slug = docItem.slug
  if (!relationTo || !slug) return null

  const badge = getCollectionBadge(relationTo)
  const href = getCollectionLink(relationTo, slug)
  
  const imageToUse = docItem.meta?.image as Media | undefined | null
  const imageUrl = imageToUse && typeof imageToUse === 'object' && imageToUse.url ? imageToUse.url : null

  const formatDate = (dateStr?: string | null): string => {
    if (!dateStr) return ''
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return ''
    }
  }

  return (
    <ScrollReveal>
      <Link href={href} className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-5 md:p-6 shadow-xl shadow-black/20 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-gold/30 group-hover:bg-white/8 group-hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Thumbnail on left for desktop, top for mobile */}
            <div className="relative h-32 w-full sm:w-48 shrink-0 overflow-hidden rounded-xl bg-brand-dark/40 border border-white/5">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={docItem.title || ''}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 192px"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-primary/10">
                  <span className="font-display text-lg font-bold text-white/20">IAM ITB</span>
                </div>
              )}
              {/* Type Badge absolute on thumbnail */}
              <span className={`absolute top-2.5 left-2.5 rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md ${badge.className}`}>
                {badge.label}
              </span>
            </div>

            {/* Info details */}
            <div className="flex-grow min-w-0 flex flex-col h-full gap-2">
              <Heading
                level={4}
                tone="inverse"
                className="text-lg md:text-xl font-bold group-hover:text-brand-gold transition-colors duration-300 leading-snug"
              >
                {docItem.title}
              </Heading>

              {docItem.meta?.description && (
                <Text tone="inverse" variant="small" className="text-white/60 line-clamp-2 leading-relaxed">
                  {docItem.meta.description}
                </Text>
              )}

              <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5 text-xs text-white/40">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Selesai diperbarui: {formatDate(docItem.updatedAt)}</span>
                </div>
                <span className="flex items-center gap-1 text-brand-gold font-semibold uppercase tracking-wider text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Selengkapnya <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
          {/* Bottom highlight border line */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-brand-gold via-brand-gold/70 to-brand-red transition-all duration-500 group-hover:w-full" />
        </div>
      </Link>
    </ScrollReveal>
  )
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query, type } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const whereClauses: any[] = []

  if (query) {
    whereClauses.push({
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
    })
  }

  if (type && type !== 'all') {
    whereClauses.push({
      'doc.relationTo': {
        equals: type,
      },
    })
  }

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 100,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      doc: true,
    },
    pagination: false,
    ...(whereClauses.length > 0
      ? {
          where: {
            and: whereClauses,
          },
        }
      : {}),
  })

  const resultsCount = posts.docs?.length || 0

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
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/10 pb-6 mb-6">
            {tabs.map((tab) => {
              const isActive = (type || 'all') === tab.value
              const queryStr = query ? `?q=${encodeURIComponent(query)}&type=${tab.value}` : `?type=${tab.value}`
              return (
                <Link
                  key={tab.value}
                  href={`/search${queryStr}`}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border border-white/10 transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-md shadow-brand-gold/15'
                      : 'bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </div>

          {/* Results Status */}
          {query && (
            <div className="mb-6 text-center sm:text-left">
              <Text tone="inverse" className="text-white/60">
                Menampilkan <span className="text-brand-gold font-bold">{resultsCount}</span> hasil untuk pencarian &ldquo;<span className="text-white font-medium">{query}</span>&rdquo;
              </Text>
            </div>
          )}

          {/* Results Area */}
          {resultsCount > 0 ? (
            <div className="flex flex-col gap-5">
              {posts.docs.map((docItem) => (
                <SearchResultCard key={docItem.id} docItem={docItem as unknown as SearchDoc} />
              ))}
            </div>
          ) : query ? (
            /* No Results State */
            <div className="text-center py-16 px-4">
              <div className="max-w-md mx-auto">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/5 text-white/30 border border-white/10 mb-5">
                  <SearchIcon className="h-7 w-7" />
                </div>
                <Heading level={3} tone="inverse" className="text-lg md:text-xl font-bold mb-3">
                  Tidak ada hasil ditemukan
                </Heading>
                <Text tone="inverse" className="text-white/50 text-sm mb-6 leading-relaxed">
                  Kami tidak menemukan hasil untuk kata kunci <span className="text-brand-gold font-medium">&ldquo;{query}&rdquo;</span>{type && type !== 'all' ? ` di kategori ini` : ''}. Silakan coba ejaan lain atau cari kata kunci yang lebih umum.
                </Text>
                {type && type !== 'all' && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold text-brand-dark font-semibold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-opacity"
                  >
                    Cari di Semua Kategori &rarr;
                  </Link>
                )}
              </div>
            </div>
          ) : (
            /* Welcome / Initial State */
            <div className="text-center py-12 px-4">
              <div className="max-w-md mx-auto">
                <Text tone="inverse" className="text-white/60 text-[15px] mb-6">
                  Ketik kata kunci pencarian Anda di atas untuk menemukan Berita, Lowongan Kerja, Usaha Alumni, Aktivitas, atau Komunitas.
                </Text>
                <div className="flex flex-wrap justify-center gap-2.5">
                  <span className="text-xs text-white/40 self-center mr-1">Rekomendasi:</span>
                  {[
                    { label: 'Beasiswa', q: 'beasiswa' },
                    { label: 'Agenda', q: 'agenda' },
                    { label: 'Lowongan', q: 'lowongan' },
                    { label: 'Alumni', q: 'alumni' },
                  ].map((rec) => (
                    <Link
                      key={rec.q}
                      href={`/search?q=${rec.q}`}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs text-brand-gold transition-colors"
                    >
                      #{rec.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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
