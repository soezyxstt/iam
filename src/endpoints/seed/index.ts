import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

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

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
  'activities',
  'sponsors',
  'jobVacancies',
  'alumniMembers',
  'alumniBusinesses',
  'communities',
  'galleries',
  'iamPresidents',
  'managements',
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

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        } as any,
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

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

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
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
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
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
      data: {
        activityName: 'Reuni Akbar IAM',
        date: '2025-08-15T12:00:00.000Z',
        activityType: 'reuni',
        description: plainTextToLexicalRoot(
          'Silaturahmi lintas angkatan dan pembentukan jaringan profesional.',
        ) as NonNullable<Activity['description']>,
      },
    }),
    payload.create({
      collection: 'activities',
      depth: 0,
      context: { disableRevalidate: true },
      data: {
        activityName: 'Pulang Kampus',
        date: '2025-09-01T12:00:00.000Z',
        activityType: 'pulang_kampus',
        description: plainTextToLexicalRoot(
          'Berbagi pengalaman dengan mahasiswa teknik mesin ITB.',
        ) as NonNullable<Activity['description']>,
      },
    }),
    payload.create({
      collection: 'sponsors',
      depth: 0,
      context: { disableRevalidate: true },
      data: {
        companyName: 'Mitra industri IAM',
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
      data: {
        companyName: 'Partner teknologi',
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
        companyName: 'PT Contoh Industri',
        employmentType: 'full_time',
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
        companyName: 'Startup Mekanikal',
        employmentType: 'internship',
        jobDescription: plainTextToLexicalRoot(
          'Program magang 3 bulan di divisi penelitian dan pengembangan.',
        ) as NonNullable<JobVacancy['jobDescription']>,
        officialLink: 'https://example.com/intern',
      },
    }),
  ])

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
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
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
