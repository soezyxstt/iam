import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Linkedin } from 'lucide-react'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Section } from '@/components/ui/section'
import { Text } from '@/components/ui/typography'
import RichText from '@/components/RichText'

type PageProps = {
  params: Promise<{ slug: string }>
}

async function getPresident(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'iamPresidents',
    overrideAccess: false,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'iamPresidents',
    overrideAccess: false,
    limit: 1000,
  })
  return result.docs.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const president = await getPresident(slug)
  if (!president) return { title: 'Profil Ketua' }
  return {
    title: `${president.name} — ${president.period}`,
    description: `Profil ${president.name}, ${president.period} Ikatan Alumni Mesin ITB.`,
  }
}

export default async function PreviousChairPage({ params }: PageProps) {
  const { slug } = await params
  const president = await getPresident(slug)
  if (!president) notFound()

  const portrait =
    typeof president.portraitImage === 'object' && president.portraitImage !== null
      ? (president.portraitImage as { url?: string })
      : null

  return (
    <PageShell>
      <Section
        className="z-10 pb-20 pt-3 md:pb-28 md:pt-6"
        containerClassName="max-w-6xl px-4 md:px-8"
      >
        <ScrollReveal>
          <div className="mb-5 flex justify-start md:mb-6">
            <Button href="/organisasi" variant="outline" size="sm" className="border-brand-dark/25">
              ← Kembali ke Organisasi
            </Button>
          </div>
          <GlassCard
            className="shadow-brand-dark/30"
            contentClassName="relative p-8 md:p-12 lg:p-14"
          >
            <div
              className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-brand-gold/8 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-brand-red/10 blur-3xl"
              aria-hidden
            />

            <div className="relative">
              {president.linkedInUrl && (
                <div className="mb-8 md:absolute md:top-2 md:right-0 md:mb-0 flex flex-wrap items-center justify-center gap-2.5 z-20">
                  <a
                    href={president.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn (buka di tab baru)"
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-display text-xs font-semibold tracking-wider text-white/85 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/55 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                  >
                    <Linkedin
                      className="size-4 text-brand-gold"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span>LinkedIn</span>
                  </a>
                </div>
              )}

              <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
                <div className="flex justify-center md:col-span-4 md:justify-start">
                  <div className="relative aspect-square w-44 sm:w-52 md:w-full md:max-w-[260px]">
                    <div
                      className="absolute -inset-3 rounded-full bg-brand-gold/15 blur-2xl"
                      aria-hidden
                    />
                    <div className="relative aspect-square overflow-hidden rounded-full ring-4 ring-white/15 ring-offset-2 ring-offset-brand-dark/0">
                      {portrait?.url ? (
                        <Image
                          src={portrait.url}
                          alt={president.name}
                          fill
                          sizes="(max-width: 768px) 220px, 260px"
                          className="object-cover"
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/80">
                          <span className="font-display text-5xl font-bold text-white/30">
                            {president.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center md:col-span-8 md:text-left pr-0 md:pr-40">
                  <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.5rem] md:leading-[1.1]">
                    {president.name}
                  </h1>
                  <p className="mt-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
                    {president.period}
                  </p>
                  {president.majorLabel && (
                    <p className="mt-4 font-serif text-xl font-bold tracking-tight text-brand-gold md:text-2xl">
                      {president.majorLabel}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-12 h-px w-full bg-white/12 md:mt-14" />

              <div className="mt-10 flex flex-col gap-5 md:mt-12">
                {president.shortBiography && (
                  <Text
                    tone="inverse"
                    className="text-[15px] leading-[1.85] text-white/75"
                  >
                    {president.shortBiography}
                  </Text>
                )}
                {president.personalStory && (
                  <Text
                    tone="inverse"
                    className="text-[15px] leading-[1.85] text-white/75"
                  >
                    {president.personalStory}
                  </Text>
                )}
                {president.professionalCareer && (
                  <div className="mt-2">
                    <p className="mb-3 font-display text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                      Riwayat Karier
                    </p>
                    <RichText data={president.professionalCareer} enableGutter={false} />
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}
