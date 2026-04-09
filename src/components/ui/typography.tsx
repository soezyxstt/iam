import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utilities/ui'

const headingVariants = cva('font-serif font-bold tracking-tight text-brand-dark', {
  variants: {
    level: {
      1: 'text-4xl sm:text-5xl md:text-6xl leading-[1.08]',
      2: 'text-3xl md:text-4xl leading-[1.1]',
      3: 'text-2xl md:text-3xl leading-[1.2]',
      4: 'text-xl md:text-2xl leading-[1.25]',
    },
    tone: {
      default: 'text-brand-dark',
      inverse: 'text-white',
      accent: 'text-brand-gold',
      muted: 'text-brand-dark/75',
    },
  },
  defaultVariants: {
    level: 2,
    tone: 'default',
  },
})

const textVariants = cva('font-sans', {
  variants: {
    variant: {
      body: 'text-sm md:text-[15px] leading-relaxed text-brand-dark/70',
      lead: 'text-lg md:text-2xl leading-relaxed text-brand-dark font-serif',
      small: 'text-xs leading-relaxed text-brand-dark/70',
    },
    tone: {
      default: 'text-brand-dark/70',
      inverse: 'text-white/75',
      accent: 'text-brand-gold',
      strong: 'text-brand-dark',
    },
  },
  defaultVariants: {
    variant: 'body',
    tone: 'default',
  },
})

type HeadingLevel = 1 | 2 | 3 | 4

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  level?: HeadingLevel
}

export function Heading({ level = 2, tone, className, ...props }: HeadingProps) {
  const Component = `h${level}` as keyof React.JSX.IntrinsicElements
  return <Component className={cn(headingVariants({ level, tone }), className)} {...props} />
}

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {}

export function Text({ variant, tone, className, ...props }: TextProps) {
  return <p className={cn(textVariants({ variant, tone }), className)} {...props} />
}
