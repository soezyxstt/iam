'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect, Suspense } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon, XIcon } from 'lucide-react'

const SearchInput: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [value, setValue] = useState(initialQuery)
  const debouncedValue = useDebounce(value)

  // Update input value if search param changes externally (e.g. from header search or back button)
  useEffect(() => {
    setValue(searchParams.get('q') || '')
  }, [searchParams])

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search)
    if (debouncedValue) {
      currentParams.set('q', debouncedValue)
    } else {
      currentParams.delete('q')
    }
    router.push(`/search?${currentParams.toString()}`)
  }, [debouncedValue, router])

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="relative flex w-full items-center"
      >
        <Label htmlFor="search" className="sr-only">
          Cari
        </Label>
        <div className="relative w-full">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
          <Input
            id="search"
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
            }}
            placeholder="Cari berita, lowongan, usaha alumni, kegiatan..."
            className="w-full pl-12 pr-10 py-6 bg-white/5 border-white/10 text-white placeholder-white/45 rounded-full focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all duration-300 shadow-inner"
          />
          {value && (
            <button
              type="button"
              onClick={() => setValue('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              aria-label="Bersihkan pencarian"
            >
              <XIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <button type="submit" className="sr-only">
          kirim
        </button>
      </form>
    </div>
  )
}

export const Search: React.FC = () => {
  return (
    <Suspense fallback={<div className="h-12 w-full animate-pulse rounded-full bg-white/5 border border-white/10" />}>
      <SearchInput />
    </Suspense>
  )
}
