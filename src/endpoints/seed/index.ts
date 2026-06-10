import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import type { Activity, JobVacancy } from '@/payload-types'
import { defaultHeaderNavItems } from '@/config/defaultNav'
import { contactForm as contactFormData } from './contact-form'
import { pengajuanLowonganForm } from './pengajuan-lowongan-form'
import { usahaAlumniForm } from './usaha-alumni-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { plainTextToLexicalRoot } from '@/utilities/plainTextToLexicalRoot'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { dummyUsahaAlumniSeedData } from './usaha-alumni-businesses'

/** Order respects FK / NOT NULL uploads to media (avoid delete failures when dev DB has live rows). */
const collections: CollectionSlug[] = [
  'form-submissions',
  'search',
  'posts',
  'pages',
  'activities',
  'jobVacancies',
  'alumniMembers',
  'alumniBusinesses',
  'sponsors',
  'communities',
  'galleries',
  'iamPresidents',
  'managements',
  'forms',
  'categories',
  'media',
]

const globals: GlobalSlug[] = ['header', 'footer']

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // Sequential clears reduce PostgreSQL deadlocks when other connections hold rows (e.g. dev server).
  for (const global of globals) {
    await payload.updateGlobal({
      slug: global,
      data: {
        navItems: [],
      } as Record<string, unknown>,
      depth: 0,
      context: {
        disableRevalidate: true,
      },
    })
  }

  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} })
  }

  for (const collection of collections) {
    if (payload.collections[collection].config.versions) {
      await payload.db.deleteVersions({ collection, req, where: {} })
    }
  }

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const baseUrl = getServerSideURL()

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer, motorBuffer, tanggaBuffer] =
    await Promise.all([
      fetchFileByURL(`${baseUrl}/media/image-post1.webp`),
      fetchFileByURL(`${baseUrl}/media/image-post2.webp`),
      fetchFileByURL(`${baseUrl}/media/image-post3.webp`),
      fetchFileByURL(`${baseUrl}/media/image-hero1.webp`),
      fetchFileByURL(`${baseUrl}/media/motor.jpeg`),
      fetchFileByURL(`${baseUrl}/media/tangga.jpg`),
    ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc, motorDoc, tanggaDoc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'Motor' },
      file: motorBuffer,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'Tangga' },
      file: tanggaBuffer,
    }),
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    draft: false,
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    draft: false,
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    draft: false,
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    context: {
      disableRevalidate: true,
    },
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    context: {
      disableRevalidate: true,
    },
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    context: {
      disableRevalidate: true,
    },
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding forms...`)

  const [contactForm, _usahaForm, _lowonganForm] = await Promise.all([
    payload.create({
      collection: 'forms',
      depth: 0,
      data: contactFormData,
    }),
    payload.create({
      collection: 'forms',
      depth: 0,
      data: usahaAlumniForm,
    }),
    payload.create({
      collection: 'forms',
      depth: 0,
      data: pengajuanLowonganForm,
    }),
  ])

  payload.logger.info(`— Seeding aktivitas, sponsor, lowongan...`)

  const [activity1, activity2, sponsor1, sponsor2, job1, job2] = await Promise.all([
    payload.create({
      collection: 'activities',
      depth: 0,
      context: { disableRevalidate: true },
      draft: false,
      data: {
        activityName: 'Reuni Akbar IAM',
        slug: 'reuni-akbar',
        date: '2025-08-15T12:00:00.000Z',
        activityType: 'reuni',
        heroImage: motorDoc.id,
        description: plainTextToLexicalRoot(
          'Silaturahmi lintas angkatan dan pembentukan jaringan profesional.',
        ) as NonNullable<Activity['description']>,
      },
    }),
    payload.create({
      collection: 'activities',
      depth: 0,
      context: { disableRevalidate: true },
      draft: false,
      data: {
        activityName: 'Pulang Kampus',
        slug: 'pulang-kampus',
        date: '2025-09-01T12:00:00.000Z',
        activityType: 'pulang_kampus',
        heroImage: tanggaDoc.id,
        description: plainTextToLexicalRoot(
          'Berbagi pengalaman dengan mahasiswa teknik mesin ITB.',
        ) as NonNullable<Activity['description']>,
      },
    }),
    payload.create({
      collection: 'sponsors',
      depth: 0,
      context: { disableRevalidate: true },
      draft: false,
      data: {
        companyName: 'Mitra industri IAM',
        category: 'platinum',
        logo: image1Doc.id,
        shortDescription: 'Dukungan kegiatan dan program IAM ITB.',
        supportPeriod: '2025/2026',
        officialWebsite: 'https://example.com',
      },
    }),
    payload.create({
      collection: 'sponsors',
      depth: 0,
      context: { disableRevalidate: true },
      draft: false,
      data: {
        companyName: 'Partner teknologi',
        category: 'gold',
        logo: image2Doc.id,
        shortDescription: 'Kolaborasi riset dan rekrutmen alumni.',
        supportPeriod: '2025/2026',
        officialWebsite: 'https://example.com',
      },
    }),
    payload.create({
      collection: 'jobVacancies',
      depth: 0,
      context: { disableRevalidate: true },
      draft: false,
      data: {
        _status: 'published',
        position: 'Mechanical Design Engineer',
        slug: 'mechanical-design-engineer',
        companyName: 'PT Contoh Industri',
        companyLogo: image1Doc.id,
        location: 'Jakarta Selatan',
        workSetup: 'hybrid',
        experienceLevel: 'mid',
        salaryRange: 'IDR 8.000.000 - 12.000.000',
        employmentType: 'full_time',
        vacancyStatus: 'open',
        jobDescription: plainTextToLexicalRoot(
          'Merancang komponen mekanikal, berkolaborasi dengan tim produksi.',
        ) as NonNullable<JobVacancy['jobDescription']>,
        officialLink: 'https://example.com/karier',
      },
    }),
    payload.create({
      collection: 'jobVacancies',
      depth: 0,
      context: { disableRevalidate: true },
      draft: false,
      data: {
        _status: 'published',
        position: 'Internship — R&D',
        slug: 'internship-r-and-d',
        companyName: 'Startup Mekanikal',
        companyLogo: image2Doc.id,
        location: 'Bandung',
        workSetup: 'on_site',
        experienceLevel: 'entry',
        salaryRange: 'IDR 2.500.000 - 3.500.000',
        employmentType: 'magang',
        vacancyStatus: 'open',
        jobDescription: plainTextToLexicalRoot(
          'Program magang 3 bulan di divisi penelitian dan pengembangan.',
        ) as NonNullable<JobVacancy['jobDescription']>,
        officialLink: 'https://example.com/intern',
      },
    }),
  ])

  payload.logger.info(`— Seeding usaha alumni...`)

  await Promise.all(
    dummyUsahaAlumniSeedData.map((biz) =>
      payload.create({
        collection: 'alumniBusinesses',
        depth: 0,
        context: { disableRevalidate: true },
        draft: false,
        data: biz,
      }),
    ),
  )

  payload.logger.info(`— Seeding pages...`)

  const [_homePage, _contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      draft: false,
      data: home({
        heroImage: imageHomeDoc,
        metaImage: image2Doc,
        activityIds: [activity1.id, activity2.id],
        sponsorIds: [sponsor1.id, sponsor2.id],
        jobIds: [job1.id, job2.id],
      }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      draft: false,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: defaultHeaderNavItems,
      },
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Source Code',
              newTab: true,
              url: 'https://github.com/payloadcms/payload/tree/main/templates/website',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Payload',
              newTab: true,
              url: 'https://payloadcms.com/',
            },
          },
        ],
      },
      context: { disableRevalidate: true },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  // If it's a localhost URL, try to read from the filesystem first
  if (url.includes('localhost')) {
    try {
      const __filename = fileURLToPath(import.meta.url)
      const __dirname = path.dirname(__filename)
      const fileName = url.split('/').pop() || ''
      const localPath = path.resolve(__dirname, '../../../public/media', fileName)

      if (fs.existsSync(localPath)) {
        const data = fs.readFileSync(localPath)
        const ext = fileName.split('.').pop() || 'jpg'
        return {
          name: fileName,
          data,
          mimetype: ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : 'image/jpeg',
          size: data.length,
        }
      }
    } catch (_err) {
      // Fallback to fetch if filesystem fails
    }
  }

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()
  const name = url.split('/').pop() || `file-${Date.now()}`
  const ext = name.split('.').pop() || 'jpg'

  return {
    name,
    data: Buffer.from(data),
    mimetype: ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : 'image/jpeg',
    size: data.byteLength,
  }
}

