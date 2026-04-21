import type { Access } from 'payload'

/**
 * Alumni directory: anonymous users only see entries with listPublicly true.
 * Authenticated users (admin) see all entries.
 */
export const publicDirectoryOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true

  return {
    listPublicly: {
      equals: true,
    },
  }
}
