'use client'

import * as React from 'react'

import { Text } from '@/components/ui/typography'
import { cn } from '@/utilities/ui'

type TabId = 'tentang' | 'bisnis'

export function UsahaDetailTabs({
  aboutText,
  bisnisContent,
  className,
  surface = 'dark',
}: {
  aboutText: string
  bisnisContent: React.ReactNode
  className?: string
  /** Light surface for detail pages on white/muted backgrounds */
  surface?: 'dark' | 'light'
}) {
  const [tab, setTab] = React.useState<TabId>('tentang')
  const tentangId = React.useId()
  const bisnisId = React.useId()
  const panelId = React.useId()

  const borderB = surface === 'light' ? 'border-brand-dark/12' : 'border-white/15'
  const tabInactive =
    surface === 'light'
      ? 'border-transparent text-brand-dark/50 hover:text-brand-dark/85'
      : 'border-transparent text-white/55 hover:text-white/85'
  const tabActive = 'border-brand-gold text-brand-gold'
  const bodyClass =
    surface === 'light'
      ? 'max-w-prose text-[15px] leading-[1.8] text-brand-dark/78'
      : 'text-[15px] leading-[1.75] text-white/78'

  return (
    <div className={cn('w-full', className)}>
      <div role="tablist" aria-label="Detail usaha" className={cn('flex gap-1 border-b sm:gap-2', borderB)}>
        <button
          type="button"
          role="tab"
          id={tentangId}
          aria-selected={tab === 'tentang'}
          aria-controls={`${panelId}-tentang`}
          className={cn(
            'font-display text-[11px] font-bold uppercase tracking-[0.22em] transition-colors sm:text-xs',
            'border-b-2 px-3 py-3 sm:px-4',
            tab === 'tentang' ? tabActive : tabInactive,
          )}
          onClick={() => setTab('tentang')}
        >
          Tentang
        </button>
        <button
          type="button"
          role="tab"
          id={bisnisId}
          aria-selected={tab === 'bisnis'}
          aria-controls={`${panelId}-bisnis`}
          className={cn(
            'font-display text-[11px] font-bold uppercase tracking-[0.22em] transition-colors sm:text-xs',
            'border-b-2 px-3 py-3 sm:px-4',
            tab === 'bisnis' ? tabActive : tabInactive,
          )}
          onClick={() => setTab('bisnis')}
        >
          Bisnis
        </button>
      </div>

      <div className="pt-6 md:pt-8">
        {tab === 'tentang' ? (
          <div
            role="tabpanel"
            id={`${panelId}-tentang`}
            aria-labelledby={tentangId}
            className="space-y-4"
          >
            <Text className={bodyClass}>{aboutText}</Text>
          </div>
        ) : (
          <div role="tabpanel" id={`${panelId}-bisnis`} aria-labelledby={bisnisId}>
            {bisnisContent}
          </div>
        )}
      </div>
    </div>
  )
}
