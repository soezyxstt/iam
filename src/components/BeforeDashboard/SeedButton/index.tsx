'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

const SuccessMessage: React.FC = () => (
  <div>
    Basis data telah diisi! Anda sekarang dapat{' '}
    <a target="_blank" href="/">
      mengunjungi situs web Anda
    </a>
  </div>
)

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info('Basis data sudah diisi sebelumnya.')
        return
      }
      if (loading) {
        toast.info('Pengisian data sedang berlangsung.')
        return
      }
      if (error) {
        toast.error(`Terjadi kesalahan, harap muat ulang dan coba lagi.`)
        return
      }

      setLoading(true)

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            try {
              fetch('/next/seed', { method: 'POST', credentials: 'include' })
                .then((res) => {
                  if (res.ok) {
                    resolve(true)
                    setSeeded(true)
                  } else {
                    reject('Terjadi kesalahan saat mengisi data.')
                  }
                })
                .catch((error) => {
                  reject(error)
                })
            } catch (error) {
              reject(error)
            }
          }),
          {
            loading: 'Sedang mengisi data....',
            success: <SuccessMessage />,
            error: 'Terjadi kesalahan saat mengisi data.',
          },
        )
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        setError(error)
      }
    },
    [loading, seeded, error],
  )

  let message = ''
  if (loading) message = ' (mengisi data...)'
  if (seeded) message = ' (selesai!)'
  if (error) message = ` (kesalahan: ${error})`

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        Isi basis data Anda
      </button>
      {message}
    </Fragment>
  )
}
