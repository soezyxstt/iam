import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'

import Ornament from '@/components/Ornaments'
import { HeroLogo } from '@/components/HeroLogo'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { AktivitasImageStack } from '@/components/ui/aktivitas-image-stack'
import { Section } from '@/components/ui/section'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import { Card } from '@/components/Card'
import type { Sponsor } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Beranda',
  description:
    'Ikatan Alumni Mahasiswa Teknik Mesin ITB — silaturahmi, jejaring profesional, dan kontribusi bagi almamater.',
}

interface BeritaDoc {
  title?: string | null
  slug?: string | null
  heroImage?: { url?: string | null } | null
  publishedAt?: string | null
}

async function getLatestBerita(): Promise<BeritaDoc[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      limit: 3,
      sort: '-publishedAt',
      where: { _status: { equals: 'published' } },
      depth: 1,
      overrideAccess: false,
    })
    return result.docs as BeritaDoc[]
  } catch {
    return []
  }
}

interface AktivitasDoc {
  title?: string | null
  heroImage?: { url?: string | null } | null
}

async function getLatestAktivitas(): Promise<AktivitasDoc[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'activities',
      limit: 3,
      sort: '-date',
      depth: 1,
      overrideAccess: false,
    })
    return result.docs as AktivitasDoc[]
  } catch {
    return []
  }
}

async function getSponsors(): Promise<Sponsor[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'sponsors',
      limit: 12,
      depth: 1,
      overrideAccess: false,
    })
    return result.docs as Sponsor[]
  } catch {
    return []
  }
}


const IAM_MOMENTS = [
  { label: 'Yellboys dan\nSolidarity Forever', slug: 'yellboys-solidarity-forever' },
  { label: 'Genggam\nMesin', slug: 'genggam-mesin' },
  { label: 'September M', slug: 'september-m' },
  { label: 'Lagu HMM\nJerusalem', slug: null },
]

const AKTIVITAS_FALLBACK = [
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    alt: 'Kongres IAM ITB',
    title: 'Kongres IAM ITB',
    titleClassName: 'text-base',
  },
  {
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    alt: 'Workshop Teknik',
    title: 'Workshop Teknik',
  },
  {
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    alt: 'Gathering Alumni',
    title: 'Gathering Alumni',
  },
]

const BERITA_PLACEHOLDER = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80',
]



export default async function HomePage() {
  const [beritaList, sponsors, aktivitasList] = await Promise.all([
    getLatestBerita(),
    getSponsors(),
    getLatestAktivitas(),
  ])

  const programStackImages = aktivitasList
    .filter((a) => a.heroImage?.url)
    .slice(0, 3)
    .map((a) => ({
      src: a.heroImage!.url as string,
      alt: a.title ?? 'Aktivitas IAM ITB',
      title: a.title ?? 'Aktivitas IAM ITB',
    }))
  const stackImages = programStackImages.length >= 2 ? programStackImages : AKTIVITAS_FALLBACK

  return (
    <main className="page-root relative min-h-screen overflow-hidden">
      {/* ── Ambient background geometry ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
        {/* Top-right gold glow */}
        <div className="absolute -top-44 -right-44 h-[640px] w-[580px] rounded-full bg-brand-gold/8 blur-[110px]" />
        {/* Left side deep navy */}
        <div className="absolute top-[16%] -left-64 h-[700px] w-[520px] rounded-full bg-brand-primary/10 blur-[110px]" />
        {/* Secondary soft accent – steel blue, mid-left */}
        <div className="absolute top-[28%] left-[12%] h-[240px] w-[240px] rounded-full bg-brand-light/8 blur-[70px]" />
        {/* Centre page subtle red warmth */}
        <div className="absolute top-[52%] left-1/2 h-[400px] w-[440px] -translate-x-1/2 rounded-full bg-brand-red/5 blur-[90px]" />
        {/* Lower-left warm gold */}
        <div className="absolute bottom-[14%] -left-24 h-[500px] w-[440px] rounded-full bg-brand-gold/7 blur-[110px]" />
        {/* Bottom-right dark anchor */}
        <div className="absolute -bottom-40 -right-40 h-[640px] w-[540px] rounded-full bg-brand-dark/8 blur-[130px]" />
        {/* Small floating accent – top-centre */}
        <div className="absolute top-[8%] left-1/2 h-[180px] w-[300px] -translate-x-1/2 rounded-full bg-brand-primary/6 blur-[60px]" />
        {/* Mechanical blueprint/gear vector ornaments */}
        <div className="absolute -top-20 -left-20 w-[340px] h-[340px] opacity-[0.05] text-brand-gold animate-[spin_55s_linear_infinite] blur-[1px]">
          <Ornament variant="gear" />
        </div>
        <div className="absolute top-[35%] right-[-120px] w-[420px] h-[420px] opacity-[0.04] text-brand-primary animate-[spin_70s_linear_infinite] blur-[1.5px]">
          <Ornament variant="gear" />
        </div>
        <div className="absolute top-[8%] left-[45%] w-[260px] h-[260px] opacity-[0.03] text-brand-red animate-[spin_45s_linear_infinite] blur-[0.5px]">
          <Ornament variant="gear" />
        </div>
      </div>

      {/* ── Hero ── */}
      <Section
        className="hero-section flex min-h-[92vh] w-full items-center pt-14 pb-12 md:pt-[4.75rem]"
        containerClassName="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
      >
        <div className="flex flex-col items-start gap-5 lg:col-span-7">
          <Heading
            level={1}
            className="text-[2.6rem] sm:text-5xl lg:text-[4rem] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0 animate-in fade-in slide-in-from-bottom-6 duration-700"
          >
            Ikatan Alumni Mesin
            <br />
            Institut Teknologi Bandung
          </Heading>
 
          <Text
            variant="lead"
            className="font-serif text-xl font-bold italic text-brand-red-light motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0 md:text-3xl animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100"
          >
            For Union Machine Strong
          </Text>

          <div className="pt-3 motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <Button href="/organisasi">Jelajahi</Button>
          </div>
        </div>

        <div className="motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0 lg:col-span-5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <HeroLogo />
        </div>
      </Section>

      {/* ── About ── */}
      <Section
        className="z-10 -mt-8 py-16 md:pb-20"
      >
        <ScrollReveal>
        <GlassCard className="about-card">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
            <div className="flex shrink-0 items-center gap-6">
              <div className="h-[150px] w-[130px] flex items-center justify-start">
                <Image
                  src="/logo.png"
                  alt="Logo IAM ITB"
                  width={120}
                  height={120}
                  className="object-contain object-left"
                />
              </div>

              <span className="font-serif text-3xl leading-tight font-bold tracking-tight text-white md:text-4xl">
                IAM
                <br />
                ITB
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <Heading level={2} tone="accent">
                Ikatan Alumni Mesin ITB
              </Heading>
              <Text tone="inverse" variant="editorial">
                Ikatan Alumni Mesin ITB adalah organisasi resmi yang menyatukan seluruh lulusan Teknik Mesin ITB lintas angkatan dan generasi. Lebih dari sekadar forum silaturahmi, IAM ITB adalah ekosistem profesional yang hidup, berlandaskan nilai kekeluargaan korps yang terangkum dalam semboyan &ldquo;Solidarity Forever&rdquo;. Para anggotanya aktif berkontribusi di berbagai sektor, mulai dari manufaktur, energi, dan migas, hingga pemerintahan dan akademis, menjadikan jaringan ini salah satu yang paling solid di antara alumni perguruan tinggi teknik di Indonesia.
              </Text>
            </div>
          </div>

          <div className="mt-8 border-t border-white/8 pt-6">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {IAM_MOMENTS.map((moment, idx) =>
                moment.slug ? (
                  <Link
                    key={idx}
                    href={`/seputar-kami/${moment.slug}`}
                    className="group glass-tag relative flex h-20 flex-col items-center justify-center gap-0 overflow-hidden rounded-lg border border-white/15 bg-white/6 px-4 text-center shadow-sm shadow-black/10 backdrop-blur-md transition-all duration-300 hover:border-brand-gold/40 hover:bg-brand-gold/8 cursor-pointer"
                  >
                    <span className="font-display text-xs font-semibold tracking-wider whitespace-pre-line text-white/90 capitalize leading-relaxed transition-all duration-300 group-hover:text-brand-gold group-hover:-translate-y-2">
                      {moment.label}
                    </span>
                    <span className="absolute bottom-2.5 left-0 right-0 text-center font-display text-[9px] tracking-widest uppercase text-brand-gold/70 opacity-0 translate-y-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      Baca &#8594;
                    </span>
                  </Link>
                ) : (
                  <div
                    key={idx}
                    className="glass-tag relative flex h-20 flex-col items-center justify-center rounded-lg border border-white/10 bg-white/4 px-4 text-center shadow-sm shadow-black/10 backdrop-blur-md opacity-50"
                  >
                    <span className="font-display text-xs font-semibold tracking-wider whitespace-pre-line text-white/60 capitalize leading-relaxed">
                      {moment.label}
                    </span>
                    <span className="mt-1 font-display text-[9px] tracking-widest uppercase text-white/25">
                      Segera
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </GlassCard>
        </ScrollReveal>
      </Section>

      {/* ── Aktivitas ── */}
      <Section className="z-10" containerClassName="relative z-10">
        <ScrollReveal>
        <Ornament
          variant="blob"
          shadowSize="md"
          className="absolute bottom-6 z-10 size-84 blur-[30px] max-sm:left-1/5 md:top-6 md:right-1/5"
        />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <Heading level={2}>
              Aktivitas <em className="text-brand-red italic">Kami</em>
            </Heading>
            <div className="flex flex-col gap-3">
              <Text variant="editorial">
                IAM ITB menyelenggarakan berbagai aktivitas untuk mempererat tali silaturahmi,
                mengembangkan potensi profesional, serta memberikan kontribusi nyata bagi
                almamater dan masyarakat luas.
              </Text>
              <Text variant="editorial">
                Jelajahi berbagai agenda kami, mulai dari pertemuan rutin, workshop pengembangan diri,
                hingga aksi sosial yang berdampak positif bagi lingkungan sekitar.
              </Text>
            </div>
            <div className="pt-2">
              <Button href="/aktivitas">Jelajahi</Button>
            </div>
          </div>

          <AktivitasImageStack items={stackImages} className="lg:col-span-7" />
        </div>
        </ScrollReveal>
      </Section>

      {/* ── Berita ── */}
      <Section className="z-10 py-16 md:pb-24">
        <ScrollReveal>
        <GlassCard className="berita-card" variant="stripes" contentClassName="p-6 md:p-8 lg:p-10">
          {/* Section header */}
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <Eyebrow tone="gold" className="text-brand-gold/60 tracking-[0.25em]">
              Kabar Terkini
            </Eyebrow>
            <Heading level={2} tone="accent">
              Berita IAM ITB
            </Heading>
            <div className="h-px w-20 bg-linear-to-r from-transparent via-brand-gold/45 to-transparent" />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[0, 1, 2].map((idx) => {
              const post = beritaList[idx]
              const postData = post
                ? {
                    title: post.title,
                    slug: post.slug,
                    publishedAt: post.publishedAt,
                    heroImage: post.heroImage
                      ? { url: post.heroImage.url }
                      : { url: BERITA_PLACEHOLDER[idx] },
                  }
                : {
                    title: idx === 0 ? 'Kongres IAM ITB' : idx === 1 ? 'Workshop Teknik' : 'Gathering Alumni',
                    slug: '',
                    publishedAt: new Date().toISOString(),
                    heroImage: { url: BERITA_PLACEHOLDER[idx] },
                  }
              return (
                <Card
                  key={idx}
                  type="berita"
                  doc={postData}
                  index={idx}
                  showCategories
                />
              )
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Button href="/berita" variant="secondary">
              Berita Lainnya
            </Button>
          </div>
        </GlassCard>
        </ScrollReveal>
      </Section>

      {/* ── Sponsor & Mitra ── */}
      {sponsors.length > 0 && (
        <Section className="z-10 pb-24">
          <ScrollReveal>
            {/* Section header */}
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <Eyebrow tone="red">
                Dukungan &amp; Kolaborasi
              </Eyebrow>
              <Heading level={2}>
                Sponsor &amp; Mitra
              </Heading>
              <div className="h-px w-20 bg-linear-to-r from-transparent via-brand-primary/40 to-transparent" />
            </div>

            {/* Glassmorphism logo grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {sponsors.map((sponsor) => {
                const logo = typeof sponsor.logo === 'object' && sponsor.logo !== null ? sponsor.logo : null
                const href = sponsor.officialWebsite
                  ? sponsor.officialWebsite.startsWith('http')
                    ? sponsor.officialWebsite
                    : `https://${sponsor.officialWebsite}`
                  : null

                const tile = (
                  <div className="sponsor-logo-tile sponsor-glass-card group relative aspect-[4/3] overflow-hidden rounded-2xl">
                    {/* Logo */}
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      {logo?.url ? (
                        <Image
                          src={logo.url}
                          alt={sponsor.companyName}
                          fill
                          className="object-contain p-4 sm:p-5"
                          sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 15vw"
                        />
                      ) : (
                        <span className="text-3xl font-bold text-brand-primary/30">
                          {sponsor.companyName?.charAt(0)}
                        </span>
                      )}
                    </div>
                    {/* Hover overlay with sponsor name */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-brand-dark/80 px-3 py-2.5 text-center backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white line-clamp-1">
                        {sponsor.companyName}
                      </span>
                    </div>
                    {/* Clickable cursor hint */}
                    {href && (
                      <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-dark/0 transition-all duration-300 group-hover:bg-brand-dark/20">
                        <svg className="h-3 w-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    )}
                  </div>
                )

                return (
                  <div key={sponsor.id}>
                    {href ? (
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        title={sponsor.companyName}
                      >
                        {tile}
                      </Link>
                    ) : (
                      tile
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <Button href="/sponsor" variant="outline">
                Lihat Semua Sponsor
              </Button>
            </div>
          </ScrollReveal>
        </Section>
      )}
    </main>
  )
}
