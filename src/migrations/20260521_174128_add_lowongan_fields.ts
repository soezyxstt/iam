import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_job_vacancies_vacancy_status" AS ENUM('open', 'closed');
    CREATE TYPE "public"."enum__job_vacancies_v_version_vacancy_status" AS ENUM('open', 'closed');

    ALTER TABLE "job_vacancies" ADD COLUMN "vacancy_status" "enum_job_vacancies_vacancy_status" DEFAULT 'open';
    ALTER TABLE "job_vacancies" ADD COLUMN "quota" numeric;
    ALTER TABLE "job_vacancies" ADD COLUMN "requirements" jsonb;
    ALTER TABLE "job_vacancies" ADD COLUMN "benefits" jsonb;
    ALTER TABLE "job_vacancies" ADD COLUMN "contact_whats_app" varchar;

    ALTER TABLE "_job_vacancies_v" ADD COLUMN "version_vacancy_status" "enum__job_vacancies_v_version_vacancy_status" DEFAULT 'open';
    ALTER TABLE "_job_vacancies_v" ADD COLUMN "version_quota" numeric;
    ALTER TABLE "_job_vacancies_v" ADD COLUMN "version_requirements" jsonb;
    ALTER TABLE "_job_vacancies_v" ADD COLUMN "version_benefits" jsonb;
    ALTER TABLE "_job_vacancies_v" ADD COLUMN "version_contact_whats_app" varchar;
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "job_vacancies" DROP COLUMN "vacancy_status";
    ALTER TABLE "job_vacancies" DROP COLUMN "quota";
    ALTER TABLE "job_vacancies" DROP COLUMN "requirements";
    ALTER TABLE "job_vacancies" DROP COLUMN "benefits";
    ALTER TABLE "job_vacancies" DROP COLUMN "contact_whats_app";

    ALTER TABLE "_job_vacancies_v" DROP COLUMN "version_vacancy_status";
    ALTER TABLE "_job_vacancies_v" DROP COLUMN "version_quota";
    ALTER TABLE "_job_vacancies_v" DROP COLUMN "version_requirements";
    ALTER TABLE "_job_vacancies_v" DROP COLUMN "version_benefits";
    ALTER TABLE "_job_vacancies_v" DROP COLUMN "version_contact_whats_app";

    DROP TYPE "public"."enum_job_vacancies_vacancy_status";
    DROP TYPE "public"."enum__job_vacancies_v_version_vacancy_status";
  `)
}
