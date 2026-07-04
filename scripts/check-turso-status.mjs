import { createClient } from '@libsql/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env')
const envContent = readFileSync(envPath, 'utf-8')

const lines = Object.fromEntries(
  envContent.split('\n').filter(l => l.includes('=')).map(l => {
    const [k, ...v] = l.split('=')
    const val = v.join('=').trim()
    return [k.trim(), val.replace(/^"(.*)"$/, '$1')]
  })
)

const client = createClient({
  url: lines.TURSO_DATABASE_URL,
  authToken: lines.TURSO_AUTH_TOKEN,
})

async function main() {
  console.log('============================================')
  console.log('   CHECK _STATUS & PUBLISHED DATA DI TURSO')
  console.log('============================================')

  const checks = [
    { table: 'posts',         cols: 'id, title, _status, published_at' },
    { table: 'pages',         cols: 'id, title, _status, published_at' },
    { table: 'alumni_businesses', cols: 'id, business_name, _status' },
    { table: 'job_vacancies', cols: 'id, position, _status' },
    { table: 'activities',    cols: 'id, activity_name, activity_type' },
    { table: 'galleries',     cols: 'id, description' },
    { table: 'gallery_categories', cols: 'id, title, subtitle' },
    { table: 'sponsors',      cols: 'id, company_name, category' },
    { table: 'organisasi',    cols: '*' },
    { table: 'values_philosophy', cols: 'id' },
  ]

  for (const { table, cols } of checks) {
    try {
      const result = await client.execute(`SELECT ${cols} FROM "${table}" ORDER BY id`)
      const rows = result.rows
      if (rows.length === 0) {
        console.log(`\n📦 ${table}: ⚠️  Kosong (0 data)`)
      } else {
        console.log(`\n📦 ${table} (${rows.length} data):`)
        rows.forEach((row, i) => {
          const entries = Object.entries(row)
            .map(([k, v]) => `${k}=${v ?? 'null'}`)
            .join(', ')
          console.log(`   ${i + 1}. ${entries}`)
        })
      }
    } catch (err) {
      console.log(`\n📦 ${table}: ERROR - ${err.message}`)
    }
  }

  console.log('\n============================================')
  console.log('   ✅ Selesai')
  console.log('============================================')

  client.close()
}

main().catch(err => { console.error(err); process.exit(1) })
