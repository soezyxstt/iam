import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, Globe, ImagePlus, Instagram, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react'
import React, { cache } from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { AlumniBusiness, Media } from '@/payload-types'
import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'
import { labelForCategory } from '../constants'

export const revalidate = 600

const FALLBACK_COVER = '/assets/tangga.jpg'

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
    { label: 'Sertifikasi', value: biz.certifications?.trim() || '—' },
  ]
  const statCells = statCellsAll.filter((c) => c.value !== '—')

  const galleryItems =
    biz.gallery?.filter((row) => typeof row.image === 'object' && row.image !== null) ?? []

  const visibleGallery = galleryItems.slice(0, 3)
  const extraGalleryCount = Math.max(0, galleryItems.length - 3)

  return (
    <PageShell className="pb-20 md:pb-28">
      <Section className="z-10 pt-3 pb-8 md:pt-4 md:pb-10" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          {/* Breadcrumb back link */}
          <div className="mb-8 md:mb-12 flex justify-start">
            <Link
              href="/usaha-alumni"
              className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark/65 hover:text-brand-red transition-colors group"
            >
              <ArrowLeft className="size-3.5 translate-x-0 group-hover:-translate-x-1 transition-transform" />
              Kembali ke direktori
            </Link>
          </div>

          {/* Split Hero Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Column: Info & Action */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="rounded-lg bg-brand-gold/15 border border-brand-gold/30 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-brand-dark/80">
                  {cat}
                </span>
                {biz.featuredHighlight && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    <Check className="size-3 shrink-0 stroke-[2.5]" />
                    {biz.featuredHighlight}
                  </span>
                )}
              </div>

              <Heading
                level={1}
                tone="default"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-dark leading-[1.15]"
              >
                {biz.businessName}
              </Heading>

              <Text
                variant="editorial"
                tone="strong"
                className="mt-6 text-brand-dark/80 text-[15px] md:text-base leading-relaxed"
              >
                {biz.description}
              </Text>

              <div className="mt-8 flex flex-wrap gap-4">
                {websiteHref ? (
                  <Button
                    asChild
                    variant="primary"
                    size="md"
                    className="rounded-xl px-6 font-display text-xs font-bold"
                  >
                    <a href={websiteHref} target="_blank" rel="noopener noreferrer">
                      Kunjungi Website
                    </a>
                  </Button>
                ) : (
                  <Button
                    href={`tel:${biz.phoneNumber.replace(/\s/g, '')}`}
                    variant="primary"
                    size="md"
                    className="rounded-xl px-6 font-display text-xs font-bold"
                  >
                    Hubungi Telepon
                  </Button>
                )}
                <Button
                  href="/pengajuan-usaha-alumni"
                  variant="outline"
                  size="md"
                  className="rounded-xl px-6 font-display text-xs font-bold border-brand-dark/20 text-brand-dark hover:border-brand-dark hover:bg-brand-dark/5"
                >
                  Daftarkan Bisnis
                </Button>
              </div>
            </div>

            {/* Right Column: Hero Cover Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_15px_45px_-15px_rgba(6,22,47,0.18)]">
                <Image
                  src={coverSrc}
                  alt={biz.businessName}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Minimalist Key Metrics Bar */}
          {statCells.length > 0 && (
            <div className="mt-16 md:mt-24 border-y border-brand-dark/10 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {statCells.map((cell) => (
                  <div key={cell.label} className="space-y-1">
                    <span className="block font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
                      {cell.label}
                    </span>
                    <span className="block font-sans text-base md:text-lg font-bold text-brand-dark">
                      {cell.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Layout Grid */}
          <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left side: narrative & details */}
            <div className="lg:col-span-8 space-y-16">
              {/* Product and Services */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <Heading level={2} className="font-serif text-2xl font-bold text-brand-dark">
                    Produk & Jasa
                  </Heading>
                  <div className="h-0.5 w-12 bg-brand-gold rounded-full" />
                </div>
                <Text
                  variant="editorial"
                  tone="strong"
                  className="whitespace-pre-line text-brand-dark/80 text-[15px] md:text-base leading-[1.8]"
                >
                  {biz.productsOrServices}
                </Text>
              </div>

              {/* Gallery section */}
              {visibleGallery.length > 0 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Heading level={2} className="font-serif text-2xl font-bold text-brand-dark">
                      Galeri Foto
                    </Heading>
                    <div className="h-0.5 w-12 bg-brand-gold rounded-full" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {visibleGallery.map((row) => {
                      const img = row.image as Media
                      const src = mediaUrl(img)
                      if (!src) return null
                      return (
                        <div
                          key={row.id ?? src}
                          className="relative aspect-square overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
                          <Image
                            src={src}
                            alt={`${biz.businessName} — galeri`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, 240px"
                          />
                        </div>
                      )
                    })}
                    {extraGalleryCount > 0 && (
                      <div className="relative flex aspect-square flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl border-2 border-dashed border-brand-dark/15 bg-brand-dark/[0.02] text-center">
                        <ImagePlus className="size-6 text-brand-dark/35" strokeWidth={1.5} />
                        <span className="px-2 font-display text-[10px] font-bold uppercase leading-tight tracking-wider text-brand-dark/55">
                          +{extraGalleryCount} Foto Lainnya
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right side: sticky details sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit space-y-12">
              {/* Owner details */}
              <div className="space-y-6">
                <h3 className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
                  Pemilik Usaha
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white shadow-inner font-serif text-sm font-bold">
                    {biz.ownerName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-serif text-[16px] font-bold text-brand-dark leading-tight">
                      {biz.ownerName}
                    </h4>
                    {biz.ownerRole && (
                      <p className="font-display text-[10px] font-bold uppercase tracking-wider text-brand-gold mt-0.5">
                        {biz.ownerRole}
                      </p>
                    )}
                    {biz.ownerEducationLine && (
                      <p className="font-sans text-xs text-brand-dark/60 mt-0.5">
                        {biz.ownerEducationLine}
                      </p>
                    )}
                  </div>
                </div>
                {biz.ownerBio && (
                  <p className="text-brand-dark/70 text-[13px] leading-relaxed italic border-l-2 border-brand-gold/50 pl-4 py-1">
                    &ldquo;{biz.ownerBio}&rdquo;
                  </p>
                )}
              </div>

              {/* Address details */}
              <div className="space-y-6">
                <h3 className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
                  Lokasi & Alamat
                </h3>
                <div className="flex items-start gap-3 text-brand-dark/75">
                  <MapPin className="size-4 shrink-0 text-brand-primary mt-0.5" strokeWidth={2} />
                  <address className="not-italic font-sans text-sm leading-relaxed text-brand-dark/80">
                    {biz.address}
                  </address>
                </div>
              </div>

              {/* Contact and Social Links */}
              <div className="space-y-6">
                <h3 className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
                  Kontak & Hubungi
                </h3>
                <div className="h-px bg-brand-dark/10" />
                <div className="flex flex-col gap-4 font-sans text-sm">
                  <a
                    href={`tel:${biz.phoneNumber.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-brand-dark/75 hover:text-brand-red transition-colors group"
                  >
                    <Phone className="size-4 shrink-0 text-brand-primary group-hover:scale-110 transition-transform" strokeWidth={2} />
                    <span>{biz.phoneNumber}</span>
                  </a>

                  {biz.email && (
                    <a
                      href={`mailto:${biz.email}`}
                      className="flex items-center gap-3 text-brand-dark/75 hover:text-brand-red transition-colors group"
                    >
                      <Mail className="size-4 shrink-0 text-brand-primary group-hover:scale-110 transition-transform" strokeWidth={2} />
                      <span className="truncate">{biz.email}</span>
                    </a>
                  )}

                  {websiteHref && (
                    <a
                      href={websiteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-brand-dark/75 hover:text-brand-red transition-colors group"
                    >
                      <Globe className="size-4 shrink-0 text-brand-primary group-hover:scale-110 transition-transform" strokeWidth={2} />
                      <span className="truncate">{biz.website}</span>
                    </a>
                  )}

                  {igHref && (
                    <a
                      href={igHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-brand-dark/75 hover:text-brand-red transition-colors group"
                    >
                      <Instagram className="size-4 shrink-0 text-brand-primary group-hover:scale-110 transition-transform" strokeWidth={2} />
                      <span className="truncate">{biz.instagram}</span>
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}
