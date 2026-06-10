import type { Metadata } from 'next/types'
import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { getPayload } from 'payload'

import { FormBlock } from '@/blocks/Form/Component'
import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { Section } from '@/components/ui/section'
import { EmptyState } from '@/components/ui/empty-state'

const FORM_TITLE = 'Pengajuan Usaha Alumni'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Pengajuan Usaha Alumni',
    description:
      'Kirim pengajuan agar bisnis Anda ditinjau dan dapat ditampilkan di direktori usaha alumni IAM ITB.',
  }
}

export default async function PengajuanUsahaAlumniPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'forms',
    depth: 0,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      title: {
        equals: FORM_TITLE,
      },
    },
  })

  const form = docs[0] as unknown as FormType | undefined

  return (
    <PageShell className="pb-24">
      <Section className="z-10 pb-8 pt-3 md:pb-12 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Daftarkan bisnis Anda" subtitle="Usaha Alumni — IAM ITB" />
          <div className="mx-auto mt-8 max-w-2xl text-center font-sans text-[15px] leading-relaxed text-brand-dark/85">
            Pengajuan ditinjau oleh pengurus IAM ITB. Setelah disetujui dan diterbitkan, bisnis Anda
            akan tampil di halaman{' '}
            <Link href="/usaha-alumni" className="font-semibold text-brand-red underline-offset-4 hover:underline">
              Profil Usaha Alumni
            </Link>
            .
          </div>
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-20 md:pt-0">
        {form?.id !== undefined ? (
          <ScrollReveal>
            <FormBlock enableIntro={false} form={form} />
          </ScrollReveal>
        ) : (
          <EmptyState
            tone="onLight"
            title="Formulir belum tersedia"
            description={`Formulir “${FORM_TITLE}” belum ditemukan di database. Silakan hubungi pengurus IAM ITB atau kirim pesan melalui halaman Kontak.`}
            actionHref="/kontak"
            actionLabel="Hubungi Kami"
          />
        )}
      </Section>
    </PageShell>
  )
}
