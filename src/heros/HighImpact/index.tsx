import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import type { Page } from '@/payload-types'

export const HighImpactHero: React.FC<Page['hero']> = ({ media: _media, richText: _richText, links: _links }) => {
  return (
    <section
      className={cn(
        'relative flex w-full min-h-[85vh] items-center justify-start overflow-hidden',
        /* Pull flush under fixed header; offset matches PageShell (`frontend-skill.md` §3.1) */
        '-mt-14 pt-14 md:-mt-[4.75rem] md:pt-[4.75rem]',
        'bg-linear-to-br from-brand-dark via-brand-primary to-brand-dark text-white',
      )}
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 px-4 md:px-8 lg:grid-cols-12">
        <div className="col-span-1 flex flex-col items-start gap-6 text-left lg:col-span-8">
          <div className="flex flex-col gap-2">
            <span className="animate-in fade-in slide-in-from-bottom-4 font-display text-xs font-bold uppercase tracking-[0.35em] text-brand-gold duration-500 sm:text-sm">
              Solidarity Forever
            </span>
            <p className="animate-in fade-in slide-in-from-bottom-6 font-display text-lg font-medium text-white/90 duration-700 md:text-xl">
              Ikatan Alumni Mesin <br className="hidden md:block" />
              Institut Teknologi Bandung
            </p>
          </div>

          <h1 className="animate-in fade-in slide-in-from-bottom-8 font-serif text-5xl font-bold leading-[1.1] text-white md:text-7xl lg:text-8xl duration-1000">
            For Union <br />
            Machine Strong
          </h1>

          <div className="mt-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-150">
            <Button
              asChild
              size="lg"
              variant="brandRed"
              className="rounded-full px-8 py-6 text-lg font-display font-semibold tracking-wider"
            >
              <Link href="/about">Jelajahi</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
