export type FieldErrors = {
  name?: string
  price?: string
  priority?: string
  category?: string
  image?: string
}

type RequiredFieldParams = {
  name: string
  priceRaw: string
  priority: string
  image: File | null
  categoryId: string
  newCategory: string
}

export function validateRequiredFields(
  params: RequiredFieldParams
): FieldErrors {
  const { name, priceRaw, priority, image, categoryId, newCategory } = params
  const fieldErrors: FieldErrors = {}

  if (!name) fieldErrors.name = 'Product name is required'
  if (!priceRaw) fieldErrors.price = 'Price is required'
  if (!priority) fieldErrors.priority = 'Priority is required'
  if (!image || !image.size) fieldErrors.image = 'Image is required'
  if (!categoryId && !newCategory) fieldErrors.category = 'Category is required'

  return fieldErrors
}

export function validatePriority(priority: string): string | null {
  if (priority !== 'low' && priority !== 'medium' && priority !== 'high') {
    return 'Priority must be low, medium, or high'
  }
  return null
}

export function parsePriceInCents(
  priceRaw: string
): { priceInCents: number } | { error: string } {
  const priceNumber = Number.parseFloat(priceRaw)
  if (Number.isNaN(priceNumber) || priceNumber < 0) {
    return { error: 'Enter a valid price' }
  }
  return { priceInCents: Math.round(priceNumber * 100) }
}
