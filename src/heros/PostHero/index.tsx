import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative -mt-14 flex min-h-[80vh] items-end md:-mt-[4.75rem]">
      <div className="absolute inset-0 min-h-[80vh] select-none">
        {heroImage && typeof heroImage === 'object' && (
          <Media fill priority imgClassName="object-cover" resource={heroImage} />
        )}
        {heroImage && typeof heroImage === 'string' && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/50 text-xs text-white/30">
            Memuat gambar...
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 text-white md:px-8 lg:grid lg:grid-cols-[1fr_48rem_1fr]">
        <div className="col-span-1 md:col-span-2 md:col-start-2">
          <div className="mb-6 font-display text-[10px] font-bold uppercase tracking-[0.35em] text-white/75">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div>
            <h1 className="mb-6 font-serif text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-display text-xs font-semibold uppercase tracking-wider text-white/55">
                    Penulis
                  </p>

                  <p className="font-sans text-sm text-white/90">{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="font-display text-xs font-semibold uppercase tracking-wider text-white/55">
                  Diterbitkan
                </p>

                <time className="font-sans text-sm text-white/90" dateTime={publishedAt}>
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
