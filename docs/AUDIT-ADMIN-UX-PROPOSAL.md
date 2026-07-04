# Audit: Payload Admin UX — Findings & Non-Breaking Proposals

> Status: **A1(a), A2, A3, all B items, C1, and C3 IMPLEMENTED (2026-07-05).** C1 needs a one-time deploy step (see runbook below). Only C2 (user roles) remains open for decision.
> Scope: admin usability of collections/blocks, based on a full scan of `src/collections`, `src/blocks`, `src/heros`, `src/plugins`, globals, and the frontend pages that consume them.
> All proposals are non-breaking unless flagged ⚠ (those need a schema migration or change visible behavior).

---

## A. Bugs / correctness issues found during the audit

These are not UX polish — they can confuse or silently lose content.

### A1. Gallery embed-only entries never appear on `/galeri`
`src/app/(frontend)/galeri/page.tsx` filters items to those with a `media` object; entries that only have `embedUrl` (which the collection explicitly allows and validates) are silently dropped. An admin following the field description will think the site is broken.
**Proposal (pick one):**
- (a) Render embeds in `GaleriView` (YouTube/Vimeo iframe or thumbnail + lightbox), or
- (b) Short-term: change the `embedUrl` field description to say it is not yet displayed on the gallery page.
Documented as a warning in the new client docs meanwhile.

### A2. Galeri `beforeValidate` hook can false-fail on partial updates
`src/collections/Galeri/index.ts:23` checks only incoming `data`; an API/partial update that doesn't resend `media` would throw "Unggah berkas…" even though the stored doc has media.
**Proposal:** fall back to `originalDoc`:
```ts
const hasMedia = Boolean(data?.media ?? originalDoc?.media)
const embed = (data?.embedUrl ?? originalDoc?.embedUrl ?? '')
```
Non-breaking; only removes false errors.

### A3. Galeri list view is unusable (shows IDs)
No `useAsTitle`; `defaultColumns: ['description', 'updatedAt']` and description is optional, so rows often show blank/ID, and the relationship picker in other places shows raw IDs.
**Proposal:** `admin.useAsTitle: 'description'` + add `category` and `media` to `defaultColumns`. Optionally a `beforeChange` hook that fills an internal `title` from category + filename. Non-breaking.

---

## B. Admin ease-of-use improvements (non-breaking, low effort)

### B1. Media: auto-fill `name` from filename
`useAsTitle: 'name'` but `name` is optional → unnamed uploads show blank titles in lists and pickers.
**Proposal:** `beforeChange` hook: if `name` empty, set from `filename` (without extension). Add `admin.description` telling admins to rename meaningfully. Non-breaking, backfills nothing (optionally a one-off script for existing rows).

### B2. Media: nudge for `alt`
`alt` is optional (intentionally, `required` is commented out). Making it required would block re-saving old entries ⚠.
**Proposal:** keep optional, add `admin.description` ("Deskripsikan isi gambar — dipakai untuk SEO & aksesibilitas") and add `alt` to `defaultColumns` so gaps are visible.

### B3. Indonesian labels for template blocks
`CallToAction`, `Content`, `Archive`, `FormBlock`, `MediaBlock`, Banner/Code and the hero `type` options still show English labels/options, while everything else in the admin is Indonesian.
**Proposal:** add `labels` + field `label`/option labels in Indonesian (e.g. "Ajakan / CTA", "Konten Kolom", "Daftar Berita", "Formulir", "Media"). Cosmetic only — slugs/`interfaceName` untouched, so no schema or type changes.

### B4. Group and localize plugin collections
`Forms`, `Form Submissions`, `Redirects`, `Search` have no `admin.group` → they float ungrouped in the sidebar in English.
**Proposal:** via plugin `overrides`, set `admin.group: 'Pengaturan situs'` (and `admin.hidden` for `search` docs, which admins never need to edit). Non-breaking.

### B5. Add `admin.description` to relationship-driven blocks
`HighlightAktivitas/Sponsor/Lowongan` give no hint that (a) the source entries must be created first, (b) only *published* vacancies render, (c) max rows exist.
**Proposal:** add one-line descriptions to each block and to the `vacancies` field ("Hanya lowongan berstatus Published yang tampil di situs"). Non-breaking.

### B6. HighlightSponsor: add `maxRows`
Aktivitas caps at 3, Lowongan at 6, Sponsor is unlimited — likely an oversight and lets an admin bloat the homepage.
**Proposal:** `maxRows: 12` (generous). Note: existing docs over the cap remain valid; the limit only blocks *adding* more. Effectively non-breaking.

### B7. Consistent list columns & search fields
Several collections miss useful `defaultColumns`/`listSearchableFields` (e.g. `Komunitas` has no defaultColumns; `Sponsor` can't be searched by category; `NilaiFilosofi` already good).
**Proposal:** small `admin` additions across Komunitas, Galeri, Kepengurusan, KetuaIAM. Non-breaking.

### B8. Form-dependent automation is keyed on form **title**
`formSubmissionCreateDrafts` matches `form.title === 'Pengajuan Usaha Alumni' / 'Pengajuan Lowongan'`. If an admin renames a form, moderation intake silently stops.
**Proposal (non-breaking hardening):** match on env-configured form IDs *or* keep title match but add a warning `admin.description` on the Forms collection via override ("Jangan mengubah judul form Pengajuan…"). Documented in client docs already.

### B9. WhatsApp/contact format validation
`contactWhatsApp` (Lowongan) and `contactWhatsapp` (Profil Organisasi) are free text; a `+62` or spaces breaks wa.me links.
**Proposal:** lenient `validate` that accepts digits only and gives an Indonesian error message, or a `beforeValidate` normalizer that strips `+`, spaces, dashes (normalizer is safer — never blocks saves). Recommend the normalizer.

---

## C. Workflow improvements (worth discussing, slightly bigger)

### C1. ⚠ Drafts for "instantly public" collections
Aktivitas, Galeri, Komunitas, NilaiFilosofi, Sponsor go live on Save. For NilaiFilosofi especially (long block-built pages), a half-finished edit is immediately public.
**Proposal:** enable `versions: { drafts: true }` on **NilaiFilosofi** (highest risk) first. Requires a DB migration and a one-time "publish all existing docs" step — that's why it's flagged. Others can follow later if the client wants.

### C2. ⚠ User roles
Every user is a full admin (can delete users, change globals). If the client will onboard many editors, add a `role` select (`admin` / `editor`) and gate `Users`/globals access. Schema addition + access-function changes; migration is trivial (default `editor`, promote manually). Flagging for a decision, not urgent.

### C3. Moderation quality-of-life
`/moderasi` exists and works. Two cheap adds: link to it from the admin dashboard (`beforeDashboard` component already exists — add a card), and add `_status` filter presets. Non-breaking.

---

## Suggested execution order (if approved)

| Batch | Items | Status |
|---|---|---|
| 1 — quick wins | A2, A3, B1, B2, B5, B6, B7 | ✅ Done |
| 2 — labels/grouping | B3, B4 | ✅ Done |
| 3 — hardening | B8 (warning-description variant), B9 (normalizer variant) | ✅ Done |
| 4 — embed rendering | A1(a) — YouTube/Vimeo embeds now render on /galeri (frontend-only, no migration needed) | ✅ Done |
| 5 — workflow | C1 (drafts for NilaiFilosofi), C3 (moderation QoL) | ✅ Code done — C1 needs a deploy step (below) |
| 6 — open decision | C2 (user roles / editor vs admin) | ⏳ awaiting decision |

---

## C1 deploy runbook (REQUIRED — read before deploying)

Enabling drafts on `values-philosophy` is a **schema change** (adds a `_status` column and version tables). The code is done, but two operational steps must happen **in order** or the existing Nilai & Filosofi pages will disappear from the public site:

1. **Apply the schema change.** This project develops with the SQLite adapter's *push* (auto-sync) against Turso, so simply running the app with the new code adds the `_status` column and version tables. If you deploy with migrations instead, generate & run one first:
   ```
   pnpm payload migrate:create    # generates the migration from the live schema
   pnpm migrate:turso:schema      # applies it
   ```
2. **Republish existing entries** (one-time — existing rows become non-published when drafts turn on):
   ```
   pnpm tsx scripts/publish-existing-philosophy.ts
   ```
   Safe to re-run. After this, every existing entry is `published` and visible again.

From then on: editing a Nilai & Filosofi entry saves a **draft**; it only reaches the public site after clicking **Publish** (same as Halaman/Berita). The seed script (`scripts/seed-philosophy.ts`) was updated to publish what it seeds, so re-seeding stays visible.

Read access was switched from `authenticatedOrPublicRead` (always-true) to `authenticatedOrPublished`, so drafts are hidden from the public. All three frontend reads already use `overrideAccess: false`, so no page code changed.

## C3 — what was done

- Added a prominent **Moderasi Pengajuan** call-to-action card at the top of the admin dashboard (`BeforeDashboard`), replacing the buried list-item link.
- Both moderated collections (`jobVacancies`, `alumniBusinesses`) already expose `_status` as a list column, so admins can sort/filter Draft vs Published directly in the list view.
