import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

type Collection = keyof Config['collections']

export async function getCachedDocument(collection: Collection, slug: string, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return page.docs[0]
}
