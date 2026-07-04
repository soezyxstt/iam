import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import {
  HeroHeaderBlock,
  SplitContentBlock,
  DialogueBlock,
  PillarsBlock,
  ClosingBlock,
} from './blocks'

export const NilaiFilosofi: CollectionConfig = {
  slug: 'values-philosophy',
  labels: {
    singular: 'Nilai & Filosofi',
    plural: 'Nilai & Filosofi',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Organisasi & kegiatan',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'displayCategory', '_status', 'isComingSoon', 'order', 'updatedAt'],
    description:
      'Halaman ini memakai draf: perubahan disimpan sebagai draf dan baru tampil di situs setelah klik Publish.',
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      label: 'Judul Utama',
      type: 'text',
      required: true,
    },
    slugField({ useAsSlug: 'title' }),
    {
      name: 'displayCategory',
      label: 'Kategori Tampilan (Beranda)',
      type: 'select',
      options: [
        { label: 'Card (Lebar 1 Kolom)', value: 'card' },
        { label: 'Banner (Lebar Penuh)', value: 'banner' },
      ],
      defaultValue: 'card',
      required: true,
    },
    {
      name: 'cardLabel',
      label: 'Label Kartu di Beranda',
      type: 'textarea',
      admin: {
        description: 'Gunakan enter (\\n) untuk baris baru pada teks kartu. Contoh: Genggam\\nMesin',
      },
      required: true,
    },
    {
      name: 'isComingSoon',
      label: 'Segera Hadir (Coming Soon)',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'order',
      label: 'Urutan Tampilan',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Semakin kecil nilainya, semakin awal ditampilkan.',
      },
    },
    {
      name: 'detailsLayout',
      label: 'Tata Letak Konten Halaman Detail',
      type: 'blocks',
      blocks: [
        HeroHeaderBlock,
        SplitContentBlock,
        DialogueBlock,
        PillarsBlock,
        ClosingBlock,
      ],
      required: true,
    },
  ],
}
