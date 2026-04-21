'use client'

import Image from 'next/image'
import React from 'react'

import { cn } from '@/utilities/ui'

export type GalleryImage = {
  src: string
  alt: string
  caption?: string
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
          key={`${img.src}-${i}`}
          type="button"
          onClick={() => onSelect(img)}
          className={cn(
            'group relative aspect-4/3 overflow-hidden bg-muted text-left',
            'focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:outline-none',
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.02] group-hover:brightness-95"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
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
