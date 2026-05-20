import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, Globe, ImagePlus, Instagram, Mail, Phone, User } from 'lucide-react'
import React, { cache } from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { AlumniBusiness, Media } from '@/payload-types'
import { UsahaDetailTabs } from '@/components/usaha-alumni/UsahaDetailTabs'
import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'
import { labelForCategory, shortLocationLine } from '../constants'
import { cn } from '@/utilities/ui'

export const revalidate = 600

const FALLBACK_COVER = '/media/tangga.jpg'

/** Badge & sidebar accent green (mock: program tersedia) */
const HIGHLIGHT_GREEN = '#2d5a27'

type PageProps = {
  params: Promise<{ slug: string }>
}

function mediaUrl(m: number | Media | null | undefined): string | null {
  if (typeof m === 'object' && m !== null && 'url' in m && m.url) return m.url
  return null
}

function normalizeWebsiteHref(raw: string): string {
  const t = raw.trim()
  if (!t) return ''
  if (/^https?:\/\//i.test(t)) return t
  return `https://${t}`
}

function instagramHref(handle: string): string {
  const h = handle.replace(/^@/, '').trim()
  return `https://www.instagram.com/${encodeURIComponent(h)}/`
}

const queryAlumniBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'alumniBusinesses',
    draft: false,
    limit: 1,
    overrideAccess: false,
    depth: 2,
    where: { slug: { equals: slug } },
  })
  const doc = result.docs[0]
  return doc ? (doc as AlumniBusiness) : null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'alumniBusinesses',
    draft: false,
    limit: 500,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return res.docs
    .map((d) => d.slug)
    .filter((s): s is string => typeof s === 'string' && s.length > 0)
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const biz = await queryAlumniBySlug(slug)
  if (!biz) {
    return { title: 'Usaha Alumni' }
  }
  const excerpt = biz.description?.slice(0, 155) ?? ''
  return {
    title: biz.businessName,
    description: excerpt.length < (biz.description?.length ?? 0) ? `${excerpt}…` : excerpt,
  }
}

export default async function UsahaAlumniDetailPage({ params }: PageProps) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const biz = await queryAlumniBySlug(slug)
  if (!biz) notFound()

  const cat = labelForCategory(biz.category)
  const cover =
    typeof biz.coverImage === 'object' && biz.coverImage !== null && 'url' in biz.coverImage
      ? biz.coverImage.url
      : null
  const coverSrc = cover ?? FALLBACK_COVER

  const websiteHref = biz.website ? normalizeWebsiteHref(biz.website) : ''
  const igHref = biz.instagram ? instagramHref(biz.instagram) : ''

  const statCellsAll: { label: string; value: string }[] = [
    { label: 'Tahun berdiri', value: biz.yearFounded != null ? String(biz.yearFounded) : '—' },
    { label: 'Karyawan', value: biz.employeesSummary?.trim() || '—' },
    { label: 'Lokasi', value: shortLocationLine(biz.address) || '—' },
    { label: 'Sertifikasi', value: biz.certifications?.trim() || '—' },
  ]
  const statCells = statCellsAll.filter((c) => c.value !== '—')

  const galleryItems =
    biz.gallery?.filter((row) => typeof row.image === 'object' && row.image !== null) ?? []

  const visibleGallery = galleryItems.slice(0, 3)
  const extraGalleryCount = Math.max(0, galleryItems.length - 3)

  const bisnisTab = (
    <div className="space-y-6">
      <Text className="max-w-prose text-[15px] leading-[1.8] text-brand-dark/78">{biz.productsOrServices}</Text>
      <div className="rounded-2xl border border-brand-dark/10 bg-brand-khaki/50 p-5 md:p-6">
        <p className="font-display text-[10px] font-bold uppercase tracking-[0.26em] text-brand-gold">
          Alamat & kontak operasional
        </p>
        <address className="mt-4 not-italic">
          <Text className="whitespace-pre-wrap text-[15px] leading-relaxed text-brand-dark/80">
            {biz.address}
          </Text>
        </address>
        <div className="mt-5 flex flex-col gap-2 border-t border-brand-dark/10 pt-5 font-sans text-sm text-brand-dark/75">
          <p className="flex items-center gap-2.5">
            <Phone className="size-4 shrink-0 text-brand-gold" strokeWidth={1.75} aria-hidden />
            <a
              href={`tel:${biz.phoneNumber.replace(/\s/g, '')}`}
              className="hover:text-brand-primary"
            >
              {biz.phoneNumber}
            </a>
          </p>
          {biz.email ? (
            <p className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-brand-gold" strokeWidth={1.75} aria-hidden />
              <a href={`mailto:${biz.email}`} className="hover:text-brand-primary">
                {biz.email}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )

  const socialTileClass =
    'flex h-11 w-full items-center justify-center rounded-xl border border-white/14 bg-white/8 text-brand-gold transition-colors hover:border-brand-gold/35 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50'

  return (
    <PageShell className="pb-20 md:pb-28">
      <Section className="z-10 pt-3 pb-8 md:pt-4 md:pb-10" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <div className="mb-6 flex justify-start">
            <Button href="/usaha-alumni" variant="outline" size="sm" className="border-brand-dark/25">
              ← Kembali ke direktori
            </Button>
          </div>

          <div
            className={cn(
              'relative isolate min-h-[min(52vh,440px)] overflow-hidden rounded-[20px] border border-brand-dark/15',
              'shadow-2xl shadow-brand-dark/20 md:min-h-[460px] md:rounded-3xl',
            )}
          >
            <Image
              src={coverSrc}
              alt={biz.businessName}
              fill
              className="object-cover filter-[brightness(0.92)_saturate(1.02)]"
              sizes="(max-width: 768px) 100vw, 1152px"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-dark/88 via-brand-dark/40 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-dark/95 via-brand-dark/25 to-brand-dark/30"
              aria-hidden
            />

            <div className="relative z-10 flex min-h-[min(52vh,440px)] flex-col p-6 sm:p-8 md:min-h-[460px] md:p-10 lg:p-12">
              <span className="w-fit rounded-lg bg-brand-gold px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-wider text-brand-dark shadow-sm">
                {cat}
              </span>
              <h1 className="mt-5 max-w-3xl font-serif text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl md:text-5xl">
                {biz.businessName}
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/92 md:text-base">
                {biz.description}
              </p>

              <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
                {biz.featuredHighlight ? (
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-display text-[11px] font-semibold text-white shadow-md sm:text-xs"
                    style={{ backgroundColor: HIGHLIGHT_GREEN }}
                  >
                    <Check className="size-4 shrink-0 stroke-[2.5]" aria-hidden />
                    {biz.featuredHighlight}
                  </span>
                ) : null}
                <Button
                  href="/pengajuan-usaha-alumni"
                  variant="secondary"
                  size="md"
                  className="rounded-2xl px-8 font-display text-xs font-bold sm:text-sm"
                >
                  Daftar Sekarang
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Khaki + paper card: avoid theme `muted` (navy in dark mode) so layout matches PDF */}
      <div className="relative z-10 border-t border-brand-dark/10 bg-brand-khaki">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
          <ScrollReveal>
            <div
              className={cn(
                'rounded-[28px] border border-brand-dark/8 bg-white p-6 shadow-[0_8px_40px_-12px_rgba(6,22,47,0.12)]',
                'md:p-9 lg:p-11',
              )}
            >
              <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
              <div className="min-w-0 lg:col-span-7 xl:col-span-8">
                <Heading
                  level={2}
                  className="font-serif text-2xl font-bold tracking-tight text-brand-dark md:text-[1.75rem]"
                >
                  Tentang Bisnis
                </Heading>

                <div className="mt-6">
                  <UsahaDetailTabs
                    aboutText={biz.description}
                    bisnisContent={bisnisTab}
                    surface="light"
                  />
                </div>

                {statCells.length > 0 ? (
                  <div className="mt-10">
                    <div
                      className={cn(
                        'grid gap-4',
                        statCells.length === 1 && 'grid-cols-1',
                        statCells.length === 2 && 'sm:grid-cols-2',
                        statCells.length === 3 && 'sm:grid-cols-2 xl:grid-cols-3',
                        statCells.length >= 4 && 'sm:grid-cols-2 xl:grid-cols-4',
                      )}
                    >
                      {statCells.map((cell) => (
                        <div
                          key={cell.label}
                          className="flex min-h-26 flex-col justify-between rounded-2xl bg-brand-dark px-5 py-4 shadow-md md:min-h-28 md:px-6 md:py-5"
                        >
                          <p className="font-display text-[9px] font-bold uppercase leading-tight tracking-[0.2em] text-brand-gold md:text-[10px]">
                            {cell.label}
                          </p>
                          <p className="mt-3 font-sans text-[15px] font-semibold leading-snug text-white md:text-base">
                            {cell.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {visibleGallery.length > 0 ? (
                  <div className="mt-10">
                    <ul className="grid grid-cols-3 gap-3 sm:gap-4">
                      {visibleGallery.map((row) => {
                        const img = row.image as Media
                        const src = mediaUrl(img)
                        if (!src) return null
                        return (
                          <li
                            key={row.id ?? src}
                            className="relative aspect-square overflow-hidden rounded-2xl border border-brand-dark/10 bg-brand-dark/5 shadow-sm"
                          >
                            <Image
                              src={src}
                              alt={`${biz.businessName} — galeri`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 33vw, 240px"
                            />
                          </li>
                        )
                      })}
                      {extraGalleryCount > 0 ? (
                        <li className="relative flex aspect-square flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl border border-dashed border-brand-dark/15 bg-brand-dark/5 text-center">
                          <ImagePlus
                            className="size-8 text-brand-dark/35"
                            strokeWidth={1.25}
                            aria-hidden
                          />
                          <span className="px-2 font-display text-[10px] font-bold uppercase leading-tight tracking-wide text-brand-dark/55">
                            +{extraGalleryCount} foto lainnya
                          </span>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                ) : null}
              </div>

              <aside className="min-w-0 lg:col-span-5 xl:col-span-4">
                <div className="flex flex-col gap-4 lg:sticky lg:top-28">
                  <div
                    className={cn(
                      'w-full overflow-hidden rounded-3xl border border-brand-dark/10 shadow-lg',
                      'bg-linear-to-b from-brand-primary via-brand-dark via-40% to-brand-dark',
                    )}
                  >
                    <div className="px-6 pb-8 pt-8 text-center md:px-7 md:pb-8 md:pt-8">
                      <div
                        className="mx-auto flex size-17 items-center justify-center rounded-2xl border-2 border-brand-gold/90 bg-brand-dark/45 shadow-inner"
                        aria-hidden
                      >
                        <User className="size-9 text-brand-gold" strokeWidth={1.5} />
                      </div>
                      <p className="mt-6 font-serif text-xl font-bold text-white md:text-2xl">
                        {biz.ownerName}
                      </p>
                      {biz.ownerRole ? (
                        <p className="mt-2 font-display text-xs font-semibold uppercase tracking-wider text-brand-gold">
                          {biz.ownerRole}
                        </p>
                      ) : null}
                      {biz.ownerEducationLine ? (
                        <p className="mt-2 font-sans text-sm text-white/65">{biz.ownerEducationLine}</p>
                      ) : null}
                      {biz.ownerBio ? (
                        <p className="mt-5 text-left text-[14px] leading-[1.7] text-white/85">
                          {biz.ownerBio}
                        </p>
                      ) : null}

                      <div className="mt-6 space-y-3">
                        {websiteHref ? (
                          <a
                            href={websiteHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-brand-dark/55 px-4 py-3 text-left text-sm text-white/95 transition-colors hover:border-brand-gold/30 hover:bg-brand-dark/70"
                          >
                            <Globe className="size-4 shrink-0 text-brand-gold" strokeWidth={1.75} />
                            <span className="min-w-0 truncate font-sans">{biz.website?.trim()}</span>
                          </a>
                        ) : null}
                        {biz.email ? (
                          <a
                            href={`mailto:${biz.email}`}
                            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-brand-dark/55 px-4 py-3 text-left text-sm text-white/95 transition-colors hover:border-brand-gold/30 hover:bg-brand-dark/70"
                          >
                            <Mail className="size-4 shrink-0 text-brand-gold" strokeWidth={1.75} />
                            <span className="min-w-0 truncate font-sans">{biz.email}</span>
                          </a>
                        ) : null}
                        <a
                          href={`tel:${biz.phoneNumber.replace(/\s/g, '')}`}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-brand-dark/55 px-4 py-3 text-left text-sm text-white/95 transition-colors hover:border-brand-gold/30 hover:bg-brand-dark/70"
                        >
                          <Phone className="size-4 shrink-0 text-brand-gold" strokeWidth={1.75} />
                          <span className="font-sans">{biz.phoneNumber}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="w-full rounded-3xl border border-brand-dark/10 bg-brand-dark px-6 py-6 shadow-lg md:px-7 md:py-7">
                    <p className="text-left font-serif text-lg font-bold text-white">Social Presence</p>
                    <div className="mt-5 grid w-full grid-cols-4 gap-2">
                      {websiteHref ? (
                        <Link
                          href={websiteHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={socialTileClass}
                          aria-label="Website"
                        >
                          <Globe className="size-5" strokeWidth={1.75} />
                        </Link>
                      ) : null}
                      {igHref ? (
                        <Link
                          href={igHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={socialTileClass}
                          aria-label="Instagram"
                        >
                          <Instagram className="size-5" strokeWidth={1.75} />
                        </Link>
                      ) : null}
                      {biz.email ? (
                        <Link
                          href={`mailto:${biz.email}`}
                          className={socialTileClass}
                          aria-label="Email"
                        >
                          <Mail className="size-5" strokeWidth={1.75} />
                        </Link>
                      ) : null}
                      <Link
                        href={`tel:${biz.phoneNumber.replace(/\s/g, '')}`}
                        className={socialTileClass}
                        aria-label="Telepon"
                      >
                        <Phone className="size-5" strokeWidth={1.75} />
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageShell>
  )
}
