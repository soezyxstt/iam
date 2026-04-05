import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Selamat datang di dasbor Anda!</h4>
      </Banner>
      Berikut adalah hal yang bisa dilakukan selanjutnya:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {' dengan beberapa halaman, post, dan proyek untuk memulai situs baru Anda, lalu '}
          <a href="/" target="_blank">
            kunjungi situs web Anda
          </a>
          {' untuk melihat hasilnya.'}
        </li>
        <li>
          {'Modifikasi '}
          <a
            href="https://payloadcms.com/docs/configuration/collections"
            rel="noopener noreferrer"
            target="_blank"
          >
            koleksi
          </a>
          {' Anda dan tambahkan lebih banyak '}
          <a
            href="https://payloadcms.com/docs/fields/overview"
            rel="noopener noreferrer"
            target="_blank"
          >
            bidang
          </a>
          {' sesuai kebutuhan. Jika Anda baru menggunakan Payload, kami sarankan Anda membaca dokumentasi '}
          <a
            href="https://payloadcms.com/docs/getting-started/what-is-payload"
            rel="noopener noreferrer"
            target="_blank"
          >
            Memulai
          </a>
          {'.'}
        </li>
        <li>
          Commit dan push perubahan Anda untuk memicu penerapan ulang proyek Anda.
        </li>
      </ul>
      {'Tips Pro: Blok ini adalah sebuah '}
      <a
        href="https://payloadcms.com/docs/custom-components/overview"
        rel="noopener noreferrer"
        target="_blank"
      >
        komponen kustom
      </a>
      , Anda bisa menghapusnya kapan saja dengan memperbarui <strong>payload.config</strong> Anda.
    </div>
  )
}

export default BeforeDashboard
