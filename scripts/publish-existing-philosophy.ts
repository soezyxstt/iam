/**
 * ONE-TIME backfill — run once, right after enabling `versions.drafts` on the
 * `values-philosophy` (Nilai & Filosofi) collection.
 *
 * When drafts are newly enabled, existing rows are no longer considered
 * "published", so `authenticatedOrPublished` read access hides them from the
 * public site. This script republishes every existing entry so nothing
 * disappears from /seputar-kami or the homepage cards.
 *
 * Safe to re-run: it only sets already-existing docs to `_status: 'published'`.
 *
 * Usage (from project root, with the normal .env in place):
 *   pnpm tsx scripts/publish-existing-philosophy.ts
 */

import 'dotenv/config'

async function run() {
  const { getPayload } = await import('payload')
  const config = (await import('../src/payload.config')).default
  const payload = await getPayload({ config: await config })

  const { docs, totalDocs } = await payload.find({
    collection: 'values-philosophy',
    limit: 1000,
    depth: 0,
    // See every doc regardless of current status
    overrideAccess: true,
    // Include drafts in the result set
    draft: true,
  })

  console.log(`Found ${totalDocs} Nilai & Filosofi entries. Publishing...`)

  let published = 0
  for (const doc of docs) {
    await payload.update({
      collection: 'values-philosophy',
      id: doc.id,
      data: { _status: 'published' },
      overrideAccess: true,
    })
    published += 1
    console.log(`  Published: ${(doc as { title?: string }).title ?? doc.id}`)
  }

  console.log(`Done. ${published} entries published.`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
