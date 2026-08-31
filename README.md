# IAM ITB

Production website and content platform for **Ikatan Alumni Mesin Institut Teknologi Bandung**.

**Live:** [iamitb.org](https://iamitb.org)

## Product features

### Alumni & public experience

- **News & publishing** — article listing, detail pages, categories, pagination, and related content.
- **Activities** — activity listings and dedicated detail pages for IAM programs and events.
- **Alumni business directory** — browse alumni-owned businesses and submit new businesses for review.
- **Job board** — browse job openings and submit vacancies through a public flow.
- **Communities** — dedicated community pages with structured content.
- **Organization** — IAM profile, management structure, philosophy, and previous-chairperson history.
- **Gallery & sponsors** — media gallery and sponsor showcase managed from the CMS.
- **Site search & contact** — searchable content plus reusable public forms.

### CMS & editorial workflow

- **Payload CMS 3 admin** for news, activities, businesses, jobs, communities, sponsors, galleries, organization data, pages, and media.
- **Drafts & live preview** so editors can review changes before publishing.
- **Submission moderation** for user-submitted jobs and alumni businesses.
- **Role-aware access** for public and authenticated CMS operations.
- **Reusable page blocks** for flexible content-managed pages.
- **SEO, XML sitemaps, redirects, search indexing, and scheduled publishing**.
- **Media and data migration tools**, including Turso and S3/R2 workflows.

## Stack

`Next.js 15` `React 19` `TypeScript` `Payload CMS 3` `Turso/SQLite` `S3/R2` `Tailwind CSS` `Vitest` `Playwright`

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
   ├─ Content & editorial workflows
   ├─ Turso / SQLite
   └─ S3-compatible media storage
```

## Quality & delivery

- Vitest integration tests
- Playwright end-to-end and visual tests
- Docker support
- GitHub Actions production deployment

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

Built as a production digital platform for IAM ITB and deployed at [iamitb.org](https://iamitb.org).
