import { redirect } from 'next/navigation'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function JobPost({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  redirect(`/lowongan-kerja?selected=${encodeURIComponent(slug)}`)
}

export function generateMetadata() {
  return {
    title: 'Lowongan Kerja',
  }
}
