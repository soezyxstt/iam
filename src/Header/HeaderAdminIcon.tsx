'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Shield, ShieldCheck } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

const ADMIN_PATH = '/admin'

export const HeaderAdminIcon: React.FC = () => {
  const [user, setUser] = useState<{ id: string; email?: string } | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    void fetch(`${getClientSideURL()}/api/users/me`, { credentials: 'include' })
      .then((r) => r.json())
      .then((data: { user?: { id: string; email?: string } | null }) => {
        if (!cancelled) setUser(data?.user ?? null)
      })
      .catch(() => {
        if (!cancelled) setUser(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const iconButtonClass = cn(
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors',
    'text-muted-foreground hover:bg-foreground/8 hover:text-foreground',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  )

  const tooltipText =
    user === undefined ? 'Panel admin' : user ? 'Buka panel admin' : 'Masuk ke panel admin'

  const ariaLabel = tooltipText

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={ADMIN_PATH}
            className={cn(iconButtonClass, user && 'text-foreground')}
            aria-label={ariaLabel}
          >
            {user === undefined ? (
              <Shield className="h-5 w-5 animate-pulse text-muted-foreground/35" strokeWidth={1.75} aria-hidden />
            ) : user ? (
              <ShieldCheck className="h-5 w-5" strokeWidth={2} aria-hidden />
            ) : (
              <Shield className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
