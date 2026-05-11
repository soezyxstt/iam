import Link from 'next/link'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'

export default function NotFound() {
  return (
    <PageShell showAmbient={false}>
      <Section className="z-10 pb-16 pt-3 md:pb-24 md:pt-4" containerClassName="max-w-6xl px-4 md:px-8">
        <PageHeroHeader title="404" subtitle="Halaman tidak ditemukan" />
        <div className="mt-6 flex justify-center">
          <Button asChild variant="default">
            <Link href="/">Kembali ke beranda</Link>
          </Button>
        </div>
      </Section>
    </PageShell>
  )
}
