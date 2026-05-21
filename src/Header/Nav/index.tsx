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

export const HeaderNav: React.FC<{ data: HeaderType; scrolled?: boolean }> = ({ data, scrolled = false }) => {
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
              scrolled={scrolled}
            />
          )
        }

        const isActive = linkIsActive(pathname, link?.url)

        return (
          <CMSLink
            key={i}
            {...link}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-display transition-all duration-200 relative',
              isActive
                ? 'font-bold text-foreground after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[2px] after:bg-brand-gold'
                : scrolled
                  ? 'font-medium text-muted-foreground hover:text-foreground'
                  : 'font-bold text-foreground hover:text-foreground/80',
            )}
            appearance="inline"
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
  scrolled?: boolean
}

const DropdownItem: React.FC<DropdownItemProps> = ({ link, dropdownItems, pathname, scrolled = false }) => {
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
    <div
      ref={ref}
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-display transition-all duration-200 relative',
          isActive || open
            ? 'font-bold text-foreground after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[2px] after:bg-brand-gold'
            : scrolled
              ? 'font-medium text-muted-foreground hover:text-foreground'
              : 'font-bold text-foreground hover:text-foreground/80',
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
        className={cn(
          'absolute left-1/2 -translate-x-1/2 top-full z-50 mt-2 min-w-[220px] rounded-xl',
          'border border-white/10 bg-brand-dark/90 backdrop-blur-xl p-1.5 shadow-2xl',
          'transition-all duration-300 ease-out origin-top',
          open
            ? 'pointer-events-auto opacity-100 translate-y-0 scale-100'
            : 'pointer-events-none opacity-0 -translate-y-2 scale-95',
        )}
      >
        {/* Invisible bridge to prevent flickering when moving mouse to menu */}
        <div className="absolute -top-2 inset-x-0 h-2" />
        
        {/* Subtle top indicator/shimmer */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {dropdownItems.map((di, j) => {
          const isChildActive = linkIsActive(pathname, di?.link?.url)
          return (
            <CMSLink
              key={j}
              {...di.link}
              className={cn(
                'block rounded-lg px-4 py-2.5 text-sm font-display transition-all duration-200',
                isChildActive
                  ? 'font-bold text-brand-gold bg-brand-gold/10'
                  : 'font-medium text-white/70 hover:text-white hover:bg-white/10',
              )}
              appearance="inline"
              onClick={() => setOpen(false)}
            />
          )
        })}
      </div>
    </div>

  )
}
