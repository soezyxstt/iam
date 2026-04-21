'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SearchIcon, MenuIcon, XIcon, ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'

import type { Header, Page, Post } from '@/payload-types'
import { defaultHeaderNavItems } from '@/config/defaultNav'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav, linkIsActive } from './Nav'
import { HeaderAdminIcon } from './HeaderAdminIcon'
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
  
  // Navigation states
  const [mobileOpen, setMobileOpen] = useState(false)
  
  // Scroll states
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Reset states on route change
  useEffect(() => {
    setHeaderTheme(null)
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Smart Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 1. Handle background glass effect (scrolled past 20px)
      setScrolled(currentScrollY > 20)

      // 2. Handle Hide/Show behavior
      // Show if scrolling up OR near the very top (hero section)
      if (currentScrollY < lastScrollY || currentScrollY < 80) {
        setIsVisible(true)
      } 
      // Hide if scrolling down AND past the hero section threshold
      else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navItems = (
    data?.navItems?.length ? data.navItems : defaultHeaderNavItems
  ) as NavItemWithDropdown[]

  const headerDataForNav = { ...data, navItems } as Header

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 md:top-4 z-50 transition-all duration-300 ease-in-out md:px-8',
          // Apply transform to hide/show
          isVisible ? 'md:translate-y-0' : 'md:-translate-y-[150%]'
        )}
        {...(headerTheme ? { 'data-theme': headerTheme } : {})}
      >
        <div className={cn(
          'max-w-6xl mx-auto flex items-center justify-between gap-4 transition-all duration-300',
          'relative overflow-hidden',
          'bg-background/85 backdrop-blur-xl',
          'border-b border-border/40 md:border md:border-white/12 md:rounded-full px-4 md:px-6 py-2.5',
          'shadow-sm shadow-black/5',
          scrolled && 'shadow-md shadow-black/10 md:bg-background/95'
        )}>
          {/* Shimmer highlight line — mirrors GlassCard top-edge treatment */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="IAM ITB – Beranda">
            <Logo size={36} showText className="text-foreground" />
          </Link>

          {/* Desktop Nav – centered */}
          <div className="flex-1 flex justify-center">
            <HeaderNav data={headerDataForNav} />
          </div>

          {/* Right: Search, then admin icon (far right before menu on mobile) */}
          <div className="flex min-w-0 items-center gap-2">
            {/* Search box desktop */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const q = (e.currentTarget.elements.namedItem('q') as HTMLInputElement)?.value
                if (q) window.location.href = `/search?q=${encodeURIComponent(q)}`
              }}
              className="hidden md:flex items-center gap-2 rounded-full border border-border/40 bg-background/50 px-4 py-1.5 backdrop-blur-sm transition-colors focus-within:border-border"
            >
              <SearchIcon className="w-4 h-4 text-foreground/60 shrink-0" />
              <input
                name="q"
                type="text"
                placeholder="Search"
                className="w-28 max-w-40 bg-transparent text-sm font-display text-foreground placeholder:text-muted-foreground outline-none transition-[width] duration-200 focus:w-36"
                aria-label="Cari konten"
              />
            </form>

            {/* Mobile: search icon link */}
            <Link
              href="/search"
              className="md:hidden rounded-md p-2 text-foreground transition-opacity hover:opacity-70"
              aria-label="Pencarian"
            >
              <SearchIcon className="w-5 h-5" />
            </Link>

            <HeaderAdminIcon />

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden rounded-md p-2 text-foreground transition-opacity hover:opacity-70"
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
            'fixed top-0 right-0 bottom-0 z-50 w-72 lg:hidden',
            'flex flex-col pt-16 pb-8 overflow-y-auto',
            'bg-brand-dark/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl',
            'transition-transform duration-300 ease-in-out',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 rounded-md p-2 text-white/70 transition-opacity hover:opacity-100"
            aria-label="Tutup menu"
          >
            <XIcon className="w-5 h-5" />
          </button>

          {/* Logo in drawer */}
          <Link href="/" className="px-6 mb-6" onClick={() => setMobileOpen(false)}>
            <Logo size={32} showText={true} className="text-white" />
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
                    pathname={pathname}
                  />
                )
              }

              const active = linkIsActive(pathname, link?.url)

              return (
                <CMSLink
                  key={i}
                  {...link}
                  className={cn(
                    'block rounded-md px-3 py-2.5 text-sm font-display transition-colors duration-200',
                    active ? 'font-semibold text-white' : 'font-medium text-white/65 hover:text-white',
                  )}
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
            <div className="flex items-center gap-2 bg-white/8 rounded-md px-3 py-2 border border-white/10">
              <SearchIcon className="w-4 h-4 text-white/60 shrink-0" />
              <input
                name="q"
                type="text"
                placeholder="Cari konten..."
                className="bg-transparent text-sm text-white placeholder:text-white/40 outline-none flex-1"
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
  pathname: string
}> = ({ link, dropdownItems, pathname }) => {
  const [open, setOpen] = useState(false)
  const sectionActive = dropdownItems.some((di) => linkIsActive(pathname, di?.link?.url))

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-display transition-colors duration-200',
          sectionActive || open ? 'font-semibold text-white' : 'font-medium text-white/65 hover:text-white',
        )}
      >
        {link?.label || 'Menu'}
        <ChevronDown
          className={cn('size-3.5 shrink-0 opacity-60 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open && (
        <div className="mt-0.5 flex flex-col gap-0.5 pl-3">
          {dropdownItems.map((di, j) => {
            const childActive = linkIsActive(pathname, di?.link?.url)
            return (
              <CMSLink
                key={j}
                {...di.link}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-display transition-colors duration-200',
                  childActive ? 'font-semibold text-white' : 'font-medium text-white/55 hover:text-white',
                )}
                appearance="link"
              />
            )
          })}
        </div>
      )}
    </div>
  )
}