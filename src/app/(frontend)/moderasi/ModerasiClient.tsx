'use client'

import React, { useState, useTransition } from 'react'
import type { AlumniBusiness, JobVacancy } from '@/payload-types'
import { approveSubmission, rejectSubmission } from './actions'
import { Heading } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { EmptyState } from '@/components/ui/empty-state'
import { cn } from '@/utilities/ui'
import {
  Check,
  Trash2,
  Building2,
  User,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Layers,
  DollarSign,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react'

interface ModerasiClientProps {
  initialBusinesses: AlumniBusiness[]
  initialJobs: JobVacancy[]
}

const CATEGORY_LABELS: Record<string, string> = {
  fnb: 'Kuliner (F&B)',
  manufaktur: 'Manufaktur',
  teknologi: 'Teknologi',
  jasa: 'Jasa',
  lainnya: 'Lainnya',
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

export function ModerasiClient({ initialBusinesses, initialJobs }: ModerasiClientProps) {
  const [activeTab, setActiveTab] = useState<'usaha' | 'lowongan'>('usaha')
  const [businesses, setBusinesses] = useState<AlumniBusiness[]>(initialBusinesses)
  const [jobs, setJobs] = useState<JobVacancy[]>(initialJobs)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [isPending, startTransition] = useTransition()
  const [actionId, setActionId] = useState<string | null>(null) // track which item is being actioned

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleApprove = async (id: number, type: 'usaha' | 'lowongan') => {
    const key = `${type}-${id}`
    setActionId(key)
    startTransition(async () => {
      try {
        const res = await approveSubmission(id, type)
        if (res.success) {
          if (type === 'usaha') {
            setBusinesses((prev) => prev.filter((b) => b.id !== id))
          } else {
            setJobs((prev) => prev.filter((j) => j.id !== id))
          }
        }
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Gagal menyetujui pengajuan')
      } finally {
        setActionId(null)
      }
    })
  }

  const handleReject = async (id: number, type: 'usaha' | 'lowongan') => {
    if (!confirm('Apakah Anda yakin ingin menolak dan menghapus pengajuan ini?')) return

    const key = `${type}-${id}`
    setActionId(key)
    startTransition(async () => {
      try {
        const res = await rejectSubmission(id, type)
        if (res.success) {
          if (type === 'usaha') {
            setBusinesses((prev) => prev.filter((b) => b.id !== id))
          } else {
            setJobs((prev) => prev.filter((j) => j.id !== id))
          }
        }
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Gagal menolak pengajuan')
      } finally {
        setActionId(null)
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Tab Selectors */}
      <div className="flex border-b border-white/10 pb-px">
        <button
          onClick={() => setActiveTab('usaha')}
          className={cn(
            'px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider transition-all border-b-2 cursor-pointer',
            activeTab === 'usaha'
              ? 'border-brand-gold text-brand-gold'
              : 'border-transparent text-white/60 hover:text-white'
          )}
        >
          Usaha Alumni ({businesses.length})
        </button>
        <button
          onClick={() => setActiveTab('lowongan')}
          className={cn(
            'px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider transition-all border-b-2 cursor-pointer',
            activeTab === 'lowongan'
              ? 'border-brand-gold text-brand-gold'
              : 'border-transparent text-white/60 hover:text-white'
          )}
        >
          Lowongan Kerja ({jobs.length})
        </button>
      </div>

      {/* Content List */}
      {activeTab === 'usaha' ? (
        businesses.length === 0 ? (
          <EmptyState
            tone="onDark"
            title="Tidak ada pengajuan usaha alumni"
            description="Semua pengajuan pendaftaran usaha alumni telah ditinjau."
          />
        ) : (
          <div className="space-y-6">
            {businesses.map((biz) => {
              const key = `usaha-${biz.id}`
              const isExpanded = !!expandedItems[key]
              const isLoading = isPending && actionId === key

              return (
                <GlassCard key={biz.id} className="relative transition-all duration-300" variant="default">
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 md:items-start">
                      <div className="space-y-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold font-sans uppercase tracking-wider bg-brand-gold/15 text-brand-gold border border-brand-gold/25">
                          {CATEGORY_LABELS[biz.category] || biz.category}
                        </span>
                        <Heading level={3} tone="inverse" className="text-xl md:text-2xl font-bold font-serif leading-tight">
                          {biz.businessName}
                        </Heading>
                        <div className="flex items-center gap-2 text-white/70 text-sm font-sans">
                          <User className="size-4 shrink-0 text-brand-gold" />
                          <span>Pemilik: <strong className="text-white font-semibold">{biz.ownerName}</strong></span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 self-end md:self-start">
                        <Button
                          onClick={() => handleReject(biz.id, 'usaha')}
                          variant="outline"
                          size="sm"
                          disabled={isLoading}
                          className="rounded-xl border-brand-red/30 hover:border-brand-red text-brand-red bg-brand-red/5 hover:bg-brand-red/10 cursor-pointer text-xs h-10 font-bold uppercase tracking-wider"
                        >
                          <Trash2 className="size-4 mr-1.5" />
                          {isLoading && actionId === key ? 'Proses...' : 'Tolak'}
                        </Button>
                        <Button
                          onClick={() => handleApprove(biz.id, 'usaha')}
                          variant="secondary"
                          size="sm"
                          disabled={isLoading}
                          className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer text-xs h-10 font-bold uppercase tracking-wider px-5 shadow-lg shadow-emerald-900/20"
                        >
                          <Check className="size-4 mr-1.5" />
                          {isLoading && actionId === key ? 'Proses...' : 'Setujui'}
                        </Button>
                      </div>
                    </div>

                    {/* Summary Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans text-sm text-white/85 pt-2 border-t border-white/5">
                      <div className="flex items-start gap-2.5">
                        <Phone className="size-4 shrink-0 text-brand-gold mt-0.5" />
                        <div>
                          <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">No. Telepon</p>
                          <p className="font-medium">{biz.phoneNumber}</p>
                        </div>
                      </div>
                      {biz.email && (
                        <div className="flex items-start gap-2.5">
                          <Mail className="size-4 shrink-0 text-brand-gold mt-0.5" />
                          <div>
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Email</p>
                            <p className="font-medium truncate max-w-[200px]">{biz.email}</p>
                          </div>
                        </div>
                      )}
                      {biz.website && (
                        <div className="flex items-start gap-2.5">
                          <Globe className="size-4 shrink-0 text-brand-gold mt-0.5" />
                          <div>
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Website</p>
                            <p className="font-medium truncate max-w-[200px]">{biz.website}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="space-y-6 pt-4 border-t border-white/5 font-sans text-white/90 text-sm leading-relaxed animate-fade-in">
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">Deskripsi Usaha:</h4>
                          <p className="bg-white/5 p-4 rounded-xl border border-white/10 whitespace-pre-wrap">
                            {biz.description}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">Produk / Jasa Utama:</h4>
                          <p className="bg-white/5 p-4 rounded-xl border border-white/10">
                            {biz.productsOrServices}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">Alamat Fisik:</h4>
                          <p className="bg-white/5 p-4 rounded-xl border border-white/10 whitespace-pre-wrap">
                            {biz.address}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {biz.instagram && (
                            <div className="flex items-center gap-2">
                              <Instagram className="size-4 text-brand-gold" />
                              <span>Instagram: <strong className="text-white">{biz.instagram}</strong></span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-white/40 mt-auto">
                            <span>ID Pengajuan: {biz.id}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Expand/Collapse Toggle */}
                    <button
                      onClick={() => toggleExpand(key)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 mt-2 text-xs text-white/60 hover:text-white transition-colors cursor-pointer border-t border-white/5 font-sans font-semibold"
                    >
                      {isExpanded ? (
                        <>
                          Sembunyikan Rincian <ChevronUp className="size-4" />
                        </>
                      ) : (
                        <>
                          Tampilkan Rincian Lengkap <ChevronDown className="size-4" />
                        </>
                      )}
                    </button>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        )
      ) : (
        jobs.length === 0 ? (
          <EmptyState
            tone="onDark"
            title="Tidak ada pengajuan lowongan kerja"
            description="Semua pengajuan lowongan kerja baru telah selesai ditinjau."
          />
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => {
              const key = `lowongan-${job.id}`
              const isExpanded = !!expandedItems[key]
              const isLoading = isPending && actionId === key

              return (
                <GlassCard key={job.id} className="relative transition-all duration-300" variant="default">
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 md:items-start">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold font-sans uppercase tracking-wider bg-brand-gold/15 text-brand-gold border border-brand-gold/25">
                            {EMPLOYMENT_LABELS[job.employmentType] || job.employmentType}
                          </span>
                          {job.workSetup && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold font-sans uppercase tracking-wider bg-white/10 text-white/80 border border-white/15">
                              {WORK_SETUP_LABELS[job.workSetup]}
                            </span>
                          )}
                        </div>
                        <Heading level={3} tone="inverse" className="text-xl md:text-2xl font-bold font-serif leading-tight">
                          {job.position}
                        </Heading>
                        <div className="flex items-center gap-2 text-white/70 text-sm font-sans">
                          <Building2 className="size-4 shrink-0 text-brand-gold" />
                          <span>Perusahaan: <strong className="text-white font-semibold">{job.companyName}</strong></span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 self-end md:self-start">
                        <Button
                          onClick={() => handleReject(job.id, 'lowongan')}
                          variant="outline"
                          size="sm"
                          disabled={isLoading}
                          className="rounded-xl border-brand-red/30 hover:border-brand-red text-brand-red bg-brand-red/5 hover:bg-brand-red/10 cursor-pointer text-xs h-10 font-bold uppercase tracking-wider"
                        >
                          <Trash2 className="size-4 mr-1.5" />
                          {isLoading && actionId === key ? 'Proses...' : 'Tolak'}
                        </Button>
                        <Button
                          onClick={() => handleApprove(job.id, 'lowongan')}
                          variant="secondary"
                          size="sm"
                          disabled={isLoading}
                          className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer text-xs h-10 font-bold uppercase tracking-wider px-5 shadow-lg shadow-emerald-900/20"
                        >
                          <Check className="size-4 mr-1.5" />
                          {isLoading && actionId === key ? 'Proses...' : 'Setujui'}
                        </Button>
                      </div>
                    </div>

                    {/* Summary Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans text-sm text-white/85 pt-2 border-t border-white/5">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="size-4 shrink-0 text-brand-gold mt-0.5" />
                        <div>
                          <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Lokasi</p>
                          <p className="font-medium">{job.location || 'Tidak spesifik'}</p>
                        </div>
                      </div>
                      {job.experienceLevel && (
                        <div className="flex items-start gap-2.5">
                          <Layers className="size-4 shrink-0 text-brand-gold mt-0.5" />
                          <div>
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Pengalaman</p>
                            <p className="font-medium">{EXPERIENCE_LABELS[job.experienceLevel]}</p>
                          </div>
                        </div>
                      )}
                      {job.salaryRange && (
                        <div className="flex items-start gap-2.5">
                          <DollarSign className="size-4 shrink-0 text-brand-gold mt-0.5" />
                          <div>
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Gaji</p>
                            <p className="font-medium truncate max-w-[200px]">{job.salaryRange}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="space-y-6 pt-4 border-t border-white/5 font-sans text-white/90 text-sm leading-relaxed animate-fade-in">
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">Deskripsi Pekerjaan:</h4>
                          <div className="bg-white/5 p-4 rounded-xl border border-white/10 whitespace-pre-wrap">
                            {/* We output plain text formatted description here safely */}
                            {typeof job.jobDescription === 'object' && job.jobDescription !== null ? (
                              <p className="italic text-white/60 text-xs mb-2 flex items-center gap-1">
                                <FileText className="size-3.5" /> RichText terkompresi. Detail lengkap akan terbit di halaman lowongan.
                              </p>
                            ) : null}
                            <p>
                              {typeof job.jobDescription === 'string'
                                ? job.jobDescription
                                : 'Detail lengkap disimpan dalam format terstruktur.'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          {job.contactWhatsApp && (
                            <div className="flex items-center gap-2">
                              <MessageSquare className="size-4 text-emerald-500" />
                              <span>WhatsApp Kontak: <strong className="text-white">{job.contactWhatsApp}</strong></span>
                            </div>
                          )}
                          {job.officialLink && (
                            <div className="flex items-center gap-2">
                              <Globe className="size-4 text-brand-gold" />
                              <span>Tautan Resmi: <a href={job.officialLink} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline font-semibold break-all">{job.officialLink}</a></span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-white/40 pt-4 border-t border-white/5">
                          <span>ID Pengajuan: {job.id}</span>
                        </div>
                      </div>
                    )}

                    {/* Expand/Collapse Toggle */}
                    <button
                      onClick={() => toggleExpand(key)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 mt-2 text-xs text-white/60 hover:text-white transition-colors cursor-pointer border-t border-white/5 font-sans font-semibold"
                    >
                      {isExpanded ? (
                        <>
                          Sembunyikan Rincian <ChevronUp className="size-4" />
                        </>
                      ) : (
                        <>
                          Tampilkan Rincian Lengkap <ChevronDown className="size-4" />
                        </>
                      )}
                    </button>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        )
      )}
    </div>
  )
}
