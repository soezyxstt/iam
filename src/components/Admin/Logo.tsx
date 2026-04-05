import * as React from 'react'

const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <img
        src="/logo.png"
        alt="Logo Ikatan Alumni Mahasiswa Teknik Mesin ITB"
        style={{ height: 32, width: 'auto' }}
      />
      <span style={{ fontWeight: 600 }}>IAM ITB</span>
    </div>
  )
}

export default Logo

