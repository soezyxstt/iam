import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { PageShell } from '@/components/PageShell'
import { Section } from '@/components/ui/section'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import { HeaderThemeDark } from '../HeaderThemeDark'

export const metadata: Metadata = {
  title: 'Genggam Mesin - IAM ITB',
  description:
    'Makna dan filosofi di balik salam ikonik "Genggam Mesin" dari keluarga besar HMM ITB.',
}

export default function GenggamMesinPage() {
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

      {/* ── Header Section (Bespoke layout, no cards) ── */}
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

            {/* Accent lines representing the fist / action */}
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-brand-gold" />
              <Eyebrow className="text-brand-red-light">Panggilan Aksi &amp; Semangat Korps</Eyebrow>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-red-light/50 via-brand-primary/20 to-transparent" />
            </div>

            <div className="max-w-4xl">
              <h1 className="font-serif text-5xl font-black leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                GENGGAM
                <br />
                <span className="text-brand-gold">MESIN!</span>
              </h1>
            </div>

            {/* Introductory text */}
            <div className="mt-8 border-l-4 border-brand-gold pl-6 md:pl-8 max-w-3xl">
              <Text
                variant="editorial"
                tone="inverse"
                className="text-lg md:text-xl text-white/90 leading-relaxed"
              >
                Salam Genggam Mesin bukan sekadar gestur tangan, melainkan sebuah simbol ikonik yang
                memiliki akar historis dan makna filosofis yang mendalam bagi keluarga besar
                Himpunan Mahasiswa Mesin (HMM) ITB.
              </Text>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Context / Comparison Section ── */}
      <Section className="z-10 py-12 md:py-16 border-t border-white/10 bg-black/10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <Eyebrow tone="gold">Perbedaan &amp; Hubungan</Eyebrow>
              <Heading level={2} tone="inverse" className="text-3xl md:text-4xl text-white">
                Aksi dan <span className="text-brand-red-light">Persaudaraan</span>
              </Heading>
              <div className="h-[3px] w-20 bg-brand-red-light" />
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Text variant="editorial" tone="inverse" className="text-white/85">
                Jika Solidarity Forever melambangkan hubungan persaudaraan yang abadi, maka
                &ldquo;Genggam Mesin&rdquo; adalah panggilan aksi (call to action) yang membakar
                semangat korps mereka.
              </Text>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Yel-Yel Ritual Section (Bespoke typographic list layout) ── */}
      <Section className="z-10 py-16 md:py-24 border-t border-white/10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <Eyebrow className="text-brand-red-light">Ritual Yel-Yel</Eyebrow>
              <Heading level={2} tone="inverse" className="text-3xl md:text-4xl text-white">
                Yell Boys!
              </Heading>
              <Text variant="editorial" tone="inverse" className="text-white/80">
                Ketika pemimpin yel-yel berseru &ldquo;Yell Boys!&rdquo;, seluruh massa akan
                menjawab secara serentak dengan kepalan tangan kanan yang diangkat tinggi-tinggi ke
                udara, disertai jargon pemersatu yang menggema.
              </Text>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-white/15 pt-8 lg:pt-0 lg:pl-12">
              <div className="flex flex-col gap-2">
                <span className="font-display text-xs font-bold tracking-widest uppercase text-brand-red-light">
                  Pemimpin Yel-yel Berseru:
                </span>
                <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-black italic text-white tracking-tight">
                  &ldquo;YELL BOYS!&rdquo;
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-display text-xs font-bold tracking-widest uppercase text-brand-gold">
                  Dijawab Serentak Oleh Massa:
                </span>
                <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-black italic text-brand-gold tracking-tight">
                  &ldquo;UNION UNION MACHINE STRONG!&rdquo;
                </p>
                <Text variant="small" tone="inverse" className="mt-1 text-white/60">
                  Disertai kepalan tangan kanan yang diangkat tinggi-tinggi ke udara
                </Text>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Three Pillars Section (Cardless 3-column layout) ── */}
      <Section className="z-10 py-16 md:py-24 border-t border-white/10 bg-black/15">
        <ScrollReveal>
          <div className="mb-16">
            <Eyebrow tone="gold">Filosofi Utama</Eyebrow>
            <Heading level={2} tone="inverse" className="mt-2 text-white">
              Makna di Balik Genggam Mesin
            </Heading>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Pillar 01 */}
          <ScrollReveal>
            <div className="flex flex-col gap-4 border-t border-brand-red-light pt-6">
              <span className="font-display text-4xl font-black text-brand-red-light">01</span>
              <Heading level={3} tone="inverse" className="text-lg md:text-xl text-white">
                Simbol Persatuan &amp; Kekuatan Kolektif
              </Heading>
              <Text variant="body" tone="inverse" className="text-white/80">
                Kata &ldquo;Genggam&rdquo; secara harfiah berarti menyatukan jari-jari tangan menjadi
                satu kepalan yang kuat. Dalam konteks ini, &ldquo;Genggam Mesin&rdquo; bermakna
                menyatukan seluruh elemen, mulai dari mahasiswa tingkat awal, mahasiswa tingkat
                akhir, dosen, hingga para alumni lintas generasi, menjadi satu kesatuan yang utuh
                dan tidak terpecah-belah. Kepalan tangan yang kokoh ini melambangkan kekuatan
                bersama yang siap menghadapi tantangan apa pun.
              </Text>
            </div>
          </ScrollReveal>

          {/* Pillar 02 */}
          <ScrollReveal>
            <div className="flex flex-col gap-4 border-t border-brand-gold pt-6">
              <span className="font-display text-4xl font-black text-brand-gold">02</span>
              <Heading level={3} tone="inverse" className="text-lg md:text-xl text-white">
                Penguasaan Teknologi &amp; Keilmuan
              </Heading>
              <Text variant="body" tone="inverse" className="text-white/80">
                Sebagai calon insinyur dan profesional di bidang mekanikal, jargon ini adalah
                pengingat akan tanggung jawab akademis mereka. &ldquo;Genggam Mesin&rdquo; berarti
                mereka harus benar-benar menguasai ilmu rekayasa mesin (engineering) dengan kuat di
                dalam &ldquo;genggaman&rdquo; mereka. Ini adalah komitmen untuk melek teknologi,
                inovatif, dan menjadi ahli yang kompeten agar mampu mengendalikan serta menggerakkan
                roda industri demi kemajuan bangsa.
              </Text>
            </div>
          </ScrollReveal>

          {/* Pillar 03 */}
          <ScrollReveal>
            <div className="flex flex-col gap-4 border-t border-white/20 pt-6">
              <span className="font-display text-4xl font-black text-white/60">03</span>
              <Heading level={3} tone="inverse" className="text-lg md:text-xl text-white">
                Komitmen Menjaga Nama Baik Korps
              </Heading>
              <Text variant="body" tone="inverse" className="text-white/80">
                Menggenggam sesuatu berarti memegangnya dengan erat agar tidak jatuh atau rusak.
                Bagi keluarga besar Mesin ITB, &ldquo;Genggam Mesin&rdquo; adalah janji setiap
                individu untuk selalu menjaga, merawat, dan menjunjung tinggi nama baik almamater,
                himpunan (HMM), dan ikatan alumni (IAM). Di mana pun mereka berada, nilai-nilai
                integritas, kerja keras, dan kehormatan korps &ldquo;MS&rdquo; harus selalu dipegang
                teguh.
              </Text>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ── Perpaduan Jargon Section (Cardless, full-bleed design) ── */}
      <Section className="z-10 py-16 md:py-24 border-t border-white/10 bg-black/25">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto flex flex-col gap-8 text-center items-center">
            <Eyebrow tone="gold">Sinergi Nilai</Eyebrow>
            <Heading level={2} tone="inverse" className="text-3xl md:text-4xl lg:text-5xl text-white">
              Perpaduan Dua Jargon
            </Heading>
            <div className="h-[2px] w-24 bg-brand-gold" />
            <Text
              variant="lead"
              tone="inverse"
              className="leading-relaxed max-w-3xl font-serif text-white/90"
            >
              Dalam berbagai acara resmi maupun aksi kampus, kedua jargon ini sering kali dipadukan.
            </Text>
            <Text variant="editorial" tone="inverse" className="max-w-3xl text-white/80">
              Jargon &ldquo;Genggam Mesin&rdquo; digunakan untuk mengumpulkan fokus, membakar
              semangat, dan menegaskan kehadiran mereka, sementara &ldquo;Solidarity Forever&rdquo;
              dinyanyikan atau diteriakkan untuk mengunci rasa persaudaraan tersebut agar tetap
              abadi.
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
