'use client'

import { cn } from '@/utilities/ui'
import React, { useMemo, useState } from 'react'

type PanelCopy = {
  ketua: string
  wakilKetua: string[]
  anggota: string[]
}

const NAME = 'Adi Haditya Nursyam MS 22'
const PLACEHOLDER_LIST = [NAME, NAME, NAME]

const DEWAN_KEYS = ['A', 'B', 'C', 'D'] as const
const BIDANG_KEYS = ['1', '2', '3', '4'] as const

function panelForDewan(_key: (typeof DEWAN_KEYS)[number]): PanelCopy {
  return {
    ketua: NAME,
    wakilKetua: PLACEHOLDER_LIST,
    anggota: PLACEHOLDER_LIST,
  }
}

function panelForBidang(key: (typeof BIDANG_KEYS)[number]): PanelCopy {
  return {
    ketua: `Ketua Bidang ${key}`,
    wakilKetua: [`${NAME} (Koordinator)`],
    anggota: PLACEHOLDER_LIST,
  }
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
                  ? 'font-semibold text-brand-dark'
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
    return group === 'dewan' ? panelForDewan(dewan) : panelForBidang(bidang)
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

      <div className="min-h-[220px] flex-1 lg:min-h-0 lg:pl-12">
        <div className="border-l-2 border-brand-red/60 pl-6 md:pl-10">
          <dl className="space-y-8 font-display text-sm md:text-[15px]">
            <div>
              <dt className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-light">
                Ketua
              </dt>
              <dd className="text-brand-dark">{panel.ketua}</dd>
            </div>
            <div>
              <dt className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-light">
                Wakil Ketua
              </dt>
              <dd className="flex flex-col gap-2 text-brand-dark/85">
                {panel.wakilKetua.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-light">
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
