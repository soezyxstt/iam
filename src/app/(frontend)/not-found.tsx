import React from 'react'

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'

export default function NotFound() {
  return (
    <PageShell showAmbient={false}>
      <Section
        className="z-10 flex min-h-[70vh] items-center justify-center py-0 md:py-0 lg:py-0"
        containerClassName="container flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Heading
            level={1}
            className="mb-4 bg-linear-to-r from-brand-dark to-[#445E86] bg-clip-text font-display text-[8rem] font-bold leading-none tracking-tighter text-transparent sm:text-[10rem] md:text-[12rem]"
          >
            404
          </Heading>
          <Heading level={2} tone="default" className="mb-4 font-display text-3xl sm:text-4xl md:text-5xl">
            Alamat Palsu?
          </Heading>
          <Text tone="default" variant="body" className="mx-auto mb-10 max-w-xl text-base md:text-lg">
            Halaman tidak ditemukan, periksa kembali tautan anda
          </Text>
          <Button href="/" variant="secondary" size="lg" className="rounded-lg px-8 py-3">
            Halaman Utama
          </Button>
        </div>
      </Section>
    </PageShell>
  )
}

