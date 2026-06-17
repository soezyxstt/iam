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

const philosophyData = [
  {
    title: 'Yellboys dan Solidarity Forever',
    slug: 'yellboys-solidarity-forever',
    displayCategory: 'card',
    cardLabel: 'Yellboys dan\nSolidarity Forever',
    isComingSoon: false,
    order: 1,
    detailsLayout: [
      {
        blockType: 'heroHeader',
        eyebrow: 'Identitas & Sumpah Setia',
        eyebrowStyle: 'gold',
        title: 'SOLIDARITY',
        highlightText: 'FOREVER',
        highlightStyle: 'gradient',
        intro: "Bagi alumni dan mahasiswa Teknik Mesin ITB, jargon 'Solidarity Forever' bukan sekadar yel-yel penyemangat biasa. Kalimat ini adalah identitas diri, sumpah setia, dan filosofi hidup yang mengikat mereka seumur hidup.",
        introStyle: 'large-quote',
      },
      {
        blockType: 'splitContent',
        leftColumnType: 'title',
        leftTitleEyebrow: 'Tradisi Kampus',
        leftTitleEyebrowStyle: 'red-light',
        leftTitle: 'Ketika Jargon',
        leftTitleHighlight: 'Diserukan',
        leftTitleHighlightStyle: 'gold',
        bodyText: convertToLexical(
          "Ketika diserukan dengan lantang (biasanya sembari merapatkan barisan, merangkul pundak, atau mengepalkan tangan ke udara), jargon ini membawa makna mendalam yang mengikat setiap insan Teknik Mesin ITB.\nIkatan ini melampaui masa kuliah, menghubungkan mahasiswa aktif di kampus Ganesha dengan jaringan alumni yang tersebar di berbagai belahan dunia dan sektor industri global."
        )
      },
      {
        blockType: 'pillars',
        eyebrow: 'Tiga Pilar Makna',
        eyebrowStyle: 'gold',
        title: 'Makna Mendalam Solidarity Forever',
        displayStyle: 'rows-with-left-meta',
        pillars: [
          {
            number: '01',
            numberStyle: 'red-light',
            subLabel: 'Brotherhood',
            subLabelStyle: 'gold',
            title: 'Persaudaraan Tanpa Batas Generasi',
            body: convertToLexical(
              'Dalam kultur Mesin ITB, solidaritas berarti sekali Anda memakai jaket himpunan (jaket korsa berwarna biru tua), Anda adalah saudara selamanya. Ikatan ini mendobrak semua sekat sosial, ekonomi, bahkan usia. Seorang lulusan baru (fresh graduate) tidak akan canggung untuk menyapa seorang CEO atau pejabat tinggi negara yang lulus puluhan tahun lalu, dan mereka akan menyambutnya dengan hangat hanya karena satu ikatan: sama-sama anak "Mesin".'
            )
          },
          {
            number: '02',
            numberStyle: 'gold',
            subLabel: 'Collective Struggle',
            subLabelStyle: 'red-light',
            title: 'Berjuang Bersama, Tidak Ada yang Ditinggalkan',
            body: convertToLexical(
              'Latar belakang lahirnya jargon ini berakar dari kerasnya dunia perkuliahan di ITB. Menghadapi kurikulum teknik yang padat dan penuh tekanan, mereka sadar bahwa mereka tidak akan bisa bertahan jika berjuang sendirian. "Solidarity Forever" berarti:'
            ),
            subpoints: [
              {
                emoji: '✊',
                title: 'Akademik',
                body: 'Saling bantu dalam akademik: Belajar bersama, berbagi catatan, dan memastikan tidak ada teman yang tertinggal dalam ujian-ujian teknik yang berat.'
              },
              {
                emoji: '❤️',
                title: 'Sosial',
                body: 'Jaring pengaman sosial: Jika ada mahasiswa yang mengalami kesulitan finansial atau masalah pribadi, komunitas akan bergerak cepat untuk menggalang dana atau memberikan bantuan nyata.'
              }
            ]
          },
          {
            number: '03',
            numberStyle: 'red-light',
            subLabel: 'Professionalism',
            subLabelStyle: 'gold',
            title: 'Loyalitas dan Kepercayaan di Dunia Profesional',
            body: convertToLexical(
              'Di dunia kerja, meneriakkan "Solidarity Forever" adalah sebuah pengingat akan kode etik yang tidak tertulis. Artinya, sesama alumni Mesin ITB akan saling mendukung di industri, memberikan bimbingan (mentoring), membuka peluang karier, serta menjaga integritas profesional agar tidak merusak nama baik almamater dan korps "MS" (Mesin).'
            )
          }
        ]
      },
      {
        blockType: 'closing',
        eyebrow: 'Akar Sejarah',
        eyebrowStyle: 'red-light',
        title: 'Asal-usul Jargon',
        titleStyle: 'accent',
        quoteText: 'Kalimat ini awalnya terinspirasi dari lagu pergerakan serikat buruh Amerika Serikat yang diciptakan oleh Ralph Chaplin pada tahun 1915.',
        quoteStyle: 'italic',
        bodyText: convertToLexical(
          'Namun, oleh mahasiswa Teknik Mesin ITB puluhan tahun lalu, jargon ini diadopsi dan dilepaskan dari konteks politiknya, lalu diubah menjadi simbol persaudaraan kampus yang murni dan terus dibawa hingga akhir hayat.'
        ),
        links: [
          {
            label: 'Baca Genggam Mesin',
            url: '/seputar-kami/genggam-mesin',
            hoverColor: 'gold'
          },
          {
            label: 'Baca September M',
            url: '/seputar-kami/september-m',
            hoverColor: 'red-light'
          }
        ]
      }
    ]
  },
  {
    title: 'Genggam Mesin',
    slug: 'genggam-mesin',
    displayCategory: 'card',
    cardLabel: 'Genggam\nMesin',
    isComingSoon: false,
    order: 2,
    detailsLayout: [
      {
        blockType: 'heroHeader',
        eyebrow: 'Panggilan Aksi & Semangat Korps',
        eyebrowStyle: 'red-light',
        title: 'GENGGAM',
        highlightText: 'MESIN!',
        highlightStyle: 'gold',
        intro: 'Salam Genggam Mesin bukan sekadar gestur tangan, melainkan sebuah simbol ikonik yang memiliki akar historis dan makna filosofis yang mendalam bagi keluarga besar Himpunan Mahasiswa Mesin (HMM) ITB.',
        introStyle: 'default',
      },
      {
        blockType: 'splitContent',
        leftColumnType: 'title',
        leftTitleEyebrow: 'Perbedaan & Hubungan',
        leftTitleEyebrowStyle: 'gold',
        leftTitle: 'Aksi dan',
        leftTitleHighlight: 'Persaudaraan',
        leftTitleHighlightStyle: 'red-light',
        bodyText: convertToLexical(
          'Jika Solidarity Forever melambangkan hubungan persaudaraan yang abadi, maka "Genggam Mesin" adalah panggilan aksi (call to action) yang membakar semangat korps mereka.'
        )
      },
      {
        blockType: 'dialogue',
        eyebrow: 'Ritual Yel-Yel',
        eyebrowStyle: 'red-light',
        title: 'Yell Boys!',
        description: convertToLexical(
          'Ketika pemimpin yel-yel berseru "Yell Boys!", seluruh massa akan menjawab secara serentak dengan kepalan tangan kanan yang diangkat tinggi-tinggi ke udara, disertai jargon pemersatu yang menggema.'
        ),
        dialogueItems: [
          {
            speaker: 'Pemimpin Yel-yel Berseru:',
            speakerColor: 'red-light',
            speech: 'YELL BOYS!',
            speechColor: 'white'
          },
          {
            speaker: 'Dijawab Serentak Oleh Massa:',
            speakerColor: 'gold',
            speech: 'UNION UNION MACHINE STRONG!',
            speechColor: 'gold',
            subtext: 'Disertai kepalan tangan kanan yang diangkat tinggi-tinggi ke udara'
          }
        ]
      },
      {
        blockType: 'pillars',
        eyebrow: 'Filosofi Utama',
        eyebrowStyle: 'gold',
        title: 'Makna di Balik Genggam Mesin',
        displayStyle: 'three-columns',
        pillars: [
          {
            number: '01',
            numberStyle: 'red-light',
            title: 'Simbol Persatuan & Kekuatan Kolektif',
            body: convertToLexical(
              'Kata "Genggam" secara harfiah berarti menyatukan jari-jari tangan menjadi satu kepalan yang kuat. Dalam konteks ini, "Genggam Mesin" bermakna menyatukan seluruh elemen, mulai dari mahasiswa tingkat awal, mahasiswa tingkat akhir, dosen, hingga para alumni lintas generasi, menjadi satu kesatuan yang utuh dan tidak terpecah-belah. Kepalan tangan yang kokoh ini melambangkan kekuatan bersama yang siap menghadapi tantangan apa pun.'
            )
          },
          {
            number: '02',
            numberStyle: 'gold',
            title: 'Penguasaan Teknologi & Keilmuan',
            body: convertToLexical(
              'Sebagai calon insinyur dan profesional di bidang mekanikal, jargon ini adalah pengingat akan tanggung jawab akademis mereka. "Genggam Mesin" berarti mereka harus benar-benar menguasai ilmu rekayasa mesin (engineering) dengan kuat di dalam "genggaman" mereka. Ini adalah komitmen untuk melek teknologi, inovatif, dan menjadi ahli yang kompeten agar mampu mengendalikan serta menggerakkan roda industri demi kemajuan bangsa.'
            )
          },
          {
            number: '03',
            numberStyle: 'white-muted',
            title: 'Komitmen Menjaga Nama Baik Korps',
            body: convertToLexical(
              'Menggenggam sesuatu berarti memegangnya dengan erat agar tidak jatuh atau rusak. Bagi keluarga besar Mesin ITB, "Genggam Mesin" adalah janji setiap individu untuk selalu menjaga, merawat, dan menjunjung tinggi nama baik almamater, himpunan (HMM), dan ikatan alumni (IAM). Di mana pun mereka berada, nilai-nilai integritas, kerja keras, dan kehormatan korps "MS" harus selalu dipegang teguh.'
            )
          }
        ]
      },
      {
        blockType: 'closing',
        eyebrow: 'Sinergi Nilai',
        eyebrowStyle: 'gold',
        title: 'Perpaduan Dua Jargon',
        titleStyle: 'inverse',
        quoteText: 'Dalam berbagai acara resmi maupun aksi kampus, kedua jargon ini sering kali dipadukan.',
        quoteStyle: 'default',
        bodyText: convertToLexical(
          'Jargon "Genggam Mesin" digunakan untuk mengumpulkan fokus, membakar semangat, dan menegaskan kehadiran mereka, sementara "Solidarity Forever" dinyanyikan atau diteriakkan untuk mengunci rasa persaudaraan tersebut agar tetap abadi.'
        ),
        links: [
          {
            label: 'Baca Solidarity Forever',
            url: '/seputar-kami/yellboys-solidarity-forever',
            hoverColor: 'gold'
          }
        ]
      }
    ]
  },
  {
    title: 'September M',
    slug: 'september-m',
    displayCategory: 'card',
    cardLabel: 'September M',
    isComingSoon: false,
    order: 3,
    detailsLayout: [
      {
        blockType: 'heroHeader',
        eyebrow: 'Sejarah & Warisan Inovasi',
        eyebrowStyle: 'gold',
        title: 'September',
        highlightText: 'M',
        highlightStyle: 'red-underline',
        author: 'Oleh Ontoseno',
        intro: '"September-M yang lahir di tahun 1960 - 1970-an, menjadi cikal bakal lahirnya semangat inovasi dan kreativitas para mahasiswa Mesin / FTMD."',
        introStyle: 'italic',
      },
      {
        blockType: 'splitContent',
        leftColumnType: 'info-list',
        leftInfoItems: [
          {
            eyebrow: 'Konteks Era',
            eyebrowStyle: 'red-light',
            title: '1960 - 1970-an',
            description: 'Masa kebangkitan gerakan mahasiswa dan awal era Orde Baru yang mendorong penerapan praktis teknologi.'
          },
          {
            eyebrow: 'Tokoh Penggerak',
            eyebrowStyle: 'gold',
            title: 'Muslimin Nasution & Adnan Buyung Nasution',
            description: 'Tokoh pergerakan nasional yang memfasilitasi markas luar kampus dan pembentukan INFRA.'
          },
          {
            eyebrow: 'Fokus Karya',
            eyebrowStyle: 'white-muted',
            title: 'Teknologi Pertanian & Transportasi',
            description: 'Mesin pengolahan gabah pasca panen, becak motor, dan traktor tangan.'
          }
        ],
        bodyText: convertToLexical(
          "September-M yang lahir di tahun 1960 - 1970-an, menjadi cikal bakal lahirnya semangat inovasi dan kreativitas para mahasiswa Mesin/FTMD. Kegiatan-kegiatan yang memadukan hobi, keilmuan, penerapan teknologi dengan dorongan keberanian untuk bereksperimen, telah membawa pengembangan dan perubahan mindset untuk memasuki dunia nyata dengan tantangan-tantangan riil yang mengandung risiko.\n\nGairah pembangunan di masa-masa awal Orde Baru, telah menyentuh kalangan teknokrat muda, yaitu para mahasiswa dan alumni muda yang melihat adanya peluang-peluang pengembangan semangat pembaruan dalam karya-karya nyata untuk masyarakat dan Negara.\n\nDiprakarsai tokoh-tokoh gerakan perubahan yang bermarkas di Bangbayang, yang mengorganisasi demo-demo di Jakarta dan Bandung, para mahasiswa ITB khususnya Jurusan Mesin yang telah asyik dengan 'bermain' penerapan ilmu dan teknologi dalam kegiatan go-kart bergabung dalam sebuah Kelompok Pembaharu dengan nama 'Indonesian New Frontier Association' (INFRA), diprakarsai oleh Muslimin Nasution (M 59, lulus tahun 1967) bersama Adnan Buyung Nasution, dua tokoh-pemimpin pergerakan mahasiswa.\n\nDidirikan di tahun 1968, dengan bermarkas di Jl. Ciung Wanara 12 difasilitasi oleh Muslimin Nasution, menjadikannya markas kegiatan HMM di luar kampus. Ini adalah sebuah posisi strategis karena lokasinya adalah 'tetangga' kampus Ganesha, sehingga bisa digunakan 24 jam sehari tanpa perlu terikat aturan kampus ITB.\n\nKeberadaan INFRA dengan Ciung Wanaranya menjadi ajang pengembangan karya anak-anak Mesin ITB dengan berfokus masuk ke dunia industri yang saat itu sedang sangat bergairah untuk berkembang. Dengan strategi bahwa Indonesia sebagai negara agraris harus kuat dalam sektor pertanian yang unggul, INFRA memfokuskan diri pada mesin-mesin pertanian, yang juga berkembang ke industri alat transportasi barang dan orang. Alat-alat pengolahan gabah pasca panen, becak motor, traktor tangan adalah beberapa karya INFRA yang dirancang dan dibikin dengan semangat yang telah terbangun sejak 'bermain-main' rekayasa di masa September-M di tahun-tahun 1967 - 1970-an tersebut."
        )
      },
      {
        blockType: 'closing',
        eyebrow: 'Pesan Warisan',
        eyebrowStyle: 'red-light',
        title: 'Benih Kewirausahaan',
        titleStyle: 'accent',
        quoteText: 'Demikianlah perkembangan semangat September-M telah menumbuhkan bibit-bibit kewirausahaan seperti dituliskan tersebut. Semangat September-M ini telah berkembang dalam berbagai bidang usaha, berkolaborasi dengan mitra-mitra dari berbagai profesi, banyak yang menjadi perintis di berbagai bidang kegiatan usaha dan profesi.',
        quoteStyle: 'italic',
        links: [
          {
            label: 'Baca Solidarity Forever',
            url: '/seputar-kami/yellboys-solidarity-forever',
            hoverColor: 'gold'
          },
          {
            label: 'Baca Genggam Mesin',
            url: '/seputar-kami/genggam-mesin',
            hoverColor: 'red-light'
          }
        ]
      }
    ]
  },
  {
    title: 'Lagu HMM Jerusalem',
    slug: 'lagu-hmm-jerusalem',
    displayCategory: 'card',
    cardLabel: 'Lagu HMM\nJerusalem',
    isComingSoon: true,
    order: 4,
    detailsLayout: [
      {
        blockType: 'heroHeader',
        eyebrow: 'Coming Soon',
        eyebrowStyle: 'gold',
        title: 'LAGU HMM',
        highlightText: 'JERUSALEM',
        highlightStyle: 'gold',
        intro: 'Segera hadir.',
        introStyle: 'default',
      }
    ]
  }
]

async function seedDB(dbName: string, config: any) {
  console.log(`Seeding database: ${dbName}...`)
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })
  
  for (const item of philosophyData) {
    const existing = await payload.find({
      collection: 'values-philosophy',
      where: {
        title: { equals: item.title }
      }
    })
    
    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'values-philosophy',
        id: existing.docs[0].id,
        data: item as any,
      })
      console.log(`  [${dbName}] Updated: ${item.title}`)
    } else {
      await payload.create({
        collection: 'values-philosophy',
        data: item as any,
      })
      console.log(`  [${dbName}] Created: ${item.title}`)
    }
  }
}

async function run() {
  try {
    const configPromise = (await import('../src/payload.config')).default
    const resolvedConfig = await configPromise
    await seedDB('Turso (SQLite)', resolvedConfig)

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
