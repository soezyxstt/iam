# 📘 Panduan CMS IAM ITB

> **Untuk siapa panduan ini?** Untuk pengurus/alumni IAM ITB yang akan mengelola website. Tidak perlu pengalaman teknis — semua dijelaskan langkah demi langkah.

---

## 📋 Daftar Isi

1. [Apa itu CMS?](#1-apa-itu-cms)
2. [Cara Mengakses Panel Admin](#2-cara-mengakses-panel-admin)
3. [Mengenal Tampilan Admin](#3-mengenal-tampilan-admin)
4. [Manajemen Media (Gambar & Video)](#4-manajemen-media-gambar--video)
5. [Konten & Halaman](#5-konten--halaman)
   - [Halaman (Pages)](#51-halaman-pages)
   - [Berita (Posts)](#52-berita-posts)
   - [Kategori (Categories)](#53-kategori-categories)
6. [Directory & Komunitas](#6-directory--komunitas)
   - [Lowongan Kerja](#61-lowongan-kerja)
   - [Usaha Alumni](#62-usaha-alumni)
   - [Komunitas](#63-komunitas)
   - [Basis Data Alumni](#64-basis-data-alumni)
7. [Organisasi & Kegiatan](#7-organisasi--kegiatan)
   - [Aktivitas](#71-aktivitas)
   - [Sponsor](#72-sponsor)
   - [Ketua IAM](#73-ketua-iam)
   - [Kepengurusan](#74-kepengurusan)
   - [Galeri & Kategori Galeri](#75-galeri--kategori-galeri)
   - [Anggota Organisasi](#76-anggota-organisasi)
   - [Nilai & Filosofi](#77-nilai--filosofi)
   - [Profil Organisasi](#78-profil-organisasi)
8. [Pengaturan Situs](#8-pengaturan-situs)
   - [Header (Navigasi Atas)](#81-header-navigasi-atas)
   - [Footer](#82-footer)
   - [Users (Pengguna)](#83-users-pengguna)
9. [Memahami Blok (Blocks)](#9-memahami-blok-blocks)
10. [Draft vs Publikasi](#10-draft-vs-publikasi)
11. [Tips & Trik](#11-tips--trik)

---

## 1. Apa itu CMS?

**CMS** (Content Management System / Sistem Manajemen Konten) adalah tools yang memungkinkan kamu mengelola isi website **tanpa perlu coding**. Semua dilakukan lewat tampilan yang mirip seperti mengisi formulir.

Di website IAM ITB, kita menggunakan **Payload CMS**.

### Istilah Penting yang Perlu Diketahui:

| Istilah | Arti |
|---|---|
| **Collection** | Kumpulan data dengan jenis yang sama. Contoh: Berita, Aktivitas, Sponsor. Ibaratnya seperti "folder" di database. |
| **Global** | Data yang hanya ada SATU dan muncul di seluruh website. Contoh: Header (navigasi), Footer. |
| **Field** | Kolom isian dalam sebuah formulir. Contoh: Judul, Deskripsi, Gambar. |
| **Block** | "Blok penyusun" halaman. Kamu bisa menyusun halaman seperti menyusun Lego — pilih blok yang kamu butuhkan, atur urutannya. |
| **Draft** | Status tulisan yang belum terbit / masih dalam pengerjaan. |
| **Published** | Status tulisan yang sudah tampil di website. |
| **Dashboard** | Halaman utama admin setelah login. |

---

## 2. Cara Mengakses Panel Admin

1. Buka browser (Chrome / Firefox / Edge).
2. Ketik alamat website IAM ITB, lalu tambahkan `/admin` di akhir URL.
   Contoh: `https://www.iamitb.or.id/admin`
3. Masukkan **email** dan **password** yang sudah diberikan oleh pengurus.
4. Klik tombol **Login**.

> **Lupa password?** Klik "Forgot Password" di halaman login. Ikuti petunjuk yang dikirim ke email kamu.

---

## 3. Mengenal Tampilan Admin

Setelah login, kamu akan melihat:

### 3.1. Navigasi Kiri (Sidebar)

Di sebelah kiri layar, ada menu navigasi yang dikelompokkan:

```
☰ Dashboard
│
├─ 📄 Konten & Halaman
│   ├─ Halaman
│   ├─ Berita
│   └─ Kategori
│
├─ 🖼 Media & Berkas
│   └─ Media
│
├─ 👥 Directory & Komunitas
│   ├─ Lowongan Kerja
│   ├─ Usaha Alumni
│   ├─ Komunitas
│   └─ Basis Data Alumni
│
├─ 🏛 Organisasi & Kegiatan
│   ├─ Aktivitas
│   ├─ Sponsor
│   ├─ Ketua IAM
│   ├─ Kepengurusan
│   ├─ Galeri
│   ├─ Kategori Galeri
│   ├─ Anggota Organisasi
│   ├─ Nilai & Filosofi
│   └─ Profil Organisasi
│
└─ ⚙ Pengaturan Situs
    ├─ Header
    ├─ Footer
    └─ Users
```

### 3.2. Cara Membaca Formulir

- **Label tebal** = nama field yang perlu diisi
- **Tanda bintang (\*)** = field WAJIB diisi
- **Tanda tanya (?)** = klik untuk melihat petunjuk
- **Tombol Save** = simpan (otomatis jadi Draft jika ada fitur draft)
- **Tombol Publish** = terbitkan

### 3.3. Status Dokumen

Perhatikan badge warna di samping judul dokumen:

- 🔵 **Draft** = Belum terbit
- 🟢 **Published** = Sudah tampil di website
- 🟡 **Changes** = Ada perubahan yang belum dipublikasikan ulang

---

## 4. Manajemen Media (Gambar & Video)

**Media** adalah tempat menyimpan semua file gambar dan video yang akan digunakan di website.

> **Letak menu:** Media & Berkas → Media

### Cara Upload:

1. Klik **Create New** (buat baru).
2. Drag & drop file ke area yang disediakan, atau klik untuk memilih file dari komputer.
3. Isi **Nama Media** (untuk memudahkan pencarian).
4. Klik **Save**.

### Format yang Didukung:

| Jenis | Format | Keterangan |
|---|---|---|
| Gambar | JPG, PNG, WebP, GIF | Otomatis dibuatkan beberapa ukuran (thumbnail, medium, large, dll.) |
| Video | MP4, WebM | Maksimal ukuran menyesuaikan server |

### Cara Menggunakan Media:

Setelah diupload, kamu bisa memilih media tersebut dari berbagai tempat di CMS — misalnya untuk gambar utama berita, logo sponsor, foto profil, dll. Cukup klik tombol **"Choose Media"** atau **"Upload"** dan pilih dari library.

### Tips:

- Upload gambar dengan resolusi tinggi. CMS akan otomatis membuat versi yang lebih kecil.
- Gunakan format WebP untuk performa terbaik.
- Beri nama yang jelas agar mudah dicari nanti.

---

## 5. Konten & Halaman

### 5.1. Halaman (Pages)

> **Letak menu:** Konten & Halaman → Halaman

**Halaman** adalah halaman statis website seperti Beranda, Tentang Kami, dll.

#### Cara Membuat Halaman Baru:

1. Klik tombol **Create New** (buat baru).
2. Isi **Judul Halaman** (contoh: "Tentang Kami").
3. Atur **Hero** (bagian header halaman):
   - Pilih tipe: None (tanpa header) / High Impact (header besar dengan gambar) / Medium Impact / Low Impact (header minimalis).
   - Jika memilih High/Medium Impact, upload **gambar latar** yang menarik.
   - Tulis teks yang ingin ditampilkan di **Rich Text** hero.
   - Tambahkan **tautan** (link) jika perlu (maksimal 2).
4. Atur **Konten Halaman** di tab **Konten**:
   - Di sinilah kamu menyusun blok-blok (Lego) untuk membangun halaman.
   - Lihat [Bab 9: Memahami Blok (Blocks)](#9-memahami-blok-blocks) untuk penjelasan detail.
5. Atur **SEO** di tab **SEO**:
   - **Meta Title**: Judul yang muncul di hasil pencarian Google (max 60 karakter).
   - **Meta Description**: Deskripsi singkat yang muncul di Google (max 160 karakter).
   - **Meta Image**: Gambar yang muncul saat dibagikan ke media sosial.
6. Klik **Save** untuk draft, atau **Publish** untuk terbitkan.

#### Blok yang Tersedia untuk Halaman:

| Blok | Fungsi |
|---|---|
| **Call To Action** | Bagian ajakan / promosi dengan teks dan tombol |
| **Content** | Kolom konten (bisa 1/3, 1/2, 2/3, atau 1 halaman penuh) |
| **Media** | Menampilkan gambar/video dari Media Library |
| **Archive** | Menampilkan daftar berita (dengan filter kategori) |
| **Form** | Menyisipkan formulir (misal: form kontak) |
| **Highlight Aktivitas** | Menampilkan sorotan kegiatan |
| **Highlight Sponsor** | Menampilkan sponsor-sponsor |
| **Highlight Lowongan** | Menampilkan lowongan kerja terbaru |

> Penjelasan detail masing-masing blok ada di [Bab 9](#9-memahami-blok-blocks).

#### Cara Mengedit Halaman:

1. Klik judul halaman yang ingin diedit di daftar.
2. Ubah field yang diperlukan.
3. Klik **Save** atau **Publish**.

#### Cara Menghapus Halaman:

1. Buka halaman yang ingin dihapus.
2. Klik tombol **...** (More) di pojok kanan atas.
3. Pilih **Delete**.
4. Konfirmasi penghapusan.

---

### 5.2. Berita (Posts)

> **Letak menu:** Konten & Halaman → Berita

**Berita** digunakan untuk menulis artikel berita, pengumuman, atau artikel blog.

#### Cara Membuat Berita Baru:

1. Klik **Create New**.
2. Isi **Judul** berita.
3. **Gambar Utama**: Pilih gambar dari Media Library.
4. **Konten Berita**: Ini adalah rich text editor (seperti Microsoft Word). Kamu bisa:
   - Mengetik teks, mengatur bold/italic/underline.
   - Menambahkan heading (H2, H3, H4).
   - Menyisipkan **Banner** (info/warning/error/success) untuk kotak perhatian.
   - Menyisipkan **Code** untuk menampilkan potongan kode.
   - Menyisipkan **Media** untuk menaruh gambar di tengah artikel.
5. **Berita Terkait**: Pilih berita lain yang terkait (opsional).
6. **Kategori**: Pilih kategori berita (akan tampil di filter).
7. **Penulis**: Pilih nama penulis.
8. Atur **SEO** (sama seperti Halaman).
9. Simpan atau Publikasikan.

---

### 5.3. Kategori (Categories)

> **Letak menu:** Konten & Halaman → Kategori

**Kategori** digunakan untuk mengelompokkan berita. Contoh kategori: "Beasiswa", "Event", "Pengumuman".

#### Cara Membuat Kategori:

1. Klik **Create New**.
2. Isi **Judul** kategori (contoh: "Beasiswa").
3. Klik **Save**.

> Setelah kategori dibuat, kategori bisa dipilih saat membuat/mengedit berita.

---

## 6. Directory & Komunitas

### 6.1. Lowongan Kerja

> **Letak menu:** Directory & Komunitas → Lowongan Kerja

Mengelola informasi lowongan pekerjaan dari alumni atau mitra.

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Posisi** | ✅ Ya | Nama jabatan yang dibuka |
| **Nama Perusahaan** | ✅ Ya | Nama perusahaan pembuka lowongan |
| **Logo Perusahaan** | ❌ Tidak | Upload logo perusahaan |
| **Gambar Sampul** | ❌ Tidak | Gambar besar di halaman detail lowongan |
| **Lokasi** | ❌ Tidak | Kota / daerah penempatan |
| **Kategori/Bidang** | ❌ Tidak | Contoh: Teknologi, Keuangan |
| **Work Setup** | ❌ Tidak | On-site / Hybrid / Remote |
| **Tipe Pekerjaan** | ✅ Ya | KP / Magang / Full Time / Part Time / Kontrak |
| **Status** | ✅ Ya | Buka / Tutup |
| **Tingkat Pengalaman** | ❌ Tidak | Entry / Mid / Senior / Executive |
| **Rentang Gaji** | ❌ Tidak | Opsional |
| **Deskripsi Pekerjaan** | ✅ Ya | Penjelasan detail pekerjaan |
| **Persyaratan** | ❌ Tidak | Daftar kualifikasi |
| **Manfaat & Keuntungan** | ❌ Tidak | Benefit yang ditawarkan |
| **Nomor WA Kontak** | ❌ Tidak | Untuk menghubungi |
| **Tautan Resmi** | ❌ Tidak | Link untuk mendaftar |
| **Kuota** | ❌ Tidak | Jumlah yang dibutuhkan |

> **Screening Questions**: Kamu bisa menambahkan pertanyaan screening yang akan muncul saat pendaftaran (opsional).

---

### 6.2. Usaha Alumni

> **Letak menu:** Directory & Komunitas → Usaha Alumni

Mendata usaha/usaha milik alumni IAM ITB.

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Pemilik Usaha** | ✅ Ya | Nama pemilik |
| **Nama Usaha** | ✅ Ya | Nama bisnis/usaha |
| **Gambar Sampul** | ❌ Tidak | Foto tampilan usaha |
| **Kategori** | ✅ Ya | Manufaktur / Jasa / F&B / Teknologi / Lainnya |
| **Narasi/Deskripsi** | ✅ Ya | Cerita tentang usaha |
| **Produk/Jasa** | ✅ Ya | Apa yang dijual/ditawarkan |
| **Alamat** | ✅ Ya | Alamat fisik/lokasi |
| **Nomor Telepon** | ✅ Ya | Kontak |
| **Email** | ❌ Tidak | Alamat email |
| **Website** | ❌ Tidak | Website usaha |
| **Instagram** | ❌ Tidak | Akun Instagram |
| **Tahun Berdiri** | ❌ Tidak | Tahun mulai usaha |
| **Galeri Foto** | ❌ Tidak | Foto tambahan (max 12) |

---

### 6.3. Komunitas

> **Letak menu:** Directory & Komunitas → Komunitas

Mengelola informasi komunitas-komunitas di bawah IAM ITB (misal: komunitas olahraga, hobi, dll.).

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Nama Komunitas** | ✅ Ya | Nama komunitas |
| **Logo** | ✅ Ya | Logo komunitas |
| **Gambar Background Hero** | ❌ Tidak | Gambar latar halaman komunitas |
| **Deskripsi Singkat** | ✅ Ya | Penjelasan tentang komunitas |
| **Visi dan Misi** | ❌ Tidak | Rich text, visi misi komunitas |
| **Kontak Pengelola** | ❌ Tidak | Nama/WA pengelola |
| **Informasi Cara Bergabung** | ❌ Tidak | Cara join komunitas |
| **Berita Terkait** | ❌ Tidak | Berita yang relevan dengan komunitas |

---

### 6.4. Basis Data Alumni

> **Letak menu:** Directory & Komunitas → Basis Data Alumni

Database alumni IAM ITB. Data yang ditandai "Tampil di direktori publik" akan muncul di halaman direktori alumni website.

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Nama lengkap** | ✅ Ya | |
| **Angkatan (tahun)** | ❌ Tidak | Tahun lulus |
| **Judul ringkas / profesi** | ❌ Tidak | Contoh: "Software Engineer" |
| **Instansi / perusahaan** | ❌ Tidak | Tempat kerja |
| **Jabatan** | ❌ Tidak | Posisi di kantor |
| **Email** | ❌ Tidak | Hanya terlihat oleh admin |
| **Telepon** | ❌ Tidak | Hanya terlihat oleh admin |
| **LinkedIn URL** | ❌ Tidak | |
| **Bio singkat** | ❌ Tidak | |
| **Tampil di direktori publik** | ❌ Tidak | Centang jika boleh ditampilkan di website |

---

## 7. Organisasi & Kegiatan

### 7.1. Aktivitas

> **Letak menu:** Organisasi & Kegiatan → Aktivitas

Mencatat kegiatan/acara yang dilakukan oleh IAM ITB.

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Nama Kegiatan** | ✅ Ya | Judul kegiatan |
| **Ringkasan** | ❌ Tidak | Teks pendek (cuplikan) |
| **Gambar Utama** | ❌ Tidak | Foto kegiatan |
| **Tipe Kegiatan** | ❌ Tidak | Pulang Kampus / Beasiswa / Reuni Akbar / Kongres / Agenda Rutin / Lainnya |
| **Tanggal** | ✅ Ya | Tanggal pelaksanaan |
| **Deskripsi** | ✅ Ya | Penjelasan detail kegiatan (rich text) |

---

### 7.2. Sponsor

> **Letak menu:** Organisasi & Kegiatan → Sponsor

Mengelola perusahaan/organisasi yang menjadi sponsor IAM ITB.

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Nama Perusahaan** | ✅ Ya | |
| **Kategori** | ✅ Ya | Platinum / Gold / Silver / Bronze / Media Partner / Lainnya |
| **Logo** | ✅ Ya | Upload logo perusahaan |
| **Deskripsi Singkat** | ✅ Ya | |
| **Periode dukungan** | ❌ Tidak | Contoh: "2024-2025" |
| **Website Resmi** | ❌ Tidak | Link website sponsor |

---

### 7.3. Ketua IAM

> **Letak menu:** Organisasi & Kegiatan → Ketua IAM

Mendata ketua-ketua IAM ITB dari masa ke masa.

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Nama** | ✅ Ya | |
| **Foto Profil** | ❌ Tidak | |
| **Angkatan/Jurusan** | ❌ Tidak | Contoh: "Teknik Mesin 2008" |
| **Periode** | ✅ Ya | Contoh: "2024-2026" |
| **Biografi Singkat** | ✅ Ya | |
| **Riwayat Karier** | ❌ Tidak | Riwayat pekerjaan (rich text) |
| **Cerita Personal** | ❌ Tidak | |
| **LinkedIn URL** | ❌ Tidak | Link profil LinkedIn |

---

### 7.4. Kepengurusan

> **Letak menu:** Organisasi & Kegiatan → Kepengurusan

Mengupload bagan struktur organisasi pengurus IAM ITB per periode.

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Periode** | ✅ Ya | Contoh: "2024-2026" |
| **Organogram** | ✅ Ya | Upload gambar bagan struktur organisasi |

---

### 7.5. Galeri & Kategori Galeri

> **Letak menu:** Organisasi & Kegiatan → Galeri

Mengelola foto dan video dokumentasi kegiatan.

#### Sebelum membuat galeri, buat dulu Kategori Galeri-nya:

1. Klik **Kategori Galeri** → **Create New**.
2. Isi **Judul Album/Kategori** (contoh: "Reuni Akbar 2024").
3. Isi **Sub-judul** (opsional, contoh: "Dokumentasi acara Reuni Akbar di Sabuga").
4. Klik **Save**.

#### Setelah kategori ada, buat Galeri:

1. Klik **Galeri** → **Create New**.
2. Pilih **Kategori/Album**.
3. Upload **Gambar atau file video**, ATAU isi **URL video sematan** (YouTube/Vimeo).
4. Isi **Deskripsi** (opsional).
5. Klik **Save**.

> Kamu bisa membuat banyak entry galeri dalam satu album. Ulangi langkah di atas dengan kategori yang sama.

---

### 7.6. Anggota Organisasi

> **Letak menu:** Organisasi & Kegiatan → Anggota Organisasi

Mendata anggota struktural organisasi IAM ITB.

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Nama Lengkap** | ✅ Ya | |
| **Jabatan** | ❌ Tidak | Contoh: "Ketua Umum" |
| **Foto** | ❌ Tidak | |
| **Tipe Anggota** | ✅ Ya | Pengurus Inti / Ketua Bidang / Dewan Penasihat / Dewan Pakar |
| **Tingkat Tree** | ❌ Tidak | Untuk mengatur urutan (1 = Ketum, 2 = SekJen/Bendahara, 3 = Wakil KU, 4 = Ketua Bidang) |
| **Urutan** | ❌ Tidak | Urutan tampil dalam level yang sama |
| **LinkedIn URL** | ❌ Tidak | |

---

### 7.7. Nilai & Filosofi

> **Letak menu:** Organisasi & Kegiatan → Nilai & Filosofi

Halaman yang menjelaskan nilai-nilai dan filosofi IAM ITB.

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Judul Utama** | ✅ Ya | |
| **Kategori Tampilan** | ✅ Ya | Card (1 kolom) / Banner (lebar penuh) |
| **Label Kartu** | ✅ Ya | Teks yang muncul di kartu tampilan beranda |
| **Segera Hadir** | ❌ Tidak | Centang jika konten belum siap |
| **Urutan Tampilan** | ❌ Tidak | Nomor urut |
| **Tata Letak Konten** | ✅ Ya | Halaman detail menggunakan blok khusus (lihat di [Bab 9](#9-memahami-blok-blocks)) |

---

### 7.8. Profil Organisasi

> **Letak menu:** Organisasi & Kegiatan → Profil Organisasi

Hanya ada SATU data. Berisi informasi profil organisasi secara keseluruhan. Semua perubahan langsung tampil di halaman Tentang Kami, Beranda, dan halaman profil lainnya.

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Tagline** | ❌ | Contoh: "For Union Machine Strong" |
| **Ringkasan Tentang Kami** | ❌ | Teks singkat untuk beranda |
| **Visi** | ❌ | Rich text |
| **Misi** | ❌ | Rich text |
| **Ketua Saat Ini** | ❌ | Pilih dari data Ketua IAM |
| **Kata Pengantar Ketua** | ❌ | Sambutan ketua |
| **Ringkasan Latar Belakang** | ❌ | Teks singkat sejarah |
| **Sejarah Lengkap** | ❌ | Rich text, sejarah lengkap IAM ITB |
| **Hubungan dengan HMM ITB** | ❌ | Rich text |
| **Nilai & Filosofi** | ❌ | Genggam Mesin, Lagu Jerusalem, Yellboys, Solidarity Forever, September M |
| **Email Kontak** | ❌ | |
| **WhatsApp Kontak** | ❌ | |
| **Instagram Kontak** | ❌ | |

---

## 8. Pengaturan Situs

### 8.1. Header (Navigasi Atas)

> **Letak menu:** Pengaturan Situs → Header

Hanya ada SATU data. Mengatur menu navigasi yang muncul di bagian atas website.

#### Cara Menambahkan Menu:

1. Buka **Header**.
2. Di bagian **Nav Items**, klik **Add Nav Item**.
3. Isi:
   - **Label**: Teks yang akan muncul (contoh: "Beranda", "Tentang Kami").
   - **Tipe**: Pilih "Internal link" (ke halaman/berita di website) atau "Custom URL" (ke website lain).
   - Jika internal: pilih halaman/berita tujuan.
   - Jika custom: ketik URL lengkap (contoh: `https://www.google.com`).
   - **Open in new tab**: Centang jika ingin link terbuka di tab baru.
4. Untuk membuat **sub-menu (dropdown)**:
   - Centang **"Punya Sub-Menu?"**.
   - Klik **Add Dropdown Items**.
   - Tambahkan item-item sub-menu dengan cara yang sama.
5. Urutkan dengan drag & drop (seret dan lepas).
6. Klik **Save**.

> ⚠ **Maksimal 8 menu utama.** Perubahan akan langsung tampil di website setelah disimpan.

---

### 8.2. Footer

> **Letak menu:** Pengaturan Situs → Footer

Hanya ada SATU data. Mengatur bagian paling bawah website.

#### Yang Bisa Diatur:

| Field | Keterangan |
|---|---|
| **Logo** | Upload logo untuk footer |
| **Logo Text** | Teks pengganti logo. Default: "IAM\nITB" |
| **Social Links** | Tautan media sosial (Instagram, WhatsApp, Facebook, LinkedIn, YouTube, X/Twitter) |
| **Copyright Text** | Teks hak cipta di bagian paling bawah |

> Perubahan akan langsung tampil di website setelah disimpan.

---

### 8.3. Users (Pengguna)

> **Letak menu:** Pengaturan Situs → Users

Mengelola siapa saja yang bisa login ke panel admin.

#### Cara Menambahkan Admin Baru:

1. Klik **Create New**.
2. Isi **Email** dan **Nama**.
3. Buat **Password** (minimal 8 karakter).
4. Klik **Save**.

> **PENTING:** Berikan akses hanya kepada orang yang memang perlu mengelola website. Jangan bagikan password ke sembarang orang.

---

## 9. Memahami Blok (Blocks)

**Blok** adalah komponen penyusun halaman. Setiap blok memiliki fungsi berbeda dan bisa ditata urutannya sesuai kebutuhan.

> Ibaratnya seperti menyusun slide PowerPoint — setiap slide adalah blok yang bisa diisi konten berbeda.

### 9.1. Blok untuk Halaman (Pages)

Blok-blok ini digunakan di **Halaman → Konten → Tata Letak**:

---

#### 📌 Call To Action

**Fungsi:** Membuat bagian promosi/ajakan dengan teks menarik dan tombol.

**Cara pakai:**
- Tulis teks persuasif di Rich Text.
- Tambahkan 1-2 tombol dengan label dan tautan.
- Atur tampilan tombol: Default (solid) atau Outline (garis saja).

**Contoh penggunaan:** "Daftar Menjadi Anggota IAM ITB" dengan tombol "Daftar Sekarang".

---

#### 📌 Content

**Fungsi:** Membuat kolom teks/konten yang fleksibel.

**Cara pakai:**
- Tentukan ukuran kolom: One Third (1/3) / Half (1/2) / Two Thirds (2/3) / Full (1 halaman penuh).
- Tulis konten di Rich Text (bisa heading, teks, link).
- Opsional: Aktifkan link yang bisa diklik di kolom tersebut.

**Tips:** Untuk halaman dengan teks panjang, gunakan ukuran **Full** atau **Two Thirds**.

---

#### 📌 Media

**Fungsi:** Menampilkan gambar atau video.

**Cara pakai:**
- Pilih media yang sudah diupload di Media Library.

---

#### 📌 Archive

**Fungsi:** Menampilkan daftar berita secara otomatis.

**Cara pakai:**
- Tentukan sumber data: **Collection** (semua berita) atau **Individual Selection** (pilih berita tertentu).
- Jika pilih Collection:
  - Pilih **kategori** untuk filter (opsional).
  - Tentukan **limit** (berapa berita yang ditampilkan, default 10).
- Jika pilih Individual Selection:
  - Pilih berita-berita yang ingin ditampilkan.

**Contoh penggunaan:** Halaman "Beranda" yang menampilkan 3 berita terbaru.

---

#### 📌 Form

**Fungsi:** Menyisipkan formulir (formulir dikelola otomatis oleh plugin Form Builder).

**Cara pakai:**
- Pilih form yang sudah dibuat (bisa form kontak, form pendaftaran, dll.).
- Opsional: Aktifkan intro teks di atas form.

---

#### 📌 Highlight Aktivitas

**Fungsi:** Menampilkan sorotan kegiatan (max 3).

**Cara pakai:**
- Isi **Section Title** (judul bagian).
- Pilih 1-3 kegiatan dari data Aktivitas yang sudah ada.

---

#### 📌 Highlight Sponsor

**Fungsi:** Menampilkan daftar sponsor.

**Cara pakai:**
- Isi **Section Title**.
- Pilih sponsor-sponsor yang ingin ditampilkan.

---

#### 📌 Highlight Lowongan

**Fungsi:** Menampilkan lowongan kerja terbaru (max 6).

**Cara pakai:**
- Isi **Section Title**.
- Pilih lowongan kerja yang ingin ditampilkan.

---

### 9.2. Blok untuk Berita (Inline Blocks)

Blok ini disisipkan **di dalam teks berita** (di Rich Text editor):

#### Banner

**Fungsi:** Membuat kotak perhatian di dalam artikel.

**Style yang tersedia:**
- **Info** (biru) — untuk informasi tambahan
- **Warning** (kuning) — untuk peringatan
- **Error** (merah) — untuk kesalahan/penting
- **Success** (hijau) — untuk keberhasilan

**Cara pakai:** Saat mengetik berita, klik **+** atau **Insert Block**, pilih **Banner**, isi kontennya.

#### Code

**Fungsi:** Menampilkan potongan kode programming.

**Cara pakai:** Pilih bahasa (TypeScript, JavaScript, CSS), lalu ketik/tempel kode.

#### Media

**Fungsi:** Menyisipkan gambar di tengah-tengah teks artikel.

**Cara pakai:** Pilih media dari Media Library.

---

### 9.3. Blok untuk Nilai & Filosofi

Blok-blok ini digunakan di **Nilai & Filosofi → Tata Letak Konten Halaman Detail**:

#### HeroHeader

Membuat header halaman yang dramatis. Field: Eyebrow, Judul, highlight teks, intro.

#### SplitContent

Layout dua kolom: kiri (judul/info list) dan kanan (teks body).

#### Dialogue

Menampilkan percakapan/kutipan dengan speaker yang berbeda.

#### Pillars

Menampilkan pilar-pilar dalam format grid atau list.

#### Closing

Penutup halaman dengan quote dan tombol.

---

## 10. Draft vs Publikasi

### Apa Bedanya?

- **Draft** = Belum tampil di website. Halaman admin bisa melihatnya.
- **Published** = Sudah tampil di website. Semua pengunjung bisa melihatnya.

### Cara Publikasi:

Beberapa koleksi (Halaman, Berita, Lowongan) memiliki fitur draft. Caranya:

1. Setelah mengisi data, klik tombol **Save** (simpan sebagai draft).
2. Untuk menerbitkan, ubah status dari **Draft** menjadi **Published** di tombol **Publish** (biasanya di pojok kanan atas).
3. Atur **Published At** untuk menentukan tanggal publikasi.
4. Klik **Save** atau **Publish**.

### Schedule Publish:

Kamu bisa menjadwalkan publikasi di masa depan:
1. Atur status ke **Published**.
2. Atur **Published At** ke tanggal yang diinginkan.
3. Sistem akan otomatis menerbitkan pada tanggal tersebut.

### Untuk Koleksi Tanpa Fitur Draft:

Beberapa koleksi (seperti Aktivitas, Sponsor, Galeri) langsung tampil saat disimpan. Tidak ada konsep draft untuk koleksi ini. Data akan langsung muncul di website setelah disimpan.

---

## 11. Tips & Trik

### ✅ Yang Harus Dilakukan:

- **Beri judul yang jelas** pada setiap konten agar mudah dicari di daftar.
- **Upload gambar resolusi tinggi** — sistem akan otomatis mengecilkan untuk tampilan website.
- **Gunakan kategori** untuk mengelompokkan berita.
- **Isi SEO** setiap halaman dan berita agar mudah ditemukan di Google.
- **Simpan draft** dulu sebelum publish, untuk review.
- **Cek tampilan website** setelah publish untuk memastikan hasilnya sesuai.

### ❌ Yang Harus Dihindari:

- **Jangan upload gambar terlalu kecil** — akan pecah di layar besar.
- **Jangan hapus media** yang sedang digunakan di halaman/berita — akan muncul iklan broken image.
- **Jangan buka banyak tab** edit pada dokumen yang sama — bisa menyebabkan konflik data.
- **Jangan ganti password** pengguna lain tanpa izin.

### 🔍 Cara Mencari Konten:

- Gunakan **Search Bar** di bagian atas daftar untuk mencari berdasarkan judul.
- Filter berdasarkan **Status** (Draft / Published).
- Filter berdasarkan **Kategori** (untuk berita).

### ❓ Butuh Bantuan?

Jika ada masalah atau pertanyaan:
- Hubungi pengurus yang bertanggung jawab terhadap website.
- Laporkan bug atau masalah teknis ke tim development.

---

> **IAM ITB — For Union Machine Strong**
