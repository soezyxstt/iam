# 📘 Panduan Lengkap dan Referensi CMS IAM ITB

> 📌 **Pengantar Dokumen:** Dokumen ini dirancang sebagai panduan tunggal komprehensif bagi Administrator (Admin) situs web IAM ITB. Seluruh fungsi panel administrasi (CMS), struktur modul halaman, alur kerja (SOP), pemetaan database, serta ketentuan keamanan data dirangkum secara rinci di bawah ini untuk memudahkan salin-tempel (copy-paste) ke platform Notion sebagai pegangan resmi admin.

---

## 📋 Daftar Isi

1. [Pengenalan CMS dan Akses Sistem](#1-pengenalan-cms-dan-akses-sistem)
2. [Pemetaan Hubungan Antar-Data dan Struktur Halaman](#2-pemetaan-hubungan-antar-data-dan-struktur-halaman)
3. [Perilaku Publikasi Konten (Status Terbit)](#3-perilaku-publikasi-konten-status-terbit)
4. [Manajemen Media (Gambar dan Video)](#4-manajemen-media-gambar-dan-video)
5. [Panduan Pengelolaan Koleksi Konten dan SOP Operasional](#5-panduan-pengelolaan-koleksi-konten-dan-sop-operasional)
   - [5.1. Halaman (Pages)](#51-halaman-pages)
   - [5.2. Berita (Posts)](#52-berita-posts)
   - [5.3. Kategori Berita (Categories)](#53-kategori-berita-categories)
   - [5.4. Lowongan Kerja (Job Vacancies)](#54-lowongan-kerja-job-vacancies)
   - [5.5. Usaha Alumni (Alumni Businesses)](#55-usaha-alumni-alumni-businesses)
   - [5.6. Komunitas (Communities)](#56-komunitas-communities)
   - [5.7. Basis Data Alumni (Alumni Database)](#57-basis-data-alumni-alumni-database)
   - [5.8. Aktivitas Organisasi (Activities)](#58-aktivitas-organisasi-activities)
   - [5.9. Sponsor Kemitraan (Sponsors)](#59-sponsor-kemitraan-sponsors)
   - [5.10. Ketua IAM (IAM Presidents)](#510-ketua-iam-iam-presidents)
   - [5.11. Kepengurusan Bagan (Structure Charts)](#511-kepengurusan-bagan-structure-charts)
   - [5.12. Galeri Dokumentasi dan Kategori Galeri](#512-galeri-dokumentasi-dan-kategori-galeri)
   - [5.13. Anggota Struktural Organisasi](#513-anggota-struktural-organisasi)
   - [5.14. Nilai dan Filosofi (Philosophy Pages)](#514-nilai-dan-filosofi-philosophy-pages)
   - [5.15. Profil Organisasi (Global Settings)](#515-profil-organisasi-global-settings)
   - [5.16. Header Navigasi (Global Settings)](#516-header-navigasi-global-settings)
   - [5.17. Footer Kaki Halaman (Global Settings)](#517-footer-kaki-halaman-global-settings)
   - [5.18. Pengguna Panel Admin (Users)](#518-pengguna-panel-admin-users)
6. [Struktur dan Parameter Blok Tata Letak (Blocks)](#6-struktur-dan-parameter-blok-tata-letak-blocks)
   - [6.1. Konfigurasi Hero Halaman](#61-konfigurasi-hero-halaman)
   - [6.2. Blok Tata Letak Halaman (Pages Layout Blocks)](#62-blok-tata-letak-halaman-pages-layout-blocks)
   - [6.3. Blok Sisipan di Tengah Teks Berita (Rich Text Blocks)](#63-blok-sisipan-di-tengah-teks-berita-rich-text-blocks)
   - [6.4. Blok Khusus Nilai dan Filosofi (Philosophy Blocks)](#64-blok-khusus-nilai-dan-filosofi-philosophy-blocks)
7. [Fungsi Tingkat Lanjut (Form Builder dan Pengalihan)](#7-fungsi-tingkat-lanjut-form-builder-dan-pengalihan)
8. [Ketentuan Kritis Operasional dan Keamanan Data](#8-ketentuan-kritis-operasional-dan-keamanan-data)

---

## 1. Pengenalan CMS dan Akses Sistem

**CMS** merupakan singkatan dari *Content Management System*, yaitu sistem manajemen konten yang berfungsi sebagai wadah untuk mengatur dan memperbarui isi situs web secara visual. Sistem ini berupa panel kontrol khusus yang memungkinkan admin untuk mengubah teks, foto, serta berbagai daftar informasi pada situs web tanpa harus menguasai bahasa pemrograman (coding). Seluruh proses dilakukan melalui antarmuka visual yang serupa dengan pengisian formulir digital.

Pada situs web IAM ITB, panel administrasi ini dikembangkan menggunakan platform **Payload** (admin tidak diharuskan menghafal istilah teknis ini).

### 1.1. Istilah Penting dalam Pengoperasian

Berikut adalah beberapa istilah dalam bahasa Inggris yang digunakan pada tombol atau menu panel admin beserta penjelasan fungsinya:

| Istilah | Penjelasan Fungsi |
|---|---|
| **Collection** (Koleksi) | Sekumpulan data sejenis yang dikelompokkan bersama. Contoh: koleksi "Berita", koleksi "Sponsor". Setiap entri di dalamnya mewakili satu baris data atau satu halaman isian formulir. |
| **Global** | Data tunggal yang digunakan secara konsisten di seluruh situs web. Contoh: menu navigasi atas (Header) dan bagian kaki halaman (Footer). |
| **Field** (Kolom isian) | Elemen input di dalam formulir, seperti kolom isian untuk "Judul" atau "Deskripsi". |
| **Block** (Blok) | Komponen tata letak halaman yang dapat disusun secara modular (serupa dengan susunan slide presentasi). Admin dapat memilih blok yang dibutuhkan dan mengatur urutannya. |
| **Draft** (Draf) | Status konten yang belum dipublikasikan ke publik. Konten disimpan secara internal agar dapat ditinjau terlebih dahulu oleh admin. |
| **Published** (Terbit) | Status konten yang telah aktif di situs web dan dapat diakses oleh seluruh pengunjung. |
| **Publish** (Terbitkan) | Tindakan atau tombol untuk menerbitkan konten sehingga statusnya berubah dari draf menjadi aktif di situs web. |
| **Save** (Simpan) | Tindakan atau tombol untuk menyimpan perubahan data. Pada koleksi yang memiliki fitur draf, tombol ini akan menyimpan perubahan sebagai draf terlebih dahulu. |
| **Media** | Repositori pusat penyimpanan seluruh berkas gambar dan video yang digunakan dalam situs web. |
| **Dashboard** (Dasbor) | Halaman utama panel kontrol yang pertama kali ditampilkan setelah admin berhasil masuk (login). |
| **Upload** (Unggah) | Proses memindahkan berkas gambar atau video dari perangkat komputer lokal ke server situs web. |

### 1.2. Cara Mengakses Panel Admin

1. Buka peramban web (seperti Google Chrome, Mozilla Firefox, atau Microsoft Edge).
2. Tulis alamat situs web resmi IAM ITB dan tambahkan `/admin` pada bagian akhir URL.
   Contoh: `https://www.iamitb.or.id/admin`
3. Masukkan alamat **surel (email)** dan **kata sandi (password)** yang telah didaftarkan oleh pengurus.
4. Klik tombol **Login**.

> **Pemberitahuan Lupa Kata Sandi:** Apabila admin melupakan kata sandi, klik tautan "Forgot Password" pada halaman login. Ikuti instruksi pemulihan yang dikirimkan ke alamat surel admin.

### 1.3. Struktur Tampilan Panel Admin

Setelah berhasil masuk, admin akan melihat beberapa bagian utama:

#### Navigasi Kiri (Sidebar)
Pada sisi kiri layar, terdapat menu navigasi yang dikelompokkan berdasarkan kategori operasional:
- **Konten & Halaman:** Mengelola Halaman statis, Berita, dan Kategori berita.
- **Media & Berkas:** Mengakses repositori Media terpusat.
- **Direktori & Komunitas:** Mengelola Lowongan Kerja, Usaha Alumni, Komunitas, dan Basis Data Alumni.
- **Organisasi & Kegiatan:** Mengelola Aktivitas, Sponsor, Ketua IAM, Kepengurusan bagan, Galeri dokumentasi, Anggota Organisasi, Nilai & Filosofi, serta Profil Organisasi global.
- **Pengaturan Situs:** Mengatur Header, Footer, akun Users (Pengguna), formulir Forms, serta aturan pengalihan tautan (Redirects).

#### Pengisian Formulir Konten
- **Teks tebal (bold label):** Menunjukkan nama kolom isian (field) yang perlu diisi.
- **Tanda bintang (\*):** Menandakan bahwa kolom isian tersebut bersifat **wajib diisi (required)**.
- **Tanda tanya (?):** Dapat diklik untuk melihat petunjuk pengisian tambahan.

---

## 2. Pemetaan Hubungan Antar-Data dan Struktur Halaman

Tabel berikut menunjukkan bagaimana data dari suatu koleksi dirujuk atau digunakan oleh koleksi lainnya pada database situs web:

| Koleksi Sumber (Asal Data) | Digunakan Oleh (Kolom Referensi) |
|---|---|
| **Media** | Digunakan di hampir semua bagian situs web, termasuk: Berita (Gambar Utama dan data gambar optimasi SEO), Halaman (Latar belakang Hero dan modul Media), Sponsor (Logo perusahaan), Lowongan Kerja (Logo instansi dan gambar sampul), Usaha Alumni (Gambar sampul dan album foto), Galeri (Berkas dokumentasi), Komunitas (Logo dan gambar hero), Basis Data Alumni (Foto profil), Ketua IAM (Foto profil kepemimpinan), Kepengurusan (Bagan organogram), Anggota Organisasi (Foto struktural), serta bagian Footer (Gambar logo). |
| **Kategori (categories)** | Ditunjuk oleh Berita (kolom Kategori) dan blok **Archive** (sebagai filter pengelompokan berita). |
| **Berita (posts)** | Ditunjuk oleh Berita lainnya (kolom Berita Terkait), Komunitas (kolom Berita Terkait Komunitas), blok **Archive** (sumber penayangan berita), serta pengaturan Header dan Footer (tautan internal menu). |
| **Users** | Ditunjuk oleh Berita (sebagai data Penulis artikel). |
| **Aktivitas (activities)** | Ditunjuk oleh modul blok **Highlight Aktivitas** pada penyusunan Halaman. |
| **Sponsor (sponsors)** | Ditunjuk oleh modul blok **Highlight Sponsor** pada penyusunan Halaman. |
| **Lowongan Kerja (jobVacancies)** | Ditunjuk oleh modul blok **Highlight Lowongan** pada penyusunan Halaman. |
| **Kategori Galeri (galleryCategories)** | Ditunjuk oleh Galeri (setiap data foto galeri wajib dikaitkan dengan satu kategori album). |
| **Ketua IAM (iamPresidents)** | Ditunjuk oleh Profil Organisasi (pada kolom "Ketua Saat Ini"). |
| **Forms** (Dibuat pada menu Forms) | Ditunjuk oleh modul blok **Form** pada penyusunan Halaman. |
| **Halaman (pages)** | Ditunjuk oleh pengaturan Header dan Footer (sebagai tautan internal menu navigasi). |

### 2.1. Pemetaan Halaman Situs Web dan Sumber Datanya

Tabel berikut menjelaskan rincian URL halaman situs web beserta koleksi data yang menyusun isinya:

| Alamat URL Halaman Publik | Sumber Koleksi Data yang Digunakan |
|---|---|
| `/` (Beranda / Home) | Halaman statis dengan nama pengenal (slug) `home` (disusun dari kumpulan blok) ditambah data dari Profil Organisasi serta kartu Nilai & Filosofi. |
| `/berita`, `/berita/[slug]` | Mengambil data dari koleksi Berita dan Kategori. |
| `/aktivitas`, `/aktivitas/[slug]` | Mengambil data dari koleksi Aktivitas. |
| `/galeri` | Mengambil data dari koleksi Galeri dan Kategori Galeri. |
| `/sponsor` | Mengambil data dari koleksi Sponsor. |
| `/lowongan-kerja`, `/lowongan-kerja/[slug]` | Mengambil data lowongan kerja (hanya memuat data yang berstatus Terbit atau Published serta memiliki status operasional Buka atau Tutup). |
| `/usaha-alumni`, `/usaha-alumni/[slug]` | Mengambil data dari koleksi Usaha Alumni (hanya memuat data yang berstatus Terbit atau Published). |
| `/komunitas`, `/komunitas/[slug]` | Mengambil data dari koleksi Komunitas. |
| `/alumni` | Mengambil data dari Basis Data Alumni (hanya menampilkan data alumni yang opsi "Tampil di direktori publik" dicentang). |
| `/organisasi` | Mengambil data dari Anggota Organisasi dan Profil Organisasi. |
| `/organisasi/ketua-sebelumnya/[slug]` | Mengambil data dari koleksi Ketua IAM. |
| `/kepengurusan` | Mengambil data dari koleksi Kepengurusan. |
| `/seputar-kami/[slug]` | Mengambil modul detail dari koleksi Nilai & Filosofi. |
| `/kontak` | Mengambil rincian kontak dari Profil Organisasi (seperti surel, WhatsApp, dan Instagram). |
| `/pengajuan-lowongan`, `/pengajuan-usaha-alumni` | Dihasilkan dari Form builder, di mana setiap kiriman formulir dari pengunjung akan masuk ke database admin sebagai draf pada koleksi Lowongan Kerja atau Usaha Alumni. |
| `/moderasi` | Halaman dasbor khusus admin untuk memeriksa daftar draf Lowongan Kerja dan Usaha Alumni yang diajukan oleh alumni (memerlukan login admin). |

---

## 3. Perilaku Publikasi Konten (Status Terbit)

Setiap koleksi data pada sistem panel admin memiliki mekanisme penyimpanan dan publikasi yang berbeda. Admin wajib memahami pembagian perilaku berikut untuk menghindari penayangan konten yang belum siap:

| Nama Koleksi Data | Mekanisme Publikasi | Penjelasan Perilaku |
|---|---|---|
| Halaman, Berita, serta Nilai & Filosofi | **Draf, Penyimpanan Otomatis (Autosave), dan Penjadwalan Terbit** | Setiap perubahan data disimpan secara otomatis sebagai draf. Perubahan hanya akan ditayangkan pada situs web publik setelah admin mengklik tombol **Publish**. Konten juga dapat dijadwalkan untuk terbit secara otomatis pada waktu tertentu. |
| Lowongan Kerja, Usaha Alumni | **Draf (Tanpa Penyimpanan Otomatis)** | Admin wajib mengklik tombol **Publish** agar data tampil pada situs web. Data hasil kiriman formulir publik oleh alumni akan otomatis tersimpan dengan status draf guna menjalani proses moderasi terlebih dahulu. |
| Aktivitas, Sponsor, Galeri, Kategori Galeri, Ketua IAM, Kepengurusan, Komunitas, Anggota Organisasi, Kategori, serta Media | **Penyimpanan Langsung Aktif (Tanpa Draf)** | Sistem tidak mendukung mekanisme draf untuk koleksi ini. Begitu admin mengklik tombol **Save**, perubahan data akan langsung ditayangkan secara publik pada situs web. Admin diharapkan berhati-hati saat memperbarui data ini. |
| Basis Data Alumni | **Penyimpanan Langsung Aktif dengan Syarat Publikasi** | Perubahan langsung disimpan, namun data alumni hanya akan muncul pada halaman direktori publik jika opsi "Tampil di direktori publik" dicentang oleh admin. Alamat surel dan nomor telepon alumni tidak akan pernah ditampilkan ke publik demi menjaga privasi. |
| Header, Footer, serta Profil Organisasi | **Global dan Penyimpanan Langsung Aktif** | Merupakan pengaturan konfigurasi global. Perubahan data langsung diaktifkan di seluruh situs web sesaat setelah admin mengklik tombol **Save**. |

### 3.1. Penjelasan Status Dokumen
- 🔵 **Draft (Draf):** Konten disimpan di database namun belum ditayangkan secara publik.
- 🟢 **Published (Terbit):** Konten telah tayang dan dapat diakses oleh publik pada situs web.
- 🟡 **Changes (Perubahan):** Konten telah terbit sebelumnya, namun terdapat perubahan terbaru yang baru saja disimpan admin dan belum diterbitkan ulang secara publik (admin perlu mengklik **Publish** kembali).

---

## 4. Manajemen Media (Gambar dan Video)

Koleksi **Media** berfungsi sebagai pusat penyimpanan berkas gambar dan video untuk seluruh situs web. Pemahaman terhadap alur kerja media ini sangat penting:

> 🔑 **Prinsip Utama:** Admin disarankan untuk tidak mengunggah berkas gambar langsung di dalam halaman Berita atau Sponsor. Alur yang benar adalah dengan **mengunggah gambar ke repositori Media terlebih dahulu**, kemudian pada halaman Berita atau Sponsor admin cukup **memilih** gambar tersebut dari repositori Media. Satu berkas gambar yang telah tersimpan di repositori Media dapat digunakan berulang kali di berbagai halaman situs web.

```text
[Berkas Komputer Lokal]
          │
          │ Unggah (Upload)
          ▼
[Media & Berkas → Media]  (Disimpan di dalam folder repositori)
          │
          │ Dipilih / Dirujuk
          ▼
[Kolom Gambar di Berita / Sponsor / Galeri / dll.]
```

### 4.1. Langkah Mengunggah Berkas Media

1. Akses menu **Media & Berkas → Media**.
2. (Sangat Disarankan) Masuk atau buat **folder** penempatan yang sesuai sebelum mengunggah berkas. Struktur folder yang disarankan:
   - `berita`: Berisi gambar utama dan gambar ilustrasi di sela-sela teks berita.
   - `galeri`: Berisi dokumentasi foto kegiatan organisasi.
   - `sponsor`: Berisi berkas gambar logo perusahaan sponsor.
   - `lowongan`: Berisi logo perusahaan dan gambar sampul lowongan kerja.
   - `organisasi`: Berisi foto jajaran pengurus, organogram, dan foto profil ketua umum.
   - `usaha-alumni`: Berisi dokumentasi foto profil bisnis usaha milik alumni.
   - `umum`: Berisi logo situs web, gambar latar hero beranda, dan aset umum lainnya.
3. Klik tombol **Create New**, lalu seret berkas ke area unggahan.
4. Lengkapi kolom parameter berikut:
   - **Nama Media** (`name` - Opsional): Judul berkas pada daftar Media untuk mempermudah pencarian. Contoh: `Reuni Akbar 2025 - Foto Panggung`.
   - **Alt** (`alt` - Opsional): Teks alternatif pembaca layar dan optimasi mesin pencari (SEO). Tulis penjelasan isi gambar secara singkat. Contoh: `Peserta reuni berfoto bersama di Sabuga`.
   - **Caption** (`caption` - Opsional): Teks keterangan penjelas yang akan tampil tepat di bawah gambar (mendukung Rich Text).
   - **Focal point** (Otomatis): Titik tengah fokus gambar saat dipotong otomatis oleh sistem ke berbagai skala perangkat. Admin dapat menggeser posisi titik pada objek terpenting.
5. Klik tombol **Save** untuk menyimpan berkas.

### 4.2. Proses Skala Gambar Otomatis

Setelah berkas gambar berhasil diunggah, sistem secara otomatis menghasilkan beberapa alternatif ukuran gambar di latar belakang:

| Identifikasi Ukuran | Spesifikasi Dimensi | Penempatan Penggunaan |
|---|---|---|
| `thumbnail` | Lebar 300 piksel | Pratinjau gambar pada halaman daftar panel admin. |
| `square` | 500 × 500 piksel | Tampilan kartu informasi berbentuk persegi. |
| `small` | Lebar 600 piksel | Penayangan pada layar perangkat berukuran kecil (ponsel pintar). |
| `medium` | Lebar 900 piksel | Penayangan gambar pada bagian isi artikel berita. |
| `large` | Lebar 1400 piksel | Gambar tajuk utama (hero) atau gambar berukuran besar. |
| `xlarge` | Lebar 1920 piksel | Penayangan pada monitor beresolusi tinggi. |
| `og` | 1200 × 630 piksel | Gambar pratinjau saat tautan dibagikan ke WhatsApp atau media sosial. |

> 📌 **Ketentuan Resolusi Unggahan:** Admin sangat disarankan untuk selalu mengunggah berkas gambar dengan resolusi tertinggi yang tersedia (lebar minimal 1920 piksel untuk gambar hero, dan minimal 1200 piksel untuk gambar artikel). Sistem akan memproses penyesuaian skala secara otomatis agar gambar tidak terlihat pecah pada monitor beresolusi tinggi.

### 4.3. Format Berkas yang Didukung

- **Berkas Gambar:** Mendukung seluruh ekstensi standar seperti JPG, PNG, WebP, dan GIF.
- **Berkas Video:** Hanya mendukung format MP4 dan WebM. Khusus untuk berkas video berdurasi panjang atau memiliki kapasitas memori besar, admin dilarang mengunggah berkas video secara langsung. Admin diwajibkan menggunakan kolom **URL video sematan** untuk menautkan video dari platform pihak ketiga seperti YouTube atau Vimeo.

### 4.4. Opsi Pemilihan Media pada Koleksi Konten

Pada setiap kolom pengisian gambar di berbagai formulir konten (contoh: kolom Gambar Utama pada Berita), admin akan menemui dua opsi tombol aksi:
- **Choose from existing:** Memilih berkas dari repositori Media Library yang telah diunggah sebelumnya (admin dapat memanfaatkan filter pencarian berdasarkan folder atau nama media).
- **Create New / Upload:** Mengunggah berkas baru secara langsung dari komputer lokal melalui kolom tersebut. Berkas baru ini akan otomatis disimpan oleh sistem ke dalam koleksi Media (disimpan pada tingkat utama repositori atau root folder, sehingga untuk menjaga kerapian folder disarankan untuk tetap melakukan unggahan awal melalui menu Media).

---

## 5. Panduan Pengelolaan Koleksi Konten dan SOP Operasional

Berikut adalah panduan lengkap dari setiap koleksi data yang tersedia pada panel navigasi kiri admin, lengkap dengan daftar kolom isian (fields) serta Standar Operasional Prosedur (SOP) operasional pengisian datanya.

---

### 5.1. Halaman (Pages)

- **Fungsi dan Lokasi Menu:** Digunakan untuk mengelola susunan halaman statis utama situs web, seperti Beranda, Tentang Kami, dan Kontak. Terletak pada menu **Konten & Halaman → Halaman**.
- **Mekanisme Publikasi:** Draf, Penyimpanan Otomatis (Autosave), dan Penjadwalan Terbit.
- **Kolom Isian Formulir Halaman:**
  - **Judul Halaman** (\*): Nama halaman (contoh: "Tentang Kami").
  - **Hero:** Konfigurasi tajuk bagian atas halaman (terdiri dari kolom Type, Rich Text, Links, dan Media).
  - **Konten Halaman:** Area penyusunan tata letak menggunakan blok-blok modular (lihat panduan [Bagian 6](#6-struktur-dan-parameter-blok-tata-letak-blocks)).
  - **SEO:** Pengaturan metadata penelusuran Google pada tab SEO (Meta Title, Meta Description, Meta Image).
- **SOP Operasional Pembuatan Halaman Baru:**
  1. Klik tombol **Create New** pada daftar halaman.
  2. Masukkan nama halaman pada kolom **Judul Halaman**.
  3. Konfigurasikan tab **Hero** dengan memilih jenis Hero (None, High, Medium, atau Low Impact).
  4. Buka tab **Konten** dan klik tombol **Add Layout** untuk menambahkan modul blok tata letak secara berurutan sesuai kebutuhan desain.
  5. Buka tab **SEO** dan lengkapi data optimasinya (disarankan mengisi Meta Title dan Meta Description).
  6. Klik tombol **Save** untuk menyimpan sebagai draf, atau **Publish** untuk langsung menayangkannya ke situs web.

---

### 5.2. Berita (Posts)

- **Fungsi dan Lokasi Menu:** Digunakan untuk mempublikasikan artikel berita, pengumuman resmi organisasi, atau materi blog. Terletak pada menu **Konten & Halaman → Berita**.
- **Mekanisme Publikasi:** Draf, Penyimpanan Otomatis (Autosave), dan Penjadwalan Terbit.
- **Kolom Isian Formulir Berita:**
  - **Judul** (\*): Judul utama artikel berita.
  - **Gambar Utama** (\*): Gambar sampul representatif artikel.
  - **Konten Berita** (\*): Editor Rich Text untuk menuliskan tubuh teks utama berita.
  - **Berita Terkait** (Opsional): Pilihan relasi untuk merekomendasikan artikel berita lainnya.
  - **Kategori** (Opsional): Klasifikasi topik pengelompokan berita.
  - **Penulis** (Opsional): Nama pengurus atau admin yang bertindak sebagai pembuat materi berita.
  - **SEO:** Pengaturan metadata penelusuran Google pada tab SEO (Meta Title, Meta Description, Meta Image).
- **SOP Operasional Penulisan Berita:**
  1. Unggah terlebih dahulu foto utama yang akan dijadikan gambar sampul artikel ke repositori **Media** (pada folder `berita`), lengkapi Nama Media dan Alt, lalu klik **Save**.
  2. Buka menu **Konten & Halaman → Berita**, lalu klik tombol **Create New**.
  3. Masukkan judul artikel pada kolom **Judul**.
  4. Klik kolom **Gambar Utama**, pilih opsi **Choose from existing**, lalu cari dan pilih foto yang baru diunggah sebelumnya.
  5. Tulis paragraf berita pada editor **Konten Berita**. Admin dapat menyisipkan sub-judul (Heading H2 sampai H4), kotak penekanan Banner, maupun blok Media tambahan di sela-sela tulisan paragraf.
  6. Hubungkan berita dengan kategori yang sesuai pada kolom **Kategori**.
  7. Buka tab **SEO** dan klik tombol pengisian otomatis untuk menyusun metadata pencarian secara instan.
  8. Klik tombol **Publish** untuk langsung menayangkan artikel ke situs web publik.

---

### 5.3. Kategori Berita (Categories)

- **Fungsi dan Lokasi Menu:** Klasifikasi pengelompokan artikel berita untuk mempermudah navigasi pencarian pembaca. Terletak pada menu **Konten & Halaman → Kategori**.
- **Mekanisme Publikasi:** Penyimpanan Langsung Aktif (Tanpa Draf).
- **Kolom Isian Formulir Kategori:**
  - **Judul** (\*): Nama kategori (contoh: "Beasiswa", "Kegiatan", atau "Pengumuman").
- **SOP Operasional Pembuatan Kategori:**
  1. Buka menu **Kategori**, lalu klik tombol **Create New**.
  2. Masukkan nama kategori pada kolom **Judul**.
  3. Klik **Save**. Kategori tersebut akan langsung aktif dan otomatis muncul sebagai pilihan pada formulir pembuatan berita baru.

---

### 5.4. Lowongan Kerja (Job Vacancies)

- **Fungsi dan Lokasi Menu:** Mengelola daftar informasi lowongan pekerjaan dari alumni atau mitra eksternal IAM ITB. Terletak pada menu **Direktori & Komunitas → Lowongan Kerja**.
- **Mekanisme Publikasi:** Draf (Tanpa Penyimpanan Otomatis).
- **Kolom Isian Formulir Lowongan Kerja:**
  - **Posisi** (\*): Nama jabatan pekerjaan yang dibuka.
  - **Nama Perusahaan** (\*): Nama perusahaan yang membuka lowongan.
  - **Logo Perusahaan** (Opsional): Berkas logo perusahaan (diunggah ke Media).
  - **Gambar Sampul** (Opsional): Gambar visual utama pada halaman detail lowongan.
  - **Lokasi** (Opsional): Nama wilayah atau kota penempatan kerja.
  - **Kategori/Bidang** (Opsional): Sektor industri pekerjaan (contoh: Teknologi).
  - **Work Setup** (Opsional): Format kerja (On-site, Hybrid, atau Remote).
  - **Tipe Pekerjaan** (\*): Status kepegawaian (KP, Magang, Full Time, Part Time, atau Kontrak).
  - **Status** (\*): Status ketersediaan lowongan (Buka atau Tutup).
  - **Tingkat Pengalaman** (Opsional): Kualifikasi (Entry, Mid, Senior, atau Executive).
  - **Rentang Gaji** (Opsional): Kisaran upah bulanan.
  - **Deskripsi Pekerjaan** (\*): Penjelasan terperinci mengenai tugas dan tanggung jawab kerja.
  - **Persyaratan** (Opsional): Kualifikasi minimal calon pelamar.
  - **Manfaat & Keuntungan** (Opsional): Tunjangan atau benefit tambahan yang ditawarkan.
  - **Nomor WA Kontak** (Opsional): Kontak WhatsApp narahubung.
  - **Tautan Resmi** (Opsional): Tautan formulir pendaftaran eksternal resmi.
  - **Kuota** (Opsional): Jumlah posisi yang dibutuhkan.
  - **Screening Questions** (Opsional): Kumpulan pertanyaan penyaringan khusus bagi calon pelamar.

---

### 5.5. Usaha Alumni (Alumni Businesses)

- **Fungsi dan Lokasi Menu:** Menyajikan profil unit bisnis dan usaha komersial yang dimiliki atau dikelola oleh alumni IAM ITB. Terletak pada menu **Direktori & Komunitas → Usaha Alumni**.
- **Mekanisme Publikasi:** Draf (Tanpa Penyimpanan Otomatis).
- **Kolom Isian Formulir Usaha Alumni:**
  - **Pemilik Usaha** (\*): Nama lengkap alumni selaku pemilik bisnis.
  - **Nama Usaha** (\*): Nama badan bisnis atau merk dagang usaha.
  - **Gambar Sampul** (Opsional): Foto representatif profil usaha.
  - **Kategori** (\*): Sektor industri (Manufaktur, Jasa, F&B, Teknologi, atau Lainnya).
  - **Narasi/Deskripsi** (\*): Kisah latar belakang, filosofi, atau perkembangan usaha.
  - **Produk/Jasa** (\*): Rincian produk barang atau layanan jasa yang ditawarkan.
  - **Alamat** (\*): Lokasi fisik toko atau kantor usaha.
  - **Nomor Telepon** (\*): Nomor kontak operasional bisnis.
  - **Email** (Opsional): Alamat surel resmi usaha.
  - **Website** (Opsional): Tautan situs web resmi usaha.
  - **Instagram** (Opsional): Nama akun Instagram usaha.
  - **Tahun Berdiri** (Opsional): Tahun awal mula berdirinya usaha.
  - **Galeri Foto** (Opsional): Dokumentasi foto tambahan pendukung profil usaha (maksimal 12 foto).

#### SOP Operasional Moderasi Pengajuan Lowongan Kerja dan Usaha Alumni:
1. Ketika alumni mengirimkan data melalui alamat `/pengajuan-lowongan` atau `/pengajuan-usaha-alumni`, sistem secara otomatis menyimpannya sebagai data baru berstatus **Draf** pada database.
2. Admin masuk ke panel admin, lalu akses halaman moderasi pada alamat `/moderasi` (atau akses langsung menu koleksi terkait dan saring tampilan data yang memiliki status Draft).
3. Lakukan peninjauan data: periksa kesesuaian tulisan dan lengkapi data yang kurang (seperti mengunggah logo perusahaan atau gambar sampul, karena alumni pengaju tidak diberikan akses untuk mengunggah berkas media secara langsung demi keamanan server).
4. Jika data telah sesuai, klik tombol **Publish** untuk menayangkan konten ke situs web publik. Jika data tidak layak tayang, admin dapat menghapusnya atau membiarkannya tetap berstatus draf.

---

### 5.6. Komunitas (Communities)

- **Fungsi dan Lokasi Menu:** Mengelola data profil komunitas hobi atau cabang olahraga di bawah naungan resmi IAM ITB. Terletak pada menu **Direktori & Komunitas → Komunitas**.
- **Mekanisme Publikasi:** Penyimpanan Langsung Aktif (Tanpa Draf).
- **Kolom Isian Formulir Komunitas:**
  - **Nama Komunitas** (\*): Nama resmi komunitas.
  - **Logo** (\*): Logo resmi komunitas (diunggah ke repositori Media).
  - **Gambar Background Hero** (Opsional): Gambar latar bagian atas halaman komunitas.
  - **Deskripsi Singkat** (\*): Ulasan singkat mengenai komunitas.
  - **Visi dan Misi** (Opsional): Pernyataan visi dan misi komunitas dalam bentuk Rich Text.
  - **Kontak Pengelola** (Opsional): Nama dan nomor kontak koordinator pengelola.
  - **Informasi Cara Bergabung** (Opsional): Instruksi pendaftaran bagi alumni yang tertarik bergabung.
  - **Berita Terkait** (Opsional): Tautan ke artikel berita situs web yang berkaitan dengan komunitas.
- **SOP Operasional Pembaruan Komunitas:**
  1. Siapkan berkas logo dan gambar hero komunitas, lalu unggah ke repositori Media (pada folder `umum`).
  2. Masuk ke menu **Komunitas**, lalu klik tombol **Create New** (atau pilih entri komunitas yang ingin disunting dari daftar).
  3. Lengkapi isian formulir sesuai parameter di atas.
  4. Klik tombol **Save** untuk langsung menayangkan profil komunitas pada situs web publik.

---

### 5.7. Basis Data Alumni (Alumni Database)

- **Fungsi dan Lokasi Menu:** Direktori basis data profil alumni IAM ITB. Terletak pada menu **Direktori & Komunitas → Basis Data Alumni**.
- **Mekanisme Publikasi:** Penyimpanan Langsung Aktif dengan Syarat Publikasi (Tampil di direktori publik).
- **Kolom Isian Formulir Basis Data Alumni:**
  - **Nama lengkap** (\*): Nama lengkap alumni.
  - **Angkatan (tahun)** (Opsional): Tahun kelulusan dari jurusan Teknik Mesin ITB.
  - **Judul ringkas / profesi** (Opsional): Gelar profesional singkat (contoh: "Software Engineer").
  - **Instansi / perusahaan** (Opsional): Nama instansi tempat bekerja saat ini.
  - **Jabatan** (Opsional): Posisi jabatan kerja saat ini.
  - **Email** (Opsional): Alamat surel aktif (hanya dapat diakses secara internal oleh admin).
  - **Telepon** (Opsional): Nomor kontak aktif (hanya dapat diakses secara internal oleh admin).
  - **LinkedIn URL** (Opsional): Tautan ke profil LinkedIn profesional alumni.
  - **Bio singkat** (Opsional): Deskripsi singkat mengenai profil alumni.
  - **Tampil di direktori publik** (Opsional): Beri tanda centang jika profil alumni diperbolehkan muncul di halaman direktori publik situs web.
- **SOP Operasional Pembaruan Data Alumni:**
  1. Masuk ke menu **Basis Data Alumni**, lalu klik tombol **Create New** (atau pilih profil alumni yang bersangkutan).
  2. Lengkapi isian formulir sesuai data terbaru.
  3. Konfirmasikan persetujuan penayangan dengan menandai opsi **Tampil di direktori publik** jika diizinkan oleh alumni yang bersangkutan.
  4. Klik **Save**. Seluruh informasi sensitif (surel dan telepon) tidak akan pernah ditayangkan ke publik demi menjaga privasi data.

---

### 5.8. Aktivitas Organisasi (Activities)

- **Fungsi dan Lokasi Menu:** Mendokumentasikan dan menyajikan rangkuman agenda kegiatan serta acara yang dilaksanakan oleh IAM ITB. Terletak pada menu **Organisasi & Kegiatan → Aktivitas**.
- **Mekanisme Publikasi:** Penyimpanan Langsung Aktif (Tanpa Draf).
- **Kolom Isian Formulir Aktivitas:**
  - **Nama Kegiatan** (\*): Judul resmi agenda kegiatan.
  - **Ringkasan** (Opsional): Paragraf pendek ringkasan acara untuk cuplikan halaman depan.
  - **Gambar Utama** (Opsional): Foto sampul representatif kegiatan.
  - **Tipe Kegiatan** (Opsional): Kategori acara (Pulang Kampus, Beasiswa, Reuni Akbar, Kongres, Agenda Rutin, atau Lainnya).
  - **Tanggal** (\*): Tanggal pelaksanaan acara.
  - **Deskripsi** (\*): Detail lengkap informasi jalannya kegiatan (mendukung format Rich Text).

---

### 5.9. Sponsor Kemitraan (Sponsors)

- **Fungsi dan Lokasi Menu:** Mengelola daftar perusahaan atau instansi mitra sponsor pendukung kegiatan organisasi. Terletak pada menu **Organisasi & Kegiatan → Sponsor**.
- **Mekanisme Publikasi:** Penyimpanan Langsung Aktif (Tanpa Draf).
- **Kolom Isian Formulir Sponsor:**
  - **Nama Perusahaan** (\*): Nama lengkap instansi sponsor.
  - **Kategori** (\*): Klasifikasi tingkatan sponsor (Platinum, Gold, Silver, Bronze, Media Partner, atau Lainnya).
  - **Logo** (\*): Logo resmi instansi sponsor (diunggah ke repositori Media).
  - **Deskripsi Singkat** (\*): Ulasan ringkas mengenai profil perusahaan sponsor.
  - **Periode dukungan** (Opsional): Jangka waktu kerja sama dukungan (contoh: "2024-2025").
  - **Website Resmi** (Opsional): Tautan menuju situs web resmi perusahaan sponsor.

#### SOP Operasional Menampilkan Logo Sponsor Baru pada Beranda (Home):
1. Masuk ke menu **Sponsor**, klik **Create New**, isi kolom isian sesuai parameter sponsor (termasuk mengunggah logo ke folder `sponsor` di repositori Media), lalu klik **Save**.
2. Masuk ke menu **Konten & Halaman → Halaman**, pilih dan buka entri halaman utama dengan pengenal (slug) bernama **Home**.
3. Buka tab **Konten**, temukan blok tata letak bernama **Highlight Sponsor** (atau klik tombol **Add Layout** lalu pilih blok Highlight Sponsor jika belum ditambahkan).
4. Klik tombol tambah pada daftar **Sponsor Pilihan**, pilih nama instansi sponsor yang baru dibuat tadi, lalu klik tombol **Publish** untuk memperbarui halaman utama.

---

### 5.10. Ketua IAM (IAM Presidents)

- **Fungsi dan Lokasi Menu:** Menyimpan rekaman profil sejarah kepemimpinan ketua umum IAM ITB dari masa ke masa. Terletak pada menu **Organisasi & Kegiatan → Ketua IAM**.
- **Mekanisme Publikasi:** Penyimpanan Langsung Aktif (Tanpa Draf).
- **Kolom Isian Formulir Ketua IAM:**
  - **Nama** (\*): Nama lengkap beserta gelar ketua umum.
  - **Foto Profil** (Opsional): Foto potret resmi ketua umum.
  - **Angkatan/Jurusan** (Opsional): Keterangan angkatan kuliah (contoh: "Teknik Mesin 2008").
  - **Periode** (\*): Masa bakti jabatan kepemimpinan (contoh: "2024-2026").
  - **Biografi Singkat** (\*): Ulasan singkat mengenai riwayat hidup ketua.
  - **Riwayat Karier** (Opsional): Riwayat pekerjaan dan pengalaman profesional ketua (mendukung Rich Text).
  - **Cerita Personal** (Opsional): Catatan tulisan personal atau esai singkat ketua.
  - **LinkedIn URL** (Opsional): Tautan ke profil LinkedIn milik ketua.

#### SOP Operasional Memperbarui Data Ketua Umum Aktif:
1. Masuk ke menu **Ketua IAM**, klik **Create New**, lengkapi seluruh profil ketua umum aktif yang baru (nama, foto, periode, biografi), lalu klik **Save**.
2. Masuk ke menu global **Profil Organisasi** (terletak di menu navigasi kiri), temukan kolom **Ketua Saat Ini**, lalu pilih nama ketua umum yang baru dibuat tadi dari daftar relasi data yang tersedia.
3. Klik tombol **Save** untuk menyimpan perubahan konfigurasi global.

---

### 5.11. Kepengurusan Bagan (Structure Charts)

- **Fungsi dan Lokasi Menu:** Mengunggah berkas gambar bagan struktur organisasi pengurus resmi IAM ITB pada periode kepengurusan aktif. Terletak pada menu **Organisasi & Kegiatan → Kepengurusan**.
- **Mekanisme Publikasi:** Penyimpanan Langsung Aktif (Tanpa Draf).
- **Kolom Isian Formulir Kepengurusan:**
  - **Periode** (\*): Masa periode kepengurusan (contoh: "2024-2026").
  - **Organogram** (\*): Gambar bagan struktur organisasi pengurus (diunggah ke folder `organisasi` di Media).

---

### 5.12. Galeri Dokumentasi dan Kategori Galeri

- **Fungsi dan Lokasi Menu:** Mengelola berkas foto dan video dokumentasi kegiatan organisasi. Terletak pada menu **Organisasi & Kegiatan → Galeri**.
- **Mekanisme Publikasi:** Penyimpanan Langsung Aktif (Tanpa Draf).
- **Struktur data:** Galeri menggunakan konsep album, di mana setiap data berkas foto/video galeri wajib dikaitkan dengan satu kategori album tertentu.

#### SOP Operasional Menambahkan Dokumentasi ke Galeri:
1. **Membuat Album Baru (Jika Belum Tersedia):** Masuk ke menu **Kategori Galeri**, klik **Create New**, isi kolom **Judul Album/Kategori** (contoh: "Reuni Akbar 2024") beserta **Sub-judul** (opsional), lalu klik **Save**.
2. **Unggah Berkas Gambar:** Buka repositori **Media**, pilih folder `galeri`, unggah berkas dokumentasi foto, lengkapi **Nama Media** dan **Alt**, lalu klik **Save**.
3. **Pengisian Konten Galeri:** Masuk ke menu **Galeri**, lalu klik **Create New**:
   - Pada kolom **Kategori / Album**, pilih nama album tujuan yang sesuai.
   - Pada kolom **Gambar atau file video**, pilih berkas gambar yang telah diunggah ke repositori sebelumnya.
   - Alternatif video: Pada kolom **URL video sematan**, masukkan tautan video resmi yang bersumber dari YouTube atau Vimeo (metode ini sangat disarankan untuk konten video agar tidak membebani server situs web). Minimal salah satu dari kolom berkas gambar/video atau URL sematan wajib terisi.
   - Pada kolom **Deskripsi**, ketik deskripsi singkat kegiatan yang akan tampil sebagai keterangan foto pada situs web.
4. Klik tombol **Save** untuk langsung menayangkan konten ke halaman galeri situs web publik (proses sinkronisasi halaman berdurasi maksimal sekitar 10 menit).

---

### 5.13. Anggota Struktural Organisasi

- **Fungsi dan Lokasi Menu:** Mendata profil seluruh jajaran pengurus struktural aktif yang tergabung dalam organisasi IAM ITB. Terletak pada menu **Organisasi & Kegiatan → Anggota Organisasi**.
- **Mekanisme Publikasi:** Penyimpanan Langsung Aktif (Tanpa Draf).
- **Kolom Isian Formulir Anggota Organisasi:**
  - **Nama Lengkap** (\*): Nama lengkap beserta gelar dari pengurus.
  - **Jabatan** (Opsional): Peran struktural pengurus (contoh: "Ketua Umum").
  - **Foto** (Opsional): Foto potret resmi pengurus (diunggah ke folder `organisasi` di Media).
  - **Tipe Anggota** (\*): Kategori penempatan pengurus (Pengurus Inti, Ketua Bidang, Dewan Penasihat, atau Dewan Pakar).
  - **Tingkat Tree** (Opsional): Tingkatan level struktural untuk mengurutkan bagan organisasi (nilai 1 untuk Ketua Umum, nilai 2 untuk Sekretaris Jenderal atau Bendahara, nilai 3 untuk Wakil Ketua Umum, dan nilai 4 untuk Ketua Bidang).
  - **Urutan** (Opsional): Angka penentu posisi urutan tampilan untuk pengurus yang berada di tingkatan level struktural yang sama (angka yang bernilai lebih kecil diposisikan di sebelah kiri).
  - **LinkedIn URL** (Opsional): Tautan langsung ke profil LinkedIn pengurus.

#### SOP Operasional Menambahkan Pengurus Baru ke Bagan Struktur:
1. Masuk ke repositori **Media**, buka folder `organisasi`, lalu unggah foto pengurus yang bersangkutan.
2. Masuk ke menu **Anggota Organisasi**, lalu klik **Create New**.
3. Isi data pengurus sesuai kolom isian di atas.
4. Klik tombol **Save** untuk langsung memperbarui tampilan struktur organisasi pada halaman `/organisasi`.

---

### 5.14. Nilai dan Filosofi (Philosophy Pages)

- **Fungsi dan Lokasi Menu:** Mengelola penjelasan nilai-nilai dasar serta sejarah filosofi organisasi IAM ITB, seperti jargon "Genggam Mesin" atau "September M". Terletak pada menu **Organisasi & Kegiatan → Nilai & Filosofi**.
- **Mekanisme Publikasi:** Draf, Penyimpanan Otomatis (Autosave), dan Penjadwalan Terbit.
- **Kolom Isian Formulir Nilai dan Filosofi:**
  - **Judul Utama** (\*): Nama nilai atau filosofi yang diangkat.
  - **Kategori Tampilan** (\*): Format kartu di beranda, yaitu Card (satu kolom) atau Banner (lebar penuh).
  - **Label Kartu** (\*): Kalimat penjelas singkat yang dimuat pada kartu visual beranda.
  - **Segera Hadir** (Opsional): Beri tanda centang jika materi konten masih dalam tahap persiapan dan belum siap ditampilkan.
  - **Urutan Tampilan** (Opsional): Nomor penentu prioritas urutan penayangan kartu nilai pada beranda.
  - **Tata Letak Konten** (\*): Halaman detail disusun menggunakan pilihan blok khusus (lihat panduan [Bagian 6.4](#64-blok-khusus-nilai-dan-filosofi-philosophy-blocks)).

---

### 5.15. Profil Organisasi (Global Settings)

- **Fungsi dan Lokasi Menu:** Berisi informasi profil organisasi secara keseluruhan. Terletak pada menu **Organisasi & Kegiatan → Profil Organisasi**.
- **Mekanisme Publikasi:** Global dan Penyimpanan Langsung Aktif (Tanpa Draf). Hanya terdiri dari satu entri data utama.
- **Kolom Isian Profil Organisasi:**
  - **Tagline** (Opsional): Moto resmi organisasi. Contoh: "For Union Machine Strong".
  - **Ringkasan Tentang Kami** (Opsional): Paragraf perkenalan singkat yang ditayangkan pada halaman utama.
  - **Visi** (Opsional): Rumusan visi masa depan organisasi (mendukung Rich Text).
  - **Misi** (Opsional): Rumusan misi organisasi (mendukung Rich Text).
  - **Ketua Saat Ini** (Opsional): Kolom relasi untuk memilih ketua umum aktif dari daftar koleksi Ketua IAM.
  - **Kata Pengantar Ketua** (Opsional): Teks kata sambutan dari ketua umum aktif.
  - **Ringkasan Latar Belakang** (Opsional): Rangkuman singkat sejarah berdirinya organisasi.
  - **Sejarah Lengkap** (Opsional): Teks utuh perjalanan sejarah berdirinya IAM ITB (mendukung Rich Text).
  - **Hubungan dengan HMM ITB** (Opsional): Penjelasan formal mengenai hubungan kemitraan dengan Himpunan Mahasiswa Mesin ITB.
  - **Nilai & Filosofi** (Opsional): Tautan pendukung nilai organisasi (seperti Genggam Mesin, Lagu Jerusalem, Yellboys, Solidarity Forever, atau September M).
  - **Email Kontak** (Opsional): Alamat surel resmi organisasi.
  - **WhatsApp Kontak** (Opsional): Nomor layanan kontak WhatsApp resmi pengurus.
  - **Instagram Kontak** (Opsional): Akun resmi Instagram organisasi.

---

### 5.16. Header Navigasi (Global Settings)

- **Fungsi dan Lokasi Menu:** Mengatur menu navigasi yang muncul di bagian atas website. Terletak pada menu **Pengaturan Situs → Header**.
- **Mekanisme Publikasi:** Global dan Penyimpanan Langsung Aktif (Tanpa Draf). Hanya terdiri dari satu entri data utama.
- **SOP Operasional Mengonfigurasi Menu Navigasi:**
  1. Buka halaman pengaturan **Header**.
  2. Pada bagian **Nav Items**, klik tombol **Add Nav Item**.
  3. Lengkapi kolom isian berikut:
     - **Label:** Teks judul menu yang akan tampil pada navigasi situs web (contoh: "Beranda" atau "Tentang Kami").
     - **Tipe:** Pilih opsi `Internal link` jika menu mengarah ke halaman atau berita internal situs web, atau opsi `Custom URL` jika menu mengarah ke halaman luar situs web.
     - Apabila memilih opsi `Internal link`, tentukan halaman atau berita tujuan pada kolom yang muncul.
     - Apabila memilih opsi `Custom URL`, masukkan tautan alamat lengkap tujuan pada kolom URL (contoh: `https://www.google.com`).
     - **Open in new tab:** Beri centang pada opsi ini apabila ingin tautan dibuka melalui tab baru peramban web.
  4. Cara menyusun **Sub-menu (Dropdown):**
     - Beri centang pada opsi **"Punya Sub-Menu?"**.
     - Klik tombol **Add Dropdown Items**.
     - Masukkan daftar item sub-menu dengan pola pengisian yang sama seperti langkah di atas.
  5. Atur urutan menu navigasi dengan menyeret dan melepas item menu yang bersangkutan (drag & drop).
  6. Klik tombol **Save** untuk menyimpan perubahan.

---

### 5.17. Footer Kaki Halaman (Global Settings)

- **Fungsi dan Lokasi Menu:** Mengatur bagian paling bawah (kaki) website. Terletak pada menu **Pengaturan Situs → Footer**.
- **Mekanisme Publikasi:** Global dan Penyimpanan Langsung Aktif (Tanpa Draf). Hanya terdiri dari satu entri data utama.
- **Kolom Isian Footer:**
  - **Logo** (Opsional): Unggah berkas gambar logo khusus untuk ditampilkan di bagian kaki halaman.
  - **Logo Text** (Opsional): Teks alternatif pengganti gambar logo. Teks standar yang digunakan adalah "IAM\nITB".
  - **Social Links** (Opsional): Daftar tautan akun media sosial organisasi (seperti Instagram, WhatsApp, Facebook, LinkedIn, YouTube, atau X/Twitter).
  - **Copyright Text** (Opsional): Teks pernyataan hak cipta resmi yang terletak di posisi paling bawah halaman situs web.

---

### 5.18. Pengguna Panel Admin (Users)

- **Fungsi dan Lokasi Menu:** Mengelola otorisasi akun pengguna yang diberikan akses untuk masuk ke dalam panel admin. Terletak pada menu **Pengaturan Situs → Users**.
- **Mekanisme Publikasi:** Penyimpanan Langsung Aktif (Tanpa Draf).
- **Kolom Isian Formulir Pengguna:**
  - **Email** (\*): Alamat surel aktif yang digunakan untuk login.
  - **Nama** (\*): Nama lengkap pengguna panel admin.
  - **Password** (\*): Kata sandi keamanan (minimal terdiri dari 8 karakter).
- **SOP Operasional Menambahkan Akun Admin Baru:**
  1. Masuk ke menu **Users**, lalu klik tombol **Create New**.
  2. Lengkapi kolom **Email** dan **Nama** pengguna.
  3. Masukkan kata sandi pada kolom **Password** (minimal terdiri dari 8 karakter keamanan).
  4. Klik tombol **Save** untuk menyimpan dan mengaktifkan akun.

---

## 6. Struktur dan Parameter Blok Tata Letak (Blocks)

Bagian ini memaparkan parameter teknis dari modul Blok Modular (Blocks) yang digunakan untuk membangun isi Halaman, artikel Berita, dan detail Nilai & Filosofi.

### 6.1. Konfigurasi Hero Halaman

Setiap halaman memiliki tab Hero di bagian atas. Berikut adalah parameter pengaturannya:

| Nama Parameter | Status Wajib | Pilihan / Keterangan Pengisian |
|---|---|---|
| **Type** (Tipe Hero) | ✅ Wajib | - `None` (tanpa menampilkan hero)<br>- `High Impact` (tampilan layar penuh dengan gambar latar belakang)<br>- `Medium Impact` (tampilan ukuran besar dengan gambar latar belakang)<br>- `Low Impact` (tampilan minimalis berupa teks saja) |
| **Rich Text** | Opsional | Judul utama dan paragraf pendek hero (dapat menggunakan format heading H1 sampai H4). |
| **Links** (Tombol Aksi) | Opsional | Maksimal menyediakan 2 tombol navigasi. Setiap tombol memiliki parameter: label tombol, tujuan link (internal link atau custom URL), dan pilihan gaya tombol (default warna penuh atau outline). |
| **Media** (Gambar Latar) | Wajib (Khusus tipe High/Medium Impact) | Berkas gambar latar belakang (pilih dari repositori Media). |

---

### 6.2. Blok Tata Letak Halaman (Pages Layout Blocks)

Modul-modul berikut ditambahkan pada menu **Halaman → tab Konten → Tata Letak** dengan mengklik tombol **Add Layout**:

#### Call To Action (`cta`)
Berfungsi untuk memajang bagian ajakan interaktif berupa kombinasi teks informasi dan tombol aksi navigasi.
- **Rich Text** (Opsional): Teks ajakan (heading H1 sampai H4, cetak tebal, atau tautan teks).
- **Links** (Opsional): Menyediakan tombol navigasi (maksimal 2 tombol). Setiap tombol memiliki parameter: `type` (Internal link atau Custom URL), `label` (Teks tombol), `appearance` (default untuk warna penuh atau outline), dan `newTab` (centang agar tautan dibuka pada tab baru peramban).

#### Content (`content`)
Merupakan blok penyusunan konten teks berkolom yang fleksibel.
- **Columns** (Opsional): Array penampung kolom (admin dapat menambahkan kolom sesuai kebutuhan tata letak). Setiap kolom memiliki parameter:
  - `size` (Ukuran lebar kolom: `One Third` [sepertiga lebar], `Half` [setengah lebar], `Two Thirds` [dua pertiga lebar], atau `Full` [lebar penuh]).
  - `richText` (Isi konten teks kolom, mendukung format heading H2 sampai H4, cetak tebal, maupun tautan teks).
  - `enableLink` (Centang opsi ini untuk memunculkan tautan tombol navigasi di bawah teks kolom terkait).
  - `link` (Konfigurasi tombol navigasi, serupa dengan parameter tombol pada blok CTA).

#### Media Block (`mediaBlock`)
Berfungsi untuk menampilkan berkas gambar atau video dari repositori Media Library dengan ukuran lebar penuh pada halaman.
- **Media** (\*): Pilih berkas dari repositori Media. Caption yang terdaftar pada berkas Media secara otomatis akan ditampilkan tepat di bawah gambar di situs web.

#### Archive (`archive`)
Berfungsi untuk merender daftar artikel berita secara dinamis dan otomatis berdasarkan kategori atau pilihan manual.
- **Intro Content** (Opsional): Teks paragraf pembuka yang diletakkan tepat di atas daftar berita.
- **Populate By** (\*): Metode penarikan berita, yaitu `Collection` (otomatis berdasarkan kategori/terbaru) atau `Individual Selection` (admin memilih berita secara manual).
- **Collections To Show** (Wajib khusus mode Collection): Menentukan koleksi asal data. Saat ini hanya mendukung pilihan `Posts` (Berita).
- **Categories To Show** (Opsional khusus mode Collection): Filter pengelompokan berita. Kosongkan untuk menampilkan seluruh berita, atau isi kategori tertentu untuk membatasi penayangan berita yang sesuai.
- **Limit** (Wajib khusus mode Collection): Jumlah maksimal berita yang akan ditampilkan (secara standar bernilai 10).
- **Selection** (Wajib khusus mode Selection): Tentukan daftar berita pilihan admin satu per satu secara berurutan.

#### Form Block (`formBlock`)
Berfungsi untuk menyisipkan formulir pendaftaran atau kontak interaktif pada halaman web.
- **Form** (\*): Pilih salah satu formulir aktif yang telah dikonfigurasi pada menu **Forms**.
- **Enable Intro Content** (Opsional): Centang opsi ini jika ingin menampilkan paragraf teks pengantar tepat di atas formulir.
- **Intro Content** (Opsional): Teks paragraf pengantar formulir (aktif apabila opsi Enable Intro Content dicentang).

#### Highlight Aktivitas (`highlightActivities`)
Berfungsi untuk menyajikan sorotan kartu dokumentasi kegiatan terpilih (maksimal menampilkan 3 kartu kegiatan).
- **Judul Section** (\*): Teks judul tajuk bagian (contoh: "Kegiatan Resmi").
- **Aktivitas Pilihan** (\*): Pilih hingga maksimal 3 entri dari koleksi Aktivitas. Kartu visual akan merender Gambar Utama dan ringkasan teks dari kegiatan terkait.

#### Highlight Sponsor (`highlightSponsors`)
Berfungsi untuk menampilkan logo perusahaan mitra sponsor pendukung organisasi.
- **Judul Section** (\*): Teks judul tajuk bagian (contoh: "Didukung Oleh").
- **Sponsor Pilihan** (\*): Pilih entri dari koleksi Sponsor (tidak dibatasi jumlah logo yang dimuat).

#### Highlight Lowongan (`highlightJobVacancies`)
Berfungsi untuk menyajikan barisan kartu informasi lowongan pekerjaan terbaru (maksimal menampilkan 6 kartu lowongan).
- **Judul Section** (\*): Teks judul tajuk bagian (contoh: "Lowongan Kerja Terbaru").
- **Lowongan Pilihan** (\*): Pilih hingga maksimal 6 entri dari koleksi Lowongan Kerja. Hanya lowongan kerja berstatus Published yang akan tampil.

---

### 6.3. Blok Sisipan di Tengah Teks Berita (Rich Text Blocks)

Blok berikut dapat disisipkan secara langsung di sela-sela penulisan paragraf pada editor Rich Text Berita dengan mengetik tombol garis miring `/` atau mengklik ikon tambah **+**:

#### Banner (Kotak Informasi Khusus)
- **Style** (\*): Pilihan jenis kotak visual, meliputi `Info` (biru), `Warning` (kuning), `Error` (merah), atau `Success` (hijau).
- **Content** (\*): Teks catatan yang dimuat di dalam kotak.

#### Code (Modul Kode Program)
- **Language** (Opsional): Pilihan bahasa pemrograman (TypeScript, JavaScript, atau CSS).
- **Code** (\*): Baris kode pemrograman.

#### Media (Sisipan Gambar)
- **Media** (\*): Berkas gambar ilustrasi yang dipilih dari repositori Media Library.

---

### 6.4. Blok Khusus Nilai dan Filosofi (Philosophy Blocks)

Blok-blok modular berikut digunakan secara eksklusif untuk membangun struktur halaman detail filosofi pada menu **Nilai & Filosofi → Tata Letak Konten Halaman Detail**:

#### HeroHeader (Tajuk Utama Filosofi)
- **Eyebrow** (\*): Teks label kategori kecil di atas judul (contoh: "FILOSOFI").
- **Style Eyebrow** (Opsional): Pilihan warna teks label (Gold, Red Light, White, atau Muted).
- **Judul Utama** (\*): Teks judul utama berukuran besar pada halaman.
- **Teks Sorotan** (Opsional): Suku kata dari judul utama yang ingin diberikan aksen warna penekanan khusus (penulisan wajib sama persis dengan yang ada di Judul Utama).
- **Style Sorotan** (Opsional): Gaya penekanan warna suku kata (Gold, Gradient [Gold-Red-Gold], atau Red Underline).
- **Penulis / Oleh** (Opsional): Nama penulis atau pencipta materi filosofi.
- **Paragraf Pengantar** (\*): Teks paragraf pembuka halaman.
- **Style Pengantar** (Opsional): Format huruf paragraf pembuka (`Default`, `Italic & Serif`, atau `Large Serif`).

#### Split Content (`splitContent`)
- **Tipe Kolom Kiri** (\*): Pilihan tipe sisi kiri (`Judul Saja` atau `Daftar Info (Metadata/Konteks)`).
- **Kolom Kiri - Judul Saja** (Opsional): Parameter isian serupa dengan Hero Header.
- **Kolom Kiri - Daftar Info** (Opsional): Array data metadata yang memuat isian wajib: Eyebrow, Style Eyebrow, Judul, dan Keterangan (contoh: "Tahun Penciptaan: 1975").
- **Teks Utama (Kolom Kanan)** (\*): Isi narasi teks utama pada kolom kanan (mendukung Rich Text).

#### Dialogue (Modul Dialog / Yel-Yel)
- **Eyebrow Kiri / Style** (\*): Teks label kategori pada sisi kolom kiri.
- **Judul Kiri** (\*): Judul penjelas bagian dialog pada sisi kolom kiri.
- **Deskripsi Kiri** (\*): Teks deskripsi pengantar pada sisi kolom kiri (mendukung Rich Text).
- **Daftar Dialog** (\*): Kumpulan baris kutipan dialog. Setiap baris memuat: `Pembicara / Aksi` (nama pembicara), `Warna Pembicara`, `Isi Ucapan` (teks dialog), `Warna Ucapan`, dan `Keterangan Tambahan` (catatan kecil di bawah baris).

#### Pillars (Pilar-Pilar Nilai)
- **Eyebrow / Style** (\*): Teks label kategori kecil di atas judul bagian.
- **Judul Bagian** (\*): Judul tajuk utama untuk daftar pilar.
- **Style Tampilan** (Opsional): Gaya visualisasi daftar pilar (`3 Kolom Horizontal` atau `Baris List dengan Metadata Kiri`).
- **Daftar Pilar** (\*): Kumpulan butir pilar filosofi. Setiap item pilar memiliki parameter: `Nomor Pilar` (contoh: "01"), `Style Nomor`, `Label Pendukung` (contoh: "Brotherhood"), `Style Label`, `Judul Pilar`, `Deskripsi Pilar`, dan `Sub-poin` (daftar rincian tambahan di dalam pilar).

#### Closing (Modul Penutup)
- **Eyebrow / Style** (\*): Teks label kategori kecil di atas judul penutup.
- **Judul Penutup** (\*): Kalimat penutup halaman filosofi.
- **Style Judul** (Opsional): Pilihan warna judul (`Accent` untuk warna Gold, atau `Inverse` untuk warna White).
- **Teks Kutipan** (Opsional): Kutipan kalimat penutup (quote).
- **Style Kutipan** (Opsional): Gaya huruf teks kutipan (`Italic & Serif` atau `Default`).
- **Teks Deskripsi** (Opsional): Teks deskripsi penjelas penutup (mendukung Rich Text).
- **Link Navigasi Lain** (Opsional): Daftar tautan menuju halaman filosofi lainnya. Setiap tautan memuat: Label tombol, URL tujuan (contoh: `/seputar-kami/genggam-mesin`), dan warna hover.

---

## 7. Fungsi Tingkat Lanjut (Form Builder dan Pengalihan)

### 7.1. Mengonfigurasi Formulir Baru (Form Builder)
Menu **Pengaturan Situs → Forms** digunakan untuk mengelola template formulir interaktif di situs web.
1. Masuk ke menu **Forms**, lalu klik tombol **Create New**.
2. Masukkan judul formulir pada kolom **Title**.
3. Di dalam tab **Fields**, admin dapat menambahkan tipe input formulir baru (seperti Text, Textarea, Email, Checkbox, Select, atau File Upload) dengan mengklik tombol **Add Field**. Setiap field dapat dikonfigurasi status wajib diisinya.
4. Pada tab **Submit Button**, masukkan teks label tombol kirim (contoh: "Kirim Pesan").
5. Pada tab **Confirmation Settings**, tulis pesan sukses yang akan ditampilkan kepada pengisi formulir setelah menekan tombol kirim.
6. Klik tombol **Save** untuk menyimpan formulir.

### 7.2. Aturan Pengalihan Tautan (Redirects)
Menu **Pengaturan Situs → Redirects** digunakan untuk mengalihkan alamat URL lama (yang telah dihapus atau diubah) menuju alamat URL yang baru agar pengunjung tidak menemui error halaman tidak ditemukan (404).
1. Masuk ke menu **Redirects**, lalu klik tombol **Create New**.
2. Pada kolom **From**, masukkan alamat tautan lama (contoh: `/berita/reuni-2024-lama`).
3. Pada bagian **To**, pilih tipe tujuan: `Internal link` (pilih halaman/berita internal situs) atau `Custom URL` (ketik tautan eksternal baru lengkap secara manual).
4. Klik tombol **Save** untuk mengaktifkan aturan pengalihan.

---

## 8. Ketentuan Kritis Operasional dan Keamanan Data

Berikut adalah beberapa ketentuan krusial yang wajib diperhatikan dan dipatuhi oleh admin guna menghindari terjadinya kesalahan operasional pada situs web:

1. **Koleksi Tanpa Fitur Draf Langsung Aktif Saat Disimpan:** Sebagaimana dijelaskan pada rincian tabel [Bagian 3](#3-perilaku-publikasi-konten-status-terbit), beberapa koleksi seperti Aktivitas, Sponsor, dan Galeri tidak mendukung penyimpanan draf. Klik tombol **Save** pada koleksi tersebut akan langsung mempublikasikan data ke situs web publik. Oleh karena itu, hindari menyimpan konten yang pengisian datanya belum lengkap atau masih setengah jadi.
2. **Larangan Menghapus Media Aktif:** Sebelum menghapus berkas dari repositori Media Library, pastikan terlebih dahulu bahwa berkas gambar atau video tersebut tidak sedang digunakan oleh halaman berita, halaman statis, profil pengurus, maupun logo sponsor manapun di situs web. Tindakan menghapus media aktif akan berakibat pada munculnya ikon gambar rusak (broken image) bagi pengunjung situs web.
3. **Larangan Mengubah Judul Formulir Sistem:** Sistem otomasi untuk menyimpan pengajuan alumni sebagai draf secara internal sangat bergantung pada judul template formulir yang tepat. Admin dilarang keras mengubah nama template formulir **"Pengajuan Lowongan"** dan **"Pengajuan Usaha Alumni"** pada konfigurasi menu Forms. Perubahan nama pada kedua formulir tersebut akan memutuskan alur otomatisasi pengiriman data alumni ke dalam panel moderasi admin.
4. **Validasi Tautan Video Galeri:** Tautan berkas yang dimasukkan pada kolom URL video sematan Galeri wajib menggunakan format tautan resmi yang valid dari platform YouTube atau Vimeo. Sistem tidak dapat menerjemahkan serta merender format tautan video dari platform selain kedua situs web tersebut.
5. **Sabar Menanti Sinkronisasi Caching Halaman:** Pembaruan beberapa halaman indeks situs web menggunakan mekanisme penyimpanan sementara (caching) guna menjaga kecepatan muat halaman. Perubahan data yang baru disimpan oleh admin terkadang memerlukan waktu sinkronisasi hingga maksimal sekitar 10 menit sebelum terlihat secara nyata pada halaman depan situs web pengunjung.
6. **Status Tampilan Kartu Sorotan Lowongan Kerja:** Modul blok Highlight Lowongan Kerja dikonfigurasi sistem untuk hanya merender data lowongan yang berstatus telah dipublikasikan (Published). Apabila kartu lowongan kerja tertentu tidak muncul pada bagian sorotan halaman utama, harap periksa kembali status dokumen lowongan kerja bersangkutan dan pastikan statusnya telah diset ke Terbit.
7. **Larangan Mengubah Pengenal Halaman (Slug) yang Telah Terpublikasi:** Pengenal halaman (slug) yang menjadi bagian dari URL tautan dibuat secara otomatis oleh sistem berdasarkan judul konten. Hindari melakukan pengubahan nama slug pada dokumen yang telah lama diterbitkan secara luas karena tindakan tersebut akan mematikan tautan lama (broken link) yang telah tersebar di mesin pencari atau media sosial. Apabila pengubahan terpaksa dilakukan, admin wajib membuat entri pengalihan tautan pada menu **Redirects**.

---

**IAM ITB - For Union Machine Strong**
