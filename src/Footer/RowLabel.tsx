'use client'
import React from 'react'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{ platform?: string; url?: string }>()

  const platformValue = data?.data?.platform
  const platformLabel = platformValue
    ? platformValue.charAt(0).toUpperCase() + platformValue.slice(1)
    : ''

  const label = platformLabel
    ? `${platformLabel} (${data.data.url || ''})`
    : `Medsos ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}

