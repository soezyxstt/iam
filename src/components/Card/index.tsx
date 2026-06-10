'use client'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { User } from 'lucide-react'

import type { Post, AlumniBusiness, JobVacancy, Activity, Community } from '@/payload-types'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'

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
  type?: 'berita' | 'aktivitas' | 'usaha' | 'lowongan' | 'komunitas'
  doc?: CardPostData | AlumniBusiness | JobVacancy | Activity | Community | Record<string, unknown>
  index?: number
  className?: string
  showCategories?: boolean
  tone?: 'onLight' | 'onDark'
}

export const Card: React.FC<CardProps> = (props) => {
  const { type = 'berita', doc, index, className, showCategories = true, tone = 'onDark' } = props

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
    const act = doc as { title?: string; activityName?: string; slug: string; excerpt?: string; date?: string; image?: string; heroImage?: any }
    const href = `/aktivitas/${act?.slug}`
    const isDark = tone === 'onDark'
    
    const titleToUse = act?.title ?? act?.activityName
    const excerptToUse = act?.excerpt
    const imageToUse = act?.image ?? (typeof act?.heroImage === 'object' && act?.heroImage !== null && 'url' in act.heroImage ? act.heroImage.url : null)
    
    const dateStr = act?.date
      ? new Date(act.date).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : null

    return (
      <Link
        href={href}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl',
          isDark
            ? 'berita-item-card border-white/10 bg-white/4 shadow-xl shadow-black/25 backdrop-blur-sm hover:border-brand-gold/25 hover:shadow-black/35 text-white'
            : 'border-brand-dark/10 bg-white shadow-sm hover:border-brand-gold/25 text-brand-dark',
          className,
        )}
      >
        <div className={cn(
          'relative aspect-16/10 w-full shrink-0 overflow-hidden',
          isDark ? 'bg-brand-dark/40' : 'bg-brand-khaki/30'
        )}>
          {imageToUse ? (
            <Image
              src={imageToUse}
              alt={titleToUse ?? ''}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className={cn(
              "absolute inset-0 flex items-center justify-center",
              isDark ? "bg-brand-primary/10" : "bg-brand-primary/10"
            )}>
              <span className={cn(
                "font-display text-4xl font-bold",
                isDark ? "text-white/20" : "text-brand-primary/20"
              )}>
                IAM
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-dark/50 via-transparent to-transparent" />
        </div>
        <div className="flex flex-1 flex-col gap-3 px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
          {dateStr && (
            <Eyebrow tone="red" className="text-[10px]">
              {dateStr}
            </Eyebrow>
          )}
          <Heading
            level={3}
            tone={isDark ? 'inverse' : 'default'}
            className="line-clamp-2 transition-colors duration-300 group-hover:text-brand-gold"
          >
            {titleToUse}
          </Heading>
          <Text
            tone={isDark ? 'inverse' : 'default'}
            variant="small"
            className={cn("line-clamp-3 md:text-sm", !isDark && "text-brand-dark/70")}
          >
            {excerptToUse}
          </Text>
          <div className={cn(
            "mt-auto pt-4 border-t flex items-center justify-between",
            isDark ? "border-white/10" : "border-brand-dark/5"
          )}>
            <span className={cn(
              "font-display text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-brand-gold",
              isDark ? "text-white/40" : "text-brand-dark/40"
            )}>
              Selengkapnya
            </span>
            <span className={cn(
              "transition-all duration-300 group-hover:text-brand-gold group-hover:translate-x-1",
              isDark ? "text-white/20" : "text-brand-dark/20"
            )}>
              &rarr;
            </span>
          </div>
        </div>
        {/* Bottom accent sweep on hover */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-brand-gold via-brand-gold/70 to-brand-red transition-all duration-500 group-hover:w-full" />
      </Link>
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
    const coverSrc = cover?.url ?? '/assets/tangga.jpg'
    const href = `/usaha-alumni/${encodeURIComponent(biz?.slug || '')}`

    return (
      <Link
        href={href}
        className={cn(
          'block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold',
          className,
        )}
      >
        <article className="berita-item-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-5 shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-gold/25 hover:shadow-2xl hover:shadow-black/35 md:p-6">
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
            <Heading level={3} tone="inverse" className="text-lg md:text-xl leading-snug group-hover:text-brand-gold transition-colors duration-300">
              {biz?.businessName}
            </Heading>
            <Text tone="inverse" className="mt-3 line-clamp-4 text-[13px] md:text-sm leading-relaxed">
              {biz?.description}
            </Text>

            <div className="mt-5 flex items-start gap-3.5 border-t border-white/10 pt-5 md:mt-6">
              <User className="mt-0.5 size-[22px] shrink-0 text-brand-gold" strokeWidth={1.65} aria-hidden />
              <div className="min-w-0">
                <Eyebrow tone="gold" className="text-[10px] font-semibold tracking-[0.2em]">
                  Pemilik
                </Eyebrow>
                <Heading level={4} tone="inverse" className="mt-1 text-sm md:text-base leading-snug">
                  {biz?.ownerName}
                </Heading>
              </div>
            </div>
          </div>
          {/* Bottom accent sweep on hover */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-brand-gold via-brand-gold/70 to-brand-red transition-all duration-500 group-hover:w-full" />
        </article>
      </Link>
    )
  }

  if (type === 'komunitas') {
    const comm = doc as { communityName: string; slug: string; shortDescription?: string; logo?: any }
    const href = `/komunitas/${comm?.slug}`
    const isDark = tone === 'onDark'

    return (
      <Link
        href={href}
        className={cn(
          'group relative block h-full overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl',
          isDark
            ? 'berita-item-card border-white/10 bg-white/4 shadow-xl shadow-black/25 backdrop-blur-sm hover:border-brand-gold/25 hover:shadow-black/35 text-white'
            : 'border-brand-dark/10 bg-white shadow-sm hover:border-brand-gold/25 text-brand-dark',
          className,
        )}
      >
        <div className={cn(
          "relative aspect-16/9 w-full overflow-hidden p-8 flex items-center justify-center",
          isDark ? "bg-brand-dark/40" : "bg-brand-khaki/30"
        )}>
          <div className="relative w-24 h-24 transition-transform duration-500 group-hover:scale-110">
            {comm?.logo && typeof comm.logo === 'object' ? (
              <Media resource={comm.logo} fill className="object-contain filter drop-shadow-md" />
            ) : (
              <div className={cn(
                "w-full h-full rounded-full flex items-center justify-center",
                isDark ? "bg-white/10" : "bg-brand-primary/10"
              )}>
                <span className={cn(
                  "font-bold text-2xl",
                  isDark ? "text-brand-gold" : "text-brand-primary"
                )}>{comm?.communityName?.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 md:p-8 flex flex-col h-full">
          <Heading
            level={3}
            className="mb-3 text-xl transition-colors duration-300 group-hover:text-brand-gold"
            tone={isDark ? 'inverse' : 'default'}
          >
            {comm?.communityName}
          </Heading>
          <Text
            variant="small"
            tone={isDark ? "inverse" : "default"}
            className={cn("line-clamp-2", !isDark && "text-brand-dark/70")}
          >
            {comm?.shortDescription}
          </Text>
          <div className={cn(
            "mt-6 pt-4 border-t flex items-center justify-between",
            isDark ? "border-white/10" : "border-brand-dark/5"
          )}>
            <span className={cn(
              "font-display text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-brand-gold",
              isDark ? "text-white/40" : "text-brand-dark/40"
            )}>
              Lihat Detail
            </span>
            <span className={cn(
              "transition-all duration-300 group-hover:text-brand-gold group-hover:translate-x-1",
              isDark ? "text-white/20" : "text-brand-dark/20"
            )}>
              &rarr;
            </span>
          </div>
        </div>
        {/* Bottom accent sweep on hover */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-brand-gold via-brand-gold/70 to-brand-red transition-all duration-500 group-hover:w-full" />
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
              <Image
                src={companyLogo.url}
                alt={job?.companyName ?? ''}
                width={64}
                height={64}
                className="max-h-full max-w-full object-contain"
                unoptimized
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
                {job?.employmentType === 'kp'
                  ? 'Kerja Praktik (KP)'
                  : job?.employmentType === 'magang'
                    ? 'Magang (Internship)'
                    : 'Full Time'}
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
        'berita-item-card group relative flex h-full w-full max-w-sm mx-auto flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/4 shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-gold/25 hover:shadow-2xl hover:shadow-black/35',
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-brand-dark/40">
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
