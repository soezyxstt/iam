'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import type { JobVacancy, Media } from '@/payload-types'
import RichText from '@/components/RichText'
import { Heading, Text, Eyebrow } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { EmptyState } from '@/components/ui/empty-state'
import {
  Briefcase,
  MapPin,
  Clock,
  ExternalLink,
  X,
  Building,
  GraduationCap,
  AlertCircle,
  Users,
  Bookmark,
  Share2,
  MoreVertical
} from 'lucide-react'

// Custom WhatsApp SVG Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.019-5.101-2.871-6.956C16.6 1.93 14.135.912 11.514.912c-5.441 0-9.865 4.42-9.869 9.865-.001 1.718.455 3.394 1.32 4.887L1.935 21.84l6.312-1.657L6.647 19.15zM17.17 14.37c-.3-.15-1.782-.88-2.057-.98-.275-.1-.475-.15-.675.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.65.075-.3-.15-1.263-.465-2.408-1.485-.89-.795-1.492-1.776-1.667-2.076-.175-.3-.02-.46.13-.61.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.48-.58-.66-.59-.17-.01-.37-.01-.57-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.52.714.31 1.272.495 1.707.633.715.227 1.365.195 1.88.118.574-.085 1.782-.73 2.032-1.43.25-.7.25-1.3 0-1.425-.075-.125-.275-.2-.575-.35z"/>
  </svg>
)

interface LowonganPageClientProps {
  initialDocs: JobVacancy[]
}

const EMPLOYMENT_LABELS: Record<string, string> = {
  kp: 'Kerja Praktik (KP)',
  magang: 'Magang (Internship)',
  full_time: 'Full Time',
  part_time: 'Part Time',
  kontrak: 'Kontrak/Temporer',
}

const WORK_SETUP_LABELS: Record<string, string> = {
  on_site: 'On-site',
  hybrid: 'Hybrid',
  remote: 'Remote',
}

const EXPERIENCE_LABELS: Record<string, string> = {
  entry: 'Entry Level (Fresh Graduate)',
  mid: 'Mid Level (1-3 Tahun)',
  senior: 'Senior Level (3-5+ Tahun)',
  executive: 'Executive/Managerial',
}

export function LowonganPageClient({ initialDocs }: LowonganPageClientProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [hiddenJobs, setHiddenJobs] = useState<number[]>([])
  const [stickyHeaderVisible, setStickyHeaderVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Set mounted on client to enable portals safely
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('iam_saved_jobs')
      if (saved) {
        setSavedJobs(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Error loading saved jobs:', e)
    }
  }, [])

  // Load hidden jobs from localStorage on mount
  useEffect(() => {
    try {
      const hidden = localStorage.getItem('iam_hidden_jobs')
      if (hidden) {
        setHiddenJobs(JSON.parse(hidden))
      }
    } catch (e) {
      console.error('Error loading hidden jobs:', e)
    }
  }, [])

  // Toggle saving a job
  const toggleSaveJob = (id: number) => {
    try {
      const updated = savedJobs.includes(id)
        ? savedJobs.filter((savedId) => savedId !== id)
        : [...savedJobs, id]
      setSavedJobs(updated)
      localStorage.setItem('iam_saved_jobs', JSON.stringify(updated))
    } catch (e) {
      console.error('Error toggling save job:', e)
    }
  }

  // Hide a job
  const hideJob = (id: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent opening drawer
    try {
      const updated = [...hiddenJobs, id]
      setHiddenJobs(updated)
      localStorage.setItem('iam_hidden_jobs', JSON.stringify(updated))
      if (selectedId === id) {
        handleCloseDrawer()
      }
    } catch (e) {
      console.error('Error hiding job:', e)
    }
  }

  // Clear hidden jobs
  const clearHiddenJobs = () => {
    try {
      setHiddenJobs([])
      localStorage.removeItem('iam_hidden_jobs')
    } catch (e) {
      console.error('Error clearing hidden jobs:', e)
    }
  }

  // Find currently active vacancy details
  const activeJob = useMemo(() => {
    return initialDocs.find((j) => j.id === selectedId) || null
  }, [initialDocs, selectedId])

  // Filter out hidden jobs
  const visibleJobs = useMemo(() => {
    return initialDocs.filter((job) => !hiddenJobs.includes(job.id))
  }, [initialDocs, hiddenJobs])

  // Sync selected query parameter on mount/data update
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const selectedParam = params.get('selected')
    if (selectedParam) {
      const found = initialDocs.find(
        (d) => d.slug === selectedParam || String(d.id) === selectedParam
      )
      if (found) {
        setSelectedId(found.id)
        setIsDrawerOpen(true)
        return
      }
    }
  }, [initialDocs])

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseDrawer()
      }
    }
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDrawerOpen])

  const handleSelectJob = (job: JobVacancy) => {
    setSelectedId(job.id)
    setIsDrawerOpen(true)
    setStickyHeaderVisible(false) // Reset sticky header state when opening new drawer
    
    // Update the URL parameter shallowly without reloading the server components
    const url = new URL(window.location.href)
    url.searchParams.set('selected', job.slug || String(job.id))
    window.history.pushState(null, '', url.toString())
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setStickyHeaderVisible(false)
    
    // Remove query parameter shallowly
    const url = new URL(window.location.href)
    url.searchParams.delete('selected')
    window.history.pushState(null, '', url.toString())
  }

  const formatDate = (dateStr?: string | null): string => {
    if (!dateStr) return 'Baru saja'
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return 'Baru saja'
    }
  }

  // Check if job is new (less than 7 days ago)
  const isJobNew = (createdAt?: string | null): boolean => {
    if (!createdAt) return false
    try {
      const createdDate = new Date(createdAt)
      const diffTime = Math.abs(new Date().getTime() - createdDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 7
    } catch {
      return false
    }
  }

  // Get relative time (e.g. "2 hari yang lalu")
  const getRelativeTime = (dateStr?: string | null): string => {
    if (!dateStr) return 'Baru saja'
    try {
      const date = new Date(dateStr)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - date.getTime())
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 0) {
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
        if (diffHours === 0) {
          const diffMinutes = Math.floor(diffTime / (1000 * 60))
          return diffMinutes <= 1 ? 'Baru saja' : `${diffMinutes} menit yang lalu`
        }
        return `${diffHours} jam yang lalu`
      }
      if (diffDays === 1) return 'Kemarin'
      return `${diffDays} hari yang lalu`
    } catch {
      return 'Baru saja'
    }
  }

  // Construct WA Pre-coded greeting URL
  const getWhatsAppApplyUrl = (job: JobVacancy) => {
    const waNumber = job.contactWhatsApp || '628123456789' // Admin/Fallback number
    const typeText = job.employmentType === 'kp' 
      ? 'Kerja Praktik (KP)' 
      : job.employmentType === 'magang' 
        ? 'Magang (Internship)' 
        : 'Kerja Full Time'
        
    const greetingText = `Halo, saya berminat untuk apply ${typeText} sebagai ${job.position} di ${job.companyName} dari info di laman IAM ITB. Apakah lowongan ini masih tersedia?`
    
    // Remove non-digit characters except +
    const cleanNumber = waNumber.replace(/[^0-9]/g, '')
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(greetingText)}`
  }

  // Render detail pane content
  const renderDetailContent = (job: JobVacancy) => {
    const companyLogo = job.companyLogo as Media | null
    const coverImage = job.coverImage as Media | null
    const hasOfficialLink = job.officialLink && job.officialLink.trim().length > 0
    const applyHref = hasOfficialLink 
      ? (job.officialLink!.startsWith('http') ? job.officialLink! : `https://${job.officialLink!}`)
      : getWhatsAppApplyUrl(job)
    const isSaved = savedJobs.includes(job.id)

    return (
      <div className="flex flex-col h-full bg-white text-brand-dark select-text relative">
        
        {/* Sticky Header (appears on scroll) */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 z-40 bg-white border-b border-brand-dark/10 px-6 py-4 flex items-center justify-between transition-all duration-300 select-none shadow-sm",
            stickyHeaderVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
          <div className="min-w-0 pr-4">
            <h4 className="font-serif font-bold text-sm md:text-base text-brand-dark truncate leading-tight">
              {job.position}
            </h4>
            <p className="font-sans text-xs text-brand-dark/60 truncate mt-0.5">
              {job.companyName}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {job.vacancyStatus !== 'closed' && (
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="rounded-xl bg-brand-red hover:bg-brand-red/90 text-white font-sans text-xs font-bold py-2 px-4 h-9 shadow-sm shrink-0 scale-95"
              >
                <a href={applyHref} target="_blank" rel="noopener noreferrer">
                  Lamaran Cepat
                </a>
              </Button>
            )}
            
            <Button
              onClick={() => toggleSaveJob(job.id)}
              variant="outline"
              size="sm"
              className={cn(
                "rounded-xl border-brand-primary/20 text-brand-primary font-sans text-xs font-semibold py-2 px-4 h-9 shrink-0 scale-95",
                isSaved && "border-brand-primary bg-brand-primary/5"
              )}
            >
              <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
            </Button>

            <button
              onClick={handleCloseDrawer}
              className="p-1.5 rounded-full hover:bg-brand-dark/5 text-brand-dark/60 hover:text-brand-dark transition-all cursor-pointer"
              aria-label="Tutup"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Cover & Logo block */}
        <div className="relative shrink-0 select-none">
          {/* Cover Block with overflow-hidden to crop the banner shape */}
          <div className="relative h-44 overflow-hidden bg-brand-dark">
            {coverImage && coverImage.url ? (
              <Image
                src={coverImage.url}
                alt={job.position}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary border-b border-brand-primary/10" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
              </>
            )}
          </div>
          
          {/* Back/Close button in upper-right corner of sheet */}
          <button
            onClick={handleCloseDrawer}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer shadow-md hover:scale-105"
            aria-label="Tutup detail lowongan"
          >
            <X className="size-4" />
          </button>

          {/* Logo container overlapping the bottom edge of the banner, placed outside the overflow-hidden wrapper to avoid cutoff */}
          <div className="absolute -bottom-8 left-6 z-20 size-20 rounded-2xl bg-white p-1 flex items-center justify-center border border-brand-primary/10 shadow-lg shadow-black/20 overflow-hidden">
            {companyLogo && companyLogo.url ? (
              <Image
                src={companyLogo.url}
                alt={job.companyName}
                width={80}
                height={80}
                className="max-h-full max-w-full object-contain rounded-xl"
                unoptimized
              />
            ) : (
              <div className="w-full h-full rounded-xl bg-gradient-to-tr from-brand-dark via-brand-primary to-brand-dark flex items-center justify-center">
                <span aria-hidden="true" className="text-3xl text-brand-gold font-bold font-serif">
                  {job.companyName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div
          onScroll={(e) => {
            const scrollTop = e.currentTarget.scrollTop
            setStickyHeaderVisible(scrollTop > 150)
          }}
          className="flex-1 overflow-y-auto p-6 pt-12 space-y-6 scrollbar-thin scrollbar-thumb-brand-primary/15"
        >
          
          {/* Header Metadata Section */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-dark/10 pb-6">
            <div className="space-y-4 flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-sans text-xs font-bold text-brand-primary uppercase tracking-wider">
                    {job.companyName}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-full">
                    ✓ Terverifikasi
                  </span>
                </div>
              </div>

              <div>
                <Heading level={3} tone="default" className="text-2xl md:text-3xl font-bold leading-snug font-serif text-brand-dark">
                  {job.position}
                </Heading>
                {job.category && (
                  <p className="font-sans text-sm text-brand-dark/65 font-medium mt-1">
                    {job.category}
                  </p>
                )}
                <div className="mt-2">
                  <a
                    href={`/lowongan-kerja?q=${encodeURIComponent(job.companyName)}`}
                    className="font-sans text-xs font-bold text-brand-light hover:underline"
                  >
                    Lihat semua lowongan kerja di {job.companyName}
                  </a>
                </div>
              </div>
            </div>

            {/* Share & Options action buttons */}
            <div className="flex items-center gap-2 shrink-0 self-start pt-1">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${job.position} di ${job.companyName}`,
                      url: window.location.href,
                    }).catch(console.error)
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert("Tautan lowongan telah disalin ke papan klip!")
                  }
                }}
                className="p-2 rounded-full border border-brand-dark/10 hover:bg-brand-dark/5 text-brand-dark/70 hover:text-brand-dark transition-all cursor-pointer shadow-sm"
                title="Bagikan Lowongan"
                aria-label="Bagikan lowongan"
              >
                <Share2 className="size-4" />
              </button>
              <button
                className="p-2 rounded-full border border-brand-dark/10 hover:bg-brand-dark/5 text-brand-dark/70 hover:text-brand-dark transition-all cursor-pointer shadow-sm"
                title="Opsi Lainnya"
                aria-label="Opsi lainnya"
              >
                <MoreVertical className="size-4" />
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-row items-stretch gap-3 pt-2">
            {job.vacancyStatus === 'closed' ? (
              <div className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center text-red-700">
                <AlertCircle className="size-4 shrink-0" />
                <span className="text-xs font-semibold font-sans">Penerimaan lowongan ini telah ditutup</span>
              </div>
            ) : (
              <>
                <Button
                  asChild
                  className={cn(
                    "flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 rounded-xl transition-all duration-300 h-12 cursor-pointer bg-brand-red hover:bg-brand-red/90 text-white hover:shadow-md hover:scale-102"
                  )}
                >
                  <a href={applyHref} target="_blank" rel="noopener noreferrer">
                    {hasOfficialLink ? (
                      <>
                        Lamar Sekarang <ExternalLink className="size-4" />
                      </>
                    ) : (
                      <>
                        Lamar Lewat WhatsApp <WhatsAppIcon className="size-4 fill-white shrink-0" />
                      </>
                    )}
                  </a>
                </Button>

                <Button
                  onClick={() => toggleSaveJob(job.id)}
                  variant="outline"
                  className={cn(
                    "py-4 px-5 text-sm font-bold flex items-center justify-center gap-2 rounded-xl transition-all duration-300 border-brand-primary/25 hover:border-brand-primary text-brand-primary hover:bg-brand-primary/5 h-12 cursor-pointer",
                    isSaved && "border-brand-primary text-brand-primary bg-brand-primary/5"
                  )}
                >
                  <Bookmark className={cn("size-4 shrink-0", isSaved && "fill-brand-primary text-brand-primary")} />
                  <span className="font-sans">{isSaved ? 'Tersimpan' : 'Simpan'}</span>
                </Button>
              </>
            )}
          </div>

          {/* Structured Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 pb-6 border-b border-brand-dark/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                <MapPin className="size-4 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-brand-dark/50 uppercase font-semibold font-sans">Lokasi</p>
                <p className="text-xs text-brand-dark font-medium font-sans">{job.location || 'Tidak spesifik'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                <Briefcase className="size-4 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-brand-dark/50 uppercase font-semibold font-sans">Tipe Pekerjaan</p>
                <p className="text-xs text-brand-dark font-medium font-sans">{EMPLOYMENT_LABELS[job.employmentType] || job.employmentType}</p>
              </div>
            </div>

            {job.workSetup && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                  <Building className="size-4 shrink-0" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-dark/50 uppercase font-semibold font-sans">Sistem Kerja</p>
                  <p className="text-xs text-brand-dark font-medium font-sans">{WORK_SETUP_LABELS[job.workSetup] || job.workSetup}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                <Clock className="size-4 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-brand-dark/50 uppercase font-semibold font-sans">Status Penerimaan</p>
                <span className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mt-0.5 font-sans",
                  job.vacancyStatus === 'open' 
                    ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20' 
                    : 'bg-red-500/10 text-red-700 border border-red-500/20'
                )}>
                  {job.vacancyStatus === 'open' ? 'Buka' : 'Tutup'}
                </span>
              </div>
            </div>

            {job.quota && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                  <Users className="size-4 shrink-0" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-dark/50 uppercase font-semibold font-sans">Kuota Penerimaan</p>
                  <p className="text-xs text-brand-dark font-medium font-sans">{job.quota} Orang</p>
                </div>
              </div>
            )}

            {job.experienceLevel && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                  <GraduationCap className="size-4 shrink-0" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-dark/50 uppercase font-semibold font-sans">Tingkat Pengalaman</p>
                  <p className="text-xs text-brand-dark font-medium font-sans">{EXPERIENCE_LABELS[job.experienceLevel] || job.experienceLevel}</p>
                </div>
              </div>
            )}

            {job.salaryRange && (
              <div className="flex items-center gap-3 sm:col-span-2 border-t border-brand-dark/10 pt-3 mt-1">
                <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary font-bold text-xs shrink-0 flex items-center justify-center size-8 font-sans">
                  IDR
                </div>
                <div>
                  <p className="text-[10px] text-brand-dark/50 uppercase font-semibold font-sans">Rentang Gaji</p>
                  <p className="text-xs text-brand-primary font-semibold font-sans">{job.salaryRange}</p>
                </div>
              </div>
            )}
          </div>

          {/* Details sections */}
          <div className="space-y-6 pt-2 text-brand-dark">
            
            {/* Job Description */}
            {job.jobDescription && (
              <div className="space-y-2">
                <h4 className="text-sm md:text-base font-bold text-brand-dark font-sans tracking-wide">
                  Deskripsi Pekerjaan:
                </h4>
                <RichText 
                  data={job.jobDescription} 
                  enableGutter={false} 
                  enableProse={false} 
                  className="job-details-richtext text-[14px]"
                />
              </div>
            )}

            {job.jobDescription && job.requirements && <hr className="border-brand-dark/10" />}

            {/* Requirements */}
            {job.requirements && (
              <div className="space-y-2">
                <h4 className="text-sm md:text-base font-bold text-brand-dark font-sans tracking-wide">
                  Persyaratan:
                </h4>
                <RichText 
                  data={job.requirements} 
                  enableGutter={false} 
                  enableProse={false} 
                  className="job-details-richtext text-[14px]"
                />
              </div>
            )}

            {((job.jobDescription || job.requirements) && job.benefits) && <hr className="border-brand-dark/10" />}

            {/* Benefits */}
            {job.benefits && (
              <div className="space-y-2">
                <h4 className="text-sm md:text-base font-bold text-brand-dark font-sans tracking-wide">
                  Manfaat & Keuntungan:
                </h4>
                <RichText 
                  data={job.benefits} 
                  enableGutter={false} 
                  enableProse={false} 
                  className="job-details-richtext text-[14px]"
                />
              </div>
            )}

            {/* Screening Questions (Pertanyaan dari Perusahaan) */}
            {job.screeningQuestions && job.screeningQuestions.length > 0 && (
              <>
                {((job.jobDescription || job.requirements || job.benefits)) && <hr className="border-brand-dark/10" />}
                <div className="space-y-3">
                  <h4 className="text-sm md:text-base font-bold text-brand-dark font-sans tracking-wide">
                    Pertanyaan dari Perusahaan:
                  </h4>
                  <p className="text-xs text-brand-dark/65 font-sans leading-relaxed">
                    Lamaran Anda akan mencakup pertanyaan-pertanyaan berikut:
                  </p>
                  <ul className="list-disc list-inside text-sm text-brand-dark/80 space-y-1.5 pl-1 font-sans">
                    {job.screeningQuestions.map((sq, idx) => (
                      <li key={sq.id || idx} className="leading-relaxed">
                        <span className="ml-1">{sq.question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between pt-6 border-t border-brand-dark/10 text-[11px] text-brand-dark/40 font-sans">
            <span>Diperbarui pada: {formatDate(job.updatedAt)}</span>
            <span>ID Lowongan: {job.id}</span>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      
      {/* ── JOB CARD GRID ── */}
      {visibleJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6">
          <EmptyState
            tone="onDark"
            title={initialDocs.length === 0 ? "Belum ada lowongan kerja yang ditemukan" : "Semua lowongan disembunyikan"}
            description={initialDocs.length === 0 
              ? "Silakan coba bersihkan filter pencarian untuk melihat semua data."
              : "Anda dapat memulihkan kembali semua lowongan yang sebelumnya disembunyikan."
            }
          />
          {hiddenJobs.length > 0 && (
            <Button
              onClick={clearHiddenJobs}
              variant="secondary"
              size="sm"
              className="mt-6 rounded-full"
            >
              Tampilkan Kembali Lowongan
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visibleJobs.map((job) => {
            const companyLogo = job.companyLogo as Media | null
            const isSelected = job.id === selectedId
            const isSaved = savedJobs.includes(job.id)
            const isNew = isJobNew(job.createdAt)

            return (
              <div
                key={job.id}
                onClick={() => handleSelectJob(job)}
                className={cn(
                  "berita-item-card group relative flex flex-col md:flex-row justify-between p-6 overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500 cursor-pointer select-none gap-6 min-h-[190px]",
                  isSelected
                    ? "border-brand-gold bg-brand-primary/30 shadow-2xl shadow-brand-gold/10"
                    : "border-white/10 bg-white/4 shadow-xl shadow-black/25 hover:border-brand-gold/25 hover:shadow-2xl hover:shadow-black/35"
                )}
              >
                {/* Left/Middle Content */}
                <div className="flex-1 flex flex-col justify-between space-y-3 min-w-0">
                  <div className="space-y-1.5 min-w-0">
                    {/* Position & Company */}
                    <div className="space-y-1 min-w-0">
                      <Heading
                        level={3}
                        tone={isSelected ? 'accent' : 'inverse'}
                        className="text-base md:text-lg font-bold leading-snug group-hover:text-brand-gold transition-colors duration-300 line-clamp-1"
                      >
                        {job.position}
                      </Heading>
                      <Text variant="small" tone="inverse" className="font-semibold text-white block m-0 truncate">
                        {job.companyName}
                      </Text>
                    </div>

                    {/* Badge: Baru untuk kamu */}
                    {isNew && (
                      <div className="inline-block pt-0.5">
                        <span className="inline-flex items-center bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-md px-2 py-0.5 text-[10px] font-bold font-sans">
                          Baru untuk kamu
                        </span>
                      </div>
                    )}

                    {/* Employment Type & Location */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-brand-khaki/90 font-medium pt-1 font-sans">
                      <span>{EMPLOYMENT_LABELS[job.employmentType] || job.employmentType}</span>
                      {job.location && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-white/30" />
                          <span className="truncate max-w-[120px]">{job.location}</span>
                        </>
                      )}
                      {job.workSetup && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-white/30" />
                          <span>{WORK_SETUP_LABELS[job.workSetup]}</span>
                        </>
                      )}
                    </div>

                    {/* Bullet Points of Key Benefits */}
                    {job.keyBenefits && job.keyBenefits.length > 0 && (
                      <ul className="list-disc list-inside text-xs text-white/95 space-y-0.5 pt-2 pl-1 font-sans">
                        {job.keyBenefits.slice(0, 3).map((kb, idx) => (
                          <li key={kb.id || idx} className="truncate">
                            <span className="ml-1">{kb.benefit}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Relative posted time (High Contrast) */}
                  <div className="text-[11px] text-white/80 font-medium font-sans pt-1">
                    {getRelativeTime(job.createdAt)}
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex flex-row md:flex-col justify-between items-end shrink-0 gap-4">
                  {/* Company Logo Box */}
                  <div className="size-16 rounded-xl bg-white p-1 flex items-center justify-center overflow-hidden border border-white/10 shadow-inner shrink-0">
                    {companyLogo && companyLogo.url ? (
                      <Image
                        src={companyLogo.url}
                        alt={job.companyName}
                        width={60}
                        height={60}
                        className="max-h-full max-w-full object-contain rounded-lg"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full rounded-lg bg-gradient-to-tr from-brand-dark via-brand-primary to-brand-dark flex items-center justify-center">
                        <span aria-hidden="true" className="text-2xl text-brand-gold font-bold font-serif">
                          {job.companyName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 mt-auto">
                    {/* Bookmark/Save button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSaveJob(job.id)
                      }}
                      className={cn(
                        "p-2 rounded-lg border transition-all duration-300 hover:scale-105 cursor-pointer",
                        isSaved
                          ? "border-brand-gold text-brand-gold bg-brand-gold/20"
                          : "border-white/20 text-white/80 hover:text-white hover:border-white/40 bg-white/10"
                      )}
                      title={isSaved ? "Hapus Simpan" : "Simpan Lowongan"}
                      aria-label="Simpan lowongan"
                    >
                      <Bookmark className={cn("size-4", isSaved && "fill-brand-gold")} />
                    </button>

                    {/* Sembunyikan Button */}
                    <button
                      onClick={(e) => hideJob(job.id, e)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white/40 bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer text-xs font-sans font-medium"
                      title="Sembunyikan Lowongan"
                      aria-label="Sembunyikan lowongan"
                    >
                      <X className="size-3.5" />
                      <span>Sembunyikan</span>
                    </button>
                  </div>
                </div>

                {/* Bottom accent sweep on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-brand-gold via-brand-gold/70 to-brand-red transition-all duration-500 group-hover:w-full" />
              </div>
            )
          })}
        </div>
      )}

      {/* ── DETAILS SIDE SHEET / DRAWER ── */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop overlay */}
          <div
            onClick={handleCloseDrawer}
            className={cn(
              "fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out cursor-pointer",
              isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          />

          {/* Slide-over sheet panel (75% of the VW on desktop, 100% on mobile) */}
          <div
            className={cn(
              "fixed inset-y-0 right-0 z-[100] w-full md:w-[75vw] max-w-full md:max-w-[75vw] bg-white border-l border-brand-primary/10 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            {activeJob ? (
              renderDetailContent(activeJob)
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 bg-white text-brand-dark select-none">
                <Briefcase className="size-10 text-brand-primary/20 animate-pulse" />
                <p className="text-brand-dark/40 text-sm font-medium">Pilih lowongan untuk melihat detail informasi.</p>
              </div>
            )}
          </div>
        </>,
        document.body
      )}
    </div>
  )
}
