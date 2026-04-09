'use client'

import Image from 'next/image'
import * as React from 'react'

import { cn } from '@/utilities/ui'

export interface ProgramImageStackItem {
  src: string
  alt: string
  title: string
  titleClassName?: string
  /** @deprecated positioning is now handled internally */
  wrapperClassName?: string
}

export interface ProgramImageStackProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ProgramImageStackItem[]
}

// All positions use only left/top (no right/bottom) so CSS transitions work smoothly.
// Stacked: overlapping depth arrangement. Spread: side-by-side fan on hover.
const CARD_CONFIGS = [
  {
    stacked: 'top-0 left-[1%] z-30 w-[52%] -rotate-3',
    spread: 'top-[5%] left-0 z-30 w-[32%] -rotate-6',
  },
  {
    stacked: 'top-[1%] left-[56%] z-20 w-[44%] rotate-2',
    spread: 'top-0 left-[34%] z-20 w-[32%] rotate-0',
  },
  {
    stacked: 'top-[20%] left-[46%] z-10 w-[46%] rotate-5',
    spread: 'top-[5%] left-[68%] z-10 w-[32%] rotate-6',
  },
]

export function ProgramImageStack({ items, className, ...props }: ProgramImageStackProps) {
  const [hovered, setHovered] = React.useState(false)
  const displayItems = items.slice(0, 3)

  return (
    <div
      className={cn('relative h-[420px] w-full md:h-[500px]', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {displayItems.map((item, index) => {
        const config = CARD_CONFIGS[index]
        return (
          <div
            key={`${item.title}-${index}`}
            className={cn(
              'glass-card-frame absolute aspect-4/5',
              hovered ? config.spread : config.stacked,
            )}
          >
            <div className="glass-card-inner">
              <Image src={item.src} fill alt={item.alt} className="object-cover" />
            </div>
            <div className="glass-card-label">
              <span
                className={cn(
                  'font-serif font-bold text-brand-primary drop-shadow-md',
                  item.titleClassName ?? 'text-sm',
                )}
              >
                {item.title}
              </span>
            </div>
          </div>
        )
      })}

      {/* Hint label — fades out once spread */}
      <p
        className={cn(
          'pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/40 transition-opacity duration-300',
          hovered ? 'opacity-0' : 'opacity-100',
        )}
      >
        Hover to explore
      </p>
    </div>
  )
}
