import type { Metadata } from 'next'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Direktori Alumni',
  description: 'Alumni Teknik Mesin ITB yang memilih menampilkan profil di situs IAM ITB.',
}

export default async function AlumniDirectoryPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'alumniMembers',
    depth: 1,
    limit: 500,
    overrideAccess: false,
    sort: '-graduationYear',
    where: {
      listPublicly: {
        equals: true,
      },
    },
  })

  return (
    <PageShell>
      <Section className="z-10" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <header className="mb-10 border-b border-brand-dark/10 pb-8 md:mb-14">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-red">
              Jaringan
            </span>
            <Heading level={1} className="mt-2">
              Direktori Alumni
            </Heading>
            <Text className="mt-3 max-w-2xl text-brand-light">
              Profil ditampilkan atas persetujuan masing-masing dan dikelola oleh pengurus IAM ITB.
            </Text>
          </header>

          {docs.length === 0 ? (
            <Text className="text-brand-light">Belum ada profil publik. Silakan cek lagi nanti.</Text>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((alumnus) => {
                const photo =
                  typeof alumnus.photo === 'object' && alumnus.photo !== null && 'url' in alumnus.photo
                    ? alumnus.photo
                    : null

                return (
                  <li key={alumnus.id}>
                    <article className="flex h-full flex-col rounded-2xl border border-brand-dark/10 bg-white p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        {photo?.url ? (
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-brand-dark/10">
                            <Image
                              src={photo.url}
                              alt={alumnus.fullName}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        ) : (
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-dashed border-brand-dark/15 bg-brand-khaki/40 font-display text-lg font-bold text-brand-light">
                            {alumnus.fullName.slice(0, 1).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <Heading level={3} className="text-lg">
                            {alumnus.fullName}
                          </Heading>
                          {alumnus.graduationYear ? (
                            <p className="font-display text-[10px] font-semibold uppercase tracking-wider text-brand-light">
                              Angkatan {alumnus.graduationYear}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      {alumnus.headline ? (
                        <p className="mt-3 text-sm font-medium text-brand-dark">{alumnus.headline}</p>
                      ) : null}
                      {(alumnus.employer || alumnus.role) && (
                        <p className="mt-2 text-sm text-brand-light">
                          {[alumnus.role, alumnus.employer].filter(Boolean).join(' · ')}
                        </p>
                      )}
                      {alumnus.bio ? (
                        <p className="mt-3 line-clamp-4 text-sm text-brand-light">{alumnus.bio}</p>
                      ) : null}
                      {alumnus.linkedInUrl ? (
                        <a
                          href={
                            alumnus.linkedInUrl.startsWith('http')
                              ? alumnus.linkedInUrl
                              : `https://${alumnus.linkedInUrl}`
                          }
                          className="mt-4 text-sm font-semibold text-brand-red hover:underline"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          LinkedIn
                        </a>
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
