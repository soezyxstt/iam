'use client'

import { cn } from '@/utilities/ui'
import React, { useMemo, useState } from 'react'

export type OrgMember = {
  id: number | string
  name: string
  position?: string | null
  photo?: { url?: string } | null | unknown
  memberType: 'main' | 'advisory' | 'expert'
  treeLevel?: number | null
  order?: number | null
}

type Props = {
  members: OrgMember[]
}

export function KepengurusanBoard({ members }: Props) {
  const [activeTab, setActiveTab] = useState<'penasihat' | 'pakar' | 'pengurus'>('penasihat')

  const advisory = useMemo(
    () => members.filter((m) => m.memberType === 'advisory').sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [members],
  )
  const expert = useMemo(
    () => members.filter((m) => m.memberType === 'expert').sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [members],
  )
  const main = useMemo(
    () => members.filter((m) => m.memberType === 'main').sort((a, b) => {
      const lvlDiff = (a.treeLevel ?? 99) - (b.treeLevel ?? 99)
      return lvlDiff !== 0 ? lvlDiff : (a.order ?? 0) - (b.order ?? 0)
    }),
    [members],
  )

  const currentList = activeTab === 'penasihat' ? advisory : activeTab === 'pakar' ? expert : main

  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-0">
      <div className="flex w-full flex-col gap-10 border-brand-dark/10 lg:max-w-[42%] lg:border-r lg:pr-12">
        <div>
          <p className="mb-4 font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-dark/45">
            Struktur Kerja
          </p>
          <div className="flex flex-col gap-y-1.5 items-start">
            {[
              { key: 'penasihat', label: 'Dewan Penasihat' },
              { key: 'pakar', label: 'Dewan Pakar' },
              { key: 'pengurus', label: 'Pengurus Inti & Ketua Bidang' },
            ].map((tab) => {
              const active = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as 'penasihat' | 'pakar' | 'pengurus')}
                  className={cn(
                    'relative px-3 py-2.5 font-display text-sm transition-colors duration-200 text-left w-full rounded-md hover:bg-brand-dark/5',
                    active
                      ? 'font-semibold text-brand-red bg-brand-dark/[0.03]'
                      : 'font-medium text-brand-dark/45 hover:text-brand-dark/75',
                  )}
                >
                  {tab.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-red lg:bottom-2.5 lg:left-0 lg:top-2.5 lg:w-0.5 lg:h-auto"
                      aria-hidden
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="min-h-[220px] flex-1 lg:min-h-0 lg:pl-16">
        <div className="border-l border-brand-dark/10 pl-6 md:pl-10 py-2">
          <dl className="flex flex-col gap-10 font-sans text-sm md:text-[15px]">
            {activeTab === 'pengurus' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {main.map((member) => (
                  <div key={member.id} className="flex flex-col gap-1.5">
                    <dt className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
                      {member.position}
                    </dt>
                    <dd className="text-brand-dark font-medium">{member.name}</dd>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <dt className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
                  Daftar Anggota
                </dt>
                <dd className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                  {currentList.map((member) => (
                    <span key={member.id} className="font-medium text-brand-dark">{member.name}</span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  )
}
