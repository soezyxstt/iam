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


export const metadata: Metadata = {
  title: 'Hubungi Kami | IAM ITB',
  description: 'Hubungi pengurus IAM ITB.',
}

export default function KontakPage() {
  return (
    <PageShell>
      <Section className="z-10 pb-8 pt-3 md:pb-10 md:pt-4" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <PageHeroHeader title="Hubungi Kami" subtitle="Mari Terhubung dan Berkolaborasi" />
        </ScrollReveal>
      </Section>

      <Section className="z-10 pt-0 pb-12 md:pt-0 md:pb-20" containerClassName="max-w-6xl px-4 md:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-0 lg:gap-y-0">
            <div className="flex flex-col lg:col-span-4 lg:pr-10">
              <Eyebrow tone="red">Kontak</Eyebrow>
              <Heading level={2} className="mt-3 mb-7 md:mb-8">
                Terbuka untuk Kolaborasi
              </Heading>
              <Text variant="editorial" className="leading-loose mb-10">
                Kami selalu terbuka untuk mendengar ide, saran, maupun pertanyaan dari seluruh anggota Ikatan Alumni Mesin ITB dan masyarakat luas. Jangan ragu untuk menyapa kami!
              </Text>

              <div className="space-y-6">
                <div>
                  <Text variant="small" tone="muted" className="mb-1 font-display uppercase tracking-wider">Email</Text>
                  <a href="mailto:info@iamitb.org" className="text-brand-primary font-serif font-bold text-lg hover:text-brand-red transition-colors">
                    info@iamitb.org
                  </a>
                </div>
                <div>
                  <Text variant="small" tone="muted" className="mb-1 font-display uppercase tracking-wider">WhatsApp</Text>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-brand-primary font-serif font-bold text-lg hover:text-brand-red transition-colors">
                    +62 812 3456 7890
                  </a>
                </div>
                <div>
                  <Text variant="small" tone="muted" className="mb-1 font-display uppercase tracking-wider">Instagram</Text>
                  <a href="https://instagram.com/iamitb" target="_blank" rel="noopener noreferrer" className="text-brand-primary font-serif font-bold text-lg hover:text-brand-red transition-colors">
                    @iamitb
                  </a>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-8 lg:border-l lg:border-brand-dark/12 lg:pl-10 lg:pr-2 xl:pl-12">
              <GlassCard id="contact-form" variant="stripes" contentClassName="p-8 md:p-10">
                <Heading level={3} tone="inverse" className="mb-8">
                  Kirim Pesan Langsung
                </Heading>
                <form action={sendEmail} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white/90">Nama Lengkap</Label>
                      <Input id="name" name="name" placeholder="Masukkan nama Anda" required className="bg-brand-primary/50 border-white/20 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold text-white placeholder:text-white/40" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/90">Alamat Email</Label>
                      <Input id="email" name="email" type="email" placeholder="nama@email.com" required className="bg-brand-primary/50 border-white/20 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold text-white placeholder:text-white/40" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white/90">Subjek / Keperluan</Label>
                    <Input id="subject" name="subject" placeholder="Subjek pesan" required className="bg-brand-primary/50 border-white/20 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold text-white placeholder:text-white/40" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white/90">Pesan Anda</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Tuliskan pesan Anda di sini..." 
                      className="min-h-[150px] bg-brand-primary/50 border-white/20 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold text-white placeholder:text-white/40"
                      required 
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" className="w-full justify-center md:w-auto md:px-12">
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
