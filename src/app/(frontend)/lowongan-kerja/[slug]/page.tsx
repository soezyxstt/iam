import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { PageShell } from '@/components/PageShell'
import { Section } from '@/components/ui/section'
import { Heading, Text, Eyebrow } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import Link from 'next/link'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const jobs = await payload.find({
    collection: 'jobVacancies',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return jobs.docs.map(({ slug, id }) => ({ slug: String(slug || id) }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function JobPost({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/lowongan-kerja/' + decodedSlug
  const job = await queryJobBySlug({ slug: decodedSlug })

  if (!job) return <PayloadRedirects url={url} />

  return (
    <PageShell className="relative overflow-hidden bg-brand-khaki/10" showAmbient={false}>
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Premium Dark Hero Section */}
      <section className="relative w-full bg-brand-dark pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-brand-gold/20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-32 h-[400px] w-[400px] rounded-full bg-brand-gold/10 blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-brand-primary/20 blur-[100px]" />
        </div>

        <div className="container relative z-10 max-w-5xl">
          <Link href="/lowongan-kerja" className="mb-8 inline-flex items-center text-sm font-medium text-brand-gold hover:text-brand-gold/80 transition-colors">
            &larr; Kembali ke Daftar Lowongan
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mt-2">
              <div className="h-24 w-24 md:h-32 md:w-32 shrink-0 rounded-2xl bg-white p-4 shadow-xl flex items-center justify-center overflow-hidden border-2 border-white/10">
                {job.companyLogo && typeof job.companyLogo === 'object' && job.companyLogo.url ? (
                  <img src={job.companyLogo.url} alt={job.companyName} className="max-h-full max-w-full object-contain" />
                ) : (
                  <span aria-hidden="true" className="text-5xl text-brand-primary/40 font-bold">{job.companyName.charAt(0).toUpperCase()}</span>
                )}
              </div>
             
             {/* Title & Company Info */}
             <div className="flex flex-col gap-3">
               <Heading level={1} tone="inverse" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                 {job.position}
               </Heading>
               <Text variant="lead" tone="inverse" className="text-xl md:text-2xl text-white/90 font-medium">
                 {job.companyName}
               </Text>
               
               {/* Metadata Badges */}
               <div className="flex flex-wrap items-center gap-3 mt-3">
                 <span className="inline-flex items-center rounded-md bg-brand-gold/15 px-3 py-1.5 text-sm font-medium text-brand-gold border border-brand-gold/20">
                   {job.employmentType === 'full_time' ? 'Full-time' : job.employmentType === 'part_time' ? 'Part-time' : 'Internship'}
                 </span>
                 {job.location && (
                   <span className="inline-flex items-center rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white border border-white/20">
                     📍 {job.location}
                   </span>
                 )}
                 {job.workSetup && (
                   <span className="inline-flex items-center rounded-md bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-300 border border-blue-500/20">
                     🏢 {job.workSetup === 'on_site' ? 'On-site' : job.workSetup === 'hybrid' ? 'Hybrid' : 'Remote'}
                   </span>
                 )}
                 {job.experienceLevel && (
                   <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-300 border border-emerald-500/20">
                     🎓 {job.experienceLevel === 'entry' ? 'Entry Level' : job.experienceLevel === 'mid' ? 'Mid Level' : job.experienceLevel === 'senior' ? 'Senior Level' : 'Executive'}
                   </span>
                 )}
                 {job.salaryRange && (
                   <span className="inline-flex items-center rounded-md bg-brand-red/20 px-3 py-1.5 text-sm font-medium text-brand-khaki border border-brand-red/30">
                     💰 {job.salaryRange}
                   </span>
                 )}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <Section className="z-10 py-12 md:py-16" containerClassName="max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Job Description */}
          <div className="flex-1 bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/5">
            <Heading level={2} tone="default" className="text-2xl font-bold mb-6 text-brand-dark border-b border-black/5 pb-4">
              Deskripsi Pekerjaan
            </Heading>
            <article className="post-detail w-full max-w-none text-[16px] md:text-[17px] leading-[1.8]">
              <RichText data={job.jobDescription} enableGutter={false} />
            </article>
          </div>
          
          {/* Right Column: Sticky Sidebar Action */}
          <div className="w-full lg:w-80 shrink-0">
             <div className="sticky top-32 bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/5 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                   <Text variant="small" className="text-gray-500 font-medium uppercase tracking-wider text-xs">
                     Dipublikasikan
                   </Text>
                   <Text variant="body" className="text-brand-dark font-medium">
                     {new Date(job.updatedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                   </Text>
                </div>
                
                <hr className="border-black/5" />
                
                {job.officialLink ? (
                  <Button asChild variant="secondary" className="w-full py-6 text-base font-bold shadow-lg shadow-brand-gold/30">
                    <a href={job.officialLink} target="_blank" rel="noopener noreferrer">
                      Lamar Sekarang
                    </a>
                  </Button>
                ) : (
                   <Text variant="small" className="text-gray-500 italic text-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                     Tautan lamaran tidak tersedia
                   </Text>
                )}
             </div>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const job = await queryJobBySlug({ slug: decodedSlug })

  return {
    title: job ? `${job.position} di ${job.companyName}` : 'Lowongan Kerja',
    description: job ? `Lowongan pekerjaan ${job.position} di ${job.companyName} untuk alumni Teknik Mesin ITB.` : 'Lowongan pekerjaan untuk alumni Teknik Mesin ITB.',
  }
}

const queryJobBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'jobVacancies',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      or: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          id: {
            equals: slug,
          },
        },
      ],
    },
  })

  return result.docs?.[0] || null
})
