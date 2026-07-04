'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import React from 'react'

import { cn } from '@/utilities/ui'

export type GalleryImage = {
  /** Image URL, or embed thumbnail. Empty for embeds without a thumbnail. */
  src: string
  alt: string
  caption?: string
  /** When set, the item is a video embed (YouTube/Vimeo) rendered as an iframe in the lightbox. */
  embedSrc?: string
}

type GalleryImageGridProps = {
  images: GalleryImage[]
  onSelect: (img: GalleryImage) => void
}

export function GalleryImageGrid({ images, onSelect }: GalleryImageGridProps) {
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:grid-cols-4">
      {images.map((img, i) => (
        <button
          key={`${img.embedSrc ?? img.src}-${i}`}
          type="button"
          onClick={() => onSelect(img)}
          className={cn(
            'group relative aspect-4/3 overflow-hidden bg-muted text-left rounded-2xl shadow-md border border-white/10',
            'focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:outline-none',
          )}
        >
          {img.src ? (
            img.embedSrc ? (
              /* Embed thumbnails come from external hosts (i.ytimg.com) — plain <img> avoids next/image domain config */
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.02] group-hover:brightness-95"
                loading="lazy"
              />
            ) : (
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.02] group-hover:brightness-95"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            )
          ) : (
            <span className="absolute inset-0 bg-linear-to-br from-brand-dark to-brand-primary" />
          )}
          {img.embedSrc && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 size-5" fill="currentColor" strokeWidth={0} />
              </span>
            </span>
          )}
          {img.caption && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 to-transparent px-2 py-2 font-display text-[10px] font-medium uppercase tracking-wider text-white/95 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-xs">
              {img.caption}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
