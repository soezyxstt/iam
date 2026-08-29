# IAM ITB Website

Full-stack website and content platform for Ikatan Alumni Mesin Institut Teknologi Bandung.

## Features

- Public alumni website
- News and publishing workflows
- Activities and sponsor management
- Payload CMS admin panel
- Draft and live-preview editing
- Role-aware access control
- SEO, search, redirects, and scheduled publishing
- Database and media migration tools

## Stack

`Next.js 15` `React 19` `TypeScript` `Payload CMS 3` `PostgreSQL` `S3/R2` `Tailwind CSS` `Vitest` `Playwright`

## Architecture

```text
Visitors
   │
   ▼
Next.js frontend
   │
   ▼
Payload CMS
   │
   ├─ Content
   ├─ Media
   └─ Editorial workflows
```

## Development

```bash
pnpm install
pnpm dev
```

Validation:

```bash
pnpm test
pnpm build
```

Built as a production-oriented digital platform for IAM ITB.
