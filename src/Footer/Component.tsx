import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export async function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-transparent px-4 md:px-8 pb-8 pt-4 max-w-7xl mx-auto w-full">
      <div className="bg-background border border-border shadow-sm rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 md:h-[180px]">
        {/* Left: Logo + name */}
        <Link href="/" className="flex items-center gap-4 group" aria-label="IAM ITB – Beranda">
          <Image
            src="/logo.png"
            alt="Logo IAM ITB"
            width={90}
            height={90}
            className="object-contain"
          />
          <span className="font-serif font-bold text-4xl md:text-5xl leading-none text-foreground tracking-tight">
            IAM
            <br />
            ITB
          </span>
        </Link>

        {/* Right: Social icons & Copyright */}
        <div className="flex flex-col items-center md:items-end w-full md:w-auto h-full justify-center">
          <div className="flex items-center gap-10 md:gap-14 mb-4">
            {/* Instagram */}
            <a
              href="https://instagram.com/iamitb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors duration-200"
              aria-label="Instagram IAM ITB"
            >
              <InstagramIcon />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/iamitb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors duration-200"
              aria-label="WhatsApp IAM ITB"
            >
              <WhatsAppIcon />
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/iamitb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors duration-200"
              aria-label="Facebook IAM ITB"
            >
              <FacebookIcon />
            </a>
          </div>

          {/* Divider and copyright */}
          <div className="flex flex-col md:items-end items-center w-full md:w-80 pt-4 border-t border-brand-khaki mt-auto">
            <p className="text-[10px] md:text-xs text-foreground/50 font-sans tracking-wide">
              © {currentYear} IAM ITB. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// --------------- Icon Components ---------------

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
