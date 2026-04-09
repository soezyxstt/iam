'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SearchIcon, MenuIcon, XIcon, ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'

import type { Header, Page, Post } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { CMSLink } from '@/components/Link'

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

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navItems = (data?.navItems || []) as NavItemWithDropdown[]

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 md:top-4 z-50 transition-all duration-300 md:px-8',
        )}
        {...(headerTheme ? { 'data-theme': headerTheme } : {})}
      >
        <div className={cn(
          'max-w-6xl mx-auto flex items-center justify-between gap-4 transition-all duration-300',
          'bg-background border-b border-border md:border md:rounded-full px-4 md:px-6 py-2.5 shadow-sm',
          scrolled && 'shadow-md md:bg-background/95 md:backdrop-blur-md bg-background'
        )}>
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="IAM ITB – Beranda">
            <Logo size={36} showText={true} className="text-foreground" />
          </Link>

          {/* Desktop Nav – centered */}
          <div className="flex-1 flex justify-center">
            <HeaderNav data={data} />
          </div>

          {/* Right Side: Search + Hamburger */}
          <div className="flex items-center gap-2">
            {/* Search box desktop */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const q = (e.currentTarget.elements.namedItem('q') as HTMLInputElement)?.value
                if (q) window.location.href = `/search?q=${encodeURIComponent(q)}`
              }}
              className="hidden md:flex items-center gap-2 bg-muted hover:bg-border/60 rounded-full px-4 py-1.5 transition-colors duration-150"
            >
              <SearchIcon className="w-4 h-4 text-foreground/60 shrink-0" />
              <input
                name="q"
                type="text"
                placeholder="Search"
                className="bg-transparent text-sm font-display text-foreground placeholder:text-foreground/60 outline-none w-24 focus:w-32 transition-all duration-300"
                aria-label="Cari konten"
              />
            </form>

            {/* Mobile: search icon link */}
            <Link
              href="/search"
              className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
              aria-label="Pencarian"
            >
              <SearchIcon className="w-5 h-5" />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <>
        {/* Backdrop */}
        <div
          className={cn(
            'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300',
            mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div
          className={cn(
            'fixed top-0 right-0 bottom-0 z-50 w-72 bg-background shadow-2xl lg:hidden',
            'flex flex-col pt-16 pb-8 overflow-y-auto border-l border-border',
            'transition-transform duration-300 ease-in-out',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            aria-label="Tutup menu"
          >
            <XIcon className="w-5 h-5" />
          </button>

          {/* Logo in drawer */}
          <Link href="/" className="px-6 mb-6" onClick={() => setMobileOpen(false)}>
            <Logo size={32} showText={true} className="text-foreground" />
          </Link>

          {/* Nav links */}
          <nav className="flex flex-col px-4 gap-1">
            {navItems.map((item, i) => {
              const { link, hasDropdown, dropdownItems } = item

              if (hasDropdown && dropdownItems?.length) {
                return (
                  <MobileDropdownItem
                    key={i}
                    link={link}
                    dropdownItems={dropdownItems}
                  />
                )
              }

              return (
                <CMSLink
                  key={i}
                  {...link}
                  className="block px-3 py-2.5 text-sm font-display font-medium text-foreground/80 hover:text-accent hover:bg-muted rounded transition-colors"
                  appearance="link"
                />
              )
            })}
          </nav>

          {/* Search in drawer */}
          <form
            className="mt-6 px-4"
            onSubmit={(e) => {
              e.preventDefault()
              const q = (e.currentTarget.elements.namedItem('q') as HTMLInputElement)?.value
              if (q) {
                setMobileOpen(false)
                window.location.href = `/search?q=${encodeURIComponent(q)}`
              }
            }}
          >
            <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-2 border border-border">
              <SearchIcon className="w-4 h-4 text-foreground/60 shrink-0" />
              <input
                name="q"
                type="text"
                placeholder="Cari konten..."
                className="bg-transparent text-sm text-foreground placeholder:text-foreground/50 outline-none flex-1"
                aria-label="Cari konten"
              />
            </div>
          </form>
        </div>
      </>
    </>
  )
}

// ----------------------------------------------------------------
// Mobile accordion dropdown item
// ----------------------------------------------------------------
const MobileDropdownItem: React.FC<{
  link: NavItemWithDropdown['link']
  dropdownItems: Array<{ link: NavItemWithDropdown['link'] }>
}> = ({ link, dropdownItems }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-display font-medium text-foreground/80 hover:text-accent hover:bg-muted rounded transition-colors"
      >
        {link?.label || 'Menu'}
        <ChevronDown
          className={cn('w-3.5 h-3.5 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="pl-4 mt-0.5 flex flex-col gap-0.5">
          {dropdownItems.map((di, j) => (
            <CMSLink
              key={j}
              {...di.link}
              className="block px-3 py-2 text-sm font-display font-medium text-foreground/60 hover:text-accent hover:bg-muted rounded transition-colors"
              appearance="link"
            />
          ))}
        </div>
      )}
    </div>
  )
}
