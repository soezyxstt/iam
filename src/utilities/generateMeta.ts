import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const BRAND_SUFFIX = ' - IAM ITB'
const BRAND_DEFAULT_TITLE = 'Beranda'
const BRAND_DEFAULT_DESCRIPTION =
  'Wadah strategis yang menghimpun alumni lintas angkatan Fakultas Teknik Mesin dan Dirgantara ITB untuk menjaga silaturahmi, memperkuat jejaring profesional, dan berkontribusi bagi almamater.'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/logo.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const baseTitle = doc?.meta?.title || BRAND_DEFAULT_TITLE
  const title = `${baseTitle}${BRAND_SUFFIX}`

  const description = doc?.meta?.description || BRAND_DEFAULT_DESCRIPTION

  return {
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
