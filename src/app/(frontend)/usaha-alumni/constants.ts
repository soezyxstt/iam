import type { AlumniBusiness } from '@/payload-types'

export const CATEGORY_LABELS: Record<AlumniBusiness['category'], string> = {
  manufaktur: 'Manufaktur',
  jasa: 'Jasa Konsultasi',
  fnb: 'Kuliner',
  teknologi: 'Teknologi',
  lainnya: 'Lainnya',
}

export function labelForCategory(value: AlumniBusiness['category']): string {
  return CATEGORY_LABELS[value] ?? value
}

/** Satu baris untuk kolom “Lokasi” di statistik. */
export function shortLocationLine(address: string): string {
  const first = address.split(/\r?\n/).find((l) => l.trim())?.trim() ?? address.trim()
  const segment = first.split(',')[0]?.trim() ?? first
  return segment.length > 48 ? `${segment.slice(0, 46)}…` : segment
}
