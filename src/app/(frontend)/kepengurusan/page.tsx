import Image from 'next/image'
import type { Metadata } from 'next'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/typography'
import { KepengurusanBoard } from './KepengurusanBoard'

export const metadata: Metadata = {
  title: 'Kepengurusan',
  description: 'Organogram dan struktur kepengurusan IAM ITB.',
}

const OrgNode = ({ role, name }: { role: string; name: string }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

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
      <span className="font-sans text-sm md:text-[15px] font-medium text-white mt-1 text-center max-w-[140px] leading-snug">
        {name}
      </span>
    </div>
  )
}

const VertLine = ({ h = 'h-10' }: { h?: string }) => (
  <div className={`w-px ${h} bg-white/20`} />
)

const TEAM = [
  {
    src: 'https://ui-avatars.com/api/?name=Bagus+Setyawan&background=0A1628&color=C9A84C&size=400',
    name: 'Bagus Setyawan',
    role: 'Ketua Umum',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Rina+Kusuma&background=0A1628&color=C9A84C&size=400',
    name: 'Rina Kusuma',
    role: 'Wakil Ketua 1',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Tirta+Wijaya&background=0A1628&color=C9A84C&size=400',
    name: 'Tirta Wijaya',
    role: 'Wakil Ketua 2',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Dina+Mariana&background=0A1628&color=C9A84C&size=400',
    name: 'Dina Mariana',
    role: 'Sekretaris Umum',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Fajar+Hidayat&background=0A1628&color=C9A84C&size=400',
    name: 'Fajar Hidayat',
    role: 'Bendahara Umum',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Dimas+Anggara&background=0A1628&color=C9A84C&size=400',
    name: 'Dimas Anggara',
    role: 'Koordinator Internal',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Siti+Nurbaya&background=0A1628&color=C9A84C&size=400',
    name: 'Siti Nurbaya',
    role: 'Koordinator Eksternal',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Reza+Fahlevi&background=0A1628&color=C9A84C&size=400',
    name: 'Reza Fahlevi',
    role: 'Koordinator Aktivitas',
  },
]

export default function KepengurusanPage() {
  return (
    <PageShell>
      <Section className="z-10 pb-8 pt-3 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Organogram" subtitle="Kepengurusan IAM ITB" />
        </ScrollReveal>
      </Section>

      {/* Organogram Tree Section */}
      <section className="relative z-10 mb-16 md:mb-20 overflow-hidden">
        <div className="relative border-y border-white/10 bg-linear-to-b from-brand-primary via-brand-dark to-[#03060c]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          
          <div className="container relative z-10 py-14 md:py-20">
            <ScrollReveal>
              <div className="flex flex-col">
                <div className="flex items-start justify-between gap-6 pb-12">
                  <div className="relative h-11 w-11 md:h-14 md:w-14 shrink-0">
                    <Image src="/logo.png" alt="Logo IAM ITB" fill className="object-contain opacity-95" />
                  </div>
                  <div className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold mt-2">
                    Struktur
                  </div>
                </div>

                <div className="w-full overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="min-w-[800px] flex flex-col items-center">
                    
                    {/* 1. KETUA */}
                    <OrgNode role="Ketua Umum" name="Adi Haditya Nursyam" />
                    
                    <VertLine h="h-10" />

                    {/* 2. WAKIL KETUA */}
                    <div className="relative flex justify-center w-[460px]">
                      <div className="absolute top-0 left-[20%] right-[20%] h-px bg-white/20" />
                      
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-px h-4 bg-white/20" />
                        <OrgNode role="Wakil Ketua Internal" name="Budi Santoso" />
                      </div>
                      
                      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 -translate-x-1/2" />

                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-px h-4 bg-white/20" />
                        <OrgNode role="Wakil Ketua Eksternal" name="Diana Putri" />
                      </div>
                    </div>

                    <VertLine h="h-10" />

                    {/* 3. SEK & BEN */}
                    <div className="relative flex justify-center w-[660px]">
                      <div className="absolute top-0 left-[20%] right-[20%] h-px bg-white/20" />
                      
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-px h-4 bg-white/20" />
                        <OrgNode role="Sekretaris Umum" name="Citra Lestari" />
                      </div>

                      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 -translate-x-1/2" />

                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-px h-4 bg-white/20" />
                        <OrgNode role="Bendahara Umum" name="Dedi Kurniawan" />
                      </div>
                    </div>

                    <VertLine h="h-12" />

                    {/* 4. DEWANS */}
                    <div className="relative flex justify-center w-full max-w-4xl">
                      <div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-white/20" />
                      
                      {['A', 'B', 'C', 'D'].map((d) => (
                        <div key={d} className="flex-1 flex flex-col items-center">
                          <div className="w-px h-4 bg-white/20" />
                          <OrgNode role={`Dewan ${d}`} name={`Ketua Dewan ${d}`} />
                          
                          <div className="w-px h-6 bg-white/20" />
                          <div className="relative w-full max-w-[160px] flex flex-col gap-4 py-2">
                            <div className="absolute top-0 bottom-4 left-4 w-px bg-white/20" />
                            
                            {[1, 2, 3, 4].map((b) => (
                              <div key={b} className="relative flex items-center pl-8 text-left group cursor-default">
                                <div className="absolute left-4 top-1/2 w-3 h-px bg-white/20 transition-colors group-hover:bg-brand-gold/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 mr-3 shrink-0 transition-transform group-hover:scale-125" />
                                <span className="font-sans text-[13px] font-medium text-white/80 transition-colors group-hover:text-white">
                                  Bidang {b}
                                </span>
                              </div>
                            ))}
                          </div>
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

      <Section className="z-10 pt-0">
        <ScrollReveal>
          <div className="mb-12 text-center">
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
    </PageShell>
  )
}
