'use client'

import React, { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'

import type { Header as HeaderType, Page, Post } from '@/payload-types'
import { CMSLink } from '@/components/Link'

// Extended nav item type accounting for the new dropdown fields
interface NavLink {
  label?: string | null
  url?: string | null
  type?: 'custom' | 'reference' | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  newTab?: boolean | null
  appearance?: string | null
}

interface NavItemWithDropdown {
  link: NavLink
  hasDropdown?: boolean | null
  dropdownItems?: Array<{ link: NavLink }> | null
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = (data?.navItems || []) as NavItemWithDropdown[]
  const pathname = usePathname()

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navItems.map((item, i) => {
        const { link, hasDropdown, dropdownItems } = item

        if (hasDropdown && dropdownItems?.length) {
          return (
            <DropdownItem
              key={i}
              link={link}
              dropdownItems={dropdownItems}
              pathname={pathname}
            />
          )
        }

        const isActive = link?.url && pathname === link.url

        return (
          <CMSLink
            key={i}
            {...link}
            className={cn(
              'px-3 py-1.5 text-sm font-display font-semibold transition-colors duration-150',
              'text-foreground/70 hover:text-foreground hover:bg-muted',
              isActive ? 'text-foreground border-b border-foreground pb-0.5' : 'border-b border-transparent pb-0.5',
            )}
            appearance="link"
          />
        )
      })}
    </nav>
  )
}

interface DropdownItemProps {
  link: NavItemWithDropdown['link']
  dropdownItems: Array<{ link: NavItemWithDropdown['link'] }>
  pathname: string
}

const DropdownItem: React.FC<DropdownItemProps> = ({ link, dropdownItems, pathname }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = dropdownItems?.some(
    (di) => di?.link?.url && pathname.startsWith(di.link.url),
  )

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className={cn(
          'flex items-center gap-1 px-3 py-1.5 text-sm font-display font-semibold transition-colors duration-150',
          'text-foreground/70 hover:text-foreground hover:bg-muted',
          isActive ? 'text-foreground border-b border-foreground pb-0.5' : 'border-b border-transparent pb-0.5',
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {link?.label || 'Menu'}
        <ChevronDown
          className={cn('w-3.5 h-3.5 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {/* Dropdown panel */}
      <div
        onMouseLeave={() => setOpen(false)}
        className={cn(
          'absolute left-0 top-full mt-3 min-w-[200px] z-50',
          'bg-background/90 backdrop-blur-xl border border-border/40 shadow-xl rounded-xl p-2',
          'transition-all duration-200 origin-top',
          open
            ? 'opacity-100 scale-y-100 pointer-events-auto'
            : 'opacity-0 scale-y-95 pointer-events-none',
        )}
      >
        {dropdownItems.map((di, j) => {
          const isChildActive = di?.link?.url && pathname === di.link.url
          return (
            <CMSLink
              key={j}
              {...di.link}
              className={cn(
                'block px-3 py-2 text-sm font-display font-medium rounded-md',
                'text-foreground/70 hover:text-accent hover:bg-muted transition-colors',
                isChildActive && 'text-foreground bg-muted',
              )}
              appearance="link"
            />
          )
        })}
      </div>
    </div>
  )
}
