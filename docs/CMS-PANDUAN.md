# 📘 Panduan CMS IAM ITB

> **Untuk siapa panduan ini?** Untuk pengurus/alumni IAM ITB yang akan mengelola website. Tidak perlu pengalaman teknis — semua dijelaskan langkah demi langkah.

> 💡 **Tenang, kamu tidak bisa "merusak" website.** Mengelola isi website ini seperti mengisi formulir atau menulis di Microsoft Word. Kamu tidak akan menyentuh kode atau bagian teknis apa pun. Kalau ragu, simpan sebagai **draf** dulu (belum tampil ke publik) — nanti bisa diperiksa sebelum benar-benar diterbitkan. Kalau ada yang salah, hampir semuanya bisa diperbaiki atau dikembalikan.

> 🧭 **Cara membaca panduan ini:** Tidak perlu dibaca dari awal sampai akhir. Cari bagian yang kamu butuhkan lewat **Daftar Isi** di bawah. Bab 1–4 sebaiknya dibaca sekali di awal; sisanya bisa dibuka saat diperlukan.

> 📗 **Butuh detail lebih dalam?** Ada dokumen pendamping **`CMS-REFERENSI-BLOK.md`** yang membahas setiap blok dan setiap kotak isian satu per satu, lengkap dengan contoh alur kerja. Panduan ini (yang sedang kamu baca) untuk penggunaan sehari-hari; dokumen referensi itu untuk saat kamu ingin tahu fungsi detail sebuah pilihan.

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

**CMS** adalah singkatan dari *Content Management System* — bahasa gampangnya: **"tempat mengatur isi website"**. Ini adalah panel khusus (semacam ruang belakang) tempat kamu bisa mengganti tulisan, foto, dan daftar-daftar di website **tanpa perlu tahu soal coding**. Semuanya lewat tampilan yang mirip mengisi formulir.

Di website IAM ITB, panel ini dibuat dengan alat bernama **Payload** — tapi kamu tidak perlu menghafal namanya.

### Istilah yang Akan Sering Kamu Temui

Jangan khawatir dengan istilah Inggris di bawah — ini cuma nama tombol/menu. Berikut arti gampangnya:

| Istilah | Arti gampangnya |
|---|---|
| **Collection** (Koleksi) | Sekumpulan data sejenis, seperti satu buku daftar. Contoh: buku daftar "Berita", buku daftar "Sponsor". Setiap entri = satu halaman isian. |
| **Global** | Data yang cuma ada **satu** dan dipakai di seluruh website. Contoh: menu atas (Header) dan bagian bawah (Footer). |
| **Field** | Satu kotak isian dalam formulir. Contoh: kotak "Judul", kotak "Deskripsi". |
| **Block** (Blok) | Potongan bagian halaman yang bisa kamu susun seperti **Lego** atau slide PowerPoint — pilih yang dibutuhkan, atur urutannya. |
| **Draft** (Draf) | Belum tampil ke publik. Masih "disimpan diam-diam" untuk kamu kerjakan/periksa. |
| **Published** (Terbit) | Sudah tampil di website dan bisa dilihat semua pengunjung. |
| **Publish** | Tombol untuk **menerbitkan** — mengubah draf jadi tampil di website. |
| **Save** | Tombol **simpan**. Menyimpan pekerjaanmu (kalau ada fitur draf, tersimpan sebagai draf dulu). |
| **Media** | "Gudang" tempat semua foto & video website disimpan. |
| **Dashboard** | Halaman depan yang muncul setelah kamu login. |
| **Upload** | Mengunggah / memasukkan file (foto/video) dari komputermu ke website. |

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
    ├─ Users
    ├─ Forms          (lanjutan — formulir)
    ├─ Form Submissions (lanjutan — kiriman formulir)
    └─ Redirects      (lanjutan — pengalihan tautan)
```

> Menu bertanda *(lanjutan)* jarang perlu disentuh untuk penggunaan sehari-hari. **Forms** adalah tempat formulir website dibuat/diatur, **Form Submissions** menyimpan setiap kiriman formulir, dan **Redirects** mengalihkan tautan lama ke halaman baru. Boleh diabaikan dulu.

> 📌 **Kartu "Moderasi Pengajuan" di halaman depan.** Begitu login, di bagian atas Dashboard ada kotak kuning bertuliskan **Moderasi Pengajuan**. Klik kotak itu kapan pun ada alumni yang mengirim usaha atau lowongan lewat website — di sana kamu bisa memeriksa lalu menyetujui atau menolaknya. (Penjelasan lengkap ada di [Bab 6](#61-lowongan-kerja) dan lihat juga kata "moderasi".)

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

**Media** adalah **gudang foto & video** website. Ini konsep paling penting untuk dipahami, jadi baca pelan-pelan:

> 🔑 **Aturan emasnya:** Kamu **tidak pernah** menempelkan foto langsung ke Berita atau Sponsor. Kamu selalu **memasukkan foto ke gudang Media dulu**, baru kemudian di halaman Berita/Sponsor kamu tinggal **memilih** foto itu dari gudang. Ibaratnya: simpan barang di gudang dulu, baru dipajang di etalase. Satu foto yang sudah di gudang bisa dipakai ulang di banyak tempat.

> **Letak menu:** Media & Berkas → Media

### Cara Memasukkan Foto ke Gudang (Upload):

1. Klik tombol **Create New** (artinya: "buat baru").
2. Tarik file foto/video dari komputer ke kotak yang tersedia (*drag & drop*), atau klik kotak itu untuk memilih file.
3. Isi **Nama Media** — beri nama yang jelas biar gampang dicari nanti. Contoh: `Reuni Akbar 2025 - Foto Panggung` (jauh lebih baik daripada nama file `IMG_2931.jpg`).
4. (Sangat disarankan) Isi **Alt** — yaitu deskripsi singkat isi foto, misalnya "Peserta reuni berfoto di Sabuga". Ini membantu foto ditemukan di Google dan dibaca oleh pembaca layar untuk tunanetra.
5. Klik **Save**. Selesai — foto sudah ada di gudang dan siap dipakai.

> 💡 **Tips merapikan:** Gudang Media punya fitur **folder**. Sebelum upload, kamu bisa buat/masuk folder seperti `berita`, `sponsor`, `galeri`, `organisasi`. Ini opsional, tapi sangat membantu saat foto sudah banyak.

### Format yang Didukung:

| Jenis | Format | Keterangan |
|---|---|---|
| Gambar | JPG, PNG, WebP, GIF, dll. | Website otomatis membuat beberapa ukuran — kamu tidak perlu mengecilkan foto sendiri |
| Video | Hanya MP4 & WebM | Untuk video panjang, **jangan upload file** — pakai tautan YouTube/Vimeo (lihat [Galeri](#75-galeri--kategori-galeri)) |

### Cara Memakai Foto yang Sudah di Gudang:

Nanti di halaman Berita, Sponsor, dsb., saat ketemu kotak gambar, akan ada dua tombol:
- **Choose from existing** ("pilih yang sudah ada") → cari foto dari gudang lalu klik. **Ini cara yang biasa dipakai.**
- **Upload** / **Create New** → memasukkan foto baru langsung di situ (tetap otomatis tersimpan ke gudang).

### Tips Penting:

- ✅ **Upload foto sebesar/setajam mungkin.** Website yang akan otomatis mengecilkan untuk tiap layar. Foto besar = tajam di mana-mana. Foto kecil = pecah di layar besar.
- ✅ **Beri nama & Alt yang jelas.** Kamu akan berterima kasih pada diri sendiri saat gudang sudah berisi ratusan foto.
- ⚠️ **Jangan hapus foto yang masih dipakai** di suatu halaman — nanti muncul gambar rusak di website.

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

> 📥 **Tentang "Moderasi" (penting untuk Lowongan & Usaha Alumni).** Alumni bisa mengirim lowongan atau usaha mereka sendiri lewat formulir di website. Kiriman itu **tidak langsung tampil** — ia masuk sebagai **draf** dan menunggu persetujuanmu. Cara memeriksanya:
> 1. Login ke admin, lalu klik kartu kuning **Moderasi Pengajuan** di Dashboard (atau buka alamat website diakhiri `/moderasi`).
> 2. Kamu akan melihat daftar kiriman yang menunggu. Periksa isinya.
> 3. Klik **Setujui** untuk menerbitkannya ke website, atau **Tolak** untuk membuangnya.
>
> Kamu juga bisa membuat lowongan/usaha sendiri secara manual lewat menu di bawah (langkahnya sama, tinggal isi lalu **Publish**).

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

Halaman yang menjelaskan nilai-nilai dan filosofi IAM ITB (misalnya Genggam Mesin, Solidarity Forever).

> ✅ **Halaman ini sekarang punya fitur draf.** Karena isinya panjang dan disusun dari banyak blok, kamu bisa mengerjakannya bertahap dengan aman: klik **Save** untuk menyimpan sebagai draf (belum tampil ke publik), dan baru klik **Publish** kalau sudah rapi. Sama seperti Berita dan Halaman.

#### Field yang Perlu Diisi:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Judul Utama** | ✅ Ya | |
| **Kategori Tampilan** | ✅ Ya | Card (1 kolom) / Banner (lebar penuh) |
| **Label Kartu** | ✅ Ya | Teks yang muncul di kartu tampilan beranda |
| **Segera Hadir** | ❌ Tidak | Centang jika konten belum siap |
| **Urutan Tampilan** | ❌ Tidak | Nomor urut |
| **Tata Letak Konten** | ✅ Ya | Halaman detail disusun dari blok khusus (lihat di [Bab 9](#9-memahami-blok-blocks)) |

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

Ini penting karena tidak semua menu berperilaku sama. Ada dua "tipe":

### Apa Bedanya Draf dan Terbit?

- **Draf** = Pekerjaanmu tersimpan, **tapi belum tampil ke publik.** Cocok untuk mengerjakan sesuatu bertahap atau menunggu diperiksa.
- **Terbit (Published)** = Sudah **tampil di website** dan bisa dilihat semua pengunjung.

### Tipe 1 — Menu yang PUNYA fitur draf

**Halaman, Berita, Lowongan Kerja, Usaha Alumni, dan Nilai & Filosofi.**

Di menu-menu ini, menyimpan tidak langsung menampilkan ke publik — kamu harus menerbitkannya sendiri:

1. Setelah mengisi, klik **Save** → tersimpan sebagai **draf** (aman, belum publik).
2. Kalau sudah yakin, klik tombol **Publish** (biasanya di pojok kanan atas) → barulah tampil di website.
3. (Opsional) Isi **Tanggal Diterbitkan** untuk mencatat/menjadwalkan kapan terbit.

> 💡 Kebiasaan yang baik: **selalu simpan sebagai draf dulu, periksa, baru Publish.**

#### Menjadwalkan Terbit (Schedule Publish)

Mau sesuatu terbit otomatis nanti (misalnya pengumuman untuk besok pagi)? Atur status ke terbit lalu set **Tanggal Diterbitkan** ke waktu yang diinginkan — sistem akan menerbitkannya sendiri pada waktu itu.

### Tipe 2 — Menu yang LANGSUNG tampil saat disimpan

**Aktivitas, Sponsor, Galeri, Kategori Galeri, Ketua IAM, Kepengurusan, Komunitas, Anggota Organisasi, dan data Media.**

Menu-menu ini **tidak punya draf** — begitu kamu klik **Save**, datanya **langsung tampil di website**. Jadi hati-hati: jangan menyimpan yang masih setengah jadi. Selesaikan dulu, baru Save.

> Menu **Header, Footer, dan Profil Organisasi** juga langsung tampil setelah disimpan.

> ⏱ **Sabar sebentar:** beberapa halaman butuh hingga ±10 menit untuk memperbarui tampilan. Kalau perubahanmu belum kelihatan, tunggu beberapa menit lalu muat ulang (refresh) halaman.

---

## 11. Tips & Trik

### ✅ Yang Harus Dilakukan:

- **Beri judul yang jelas** pada setiap konten agar mudah dicari di daftar.
- **Upload gambar sebesar/setajam mungkin** — sistem akan otomatis mengecilkan untuk tampilan website.
- **Gunakan kategori** untuk mengelompokkan berita.
- **Isi bagian SEO** (tab paling kanan saat mengedit Halaman/Berita) — ini yang menentukan judul & gambar yang muncul saat halaman dibagikan ke WhatsApp/Google. Ada tombol untuk mengisinya otomatis.
- **Simpan sebagai draf** dulu sebelum menerbitkan, untuk diperiksa.
- **Buka website-nya** setelah menerbitkan untuk memastikan hasilnya sesuai.

### ❌ Yang Harus Dihindari:

- **Jangan upload gambar terlalu kecil** — akan pecah/buram di layar besar.
- **Jangan hapus foto** yang sedang dipakai di suatu halaman — nanti muncul gambar rusak di website.
- **Jangan membuka satu konten yang sama di banyak tab** lalu mengeditnya bersamaan — bisa saling menimpa.
- **Jangan mengganti password** akun orang lain tanpa izin.
- **Jangan mengubah judul formulir "Pengajuan Lowongan" dan "Pengajuan Usaha Alumni"** — kedua nama itu dipakai sistem untuk mengenali kiriman alumni. Kalau namanya diganti, kiriman baru bisa berhenti masuk ke moderasi.

### 🔍 Cara Mencari Konten:

- Ketik di **kotak pencarian** di bagian atas daftar untuk mencari berdasarkan judul/nama.
- Gunakan tombol **Filter** untuk menyaring berdasarkan **status** (Draf / Terbit) atau **kategori**.

### ❓ Butuh Bantuan?

Jika ada masalah atau pertanyaan:
- Hubungi pengurus yang bertanggung jawab terhadap website.
- Laporkan bug atau masalah teknis ke tim development.

---

> **IAM ITB — For Union Machine Strong**
