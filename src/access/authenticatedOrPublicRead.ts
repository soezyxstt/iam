import type { Access } from 'payload'

/**
 * Read access for collections without `versions.drafts`.
 * `authenticatedOrPublished` filters by `_status`, which only exists when drafts are enabled.
 */
export const authenticatedOrPublicRead: Access = () => true
