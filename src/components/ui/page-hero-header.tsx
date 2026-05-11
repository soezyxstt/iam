import * as React from 'react'

import { TaperedSeparator } from '@/components/ui/tapered-separator'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import { cn } from '@/utilities/ui'

export interface PageHeroHeaderProps {
  title: string
  subtitle?: string
  eyebrow?: string
  eyebrowTone?: 'red' | 'gold' | 'white' | 'muted'
  /** Rendered below separator; use for intro blurbs (centering handled here). */
  description?: React.ReactNode
  className?: string
}

export function PageHeroHeader({
  title,
  subtitle,
  eyebrow,
  eyebrowTone = 'red',
  description,
  className,
}: PageHeroHeaderProps) {
  return (
    <header className={cn('text-center', className)}>
      {eyebrow ? <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow> : null}
      <Heading
        level={1}
        className={cn(
          'text-balance',
          eyebrow ? 'mt-3' : '',
          'text-3xl leading-tight sm:text-4xl md:text-[2.375rem]',
        )}
      >
        {title}
      </Heading>
      {subtitle ? (
        <Text
          variant="body"
          tone="strong"
          className="mt-2 font-serif text-base font-bold tracking-tight sm:text-lg md:text-xl"
        >
          {subtitle}
        </Text>
      ) : null}
      <TaperedSeparator className="mt-4 md:mt-5" maxWidthClassName="max-w-4xl md:max-w-5xl" />
      {description ? <div className="mx-auto mt-4 max-w-2xl text-center">{description}</div> : null}
    </header>
  )
}
