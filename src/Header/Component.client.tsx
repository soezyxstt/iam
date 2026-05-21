'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import { SearchIcon, MenuIcon, XIcon, ChevronDown, User as UserIcon, LogOut, Shield } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { getClientSideURL } from '@/utilities/getURL'

import type { Header, Page, Post } from '@/payload-types'
import { defaultHeaderNavItems } from '@/config/defaultNav'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav, linkIsActive } from './Nav'
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

  // Auth states
  const [user, setUser] = useState<{ id: string; email: string; name?: string | null } | null | undefined>(undefined)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)

  // Reset states on route change
  useEffect(() => {
    setHeaderTheme(null)
    setMobileOpen(false)
    setProfileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Fetch logged in user
  useEffect(() => {
    let cancelled = false
    void fetch(`${getClientSideURL()}/api/users/me`, { credentials: 'include' })
      .then((r) => {
        if (r.ok) return r.json()
        throw new Error('Not authenticated')
      })
      .then((data: { user?: { id: string; email: string; name?: string | null } | null }) => {
        if (!cancelled) setUser(data?.user ?? null)
      })
      .catch(() => {
        if (!cancelled) setUser(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch(`${getClientSideURL()}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (err) {
      console.error('Logout failed:', err)
    }
    setUser(null)
    setProfileOpen(false)
    window.location.reload()
  }

  // Smart Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Handle background glass effect (scrolled past 20px)
      setScrolled(currentScrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
  const activeTheme = scrolled ? 'dark' : (headerTheme || 'light')

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 z-50 transition-all duration-300 ease-in-out translate-y-0',
          scrolled 
            ? 'top-0 md:top-4 px-0 md:px-8' 
            : 'top-0 px-0 md:px-0'
        )}
        {...(activeTheme ? { 'data-theme': activeTheme } : {})}
      >
        <div className={cn(
          'w-full flex items-center justify-between gap-4 transition-all duration-300 relative mx-auto',
          scrolled ? (
            'max-w-6xl bg-background/85 backdrop-blur-xl border-b border-border/40 md:border md:border-white/12 md:rounded-full px-4 md:px-6 py-2.5 shadow-md shadow-black/10 md:bg-background/95'
          ) : (
            'max-w-6xl bg-transparent border-b border-transparent md:border md:border-transparent md:rounded-none px-4 md:px-6 py-3 shadow-none'
          )
        )}>

          {/* Shimmer highlight line — mirrors GlassCard top-edge treatment */}
          <div className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent transition-opacity duration-300',
            scrolled ? 'opacity-100' : 'opacity-0'
          )} />
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="IAM ITB – Beranda">
            <Logo size={36} showText className="text-foreground" />
          </Link>

          {/* Desktop Nav – centered */}
          <div className="flex-1 flex justify-center">
            <HeaderNav data={headerDataForNav} scrolled={scrolled} />
          </div>

          {/* Right: Search icon, then Login button / Profile Avatar */}
          <div className="flex min-w-0 items-center gap-2">
            {/* Search icon button – desktop & mobile */}
            <Link
              href="/search"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/8 hover:text-foreground"
              aria-label="Pencarian"
            >
              <SearchIcon className="w-5 h-5" />
            </Link>

            {/* Profile Avatar / Login Button */}
            {user === undefined ? (
              // Loading skeleton
              <div className="hidden md:inline-flex h-8 w-16 animate-pulse rounded-full bg-foreground/10" />
            ) : user ? (
              // Authenticated user avatar with dropdown
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                  aria-label="Menu profil"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=06162F&color=F0D637&size=100&bold=true`}
                    alt={user.name || 'User'}
                    className="h-9 w-9 rounded-full ring-2 ring-brand-gold ring-offset-2 ring-offset-background object-cover"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2.5 w-60 rounded-xl border border-white/10 bg-brand-dark/95 backdrop-blur-xl p-2.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Shimmer top line */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    
                    {/* User Info */}
                    <div className="px-3 py-2 flex flex-col gap-0.5 select-none">
                      <span className="text-sm font-semibold font-display text-white line-clamp-1">
                        {user.name || 'Pengguna'}
                      </span>
                      <span className="text-xs text-white/55 line-clamp-1">
                        {user.email}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/10 my-2" />

                    {/* Links */}
                    <div className="flex flex-col gap-0.5">
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/8 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Shield className="w-4 h-4 text-brand-gold" />
                        Buka Panel Admin
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Login button
              <Link
                href="/admin"
                className="hidden md:inline-flex items-center justify-center rounded-full bg-brand-gold px-5 py-1.5 text-sm font-semibold font-display text-brand-dark transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                aria-label="Masuk ke panel admin"
              >
                Login
              </Link>
            )}

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
                    active ? 'font-bold text-brand-gold bg-brand-gold/10' : 'font-medium text-white/65 hover:text-white',
                  )}
                  appearance="inline"
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
          sectionActive || open ? 'font-bold text-brand-gold' : 'font-medium text-white/65 hover:text-white',
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
                  childActive ? 'font-bold text-brand-gold bg-brand-gold/10' : 'font-medium text-white/55 hover:text-white',
                )}
                appearance="inline"
              />
            )
          })}
        </div>
      )}
    </div>
  )
}