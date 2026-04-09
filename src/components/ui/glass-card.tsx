import * as React from 'react'

import { cn } from '@/utilities/ui'

type GlassCardVariant = 'default' | 'stripes'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  contentClassName?: string
  variant?: GlassCardVariant
}

export function GlassCard({
  children,
  className,
  contentClassName,
  variant = 'default',
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl',
        variant === 'stripes' && 'border-white/8',
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 z-0 bg-linear-to-br from-brand-dark via-brand-primary to-brand-dark" />

      {variant === 'stripes' && (
        <>
          <div className="absolute top-1/2 z-0 grid w-full -translate-y-1/2 grid-cols-1 grid-rows-5 *:h-10 *:w-full *:odd:bg-white">
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="absolute top-1/2 right-0 z-1 hidden -translate-y-1/2 flex-col gap-3 md:flex">
            {[0, 1, 2, 3].map((stripe) => (
              <div
                key={stripe}
                className="h-1.5 rounded-l-full bg-brand-primary/60"
                style={{ width: `${120 - stripe * 15}px` }}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute top-0 left-1/2 z-10 h-px w-3/5 -translate-x-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent" />
      <div className={cn('relative z-10 p-8 md:p-10 lg:p-12', contentClassName)}>{children}</div>
    </div>
  )
}
