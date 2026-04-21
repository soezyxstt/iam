import type { FieldAccess } from 'payload'

/** Hide field values from unauthenticated API responses (e.g. public site + anon REST). */
export const readAuthenticatedOnly: FieldAccess = ({ req: { user } }) => Boolean(user)
