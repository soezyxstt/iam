'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo = 'posts', showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = relationTo === 'posts' ? `/berita/${slug}` : `/${relationTo}/${slug}`

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

  return (
    <article
      className={cn(
        'berita-item-card group relative flex h-full w-full max-w-md mx-auto flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B1526] shadow-xl shadow-black/30 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/40 hover:shadow-2xl hover:shadow-black/45',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        {!metaImage && (
          <div className="flex h-full w-full items-center justify-center bg-brand-dark/50 text-xs text-white/30">
            Tidak ada gambar
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            size="33vw"
            fill
            imgClassName="object-cover transition-transform duration-1000 group-hover:scale-110"
            className="h-full w-full relative"
          />

        )}

        {/* Bottom gradient overlay - more dramatic for better text isolation */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

        {showCategories && hasCategories && (
          <div className="absolute top-3 left-3 z-10">
            <Eyebrow
              tone="white"
              className="rounded-sm bg-brand-red/90 px-2 py-1 text-[9px] tracking-[0.2em] shadow-lg backdrop-blur-sm"
            >
              {typeof categories[0] === 'object' && categories[0]?.title
                ? categories[0].title
                : 'IAM'}
            </Eyebrow>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-6 pb-7">
        {titleToUse && (
          <Heading
            level={4}
            tone="inverse"
            className="line-clamp-2 text-lg leading-snug transition-colors duration-300 group-hover:text-brand-gold md:text-xl"
          >
            <Link className="not-prose" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </Heading>
        )}

        {sanitizedDescription && (
          <Text
            tone="inverse"
            variant="small"
            className="mt-1 line-clamp-3 text-sm leading-relaxed text-white/70"
          >
            {sanitizedDescription}
          </Text>
        )}

        <div className="mt-auto flex items-center justify-between pt-5">
          <Text
            variant="small"
            tone="inverse"
            className="font-display text-[10px] font-medium uppercase tracking-wider text-white/60"
          >
            {formatDate(publishedAt)}
          </Text>
          <span className="text-sm leading-none text-brand-gold/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-gold">
            →
          </span>
        </div>
      </div>

      {/* Bottom accent sweep on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-brand-gold via-brand-gold/70 to-brand-red transition-all duration-500 group-hover:w-full" />
    </article>
  )
}
