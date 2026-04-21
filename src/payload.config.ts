import { postgresAdapter } from '@payloadcms/db-postgres'
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
import { Komunitas } from './collections/Komunitas'
import { AlumniMembers } from './collections/AlumniMembers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
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
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    meta: {
      title: 'IAM ITB',
      titleSuffix: ' - IAM ITB',
    },
    /** Light theme only — matches IAM admin styling in `app/(payload)/custom.scss`. */
    theme: 'light',
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
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
    Komunitas,
    AlumniMembers,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, ProfilOrganisasi],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
