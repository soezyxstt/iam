import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories } = originalDoc

  // Dynamic mapping based on collection type
  let docTitle = originalDoc.title
  let docDescription = originalDoc.meta?.description
  let docImage = originalDoc.meta?.image?.id || originalDoc.meta?.image || originalDoc.heroImage?.id || originalDoc.heroImage

  if (collection === 'jobVacancies') {
    docTitle = originalDoc.position
    docDescription = [originalDoc.companyName, originalDoc.location].filter(Boolean).join(' - ')
    docImage = originalDoc.coverImage?.id || originalDoc.coverImage || originalDoc.companyLogo?.id || originalDoc.companyLogo
  } else if (collection === 'alumniBusinesses') {
    docTitle = originalDoc.businessName
    docDescription = originalDoc.description
    docImage = originalDoc.coverImage?.id || originalDoc.coverImage
  } else if (collection === 'activities') {
    docTitle = originalDoc.activityName
    docDescription = originalDoc.excerpt
    docImage = originalDoc.heroImage?.id || originalDoc.heroImage
  } else if (collection === 'communities') {
    docTitle = originalDoc.communityName
    docDescription = originalDoc.shortDescription
    docImage = originalDoc.logo?.id || originalDoc.logo || originalDoc.heroImage?.id || originalDoc.heroImage
  }

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    title: docTitle,
    slug,
    meta: {
      title: docTitle,
      image: docImage,
      description: docDescription,
    },
    categories: [],
  }

  // Categories are only synced for the 'posts' collection
  if (collection === 'posts' && categories && Array.isArray(categories) && categories.length > 0) {
    const populatedCategories: { id: string | number; title: string }[] = []
    for (const category of categories) {
      if (!category) {
        continue
      }

      if (typeof category === 'object') {
        populatedCategories.push(category)
        continue
      }

      const doc = await req.payload.findByID({
        collection: 'categories',
        id: category,
        disableErrors: true,
        depth: 0,
        select: { title: true },
        req,
      })

      if (doc !== null) {
        populatedCategories.push(doc)
      } else {
        console.error(
          `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
        )
      }
    }

    modifiedDoc.categories = populatedCategories.map((each) => ({
      relationTo: 'categories',
      categoryID: String(each.id),
      title: each.title,
    }))
  }

  return modifiedDoc
}
