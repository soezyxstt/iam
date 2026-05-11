import { test } from '@playwright/test'
import fs from 'fs'

const routes = [
  '/',
  '/alumni',
  '/galeri',
  '/kepengurusan',
  '/komunitas',
  '/organisasi',
  '/usaha-alumni',
  '/pengajuan-usaha-alumni',
  '/search',
]

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
]

test.describe('Visual Setup & Exports', () => {
  test.beforeAll(async () => {
    const baseDirs = ['visual-exports/screenshots', 'visual-exports/pdfs']
    for (const baseDir of baseDirs) {
      for (const vp of viewports) {
        const dir = `${baseDir}/${vp.name}`
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
      }
    }
  })

  for (const vp of viewports) {
    test.describe(`${vp.name} viewport`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } })

      for (const route of routes) {
        test(`Capture ${vp.name} - ${route}`, async ({ page }) => {
          const fileName = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-')

          console.log(`[${vp.name}] Navigating to ${route}...`)
          await page.goto(route, { waitUntil: 'networkidle' })

          // 1. Inject CSS to hide Next.js dev pill and disable animations
          await page.addStyleTag({
            content: `
              /* Hide Next.js Dev Pill */
              #nextjs-portal, 
              [data-nextjs-toast-wrapper], 
              .nextjs-static-indicator { 
                display: none !important; 
              }
              
              /* Disable all animations and transitions */
              *, *::before, *::after {
                transition: none !important;
                animation: none !important;
                transition-duration: 0s !important;
                animation-duration: 0s !important;
                scroll-behavior: auto !important;
              }

              /* Ensure content is visible if it was hidden by animation initial states */
              [data-framer-appear-id], 
              .motion-div, 
              [style*="opacity: 0"] {
                opacity: 1 !important;
                transform: none !important;
                visibility: visible !important;
              }
            `,
          })

          // 2. Scroll to bottom and back to trigger any lazy loading or scroll-based logic
          await page.evaluate(async () => {
            window.scrollTo(0, document.body.scrollHeight)
            await new Promise((resolve) => setTimeout(resolve, 500))
            window.scrollTo(0, 0)
            await new Promise((resolve) => setTimeout(resolve, 500))
          })

          // Wait a bit for everything to settle
          await page.waitForTimeout(1000)

          // 3. Capture screenshot
          await page.screenshot({
            path: `visual-exports/screenshots/${vp.name}/${fileName}.png`,
            fullPage: true,
          })

          // 4. Capture PDF (Only for Desktop usually, but can do all)
          if (vp.name === 'desktop') {
            try {
              await page.pdf({
                path: `visual-exports/pdfs/${vp.name}/${fileName}.pdf`,
                format: 'A4',
                printBackground: true,
                margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
              })
            } catch (e) {
              const errorMessage = e instanceof Error ? e.message : String(e)
              console.warn(`PDF generation failed for ${route}:`, errorMessage)
            }
          }
        })
      }
    })
  }
})
