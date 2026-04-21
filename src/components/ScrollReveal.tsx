'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  /** Additional classes when visible */
  visibleClassName?: string
}

export function ScrollReveal({
  children,
  className,
  visibleClassName = 'opacity-100 translate-y-0',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'translate-y-5 opacity-0 transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100',
        visible && visibleClassName,
        className,
      )}
    >
      {children}
    </div>
  )
}
