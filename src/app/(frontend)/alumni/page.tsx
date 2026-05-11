import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Section } from '@/components/ui/section'
import { Heading, Text, Eyebrow } from '@/components/ui/typography'
import { Media } from '@/components/Media'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Direktori Alumni | IAM ITB',
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
    <main className="min-h-screen pt-24 pb-12 bg-brand-primary overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-red rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-brand-gold rounded-full blur-3xl mix-blend-multiply" />
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
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {alumniData.docs.map((alumni) => {
            const photo = typeof alumni.photo === 'object' && alumni.photo !== null ? alumni.photo : null
            const hasLink = !!alumni.linkedInUrl

            const cardContent = (
              <div className="group relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full cursor-pointer transition-transform duration-500 hover:scale-110 hover:z-20">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-brand-primary/50 shadow-lg bg-brand-khaki flex items-center justify-center">
                  {photo ? (
                    <Media resource={photo} fill className="object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-brand-primary/20">
                      {alumni.fullName.charAt(0)}
                    </span>
                  )}
                </div>
                
                {/* Hover Tooltip / Info Card */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 scale-95 group-hover:scale-100">
                  <div className="bg-white text-brand-primary p-4 rounded-xl shadow-2xl relative">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
                    <Heading level={4} tone="default" className="text-sm mb-1 relative z-10 text-center">
                      {alumni.fullName}
                    </Heading>
                    <Text variant="small" tone="muted" className="text-center block mb-1">
                      M {alumni.graduationYear}
                    </Text>
                    {(alumni.headline || alumni.employer) && (
                      <Text variant="small" tone="default" className="text-center font-semibold border-t pt-2 mt-2">
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
    </main>
  )
}
