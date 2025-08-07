'use server'

type FieldErrors = {
  name?: string
  price?: string
  priority?: string
  category?: string
  image?: string
}

type ActionState =
  | {
      error: string
      fieldErrors?: FieldErrors
      success?: undefined
    }
  | {
      success: string
      error?: undefined
      fieldErrors?: undefined
    }
  | null

export default async function createProduct(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { name, description, price, priority, category, new_category } =
    Object.fromEntries(formData)
  const image = formData.get('image') as File

  console.log(name, description, price, image, priority, category, new_category)

  const fieldErrors: FieldErrors = {}

  // Check required fields individually
  if (!name) {
    fieldErrors.name = 'Product name is required'
  }

  if (!price) {
    fieldErrors.price = 'Price is required'
  }

  if (!image || !image.size) {
    fieldErrors.image = 'Image is required'
  }

  if (!priority) {
    fieldErrors.priority = 'Priority is required'
  }

  if (!category && !new_category) {
    fieldErrors.category = 'Please select a category or create a new one'
  }

  // If there are any field errors, return them
  if (Object.keys(fieldErrors).length > 0) {
    return {
      error: 'Please fix the errors below',
      fieldErrors,
    }
  }

  console.log(name, description, price, image, priority, category, new_category)

  return { success: 'Product created successfully' }
}
