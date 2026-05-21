import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { PageShell } from '@/components/PageShell'
import { Section } from '@/components/ui/section'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import { HeaderThemeDark } from '../HeaderThemeDark'

export const metadata: Metadata = {
  title: 'September M - IAM ITB',
  description:
    'Sejarah September M oleh Ontoseno: cikal bakal semangat inovasi dan kewirausahaan mahasiswa Mesin ITB.',
}

export default function SeptemberMPage() {
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

            {/* Accent lines representing history flow */}
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-brand-red-light" />
              <Eyebrow tone="gold">Sejarah &amp; Warisan Inovasi</Eyebrow>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-gold/50 via-brand-primary/20 to-transparent" />
            </div>

            <div className="max-w-4xl">
              <h1 className="font-serif text-5xl font-black leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                September{' '}
                <span className="text-brand-red-light inline-block font-extrabold relative">
                  M
                  <span className="absolute left-0 bottom-0 w-full h-[4px] bg-brand-gold" />
                </span>
              </h1>
              <p className="mt-4 font-display text-[11px] font-bold tracking-[0.25em] uppercase text-white/70">
                Oleh Ontoseno
              </p>
            </div>

            {/* Subtitle / Lead Paragraph */}
            <div className="mt-8 border-l-4 border-brand-red-light pl-6 md:pl-8 max-w-3xl">
              <Text
                variant="editorial"
                tone="inverse"
                className="text-lg md:text-xl text-white/95 leading-relaxed font-serif italic"
              >
                &ldquo;September-M yang lahir di tahun 1960 - 1970-an, menjadi cikal bakal lahirnya
                semangat inovasi dan kreativitas para mahasiswa Mesin / FTMD.&rdquo;
              </Text>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Content Grid Section (Two Column Newspaper Layout) ── */}
      <Section className="z-10 py-12 md:py-20 border-t border-white/10 bg-black/10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left sidebar info (Metadata, context) */}
            <div className="lg:col-span-4 flex flex-col gap-8 border-l-2 border-brand-gold pl-6 py-2">
              <div className="flex flex-col gap-2">
                <span className="font-display text-[10px] font-bold tracking-widest uppercase text-brand-red-light">
                  Konteks Era
                </span>
                <span className="font-serif text-2xl font-bold text-white">1960 - 1970-an</span>
                <Text variant="small" tone="inverse" className="text-white/75">
                  Masa kebangkitan gerakan mahasiswa dan awal era Orde Baru yang mendorong penerapan
                  praktis teknologi.
                </Text>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-display text-[10px] font-bold tracking-widest uppercase text-brand-gold">
                  Tokoh Penggerak
                </span>
                <span className="font-serif text-lg font-bold text-white">
                  Muslimin Nasution &amp; Adnan Buyung Nasution
                </span>
                <Text variant="small" tone="inverse" className="text-white/75">
                  Tokoh pergerakan nasional yang memfasilitasi markas luar kampus dan pembentukan
                  INFRA.
                </Text>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-display text-[10px] font-bold tracking-widest uppercase text-white/60">
                  Fokus Karya
                </span>
                <span className="font-serif text-lg font-bold text-white">
                  Teknologi Pertanian &amp; Transportasi
                </span>
                <Text variant="small" tone="inverse" className="text-white/75">
                  Mesin pengolahan gabah pasca panen, becak motor, dan traktor tangan.
                </Text>
              </div>
            </div>

            {/* Right main body (Editorial Article Style) */}
            <div className="lg:col-span-8 flex flex-col gap-6 text-white/85">
              <Text variant="editorial" tone="inverse" className="leading-relaxed text-white/90">
                September-<span className="text-brand-red-light font-semibold">M</span> yang lahir di tahun
                1960 - 1970-an, menjadi cikal bakal lahirnya semangat inovasi dan kreativitas para
                mahasiswa Mesin/FTMD. Kegiatan-kegiatan yang memadukan hobi, keilmuan, penerapan
                teknologi dengan dorongan keberanian untuk bereksperimen, telah membawa pengembangan
                dan perubahan mindset untuk memasuki dunia nyata dengan tantangan-tantangan riil yang
                mengandung risiko.
              </Text>

              <Text variant="editorial" tone="inverse" className="leading-relaxed text-white/85">
                Gairah pembangunan di masa-masa awal Orde Baru, telah menyentuh kalangan teknokrat
                muda, yaitu para mahasiswa dan alumni muda yang melihat adanya peluang-peluang
                pengembangan semangat pembaruan dalam karya-karya nyata untuk masyarakat dan Negara.
              </Text>

              <Text variant="editorial" tone="inverse" className="leading-relaxed text-white/85">
                Diprakarsai tokoh-tokoh gerakan perubahan yang bermarkas di Bangbayang, yang
                mengorganisasi demo-demo di Jakarta dan Bandung, para mahasiswa ITB khususnya Jurusan
                Mesin yang telah asyik dengan &lsquo;bermain&rsquo; penerapan ilmu dan teknologi dalam
                kegiatan go-kart bergabung dalam sebuah Kelompok Pembaharu dengan nama &lsquo;Indonesian
                New Frontier Association&rsquo; (INFRA), diprakarsai oleh Muslimin Nasution (M 59, lulus
                tahun 1967) bersama Adnan Buyung Nasution, dua tokoh-pemimpin pergerakan mahasiswa.
              </Text>

              <Text variant="editorial" tone="inverse" className="leading-relaxed text-white/85">
                Didirikan di tahun 1968, dengan bermarkas di Jl. Ciung Wanara 12 difasilitasi oleh
                Muslimin Nasution, menjadikannya markas kegiatan HMM di luar kampus. Ini adalah sebuah
                posisi strategis karena lokasinya adalah &lsquo;tetangga&rsquo; kampus Ganesha, sehingga
                bisa digunakan 24 jam sehari tanpa perlu terikat aturan kampus ITB.
              </Text>

              <Text variant="editorial" tone="inverse" className="leading-relaxed text-white/85">
                Keberadaan INFRA dengan Ciung Wanaranya menjadi ajang pengembangan karya anak-anak Mesin
                ITB dengan berfokus masuk ke dunia industri yang saat itu sedang sangat bergairah untuk
                berkembang. Dengan strategi bahwa Indonesia sebagai negara agraris harus kuat dalam
                sektor pertanian yang unggul, INFRA memfokuskan diri pada mesin-mesin pertanian, yang
                juga berkembang ke industri alat transportasi barang dan orang. Alat-alat pengolahan
                gabah pasca panen, becak motor, traktor tangan adalah beberapa karya INFRA yang
                dirancang dan dibikin dengan semangat yang telah terbangun sejak &lsquo;bermain-main&rsquo;
                rekayasa di masa September-<span className="text-brand-red-light font-semibold">M</span> di
                tahun-tahun 1967 - 1970-an tersebut.
              </Text>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Closing / Legacy Section (Cardless, typography-focused quote) ── */}
      <Section className="z-10 py-16 md:py-24 border-t border-white/10 bg-black/20">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto flex flex-col gap-8 text-center items-center">
            <Eyebrow className="text-brand-red-light">Pesan Warisan</Eyebrow>
            <Heading level={2} tone="accent" className="text-3xl md:text-4xl lg:text-5xl">
              Benih Kewirausahaan
            </Heading>
            <div className="h-[2px] w-24 bg-brand-red-light" />

            <Text
              variant="lead"
              tone="inverse"
              className="leading-relaxed max-w-3xl font-serif text-white/90 italic"
            >
              &ldquo;Demikianlah perkembangan semangat September-M telah menumbuhkan bibit-bibit
              kewirausahaan seperti dituliskan tersebut. Semangat September-M ini telah berkembang
              dalam berbagai bidang usaha, berkolaborasi dengan mitra-mitra dari berbagai profesi,
              banyak yang menjadi perintis di berbagai bidang kegiatan usaha dan profesi.&rdquo;
            </Text>

            {/* Quick links to navigate to other jargon */}
            <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/seputar-kami/yellboys-solidarity-forever"
                className="group flex items-center gap-2 text-white/60 transition-colors hover:text-brand-gold"
              >
                <span className="font-display text-[11px] font-bold tracking-widest uppercase">
                  Baca Solidarity Forever
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <div className="hidden sm:block h-4 w-px bg-white/20" />
              <Link
                href="/seputar-kami/genggam-mesin"
                className="group flex items-center gap-2 text-white/60 transition-colors hover:text-brand-red-light"
              >
                <span className="font-display text-[11px] font-bold tracking-widest uppercase">
                  Baca Genggam Mesin
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
