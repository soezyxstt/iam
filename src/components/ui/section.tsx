import * as React from 'react'

import { cn } from '@/utilities/ui'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  containerClassName?: string
}

export function Section({ children, className, containerClassName, ...props }: SectionProps) {
  return (
    <section className={cn('relative py-16 md:py-24', className)} {...props}>
      <div className={cn('container mx-auto px-6', containerClassName)}>{children}</div>
    </section>
  )
}
