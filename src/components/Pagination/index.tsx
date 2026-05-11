'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

export type PaginationQueryLink = {
  pathname: string
  /** Passed through to URLSearchParams; `page` is set/overridden by this component when navigating */
  searchParams?: Record<string, string | undefined>
}

function navigateToBeritaPage(
  router: ReturnType<typeof useRouter>,
  targetPage: number,
  queryLink?: PaginationQueryLink,
) {
  if (queryLink) {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(queryLink.searchParams ?? {})) {
      if (value) params.set(key, value)
    }
    if (targetPage > 1) {
      params.set('page', String(targetPage))
    } else {
      params.delete('page')
    }
    const qs = params.toString()
    const href = qs ? `${queryLink.pathname}?${qs}` : queryLink.pathname
    // Query-style lists (e.g. `/usaha-alumni`) live mid-page; avoid jump-to-top on page change.
    router.push(href, { scroll: false })
    return
  }
  router.push(`/berita/page/${targetPage}`)
}

const onDarkToneClass =
  'rounded-2xl border border-white/12 bg-black/25 px-2 py-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] backdrop-blur-md md:px-3 md:py-2.5 [&_nav]:w-full [&_ul]:flex-wrap [&_ul]:justify-center [&_ul]:gap-1.5 [&_ul]:md:gap-2 [&_li]:list-none [&_button]:min-h-10 [&_button]:min-w-10 [&_button]:w-auto [&_button]:rounded-xl [&_button]:border [&_button]:border-white/18 [&_button]:bg-white/[0.07] [&_button]:px-3.5 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white [&_button]:shadow-none [&_button]:transition-colors [&_button:hover]:border-white/28 [&_button:hover]:bg-white/15 [&_button:hover]:text-white [&_button:focus-visible]:ring-2 [&_button:focus-visible]:ring-brand-gold/50 [&_button:focus-visible]:ring-offset-0 [&_button:disabled]:opacity-30 [&_button[aria-current=page]]:border-brand-gold/60 [&_button[aria-current=page]]:bg-brand-gold [&_button[aria-current=page]]:text-brand-dark [&_button[aria-current=page]]:hover:bg-brand-gold/90 [&_button[aria-current=page]]:hover:text-brand-dark [&_nav_span[aria-hidden=true]]:text-white/45 [&_nav_span[aria-hidden=true]_svg]:text-white/50'

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
  /** When set, use query-based URLs on `pathname` instead of `/posts/page/n` */
  queryLink?: PaginationQueryLink
  /** Pale contrast for dark panels (e.g. `/usaha-alumni`); default matches light pages */
  tone?: 'default' | 'onDark'
  /**
   * After query-string navigation, smoothly scroll this element into view (e.g. list container id).
   * Use with `queryLink` so users stay on the directory block instead of the page hero.
   */
  scrollAlignId?: string
}> = (props) => {
  const router = useRouter()
  const alignListAfterNavRef = useRef(false)

  const { className, page, totalPages, queryLink, tone = 'default', scrollAlignId } = props

  useEffect(() => {
    if (!scrollAlignId || !alignListAfterNavRef.current) return
    alignListAfterNavRef.current = false
    const el = document.getElementById(scrollAlignId)
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [page, scrollAlignId])

  const goToPage = (targetPage: number) => {
    if (targetPage === page) return
    if (queryLink && scrollAlignId) alignListAfterNavRef.current = true
    navigateToBeritaPage(router, targetPage, queryLink)
  }
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  return (
    <div className={cn('my-12', tone === 'onDark' && onDarkToneClass, className)}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrevPage}
              onClick={() => {
                goToPage(page - 1)
              }}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  goToPage(page - 1)
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => {
                goToPage(page)
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  goToPage(page + 1)
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!hasNextPage}
              onClick={() => {
                goToPage(page + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
