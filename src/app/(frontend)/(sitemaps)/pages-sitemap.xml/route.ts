import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const dateFallback = new Date().toISOString()

    // 1. Fetch CMS Pages
    const pages = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    })

    // 2. Fetch Activities
    const activities = await payload.find({
      collection: 'activities',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: { slug: true, updatedAt: true },
    })

    // 3. Fetch Alumni Businesses
    const businesses = await payload.find({
      collection: 'alumniBusinesses',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    })

    // 4. Fetch Communities
    const communities = await payload.find({
      collection: 'communities',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: { slug: true, updatedAt: true },
    })

    // 5. Fetch Previous Chairs
    const chairs = await payload.find({
      collection: 'iamPresidents',
      overrideAccess: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: { slug: true, updatedAt: true },
    })

    const defaultSitemap = [
      { loc: `${SITE_URL}/`, lastmod: dateFallback },
      { loc: `${SITE_URL}/organisasi`, lastmod: dateFallback },
      { loc: `${SITE_URL}/aktivitas`, lastmod: dateFallback },
      { loc: `${SITE_URL}/berita`, lastmod: dateFallback },
      { loc: `${SITE_URL}/alumni`, lastmod: dateFallback },
      { loc: `${SITE_URL}/usaha-alumni`, lastmod: dateFallback },
      { loc: `${SITE_URL}/komunitas`, lastmod: dateFallback },
      { loc: `${SITE_URL}/galeri`, lastmod: dateFallback },
      { loc: `${SITE_URL}/sponsor`, lastmod: dateFallback },
      { loc: `${SITE_URL}/kontak`, lastmod: dateFallback },
      { loc: `${SITE_URL}/search`, lastmod: dateFallback },
      { loc: `${SITE_URL}/pengajuan-usaha-alumni`, lastmod: dateFallback },
    ]

    const cmsPages = pages.docs.map((page) => ({
      loc: page.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page.slug}`,
      lastmod: page.updatedAt || dateFallback,
    }))

    const activityRoutes = activities.docs.map((act) => ({
      loc: `${SITE_URL}/aktivitas/${act.slug}`,
      lastmod: act.updatedAt || dateFallback,
    }))

    const businessRoutes = businesses.docs.map((biz) => ({
      loc: `${SITE_URL}/usaha-alumni/${biz.slug}`,
      lastmod: biz.updatedAt || dateFallback,
    }))

    const communityRoutes = communities.docs.map((com) => ({
      loc: `${SITE_URL}/komunitas/${com.slug}`,
      lastmod: com.updatedAt || dateFallback,
    }))

    const chairRoutes = chairs.docs.map((chair) => ({
      loc: `${SITE_URL}/organisasi/ketua-sebelumnya/${chair.slug}`,
      lastmod: chair.updatedAt || dateFallback,
    }))

    return [
      ...defaultSitemap,
      ...cmsPages,
      ...activityRoutes,
      ...businessRoutes,
      ...communityRoutes,
      ...chairRoutes,
    ].filter((item, index, self) => index === self.findIndex((t) => t.loc === item.loc))
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
