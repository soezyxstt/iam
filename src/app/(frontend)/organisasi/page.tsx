import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Handshake, Lightbulb } from 'lucide-react'
import type { Metadata } from 'next'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { OrganizationProfile } from '@/payload-types'

import { KepengurusanBoard, type OrgMember } from './KepengurusanBoard'

export const metadata: Metadata = {
  title: 'Organisasi',
  description:
    'Profil, visi misi, latar belakang, dan struktur kepengurusan Ikatan Alumni Mesin ITB — IAM ITB.',
}

export const revalidate = 600

type IamPresident = {
  id: number | string
  name: string
  slug: string
  period: string
  majorLabel?: string | null
  portraitImage?: { url?: string } | null
}

/* ─── OrgNode: same circular style as original ────────────────────────── */
const OrgNode = ({
  role,
  name,
  customInitials,
  linkedIn,
}: {
  role: string
  name?: string
  customInitials?: string
  linkedIn?: string | null
}) => {
  const initials =
    customInitials ||
    (name
      ? name.split(' ').map((n) => n[0] || '').slice(0, 2).join('').toUpperCase()
      : '?')
  return (
    <div className="flex flex-col items-center relative z-10 group shrink-0">
      <div className="relative mb-2 shrink-0">
        <div className="absolute -inset-0.5 rounded-full bg-brand-gold/40 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 blur-[2px]" />
        {linkedIn ? (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex size-12 items-center justify-center rounded-full border border-brand-gold/60 bg-brand-dark font-display text-xs font-bold tracking-wider text-brand-gold shadow-md hover:border-brand-gold hover:text-white transition-all duration-300"
          >
            {initials}
          </a>
        ) : (
          <div className="relative flex size-12 items-center justify-center rounded-full border border-brand-gold/60 bg-brand-dark font-display text-xs font-bold tracking-wider text-brand-gold shadow-md">
            {initials}
          </div>
        )}
      </div>
      <span className="font-display text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-brand-gold text-center leading-tight">
        {role}
      </span>
      {name && (
        linkedIn ? (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[13px] font-medium text-white mt-1 text-center w-[140px] leading-snug hover:text-brand-gold hover:underline transition-colors duration-200"
          >
            {name}
          </a>
        ) : (
          <span className="font-sans text-[13px] font-medium text-white mt-1 text-center w-[140px] leading-snug">
            {name}
          </span>
        )
      )}
    </div>
  )
}

const VertLine = ({ h = 'h-10' }: { h?: string }) => (
  <div className={`w-px ${h} bg-white/20 shrink-0`} />
)

const HorizLine = ({ w = 'w-10' }: { w?: string }) => (
  <div className={`h-px ${w} bg-white/20 shrink-0`} />
)

export default async function OrganisasiPage() {
  const payload = await getPayload({ config: configPromise })

  const [orgProfileRaw, presidentsResult, membersResult] = await Promise.all([
    getCachedGlobal('organizationProfile', 2)(),
    payload.find({ collection: 'iamPresidents', overrideAccess: false, limit: 50, depth: 1 }),
    payload.find({
      collection: 'orgMembers',
      overrideAccess: false,
      limit: 100,
      depth: 1,
      sort: 'order',
    }),
  ])

  const orgProfile = orgProfileRaw as OrganizationProfile
  const orgMembers = membersResult.docs as unknown as OrgMember[]

  const mainByLevel = (level: number) =>
    orgMembers
      .filter((m) => m.memberType === 'main' && m.treeLevel === level)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const advisoryMembers = orgMembers.filter((m) => m.memberType === 'advisory')
  const expertMembers = orgMembers.filter((m) => m.memberType === 'expert')

  const mainTeam = orgMembers
    .filter((m) => m.memberType === 'main')
    .sort((a, b) => {
      const lvl = (a.treeLevel ?? 99) - (b.treeLevel ?? 99)
      return lvl !== 0 ? lvl : (a.order ?? 0) - (b.order ?? 0)
    })

  const memberPhotoUrl = (m: OrgMember): string | null => {
    if (m.photo && typeof m.photo === 'object' && 'url' in (m.photo as object)) {
      return (m.photo as { url?: string }).url ?? null
    }
    return null
  }

  const memberAvatarUrl = (m: OrgMember): string => {
    const photo = memberPhotoUrl(m)
    if (photo) return photo
    const encoded = encodeURIComponent(m.name.split('(')[0].trim())
    return `https://ui-avatars.com/api/?name=${encoded}&background=0A1628&color=C9A84C&size=400`
  }

  const currentChairmanId =
    typeof orgProfile.currentChairman === 'object' && orgProfile.currentChairman !== null
      ? (orgProfile.currentChairman as { id: number | string }).id
      : orgProfile.currentChairman

  const currentChairman =
    typeof orgProfile.currentChairman === 'object' && orgProfile.currentChairman !== null
      ? (orgProfile.currentChairman as IamPresident)
      : null

  const chairPortrait =
    currentChairman &&
    typeof currentChairman.portraitImage === 'object' &&
    currentChairman.portraitImage !== null
      ? (currentChairman.portraitImage as { url?: string })
      : null

  const previousChairs = presidentsResult.docs.filter(
    (p) => String(p.id) !== String(currentChairmanId),
  ) as unknown as IamPresident[]

  const historyBrief = (orgProfile as unknown as Record<string, unknown>).historyBrief as
    | string
    | null
    | undefined

  /* Organogram nodes from CMS */
  const level1 = mainByLevel(1)
  const level2 = mainByLevel(2)
  const level3 = mainByLevel(3)
  const level4 = mainByLevel(4)
  const ketuaUmum = level1[0]
  const displayChairName = ketuaUmum?.name ?? currentChairman?.name ?? '—'
  const displayChairPhotoUrl = (ketuaUmum ? memberPhotoUrl(ketuaUmum) : null) ?? chairPortrait?.url

  return (
    <PageShell>
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Organisasi" subtitle="Ikatan Alumni Mesin ITB" />
        </ScrollReveal>
      </Section>

      {/* Kata Pengantar */}
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
                  {displayChairPhotoUrl ? (
                    <Image
                      src={displayChairPhotoUrl}
                      alt={displayChairName}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 200px, 220px"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-primary/10">
                      <span className="font-display text-4xl font-bold text-brand-primary/30">
                        {displayChairName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-7 border-t border-brand-dark/15 pt-6">
                  <Text
                    tone="strong"
                    className="font-serif text-xl font-bold tracking-tight sm:text-[1.35rem]"
                  >
                    {displayChairName}
                  </Text>
                  <Eyebrow tone="muted" className="mt-2 tracking-[0.2em]">
                    Ketua IAM ITB
                  </Eyebrow>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-9 lg:border-l lg:border-brand-dark/12 lg:pl-8 lg:pr-2 lg:pt-1 xl:pl-10">
              <div className="absolute -top-6 left-4 select-none font-serif text-[120px] font-bold leading-none text-brand-primary/5 pointer-events-none lg:-top-10 lg:left-6">
                &ldquo;
              </div>
              <Eyebrow tone="red">Pembukaan</Eyebrow>
              <Heading level={2} className="mt-3 mb-7 md:mb-8">
                Kata Pengantar
              </Heading>
              <div className="flex flex-col gap-6 max-w-prose mx-auto lg:mx-0 relative z-10">
                {orgProfile.chairmanForeword ? (
                  <RichText data={orgProfile.chairmanForeword} enableGutter={false} />
                ) : (
                  <Text variant="editorial" tone="muted" className="italic">
                    Kata pengantar belum tersedia.
                  </Text>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Visi dan Misi */}
      <Section className="relative z-10 py-20 md:py-28">
        <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-brand-primary to-brand-dark -z-10" />
        <ScrollReveal className="max-w-2xl">
          <Eyebrow tone="gold">Arah organisasi</Eyebrow>
          <Heading level={2} tone="inverse" className="mt-3">
            Visi dan Misi
          </Heading>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-white/15 pt-12 lg:grid-cols-2 lg:gap-0 lg:border-t-0 lg:pt-0">
          {[
            { title: 'Visi', icon: Lightbulb, content: orgProfile.vision },
            { title: 'Misi', icon: Handshake, content: orgProfile.mission },
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
                  <Heading level={2} tone="inverse" className="text-3xl md:text-4xl">
                    {item.title}
                  </Heading>
                </div>
                <div className="mt-6 h-px w-12 bg-brand-gold/55" />
                <div className="mt-6 max-w-prose text-white/72 leading-loose">
                  {item.content ? (
                    <RichText data={item.content} enableGutter={false} />
                  ) : (
                    <Text variant="editorial" tone="inverse" className="text-white/40 italic">
                      Belum tersedia.
                    </Text>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Latar Belakang */}
      <Section className="z-10">
        <ScrollReveal>
          <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
            <div className="max-w-xl lg:max-w-[52%]">
              <Heading level={2} className="mb-8">
                Latar Belakang
              </Heading>
              <div className="flex flex-col gap-6 max-w-prose mx-auto lg:mx-0">
                {historyBrief ? (
                  historyBrief.split('\n\n').map((para, i) => (
                    <Text key={i} variant="editorial" className="leading-loose">
                      {para}
                    </Text>
                  ))
                ) : (
                  <>
                    <Text variant="editorial" className="leading-loose">
                      Sejarah pendirian Ikatan Alumni Mesin Institut Teknologi Bandung (IAM ITB)
                      berakar dari keinginan mendalam untuk membangun wadah pemersatu bagi para
                      lulusan Teknik Mesin ITB dari seluruh generasi. Seiring perkembangan industri
                      nasional, kebutuhan akan sebuah jaringan profesional yang solid dan terorganisir
                      menjadi semakin mendesak. Berangkat dari kesadaran kolektif tersebut, wadah
                      berbadan hukum ini didirikan untuk merawat serta mengukuhkan semangat kekeluargaan
                      korps &ldquo;Solidarity Forever&rdquo;.
                    </Text>
                    <Text variant="editorial" className="leading-loose">
                      Perkembangan organisasi ini berjalan beriringan dengan meluasnya kiprah alumni
                      di ranah profesional. Anggota IAM ITB kini tersebar luas di berbagai sektor
                      penggerak ekonomi bangsa—mulai dari industri manufaktur skala besar, ketahanan
                      energi nasional, eksplorasi minyak dan gas bumi, inovasi otomotif, hingga
                      lingkup birokrasi pemerintahan dan akademisi.
                    </Text>
                    <Text variant="editorial" className="leading-loose">
                      Komitmen kontributif senantiasa menjadi pilar utama dalam gerak langkah IAM ITB.
                      Keberadaan organisasi ini didedikasikan untuk terus memberikan dampak positif
                      bagi HMM ITB dan program studi melalui penyediaan fasilitas laboratorium modern,
                      bantuan beasiswa, serta bimbingan karier.
                    </Text>
                  </>
                )}
              </div>
            </div>
            <div className="relative flex flex-1 justify-center lg:justify-end lg:pr-8">
              <div
                className="pointer-events-none absolute -inset-10 rounded-full bg-brand-primary/5 blur-3xl"
                aria-hidden
              />
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

      {/* Organogram Tree */}
      <section id="kepengurusan" className="relative z-10 mb-4 md:mb-6 overflow-hidden">
        <div className="relative border-y border-white/10 bg-linear-to-b from-brand-primary via-brand-dark to-[#03060c]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />

          <div className="container relative z-10 py-12 md:py-16">
            <ScrollReveal>
              {/* Header */}
              <div className="mb-10 text-center flex flex-col items-center">
                <Eyebrow tone="gold" className="text-[10px] tracking-[0.35em] opacity-60">
                  Struktur Organisasi
                </Eyebrow>
                <Heading level={2} tone="inverse" className="mt-2">
                  Organogram Kepengurusan
                </Heading>
                <Eyebrow tone="muted" className="mt-1 text-xs text-white/40 tracking-widest normal-case">
                  Ikatan Alumni Mesin ITB
                </Eyebrow>
              </div>

              <div className="w-full overflow-x-auto pb-6 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-white/10">
                <div className="min-w-[1000px] flex flex-col items-center">

                  {/* ① Penasihat */}
                  <OrgNode
                    role="Dewan Penasihat"
                    name={advisoryMembers.length > 0 ? `${advisoryMembers.length} Anggota` : undefined}
                    customInitials="DP"
                  />
                  <VertLine />

                  {/* ② KU tetap di tengah; Pakar absolute agar tidak menggeser KU */}
                  <div className="relative flex justify-center">
                    <OrgNode role="Ketua Umum" name={ketuaUmum?.name} linkedIn={ketuaUmum?.linkedIn} />
                    {expertMembers.length > 0 && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center pl-2">
                        <HorizLine w="w-14" />
                        <OrgNode
                          role="Dewan Pakar"
                          name={`${expertMembers.length} Anggota`}
                          customInitials="DP"
                        />
                      </div>
                    )}
                  </div>

                  {/*
                    ③ Staf samping — grid 3 kolom: [kiri | 2px batang | kanan]
                       Batang lebar 2px di tengah; item kiri/kanan pakai items-center
                       agar garis horizontal (h-px) sejajar dengan pusat node.
                       Container fixed 960px → pusat batang = 480px = pusat flex column.
                  */}
                  {/* Row A — SekJen | trunk | Bendahara */}
                  <div style={{ width: '960px' }}>
                    {level2.length > 0 && (
                      <div className="grid grid-cols-[1fr_2px_1fr]">
                        <div className="flex items-center justify-end gap-0 py-8">
                          {level2[0] && (
                            <OrgNode
                              role={level2[0].position ?? ''}
                              name={level2[0].name}
                              linkedIn={level2[0].linkedIn}
                            />
                          )}
                          <div className="h-px w-10 bg-white/20 shrink-0" />
                        </div>
                        <div className="bg-white/20" />
                        <div className="flex items-center justify-start gap-0 py-8">
                          <div className="h-px w-10 bg-white/20 shrink-0" />
                          {level2[1] && (
                            <OrgNode
                              role={level2[1].position ?? ''}
                              name={level2[1].name}
                              linkedIn={level2[1].linkedIn}
                            />
                          )}
                         </div>
                       </div>
                     )}
                   </div>

                  {/* Row B — WKU: trunk → kanan (horisontal) → bawah (vertikal) → WKU I → fan ke III (kiri) dan II (kanan)
                      Semua 3 WKU selevel. Connector: w-full dengan flex-1/flex-1 split sehingga garis horisontal
                      hanya di kiri-cell dan berakhir tepat di WKU I (center right-cell via items-center).
                      Node width w-32 (128px) gap-8 (32px): 3×128+2×32=448px < 479px right-cell ✓
                      inset-x-16 (64px = w-32/2): bar dari WKU III center ke WKU II center ✓ */}
                  {level3.length > 0 && (
                    <div className="grid grid-cols-[1fr_2px_1fr]" style={{ width: '960px' }}>
                      {/* Kiri: kosong, trunk lewat */}
                      <div className="py-10" />
                      {/* Trunk */}
                      <div className="bg-white/20" />
                      {/* Kanan: L-shape connector + fan-out selevel */}
                      <div className="flex flex-col items-center py-10">
                        {/* Horisontal dari trunk (left edge) ke WKU I center (50% cell) */}
                        <div className="w-full flex">
                           <div className="flex-1 h-px bg-white/20" />
                           <div className="flex-1" />
                        </div>
                        {/* Vertikal turun ke bar fan-out */}
                        <div className="w-px h-8 bg-white/20" />
                        {/* Fan-out: WKU III kiri | WKU I tengah | WKU II kanan — selevel */}
                        <div className="relative inline-flex items-start gap-8">
                          <div className="absolute top-0 inset-x-16 h-px bg-white/20" />
                          {[level3[2], level3[0], level3[1]].filter(Boolean).map((m) => (
                            <div key={m!.id} className="flex flex-col items-center w-32">
                              <VertLine h="h-4" />
                              <OrgNode role={m!.position ?? ''} name={m!.name} linkedIn={m!.linkedIn} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <VertLine />

                  {/* ④ Ketua Bidang — fan-out dari batang utama
                      inline-flex wrapper agar inset-x tepat menghitung dari tepi node
                      (bukan dari tepi flex container induk).
                  */}
                  {level4.length > 0 && (
                    <div className="flex justify-center">
                      <div className="relative inline-flex items-start gap-8">
                        {/* horizontal bar: mulai dari pusat node pertama ke pusat node terakhir */}
                        <div className="absolute top-0 h-px bg-white/20 inset-x-16" />
                        {level4.map((m) => (
                          <div key={m.id} className="flex flex-col items-center w-32">
                            <VertLine h="h-4" />
                            <OrgNode role={m.position ?? ''} name={m.name} linkedIn={m.linkedIn} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dewan dan Bidang Kerja */}
      <Section className="z-10 !pt-16 pb-12 md:pb-16">
        <ScrollReveal>
          <div className="mb-8 text-center flex flex-col items-center">
            <Eyebrow tone="red" className="text-[10px] tracking-[0.35em]">
              Struktur kerja
            </Eyebrow>
            <Heading level={2} className="mt-3">
              Dewan dan Bidang Kerja
            </Heading>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <KepengurusanBoard members={orgMembers} />
        </ScrollReveal>
      </Section>

      {/* Tim Pengurus — portrait grid */}
      {mainTeam.length > 0 && (
        <Section className="z-10 border-t border-brand-dark/10 pb-20 pt-16 md:pt-20">
          <ScrollReveal>
            <div className="mb-12 text-center md:text-left flex flex-col items-center md:items-start">
              <Eyebrow tone="red" className="text-[10px] tracking-[0.35em]">
                Tim
              </Eyebrow>
              <Heading level={2} className="mt-3">
                Pengurus
              </Heading>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-14">
            {mainTeam.map((member) => {
              const isLink = !!member.linkedIn
              const Tag = isLink ? 'a' : 'div'
              return (
                <ScrollReveal
                  key={member.id}
                  className="w-full sm:w-[calc(50%-20px)] lg:w-[calc(25%-30px)] max-w-[280px]"
                >
                  <Tag
                    {...(isLink
                      ? {
                          href: member.linkedIn!,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        }
                      : {})}
                    className={cn(
                      'group block transition-transform duration-500 ease-out',
                      isLink ? 'cursor-pointer hover:-translate-y-1' : 'cursor-default',
                    )}
                  >
                    <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-brand-khaki shadow-md">
                      <Image
                        src={memberAvatarUrl(member)}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      <Heading
                        level={4}
                        className={cn(
                          'text-lg font-bold',
                          isLink && 'group-hover:text-brand-red transition-colors duration-200',
                        )}
                      >
                        {member.name}
                      </Heading>
                      <Eyebrow tone="red" className="mt-1 text-[10px] tracking-[0.2em] block">
                        {member.position}
                      </Eyebrow>
                    </div>
                  </Tag>
                </ScrollReveal>
              )
            })}
          </div>
        </Section>
      )}

      {/* Profil Ketua Sebelumnya */}
      {previousChairs.length > 0 && (
        <section className="relative z-10 bg-brand-primary py-16 md:py-24 text-white">
          <div className="absolute inset-0 bg-linear-to-b from-brand-dark/30 to-brand-primary/95 pointer-events-none -z-10" />
          <div className="container">
            <ScrollReveal className="mb-12 text-center lg:text-left">
              <Eyebrow tone="gold">Jejak kepemimpinan</Eyebrow>
              <Heading level={2} tone="inverse" className="mt-3">
                Profil Ketua Sebelumnya
              </Heading>
            </ScrollReveal>

            <ul className="divide-y divide-white/10 border-y border-white/10">
              {previousChairs.map((chair) => {
                const portrait =
                  typeof chair.portraitImage === 'object' && chair.portraitImage !== null
                    ? (chair.portraitImage as { url?: string })
                    : null
                return (
                  <li key={chair.id}>
                    <ScrollReveal>
                      <Link
                        href={`/organisasi/ketua-sebelumnya/${chair.slug}`}
                        aria-label={`Lihat profil ${chair.name}, ${chair.period}`}
                        className="group relative flex flex-col gap-3 py-6 transition-colors duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40 focus-visible:ring-offset-2 sm:flex-row sm:items-center sm:justify-between sm:gap-8 md:py-7"
                      >
                        <div className="flex items-center gap-4">
                          <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 sm:size-14">
                            {portrait?.url ? (
                              <Image
                                src={portrait.url}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <span className="absolute inset-0 flex items-center justify-center bg-brand-dark/60 font-display text-lg font-bold text-white/60">
                                {chair.name.charAt(0)}
                              </span>
                            )}
                          </span>
                          <div>
                            <Text
                              variant="body"
                              tone="inverse"
                              className="font-display text-base font-semibold transition-colors duration-300 group-hover:text-brand-gold"
                            >
                              {chair.name}
                            </Text>
                            {chair.majorLabel && (
                              <Eyebrow
                                tone="gold"
                                className="mt-0.5 tracking-[0.18em] opacity-80 group-hover:opacity-100"
                              >
                                {chair.majorLabel}
                              </Eyebrow>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <Text
                            variant="small"
                            tone="inverse"
                            className="font-display text-white/70 tabular-nums transition-colors duration-300 group-hover:text-white sm:text-right"
                          >
                            {chair.period}
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
                )
              })}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  )
}
