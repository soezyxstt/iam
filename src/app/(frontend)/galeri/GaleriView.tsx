'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

import { ScrollReveal } from '@/components/ScrollReveal'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import { cn } from '@/utilities/ui'

import type { GalleryGroup } from './galeri-data'
import { GaleriGroupNav } from './GaleriGroupNav'
import { GalleryImageGrid, type GalleryImage } from './GalleryImageGrid'

type GaleriViewProps = {
  groups: GalleryGroup[]
}

export function GaleriView({ groups }: GaleriViewProps) {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setLightbox(null)
  }, [])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  useEffect(() => {
    if (!lightbox) return
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, onKey])

  const navItems = groups.map((g) => ({ id: g.id, title: g.title }))

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0 lg:pt-2">
        <GaleriGroupNav items={navItems} />

        <div className="min-w-0 flex-1 lg:pl-10 xl:pl-12">
          {groups.map((group, idx) => (
            <section
              key={group.id}
              id={group.id}
              className={cn(
                /* Match PageShell top offset so # anchors aren’t hidden under fixed header */
                'relative z-10 scroll-mt-14 md:scroll-mt-[4.75rem]',
                idx > 0 && 'mt-16 border-t border-brand-dark/10 pt-16 md:mt-20 md:pt-20',
              )}
            >
              <ScrollReveal>
                <header className="mb-8 border-b border-brand-dark/10 pb-6 md:mb-10 md:pb-8">
                  <Eyebrow tone="red">
                    {String(idx + 1).padStart(2, '0')}
                  </Eyebrow>
                  <Heading level={2} className="mt-2">
                    {group.title}
                  </Heading>
                  {group.subtitle && (
                    <Text variant="small" tone="light" className="mt-2 font-display">
                      {group.subtitle}
                    </Text>
                  )}
                </header>
                <GalleryImageGrid images={group.images} onSelect={setLightbox} />
              </ScrollReveal>
            </section>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau gambar"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 p-2 text-white/90 transition-opacity hover:opacity-70"
            onClick={() => setLightbox(null)}
            aria-label="Tutup"
          >
            <X className="h-7 w-7" strokeWidth={1.25} />
          </button>
          <div
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black/30">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            {lightbox.caption && (
              <Text tone="inverse" variant="small" className="mt-4 text-center font-display opacity-90">
                {lightbox.caption}
              </Text>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
