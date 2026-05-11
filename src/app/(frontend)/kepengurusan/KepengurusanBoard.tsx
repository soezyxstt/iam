'use client'

import { cn } from '@/utilities/ui'
import React, { useMemo, useState } from 'react'

type PanelCopy = {
  ketua: string
  wakilKetua: string[]
  anggota: string[]
}

const DEWAN_KEYS = ['A', 'B', 'C', 'D'] as const
const BIDANG_KEYS = ['1', '2', '3', '4'] as const

const DEWAN_DATA: Record<string, PanelCopy> = {
  A: {
    ketua: 'Bagus Setyawan / MS 20',
    wakilKetua: ['Rina Kusuma / MS 21'],
    anggota: ['Fajar Hidayat / MS 21', 'Putri Permata / MS 22', 'Andi Pratama / MS 22'],
  },
  B: {
    ketua: 'Dimas Anggara / MS 20',
    wakilKetua: ['Siti Nurbaya / MS 21', 'Tirta Wijaya / MS 21'],
    anggota: ['Reza Fahlevi / MS 22', 'Maya Sari / MS 22', 'Gilang Dirga / MS 22', 'Dewi Lestari / MS 23'],
  },
  C: {
    ketua: 'Arif Budiman / MS 20',
    wakilKetua: ['Wira Yudha / MS 21'],
    anggota: ['Dina Mariana / MS 22', 'Eko Prasetyo / MS 22', 'Hendra Cipta / MS 23'],
  },
  D: {
    ketua: 'Lia Anugrah / MS 20',
    wakilKetua: ['Bayu Segara / MS 21'],
    anggota: ['Anton Syahputra / MS 22', 'Fitriani / MS 22', 'Galih Purnama / MS 23', 'Surya Darma / MS 23', 'Indah Pratiwi / MS 23'],
  },
}

const BIDANG_DATA: Record<string, PanelCopy> = {
  '1': {
    ketua: 'Faisal Akbar / MS 21',
    wakilKetua: ['Doni Kusuma / MS 22'],
    anggota: ['Rina Puspita / MS 23', 'Hadi Suwondo / MS 23', 'Nila Karisma / MS 23'],
  },
  '2': {
    ketua: 'Agus Setiawan / MS 21',
    wakilKetua: ['Bima Sakti / MS 22'],
    anggota: ['Rendy Juliansyah / MS 23', 'Vina Amalia / MS 23', 'Nadia Shafira / MS 23', 'Lukman Hakim / MS 23'],
  },
  '3': {
    ketua: 'Farah Nabila / MS 21',
    wakilKetua: ['Tito Baskoro / MS 22', 'Rio Firmansyah / MS 22'],
    anggota: ['Aditya Pratama / MS 23', 'Gading Mahardika / MS 23', 'Gisella Anastasia / MS 23'],
  },
  '4': {
    ketua: 'Junot Ali / MS 21',
    wakilKetua: ['Reni Mulyani / MS 22'],
    anggota: ['Arnold Purnomo / MS 23', 'Willy Brodus / MS 23', 'Sarah Salsabila / MS 23', 'Vincent Rompies / MS 23'],
  },
}

function TabRow({
  label,
  keys,
  activeKey,
  onSelect,
  format,
}: {
  label: string
  keys: readonly string[]
  activeKey: string
  onSelect: (k: string) => void
  format: (k: string) => string
}) {
  return (
    <div>
      <p className="mb-4 font-display text-[10px] font-bold uppercase tracking-[0.35em] text-brand-dark/45">
        {label}
      </p>
      <div className="flex flex-wrap gap-x-1 gap-y-2">
        {keys.map((k) => {
          const active = activeKey === k
          return (
            <button
              key={k}
              type="button"
              onClick={() => onSelect(k)}
              className={cn(
                'relative px-3 py-2 font-display text-sm transition-colors duration-200',
                active
                  ? 'font-semibold text-brand-red'
                  : 'font-medium text-brand-dark/45 hover:text-brand-dark/75',
              )}
            >
              {format(k)}
              {active && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-red"
                  aria-hidden
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function KepengurusanBoard() {
  const [group, setGroup] = useState<'dewan' | 'bidang'>('dewan')
  const [dewan, setDewan] = useState<(typeof DEWAN_KEYS)[number]>('A')
  const [bidang, setBidang] = useState<(typeof BIDANG_KEYS)[number]>('1')

  const panel = useMemo(() => {
    return group === 'dewan' ? DEWAN_DATA[dewan] : BIDANG_DATA[bidang]
  }, [group, dewan, bidang])

  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-0">
      <div className="flex w-full flex-col gap-10 border-brand-dark/10 lg:max-w-[42%] lg:border-r lg:pr-12">
        <TabRow
          label="Dewan"
          keys={[...DEWAN_KEYS]}
          activeKey={group === 'dewan' ? dewan : ''}
          onSelect={(k) => {
            setGroup('dewan')
            setDewan(k as (typeof DEWAN_KEYS)[number])
          }}
          format={(k) => `Dewan ${k}`}
        />
        <TabRow
          label="Bidang"
          keys={[...BIDANG_KEYS]}
          activeKey={group === 'bidang' ? bidang : ''}
          onSelect={(k) => {
            setGroup('bidang')
            setBidang(k as (typeof BIDANG_KEYS)[number])
          }}
          format={(k) => `Bidang ${k}`}
        />
      </div>

      <div className="min-h-[220px] flex-1 lg:min-h-0 lg:pl-16">
        <div className="border-l border-brand-dark/10 pl-6 md:pl-10 py-2">
          <dl className="flex flex-col gap-10 font-sans text-sm md:text-[15px]">
            <div className="flex flex-col gap-3">
              <dt className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
                Ketua
              </dt>
              <dd className="text-brand-dark font-medium">{panel.ketua}</dd>
            </div>

            <div className="w-8 h-px bg-brand-dark/10" />

            <div className="flex flex-col gap-3">
              <dt className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
                Wakil Ketua
              </dt>
              <dd className="flex flex-col gap-2 text-brand-dark/85">
                {panel.wakilKetua.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </dd>
            </div>

            <div className="w-8 h-px bg-brand-dark/10" />

            <div className="flex flex-col gap-3">
              <dt className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
                Anggota
              </dt>
              <dd className="flex flex-col gap-2 text-brand-dark/85">
                {panel.anggota.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
