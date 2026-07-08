import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Schema is already up-to-date and synced via dev mode push
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // No-op
}
