import type { CollectionAfterChangeHook } from 'payload'

import type { FormSubmission, JobVacancy } from '@/payload-types'
import { plainTextToLexicalRoot } from '@/utilities/plainTextToLexicalRoot'

function pick(
  submissionData: FormSubmission['submissionData'],
  field: string,
): string {
  const v = submissionData?.find((s) => s.field === field)?.value
  if (v === null || v === undefined) return ''
  return String(v).trim()
}

export const formSubmissionCreateDrafts: CollectionAfterChangeHook<FormSubmission> = async ({
  doc,
  req,
  operation,
}) => {
  if (operation !== 'create' || !doc.submissionData?.length) return doc

  const rawForm = doc.form
  const formId = typeof rawForm === 'object' && rawForm !== null ? rawForm.id : rawForm
  if (formId === undefined || formId === null) return doc

  const form = await req.payload.findByID({
    collection: 'forms',
    id: formId,
    depth: 0,
    req,
  })

  if (!form) return doc

  if (form.title === 'Pengajuan Usaha Alumni') {
    const category = pick(doc.submissionData, 'category')
    const allowed = ['manufaktur', 'jasa', 'fnb', 'teknologi', 'lainnya'] as const
    const categorySafe = allowed.includes(category as (typeof allowed)[number])
      ? category
      : 'lainnya'

    await req.payload.create({
      collection: 'alumniBusinesses',
      req,
      draft: true,
      data: {
        _status: 'draft',
        ownerName: pick(doc.submissionData, 'ownerName'),
        businessName: pick(doc.submissionData, 'businessName'),
        category: categorySafe as typeof allowed[number],
        description: pick(doc.submissionData, 'description'),
        productsOrServices: pick(doc.submissionData, 'productsOrServices'),
        address: pick(doc.submissionData, 'address'),
        phoneNumber: pick(doc.submissionData, 'phoneNumber'),
        email: pick(doc.submissionData, 'email') || undefined,
        website: pick(doc.submissionData, 'website') || undefined,
        instagram: pick(doc.submissionData, 'instagram') || undefined,
      },
    })
  }

  if (form.title === 'Pengajuan Lowongan') {
    const employmentType = pick(doc.submissionData, 'employmentType')
    const empAllowed = ['full_time', 'part_time', 'internship'] as const
    const employmentSafe = empAllowed.includes(employmentType as (typeof empAllowed)[number])
      ? employmentType
      : 'full_time'

    await req.payload.create({
      collection: 'jobVacancies',
      req,
      draft: true,
      data: {
        _status: 'draft',
        position: pick(doc.submissionData, 'position'),
        companyName: pick(doc.submissionData, 'companyName'),
        employmentType: employmentSafe as typeof empAllowed[number],
        jobDescription: plainTextToLexicalRoot(pick(doc.submissionData, 'jobDescription')) as NonNullable<
          JobVacancy['jobDescription']
        >,
        officialLink: pick(doc.submissionData, 'officialLink') || undefined,
      },
    })
  }

  return doc
}
