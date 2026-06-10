import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`org_members\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`position\` text,
  	\`photo_id\` integer,
  	\`member_type\` text NOT NULL,
  	\`tree_level\` numeric,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`org_members_photo_idx\` ON \`org_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`org_members_updated_at_idx\` ON \`org_members\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`org_members_created_at_idx\` ON \`org_members\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`org_members_id\` integer REFERENCES org_members(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_org_members_id_idx\` ON \`payload_locked_documents_rels\` (\`org_members_id\`);`)
  await db.run(sql`ALTER TABLE \`organization_profile\` ADD \`contact_email\` text;`)
  await db.run(sql`ALTER TABLE \`organization_profile\` ADD \`contact_whatsapp\` text;`)
  await db.run(sql`ALTER TABLE \`organization_profile\` ADD \`contact_instagram\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`org_members\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`media_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	\`job_vacancies_id\` integer,
  	\`alumni_businesses_id\` integer,
  	\`activities_id\` integer,
  	\`sponsors_id\` integer,
  	\`iam_presidents_id\` integer,
  	\`managements_id\` integer,
  	\`galleries_id\` integer,
  	\`gallery_categories_id\` integer,
  	\`communities_id\` integer,
  	\`alumni_members_id\` integer,
  	\`redirects_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`search_id\` integer,
  	\`payload_folders_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`job_vacancies_id\`) REFERENCES \`job_vacancies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`alumni_businesses_id\`) REFERENCES \`alumni_businesses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`activities_id\`) REFERENCES \`activities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`sponsors_id\`) REFERENCES \`sponsors\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`iam_presidents_id\`) REFERENCES \`iam_presidents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`managements_id\`) REFERENCES \`managements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`galleries_id\`) REFERENCES \`galleries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gallery_categories_id\`) REFERENCES \`gallery_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`communities_id\`) REFERENCES \`communities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`alumni_members_id\`) REFERENCES \`alumni_members\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_folders_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "posts_id", "media_id", "categories_id", "users_id", "job_vacancies_id", "alumni_businesses_id", "activities_id", "sponsors_id", "iam_presidents_id", "managements_id", "galleries_id", "gallery_categories_id", "communities_id", "alumni_members_id", "redirects_id", "forms_id", "form_submissions_id", "search_id", "payload_folders_id") SELECT "id", "order", "parent_id", "path", "pages_id", "posts_id", "media_id", "categories_id", "users_id", "job_vacancies_id", "alumni_businesses_id", "activities_id", "sponsors_id", "iam_presidents_id", "managements_id", "galleries_id", "gallery_categories_id", "communities_id", "alumni_members_id", "redirects_id", "forms_id", "form_submissions_id", "search_id", "payload_folders_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_job_vacancies_id_idx\` ON \`payload_locked_documents_rels\` (\`job_vacancies_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_alumni_businesses_id_idx\` ON \`payload_locked_documents_rels\` (\`alumni_businesses_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_activities_id_idx\` ON \`payload_locked_documents_rels\` (\`activities_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_sponsors_id_idx\` ON \`payload_locked_documents_rels\` (\`sponsors_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_iam_presidents_id_idx\` ON \`payload_locked_documents_rels\` (\`iam_presidents_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_managements_id_idx\` ON \`payload_locked_documents_rels\` (\`managements_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_galleries_id_idx\` ON \`payload_locked_documents_rels\` (\`galleries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_gallery_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`gallery_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_communities_id_idx\` ON \`payload_locked_documents_rels\` (\`communities_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_alumni_members_id_idx\` ON \`payload_locked_documents_rels\` (\`alumni_members_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_folders_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_folders_id\`);`)
  await db.run(sql`ALTER TABLE \`organization_profile\` DROP COLUMN \`contact_email\`;`)
  await db.run(sql`ALTER TABLE \`organization_profile\` DROP COLUMN \`contact_whatsapp\`;`)
  await db.run(sql`ALTER TABLE \`organization_profile\` DROP COLUMN \`contact_instagram\`;`)
}
