import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <div className={`${baseClass}__welcome`}>
        <h4>Selamat datang di dasbor IAM ITB</h4>
      </div>
      <p className={`${baseClass}__lead`}>
        Kelola beranda, berita, direktori alumni, sponsor, dan lowongan dari sini. Pratinjau live tersedia di
        editor halaman dan berita.
      </p>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Beranda:</strong> edit halaman dengan slug <code>home</code> — hero, blok highlight aktivitas /
          sponsor / lowongan, dan arsip berita.
        </li>
        <li>
          <strong>Konten organisasi:</strong> global <em>Profil Organisasi</em>, koleksi Kepengurusan, Ketua IAM,
          Galeri, Aktivitas.
        </li>
        <li>
          <strong>Moderasi:</strong> pengajuan usaha alumni dan lowongan dari formulir tersimpan sebagai{' '}
          <em>draf</em> — tinjau lalu terbitkan di koleksi terkait.
        </li>
        <li>
          <SeedButton />
          {' untuk data awal, lalu '}
          <a href="/" rel="noreferrer" target="_blank">
            buka situs
          </a>
          .
        </li>
      </ul>
      <p className={`${baseClass}__foot`}>
        Dokumentasi Payload:{' '}
        <a href="https://payloadcms.com/docs/getting-started/what-is-payload" rel="noreferrer" target="_blank">
          Memulai
        </a>
      </p>
    </div>
  )
}

export default BeforeDashboard
