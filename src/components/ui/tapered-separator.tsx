'use client'

import * as React from 'react'

import { cn } from '@/utilities/ui'

export type TaperedSeparatorProps = {
  className?: string
  /** Max width of the graphic (Tailwind class or arbitrary value). */
  maxWidthClassName?: string
}

/**
 * Horizontal spindle: slightly thicker at center, tapering to points — kept visually thin.
 */
export function TaperedSeparator({ className, maxWidthClassName = 'max-w-3xl' }: TaperedSeparatorProps) {
  const uid = React.useId().replace(/:/g, '')
  const gradId = `tapered-separator-fill-${uid}`

  return (
    <div
      className={cn('mx-auto flex w-full justify-center px-4', maxWidthClassName, className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 320 5"
        className="h-1.5 w-full sm:h-[7px]"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(68 94 134 / 0)" />
            <stop offset="40%" stopColor="rgb(68 94 134 / 0.52)" />
            <stop offset="50%" stopColor="rgb(68 94 134 / 0.78)" />
            <stop offset="60%" stopColor="rgb(68 94 134 / 0.52)" />
            <stop offset="100%" stopColor="rgb(68 94 134 / 0)" />
          </linearGradient>
        </defs>
        <path fill={`url(#${gradId})`} d="M0 2.5 L36 2.15 L160 1.35 L284 2.15 L320 2.5 L284 2.85 L160 3.65 L36 2.85 Z" />
      </svg>
    </div>
  )
}
