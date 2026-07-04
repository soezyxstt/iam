# 📗 Referensi Lengkap Blok & Alur Kerja CMS IAM ITB

> Dokumen ini adalah **referensi teknis lengkap** — pendamping dari [CMS-PANDUAN.md](./CMS-PANDUAN.md) yang lebih umum. Di sini setiap blok dijelaskan **parameter per parameter**, lengkap dengan hubungan antar data dan alur kerja langkah demi langkah (misalnya cara menambahkan foto ke Berita atau Galeri).

---

## Daftar Isi

1. [Alur Kerja Media (WAJIB dibaca dulu)](#1-alur-kerja-media)
2. [Peta Hubungan Antar Data](#2-peta-hubungan-antar-data)
3. [Status Terbit per Koleksi (Draft vs Langsung Tampil)](#3-status-terbit-per-koleksi)
4. [Hero Halaman](#4-hero-halaman)
5. [Blok Penyusun Halaman (Pages)](#5-blok-penyusun-halaman)
6. [Blok Sisipan di Berita (Rich Text)](#6-blok-sisipan-di-berita)
7. [Blok Nilai & Filosofi](#7-blok-nilai--filosofi)
8. [Resep: Alur Kerja Umum Langkah demi Langkah](#8-resep-alur-kerja-umum)
9. [Hal yang Perlu Diwaspadai](#9-hal-yang-perlu-diwaspadai)

---

## 1. Alur Kerja Media

**Prinsip utama: semua gambar/video di website berasal dari koleksi Media.** Kamu tidak pernah meng-upload gambar langsung ke Berita, Sponsor, atau Galeri — kamu meng-upload ke **Media** dulu (atau lewat tombol upload yang otomatis menyimpannya ke Media), lalu field gambar di koleksi lain hanya **menunjuk** ke entri Media tersebut.

```
[File di komputer]
      │  upload
      ▼
[Media & Berkas → Media]  ← disimpan di sini, dalam folder
      │  dipilih / ditunjuk
      ▼
[Field gambar di Berita / Sponsor / Galeri / dll.]
```

### 1.1. Cara upload media

1. Buka **Media & Berkas → Media**.
2. (Disarankan) Masuk/bikin **folder** dulu sesuai jenis konten — fitur folder aktif di koleksi Media. Konvensi yang disarankan:

   | Folder | Isi |
   |---|---|
   | `berita` | Gambar utama & gambar isi artikel |
   | `galeri` | Foto dokumentasi kegiatan |
   | `sponsor` | Logo sponsor |
   | `lowongan` | Logo perusahaan & sampul lowongan |
   | `organisasi` | Foto pengurus, organogram, foto ketua |
   | `usaha-alumni` | Foto usaha alumni |
   | `umum` | Logo situs, hero beranda, dll. |

3. Klik **Create New**, tarik file ke area upload.
4. Isi field berikut:

   | Parameter | Wajib? | Fungsi |
   |---|---|---|
   | **Nama Media** (`name`) | Tidak, tapi **sangat disarankan** | Judul entri di daftar Media. Tanpa ini, entri sulit dicari. Contoh: `Reuni Akbar 2025 - Foto Panggung` |
   | **Alt** (`alt`) | Tidak, tapi **sangat disarankan** | Teks alternatif untuk aksesibilitas & SEO. Deskripsikan isi gambar. Contoh: `Peserta reuni berfoto bersama di Sabuga` |
   | **Caption** (`caption`) | Tidak | Keterangan yang bisa tampil di bawah gambar (rich text) |
   | **Focal point** | Otomatis | Titik fokus gambar saat dipotong ke berbagai ukuran — geser titiknya ke wajah/objek penting |

5. Klik **Save**.

### 1.2. Yang terjadi otomatis setelah upload

Sistem otomatis membuat beberapa ukuran dari satu gambar (kamu tidak perlu melakukan apa pun):

| Nama ukuran | Dimensi | Dipakai untuk |
|---|---|---|
| `thumbnail` | lebar 300px | Thumbnail di panel admin |
| `square` | 500×500 | Kartu persegi |
| `small` | lebar 600px | Layar kecil |
| `medium` | lebar 900px | Konten artikel |
| `large` | lebar 1400px | Hero / gambar besar |
| `xlarge` | lebar 1920px | Layar lebar |
| `og` | 1200×630 (crop tengah) | Preview saat dibagikan ke WhatsApp/media sosial |

> **Karena itu: selalu upload versi resolusi TERTINGGI yang kamu punya** (idealnya lebar ≥ 1920px untuk hero, ≥ 1200px untuk gambar artikel). Sistem yang mengecilkan, bukan kamu.

### 1.3. Format yang didukung

- **Gambar:** semua format gambar (JPG, PNG, WebP, GIF, dst.)
- **Video:** hanya **MP4** dan **WebM**. Untuk video panjang/besar, **jangan upload file** — pakai field *URL video sematan* (YouTube/Vimeo) di Galeri.

### 1.4. Dua cara memilih media dari koleksi lain

Setiap field gambar (mis. "Gambar Utama" di Berita) punya dua tombol:

- **Choose from existing** — pilih dari library Media yang sudah ada (gunakan pencarian nama/folder).
- **Create New / Upload** — upload file baru di tempat; file itu **tetap tersimpan ke koleksi Media** (masuk ke root, bukan folder — jadi lebih rapi kalau upload lewat menu Media dulu).

---

## 2. Peta Hubungan Antar Data

Kolom kanan menunjuk ke kolom kiri ("dibaca oleh"):

| Koleksi sumber | Dipakai oleh |
|---|---|
| **Media** | Hampir semua: Berita (gambar utama, meta SEO), Halaman (hero, blok Media), Sponsor (logo), Lowongan (logo, sampul), Usaha Alumni (sampul, galeri foto), Galeri, Komunitas (logo, hero), Alumni (foto), Ketua IAM (foto), Kepengurusan (organogram), Anggota Organisasi (foto), Footer (logo) |
| **Kategori (categories)** | Berita (field Kategori), blok **Archive** (filter kategori) |
| **Berita (posts)** | Berita lain (Berita Terkait), Komunitas (Berita Terkait Komunitas), blok **Archive**, menu Header/Footer (link internal) |
| **Users** | Berita (field Penulis) |
| **Aktivitas (activities)** | Blok **Highlight Aktivitas** di Halaman |
| **Sponsor (sponsors)** | Blok **Highlight Sponsor** di Halaman |
| **Lowongan Kerja (jobVacancies)** | Blok **Highlight Lowongan** di Halaman |
| **Kategori Galeri (galleryCategories)** | Galeri (setiap foto WAJIB menunjuk satu kategori/album) |
| **Ketua IAM (iamPresidents)** | Profil Organisasi (field "Ketua Saat Ini") |
| **Forms** (dibuat di menu Forms) | Blok **Form** di Halaman |
| **Halaman (pages)** | Menu Header/Footer (link internal) |

### Halaman website mana membaca data apa?

| URL di website | Sumber datanya |
|---|---|
| `/` (Beranda) | Halaman dengan slug `home` (blok-blok) + Profil Organisasi + Nilai & Filosofi (kartu) |
| `/berita`, `/berita/[slug]` | Berita + Kategori |
| `/aktivitas`, `/aktivitas/[slug]` | Aktivitas |
| `/galeri` | Galeri + Kategori Galeri |
| `/sponsor` | Sponsor |
| `/lowongan-kerja`, `/lowongan-kerja/[slug]` | Lowongan Kerja (hanya yang **published** + status Buka/Tutup) |
| `/usaha-alumni`, `/usaha-alumni/[slug]` | Usaha Alumni (hanya yang **published**) |
| `/komunitas`, `/komunitas/[slug]` | Komunitas |
| `/alumni` | Basis Data Alumni (hanya yang dicentang "Tampil di direktori publik") |
| `/organisasi` | Anggota Organisasi + Profil Organisasi |
| `/organisasi/ketua-sebelumnya/[slug]` | Ketua IAM |
| `/kepengurusan` | Kepengurusan |
| `/seputar-kami/[slug]` | Nilai & Filosofi (blok detailnya) |
| `/kontak` | Profil Organisasi (email, WA, Instagram) |
| `/pengajuan-lowongan`, `/pengajuan-usaha-alumni` | Form builder → kiriman masuk jadi **draf** Lowongan/Usaha Alumni |
| `/moderasi` | Daftar draf Lowongan & Usaha Alumni yang menunggu persetujuan (harus login admin) |

---

## 3. Status Terbit per Koleksi

Penting dipahami karena perilakunya berbeda:

| Koleksi | Sistem | Artinya |
|---|---|---|
| Halaman, Berita, **Nilai & Filosofi** | **Draft + Autosave + Jadwal terbit** | Perubahan tersimpan otomatis sebagai draft; tampil di web hanya setelah klik **Publish**. Bisa dijadwalkan. |
| Lowongan Kerja, Usaha Alumni | **Draft (tanpa autosave)** | Harus klik **Publish** agar tampil. Kiriman dari formulir publik otomatis masuk sebagai **draft** untuk dimoderasi. |
| Aktivitas, Sponsor, Galeri, Kategori Galeri, Ketua IAM, Kepengurusan, Komunitas, Anggota Organisasi, Kategori, Media | **Langsung tampil** | Begitu klik **Save**, data langsung publik. Tidak ada draft. Hati-hati saat mengedit. |
| Basis Data Alumni | Langsung tampil, **tapi** hanya jika "Tampil di direktori publik" dicentang | Email & telepon tidak pernah tampil ke publik. |
| Header, Footer, Profil Organisasi | Global, langsung tampil setelah Save | — |

> ⏱ **Catatan:** beberapa halaman daftar (mis. Galeri) di-cache hingga ±10 menit. Kalau perubahan belum terlihat, tunggu beberapa menit lalu refresh.

---

## 4. Hero Halaman

Setiap **Halaman** punya tab **Hero** — bagian paling atas halaman.

| Parameter | Wajib? | Pilihan / Keterangan |
|---|---|---|
| **Type** | ✅ | `None` = tanpa hero · `High Impact` = layar penuh dengan gambar latar · `Medium Impact` = besar dengan gambar · `Low Impact` = hanya teks |
| **Rich Text** | ❌ | Judul & paragraf hero (bisa H1–H4) |
| **Links** | ❌ | Maks. 2 tombol. Tiap tombol: label, tujuan (internal/custom URL), gaya (default/outline) |
| **Media** | ✅ *hanya jika* Type = High/Medium Impact | Gambar latar — pilih dari Media. Gunakan gambar lebar ≥ 1920px |

---

## 5. Blok Penyusun Halaman

Digunakan di **Halaman → tab Konten → Tata Letak**. Klik **Add Layout**, pilih bloknya, susun urutannya dengan drag & drop. Urutan blok di admin = urutan tampil di website (atas ke bawah).

---

### 5.1. Call To Action (`cta`)

Bagian ajakan dengan teks + tombol.

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Rich Text** | ❌ | Teks ajakan (H1–H4, bold, link, dll.) |
| **Links** | ❌ | Maks. **2 tombol**. Per tombol: |
| ↳ `type` | — | `Internal link` (pilih Halaman/Berita) atau `Custom URL` (ketik alamat) |
| ↳ `label` | ✅ | Teks tombol |
| ↳ `appearance` | — | `default` (tombol solid) / `outline` (garis) |
| ↳ `newTab` | — | Centang agar terbuka di tab baru |

**Contoh pemakaian:** ajakan "Gabung IAM ITB" dengan tombol "Daftar Sekarang" → Custom URL ke form pendaftaran.

---

### 5.2. Content (`content`)

Konten teks berkolom — blok paling serbaguna.

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Columns** | ❌ | Array — tambah kolom sebanyak yang dibutuhkan. Per kolom: |
| ↳ `size` | — | `One Third` (⅓ lebar) / `Half` (½) / `Two Thirds` (⅔) / `Full` (penuh). Kolom mengalir kiri→kanan; 3 kolom One Third = 1 baris berisi 3 kolom |
| ↳ `richText` | — | Isi kolom (H2–H4, teks, link) |
| ↳ `enableLink` | — | Centang untuk memunculkan tombol/link di bawah kolom |
| ↳ `link` | — | (muncul setelah enableLink dicentang) sama seperti link di CTA |

**Tips:** teks panjang satu kolom → pakai `Full`. Tiga fitur berdampingan → tiga kolom `One Third`.

---

### 5.3. Media Block (`mediaBlock`)

Menampilkan satu gambar/video dari Media Library, lebar penuh.

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Media** | ✅ | Pilih dari Media (lihat [Bab 1](#1-alur-kerja-media)). Caption pada entri Media akan ikut tampil di bawah gambar |

---

### 5.4. Archive (`archive`)

Daftar berita otomatis.

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Intro Content** | ❌ | Teks pembuka di atas daftar |
| **Populate By** | — | `Collection` = otomatis ambil berita terbaru · `Individual Selection` = pilih manual |
| **Collections To Show** | (mode Collection) | Saat ini hanya `Posts` (Berita) |
| **Categories To Show** | (mode Collection) | Kosongkan = semua kategori. Isi = hanya berita berkategori tsb. |
| **Limit** | (mode Collection) | Jumlah berita yang ditampilkan (default 10) |
| **Selection** | (mode Selection) | Pilih berita satu per satu, urutan sesuai pilihanmu |

**Hubungan:** membaca koleksi **Berita** dan **Kategori**. Berita draft tidak akan tampil.

---

### 5.5. Form Block (`formBlock`)

Menyisipkan formulir dari Form Builder.

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Form** | ✅ | Pilih form yang sudah dibuat di menu **Forms**. Buat form dulu jika belum ada |
| **Enable Intro Content** | ❌ | Centang untuk menampilkan teks pembuka |
| **Intro Content** | ❌ | (muncul jika intro aktif) teks di atas form |

**⚠ Penting — dua form punya perilaku khusus (jangan ganti judulnya):**
- Form berjudul **"Pengajuan Usaha Alumni"** → tiap kiriman otomatis membuat **draf Usaha Alumni**.
- Form berjudul **"Pengajuan Lowongan"** → tiap kiriman otomatis membuat **draf Lowongan Kerja**.
- Draf-draf ini ditinjau di halaman `/moderasi` atau langsung di admin, lalu di-**Publish** oleh admin agar tampil.

---

### 5.6. Highlight Aktivitas (`highlightActivities`)

Sorotan kegiatan di halaman (biasanya beranda).

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Judul Section** | ✅ | Judul bagian, mis. "Program Unggulan" |
| **Aktivitas Pilihan** | ✅ | Pilih **maks. 3** dari koleksi Aktivitas. Kartu menampilkan Gambar Utama + Ringkasan dari data Aktivitas |

**Alur:** buat/lengkapi entri di **Organisasi & Kegiatan → Aktivitas** dulu (isi Gambar Utama & Ringkasan agar kartunya bagus), baru pilih di blok ini.

---

### 5.7. Highlight Sponsor (`highlightSponsors`)

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Judul Section** | ✅ | Mis. "Didukung Oleh" |
| **Sponsor Pilihan** | ✅ | Pilih dari koleksi Sponsor (tidak ada batas jumlah). Logo diambil dari field Logo di entri Sponsor |

---

### 5.8. Highlight Lowongan (`highlightJobVacancies`)

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Judul Section** | ✅ | Mis. "Lowongan Terbaru" |
| **Lowongan Pilihan** | ✅ | Pilih **maks. 6** lowongan. Hanya lowongan **published** yang tampil ke pengunjung — kalau memilih yang masih draft, kartunya tidak muncul |

---

## 6. Blok Sisipan di Berita

Di dalam editor **Konten** Berita, ketik `/` atau klik ikon **+** untuk menyisipkan blok di antara paragraf:

### 6.1. Banner (`banner`)

Kotak sorotan di dalam artikel.

| Parameter | Wajib? | Pilihan |
|---|---|---|
| **Style** | ✅ | `Info` (biru) · `Warning` (kuning) · `Error` (merah) · `Success` (hijau) |
| **Content** | ✅ | Isi teks kotak |

### 6.2. Code (`code`)

| Parameter | Wajib? | Pilihan |
|---|---|---|
| **Language** | — | TypeScript / JavaScript / CSS |
| **Code** | ✅ | Potongan kode |

### 6.3. Media Block (`mediaBlock`)

Sama seperti [5.3](#53-media-block-mediablock) — gambar di tengah artikel. Pilih dari Media Library.

---

## 7. Blok Nilai & Filosofi

Digunakan di **Nilai & Filosofi → Tata Letak Konten Halaman Detail**. Ini membentuk halaman `/seputar-kami/[slug]` (mis. Genggam Mesin, Solidarity Forever).

**Konsep style:** hampir semua blok punya pilihan warna `Gold` / `Red Light` / `White` / `Muted` — ini memilih warna aksen teks sesuai identitas visual IAM. **Eyebrow** = teks label kecil di atas judul (mis. "NILAI KAMI").

### 7.1. Hero Header (`heroHeader`)

Pembuka halaman detail.

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Eyebrow** | ✅ | Label kecil di atas judul |
| **Style Eyebrow** | — | Gold / Red Light / White / Muted |
| **Judul Utama** | ✅ | Judul besar halaman |
| **Teks Sorotan** | ❌ | Bagian dari judul yang diberi warna khusus. Tulis kata yang PERSIS sama dengan yang ada di judul |
| **Style Sorotan** | — | Gold / Gradient (Gold-Red-Gold) / Red Underline |
| **Penulis / Oleh** | ❌ | Nama penulis (untuk konten seperti September-M) |
| **Paragraf Pengantar** | ✅ | Paragraf pembuka |
| **Style Pengantar** | — | `Default` · `Italic & Serif` (gaya September-M) · `Large Serif` (gaya Solidarity Forever) |

### 7.2. Split Content (`splitContent`)

Dua kolom: kiri = judul ATAU daftar info, kanan = teks utama.

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Tipe Kolom Kiri** | — | `Judul Saja` atau `Daftar Info (Metadata/Konteks)` — field di bawahnya berubah mengikuti pilihan ini |
| *Jika "Judul Saja":* | | |
| ↳ Eyebrow, Style, Judul, Teks Sorotan, Style Sorotan Kolom Kiri | ❌ | Sama polanya dengan Hero Header |
| *Jika "Daftar Info":* | | |
| ↳ **Daftar Item Info** | — | Array. Per item: Eyebrow (✅), Style Eyebrow, Judul (✅), Keterangan (✅). Cocok untuk metadata seperti "Tahun: 1975", "Pencipta: ..." |
| **Teks Utama (Kolom Kanan)** | ✅ | Isi utama (rich text) |

### 7.3. Yel-Yel / Dialog (`dialogue`)

Kiri = pengantar, kanan = daftar baris dialog/yel-yel.

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Eyebrow Kiri** / Style | ✅ / — | Label bagian |
| **Judul Kiri** | ✅ | |
| **Deskripsi Kiri** | ✅ | Rich text pengantar |
| **Daftar Dialog** | ✅ | Array. Per baris: |
| ↳ `Pembicara / Aksi` | ✅ | Mis. "Komandan:" atau "(semua)" |
| ↳ `Warna Pembicara` | — | Red Light / Gold / White-Muted |
| ↳ `Isi Ucapan` | ✅ | Teks yel-yel |
| ↳ `Warna Ucapan` | — | White / Gold / Red Light |
| ↳ `Keterangan Tambahan` | ❌ | Catatan kecil di bawah baris |

### 7.4. Pilar Filosofi (`pillars`)

Grid/daftar poin filosofi.

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Eyebrow** / Style | ✅ / — | |
| **Judul Bagian** | ✅ | |
| **Style Tampilan** | — | `3 Kolom Horizontal` (gaya Genggam Mesin) · `Baris List dengan Metadata Kiri` (gaya Solidarity Forever) |
| **Daftar Pilar** | ✅ | Array. Per pilar: |
| ↳ `Nomor Pilar` | ✅ | Teks bebas, mis. "01" |
| ↳ `Style Nomor` | — | Red Light / Gold / White-Muted |
| ↳ `Label Pendukung` | ❌ | Mis. "Brotherhood" |
| ↳ `Style Label` | — | Gold / Red Light / White-Muted |
| ↳ `Judul Pilar` | ✅ | |
| ↳ `Deskripsi Pilar` | ✅ | Rich text |
| ↳ `Sub-poin` | ❌ | Array opsional: Emoji/Icon (✅), Judul (✅), Deskripsi (✅) |

### 7.5. Penutup / Link Sinergi (`closing`)

Penutup halaman + link ke halaman filosofi lain.

| Parameter | Wajib? | Keterangan |
|---|---|---|
| **Eyebrow** / Style | ✅ / — | |
| **Judul Penutup** | ✅ | |
| **Style Judul** | — | `Accent (Gold)` / `Inverse (White)` |
| **Teks Kutipan** | ❌ | Kutipan penutup |
| **Style Kutipan** | — | Italic & Serif / Default |
| **Teks Deskripsi** | ❌ | Rich text |
| **Link Navigasi Lain** | ❌ | Array. Per link: Label (✅), URL (✅, mis. `/seputar-kami/genggam-mesin`), Warna Hover |

---

## 8. Resep: Alur Kerja Umum

### 8.1. Menambahkan foto ke Berita (gambar utama)

1. **Media & Berkas → Media** → masuk folder `berita` → **Create New** → upload foto (resolusi tinggi) → isi **Nama Media** dan **Alt** → **Save**.
2. **Konten & Halaman → Berita** → buka/buat berita.
3. Di tab **Konten**, klik field **Gambar Utama** → **Choose from existing** → cari nama media tadi → pilih.
4. Klik **Publish** (atau Save untuk draft).

### 8.2. Menambahkan foto di tengah artikel Berita

1. Pastikan foto sudah ada di Media (langkah 8.1 no. 1).
2. Di editor **Konten**, letakkan kursor di posisi yang diinginkan → ketik `/` → pilih **Media Block** → pilih medianya.

### 8.3. Menambahkan foto ke Galeri

Galeri berbentuk **album**: satu entri Galeri = satu foto/video, dan wajib menunjuk ke satu **Kategori Galeri** (album).

1. **Kalau albumnya belum ada:** Organisasi & Kegiatan → **Kategori Galeri** → Create New → isi Judul Album (mis. "Reuni Akbar 2025") + Sub-judul (opsional) → Save.
2. **Media → folder `galeri`** → upload foto → isi Nama & Alt → Save. *(Boleh juga langsung upload dari langkah 3.)*
3. Organisasi & Kegiatan → **Galeri** → **Create New**:
   - **Kategori / Album** → pilih album dari langkah 1 (wajib).
   - **Gambar atau file video** → pilih media dari langkah 2, **ATAU**
   - **URL video sematan** → tempel link YouTube/Vimeo (untuk video, ini lebih baik daripada upload file besar). Minimal salah satu harus diisi.
   - **Deskripsi** → jadi caption foto di website.
4. **Save** → langsung tampil (tunggu maks. ±10 menit karena cache).
5. Ulangi langkah 2–4 untuk foto lain dalam album yang sama.

> Entri dengan **URL sematan** tampil sebagai kartu video (dengan ikon play) di halaman galeri; videonya diputar di jendela pratinjau. Pastikan link-nya berupa URL YouTube atau Vimeo yang valid.

### 8.4. Menampilkan sponsor di beranda

1. Organisasi & Kegiatan → **Sponsor** → Create New → isi Nama, Kategori, **Logo** (upload/pilih dari Media folder `sponsor`), Deskripsi Singkat → Save.
2. Konten & Halaman → **Halaman** → buka halaman **Home**.
3. Tab **Konten** → cari blok **Highlight Sponsor** (atau Add Layout → Highlight Sponsor).
4. Tambahkan sponsor baru ke daftar **Sponsor Pilihan** → **Publish**.

### 8.5. Moderasi pengajuan lowongan / usaha alumni

1. Pengunjung mengisi form di `/pengajuan-lowongan` atau `/pengajuan-usaha-alumni`.
2. Sistem otomatis membuat entri **draft** di Lowongan Kerja / Usaha Alumni.
3. Admin membuka `/moderasi` (login dulu) atau langsung ke koleksi terkait di admin (filter status Draft).
4. Periksa isinya, lengkapi yang kurang (logo perusahaan, gambar sampul — pengaju tidak bisa upload gambar), lalu klik **Publish**. Yang ditolak cukup dibiarkan draft atau dihapus.

### 8.6. Menambahkan pengurus baru ke organogram

1. Media → folder `organisasi` → upload foto pengurus.
2. Organisasi & Kegiatan → **Anggota Organisasi** → Create New:
   - **Tipe Anggota** menentukan tab tampilannya: `Pengurus Inti` (masuk organogram), `Dewan Penasihat`, atau `Dewan Pakar`.
   - Jika Pengurus Inti: isi **Level Organogram** (1 = Ketua Umum, 2 = SekJen/Bendahara, 3 = Wakil KU, 4 = Ketua Bidang).
   - **Urutan** mengatur posisi kiri-kanan di level yang sama (kecil = kiri).
3. Save → langsung tampil di `/organisasi`.

### 8.7. Mengganti Ketua saat ini

1. Buat entri baru di **Ketua IAM** (nama, foto, periode, biografi).
2. Buka **Profil Organisasi** (global) → field **Ketua Saat Ini** → pilih entri baru → Save.

---

## 9. Hal yang Perlu Diwaspadai

1. **Koleksi tanpa draft langsung publik saat Save** — lihat tabel di [Bab 3](#3-status-terbit-per-koleksi). Jangan simpan setengah jadi di Aktivitas, Sponsor, Galeri, dll. (**Nilai & Filosofi kini memakai draf** — aman disimpan bertahap, tampil setelah **Publish**.)
2. **Jangan hapus media yang masih dipakai** — gambar di website akan rusak. Cek dulu apakah masih direferensikan.
3. **Judul form "Pengajuan Lowongan" & "Pengajuan Usaha Alumni" tidak boleh diganti** — otomatisasi draft mengenali form dari judulnya.
4. **URL sematan Galeri harus link YouTube/Vimeo yang valid** — link lain tidak dapat dirender dan entrinya tidak akan muncul.
5. **Perubahan bisa butuh beberapa menit untuk terlihat** di halaman daftar (cache hingga ±10 menit).
6. **Highlight Lowongan hanya merender lowongan yang published** — kalau kartunya tidak muncul, cek status lowongan tersebut.
7. **Slug** dibuat otomatis dari judul/nama. Setelah dipublikasikan & tersebar linknya, hindari mengubah slug (link lama akan mati; kalau terpaksa, buat Redirect).

---

> **IAM ITB — For Union Machine Strong**
