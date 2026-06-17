'use client'

import React from 'react'
import { ArrowLeft, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'

export default function NotFound() {
  const router = useRouter()

  return (
    <PageShell showAmbient={true}>
      <Section
        className="z-10 flex min-h-[75vh] items-center justify-center"
        containerClassName="container flex flex-col items-center justify-center"
      >
        <ScrollReveal className="w-full flex justify-center">
          <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4">
            {/* Elegant glowing background circle behind 404 */}
            <div className="relative mb-6">
              <div className="absolute -inset-4 rounded-full bg-brand-gold/10 blur-xl" />
              <Heading
                level={1}
                className="relative bg-linear-to-r from-brand-dark via-brand-red to-brand-gold bg-clip-text font-display text-[8rem] font-bold leading-none tracking-tighter text-transparent sm:text-[10rem] md:text-[12rem]"
              >
                404
              </Heading>
            </div>

            <Heading level={2} tone="default" className="mb-4 font-display text-3xl sm:text-4xl md:text-5xl">
              Alamat Palsu?
            </Heading>

            <Text tone="default" variant="body" className="mx-auto mb-10 max-w-md text-base md:text-lg text-brand-dark/70">
              Halaman yang Anda cari tidak ditemukan. Periksa kembali tautan Anda atau silakan kembali ke halaman sebelumnya.
            </Text>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button
                onClick={() => router.back()}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-brand-dark/25"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
              <Button href="/" variant="secondary" size="lg" className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Halaman Utama
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}


