/**
 * TEMPORARY CONFIG — Turso/SQLite adapter.
 * Used ONLY during migration. Do NOT deploy this file.
 * After migration is validated, update payload.config.ts instead.
 *
 * Usage:
 *   PAYLOAD_CONFIG_PATH=src/payload.config.turso.ts bun run <script>
 */

import { resendAdapter } from '@payloadcms/email-resend'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Berita } from './collections/Berita'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { LowonganKerja } from './collections/LowonganKerja'
import { UsahaAlumni } from './collections/UsahaAlumni'
import { ProfilOrganisasi } from './collections/ProfilOrganisasi'
import { Aktivitas } from './collections/Aktivitas'
import { Sponsor } from './collections/Sponsor'
import { KetuaIAM } from './collections/KetuaIAM'
import { Kepengurusan } from './collections/Kepengurusan'
import { Galeri } from './collections/Galeri'
import { GaleriKategori } from './collections/GaleriKategori'
import { Komunitas } from './collections/Komunitas'
import { AlumniMembers } from './collections/AlumniMembers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Logo: '@/components/Admin/Logo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    meta: {
      title: 'Admin',
      titleSuffix: ' | IAM ITB',
    },
    theme: 'light',
  },
  editor: defaultLexical,
  // TURSO — SQLite/LibSQL adapter
  db: sqliteAdapter({
    client: {
      url: process.env.TURSO_DATABASE_URL || '',
      authToken: process.env.TURSO_AUTH_TOKEN || '',
    },
    // Keep migration files separate from Postgres migrations
    migrationDir: path.resolve(dirname, '../migrations-turso'),
    // Allow explicit IDs during import (preserves Neon IDs in Turso)
    allowIDOnCreate: true,
  }),
  collections: [
    Pages,
    Berita,
    Media,
    Categories,
    Users,
    LowonganKerja,
    UsahaAlumni,
    Aktivitas,
    Sponsor,
    KetuaIAM,
    Kepengurusan,
    Galeri,
    GaleriKategori,
    Komunitas,
    AlumniMembers,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, ProfilOrganisasi],
  email: resendAdapter({
    defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'onboarding@resend.dev',
    defaultFromName: process.env.EMAIL_FROM_NAME || 'IAM ITB',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
