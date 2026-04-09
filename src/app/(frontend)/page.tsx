import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import Ornament from '@/components/Ornaments'
import { HeroLogo } from '@/components/HeroLogo'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { ProgramImageStack } from '@/components/ui/program-image-stack'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'

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
    })
    return result.docs as BeritaDoc[]
  } catch {
    return []
  }
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return 'IAM ITB'
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return 'IAM ITB'
  }
}

const IAM_MOMENTS = [
  'Yellboys dan\nSolidarity Forever',
  'Genggam\nMesin',
  'September M',
  'Lagu HMM\nJerusalem',
]

const PROGRAM_STACK_IMAGES = [
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
  const beritaList = await getLatestBerita()

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
      </div>

      {/* ── Hero ── */}
      <Section
        className="hero-section flex min-h-[92vh] w-full items-center pt-20 pb-12"
        containerClassName="relative z-10 grid max-w-7xl grid-cols-1 items-center gap-8 px-6 md:px-12 lg:grid-cols-12"
      >
        <div className="flex flex-col items-start gap-5 lg:col-span-7">
          <Heading level={1} className="text-[2.6rem] sm:text-5xl lg:text-[4rem]">
            Ikatan Alumni Mesin
            <br />
            Institut Teknologi Bandung
          </Heading>

          <Text
            variant="lead"
            className="font-serif text-xl font-bold italic text-brand-red-light md:text-3xl"
          >
            For Union Machine Strong
          </Text>

          <div className="pt-3">
            <Button href="/tentang-kami">Explore More</Button>
          </div>
        </div>

        <HeroLogo />
      </Section>

      {/* ── About ── */}
      <Section
        className="z-10 -mt-8 px-4 py-16 md:px-8 md:pb-20"
        containerClassName="max-w-6xl px-0"
      >
        <GlassCard className="about-card">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
            <div className="flex shrink-0 items-center gap-5">
              <div className="flex h-[160px] w-[130px] items-center justify-center rounded-xl border border-white/20 bg-white/6 shadow-lg shadow-black/10 backdrop-blur-sm md:h-[180px] md:w-[150px]">
                <Image
                  src="/logo.png"
                  alt="Logo IAM ITB"
                  width={100}
                  height={100}
                  className="object-contain"
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
              <Text tone="inverse">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </div>
          </div>

          <div className="mt-8 border-t border-white/8 pt-6">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {IAM_MOMENTS.map((moment, idx) => (
                <div
                  key={idx}
                  className="glass-tag flex items-center justify-center rounded-lg border border-white/15 bg-white/6 px-4 py-4 text-center shadow-sm shadow-black/10 backdrop-blur-md transition-colors duration-300 hover:border-white/25"
                >
                  <span className="font-display text-xs font-semibold tracking-wider whitespace-pre-line text-white/90 capitalize leading-relaxed">
                    {moment}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* ── Program ── */}
      <Section className="z-10" containerClassName="relative z-10 max-w-6xl px-6 md:px-8">
        <Ornament
          variant="blob"
          shadowSize="md"
          className="absolute bottom-6 z-10 size-84 blur-[30px] max-sm:left-1/5 md:top-6 md:right-1/5"
        />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <Heading level={2}>
              <span className="text-brand-dark">Program </span>
              <em className="text-brand-red italic">Kami</em>
            </Heading>
            <div className="flex flex-col gap-3">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
            </div>
            <div className="pt-2">
              <Button href="/program">Explore More</Button>
            </div>
          </div>

          <ProgramImageStack items={PROGRAM_STACK_IMAGES} className="lg:col-span-7" />
        </div>
      </Section>

      {/* ── Berita ── */}
      <Section className="z-10 px-4 py-16 md:px-8 md:pb-24" containerClassName="max-w-6xl px-0">
        <GlassCard className="berita-card" variant="stripes" contentClassName="p-8 md:p-10 lg:p-14">

          {/* Section header */}
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold/60">
              Kabar Terkini
            </span>
            <Heading level={2} tone="accent">
              Berita IAM ITB
            </Heading>
            <div className="h-px w-20 bg-linear-to-r from-transparent via-brand-gold/45 to-transparent" />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[0, 1, 2].map((idx) => {
              const post = beritaList[idx]
              return (
                <a
                  key={idx}
                  href={post?.slug ? `/berita/${post.slug}` : '#'}
                  className="berita-item-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/4 shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-gold/25 hover:shadow-2xl hover:shadow-black/35"
                >
                  {/* Image */}
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={post?.heroImage?.url ?? BERITA_PLACEHOLDER[idx]!}
                      fill
                      alt={post?.title ?? 'Berita IAM ITB'}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    />
                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 rounded-[3px] bg-brand-red/90 px-2 py-[3px] font-display text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-sm">
                      IAM
                    </span>
                    {/* Post index pill */}
                    <span className="absolute top-3 right-3 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-white/20 bg-black/25 font-display text-[10px] font-bold text-white/65 backdrop-blur-md">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Text content */}
                  <div className="flex flex-1 flex-col gap-2.5 p-4 pb-5">
                    <h3 className="line-clamp-2 font-serif text-sm font-semibold leading-snug text-white/90 transition-colors duration-300 group-hover:text-brand-gold">
                      {post?.title ?? 'Kongres IAM ITB'}
                    </h3>

                    <div className="mt-auto flex items-center justify-between pt-1">
                      <time className="font-display text-[10px] font-medium uppercase tracking-wider text-white/35">
                        {formatDate(post?.publishedAt)}
                      </time>
                      <span className="text-[13px] leading-none text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-gold">
                        →
                      </span>
                    </div>
                  </div>

                  {/* Bottom accent sweep on hover */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-brand-gold via-brand-gold/70 to-brand-red transition-all duration-500 group-hover:w-full" />
                </a>
              )
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Button href="/berita" variant="secondary">
              Berita Lainnya
            </Button>
          </div>
        </GlassCard>
      </Section>
    </main>
  )
}
