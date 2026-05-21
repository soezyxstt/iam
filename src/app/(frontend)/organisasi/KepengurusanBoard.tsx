'use client'

import { cn } from '@/utilities/ui'
import React, { useMemo, useState } from 'react'

type BoardMember = {
  role?: string
  name: string
}

type BoardSection = {
  title: string
  members: BoardMember[]
}

const BOARD_DATA: Record<'penasihat' | 'pakar' | 'pengurus', BoardSection> = {
  penasihat: {
    title: 'Dewan Penasihat',
    members: [
      { name: 'Prof. Dr. Ir. Hermawan Judawisastra, M.Eng. (M88)' },
      { name: 'Ekotomo (M71)' },
      { name: 'Ari Surhendro (M76)' },
      { name: 'Joseph Pangalila (M82)' },
      { name: 'Gaya Sinaga (M85)' },
      { name: 'Arif Haendra (M90)' },
      { name: 'Ari Indarto Sutjiatmo (M95)' },
      { name: 'Donny Novanda (M95)' },
      { name: 'Rilly Christian Hutabarat (M98)' },
      { name: 'Abdan Satria (M03)' },
    ],
  },
  pakar: {
    title: 'Dewan Pakar',
    members: [
      { name: 'Muhammad Fauzan Adziman (M99)' },
      { name: 'Ir. Satrio Wicaksono, S.T, M.Eng., Ph.D. (M03)' },
      { name: 'Sigit Santoso (M86)' },
      { name: 'Taufik Adityawarman (M86)' },
      { name: 'Gembong Primadjaja (M86)' },
      { name: 'Vernon Sapalatua (M97)' },
      { name: 'Rudolf Aritonang (M04)' },
      { name: 'Hamdhani Dzulkarnaen Salim (M83)' },
      { name: 'Arief Abidin (M89)' },
      { name: 'Ony Arifianto (M90)' },
      { name: 'Roland Wala (M05)' },
      { name: 'Irham Nusaly (M95)' },
      { name: 'Adrian Tisna (M86)' },
      { name: 'Rudy Andriyana (M94)' },
      { name: 'Jero Wacik (M70)' },
      { name: 'Susilo Siswoutomo (M70)' },
      { name: 'Archandra Tahar (M89)' },
      { name: 'Budhi Suyitno (M72)' },
    ],
  },
  pengurus: {
    title: 'Pengurus Inti & Ketua Bidang',
    members: [
      { role: 'Ketua Umum', name: 'Farhan Muhammad (M99)' },
      { role: 'Wakil Ketua Umum I', name: 'Anggi Firman (M14)' },
      { role: 'Wakil Ketua Umum II', name: 'Tri Harjanto Puspoasmoro (M99)' },
      { role: 'Wakil Ketua Umum III', name: 'R. Ryan Aditya S.W. (M01)' },
      { role: 'Sekretaris Jenderal', name: 'Tri Aghna Satriya (M08)' },
      { role: 'Bendahara', name: 'Andini Aritonang (M99)' },
      { role: 'Ketua Bidang Keanggotaan dan Wirausaha', name: 'Gumilang Dewananta (M05)' },
      { role: 'Ketua Bidang Komunitas dan Hobi', name: 'M. Faiz Habibi (M19)' },
      { role: 'Ketua Bidang Produk Identitas', name: 'Ridho Fidiantowi (M11)' },
      { role: 'Ketua Bidang Beasiswa dan Kampus', name: 'Ilman Nuran Zaini (M08)' },
    ],
  },
}

export function KepengurusanBoard() {
  const [activeTab, setActiveTab] = useState<'penasihat' | 'pakar' | 'pengurus'>('penasihat')

  const panel = useMemo(() => {
    return BOARD_DATA[activeTab]
  }, [activeTab])

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
                  onClick={() => setActiveTab(tab.key as any)}
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
                {panel.members.map((member, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <dt className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
                      {member.role}
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
                  {panel.members.map((member, i) => (
                    <span key={i} className="font-medium text-brand-dark">{member.name}</span>
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
