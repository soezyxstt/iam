import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Pengaturan situs',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'hasDropdown',
          label: 'Punya Sub-Menu?',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'dropdownItems',
          label: 'Item Sub-Menu',
          type: 'array',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.hasDropdown),
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
