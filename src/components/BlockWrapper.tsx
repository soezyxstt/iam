// @/components/BlockWrapper.tsx
import React from 'react'
import { cn } from '@/utilities/ui'

interface BlockWrapperProps {
  children: React.ReactNode
  className?: string
  container?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export const BlockWrapper: React.FC<BlockWrapperProps> = ({
  children,
  className,
  container = true,
  padding = 'lg',
}) => {
  const paddingStyles = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-20 md:py-32',
  }

  return (
    <section className={cn('relative w-full', paddingStyles[padding], className)}>
      <div className={cn(container && 'container mx-auto px-4 md:px-8 max-w-6xl z-10 relative')}>
        {children}
      </div>
    </section>
  )
}
