import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Handshake, Lightbulb } from 'lucide-react'
import type { Metadata } from 'next'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'

import { PREVIOUS_CHAIR_ENTRIES } from './previous-chairs-data'
import { KepengurusanBoard } from './KepengurusanBoard'

export const metadata: Metadata = {
  title: 'Organisasi',
  description:
    'Profil, visi misi, latar belakang, dan struktur kepengurusan Ikatan Alumni Mesin ITB — IAM ITB.',
}

const PLACEHOLDER_BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

const FOREWORD_AVATAR = '/media/pengurus/ketua.jpeg'

const OrgNode = ({
  role,
  name,
  customInitials,
}: {
  role: string
  name: string
  customInitials?: string
}) => {
  const initials =
    customInitials ||
    (name
      ? name
          .split(' ')
          .map((n) => n[0] || '')
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : '')

  return (
    <div className="flex flex-col items-center relative z-10 group">
      <div className="relative mb-2 shrink-0">
        <div className="absolute -inset-0.5 rounded-full bg-brand-gold/40 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 blur-[2px]" />
        <div className="relative flex size-12 items-center justify-center rounded-full border border-brand-gold/60 bg-brand-dark font-display text-xs font-bold tracking-wider text-brand-gold shadow-md">
          {initials}
        </div>
      </div>
      <span className="font-display text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-brand-gold text-center">
        {role}
      </span>
      {name && (
        <span className="font-sans text-sm md:text-[15px] font-medium text-white mt-1 text-center max-w-[140px] leading-snug">
          {name}
        </span>
      )}
    </div>
  )
}

const VertLine = ({ h = 'h-10' }: { h?: string }) => (
  <div className={`w-px ${h} bg-white/20`} />
)

const TEAM = [
  {
    src: '/media/pengurus/ketua.jpeg',
    name: 'Farhan Muhammad M99',
    role: 'Ketua Umum',
  },
  {
    src: '/media/pengurus/sekretaris_jenderal.jpeg',
    name: 'Tri Aghna Satriya M08',
    role: 'Sekretaris Jenderal',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Andini+Aritonang&background=0A1628&color=C9A84C&size=400',
    name: 'Andini Aritonang M99',
    role: 'Bendahara',
  },
  {
    src: 'https://ui-avatars.com/api/?name=M.+Faiz+Habibi&background=0A1628&color=C9A84C&size=400',
    name: 'M. Faiz Habibi M19',
    role: 'Ketua Bidang Hobi',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Ilman+Nuran+Zaini&background=0A1628&color=C9A84C&size=400',
    name: 'Ilman Nuran Zaini M08',
    role: 'Ketua Bidang Beasiswa & Kampus',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Gumilang+Dewananta&background=0A1628&color=C9A84C&size=400',
    name: 'Gumilang Dewananta M05',
    role: 'Ketua Bidang Keanggotaan & Wirausaha',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Ridho+Fidiantowi&background=0A1628&color=C9A84C&size=400',
    name: 'Ridho Fidiantowi M11',
    role: 'Ketua Bidang Produk Identitas',
  },
]

export default function OrganisasiPage() {
  return (
    <PageShell>
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Organisasi" subtitle="Ikatan Alumni Mesin ITB" />
        </ScrollReveal>
      </Section>

      {/* Kata Pengantar — editorial split, no card chrome */}
      <Section className="z-10 pt-0 pb-12 md:pt-0 md:pb-20">
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-0 lg:gap-y-0">
            <div className="flex flex-col items-center lg:col-span-3 lg:items-end lg:pr-7">
              <div className="relative w-full max-w-[200px] sm:max-w-[220px] lg:w-[220px] lg:max-w-none lg:shrink-0">
                <div className="absolute -inset-2 rounded-lg border border-brand-gold/30 -rotate-2 pointer-events-none" />
                <div
                  className="absolute -left-3 top-0 hidden h-30 w-px bg-brand-red/35 lg:block"
                  aria-hidden
                />
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-md border border-brand-primary shadow-lg bg-brand-primary/5">
                  <Image
                    src={FOREWORD_AVATAR}
                    alt="Ketua IAM ITB"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 200px, 220px"
                    priority
                  />
                </div>
                <div className="mt-7 border-t border-brand-dark/15 pt-6">
                  <Text tone="strong" className="font-serif text-xl font-bold tracking-tight sm:text-[1.35rem]">
                    Farhan Muhammad
                  </Text>
                  <Eyebrow tone="muted" className="mt-2 tracking-[0.2em]">
                    Ketua IAM ITB
                  </Eyebrow>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-9 lg:border-l lg:border-brand-dark/12 lg:pl-8 lg:pr-2 lg:pt-1 xl:pl-10">
              <div className="absolute -top-6 left-4 select-none font-serif text-[120px] font-bold leading-none text-brand-primary/5 pointer-events-none lg:-top-10 lg:left-6">
                “
              </div>
              <Eyebrow tone="red">Pembukaan</Eyebrow>
              <Heading level={2} className="mt-3 mb-7 md:mb-8">
                Kata Pengantar
              </Heading>
              <div className="flex flex-col gap-6 max-w-prose mx-auto lg:mx-0 relative z-10">
                <Text variant="editorial" className="leading-loose italic text-brand-dark/90">{PLACEHOLDER_BODY}</Text>
                <Text variant="editorial" className="leading-loose text-brand-dark/85">{PLACEHOLDER_BODY}</Text>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Visi dan Misi — dark band: gold accents read better on navy than red */}
      <Section className="relative z-10 py-20 md:py-28">
        <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-brand-primary to-brand-dark -z-10" />
        <ScrollReveal className="max-w-2xl">
          <Eyebrow tone="gold">Arah organisasi</Eyebrow>
          <Heading level={2} tone="inverse" className="mt-3">
            Visi dan Misi
          </Heading>
          <Text variant="editorial" tone="accent" className="mt-4 font-display font-medium">
            Lorem Ipsum Dolor Sit Amet
          </Text>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-white/15 pt-12 lg:grid-cols-2 lg:gap-0 lg:border-t-0 lg:pt-0">
          {[
            {
              title: 'Visi',
              icon: Lightbulb,
              body: PLACEHOLDER_BODY,
            },
            {
              title: 'Misi',
              icon: Handshake,
              body: PLACEHOLDER_BODY,
            },
          ].map((item, idx) => (
            <ScrollReveal key={item.title}>
              <div
                className={
                  idx === 1 ? 'lg:border-l lg:border-white/15 lg:pl-12 xl:pl-16' : 'lg:pr-8'
                }
              >
                <div className="flex items-baseline gap-3">
                  <item.icon
                    className="size-5 shrink-0 text-brand-gold"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <Heading level={2} tone="inverse" className="text-3xl md:text-4xl">{item.title}</Heading>
                </div>
                <div className="mt-6 h-px w-12 bg-brand-gold/55" />
                <Text variant="editorial" tone="inverse" className="mt-6 max-w-prose text-white/72 leading-loose">
                  {item.body}
                </Text>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Latar Belakang — text + logo as figure, no frame */}
      <Section className="z-10">
        <ScrollReveal>
          <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
            <div className="max-w-xl lg:max-w-[52%]">
              <Heading level={2} className="mb-8">
                Latar Belakang
              </Heading>
              <div className="flex flex-col gap-6 max-w-prose mx-auto lg:mx-0">
                <Text variant="editorial" className="leading-loose">
                  Sejarah pendirian Ikatan Alumni Mesin Institut Teknologi Bandung (IAM ITB) berakar dari keinginan mendalam untuk membangun wadah pemersatu bagi para lulusan Teknik Mesin ITB dari seluruh generasi. Seiring perkembangan industri nasional, kebutuhan akan sebuah jaringan profesional yang solid dan terorganisir menjadi semakin mendesak. Berangkat dari kesadaran kolektif tersebut, wadah berbadan hukum ini didirikan untuk merawat serta mengukuhkan semangat kekeluargaan korps &ldquo;Solidarity Forever&rdquo;. Filosofi kebersamaan yang tangguh ini tidak hanya hidup di masa perkuliahan, melainkan terus dibawa ke dunia nyata, menjadi pemandu bagi para alumni untuk saling mendukung dan berkolaborasi.
                </Text>
                <Text variant="editorial" className="leading-loose">
                  Perkembangan organisasi ini berjalan beriringan dengan meluasnya kiprah alumni di ranah profesional. Anggota IAM ITB kini tersebar luas di berbagai sektor penggerak ekonomi bangsa—mulai dari industri manufaktur skala besar, ketahanan energi nasional, eksplorasi minyak dan gas bumi, inovasi otomotif, hingga lingkup birokrasi pemerintahan dan akademisi. Dengan portofolio keahlian yang beragam, organisasi ini menjelma menjadi kekuatan strategis yang aktif mendorong inovasi teknologi melalui penyelenggaraan forum bisnis, sertifikasi kompetensi, dan pelatihan berkelanjutan. Sinergi ini memastikan bahwa ikatan alumni tidak hanya menjadi ruang nostalgia, tetapi juga pendorong utama daya saing global.
                </Text>
                <Text variant="editorial" className="leading-loose">
                  Komitmen kontributif senantiasa menjadi pilar utama dalam gerak langkah IAM ITB. Keberadaan organisasi ini didedikasikan untuk terus memberikan dampak positif bagi Himpunan Mahasiswa Mesin (HMM ITB) dan program studi melalui penyediaan fasilitas laboratorium modern, bantuan beasiswa, serta bimbingan karier. Di sisi lain, sumbangsih eksternal diwujudkan melalui rekayasa teknologi tepat guna untuk masyarakat, aksi tanggap sosial, serta kontribusi pemikiran strategis dalam mengawal kemandirian teknologi dan pembangunan infrastruktur nasional. Melalui landasan sejarah dan tujuan mulia ini, IAM ITB terus melangkah maju untuk membawa kejayaan bagi almamater, bangsa, dan negara.
                </Text>
              </div>
            </div>
            <div className="relative flex flex-1 justify-center lg:justify-end lg:pr-8">
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-brand-primary/5 blur-3xl" aria-hidden />
              <div className="relative w-full max-w-[160px] opacity-[0.92] lg:max-w-[200px]">
                <div className="relative aspect-square">
                  <Image
                    src="/logo.png"
                    alt="Lambang IAM ITB"
                    fill
                    className="object-contain drop-shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Organogram Tree Section */}
      <section id="kepengurusan" className="relative z-10 mb-4 md:mb-6 overflow-hidden">
        <div className="relative border-y border-white/10 bg-linear-to-b from-brand-primary via-brand-dark to-[#03060c]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          
          <div className="container relative z-10 pt-8 pb-4 md:pt-12 md:pb-6">
            <ScrollReveal>
              <div className="flex flex-col">
                <div className="absolute top-6 left-4 right-4 md:top-8 md:left-8 md:right-8 flex items-start justify-between gap-6 z-20">
                  <div className="relative h-11 w-11 md:h-14 md:w-14 shrink-0">
                    <Image src="/logo.png" alt="Logo IAM ITB" fill className="object-contain opacity-95" />
                  </div>
                  <div className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold mt-2">
                    Struktur Organisasi
                  </div>
                </div>

                <div className="w-full overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="min-w-[800px] flex flex-col items-center">
                    
                    {/* Level 0: Dewan Penasihat */}
                    <OrgNode role="Dewan Penasihat" name="" customInitials="DP" />
                    
                    <VertLine h="h-10" />

                    {/* Level 1: Ketua Umum & Dewan Pakar */}
                    <div className="relative flex flex-col items-center w-full">
                      <OrgNode role="Ketua Umum" name="Farhan Muhammad M99" />
                      
                      <VertLine h="h-16" />
                      
                      {/* Dewan Pakar branch to the right of the vertical trunk line */}
                      <div className="absolute left-1/2 top-[32px] flex items-center -translate-y-1/2">
                        <div className="w-16 h-px bg-white/20" />
                        <OrgNode role="Dewan Pakar" name="" customInitials="DP" />
                      </div>
                    </div>

                    {/* Level 2: Sekretaris Jenderal & Bendahara */}
                    <div className="relative flex justify-center w-[460px]">
                      <div className="absolute top-0 left-[20%] right-[20%] h-px bg-white/20" />
                      
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-px h-4 bg-white/20" />
                        <OrgNode role="Sekretaris Jenderal" name="Tri Aghna Satriya M08" />
                      </div>
                      
                      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 -translate-x-1/2" />

                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-px h-4 bg-white/20" />
                        <OrgNode role="Bendahara" name="Andini Aritonang M99" />
                      </div>
                    </div>

                    <VertLine h="h-10" />

                    {/* Level 3: Wakil Ketua Umum */}
                    <OrgNode role="Wakil Ketua Umum" name="" customInitials="WK" />

                    <VertLine h="h-12" />

                    {/* Level 4: Bidang / Departements */}
                    <div className="relative flex justify-center w-full max-w-4xl">
                      <div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-white/20" />
                      
                      {[
                        { role: 'Ketua Bidang Hobi', name: 'M. Faiz Habibi M19' },
                        { role: 'Ketua Bidang Beasiswa & Kampus', name: 'Ilman Nuran Zaini M08' },
                        { role: 'Ketua Bidang Keanggotaan & Wirausaha', name: 'Gumilang Dewananta M05' },
                        { role: 'Ketua Bidang Produk Identitas', name: 'Ridho Fidiantowi M11' }
                      ].map((bidang, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="w-px h-4 bg-white/20" />
                          <OrgNode role={bidang.role} name={bidang.name} />
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dewan dan Bidang Kerja — light background */}
      <Section className="z-10 !pt-16 pb-12 md:pb-16">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-red">
              Struktur kerja
            </span>
            <Heading level={2} className="mt-3">
              Dewan dan Bidang Kerja
            </Heading>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <KepengurusanBoard />
        </ScrollReveal>
      </Section>

      {/* Tim Pengurus — light background, portrait grid */}
      <Section className="z-10 border-t border-brand-dark/10 pb-20 pt-16 md:pt-20">
        <ScrollReveal>
          <div className="mb-12 text-center md:text-left">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-red">
              Tim
            </span>
            <Heading level={2} className="mt-3">
              Pengurus
            </Heading>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-14">
          {TEAM.map((member) => (
            <ScrollReveal key={member.name} className="w-full sm:w-[calc(50%-20px)] lg:w-[calc(25%-30px)] max-w-[280px]">
              <div className="group block cursor-default">
                <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-brand-khaki shadow-md">
                  <Image
                    src={member.src}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="mt-4 transition-transform duration-500 ease-out group-hover:-translate-y-1 text-center md:text-left">
                  <p className="font-serif text-lg font-bold text-brand-dark">{member.name}</p>
                  <p className="mt-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">
                    {member.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Profil Ketua Sebelumnya — full-bleed navy tone */}
      <section className="relative z-10 bg-brand-primary py-16 md:py-24 text-white">
        <div className="absolute inset-0 bg-linear-to-b from-brand-dark/30 to-brand-primary/95 pointer-events-none -z-10" />
        <div className="container">
          <ScrollReveal className="mb-12 text-center lg:text-left">
            <ParagraphEyebrow />
          </ScrollReveal>

          <ul className="divide-y divide-white/10 border-y border-white/10">
            {PREVIOUS_CHAIR_ENTRIES.map((chair) => (
              <li key={chair.slug}>
                <ScrollReveal>
                  <Link
                    href={`/organisasi/ketua-sebelumnya/${chair.slug}`}
                    aria-label={`Lihat profil ${chair.name}, ${chair.periodLabel}`}
                    className="group relative flex flex-col gap-3 py-6 transition-colors duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40 focus-visible:ring-offset-2 sm:flex-row sm:items-center sm:justify-between sm:gap-8 md:py-7"
                  >
                    <div className="flex items-center gap-4">
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 sm:size-14">
                        <Image
                          src={chair.portraitSrc}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </span>
                      <div>
                        <Text variant="body" tone="inverse" className="font-display text-base font-semibold transition-colors duration-300 group-hover:text-brand-gold">
                          {chair.name}
                        </Text>
                        <Eyebrow tone="gold" className="mt-0.5 tracking-[0.18em] opacity-80 group-hover:opacity-100">
                          {chair.majorLabel}
                        </Eyebrow>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Text variant="small" tone="inverse" className="font-display text-white/70 tabular-nums transition-colors duration-300 group-hover:text-white sm:text-right">
                        {chair.periodLabel}
                      </Text>
                      <ChevronRight
                        className="size-4 shrink-0 text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-gold"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </div>
                  </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  )
}

function ParagraphEyebrow() {
  return (
    <>
      <Eyebrow tone="gold">Jejak kepemimpinan</Eyebrow>
      <Heading level={2} tone="inverse" className="mt-3">
        Profil Ketua Sebelumnya
      </Heading>
    </>
  )
}
