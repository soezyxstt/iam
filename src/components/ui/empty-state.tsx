import React from 'react'
import { Heading, Text } from './typography'
import { Button } from './button'
import { cn } from '@/utilities/ui'

type EmptyStateProps = {
  title?: string
  description?: string
  actionHref?: string
  actionLabel?: string
  tone?: 'onLight' | 'onDark'
  className?: string
}

export function EmptyState({
  title = 'Data Belum Tersedia',
  description,
  actionHref,
  actionLabel,
  tone = 'onLight',
  className,
}: EmptyStateProps) {
  const isDark = tone === 'onDark'
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-2xl rounded-2xl border px-6 py-12 text-center backdrop-blur-sm md:py-16',
        isDark
          ? 'border-white/10 bg-white/6 text-white'
          : 'border-brand-dark/10 bg-white/50 text-brand-dark shadow-xs',
        className,
      )}
    >
      <Heading
        level={3}
        tone={isDark ? 'inverse' : 'default'}
        className="text-lg font-bold md:text-xl"
      >
        {title}
      </Heading>
      {description && (
        <Text
          variant="body"
          tone={isDark ? 'inverse' : 'default'}
          className={cn('mt-2 text-[13px] md:text-sm', !isDark && 'text-brand-dark/70')}
        >
          {description}
        </Text>
      )}
      {actionHref && actionLabel && (
        <Button href={actionHref} variant="secondary" size="sm" className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
