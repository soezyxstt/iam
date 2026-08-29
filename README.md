# IAM ITB Website

Full-stack website and content platform for **Ikatan Alumni Mesin Institut Teknologi Bandung (IAM ITB)**.

The application combines a public alumni website with a Payload CMS backend for news, activities, sponsors, organization content, and editorial workflows.

## Product areas

- Public organization website
- News and publishing workflow
- Alumni activities and programs
- Sponsor management
- Organization and values/philosophy content
- Payload CMS admin panel
- SEO, search, redirects, and scheduled publishing

## Engineering highlights

- **Payload CMS + Next.js** in a single full-stack application
- Structured content collections for posts, activities, sponsors, and organization content
- Draft/live-preview editorial workflow
- Role-aware CMS access control
- Media and content management
- Automated SEO and sitemap support
- Integration and end-to-end testing with Vitest and Playwright
- Infrastructure migration tooling for database and object storage

## Stack

- **Next.js 15**
- **React 19 + TypeScript**
- **Payload CMS 3**
- **PostgreSQL / SQLite-compatible Payload adapters**
- **S3-compatible object storage**
- **Tailwind CSS**
- **Vitest + Playwright**

## Infrastructure tooling

The repository includes scripts for migrating application data and media between infrastructure providers, including:

```text
PostgreSQL / Neon
      │
      ├─ schema + data export
      ▼
SQLite / Turso-compatible database

Media
      │
      ▼
S3-compatible / R2 storage
```

Migration scripts include export, import, validation, schema migration, and media-upload workflows.

## Application architecture

```text
Visitors
   │
   ▼
Next.js frontend
   │
   ▼
Payload CMS
 ├─ Posts / news
 ├─ Activities
 ├─ Sponsors
 ├─ Organization content
 ├─ Media
 └─ Editorial workflows
```

## Local development

```bash
pnpm install
pnpm dev
```

Copy the example environment configuration and provide the required database, storage, and application secrets before running the full CMS workflow.

## Validation

```bash
pnpm test
pnpm build
```

## Context

Built as the digital platform for Ikatan Alumni Mesin ITB and maintained as a production-oriented full-stack/CMS project.
