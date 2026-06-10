'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

export function PageClient() {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
    return () => {
      setHeaderTheme(null)
    }
  }, [setHeaderTheme])

  return null
}
