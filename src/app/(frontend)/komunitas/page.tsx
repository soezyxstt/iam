import type { Metadata } from 'next'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import RichText from '@/components/RichText'
import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Komunitas',
  description: 'Komunitas minat dan kegiatan alumni Teknik Mesin ITB.',
}

export default async function KomunitasPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'communities',
    depth: 1,
    limit: 200,
    overrideAccess: false,
    sort: 'communityName',
  })

  return (
    <PageShell>
      <Section className="z-10" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <header className="mb-10 border-b border-brand-dark/10 pb-8 md:mb-14">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-red">
              Alumni
            </span>
            <Heading level={1} className="mt-2">
              Komunitas
            </Heading>
            <Text className="mt-3 max-w-2xl text-brand-light">
              Berbagai komunitas berbasis minat dan kegiatan di lingkungan alumni Teknik Mesin ITB.
            </Text>
          </header>

          {docs.length === 0 ? (
            <Text className="text-brand-light">
              Daftar komunitas akan ditampilkan setelah dikurasi di dasbor (koleksi Komunitas).
            </Text>
          ) : (
            <ul className="grid gap-8 md:grid-cols-2">
              {docs.map((c) => {
                const logo =
                  typeof c.logo === 'object' && c.logo !== null && 'url' in c.logo ? c.logo : null
                return (
                  <li key={c.id}>
                    <article className="flex h-full flex-col rounded-2xl border border-brand-dark/10 bg-white p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        {logo?.url ? (
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-brand-dark/10">
                            <Image
                              src={logo.url}
                              alt={c.communityName}
                              fill
                              className="object-contain"
                              sizes="56px"
                            />
                          </div>
                        ) : null}
                        <div>
                          <Heading level={2} className="text-xl">
                            {c.communityName}
                          </Heading>
                          {c.contactPerson ? (
                            <p className="mt-1 text-sm text-brand-light">Kontak: {c.contactPerson}</p>
                          ) : null}
                        </div>
                      </div>
                      <Text className="mt-4 text-brand-dark">{c.shortDescription}</Text>
                      {c.joinInformation ? (
                        <div className="prose prose-sm mt-4 max-w-none text-brand-light">
                          <RichText data={c.joinInformation} enableGutter={false} />
                        </div>
                      ) : null}
                    </article>
                  </li>
                )
              })}
            </ul>
          )}
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}
