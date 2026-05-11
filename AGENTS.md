# IAM ITB - Project Development Handbook

This document serves as the single source of truth for the **IAM ITB (Ikatan Alumni Mesin ITB)** project. All agents and developers must follow these rules to ensure technical consistency, security, and brand integrity.

## 1. Technical Stack

- **Core**: Next.js 15 (App Router), React 19, TypeScript
- **CMS**: Payload 3.0
- **Database**: PostgreSQL (via `@payloadcms/db-postgres`)
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm (preferred) or Bun
- **Image Processing**: Sharp

## 2. Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Frontend pages & layouts
│   └── (payload)/           # Payload Admin Panel routes
├── collections/             # Payload Collection configurations
├── globals/                 # Payload Global configurations
├── components/
│   ├── ui/                  # Standardized UI Design System components
│   └── ...                  # Other project components
├── utilities/               # Helper functions (cn, mergeOpenGraph, etc.)
├── fields/                  # Reusable Payload field configurations
└── payload.config.ts        # Main Payload configuration
```

## 3. Frontend Design System (MANDATORY)

To maintain the "IAM ITB Premium" look, **never** use raw HTML tags for text or layout if a Design System component exists.

### Typography
- **Heading**: Use `<Heading level={1-4} tone="default|inverse|accent|muted" />`
  - Font: ITC New Baskerville Std (Serif)
- **Text**: Use `<Text variant="body|editorial|lead|small" tone="default|inverse|accent|strong|light" />`
  - Font: Helvetica Neue (Sans)
- **Eyebrow**: Use `<Eyebrow tone="red|gold|white|muted" />`
  - Font: Montserrat (Display), Uppercase, high tracking. Used for labels above headings.

### Layout & UI
- **Section**: Use `<Section />` for consistent vertical padding and horizontal containment.
- **GlassCard**: Use `<GlassCard variant="default|stripes" />` for the signature navy glass effect.
- **Button**: Use the standardized `<Button />` component with variants `primary`, `secondary`, `outline`, etc.

### Brand Colors
- **Navy (Primary)**: `#253041` (mapped to `brand-primary`)
- **Dark Navy (Deep)**: `#06162F` (mapped to `brand-dark`)
- **Gold (Accent)**: `#F0D637` (mapped to `brand-gold`)
- **Red (Secondary)**: `#590F11` (mapped to `brand-red`)
- **Khaki (Muted)**: `#F4EDE1` (mapped to `brand-khaki`)

## 4. Content Guidelines

- **Language**: The website frontend is in **Indonesian**. Use proper Indonesian (EYD) for labels and content.
- **Editorial Tone**: Professional, prestigious, and collaborative. "For Union Machine Strong".
- **Naming**: Use Indonesian terms for user-facing collections:
  - `Berita` (News)
  - `Lowongan Kerja` (Jobs)
  - `Usaha Alumni` (Alumni Businesses)
  - `Aktivitas` (Activities)

## 5. Payload CMS Development Rules

### TypeScript & Types
- Run `npm run generate:types` after any schema change.
- Import types from `@/payload-types`.
- Use `as const` for select field options.

### CRITICAL SECURITY: Local API
- **Rule**: When passing `user` to Local API, ALWAYS set `overrideAccess: false`.
- **Reason**: By default, Local API bypasses all access control.

```typescript
// ✅ SECURE
await payload.find({
  collection: 'berita',
  user: req.user,
  overrideAccess: false,
})
```

### Transaction Safety in Hooks
- **Rule**: ALWAYS pass `req` to nested operations in hooks to maintain atomicity.

```typescript
// ✅ ATOMIC
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      await req.payload.create({
        collection: 'audit-log',
        data: { docId: doc.id },
        req, // REQUIRED
      })
    },
  ],
}
```

### Hook Loops
- Use `context.skipHooks` or similar flags to prevent infinite loops when updating the same document in an `afterChange` hook.

## 6. Development Workflow

1. **Schema Change**: Modify collection -> Run `generate:types` -> Update frontend components.
2. **UI Component**: Always check `src/components/ui` before creating a new component.
3. **Admin Panel**: If adding a custom component to the admin panel, define it using the file path in `payload.config.ts` and ensure it's compatible with the Next.js App Router.
4. **Validation**: Run `tsc --noEmit` to check for type errors before committing.

---
*IAM ITB - For Union Machine Strong*
