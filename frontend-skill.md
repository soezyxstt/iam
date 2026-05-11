---
name: frontend-design
description: Panduan desain frontend IAM ITB — token warna, tipografi, dan layout yang dipakai di codebase (globals.css, komponen UI, landing). Gunakan saat membangun halaman atau komponen agar selaras dengan beranda dan halaman dalam.
license: Complete terms in LICENSE.txt
---

Skill ini mengikat implementasi ke **desain IAM ITB yang sudah dipakai**: font ITC New Baskerville / Montserrat / Helvetica Neue, palet biru–emas–merah, gradient halaman (`page-root`), kartu kaca (GlassCard), dan ritme vertikal berbasis `Section` / `PageShell`. Ikuti token dan pola di bawah; hindari mengganti seluruh estetika ke “generic SaaS” kecuali ada brief eksplisit.

---

## 1. Warna (`src/app/(frontend)/globals.css`)

### 1.1 Variabel semantik (`:root` — mode terang)

| Token | Nilai | Peran |
|-------|--------|--------|
| `--background` | `#FFFFFF` | Latar halaman (default body boleh `bg-white`; kartu halaman sering pakai gradient `.page-root`). |
| `--foreground` | `#06162F` | Teks utama (*darkest blue*). |
| `--card` / `--card-foreground` | `#FFFFFF` / `#06162F` | Permukaan kartu & teks di kartu. |
| `--popover` / `--popover-foreground` | sama pola | Dropdown, popover. |
| `--primary` | `#253041` | **Biru branding** — tombol utama, teks nav/contras di UI admin; map ke Tailwind `brand-primary` / `primary`. |
| `--primary-foreground` | `#FFFFFF` | Teks di atas primary. |
| `--secondary` | `#590F11` | **Merah aksi** (CTA/destructif semantik). |
| `--secondary-foreground` | `#FFFFFF` | Teks di atas secondary. |
| `--muted` | `#F4EDE1` | **Beige** — section lembut; sama dengan *khaki* brand. |
| `--muted-foreground` | `#445E86` | Teks redup (*muted blue*). |
| `--accent` | `#F0D637` | **Emas** — highlight, ring fokus. |
| `--accent-foreground` | `#06162F` | Teks di atas emas. |
| `--destructive` | `#590F11` | Error/aksi berbahaya. |
| `--border` / `--input` | `#D9D9D9` | Garis & input. |
| `--ring` | `#F0D637` | Fokus keyboard. |
| `--chart-1` … `--chart-5` | palet chart | `#253041`, `#F0D637`, `#445E86`, `#590F11`, `#06162F`. |
| `--radius` | `0.5rem` | Dasar radius; varian `radius-sm` … `radius-xl` di `@theme inline`. |
| **Sidebar** | serangkaian var | `#F4EDE1`, teks `#06162F`, aksen emas, dll. |
| `--success` | oklch | Status sukses. |
| `--warning` | oklch | Peringatan. |
| **`--error`** | `#590F11` | Error (Tailwind `error`). |

### 1.2 Mode gelap (`[data-theme='dark']`)

Background `#06162F`, foreground beige `#F4EDE1`, kartu `#253041`, primary ↔ beige (invers), border/input lebih gelap, aksen emas tetap. Komponen shadcn/`bg-background` mengikuti ini; **landing beranda** dominan terang + kartu gelap di `.glass-card`.

### 1.3 Warna brand Tailwind (`@theme inline` → kelas `text-brand-*`, `bg-brand-*`)

| Kelas | Hex | Keterangan singkat |
|--------|-----|---------------------|
| `brand-primary` | `#253041` | Biru struktural (heading di section terang, logo block, glow). |
| `brand-red` | `#590F11` | Merah gelap (aksen editorial, badge “IAM”). |
| `brand-red-light` | `#d92524` | Merah terang (tagline hero *For Union Machine Strong*). |
| `brand-khaki` | `#F4EDE1` | Beige (muted semantic). |
| `brand-dark` | `#06162F` | Biru sangat gelap (judul utama, teks kuat). |
| `brand-gold` | `#F0D637` | Emas (eyebrow, separator, hover kartu berita). |
| `brand-light` | `#445E86` | Biru baja / muted (aksen glow sekunder). |

### 1.4 Penggunaan pada landing (`src/app/(frontend)/page.tsx`)

- **Canvas halaman**: kelas `.page-root` — gradient `#ffffff → #f8fafc → #f4ede1 → #f0eadf` (warm–cool editorial), bukan flat `--background` saja.
- **Ambient glow** (lapisan absolut, blur): `bg-brand-gold/5–8`, `bg-brand-primary/6–10`, `bg-brand-light/8`, `bg-brand-red/5`, `bg-brand-dark/8` — memberi kedalaman tanpa mengubah token teks.
- **About (GlassCard default)**: gradient isi `from-brand-dark via-brand-primary to-brand-dark`; teks judul sekunder `Heading tone="accent"` → **emas**; body `Text tone="inverse"` → putih transparan per komponen.
- **Program**: `Heading` campuran `text-brand-dark` + `text-brand-red italic` untuk kata “Kami”; `Text` default (`text-brand-dark/70`).
- **Berita (GlassCard stripes)**: eyebrow `text-brand-gold/60`; judul section `tone="accent"`; badge `bg-brand-red/90 text-white`; judul kartu `text-white/90` → hover `text-brand-gold`; garis aksen `via-brand-gold/45`; hover sweep `from-brand-gold … to-brand-red`.
- **Tag momento**: `text-white/90`, border `white/15–25`, bayangan hitam halus.

---

## 2. Tipografi

### 2.1 Stack font (sumber kebenaran)

| Peran | Sumber | Tailwind | Catatan |
|--------|--------|-----------|---------|
| Judul (h1–h6) | ITC New Baskerville Std Bold (+ Bold Italic) | `font-serif` | `layout.tsx` → `--font-baskerville`. |
| Subjudul, tombol, label UI | Montserrat 500/600 | `font-display` | `--font-montserrat`. |
| Paragraf / isi | Helvetica Neue Roman | `font-sans` | `--font-helvetica`; default `body`: `font-sans`. |

Mapping di `globals.css` `@theme`: `--font-serif`, `--font-display`, `--font-sans`.

**Base layer** (`globals.css`): semua `h1–h6` → `font-serif font-bold`; `button` & `.subtitle` → `font-display font-medium`.

### 2.2 Komponen `Heading` / `Text` (`src/components/ui/typography.tsx`)

**Heading** (`font-serif font-bold tracking-tight`):

| Prop | Ukuran (default) | Warna (`tone`) |
|------|-------------------|----------------|
| `level={1}` | `text-4xl sm:text-5xl md:text-6xl` `leading-[1.08]` | `default` → `text-brand-dark` |
| `level={2}` | `text-3xl md:text-4xl` `leading-[1.1]` | `inverse` → `text-white` |
| `level={3}` | `text-2xl md:text-3xl` `leading-[1.2]` | `accent` → `text-brand-gold` |
| `level={4}` | `text-xl md:text-2xl` `leading-[1.25]` | `muted` → `text-brand-dark/75` |

**Text** (`font-sans`):

| `variant` | Ukuran & leading | Warna default (`tone`) |
|-----------|------------------|-------------------------|
| `body` | `text-sm md:text-[15px] leading-relaxed` | `default` → `text-brand-dark/70`; `inverse` → `text-white/75`; `accent` → emas; `strong` → `text-brand-dark` |
| `lead` | `text-lg md:text-2xl leading-relaxed` + **serif** | Sama tone; untuk lead intro |
| `small` | `text-xs leading-relaxed` | Default abu brand (`/70`) |

### 2.3 Tombol (`Button`)

Montserrat semibold: `font-display font-semibold tracking-wider`. Ukuran default `md`: `text-xs` + `px-7 py-3`. Variasi warna: `primary` `bg-brand-primary text-white`, `secondary` `bg-brand-gold text-brand-dark`, dll. (`src/components/ui/button.tsx`).

### 2.4 Halaman dalam — `PageHeroHeader`

- Eyebrow: `font-display text-[10px] font-bold uppercase tracking-[0.35em]` — `text-brand-red` atau `text-brand-gold`.
- Judul `h1`: `font-serif font-bold text-brand-dark text-3xl sm:text-4xl md:text-[2.375rem]`.
- Subtitle opsional: `font-serif font-bold text-base sm:text-lg md:text-xl text-brand-dark`.

### 2.5 Override khusus landing (beranda)

- Hero H1: `text-[2.6rem] sm:text-5xl lg:text-[4rem]` (di atas default `Heading` level 1).
- Tagline: `Text variant="lead"` + `font-bold italic text-brand-red-light` + `text-xl md:text-3xl`.
- Logo block “IAM / ITB”: `font-serif text-3xl md:text-4xl text-white`.
- Tag momento: `font-display text-xs font-semibold tracking-wider text-white/90`.
- Kartu berita: judul `font-serif text-sm font-semibold text-white/90`; meta `font-display text-[10px] text-white/35`; angka `text-[10px] text-white/65`.

---

## 3. Layout & ritme spasial

### 3.1 Navigasi tetap & offset vertikal

Header **fixed** (`top-0`, desktop `md:top-4` + bar **rounded-full**). Supaya konten tidak tertutup:

- **`PageShell`** dan **hero beranda**: `pt-14 md:pt-[4.75rem]` pada `<main>` (setara ~56px + inset desktop).
- Isi halaman gunakan pola yang sama agar selaras dengan beranda.

### 3.2 `Section` (default)

```txt
<section className="relative py-16 md:py-24">
  <div className="container mx-auto px-6" />  <!-- + containerClassName -->
</section>
```

- Ritme vertikal standar: **64px / 96px** (`py-16` / `md:py-24`).
- Kontainer horizontal: **`px-6`** default; bisa diganti `containerClassName` (mis. `max-w-6xl`, `px-0`, `md:px-8`).

### 3.3 Pola landing yang disarankan

| Pola | Kelas / nilai | Keterangan |
|------|----------------|------------|
| Hero penuh | `min-h-[92vh]`, `pt-14 pb-12 md:pt-[4.75rem]` | Menyelaraskan padding atas dengan PageShell. |
| Grid hero | `max-w-7xl` + `px-6 md:px-12` + `lg:grid-cols-12` + `gap-8` | Kolom kiri konten / kanan ilustrasi. |
| Section overlap halus | `-mt-8` pada section berikutnya (About) | Menyambungkan hero ke blok berikutnya. |
| About / Berita | `px-4 md:px-8` di section + `container` `max-w-6xl px-0` | Margin horizontal sedikit lebih lega di tablet+. |
| Program | `max-w-6xl px-6 md:px-8` | Konsisten dengan “kolom editorial” 6xl. |
| Gap dalam kolom | `gap-5`, `gap-8`, `gap-10`, `gap-16` (semakin besar antar blok besar) | Gunakan `gap-5` untuk teks berundak, `gap-8–10` untuk section anak. |
| GlassCard konten | Default padding isi: `p-8 md:p-10 lg:p-12` (bisa override `contentClassName`, contoh Berita `p-8 md:p-10 lg:p-14`) | Satu skala padding untuk semua kartu gelap. |

### 3.4 Lebar maksimum

- **Konten utama**: `max-w-6xl` atau `max-w-7xl` (hero).
- **Header**: `max-w-6xl mx-auto`.
- Utility `.container` di `globals.css`: lebar penuh + `padding-inline` bertingkat per breakpoint (sm–2xl).

### 3.5 Radius & bayangan

- UI umum: `--radius` 8px; kartu besar landing: `rounded-3xl` (GlassCard), tag `rounded-lg`, tombol `rounded-full`.
- **Konsistensi**: bayangan dalam kartu/glass didefinikan di `.about-card`, `.berita-card`, `.berita-item-card`, `.glass-tag` — utamakan kelas ini daripada membuat shadow sekali pakai di setiap halaman.

---

## 4. Prinsip saat menambah fitur

1. **Warna**: utamakan token `--*` / `brand-*` dan opacity (`/70`, `/10`) seperti di landing; jangan memperkenalkan heks acak.
2. **Tipe**: judul pakai `Heading` atau `font-serif` + ukuran dari hierarki; isi pakai `Text` atau `font-sans`; label/CTA/META pakai `font-display`.
3. **Spasi**: bungkus dengan `Section` atau ikuti `PageShell` + `py-16 md:py-24` + `max-w-6xl`; hindari margin acak yang tidak mengikuti kelipatan 4/8 Tailwind.
4. **Latar**: halaman konten marketing memakai `page-root`; kartu gelap memakai `GlassCard` agar gradient & garis atas konsisten.

Dengan ini, halaman baru tetap **selaras dan intuitif** dengan beranda serta halaman yang memakai `PageHeroHeader` + `Section`.
