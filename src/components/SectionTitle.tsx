// @/components/SectionTitle.tsx
import React from 'react'
import { cn } from '@/utilities/ui'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  eyebrow?: string
  align?: 'left' | 'center' | 'right'
  /** Tells the title if it's sitting on a light or dark background */
  theme?: 'light' | 'dark'
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className,
  eyebrow,
  align = 'left',
  theme = 'light',
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'right' && 'items-end text-right',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-flex items-center justify-center px-5 py-2 rounded-full backdrop-blur-md border shadow-sm w-fit',
            theme === 'light'
              ? 'bg-muted/50 border-border'
              : 'bg-background/10 border-background/20',
          )}
        >
          <span
            className={cn(
              'text-xs font-display font-bold tracking-[0.15em] uppercase',
              theme === 'light' ? 'text-secondary' : 'text-accent',
            )}
          >
            {eyebrow}
          </span>
        </span>
      )}
      <h2
        className={cn(
          'font-serif font-bold text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight',
          theme === 'light' ? 'text-foreground' : 'text-background',
          // The <em> tags will adapt automatically
          theme === 'light'
            ? '[&_em]:text-secondary [&_em]:italic [&_em]:font-normal'
            : '[&_em]:text-accent [&_em]:italic [&_em]:font-normal',
        )}
      >
        {children}
      </h2>
    </div>
  )
}
