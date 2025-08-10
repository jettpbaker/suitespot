export type ProductFormInput = {
  name: string
  description: string
  priceRaw: string
  priority: string
  categoryId: string
  newCategory: string
  image: File | null
}

export function extractProductFormData(formData: FormData): ProductFormInput {
  const name = (formData.get('name') ?? '').toString().trim()
  const description = (formData.get('description') ?? '').toString().trim()
  const priceRaw = (formData.get('price') ?? '').toString().trim()
  const priority = (formData.get('priority') ?? '').toString().trim()
  const categoryId = (formData.get('categoryId') ?? '').toString().trim()
  const newCategory = (formData.get('new-category') ?? '').toString().trim()
  const image = formData.get('image') as File | null

  return {
    name,
    description,
    priceRaw,
    priority,
    categoryId,
    newCategory,
    image,
  }
}
