'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

/**
 * Approve a pending submission by setting its status to 'published'.
 * Requires active administrator authentication.
 */
export async function approveSubmission(id: number, type: 'usaha' | 'lowongan') {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    throw new Error('Unauthorized: Harus login untuk menyetujui pengajuan.')
  }

  const collection = type === 'usaha' ? 'alumniBusinesses' : 'jobVacancies'

  await payload.update({
    collection,
    id,
    data: {
      _status: 'published',
    },
    user,
    overrideAccess: false,
  })

  // Revalidate lists and detail pages
  revalidatePath('/usaha-alumni')
  revalidatePath('/lowongan-kerja')
  revalidatePath('/moderasi')

  return { success: true }
}

/**
 * Reject a pending submission by deleting it from the database.
 * Requires active administrator authentication.
 */
export async function rejectSubmission(id: number, type: 'usaha' | 'lowongan') {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    throw new Error('Unauthorized: Harus login untuk menolak pengajuan.')
  }

  const collection = type === 'usaha' ? 'alumniBusinesses' : 'jobVacancies'

  await payload.delete({
    collection,
    id,
    user,
    overrideAccess: false,
  })

  // Revalidate lists and detail pages
  revalidatePath('/usaha-alumni')
  revalidatePath('/lowongan-kerja')
  revalidatePath('/moderasi')

  return { success: true }
}
