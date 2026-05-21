import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { PageShell } from '@/components/PageShell'
import { Section } from '@/components/ui/section'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import { HeaderThemeDark } from '../HeaderThemeDark'

export const metadata: Metadata = {
  title: 'Solidarity Forever - IAM ITB',
  description:
    'Filosofi, persaudaraan, dan nilai mendalam di balik jargon Solidarity Forever bagi alumni dan mahasiswa Teknik Mesin ITB.',
}

export default function SolidarityForeverPage() {
  return (
    <PageShell
      className="bg-linear-to-b from-[#06162F] via-[#253041] to-[#03060c] min-h-screen relative z-0"
      showAmbient={false}
      darkTheme={true}
    >
      <HeaderThemeDark />

      {/* Background Ambient Glow Blobs - Premium Blue, Gold, and Red styling */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Top left deep blue */}
        <div className="absolute top-[5%] left-[5%] h-[400px] w-[400px] rounded-full bg-brand-primary/20 blur-[120px]" />
        {/* Top right gold */}
        <div className="absolute top-[15%] right-[10%] h-[350px] w-[350px] rounded-full bg-brand-gold/12 blur-[100px]" />
        {/* Mid left brand red */}
        <div className="absolute top-[40%] left-[-5%] h-[380px] w-[380px] rounded-full bg-brand-red-light/15 blur-[110px]" />
        {/* Bottom right gold */}
        <div className="absolute bottom-[20%] right-[5%] h-[450px] w-[400px] rounded-full bg-brand-gold/10 blur-[130px]" />
      </div>

      {/* ── Header Section (Bespoke Editorial layout, no cards) ── */}
      <Section className="z-10 pt-8 pb-10 md:pt-12 md:pb-16">
        <ScrollReveal>
          <div className="flex flex-col gap-6">
            {/* Back link */}
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-white/60 transition-colors hover:text-brand-gold"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-display text-[10px] tracking-widest uppercase">
                Kembali ke Beranda
              </span>
            </Link>

            {/* Accent lines representing solidarity barisan */}
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-brand-red-light" />
              <Eyebrow tone="gold">Identitas &amp; Sumpah Setia</Eyebrow>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-gold/50 via-brand-primary/20 to-transparent" />
            </div>

            <div className="max-w-4xl">
              <h1 className="font-serif text-5xl font-black leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                SOLIDARITY
                <br />
                <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.3)] bg-clip-text bg-gradient-to-r from-brand-gold via-brand-red-light to-brand-gold">
                  FOREVER
                </span>
              </h1>
            </div>

            {/* Giant quote layout - editorial, un-boxed */}
            <div className="mt-8 border-l-4 border-brand-red-light pl-6 md:pl-8 max-w-3xl">
              <p className="font-serif text-xl md:text-2xl lg:text-3xl font-bold italic leading-relaxed text-white">
                &ldquo;Bagi alumni dan mahasiswa Teknik Mesin ITB, jargon &lsquo;Solidarity
                Forever&rsquo; bukan sekadar yel-yel penyemangat biasa. Kalimat ini adalah identitas
                diri, sumpah setia, dan filosofi hidup yang mengikat mereka seumur hidup.&rdquo;
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Intro Section (Two Columns) ── */}
      <Section className="z-10 py-12 md:py-20 border-t border-white/10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <Eyebrow className="text-brand-red-light">Tradisi Kampus</Eyebrow>
              <Heading level={2} tone="inverse" className="text-3xl md:text-4xl text-white">
                Ketika Jargon <span className="text-brand-gold">Diserukan</span>
              </Heading>
              <div className="h-[3px] w-20 bg-brand-gold" />
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Text variant="editorial" tone="inverse" className="text-white/90">
                Ketika diserukan dengan lantang (biasanya sembari merapatkan barisan, merangkul pundak,
                atau mengepalkan tangan ke udara), jargon ini membawa makna mendalam yang mengikat
                setiap insan Teknik Mesin ITB.
              </Text>
              <Text variant="editorial" tone="inverse" className="text-white/80">
                Ikatan ini melampaui masa kuliah, menghubungkan mahasiswa aktif di kampus Ganesha
                dengan jaringan alumni yang tersebar di berbagai belahan dunia dan sektor industri global.
              </Text>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── The 3 Principles Section ── */}
      <Section className="z-10 py-16 md:py-24 border-t border-white/10 bg-black/10">
        <ScrollReveal>
          <div className="mb-16">
            <Eyebrow tone="gold">Tiga Pilar Makna</Eyebrow>
            <Heading level={2} tone="inverse" className="mt-2 text-white">
              Makna Mendalam Solidarity Forever
            </Heading>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Principle 01 */}
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start border-l-2 border-brand-gold pl-6 lg:pl-0 lg:border-l-0">
              <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-4">
                <span className="font-display text-5xl md:text-6xl font-black text-brand-red-light leading-none">
                  01
                </span>
                <span className="font-display text-xs font-bold tracking-widest uppercase text-brand-gold">
                  Brotherhood
                </span>
              </div>
              <div className="lg:col-span-9 flex flex-col gap-4">
                <Heading level={3} tone="inverse" className="text-xl md:text-2xl text-white">
                  Persaudaraan Tanpa Batas Generasi
                </Heading>
                <Text variant="editorial" tone="inverse" className="text-white/80">
                  Dalam kultur Mesin ITB, solidaritas berarti sekali Anda memakai jaket himpunan (jaket
                  korsa berwarna biru tua), Anda adalah saudara selamanya. Ikatan ini mendobrak semua
                  sekat sosial, ekonomi, bahkan usia. Seorang lulusan baru (fresh graduate) tidak akan
                  canggung untuk menyapa seorang CEO atau pejabat tinggi negara yang lulus puluhan tahun
                  lalu, dan mereka akan menyambutnya dengan hangat hanya karena satu ikatan: sama-sama
                  anak &ldquo;Mesin&rdquo;.
                </Text>
              </div>
            </div>
          </ScrollReveal>

          {/* Spacer Line */}
          <div className="h-px bg-white/10" />

          {/* Principle 02 */}
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start border-l-2 border-brand-red-light pl-6 lg:pl-0 lg:border-l-0">
              <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-4">
                <span className="font-display text-5xl md:text-6xl font-black text-brand-gold leading-none">
                  02
                </span>
                <span className="font-display text-xs font-bold tracking-widest uppercase text-brand-red-light">
                  Collective Struggle
                </span>
              </div>
              <div className="lg:col-span-9 flex flex-col gap-4">
                <Heading level={3} tone="inverse" className="text-xl md:text-2xl text-white">
                  Berjuang Bersama, Tidak Ada yang Ditinggalkan
                </Heading>
                <Text variant="editorial" tone="inverse" className="text-white/80">
                  Latar belakang lahirnya jargon ini berakar dari kerasnya dunia perkuliahan di ITB.
                  Menghadapi kurikulum teknik yang padat dan penuh tekanan, mereka sadar bahwa mereka
                  tidak akan bisa bertahan jika berjuang sendirian. &ldquo;Solidarity Forever&rdquo;
                  berarti:
                </Text>

                {/* Subpoints without cards */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4 items-start border-t border-white/15 pt-4">
                    <span className="text-brand-gold text-lg font-bold">✊</span>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                        Akademik
                      </h4>
                      <Text variant="small" tone="inverse" className="text-white/70">
                        Saling bantu dalam akademik: Belajar bersama, berbagi catatan, dan memastikan
                        tidak ada teman yang tertinggal dalam ujian-ujian teknik yang berat.
                      </Text>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start border-t border-white/15 pt-4">
                    <span className="text-brand-red-light text-lg font-bold">❤️</span>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                        Sosial
                      </h4>
                      <Text variant="small" tone="inverse" className="text-white/70">
                        Jaring pengaman sosial: Jika ada mahasiswa yang mengalami kesulitan finansial
                        atau masalah pribadi, komunitas akan bergerak cepat untuk menggalang dana atau
                        memberikan bantuan nyata.
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Spacer Line */}
          <div className="h-px bg-white/10" />

          {/* Principle 03 */}
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start border-l-2 border-brand-gold pl-6 lg:pl-0 lg:border-l-0">
              <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-4">
                <span className="font-display text-5xl md:text-6xl font-black text-brand-red-light leading-none">
                  03
                </span>
                <span className="font-display text-xs font-bold tracking-widest uppercase text-brand-gold">
                  Professionalism
                </span>
              </div>
              <div className="lg:col-span-9 flex flex-col gap-4">
                <Heading level={3} tone="inverse" className="text-xl md:text-2xl text-white">
                  Loyalitas dan Kepercayaan di Dunia Profesional
                </Heading>
                <Text variant="editorial" tone="inverse" className="text-white/80">
                  Di dunia kerja, meneriakkan &ldquo;Solidarity Forever&rdquo; adalah sebuah pengingat
                  akan kode etik yang tidak tertulis. Artinya, sesama alumni Mesin ITB akan saling
                  mendukung di industri, memberikan bimbingan (mentoring), membuka peluang karier,
                  serta menjaga integritas profesional agar tidak merusak nama baik almamater dan
                  korps &ldquo;MS&rdquo; (Mesin).
                </Text>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ── Asal Usul Section (Cardless, full-width styling) ── */}
      <Section className="z-10 py-16 md:py-24 border-t border-white/10 bg-black/20">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto flex flex-col gap-8 text-center items-center">
            <Eyebrow className="text-brand-red-light">Akar Sejarah</Eyebrow>
            <Heading level={2} tone="accent" className="text-3xl md:text-4xl lg:text-5xl">
              Asal-usul Jargon
            </Heading>
            <div className="h-[2px] w-24 bg-brand-red-light" />
            <Text
              variant="lead"
              tone="inverse"
              className="leading-relaxed max-w-3xl font-serif text-white/90 italic"
            >
              &ldquo;Kalimat ini awalnya terinspirasi dari lagu pergerakan serikat buruh Amerika Serikat
              yang diciptakan oleh Ralph Chaplin pada tahun 1915.&rdquo;
            </Text>
            <Text variant="editorial" tone="inverse" className="max-w-3xl text-white/75">
              Namun, oleh mahasiswa Teknik Mesin ITB puluhan tahun lalu, jargon ini diadopsi dan
              dilepaskan dari konteks politiknya, lalu diubah menjadi simbol persaudaraan kampus yang
              murni dan terus dibawa hingga akhir hayat.
            </Text>

            {/* Quick links to navigate to other jargon */}
            <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/seputar-kami/genggam-mesin"
                className="group flex items-center gap-2 text-white/60 transition-colors hover:text-brand-gold"
              >
                <span className="font-display text-[11px] font-bold tracking-widest uppercase">
                  Baca Genggam Mesin
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <div className="hidden sm:block h-4 w-px bg-white/20" />
              <Link
                href="/seputar-kami/september-m"
                className="group flex items-center gap-2 text-white/60 transition-colors hover:text-brand-red-light"
              >
                <span className="font-display text-[11px] font-bold tracking-widest uppercase">
                  Baca September M
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}
