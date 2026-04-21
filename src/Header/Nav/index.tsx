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

export function linkIsActive(pathname: string, url?: string | null): boolean {
  if (!url || url.startsWith('http')) return false
  if (url === '/') return pathname === '/'
  return pathname === url || pathname.startsWith(`${url}/`)
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = (data?.navItems || []) as NavItemWithDropdown[]
  const pathname = usePathname()

  return (
    <nav className="hidden lg:flex items-center gap-0.5">
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

        const isActive = linkIsActive(pathname, link?.url)

        return (
          <CMSLink
            key={i}
            {...link}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-display transition-colors duration-200',
              isActive
                ? 'font-semibold text-foreground'
                : 'font-medium text-muted-foreground hover:text-foreground',
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

  const isActive = dropdownItems?.some((di) => linkIsActive(pathname, di?.link?.url))

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className={cn(
          'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-display transition-colors duration-200',
          isActive || open
            ? 'font-semibold text-foreground'
            : 'font-medium text-muted-foreground hover:text-foreground',
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {link?.label || 'Menu'}
        <ChevronDown
          className={cn('size-3.5 opacity-60 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      <div
        onMouseLeave={() => setOpen(false)}
        className={cn(
          'absolute left-0 top-full z-50 mt-2 min-w-[200px] rounded-lg border border-border/50 bg-background p-1 shadow-md',
          'transition-opacity duration-150',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        {dropdownItems.map((di, j) => {
          const isChildActive = linkIsActive(pathname, di?.link?.url)
          return (
            <CMSLink
              key={j}
              {...di.link}
              className={cn(
                'block rounded-md px-3 py-2 text-sm font-display transition-colors duration-200',
                isChildActive
                  ? 'font-semibold text-foreground'
                  : 'font-medium text-muted-foreground hover:text-foreground',
              )}
              appearance="link"
            />
          )
        })}
      </div>
    </div>
  )
}
