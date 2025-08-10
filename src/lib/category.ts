import { DB } from '@/db/queries'

export async function resolveCategoryId(
  categoryId: string,
  newCategory: string
): Promise<string> {
  if (newCategory && !categoryId) {
    const newCategoryRow = await DB.MUTATIONS.createCategory(newCategory)
    return newCategoryRow.id.toString()
  }
  return categoryId
}
