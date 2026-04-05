import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="id" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'IAM ITB',
    template: '%s - IAM ITB',
  },
  description:
    'Wadah strategis yang menghimpun alumni lintas angkatan Fakultas Teknik Mesin dan Dirgantara ITB untuk menjaga silaturahmi, memperkuat jejaring profesional, dan berkontribusi bagi almamater.',
  openGraph: {
    ...mergeOpenGraph(),
    title: 'IAM ITB',
    description:
      'Wadah strategis yang menghimpun alumni lintas angkatan Fakultas Teknik Mesin dan Dirgantara ITB untuk menjaga silaturahmi, memperkuat jejaring profesional, dan berkontribusi bagi almamater.',
    url: getServerSideURL(),
    siteName: 'Ikatan Alumni Mahasiswa Teknik Mesin ITB',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Logo Ikatan Alumni Mahasiswa Teknik Mesin ITB',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}
