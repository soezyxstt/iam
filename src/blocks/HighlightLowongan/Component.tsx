'use client'

import React from 'react'

import type { JobVacancy } from '@/payload-types'
import RichText from '@/components/RichText'
import { Section } from '@/components/ui/section'
import { Heading, Text } from '@/components/ui/typography'

const employmentLabel: Record<string, string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  internship: 'Magang',
}

export type HighlightLowonganBlockProps = {
  sectionTitle: string
  vacancies: (number | JobVacancy)[] | null | undefined
}

export const HighlightLowonganBlock: React.FC<HighlightLowonganBlockProps> = ({
  sectionTitle,
  vacancies,
}) => {
  const list = (vacancies ?? []).filter((j): j is JobVacancy => typeof j === 'object' && j !== null)

  if (list.length === 0) return null

  return (
    <Section className="bg-brand-primary/5">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <header className="mb-10 text-center">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-red/90">
            Karier
          </span>
          <Heading level={2} className="mt-2">
            {sectionTitle}
          </Heading>
        </header>
        <ul className="grid gap-6 md:grid-cols-2">
          {list.map((job, i) => {
            const href =
              job.officialLink && job.officialLink.length > 0
                ? job.officialLink.startsWith('http')
                  ? job.officialLink
                  : `https://${job.officialLink}`
                : null

            return (
              <li key={job.id ?? i}>
                <article className="flex h-full flex-col rounded-2xl border border-brand-dark/10 bg-white p-6 shadow-sm">
                  <span className="font-display text-[10px] font-bold uppercase tracking-wider text-brand-primary">
                    {employmentLabel[job.employmentType] ?? job.employmentType}
                  </span>
                  <Heading level={3} className="mt-1 text-xl">
                    {job.position}
                  </Heading>
                  <Text className="font-medium text-brand-dark">{job.companyName}</Text>
                  {job.jobDescription ? (
                    <div className="prose prose-sm mt-3 line-clamp-4 max-w-none text-brand-light">
                      <RichText data={job.jobDescription} enableGutter={false} enableProse={false} />
                    </div>
                  ) : null}
                  {href ? (
                    <a
                      href={href}
                      className="mt-4 text-sm font-semibold text-brand-red hover:underline"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Tautan resmi lowongan
                    </a>
                  ) : null}
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
