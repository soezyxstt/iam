'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import type { JobVacancy, Media } from '@/payload-types'
import RichText from '@/components/RichText'
import { Heading } from '@/components/ui/typography'
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
  Bookmark
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

  // Find currently active vacancy details
  const activeJob = useMemo(() => {
    return initialDocs.find((j) => j.id === selectedId) || null
  }, [initialDocs, selectedId])

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
    
    // Update the URL parameter shallowly without reloading the server components
    const url = new URL(window.location.href)
    url.searchParams.set('selected', job.slug || String(job.id))
    window.history.pushState(null, '', url.toString())
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    
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
    const hasOfficialLink = job.officialLink && job.officialLink.trim().length > 0
    const applyHref = hasOfficialLink 
      ? (job.officialLink!.startsWith('http') ? job.officialLink! : `https://${job.officialLink!}`)
      : getWhatsAppApplyUrl(job)
    const isSaved = savedJobs.includes(job.id)

    return (
      <div className="flex flex-col h-full bg-white text-brand-dark select-text">
        {/* Banner Block with geometric design */}
        <div className="relative h-44 shrink-0 bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary border-b border-brand-primary/10 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
          
          {/* Back/Close button in upper-right corner of sheet */}
          <button
            onClick={handleCloseDrawer}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer shadow-md hover:scale-105"
            aria-label="Tutup detail lowongan"
          >
            <X className="size-4" />
          </button>

          {/* Logo container overlapping the bottom edge of the banner */}
          <div className="absolute -bottom-8 left-6 z-20 size-20 rounded-2xl bg-white p-2.5 flex items-center justify-center border border-brand-primary/10 shadow-lg shadow-black/30 overflow-hidden">
            {companyLogo && companyLogo.url ? (
              <Image
                src={companyLogo.url}
                alt={job.companyName}
                width={80}
                height={80}
                className="max-h-full max-w-full object-contain"
                unoptimized
              />
            ) : (
              <span aria-hidden="true" className="text-3xl text-brand-primary font-bold">
                {job.companyName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-6 pt-12 space-y-6 scrollbar-thin scrollbar-thumb-brand-primary/15">
          
          {/* Header Metadata Section */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-sans text-xs font-bold text-brand-primary uppercase tracking-wider">
                {job.companyName}
              </span>
              
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-full">
                  ✓ Terverifikasi
                </span>
                <span className="text-[11px] text-brand-dark/50 flex items-center gap-1">
                  ★ 4.8 (Alumni Recommended)
                </span>
              </div>
            </div>

            <div>
              <Heading level={3} tone="default" className="text-2xl md:text-3xl font-bold leading-snug font-serif text-brand-dark">
                {job.position}
              </Heading>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-row items-stretch gap-3 pt-2">
            {job.vacancyStatus === 'closed' ? (
              <div className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center text-red-700">
                <AlertCircle className="size-4 shrink-0" />
                <span className="text-xs font-semibold">Penerimaan lowongan ini telah ditutup</span>
              </div>
            ) : (
              <>
                <Button
                  asChild
                  variant={hasOfficialLink ? 'secondary' : 'default'}
                  className={cn(
                    "flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 rounded-xl transition-all duration-300 h-12 cursor-pointer",
                    !hasOfficialLink && "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-102"
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
                  <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
                </Button>
              </>
            )}
          </div>

          {/* Structured Attributes Card (Reworked to flat grid list - no card container) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 pb-6 border-b border-brand-primary/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                <MapPin className="size-4 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-brand-dark/50 uppercase font-semibold">Lokasi</p>
                <p className="text-xs text-brand-dark font-medium">{job.location || 'Tidak spesifik'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                <Briefcase className="size-4 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-brand-dark/50 uppercase font-semibold">Tipe Pekerjaan</p>
                <p className="text-xs text-brand-dark font-medium">{EMPLOYMENT_LABELS[job.employmentType] || job.employmentType}</p>
              </div>
            </div>

            {job.workSetup && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                  <Building className="size-4 shrink-0" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-dark/50 uppercase font-semibold">Sistem Kerja</p>
                  <p className="text-xs text-brand-dark font-medium">{WORK_SETUP_LABELS[job.workSetup] || job.workSetup}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                <Clock className="size-4 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-brand-dark/50 uppercase font-semibold">Status Penerimaan</p>
                <span className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mt-0.5",
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
                  <p className="text-[10px] text-brand-dark/50 uppercase font-semibold">Kuota Penerimaan</p>
                  <p className="text-xs text-brand-dark font-medium">{job.quota} Orang</p>
                </div>
              </div>
            )}

            {job.experienceLevel && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                  <GraduationCap className="size-4 shrink-0" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-dark/50 uppercase font-semibold">Tingkat Pengalaman</p>
                  <p className="text-xs text-brand-dark font-medium">{EXPERIENCE_LABELS[job.experienceLevel] || job.experienceLevel}</p>
                </div>
              </div>
            )}

            {job.salaryRange && (
              <div className="flex items-center gap-3 sm:col-span-2 border-t border-brand-primary/10 pt-3 mt-1">
                <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary font-bold text-xs shrink-0 flex items-center justify-center size-8">
                  IDR
                </div>
                <div>
                  <p className="text-[10px] text-brand-dark/50 uppercase font-semibold">Rentang Gaji</p>
                  <p className="text-xs text-brand-primary font-semibold">{job.salaryRange}</p>
                </div>
              </div>
            )}
          </div>

          {/* Details sections (Reworked to flat text flow - no cards) */}
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

            {job.jobDescription && job.requirements && <hr className="border-brand-primary/10" />}

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

            {((job.jobDescription || job.requirements) && job.benefits) && <hr className="border-brand-primary/10" />}

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
            
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between pt-6 border-t border-brand-primary/10 text-[11px] text-brand-dark/40">
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
      {initialDocs.length === 0 ? (
        <EmptyState
          tone="onDark"
          title="Belum ada lowongan kerja yang ditemukan"
          description="Silakan coba bersihkan filter pencarian untuk melihat semua data."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {initialDocs.map((job) => {
            const companyLogo = job.companyLogo as Media | null
            const isSelected = job.id === selectedId
            const isSaved = savedJobs.includes(job.id)

            return (
              <div
                key={job.id}
                onClick={() => handleSelectJob(job)}
                className={cn(
                  "group relative flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 cursor-pointer select-none",
                  isSelected
                    ? "border-brand-gold bg-brand-primary/30 shadow-lg shadow-brand-gold/5"
                    : "border-white/10 bg-white/4 hover:border-white/20 hover:bg-white/6 hover:shadow-md"
                )}
              >
                {/* Bookmark Icon in Card top right */}
                {isSaved && (
                  <div className="absolute top-4 right-4 text-brand-gold animate-in fade-in zoom-in duration-200">
                    <Bookmark className="size-4 fill-brand-gold text-brand-gold" />
                  </div>
                )}

                <div className="space-y-4">
                  {/* Logo & Position Header */}
                  <div className="flex items-start gap-4">
                    <div className="size-12 shrink-0 rounded-xl bg-white p-1.5 flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
                      {companyLogo && companyLogo.url ? (
                        <Image
                          src={companyLogo.url}
                          alt={job.companyName}
                          width={48}
                          height={48}
                          className="max-h-full max-w-full object-contain"
                          unoptimized
                        />
                      ) : (
                        <span aria-hidden="true" className="text-xl text-brand-primary font-bold">
                          {job.companyName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className={cn(
                        "font-serif font-bold text-base leading-snug group-hover:text-brand-gold transition-colors duration-300 line-clamp-1",
                        isSelected ? "text-brand-gold" : "text-white"
                      )}>
                        {job.position}
                      </h3>
                      <p className="text-xs font-semibold text-white/80 truncate mt-0.5">
                        {job.companyName}
                      </p>
                    </div>
                  </div>

                  {/* Location metadata */}
                  {job.location && (
                    <p className="text-xs text-white/55 truncate flex items-center gap-1.5 pt-1">
                      <MapPin className="size-3.5 shrink-0 text-brand-gold/80" /> {job.location}
                    </p>
                  )}
                </div>

                {/* Badges footer */}
                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/5 mt-4">
                  <span className={cn(
                    "rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                    job.employmentType === 'kp'
                      ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                      : job.employmentType === 'magang'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : 'bg-brand-gold/15 text-brand-gold border border-brand-gold/25'
                  )}>
                    {EMPLOYMENT_LABELS[job.employmentType] || job.employmentType}
                  </span>
                  {job.workSetup && (
                    <span className="bg-white/5 text-white/70 border border-white/10 rounded-md px-2 py-0.5 text-[9px] font-semibold">
                      {WORK_SETUP_LABELS[job.workSetup] || job.workSetup}
                    </span>
                  )}
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide",
                    job.vacancyStatus === 'open'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/25 text-red-400'
                  )}>
                    {job.vacancyStatus === 'open' ? 'Buka' : 'Tutup'}
                  </span>
                </div>
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

          {/* Slide-over sheet panel */}
          <div
            className={cn(
              "fixed inset-y-0 right-0 z-[100] w-full sm:max-w-2xl bg-white border-l border-brand-primary/10 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
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
