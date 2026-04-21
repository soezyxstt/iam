'use client'

import React from 'react'

import type { Activity } from '@/payload-types'
import RichText from '@/components/RichText'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'

export type HighlightAktivitasBlockProps = {
  sectionTitle: string
  activities: (number | Activity)[] | null | undefined
}

export const HighlightAktivitasBlock: React.FC<HighlightAktivitasBlockProps> = ({
  sectionTitle,
  activities,
}) => {
  const list = (activities ?? []).filter((a): a is Activity => typeof a === 'object' && a !== null)

  if (list.length === 0) return null

  return (
    <Section>
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <header className="mb-10 text-center">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold/80">
            Kegiatan
          </span>
          <Heading level={2} className="mt-2">
            {sectionTitle}
          </Heading>
        </header>
        <ul className="grid gap-6 md:grid-cols-3">
          {list.map((a, i) => (
            <li key={a.id ?? i}>
              <article className="flex h-full flex-col rounded-2xl border border-brand-dark/10 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                <time className="font-display text-[10px] font-semibold uppercase tracking-wider text-brand-light">
                  {a.date
                    ? new Date(a.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : ''}
                </time>
                <Heading level={3} className="mt-2 text-lg">
                  {a.activityName}
                </Heading>
                {a.description ? (
                  <div className="prose prose-sm mt-2 line-clamp-5 max-w-none text-brand-light">
                    <RichText data={a.description} enableGutter={false} enableProse={false} />
                  </div>
                ) : (
                  <Text className="mt-2 text-sm text-brand-light">—</Text>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
