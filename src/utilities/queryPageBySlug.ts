import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

const HOME_DEPTH = 2 as const

export const queryPageBySlug = cache(
  async ({
    slug,
  }: {
    slug: string
  }): Promise<RequiredDataFromCollectionSlug<'pages'> | null> => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      depth: HOME_DEPTH,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0] ?? null
  },
)
