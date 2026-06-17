import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer as FooterType, Media } from '@/payload-types'

export async function Footer() {
  const currentYear = new Date().getFullYear()
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  // 1. Logo image path or object
  let logoSrc = '/logo.png'
  let logoAlt = 'Logo IAM ITB'
  let logoWidth = 90
  let logoHeight = 90

  if (footerData?.logo && typeof footerData.logo === 'object') {
    const mediaLogo = footerData.logo as Media
    if (mediaLogo.url) {
      logoSrc = mediaLogo.url
      logoAlt = mediaLogo.alt || 'Logo IAM ITB'
      logoWidth = mediaLogo.width || 90
      logoHeight = mediaLogo.height || 90
    }
  }

  // 2. Logo text lines
  const logoText = footerData?.logoText || 'IAM\nITB'
  const logoTextLines = logoText.split('\n')

  // 3. Copyright text
  const copyrightText = footerData?.copyrightText || 'IAM ITB. Hak Cipta Dilindungi.'

  // 4. Social links list (if not configured, use default fallback links)
  const defaultSocialLinks = [
    { platform: 'instagram', url: 'https://instagram.com/iamitb', ariaLabel: 'Instagram IAM ITB' },
    { platform: 'whatsapp', url: 'https://wa.me/iamitb', ariaLabel: 'WhatsApp IAM ITB' },
    { platform: 'facebook', url: 'https://facebook.com/iamitb', ariaLabel: 'Facebook IAM ITB' },
  ] as const

  const socialLinks = footerData?.socialLinks && footerData.socialLinks.length > 0
    ? footerData.socialLinks
    : defaultSocialLinks

  return (
    <footer className="relative isolate w-full bg-brand-dark">
      <div className="px-4 py-10 md:px-8 md:py-12">
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 md:min-h-[140px] md:flex-row">
          {/* Left: Logo + name */}
          <Link href="/" className="group flex items-center gap-4" aria-label="IAM ITB – Beranda">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={logoWidth}
              height={logoHeight}
              className="object-contain max-h-[90px] w-auto"
            />
            <span className="font-serif font-bold text-4xl md:text-5xl leading-none text-white tracking-tight">
              {logoTextLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < logoTextLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          </Link>

          {/* Right: Social icons & Copyright */}
          <div className="flex h-full w-full flex-col items-center justify-center md:w-auto md:items-end">
            <div className="flex items-center gap-10 md:gap-14 mb-4">
              {socialLinks.map((linkItem, idx) => {
                const Icon = getSocialIcon(linkItem.platform)
                if (!Icon) return null
                return (
                  <a
                    key={idx}
                    href={linkItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-brand-gold transition-colors duration-200"
                    aria-label={linkItem.ariaLabel || `${linkItem.platform} IAM ITB`}
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>

            {/* Divider and copyright */}
            <div className="flex flex-col md:items-end items-center w-full md:w-80 pt-4 border-t border-white/10 mt-auto">
              <p className="text-[10px] md:text-xs text-white/60 font-sans tracking-wide">
                © {currentYear} {copyrightText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// --------------- Icon Helper & Components ---------------

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return InstagramIcon
    case 'whatsapp':
      return WhatsAppIcon
    case 'facebook':
      return FacebookIcon
    case 'linkedin':
      return LinkedInIcon
    case 'youtube':
      return YouTubeIcon
    case 'twitter':
    case 'x':
      return TwitterIcon
    default:
      return null
  }
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9H7.12v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

