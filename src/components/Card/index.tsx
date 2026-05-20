'use client'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { User } from 'lucide-react'

import type { Post, AlumniBusiness, JobVacancy } from '@/payload-types'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'heroImage'>

const CATEGORY_LABELS: Record<string, string> = {
  manufaktur: 'Manufaktur',
  jasa: 'Jasa Konsultasi',
  fnb: 'Kuliner',
  teknologi: 'Teknologi',
  lainnya: 'Lainnya',
}

function labelForCategory(value?: string | null): string {
  if (!value) return ''
  return CATEGORY_LABELS[value] ?? value
}

export type CardProps = {
  type?: 'berita' | 'aktivitas' | 'usaha' | 'lowongan'
  doc?: any
  index?: number
  className?: string
  showCategories?: boolean
}

export const Card: React.FC<CardProps> = (props) => {
  const { type = 'berita', doc, index, className, showCategories = true } = props

  const formatDate = (dateStr?: string | null): string => {
    if (!dateStr) return 'IAM ITB'
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return 'IAM ITB'
    }
  }

  if (type === 'aktivitas') {
    const act = doc as { title: string; slug: string; excerpt: string; image?: string }
    const href = `/aktivitas/${act?.slug}`

    return (
      <article
        className={cn(
          'berita-item-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/4 shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-gold/25 hover:shadow-2xl hover:shadow-black/35',
          className,
        )}
      >
        <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-brand-dark/40">
          <Image
            src={act?.image || '/media/tangga.jpg'}
            alt={act?.title ?? ''}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-dark/50 via-transparent to-transparent" />
        </div>
        <div className="flex flex-1 flex-col gap-3 px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
          <Heading level={3} tone="inverse" className="line-clamp-2">
            {act?.title}
          </Heading>
          <Text tone="inverse" variant="small" className="line-clamp-3 md:text-sm">
            {act?.excerpt}
          </Text>
          <div className="mt-auto pt-4">
            <Button href={href} variant="secondary" size="sm">
              Jelajahi
            </Button>
          </div>
        </div>
        {/* Bottom accent sweep on hover */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-brand-gold via-brand-gold/70 to-brand-red transition-all duration-500 group-hover:w-full" />
      </article>
    )
  }

  if (type === 'usaha') {
    const biz = doc as AlumniBusiness
    const catLabel = labelForCategory(biz?.category)
    const cover =
      typeof biz?.coverImage === 'object' &&
      biz?.coverImage !== null &&
      'url' in biz?.coverImage &&
      biz?.coverImage.url
        ? biz?.coverImage
        : null
    const coverSrc = cover?.url ?? '/media/tangga.jpg'
    const href = `/usaha-alumni/${encodeURIComponent(biz?.slug || '')}`

    return (
      <Link
        href={href}
        className={cn(
          'block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold',
          className,
        )}
      >
        <article className="berita-item-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-5 shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-gold/25 hover:shadow-2xl hover:shadow-black/35 md:p-6">
          <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-2xl bg-brand-dark/40">
            <Image
              src={coverSrc}
              alt={biz?.businessName ?? ''}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-dark/50 via-transparent to-transparent" />
            {catLabel && (
              <span className="absolute top-3 right-3 z-10 rounded-full bg-brand-gold px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark shadow-md md:top-3.5 md:right-3.5 md:px-3.5 md:text-[11px]">
                {catLabel}
              </span>
            )}
          </div>

          <div className="mt-5 flex min-h-0 flex-1 flex-col md:mt-6">
            <h3 className="font-serif text-lg font-bold leading-snug text-white md:text-xl">
              {biz?.businessName}
            </h3>
            <p className="mt-3 line-clamp-4 font-sans text-[13px] leading-relaxed text-white/78 md:text-sm md:leading-relaxed">
              {biz?.description}
            </p>

            <div className="mt-5 flex items-start gap-3.5 border-t border-white/10 pt-5 md:mt-6">
              <User className="mt-0.5 size-[22px] shrink-0 text-brand-gold" strokeWidth={1.65} aria-hidden />
              <div className="min-w-0">
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  Pemilik
                </p>
                <p className="mt-1 font-serif text-sm font-bold leading-snug text-white md:text-base">
                  {biz?.ownerName}
                </p>
              </div>
            </div>
          </div>
          {/* Bottom accent sweep on hover */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-brand-gold via-brand-gold/70 to-brand-red transition-all duration-500 group-hover:w-full" />
        </article>
      </Link>
    )
  }

  if (type === 'lowongan') {
    const job = doc as JobVacancy
    const companyLogo = job?.companyLogo
    const href = `/lowongan-kerja/${job?.slug || job?.id}`

    return (
      <div
        className={cn(
          'group relative flex flex-col md:flex-row md:items-start justify-between overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:bg-white/10 hover:shadow-2xl',
          className,
        )}
      >
        {/* Left Column: Logo & Info */}
        <div className="flex flex-col md:flex-row items-start gap-5 w-full md:w-3/4">
          {/* Company Logo Box */}
          <div className="h-16 w-16 shrink-0 rounded-lg bg-white p-2 shadow-inner flex items-center justify-center overflow-hidden border border-white/20">
            {companyLogo && typeof companyLogo === 'object' && companyLogo.url ? (
              <img
                src={companyLogo.url}
                alt={job?.companyName ?? ''}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span aria-hidden="true" className="text-2xl text-brand-primary/50 font-bold">
                {job?.companyName?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <Heading
              level={2}
              tone="inverse"
              className="line-clamp-2 text-xl md:text-2xl transition-colors duration-300 group-hover:text-brand-gold"
            >
              {job?.position}
            </Heading>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Text variant="body" tone="inverse" className="font-medium inline-block m-0">
                {job?.companyName}
              </Text>
              {job?.location && (
                <>
                  <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                  <Text variant="small" tone="inverse" className="inline-block text-white/70 m-0">
                    {job?.location}
                  </Text>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center rounded-sm bg-brand-gold/10 px-2.5 py-0.5 text-xs font-medium text-brand-gold border border-brand-gold/20">
                {job?.employmentType === 'full_time'
                  ? 'Full-time'
                  : job?.employmentType === 'part_time'
                    ? 'Part-time'
                    : 'Internship'}
              </span>
              {job?.workSetup && (
                <span className="inline-flex items-center rounded-sm bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-300 border border-blue-500/20">
                  {job?.workSetup === 'on_site' ? 'On-site' : job?.workSetup === 'hybrid' ? 'Hybrid' : 'Remote'}
                </span>
              )}
              {job?.experienceLevel && (
                <span className="inline-flex items-center rounded-sm bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300 border border-emerald-500/20">
                  {job?.experienceLevel === 'entry'
                    ? 'Entry Level'
                    : job?.experienceLevel === 'mid'
                      ? 'Mid Level'
                      : job?.experienceLevel === 'senior'
                        ? 'Senior Level'
                        : 'Executive'}
                </span>
              )}
            </div>

            {job?.salaryRange && (
              <Text variant="small" className="mt-1 text-brand-gold/80 font-medium">
                {job?.salaryRange}
              </Text>
            )}
          </div>
        </div>

        {/* Right Column: Action */}
        <div className="mt-6 md:mt-0 flex flex-col md:items-end justify-between shrink-0 self-stretch">
          {job?.updatedAt && (
            <Text variant="small" tone="inverse" className="text-white/60 mb-4 hidden md:block">
              {new Date(job.updatedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          )}
          <Button
            asChild
            variant="outline"
            className="w-full md:w-auto mt-auto border-brand-gold/30 text-white bg-transparent hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 group-hover:border-brand-gold group-hover:shadow-[0_0_15px_rgba(240,214,55,0.3)]"
          >
            <Link href={href}>Lihat Detail &rarr;</Link>
          </Button>
        </div>

        {/* Subtle accent line on hover */}
        <div className="absolute left-0 top-0 h-full w-[3px] bg-linear-to-b from-brand-gold to-brand-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    )
  }

  // Fallback / default: type === 'berita'
  const post = doc as CardPostData
  const titleToUse = post?.title
  const { slug, categories, meta, publishedAt, heroImage } = post || {}
  const { image: metaImage } = meta || {}
  const imageToUse = metaImage || heroImage
  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const href = `/berita/${slug}`

  return (
    <a
      href={slug ? href : '#'}
      className={cn(
        'berita-item-card group relative flex h-full w-full max-w-md mx-auto flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/4 shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-gold/25 hover:shadow-2xl hover:shadow-black/35',
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-brand-dark/40">
        {imageToUse && typeof imageToUse === 'object' && 'url' in imageToUse && imageToUse.url ? (
          <Image
            src={imageToUse.url}
            fill
            alt={titleToUse ?? 'Berita IAM ITB'}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-dark/50 text-xs text-white/30">
            Tidak ada gambar
          </div>
        )}
        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/70" />

        {/* Category badge */}
        {showCategories && (
          <Eyebrow
            tone="white"
            className="absolute top-3 left-3 rounded-[3px] bg-brand-red/90 px-2 py-[3px] text-[9px] tracking-[0.2em] shadow-lg backdrop-blur-sm"
          >
            {hasCategories && typeof categories[0] === 'object' && categories[0]?.title
              ? categories[0].title
              : 'IAM'}
          </Eyebrow>
        )}

        {/* Post index pill */}
        {index !== undefined && (
          <span className="absolute top-3 right-3 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-white/20 bg-black/25 font-display text-[10px] font-bold text-white/65 backdrop-blur-md">
            0{index + 1}
          </span>
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-1 flex-col gap-2.5 p-4 pb-5">
        {titleToUse && (
          <Heading
            level={4}
            tone="inverse"
            className="line-clamp-2 text-sm leading-snug transition-colors duration-300 group-hover:text-brand-gold"
          >
            {titleToUse}
          </Heading>
        )}

        <div className="mt-auto flex items-center justify-between pt-1">
          <Text
            variant="small"
            tone="inverse"
            className="font-display text-[10px] uppercase tracking-wider opacity-35"
          >
            {formatDate(publishedAt)}
          </Text>
          <span className="text-[13px] leading-none text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-gold">
            →
          </span>
        </div>
      </div>

      {/* Bottom accent sweep on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-brand-gold via-brand-gold/70 to-brand-red transition-all duration-500 group-hover:w-full" />
    </a>
  )
}
