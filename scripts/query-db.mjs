import pg from 'pg'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env')
const envContent = readFileSync(envPath, 'utf-8')

const DATABASE_URL = envContent
  .split('\n')
  .find(line => line.startsWith('DATABASE_URL='))
  ?.replace('DATABASE_URL=', '')
  ?.trim()

if (!DATABASE_URL) {
  console.error('DATABASE_URL not found in .env')
  process.exit(1)
}

const pool = new pg.Pool({ connectionString: DATABASE_URL })

// First, discover all tables
async function discoverTables() {
  const result = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `)
  return result.rows.map(r => r.table_name)
}

// Then discover columns for a table
async function discoverColumns(table) {
  const result = await pool.query(`
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = $1
    ORDER BY ordinal_position
  `, [table])
  return result.rows
}

async function queryTable(table, label) {
  try {
    const columns = await discoverColumns(table)
    const colNames = columns.filter(c =>
      !['id', 'updated_at', 'created_at', '_version'].some(skip => c.column_name.includes(skip))
    ).map(c => `"${c.column_name}"`).join(', ') || 'id'
    const query = `SELECT id, ${colNames} FROM "${table}" ORDER BY id LIMIT 20`
    const result = await pool.query(query)
    const rows = result.rows
    if (rows.length === 0) {
      console.log(`\n${label || table}:`)
      console.log(`   ⚠️  Belum ada data.`)
      return
    }
    console.log(`\n${label || table} (${rows.length} data):`)
    rows.forEach((row, i) => {
      const entries = Object.entries(row).filter(([k]) => k !== 'id')
      const summary = entries.map(([k, v]) => {
        const val = typeof v === 'string' ? (v.length > 60 ? v.substring(0, 60) + '...' : v) : v
        return `${k}=${val}`
      }).join(', ')
      console.log(`   ${i + 1}. [ID ${row.id}] ${summary}`)
    })
  } catch (err) {
    console.error(`\n${label || table}: ERROR - ${err.message}`)
  }
}

async function main() {
  console.log('========================================')
  console.log('   📊 DATABASE IAM ITB — RINGKASAN DATA')
  console.log('========================================')

  const tables = await discoverTables()
  console.log(`\nDitemukan ${tables.length} tabel:\n   ${tables.join(', ')}`)

  // Map Payload table names to labels we know
  const labelMap = {
    users: '👤 Pengguna (Users)',
    media: '🖼️  Media',
    posts: '📰 Berita (Posts)',
    pages: '📄 Halaman (Pages)',
    categories: '🏷️  Kategori (Categories)',
    sponsors: '🤝 Sponsor',
    galleries: '🖼️  Galeri (Galleries)',
    'gallery-categories': '📁 Kategori Galeri',
    'alumni-businesses': '🏢 Usaha Alumni',
    activities: '🎯 Aktivitas',
    'job-vacancies': '💼 Lowongan Kerja',
    'iam-presidents': '👑 Ketua IAM',
    managements: '👥 Kepengurusan',
    communities: '🤗 Komunitas',
    'alumni-members': '📋 Basis Data Alumni',
    'org-members': '👤 Anggota Organisasi',
    'values-philosophy': '📖 Nilai Filosofi',
    'organization-profile': '🌐 Profil Organisasi (Global)',
    'payload_preferences': '⚙️  Payload Preferences',
    'payload_migrations': '🗄️  Payload Migrations',
  }

  for (const table of tables) {
    const label = labelMap[table] || `📦 ${table}`
    await queryTable(table, label)
  }

  await pool.end()

  console.log('\n========================================')
  console.log('   ✅ Selesai.')
  console.log('========================================')
}

main().catch(err => {
  console.error('Fatal:', err)
  pool.end()
})
