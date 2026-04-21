'use client'

import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React, { useCallback, useEffect, useState } from 'react'

export type GalleryNavItem = {
  id: string
  title: string
}

type GaleriGroupNavProps = {
  items: GalleryNavItem[]
}

export function GaleriGroupNav({ items }: GaleriGroupNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeTitle = items.find((i) => i.id === activeId)?.title ?? items[0]?.title ?? 'Album'

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
    if (hash && items.some((i) => i.id === hash)) {
      setActiveId(hash)
    }
  }, [items])

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-18% 0px -52% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      },
    )

    sections.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [items])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <nav
      aria-label="Lompat ke album kegiatan"
      className={cn(
        'sticky top-20 z-40 w-full shrink-0 self-start lg:z-10 lg:w-68 xl:w-72',
        'pb-4 lg:pb-0',
      )}
    >
      {/* Mobile: collapsible panel (matches header drawer — brand-dark glass) */}
      <div className="lg:hidden">
        <button
          type="button"
          id="galeri-album-nav-trigger"
          aria-expanded={mobileOpen}
          aria-controls="galeri-album-nav-panel"
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl border border-white/10',
            'bg-brand-dark/95 px-4 py-3 text-left shadow-lg backdrop-blur-2xl',
            'transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40',
            mobileOpen && 'shadow-xl ring-1 ring-white/15',
          )}
        >
          <div className="min-w-0 flex-1">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold">
              Album kegiatan
            </p>
            <p className="mt-1 truncate font-display text-sm font-medium text-white">{activeTitle}</p>
          </div>
          <ChevronDown
            className={cn(
              'size-5 shrink-0 text-white/70 transition-transform duration-200',
              mobileOpen && 'rotate-180',
            )}
            aria-hidden
          />
        </button>

        {mobileOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-[2px]"
              aria-label="Tutup daftar album"
              onClick={closeMobile}
            />
            <div
              id="galeri-album-nav-panel"
              role="region"
              aria-labelledby="galeri-album-nav-trigger"
              className={cn(
                'relative z-50 mt-2 overflow-hidden rounded-xl border border-white/10',
                'bg-brand-dark/95 shadow-2xl backdrop-blur-2xl',
              )}
            >
              <p className="border-b border-white/10 px-4 py-2.5 font-display text-xs text-white/60">
                Lompat ke bagian di bawah.
              </p>
              <ul
                className={cn(
                  'max-h-[min(50svh,22rem)] overflow-y-auto py-1 [scrollbar-width:thin]',
                  '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25',
                )}
              >
                {items.map((item) => {
                  const active = activeId === item.id
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={cn(
                          'block px-4 py-3 font-display text-sm leading-snug transition-colors duration-200',
                          active
                            ? 'bg-white/12 font-semibold text-white'
                            : 'text-white/75 hover:bg-white/8 hover:text-white',
                        )}
                        onClick={() => {
                          setActiveId(item.id)
                          closeMobile()
                        }}
                      >
                        {item.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Desktop: sidebar */}
      <div className="hidden lg:block">
        <p className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold">
          Album kegiatan
        </p>
        <p className="mt-2 max-w-[16rem] font-display text-xs leading-relaxed text-muted-foreground">
          Lompat ke bagian di bawah.
        </p>

        <ul
          className={cn(
            'mt-6 flex flex-col gap-0.5',
            'max-h-[calc(100svh-7.5rem)] overflow-y-auto pr-1 [scrollbar-width:thin]',
            '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-dark/20',
          )}
        >
          {items.map((item) => {
            const active = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'block border-l-2 py-2 pl-4 font-display text-sm leading-snug transition-colors duration-200',
                    active
                      ? 'border-brand-red font-semibold text-brand-dark'
                      : 'border-transparent text-brand-dark/65 hover:border-brand-dark/30 hover:text-brand-dark',
                  )}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
