import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Wadah strategis yang menghimpun alumni lintas angkatan Fakultas Teknik Mesin dan Dirgantara ITB untuk menjaga silaturahmi, memperkuat jejaring profesional, dan berkontribusi bagi almamater.',
  images: [
    {
      url: `${getServerSideURL()}/logo.png`,
    },
  ],
  siteName: 'IAM ITB',
  title: 'IAM ITB',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
