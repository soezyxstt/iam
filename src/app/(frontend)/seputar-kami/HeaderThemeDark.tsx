'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useEffect } from 'react'

export function HeaderThemeDark() {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
    // Reset back to default on unmount
    return () => {
      setHeaderTheme(null)
    }
  }, [setHeaderTheme])

  return null
}
