'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

import { ScrollReveal } from '@/components/ScrollReveal'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import { cn } from '@/utilities/ui'

import { GaleriGroupNav } from './GaleriGroupNav'
import { GalleryImageGrid, type GalleryImage } from './GalleryImageGrid'

export type GalleryGroup = {
  id: string
  title: string
  subtitle?: string
  images: GalleryImage[]
}

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
    <div className="container">
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
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/92 p-4 md:p-8 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau gambar"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 z-50 p-2 text-white/80 transition-opacity hover:opacity-100 hover:text-white bg-white/10 rounded-full hover:bg-white/20"
            onClick={() => setLightbox(null)}
            aria-label="Tutup"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
          
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-brand-dark/95 shadow-2xl flex flex-col md:grid md:grid-cols-4 max-h-[85vh] md:h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Image (3/4 width on desktop) */}
            <div className="relative flex-1 md:col-span-3 bg-black/40 flex items-center justify-center min-h-[320px] md:min-h-0 md:h-full">
              <div className="relative w-full h-full aspect-video md:aspect-auto">
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  fill
                  className="object-contain p-2 md:p-6"
                  sizes="(max-width: 768px) 100vw, 75vw"
                  priority
                />
              </div>
            </div>

            {/* Right: Info/Description (1/4 width on desktop) */}
            <div className="p-6 md:p-8 md:col-span-1 flex flex-col justify-between border-t border-white/10 md:border-t-0 md:border-l md:border-white/10 bg-brand-primary/40 h-full overflow-y-auto">
              <div className="flex flex-col gap-4">
                <Eyebrow tone="gold" className="text-[10px] tracking-[0.25em]">
                  Detail Galeri
                </Eyebrow>
                <Heading level={3} tone="inverse" className="text-xl md:text-2xl font-serif">
                  {lightbox.alt}
                </Heading>
                <div className="h-[2px] w-10 bg-brand-gold/60 my-1" />
                <Text tone="inverse" variant="body" className="text-sm text-white/80 leading-relaxed">
                  {lightbox.caption || 'Dokumentasi kegiatan dan momen Ikatan Alumni Mesin ITB.'}
                </Text>
              </div>
              
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col gap-2">
                <span className="font-display text-[9px] font-semibold tracking-wider text-white/40 uppercase">
                  IAM ITB Gallery
                </span>
                <span className="font-sans text-[11px] text-white/60">
                  Solidarity Forever
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
