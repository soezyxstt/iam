
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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

const IAM_MOMENTS = [
  'Yellboys dan\nSolidarity Forever',
  'Genggam\nMesin',
  'September M',
  'Lagu HMM\nJerusalem',
]

// ----------------------------------------------------------------
// Landing Page
// ----------------------------------------------------------------

export default async function HomePage() {
  const beritaList = await getLatestBerita()

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="hero-section relative w-full min-h-[92vh] flex items-center pt-20 pb-12">
        {/* Background gradient: white top → subtle blue-gray bottom */}
        <div className="absolute inset-0 bg-white from-white via-white via-80% to-brand-primary z-0" />

        <div className="container mx-auto px-6 md:px-12 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left text */}
          <div className="lg:col-span-7 flex flex-col gap-5 items-start">
            <h1 className="font-serif font-bold text-[2.6rem] sm:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight text-brand-dark">
              Ikatan Alumni Mesin
              <br />
              Institut Teknologi Bandung
            </h1>

            <p className="font-serif italic text-xl md:text-2xl text-brand-red font-bold">
              For Union Machine Strong
            </p>

            <div className="pt-3">
              <Link
                href="/tentang-kami"
                className="inline-block bg-brand-primary hover:bg-brand-primary/90 text-white font-display font-semibold text-xs tracking-wider px-7 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105"
              >
                Explore More
              </Link>
            </div>
          </div>

          {/* Right: Logo with glow aura */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Purple/blue glow behind logo */}
            <div className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full bg-brand-primary/30 blur-[80px] z-0" />
            <div className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full bg-[#445E86]/40 blur-[60px] z-0 translate-x-4 translate-y-4" />

            <Image
              src="/logo.png"
              alt="Lambang IAM ITB"
              width={280}
              height={280}
              priority
              className="relative z-10 object-contain drop-shadow-2xl md:w-[320px] md:h-[320px] w-[240px] h-[240px] rotate-[5deg]"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════ ABOUT (Dark Gradient Glass Card) ═══════════════════ */}
      <section className="relative z-10 px-4 md:px-8 pb-16 md:pb-20 -mt-8">
        <div className="about-card max-w-6xl mx-auto rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/[0.08] relative">
          {/* Navy gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2640] via-[#253041] to-[#1e3050] z-0" />
          {/* Subtle inner glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

          <div className="relative z-10 p-8 md:p-10 lg:p-12">
            {/* Top row: Logo + Title + Text */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Left: Logo in glass box + IAM ITB text */}
              <div className="flex-shrink-0 flex items-center gap-5">
                {/* Glass-bordered logo box */}
                <div className="w-[130px] h-[160px] md:w-[150px] md:h-[180px] rounded-xl border border-white/20 bg-white/[0.06] backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/10">
                  <Image
                    src="/logo.png"
                    alt="Logo IAM ITB"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                {/* IAM ITB text next to logo */}
                <span className="font-serif font-bold text-3xl md:text-4xl text-white leading-tight tracking-tight">
                  IAM
                  <br />
                  ITB
                </span>
              </div>

              {/* Right: Title + Description */}
              <div className="flex-1 flex flex-col gap-4">
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-gold">
                  Ikatan Alumni Mesin ITB
                </h2>
                <p className="font-sans text-sm md:text-[15px] text-white/75 leading-relaxed">
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
                </p>
              </div>
            </div>

            {/* Bottom row: Glass Moment Tags */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {IAM_MOMENTS.map((moment, idx) => (
                  <div
                    key={idx}
                    className="glass-tag rounded-lg border border-white/15 bg-white/[0.06] backdrop-blur-md px-4 py-4 text-center shadow-sm shadow-black/10 hover:border-white/25 transition-colors duration-300"
                  >
                    <span className="font-display font-semibold text-xs text-white/90 uppercase tracking-wider whitespace-pre-line leading-relaxed">
                      {moment}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROGRAM KAMI ═══════════════════ */}
      <section className="relative z-10 py-16 md:py-24">
        {/* Background: white → subtle gray/blue gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f2f3f7] to-[#e4e7ef] z-0" />

        <div className="container mx-auto px-6 md:px-8 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-5 flex flex-col gap-5 order-2 lg:order-1">
              <h2 className="font-serif font-bold text-3xl md:text-4xl leading-[1.1]">
                <span className="text-brand-dark">Program </span>
                <em className="text-brand-red italic">Kami</em>
              </h2>
              <div className="flex flex-col gap-3">
                <p className="font-sans text-sm md:text-[15px] text-brand-dark/70 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p className="font-sans text-sm md:text-[15px] text-brand-dark/70 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/program"
                  className="inline-block bg-brand-primary hover:bg-brand-primary/90 text-white font-display font-semibold text-xs tracking-wider px-7 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105"
                >
                  Explore More
                </Link>
              </div>
            </div>

            {/* Right: 3 Overlapping Glass-Framed Cards */}
            <div className="lg:col-span-7 relative h-[420px] md:h-[500px] w-full order-1 lg:order-2">
              {/* Card 1: Front-left, large */}
              <div className="absolute z-30 w-[52%] aspect-[4/5] left-4 top-0 glass-card-frame">
                <div className="glass-card-inner">
                  <Image
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
                    fill
                    alt="Kongres IAM ITB"
                    className="object-cover"
                  />
                </div>
                <div className="glass-card-label">
                  <span className="text-white font-serif font-bold text-base drop-shadow-md">
                    Kongres IAM ITB
                  </span>
                </div>
              </div>

              {/* Card 2: Middle-right, slightly smaller */}
              <div className="absolute z-20 w-[44%] aspect-[4/5] right-0 top-4 glass-card-frame">
                <div className="glass-card-inner">
                  <Image
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80"
                    fill
                    alt="Kongres IAM ITB"
                    className="object-cover"
                  />
                </div>
                <div className="glass-card-label">
                  <span className="text-white font-serif font-bold text-sm drop-shadow-md">
                    Kongres IAM ITB
                  </span>
                </div>
              </div>

              {/* Card 3: Bottom-center */}
              <div className="absolute z-10 w-[46%] aspect-[4/5] right-12 bottom-0 glass-card-frame">
                <div className="glass-card-inner">
                  <Image
                    src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80"
                    fill
                    alt="Kongres IAM ITB"
                    className="object-cover"
                  />
                </div>
                <div className="glass-card-label">
                  <span className="text-white font-serif font-bold text-sm drop-shadow-md">
                    Kongres IAM ITB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ BERITA (Dark Gradient Glass Card + Stripes) ═══════════════════ */}
      <section className="relative z-10 px-4 md:px-8 pb-16 md:pb-24">
        <div className="berita-card max-w-6xl mx-auto rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/[0.08] relative">
          {/* Navy gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2640] via-[#253041] to-[#1e3050] z-0" />

          {/* Decorative horizontal stripes on right side */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-[1] hidden md:flex flex-col gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[6px] bg-brand-primary/60 rounded-l-full"
                style={{ width: `${120 - i * 15}px` }}
              />
            ))}
          </div>

          {/* Subtle inner glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

          <div className="relative z-10 p-8 md:p-10 lg:p-14">
            {/* Title */}
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-gold text-center mb-8">
              Berita IAM ITB
            </h2>

            {/* 3 Glass Cards in a Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
              {[0, 1, 2].map((idx) => {
                const post = beritaList[idx]
                return (
                  <Link
                    key={idx}
                    href={post?.slug ? `/berita/${post.slug}` : '#'}
                    className="group glass-berita-card flex flex-col rounded-xl overflow-hidden border border-white/15 bg-white/[0.06] backdrop-blur-sm shadow-lg shadow-black/10 hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden m-2.5 mb-0 rounded-lg">
                      <Image
                        src={
                          post?.heroImage?.url ||
                          `https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80&sig=${idx}`
                        }
                        fill
                        alt={post?.title || 'Berita'}
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-3 pt-2.5 text-center">
                      <h3 className="font-serif font-bold text-sm text-white/90 leading-snug line-clamp-2 group-hover:text-brand-gold transition-colors">
                        {post?.title || 'Kongres IAM ITB'}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* CTA Button – Yellow/Gold */}
            <div className="flex justify-center mt-8">
              <Link
                href="/berita"
                className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-display font-semibold text-xs tracking-wider px-7 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105"
              >
                Berita Lainnya
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
