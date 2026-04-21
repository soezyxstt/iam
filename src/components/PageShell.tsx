import React from 'react'

import { cn } from '@/utilities/ui'

type PageShellProps = {
  children: React.ReactNode
  className?: string
  /** Softer ambient blobs than the home hero */
  showAmbient?: boolean
}

export function PageShell({ children, className, showAmbient = true }: PageShellProps) {
  return (
    <main
      className={cn(
        /* No overflow-y clip here — it breaks position:sticky in descendants (e.g. Galeri nav). */
        'page-root relative min-h-screen w-full max-w-[100vw] pt-20 pb-16 md:pb-24',
        className,
      )}
    >
      {showAmbient && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 h-[420px] w-[380px] rounded-full bg-brand-gold/6 blur-[100px]" />
          <div className="absolute top-[18%] -left-48 h-[520px] w-[400px] rounded-full bg-brand-primary/8 blur-[100px]" />
          <div className="absolute bottom-[10%] right-[5%] h-[360px] w-[320px] rounded-full bg-brand-dark/6 blur-[90px]" />
        </div>
      )}
      {children}
    </main>
  )
}
