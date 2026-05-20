import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardProps } from '@/components/Card'

export type Props = {
  posts: any[]
  className?: string
  type?: CardProps['type']
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, className, type = 'berita' } = props

  return (
    <div className={cn('w-full', className)}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <Card className="h-full" doc={result} type={type} showCategories key={index} />
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
