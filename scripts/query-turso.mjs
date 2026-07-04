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
  console.log('========================================')
  console.log('   📊 DATABASE TURSO — RINGKASAN DATA')
  console.log('========================================')

  // Discover tables
  const tables = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
  )
  const tableNames = tables.rows.map(r => r.name)
  console.log(`\nDitemukan ${tableNames.length} tabel:\n   ${tableNames.join(', ')}`)

  const labelMap = {
    users: '👤 Pengguna (Users)',
    media: '🖼️  Media',
    posts: '📰 Berita (Posts)',
    pages: '📄 Halaman (Pages)',
    categories: '🏷️  Kategori (Categories)',
    sponsors: '🤝 Sponsor',
    galleries: '🖼️  Galeri (Galleries)',
    gallery_categories: '📁 Kategori Galeri',
    alumni_businesses: '🏢 Usaha Alumni',
    activities: '🎯 Aktivitas',
    job_vacancies: '💼 Lowongan Kerja',
    iam_presidents: '👑 Ketua IAM',
    managements: '👥 Kepengurusan',
    communities: '🤗 Komunitas',
    alumni_members: '📋 Basis Data Alumni',
    org_members: '👤 Anggota Organisasi',
  }

  for (const table of tableNames) {
    if (table.startsWith('_') || table.startsWith('sqlite_')) continue
    try {
      // Get column info
      const colInfo = await client.execute(`PRAGMA table_info("${table}")`)
      const cols = colInfo.rows.map(r => r.name).filter(c =>
        !['id', 'updated_at', 'created_at'].includes(c) &&
        !c.startsWith('_')
      ).slice(0, 6)
      if (cols.length === 0) continue

      const colList = cols.map(c => `"${c}"`).join(', ')
      const result = await client.execute(`SELECT id, ${colList} FROM "${table}" ORDER BY id LIMIT 20`)
      const rows = result.rows
      const label = labelMap[table] || `📦 ${table}`

      if (rows.length === 0) {
        console.log(`\n${label}:`)
        console.log(`   ⚠️  Belum ada data.`)
        continue
      }

      console.log(`\n${label} (${rows.length} data):`)
      rows.forEach((row, i) => {
        const entries = Object.entries(row).filter(([k]) => k !== 'id')
        const summary = entries.map(([k, v]) => {
          const val = typeof v === 'string' ? (v.length > 80 ? v.substring(0, 80) + '...' : v) : v
          return `${k}=${val}`
        }).join(', ')
        console.log(`   ${i + 1}. [ID ${row.id}] ${summary}`)
      })
    } catch (err) {
      console.log(`\n📦 ${table}: ERROR - ${err.message}`)
    }
  }

  console.log('\n========================================')
  console.log('   ✅ Selesai.')
  console.log('========================================')
}

main().catch(err => {
  console.error('Fatal:', err)
})
