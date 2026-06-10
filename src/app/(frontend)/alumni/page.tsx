import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Section } from '@/components/ui/section'
import { Heading, Text, Eyebrow } from '@/components/ui/typography'
import { Media } from '@/components/Media'
import { Metadata } from 'next'
import { PageShell } from '@/components/PageShell'
import { PageClient } from './page.client'

export const metadata: Metadata = {
  title: 'Direktori Alumni',
  description: 'Basis data alumni Teknik Mesin ITB.',
}

export default async function AlumniPage() {
  const payload = await getPayload({ config: configPromise })
  
  const alumniData = await payload.find({
    collection: 'alumniMembers',
    where: {
      listPublicly: {
        equals: true,
      },
    },
    overrideAccess: false,
    limit: 500, // Or implement pagination
    sort: '-graduationYear',
  })

  return (
    <PageShell
      className="bg-linear-to-b from-[#06162F] via-[#253041] to-[#03060c] min-h-screen relative z-0"
      showAmbient={false}
      darkTheme={true}
    >
      <PageClient />

      {/* Background Ambient Glow Blobs - Premium Blue, Gold, and Red styling */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Top left deep blue */}
        <div className="absolute top-[5%] left-[5%] h-[400px] w-[400px] rounded-full bg-brand-primary/20 blur-[120px]" />
        {/* Top right gold */}
        <div className="absolute top-[15%] right-[10%] h-[350px] w-[350px] rounded-full bg-brand-gold/12 blur-[100px]" />
        {/* Mid left brand red */}
        <div className="absolute top-[40%] left-[-5%] h-[380px] w-[380px] rounded-full bg-brand-red-light/15 blur-[110px]" />
        {/* Bottom right gold */}
        <div className="absolute bottom-[20%] right-[5%] h-[450px] w-[400px] rounded-full bg-brand-gold/10 blur-[130px]" />
      </div>

      <Section className="py-12 md:py-24 relative z-10">
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <Eyebrow tone="gold" className="mb-4">
            Jaringan Alumni
          </Eyebrow>
          <Heading level={1} tone="inverse" className="mb-6">
            Direktori Alumni
          </Heading>
          <Text variant="lead" tone="light">
            Temukan dan jalin koneksi dengan sesama alumni Teknik Mesin ITB dari berbagai angkatan dan profesi di seluruh dunia.
          </Text>
        </div>

        {/* Dynamic Avatar Gallery */}
        <div className="container flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {alumniData.docs.map((alumni) => {
            const photo = typeof alumni.photo === 'object' && alumni.photo !== null ? alumni.photo : null
            const hasLink = !!alumni.linkedInUrl

            const cardContent = (
              <div className="group relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full cursor-pointer transition-transform duration-500 hover:scale-110 hover:z-20">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/10 group-hover:border-brand-gold/60 shadow-lg bg-brand-dark/40 flex items-center justify-center transition-all duration-300">
                  {photo ? (
                    <Media resource={photo} fill className="object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-brand-gold/70 group-hover:text-brand-gold transition-colors">
                      {alumni.fullName.charAt(0)}
                    </span>
                  )}
                </div>
                
                {/* Hover Tooltip / Info Card - Premium Dark Glass Card */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 scale-95 group-hover:scale-100">
                  <div className="bg-brand-dark/95 border border-white/10 text-white p-4 rounded-xl shadow-2xl relative backdrop-blur-md">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#06162F] border-t border-l border-white/10 rotate-45" />
                    <Heading level={4} tone="inverse" className="text-sm mb-1 relative z-10 text-center text-white">
                      {alumni.fullName}
                    </Heading>
                    <Text variant="small" className="text-center block mb-1 text-white/60">
                      M {alumni.graduationYear}
                    </Text>
                    {(alumni.headline || alumni.employer) && (
                      <Text variant="small" className="text-center font-semibold border-t border-white/10 pt-2 mt-2 text-brand-gold">
                        {alumni.headline} {alumni.employer ? `@ ${alumni.employer}` : ''}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            )

            if (hasLink) {
              return (
                <a key={alumni.id} href={alumni.linkedInUrl as string} target="_blank" rel="noopener noreferrer" className="block relative z-10 hover:z-20">
                  {cardContent}
                </a>
              )
            }

            return <div key={alumni.id} className="relative z-10 hover:z-20">{cardContent}</div>
          })}
          
          {alumniData.docs.length === 0 && (
            <div className="text-center py-24 w-full">
              <Text variant="body" tone="light">
                Belum ada data alumni yang dipublikasikan.
              </Text>
            </div>
          )}
        </div>
      </Section>
    </PageShell>
  )
}
