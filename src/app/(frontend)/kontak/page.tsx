import React from 'react'
import { Section } from '@/components/ui/section'
import { Heading, Text, Eyebrow } from '@/components/ui/typography'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Metadata } from 'next'
import { sendEmail } from './actions'
import { PageShell } from '@/components/PageShell'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PageHeroHeader } from '@/components/ui/page-hero-header'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Hubungi pengurus IAM ITB.',
}

export const revalidate = 600

export default async function KontakPage() {
  const payload = await getPayload({ config: configPromise })
  const orgProfile = await payload.findGlobal({
    slug: 'organizationProfile',
    overrideAccess: false,
    depth: 0,
  })

  const op = orgProfile as unknown as Record<string, unknown>
  const email = op.contactEmail as string | null | undefined
  const whatsapp = op.contactWhatsapp as string | null | undefined
  const instagram = op.contactInstagram as string | null | undefined
  return (
    <PageShell>
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4">
        <ScrollReveal>
          <PageHeroHeader title="Hubungi Kami" subtitle="Mari Terhubung dan Berkolaborasi" />
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-12 md:pt-0 md:pb-24">
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-0 lg:gap-y-0">
            {/* Contact Info Sidebar */}
            <div className="flex flex-col lg:col-span-4 lg:pr-12">
              <Eyebrow tone="red">Saluran Komunikasi</Eyebrow>
              <Heading level={2} className="mt-3 mb-8">
                Terbuka untuk Kolaborasi
              </Heading>
              <Text variant="editorial" className="leading-relaxed mb-12">
                Kami selalu terbuka untuk mendengar ide, saran, maupun pertanyaan dari seluruh alumni Teknik Mesin ITB. Jangan ragu untuk menjangkau kami melalui saluran berikut.
              </Text>

              <div className="space-y-8">
                {email && (
                  <div className="group">
                    <Text variant="small" tone="muted" className="mb-2 font-display uppercase tracking-wider text-[10px] font-bold">Email Resmi</Text>
                    <a href={`mailto:${email}`} className="block text-brand-dark font-serif font-bold text-xl hover:text-brand-red transition-colors">
                      {email}
                    </a>
                  </div>
                )}
                {whatsapp && (
                  <div className="group">
                    <Text variant="small" tone="muted" className="mb-2 font-display uppercase tracking-wider text-[10px] font-bold">WhatsApp Hotline</Text>
                    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="block text-brand-dark font-serif font-bold text-xl hover:text-brand-red transition-colors">
                      +{whatsapp.replace(/^62/, '62 ').replace(/(\d{3})(\d{4})(\d{4})$/, '$1 $2 $3')}
                    </a>
                  </div>
                )}
                {instagram && (
                  <div className="group">
                    <Text variant="small" tone="muted" className="mb-2 font-display uppercase tracking-wider text-[10px] font-bold">Media Sosial</Text>
                    <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="block text-brand-dark font-serif font-bold text-xl hover:text-brand-red transition-colors">
                      @{instagram}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Form Section */}
            <div className="relative lg:col-span-8 lg:border-l lg:border-brand-dark/10 lg:pl-12">
              <GlassCard id="contact-form" variant="stripes" contentClassName="p-6 md:p-8 lg:p-10">
                <div className="mb-10">
                   <Eyebrow tone="gold">Formulir Pesan</Eyebrow>
                   <Heading level={3} tone="inverse" className="mt-2">
                    Kirim Pesan Langsung
                  </Heading>
                </div>
                <form action={sendEmail} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white/80 font-display text-[11px] uppercase tracking-wider font-bold">Nama Lengkap</Label>
                      <Input id="name" name="name" placeholder="Masukkan nama Anda" required className="h-12 bg-white/5 border-white/10 focus-visible:ring-brand-gold/30 focus-visible:border-brand-gold/50 text-white placeholder:text-white/30" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/80 font-display text-[11px] uppercase tracking-wider font-bold">Alamat Email</Label>
                      <Input id="email" name="email" type="email" placeholder="nama@email.com" required className="h-12 bg-white/5 border-white/10 focus-visible:ring-brand-gold/30 focus-visible:border-brand-gold/50 text-white placeholder:text-white/30" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white/80 font-display text-[11px] uppercase tracking-wider font-bold">Subjek / Keperluan</Label>
                    <Input id="subject" name="subject" placeholder="Subjek pesan" required className="h-12 bg-white/5 border-white/10 focus-visible:ring-brand-gold/30 focus-visible:border-brand-gold/50 text-white placeholder:text-white/30" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white/80 font-display text-[11px] uppercase tracking-wider font-bold">Pesan Anda</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Tuliskan pesan Anda di sini..." 
                      className="min-h-[160px] bg-white/5 border-white/10 focus-visible:ring-brand-gold/30 focus-visible:border-brand-gold/50 text-white placeholder:text-white/30 resize-none"
                      required 
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="secondary" className="w-full justify-center md:w-auto md:px-14 md:h-12">
                      Kirim Pesan
                    </Button>
                  </div>
                </form>
              </GlassCard>
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </PageShell>
  )
}
