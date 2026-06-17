import dotenv from 'dotenv'
import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'

const envPath = path.resolve(process.cwd(), '.env')
dotenv.config({ path: envPath })

function convertToLexical(text: string) {
  if (!text) return null
  const paragraphs = text.split('\n').filter(p => p.trim() !== '')
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: paragraphs.map(p => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text: p.trim(),
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1
          }
        ],
        direction: 'ltr'
      })),
      direction: 'ltr'
    }
  }
}

const presidentsData = [
  {
    name: 'Dr. Ir. H. Muslimin Nasution, APU',
    majorLabel: 'Mesin 59',
    period: '1989–1993',
    shortBiography: 'Dr. Ir. H. Muslimin Nasution, APU adalah seorang birokrat, teknokrat, dan tokoh pergerakan ekonomi kerakyatan di Indonesia. Beliau dikenal luas atas jasanya dalam memimpin sektor kehutanan nasional serta kontribusinya di dunia pendidikan dan organisasi sosial kemasyarakatan.',
    professionalCareer: convertToLexical(
      'Lahir 26 Januari 1939, dengan fokus pada pengembangan kelembagaan koperasi, agroindustri, dan pengelolaan sumber daya kehutanan membuat mencapai puncak karir sebagai Menteri Kehutanan dan Perkebunan (1998–1999) dalam Kabinet Reformasi Pembangunan di bawah kepemimpinan Presiden B.J. Habibie. Selama menjabat, beliau aktif mengupayakan konsep pembangunan kehutanan yang berkeadilan dan berkelanjutan.'
    ),
    personalStory: 'Selain berkarier di pemerintahan, Muslimin Nasution merupakan figur yang sangat aktif dalam dunia organisasi, pemberdayaan ekonomi, dan pendidikan berbasis keagamaan: Ikatan Cendekiawan Muslim Indonesia (ICMI), Perintis Dunia Pendidikan, dan tentunya Pakar dan Penggerak Koperasi. Beliau menuangkan banyak pemikirannya melalui berbagai buku, seperti: Koperasi: Konsepsi, Pemikiran, dan Peluang Membangun Masa Depan Bangsa; Mewujudkan Demokrasi Ekonomi dengan Koperasi; dan Pengembangan Kelembagaan Koperasi Pedesaan untuk Agroindustri.',
    linkedInUrl: ''
  },
  {
    name: 'Hertriono Kartowisastro',
    majorLabel: 'Mesin 64',
    period: '1993–1998',
    shortBiography: 'Hertriono Kartowisastro adalah salah satu tokoh senior dan figur yang sangat dihormati dalam industri minyak dan gas bumi (migas) di Indonesia. Beliau dikenal luas sebagai salah satu pendiri Medco Group bersama Arifin Panigoro, serta perintis perusahaan kontraktor pengeboran terkemuka, PT Apexindo Pratama Duta Tbk.',
    professionalCareer: convertToLexical(
      'Hertriono telah menduduki berbagai posisi strategis di puncak kepemimpinan korporasi migas nasional. Di kalangan industri dan karyawannya, Hertriono dikenal sebagai pemimpin yang profesional namun humanis. Beliau menganut filosofi bisnis yang berbasis kekeluargaan (one big family).'
    ),
    personalStory: 'Di masa aktifnya, beliau dikenal kerap turun langsung ke lapangan untuk mengunjungi para kru di atas rig pengeboran guna mendengar langsung kendala teknis maupun kesejahteraan karyawan di garis depan.',
    linkedInUrl: ''
  },
  {
    name: 'Muhammad Ekotomo',
    majorLabel: 'Mesin 71',
    period: '1998–2003',
    shortBiography: 'M. Ekotomo adalah seorang tokoh teknokrat senior dan sangat aktif di keorganisasian. Beliau dipercaya memegang peran sentral dalam menjaga jejaring antarlulusan ITB, termasuk sebagai Ketua Ikatan Alumni ITB Angkatan 1971 serta Ketua Panitia Peringatan 55 Tahun IA ITB Angkatan 1971.',
    professionalCareer: convertToLexical(
      'Sebagai alumni Teknik Mesin ITB angkatan awal 70-an, beliau dan rekan-rekan seangkatannya memiliki rekam jejak panjang dalam pembangunan teknis dan pengelolaan industri strategis nasional di Indonesia selama era modernisasi pasca-70-an.'
    ),
    personalStory: 'Di masa purnabaktinya, M. Ekotomo sangat aktif bergerak di dalam organisasi alumni untuk mengoordinasikan berbagai program sosial, kontribusi ke almamater, serta menjaga solidaritas Angkatan.',
    linkedInUrl: ''
  },
  {
    name: 'Ir. H. Faried Joesoef, M.B.A.',
    majorLabel: 'Mesin 76',
    period: '2003–2007',
    shortBiography: 'Ir. H. Faried Joesoef, M.B.A. adalah salah satu tokoh senior, teknokrat, dan profesional di bidang industri energi, manufaktur, dan investasi di Indonesia.',
    professionalCareer: convertToLexical(
      'Beliau merupakan lulusan Sarjana Teknik (Ir.) dari Institut Teknologi Bandung (ITB). Setelah itu, beliau melanjutkan pendidikan formalnya di bidang manajemen bisnis dan meraih gelar Master of Business Administration (M.B.A.). Selain di dunia usaha, beliau juga aktif terlibat dalam organisasi Ikatan Alumni ITB (IA-ITB) dan Persatuan Insinyur Indonesia (PII) yang aktif dalam mendorong profesionalisme dan sertifikasi insinyur lokal agar mampu bersaing di tingkat global.'
    ),
    personalStory: 'Di kalangan kolega dan dunia usaha, Ir. Faried Joesoef dikenal sebagai sosok "eksekutif di belakang layar" yang tenang, analitis, dan memiliki jaringan yang sangat kuat di kalangan pengusaha nasional maupun pengambil kebijakan.',
    linkedInUrl: ''
  },
  {
    name: 'Bambang Gyat',
    majorLabel: 'Mesin 82',
    period: '2007–2011',
    shortBiography: 'Bambang Gyat adalah seorang profesional industri dan konstruksi terkemuka, serta tokoh organisasi alumni Teknik Mesin ITB.',
    professionalCareer: convertToLexical(
      'Beliau pernah menjabat sebagai Direktur di PT Erraenersi Konstruksindo (Enerkon) dan aktif dalam berbagai forum profesional, seperti Ketua Komite Kompetensi & Pengembangan Teknologi di IAPMIGAS (Ikatan Ahli Perminyakan/Praktisi Migas).'
    ),
    personalStory: 'Beliau menjabat sebagai Ketua Ikatan Alumni Mesin (IAM) ITB untuk periode 2007–2011 dan dikenal aktif dalam memajukan kompetensi dan jejaring profesional para alumni.',
    linkedInUrl: ''
  },
  {
    name: 'Gembong Primadjaja',
    majorLabel: 'Mesin 86',
    period: '2011–2016',
    shortBiography: 'Gembong Primadjaja adalah seorang teknokrat, profesional di bidang industri energi dan logistik, serta figur pemimpin organisasi yang menonjol di kalangan alumni Institut Teknologi Bandung (ITB).',
    professionalCareer: convertToLexical(
      'Gembong merupakan eksekutif yang berpengalaman luas di sektor energi (terutama gas dan LNG), logistik, serta maritim di Indonesia. Beberapa posisi strategis yang pernah diembannya antara lain: Wakil Direktur Utama PT Perta Daya Gas (2018–2020), Direktur Utama PT Pelindo Energi Logistik (2017–2018), dan Ketua Tim Percepatan Konversi BBM ke BBG di Direktorat Jenderal Minyak dan Gas Bumi (2017). Beliau juga memegang gelar Master of Business dari Rutgers University, Amerika Serikat.'
    ),
    personalStory: 'Ia dikenal luas setelah terpilih sebagai Ketua Umum Pengurus Pusat Ikatan Alumni ITB (IA-ITB) periode 2021-2025. Selama memimpin, ia aktif mendorong penguatan kontribusi alumni di bidang sains, teknologi, dan seni, serta menginisiasi program seperti Indonesianisme Summit sebagai panggung karya orisinal para alumni untuk membangun bangsa.',
    linkedInUrl: ''
  },
  {
    name: 'Rudy Andriyana',
    majorLabel: 'Mesin 94',
    period: '2016–2020',
    shortBiography: 'Rudy Andriyana adalah seorang pengusaha, teknokrat, dan Direktur Utama PT Daun Biru Engineering, sebuah perusahaan teknologi lokal terkemuka di Indonesia yang bergerak di bidang sistem pemeliharaan prediktif (predictive maintenance), instrumentasi, dan monitoring berbasis IoT.',
    professionalCareer: convertToLexical(
      'Beliau memimpin PT Daun Biru Engineering dalam mengembangkan inovasi teknologi lokal di bidang predictive maintenance dan IoT untuk sektor industri strategis nasional.'
    ),
    personalStory: 'Keterlibatannya dalam IA-ITB bukan sekadar sebagai anggota biasa, melainkan sebagai salah satu alumni senior yang menjembatani dunia industri dengan almamaternya. Rudy aktif memberikan pembekalan mengenai bagaimana membangun karier dan bisnis berbasis teknologi dari bawah serta merancang program sertifikasi kompetensi untuk mahasiswa.',
    linkedInUrl: ''
  },
  {
    name: 'Rilly Christian Hutabarat',
    majorLabel: 'Mesin 98',
    period: '2020–2026',
    shortBiography: 'Rilly Christian Hutabarat adalah seorang profesional, pengusaha, dan tokoh organisasi alumni yang aktif di lingkungan Institut Teknologi Bandung (ITB). Beliau dipercaya menjabat sebagai Ketua Umum IAM ITB periode 2020 hingga Januari 2026.',
    professionalCareer: convertToLexical(
      'Sebagai pemilik berbagai perusahaan seperti PT Adikari Wisesa dan PT Pradita Puncak Sarana, Rilly dikenal kemampuannya sebagai engineer yang memahami bidang keuangan serta keahlian di bidang corporate sponsorship & komersial.'
    ),
    personalStory: 'Di bawah kepemimpinannya di IAM ITB, ia aktif mendorong kekompakan antar-generasi alumni lewat jargon khas "Solidarity Forever". Berdasarkan Surat Keputusan terbaru, Rilly Christian dipercaya menjabat sebagai Bendahara Umum Ikatan Alumni ITB (IA-ITB) Pusat tahun 2025-2029.',
    linkedInUrl: ''
  }
]

async function seedDB(dbName: string, config: any) {
  console.log(`Seeding database: ${dbName}...`)
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })
  
  for (const pres of presidentsData) {
    const presData = {
      name: pres.name,
      majorLabel: pres.majorLabel,
      period: pres.period,
      shortBiography: pres.shortBiography,
      professionalCareer: pres.professionalCareer,
      personalStory: pres.personalStory,
      linkedInUrl: pres.linkedInUrl || null,
    }
    
    const existing = await payload.find({
      collection: 'iamPresidents',
      where: {
        name: { equals: pres.name }
      }
    })
    
    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'iamPresidents',
        id: existing.docs[0].id,
        data: presData as any,
      })
      console.log(`  [${dbName}] Updated: ${pres.name}`)
    } else {
      await payload.create({
        collection: 'iamPresidents',
        data: presData as any,
      })
      console.log(`  [${dbName}] Created: ${pres.name}`)
    }
  }
}

async function run() {
  try {
    // 1. Seed default database in payload.config.ts (Turso SQLite)
    const configPromise = (await import('../src/payload.config')).default
    const resolvedConfig = await configPromise
    await seedDB('Turso (SQLite)', resolvedConfig)

    // 2. Seed Postgres if DATABASE_URL is set (Neon Postgres)
    if (process.env.DATABASE_URL) {
      const pgConfig = {
        ...resolvedConfig,
        db: postgresAdapter({
          pool: {
            connectionString: process.env.DATABASE_URL,
          },
        }),
      }
      await seedDB('Neon (Postgres)', pgConfig as any)
    } else {
      console.log('Neon (Postgres) connection string (DATABASE_URL) not found in env. Skipping.')
    }
    
    console.log('Seeding finished successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

run()
