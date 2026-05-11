import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { Section } from '@/components/ui/section'
import { Heading, Text, Eyebrow } from '@/components/ui/typography'

import { Media } from '@/components/Media'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { Metadata } from 'next'
import { formatDateTime } from '@/utilities/formatDateTime'
import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = '' } = await params
  const payload = await getPayload({ config: configPromise })
  
  const communityQuery = await payload.find({
    collection: 'communities',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const community = communityQuery.docs[0]

  if (!community) {
    return {
      title: 'Not Found | IAM ITB',
    }
  }

  return {
    title: `${community.communityName} | IAM ITB`,
    description: community.shortDescription,
  }
}

export default async function KomunitasDetail({ params }: Args) {
  const { slug = '' } = await params
  const payload = await getPayload({ config: configPromise })

  const communityQuery = await payload.find({
    collection: 'communities',
    where: {
      slug: {
        equals: slug,
      },
    },
    overrideAccess: false,
    limit: 1,
  })

  const community = communityQuery.docs[0]

  if (!community) {
    return notFound()
  }

  const hasRelatedPosts = community.relatedPosts && community.relatedPosts.length > 0
  const bgImage = typeof community.heroImage === 'object' && community.heroImage !== null ? community.heroImage : null
  const logo = typeof community.logo === 'object' && community.logo !== null ? community.logo : null

  return (
    <PageShell>
      {/* Hero Section with Background */}
      <section className="relative z-10 w-full pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-brand-primary">
        {bgImage && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Media resource={bgImage} fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/80 to-transparent" />
          </div>
        )}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              {logo && (
                <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 relative rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white flex items-center justify-center p-3 md:p-5">
                  <Media resource={logo} fill className="object-contain" />
                </div>
              )}
              <div className="text-center md:text-left pt-2 md:pt-6">
                <Eyebrow tone="gold" className="mb-4">Komunitas IAM ITB</Eyebrow>
                <Heading level={1} tone="inverse" className="mb-4 text-3xl md:text-5xl">
                  {community.communityName}
                </Heading>
                <Text variant="lead" tone="light" className="max-w-2xl">
                  {community.shortDescription}
                </Text>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Section className="z-10 py-16 md:py-24" containerClassName="max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            {community.visionMission && (
              <ScrollReveal>
                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-brand-dark prose-p:text-brand-dark/80 max-w-none">
                  <Eyebrow tone="red" className="mb-4">Arah Komunitas</Eyebrow>
                  <Heading level={2} className="mb-6">Visi & Misi</Heading>
                  <RichText data={community.visionMission} enableGutter={false} />
                </div>
              </ScrollReveal>
            )}
            
            {community.joinInformation && (
              <ScrollReveal>
                <div className="p-8 md:p-10 border-t-4 border-t-brand-red rounded-3xl bg-white/40 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <Eyebrow tone="red" className="mb-4">Keanggotaan</Eyebrow>
                  <Heading level={3} className="mb-6 text-brand-dark">Cara Bergabung</Heading>
                  <div className="prose max-w-none prose-p:text-brand-dark/80">
                    <RichText data={community.joinInformation} enableGutter={false} />
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <ScrollReveal>
              <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] sticky top-32">
                <Heading level={3} className="mb-6 pb-4 border-b border-brand-dark/10 text-brand-dark">
                  Informasi Kontak
                </Heading>
                {community.contactPerson ? (
                  <div className="mb-4">
                    <Text variant="small" tone="muted" className="block mb-1 font-display uppercase tracking-widest">Pengelola</Text>
                    <Text variant="body" tone="strong" className="font-serif text-lg text-brand-dark">{community.contactPerson}</Text>
                  </div>
                ) : (
                  <Text variant="editorial" tone="muted">
                    Belum ada informasi kontak.
                  </Text>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* Related News Section */}
      {hasRelatedPosts && (
        <section className="relative z-10 border-t border-brand-dark/10 bg-linear-to-b from-brand-dark/3 to-transparent py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <ScrollReveal className="mb-12 text-center lg:text-left">
              <Eyebrow tone="red">Seputar Komunitas</Eyebrow>
              <Heading level={2} className="mt-3">
                Berita Terkait
              </Heading>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {community.relatedPosts?.map((relation, i) => {
                if (typeof relation === 'number' || typeof relation === 'string') return null
                const post = relation
                const heroImage = typeof post.heroImage === 'object' && post.heroImage !== null ? post.heroImage : null

                return (
                  <ScrollReveal key={i}>
                    <Link href={`/berita/${post.slug}`} className="block group h-full">
                      <div className="h-full border border-brand-dark/10 overflow-hidden transition-all duration-300 hover:shadow-xl bg-white rounded-xl flex flex-col group-hover:-translate-y-1">
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-khaki">
                          {heroImage ? (
                            <Media
                              resource={heroImage}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-brand-dark/5" />
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <Text variant="small" tone="muted" className="mb-3 font-display tracking-wider uppercase text-[10px]">
                            {post.publishedAt ? formatDateTime(post.publishedAt) : 'Tanpa Tanggal'}
                          </Text>
                          <Heading level={4} tone="default" className="mb-4 group-hover:text-brand-red transition-colors line-clamp-2">
                            {post.title}
                          </Heading>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  )
}
