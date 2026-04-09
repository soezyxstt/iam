import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /** Show the text "IAM ITB" next to the logo */
  showText?: boolean
  /** Size of the logo icon in px (default: 40) */
  size?: number
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, showText = false, size = 40 } = props

  const loading = loadingFromProps || 'lazy'
  const isPriority = priorityFromProps === 'high'

  return (
    <span className={clsx('inline-flex items-center gap-3', className)}>
      <Image
        alt="Logo IAM ITB"
        width={size}
        height={size}
        loading={loading}
        priority={isPriority}
        className="object-contain shrink-0"
        src="/logo.png"
      />
      {showText && (
        <span className="font-serif font-bold leading-none text-current">
          IAM
          <br />
          ITB
        </span>
      )}
    </span>
  )
}
