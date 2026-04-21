import type { GalleryImage } from './GalleryImageGrid'

const u = (path: string, w = 800) => `https://images.unsplash.com/${path}?w=${w}&q=80`

export type GalleryGroup = {
  id: string
  title: string
  subtitle?: string
  images: GalleryImage[]
}

/** Placeholder event groups — replace or load from CMS later. */
export const GALLERY_GROUPS: GalleryGroup[] = [
  {
    id: 'kongres-2025',
    title: 'Kongres IAM 2025',
    subtitle: 'Bandung',
    images: [
      { src: u('photo-1540575467063-178a50c2df87'), alt: 'Kongres', caption: 'Sesi pleno' },
      { src: u('photo-1511578314322-379afb476865'), alt: 'Workshop', caption: 'Workshop' },
      { src: u('photo-1475721027785-f74eccf877e2'), alt: 'Gathering', caption: 'Silaturahmi' },
      { src: u('photo-1523580494863-6f3031224c94'), alt: 'Seminar', caption: 'Seminar' },
      { src: u('photo-1492684223066-81342ee5ff30'), alt: 'Acara', caption: 'Penutupan' },
      { src: u('photo-1522071820081-009f0129c71c'), alt: 'Tim', caption: 'Panitia' },
    ],
  },
  {
    id: 'alumni-night-2025',
    title: 'Alumni Night',
    subtitle: 'Malam keakraban',
    images: [
      { src: u('photo-1505373877841-8d25f7d46678'), alt: 'Event', caption: 'Panggung' },
      { src: u('photo-1531482615713-2afd69097998'), alt: 'Diskusi', caption: 'Diskusi' },
      { src: u('photo-1556761175-5973dc0f32e7'), alt: 'Kolaborasi', caption: 'Kolaborasi' },
      { src: u('photo-1517245386807-bb43f82c33c4'), alt: 'Networking', caption: 'Networking' },
      { src: u('photo-1552664730-d307ca884978'), alt: 'Rapat', caption: 'Rapat' },
    ],
  },
  {
    id: 'workshop-teknis-2024',
    title: 'Workshop Teknis',
    subtitle: 'Laboratorium',
    images: [
      { src: u('photo-1540575467063-178a50c2df87'), alt: 'Sesi', caption: 'Sesi teknis' },
      { src: u('photo-1511578314322-379afb476865'), alt: 'Praktik', caption: 'Praktik' },
      { src: u('photo-1475721027785-f74eccf877e2'), alt: 'Diskusi', caption: 'Diskusi' },
      { src: u('photo-1523580494863-6f3031224c94'), alt: 'Materi', caption: 'Materi' },
    ],
  },
  {
    id: 'gathering-regional-2024',
    title: 'Gathering Regional',
    subtitle: 'Jakarta',
    images: [
      { src: u('photo-1492684223066-81342ee5ff30'), alt: 'Peserta', caption: 'Peserta' },
      { src: u('photo-1522071820081-009f0129c71c'), alt: 'Acara', caption: 'Acara' },
      { src: u('photo-1505373877841-8d25f7d46678'), alt: 'Networking', caption: 'Networking' },
    ],
  },
  {
    id: 'rapat-pleno-2024',
    title: 'Rapat Pleno',
    subtitle: 'Pengurus',
    images: [
      { src: u('photo-1552664730-d307ca884978'), alt: 'Rapat', caption: 'Rapat pleno' },
      { src: u('photo-1531482615713-2afd69097998'), alt: 'Notulen', caption: 'Notulen' },
      { src: u('photo-1556761175-5973dc0f32e7'), alt: 'Diskusi', caption: 'Diskusi' },
    ],
  },
]
