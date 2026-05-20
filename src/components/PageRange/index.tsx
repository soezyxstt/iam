import React from 'react'
import { cn } from '@/utilities/ui'

const defaultLabels = {
  plural: 'Dokumen',
  singular: 'Dokumen',
}

const defaultCollectionLabels = {
  posts: {
    plural: 'Postingan',
    singular: 'Postingan',
  },
  jobVacancies: {
    plural: 'Lowongan',
    singular: 'Lowongan',
  },
}

export const PageRange: React.FC<{
  className?: string
  collection?: keyof typeof defaultCollectionLabels
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { plural, singular } =
    collectionLabelsFromProps ||
    (collection ? defaultCollectionLabels[collection] : undefined) ||
    defaultLabels ||
    {}

  return (
    <div
      className={cn(
        'font-display text-sm font-semibold tracking-tight text-brand-dark/75',
        className,
      )}
    >
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Pencarian tidak membuahkan hasil.'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `Menampilkan ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} dari ${totalDocs} ${
          totalDocs > 1 ? plural : singular
        }`}
    </div>
  )
}
