import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

export const HighImpactHero: React.FC<any> = ({ media, richText, links }) => {
  return (
    <section
      className={cn(
        'relative w-full min-h-[85vh] flex items-center justify-start overflow-hidden',
        'bg-primary text-primary-foreground', // Fallback Dark Blue
      )}
    >
      {/* Background Layer - Easily swap this for a Payload Media component later */}
      <div className="absolute inset-0 z-0 bg-primary/95" />

      <div className="container relative z-10 mx-auto grid grid-cols-1 lg:grid-cols-12 px-4 md:px-8">
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6 items-start text-left">
          <div className="flex flex-col gap-2">
            <span className="text-accent font-display font-semibold tracking-widest uppercase text-sm md:text-base animate-in slide-in-from-bottom-4 fade-in duration-500">
              Solidarity Forever
            </span>
            <h2 className="text-primary-foreground/90 font-display font-medium text-lg md:text-xl animate-in slide-in-from-bottom-6 fade-in duration-700">
              Ikatan Alumni Mesin <br className="hidden md:block" />
              Institut Teknologi Bandung
            </h2>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] animate-in slide-in-from-bottom-8 fade-in duration-1000">
            For Union <br />
            Machine Strong
          </h1>

          <div className="mt-6 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-150">
            <Button asChild size="lg" variant="brandRed" className="text-lg px-8 py-6 rounded-none">
              <Link href="/about">Explore More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
