import { cn } from '@/utilities/ui'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
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

// --- FONT CONFIGURATIONS ---

// 1. Google Font: Montserrat (SemiBold/Medium for Subtitles per PDF)
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600'], 
  variable: '--font-montserrat',
  display: 'swap',
})

// 2. Local Font: ITC New Baskerville Std (Bold Roman/Italic for Titles per PDF)
// *Ensure these file names match exactly what is inside your public/font/ folder*
const baskerville = localFont({
  src: [
    {
      path: '../../fonts/title-sub-itc/ITCNewBaskervilleStd-Bold.woff2', // or .ttf / .otf
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/title-sub-itc/ITCNewBaskervilleStd-BoldIt.woff2',
      weight: '700',
      style: 'italic',
    }
  ],
  variable: '--font-baskerville',
  display: 'swap',
})

// 3. Local Font: Helvetica Neue (Regular for Body per PDF)
const helveticaNeue = localFont({
  src: '../../fonts/body-helvetica/HelveticaNeue-Regular.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-helvetica',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html 
      className={cn(
        montserrat.variable, 
        baskerville.variable, 
        helveticaNeue.variable
      )} 
      lang="id" 
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      {/* Set default font to sans (Helvetica) and standard colors */}
      <body className="font-sans antialiased bg-background text-foreground min-h-[100vh] flex flex-col">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

// ... keep existing metadata exports ...

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
