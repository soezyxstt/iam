import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <div className="admin-brand-logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Image
        src="/logo.png"
        alt="Logo Ikatan Alumni Mahasiswa Teknik Mesin ITB"
        height={32}
        width={32}
        style={{ width: 'auto' }}
      />
      <span style={{ fontWeight: 600 }}>IAM ITB</span>
    </div>
  )
}

export default Logo

