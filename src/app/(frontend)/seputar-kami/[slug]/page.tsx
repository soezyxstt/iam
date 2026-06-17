import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'

import { PageShell } from '@/components/PageShell'
import { Section } from '@/components/ui/section'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Eyebrow, Heading, Text } from '@/components/ui/typography'
import { HeaderThemeDark } from '../HeaderThemeDark'
import RichText from '@/components/RichText'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'values-philosophy',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      overrideAccess: false,
    })
    const doc = result.docs[0]
    if (!doc) return {}
    return {
      title: `${doc.title} - IAM ITB`,
      description: doc.cardLabel || `Nilai dan filosofi ${doc.title} - IAM ITB`,
    }
  } catch {
    return {}
  }
}

function getEyebrowToneAndClass(style?: string | null) {
  if (style === 'gold') return { tone: 'gold' as const }
  if (style === 'white') return { tone: 'white' as const }
  if (style === 'muted') return { tone: 'muted' as const }
  if (style === 'red-light') return { className: 'text-brand-red-light' }
  if (style === 'white-muted') return { className: 'text-white/60' }
  return { tone: 'gold' as const }
}

const renderTitle = (title: string, highlight?: string | null, style?: string | null) => {
  if (!highlight) {
    return (
      <h1 className="font-serif text-5xl font-black leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
        {title}
      </h1>
    )
  }

  let highlightEl: React.ReactNode = null
  if (style === 'gold') {
    highlightEl = <span className="text-brand-gold">{highlight}</span>
  } else if (style === 'red-underline') {
    highlightEl = (
      <span className="text-brand-red-light inline-block font-extrabold relative">
        {highlight}
        <span className="absolute left-0 bottom-0 w-full h-[4px] bg-brand-gold" />
      </span>
    )
  } else if (style === 'gradient') {
    highlightEl = (
      <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.3)] bg-clip-text bg-gradient-to-r from-brand-gold via-brand-red-light to-brand-gold">
        {highlight}
      </span>
    )
  } else {
    highlightEl = <span>{highlight}</span>
  }

  if (style === 'red-underline') {
    return (
      <h1 className="font-serif text-5xl font-black leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
        {title}{' '}{highlightEl}
      </h1>
    )
  } else {
    return (
      <h1 className="font-serif text-5xl font-black leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
        {title}
        <br />
        {highlightEl}
      </h1>
    )
  }
}

const getIntroStyles = (style?: string | null) => {
  if (style === 'italic') {
    return {
      borderClass: 'border-l-4 border-brand-red-light pl-6 md:pl-8 max-w-3xl',
      textClass: 'text-lg md:text-xl text-white/95 leading-relaxed font-serif italic',
    }
  }
  if (style === 'large-quote') {
    return {
      borderClass: 'border-l-4 border-brand-red-light pl-6 md:pl-8 max-w-3xl',
      textClass: 'font-serif text-xl md:text-2xl lg:text-3xl font-bold italic leading-relaxed text-white',
    }
  }
  return {
    borderClass: 'border-l-4 border-brand-gold pl-6 md:pl-8 max-w-3xl',
    textClass: 'text-lg md:text-xl text-white/90 leading-relaxed',
  }
}

const HeroHeaderBlockComponent = ({ block }: { block: any }) => {
  const { eyebrow, eyebrowStyle, title, highlightText, highlightStyle, author, intro, introStyle } = block
  const { borderClass, textClass } = getIntroStyles(introStyle)

  return (
    <Section className="z-10 pt-8 pb-10 md:pt-12 md:pb-16">
      <ScrollReveal>
        <div className="flex flex-col gap-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white/65 hover:text-brand-gold transition-colors group"
          >
            <ArrowLeft className="size-3.5 translate-x-0 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>

          {/* Accent lines representing highlight flow */}
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-brand-red-light" />
            <Eyebrow {...getEyebrowToneAndClass(eyebrowStyle)}>{eyebrow}</Eyebrow>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-gold/50 via-brand-primary/20 to-transparent" />
          </div>

          <div className="max-w-4xl">
            {renderTitle(title, highlightText, highlightStyle)}
            {author && (
              <p className="mt-4 font-display text-[11px] font-bold tracking-[0.25em] uppercase text-white/70">
                {author}
              </p>
            )}
          </div>

          {/* Introductory text */}
          <div className={`mt-8 ${borderClass}`}>
            <p className={textClass}>
              {intro}
            </p>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  )
}

const SplitContentBlockComponent = ({ block }: { block: any }) => {
  const {
    leftColumnType,
    leftTitleEyebrow,
    leftTitleEyebrowStyle,
    leftTitle,
    leftTitleHighlight,
    leftTitleHighlightStyle,
    leftInfoItems,
    bodyText,
  } = block

  return (
    <Section className="z-10 py-12 md:py-16 border-t border-white/10 bg-black/10">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column */}
          {leftColumnType === 'title' ? (
            <div className="lg:col-span-5 flex flex-col gap-4">
              {leftTitleEyebrow && (
                <Eyebrow {...getEyebrowToneAndClass(leftTitleEyebrowStyle)}>
                  {leftTitleEyebrow}
                </Eyebrow>
              )}
              <Heading level={2} tone="inverse" className="text-3xl md:text-4xl text-white">
                {leftTitle}{' '}
                {leftTitleHighlight && (
                  <span className={leftTitleHighlightStyle === 'gold' ? 'text-brand-gold' : 'text-brand-red-light'}>
                    {leftTitleHighlight}
                  </span>
                )}
              </Heading>
              <div className={`h-[3px] w-20 ${leftTitleHighlightStyle === 'gold' ? 'bg-brand-gold' : 'bg-brand-red-light'}`} />
            </div>
          ) : (
            <div className="lg:col-span-4 flex flex-col gap-8 border-l-2 border-brand-gold pl-6 py-2">
              {leftInfoItems?.map((item: any, idx: number) => {
                const titleClass =
                  item.eyebrow === 'Konteks Era'
                    ? 'font-serif text-2xl font-bold text-white'
                    : 'font-serif text-lg font-bold text-white'
                return (
                  <div key={idx} className="flex flex-col gap-2">
                    <Eyebrow {...getEyebrowToneAndClass(item.eyebrowStyle)}>
                      {item.eyebrow}
                    </Eyebrow>
                    <span className={titleClass}>{item.title}</span>
                    <Text variant="small" tone="inverse" className="text-white/75">
                      {item.description}
                    </Text>
                  </div>
                )
              })}
            </div>
          )}

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <RichText
              data={bodyText}
              enableGutter={false}
              enableProse={false}
              className="leading-relaxed text-white/85 flex flex-col gap-6 [&_p]:text-[15px] [&_p]:leading-[1.75] [&_p]:text-white/85 [&_strong]:text-white [&_strong]:font-semibold [&_a]:text-brand-gold hover:[&_a]:underline"
            />
          </div>
        </div>
      </ScrollReveal>
    </Section>
  )
}

const DialogueBlockComponent = ({ block }: { block: any }) => {
  const { eyebrow, eyebrowStyle, title, description, dialogueItems } = block

  return (
    <Section className="z-10 py-16 md:py-24 border-t border-white/10">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Eyebrow {...getEyebrowToneAndClass(eyebrowStyle)}>{eyebrow}</Eyebrow>
            <Heading level={2} tone="inverse" className="text-3xl md:text-4xl text-white">
              {title}
            </Heading>
            <RichText
              data={description}
              enableGutter={false}
              enableProse={false}
              className="text-white/80 [&_p]:text-[15px] [&_p]:leading-[1.75] [&_p]:text-white/80"
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-white/15 pt-8 lg:pt-0 lg:pl-12">
            {dialogueItems?.map((item: any, idx: number) => {
              const speakerColorClass =
                item.speakerColor === 'gold'
                  ? 'text-brand-gold'
                  : item.speakerColor === 'white-muted'
                  ? 'text-white/60'
                  : 'text-brand-red-light'
              const speechColorClass =
                item.speechColor === 'gold'
                  ? 'text-brand-gold'
                  : item.speechColor === 'red-light'
                  ? 'text-brand-red-light'
                  : 'text-white'

              return (
                <div key={idx} className="flex flex-col gap-2">
                  <span className={`font-display text-xs font-bold tracking-widest uppercase ${speakerColorClass}`}>
                    {item.speaker}
                  </span>
                  <p className={`font-serif text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tight ${speechColorClass}`}>
                    &ldquo;{item.speech}&rdquo;
                  </p>
                  {item.subtext && (
                    <Text variant="small" tone="inverse" className="mt-1 text-white/60">
                      {item.subtext}
                    </Text>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </ScrollReveal>
    </Section>
  )
}

const PillarsBlockComponent = ({ block }: { block: any }) => {
  const { eyebrow, eyebrowStyle, title, displayStyle, pillars } = block

  return (
    <Section className={`z-10 py-16 md:py-24 border-t border-white/10 ${displayStyle === 'three-columns' ? 'bg-black/15' : 'bg-black/10'}`}>
      <ScrollReveal>
        <div className="mb-16">
          <Eyebrow {...getEyebrowToneAndClass(eyebrowStyle)}>{eyebrow}</Eyebrow>
          <Heading level={2} tone="inverse" className="mt-2 text-white">
            {title}
          </Heading>
        </div>
      </ScrollReveal>

      {displayStyle === 'three-columns' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars?.map((pillar: any, idx: number) => {
            const numberColorClass =
              pillar.numberStyle === 'gold'
                ? 'text-brand-gold'
                : pillar.numberStyle === 'white-muted'
                ? 'text-white/60'
                : 'text-brand-red-light'

            return (
              <ScrollReveal key={idx}>
                <div className={`flex flex-col gap-4 border-t pt-6 ${pillar.numberStyle === 'gold' ? 'border-brand-gold' : pillar.numberStyle === 'white-muted' ? 'border-white/20' : 'border-brand-red-light'}`}>
                  <span className={`font-display text-4xl font-black ${numberColorClass}`}>
                    {pillar.number}
                  </span>
                  <Heading level={3} tone="inverse" className="text-lg md:text-xl text-white">
                    {pillar.title}
                  </Heading>
                  <RichText
                    data={pillar.body}
                    enableGutter={false}
                    enableProse={false}
                    className="text-white/80 [&_p]:text-sm [&_p]:md:text-[15px] [&_p]:leading-relaxed [&_p]:text-white/80"
                  />
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-12 lg:gap-16">
          {pillars?.map((pillar: any, idx: number) => {
            const numberColorClass =
              pillar.numberStyle === 'gold'
                ? 'text-brand-gold'
                : pillar.numberStyle === 'white-muted'
                ? 'text-white/60'
                : 'text-brand-red-light'
            const subLabelColorClass =
              pillar.subLabelStyle === 'gold'
                ? 'text-brand-gold'
                : pillar.subLabelStyle === 'red-light'
                ? 'text-brand-red-light'
                : 'text-white/60'
            const borderColClass =
              pillar.numberStyle === 'gold' ? 'border-brand-gold' : 'border-brand-red-light'

            return (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="h-px bg-white/10" />}
                <ScrollReveal>
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start border-l-2 pl-6 lg:pl-0 lg:border-l-0 ${borderColClass}`}>
                    {/* Left Meta */}
                    <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-4">
                      <span className={`font-display text-5xl md:text-6xl font-black leading-none ${numberColorClass}`}>
                        {pillar.number}
                      </span>
                      {pillar.subLabel && (
                        <span className={`font-display text-xs font-bold tracking-widest uppercase ${subLabelColorClass}`}>
                          {pillar.subLabel}
                        </span>
                      )}
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-9 flex flex-col gap-4">
                      <Heading level={3} tone="inverse" className="text-xl md:text-2xl text-white">
                        {pillar.title}
                      </Heading>
                      <RichText
                        data={pillar.body}
                        enableGutter={false}
                        enableProse={false}
                        className="text-white/80 [&_p]:text-[15px] [&_p]:leading-[1.75] [&_p]:text-white/80"
                      />

                      {/* Subpoints */}
                      {pillar.subpoints && pillar.subpoints.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                          {pillar.subpoints.map((sub: any, sIdx: number) => {
                            return (
                              <div key={sIdx} className="flex gap-4 items-start border-t border-white/15 pt-4">
                                <span className="text-lg font-bold">{sub.emoji}</span>
                                <div className="flex flex-col gap-1">
                                  <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                                    {sub.title}
                                  </h4>
                                  <Text variant="small" tone="inverse" className="text-white/70">
                                    {sub.body}
                                  </Text>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              </React.Fragment>
            )
          })}
        </div>
      )}
    </Section>
  )
}

const ClosingBlockComponent = ({ block }: { block: any }) => {
  const { eyebrow, eyebrowStyle, title, titleStyle, quoteText, quoteStyle, bodyText, links } = block

  const dividerColorClass = eyebrowStyle === 'gold' ? 'bg-brand-gold' : 'bg-brand-red-light'
  const textQuoteClass =
    quoteStyle === 'italic'
      ? 'leading-relaxed max-w-3xl font-serif text-white/90 italic'
      : 'leading-relaxed max-w-3xl font-serif text-white/90'

  return (
    <Section className="z-10 py-16 md:py-24 border-t border-white/10 bg-black/20">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto flex flex-col gap-8 text-center items-center">
          <Eyebrow {...getEyebrowToneAndClass(eyebrowStyle)}>{eyebrow}</Eyebrow>
          <Heading level={2} tone={titleStyle === 'accent' ? 'accent' : 'inverse'} className="text-3xl md:text-4xl lg:text-5xl">
            {title}
          </Heading>
          <div className={`h-[2px] w-24 ${dividerColorClass}`} />

          {quoteText && (
            <Text variant="lead" tone="inverse" className={textQuoteClass}>
              &ldquo;{quoteText}&rdquo;
            </Text>
          )}

          {bodyText && (
            <RichText
              data={bodyText}
              enableGutter={false}
              enableProse={false}
              className="max-w-3xl text-white/80 [&_p]:text-[15px] [&_p]:leading-[1.75] [&_p]:text-white/80"
            />
          )}

          {/* Quick links to navigate to other jargon */}
          {links && links.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
              {links.map((link: any, idx: number) => {
                const hoverColorClass =
                  link.hoverColor === 'gold'
                    ? 'hover:text-brand-gold'
                    : link.hoverColor === 'red-light'
                    ? 'hover:text-brand-red-light'
                    : 'hover:text-white'

                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && <div className="hidden sm:block h-4 w-px bg-white/20" />}
                    <Link
                      href={link.url}
                      className={`group flex items-center gap-2 text-white/60 transition-colors ${hoverColorClass}`}
                    >
                      <span className="font-display text-[11px] font-bold tracking-widest uppercase">
                        {link.label}
                      </span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </React.Fragment>
                )
              })}
            </div>
          )}
        </div>
      </ScrollReveal>
    </Section>
  )
}

export default async function ValuesPhilosophyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'values-philosophy',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    overrideAccess: false,
  })

  const doc = result.docs[0]
  if (!doc) {
    notFound()
  }

  return (
    <PageShell
      className="bg-linear-to-b from-[#06162F] via-[#253041] to-[#03060c] min-h-screen relative z-0"
      showAmbient={false}
      darkTheme={true}
    >
      <HeaderThemeDark />

      {/* Background Ambient Glow Blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[5%] left-[5%] h-[400px] w-[400px] rounded-full bg-brand-primary/20 blur-[120px]" />
        <div className="absolute top-[15%] right-[10%] h-[350px] w-[350px] rounded-full bg-brand-gold/12 blur-[100px]" />
        <div className="absolute top-[40%] left-[-5%] h-[380px] w-[380px] rounded-full bg-brand-red-light/15 blur-[110px]" />
        <div className="absolute bottom-[20%] right-[5%] h-[450px] w-[400px] rounded-full bg-brand-gold/10 blur-[130px]" />
      </div>

      {/* Dynamic Blocks Rendering */}
      {doc.detailsLayout?.map((block: any, index: number) => {
        switch (block.blockType) {
          case 'heroHeader':
            return <HeroHeaderBlockComponent key={index} block={block} />
          case 'splitContent':
            return <SplitContentBlockComponent key={index} block={block} />
          case 'dialogue':
            return <DialogueBlockComponent key={index} block={block} />
          case 'pillars':
            return <PillarsBlockComponent key={index} block={block} />
          case 'closing':
            return <ClosingBlockComponent key={index} block={block} />
          default:
            return null
        }
      })}
    </PageShell>
  )
}
