import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { Card } from '../../components/Card'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: DefaultTypedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props
  const count = docs?.length ?? 0

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div
        className={clsx(
          'grid gap-6 md:gap-8 items-stretch justify-center mx-auto',
          count === 1 && 'grid-cols-1 max-w-sm',
          count === 2 && 'grid-cols-1 md:grid-cols-2 max-w-2xl',
          count >= 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl',
        )}
      >
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} type="berita" showCategories />
        })}
      </div>
    </div>
  )
}
