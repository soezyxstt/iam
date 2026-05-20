'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'

export function AktivitasScrollToGridButton() {
  const scrollToGrid = React.useCallback(() => {
    document.getElementById('aktivitas-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <Button type="button" variant="primary" size="md" onClick={scrollToGrid}>
      Jelajahi
    </Button>
  )
}
