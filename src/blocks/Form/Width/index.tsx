import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  return (
    <div
      className={`px-2 w-full flex-shrink-0 md:[width:var(--field-width)] md:[flex-basis:var(--field-width)] md:[max-width:var(--field-width)] ${className || ''}`}
      style={{
        '--field-width': width ? `${width}%` : '100%',
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
