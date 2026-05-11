import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn('border py-4 px-8 flex items-center rounded-xl shadow-sm transition-all duration-300', {
          'border-brand-primary/20 bg-brand-primary text-white': style === 'info',
          'border-error bg-error/10 text-error-foreground': style === 'error',
          'border-success bg-success/10 text-success-foreground': style === 'success',
          'border-warning bg-warning/10 text-warning-foreground': style === 'warning',
        })}
      >
        <RichText
          className="[&_p]:!text-current [&_strong]:!text-current [&_a]:!text-current [&_a]:underline"
          data={content}
          enableGutter={false}
          enableProse={false}
        />
      </div>
    </div>
  )
}
