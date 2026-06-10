import React from 'react'

import { cn } from '@/utilities/ui'

type PageShellProps = {
  children: React.ReactNode
  className?: string
  /** Softer ambient blobs than the home hero */
  showAmbient?: boolean
  /** Whether the page uses the dark theme */
  darkTheme?: boolean
}

export function PageShell({
  children,
  className,
  showAmbient = true,
  darkTheme = false,
}: PageShellProps) {
  return (
    <main
      data-theme={darkTheme ? 'dark' : 'light'}
      className={cn(
        /* No overflow-y clip here — it breaks position:sticky in descendants (e.g. Galeri nav). */
        /* Below fixed header: ~56px bar + md:top-4 inset; keep tight without clipping */
        'relative min-h-screen w-full max-w-[100vw] pt-14 md:pt-[4.75rem]',
        darkTheme ? 'bg-brand-dark text-white' : 'page-root text-brand-dark',
        className,
      )}
    >
      {showAmbient && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
        >
          {/* Top Right Gold */}
          <div className="absolute -top-44 -right-44 h-[640px] w-[580px] rounded-full bg-brand-gold/10 blur-[110px]" />
          {/* Mid Left Primary */}
          <div className="absolute top-[16%] -left-64 h-[700px] w-[520px] rounded-full bg-brand-primary/12 blur-[115px]" />
          {/* Mid/Lower Right Red */}
          <div className="absolute top-[45%] left-1/2 h-[450px] w-[500px] -translate-x-1/2 rounded-full bg-brand-red/6 blur-[100px]" />
          {/* Bottom Left Gold */}
          <div className="absolute bottom-[10%] -left-24 h-[550px] w-[500px] rounded-full bg-brand-gold/8 blur-[110px]" />
        </div>
      )}
      {children}
    </main>
  )
}
