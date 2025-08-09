'use server'

import { put } from '@vercel/blob'
import { env } from '@/env'
import { DB } from '@/db/queries'
import { revalidatePath } from 'next/cache'

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
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = (formData.get('name') ?? '').toString().trim()
  const description = (formData.get('description') ?? '').toString().trim()
  const priceRaw = (formData.get('price') ?? '').toString().trim()
  const priority = (formData.get('priority') ?? '').toString().trim()
  let categoryId = (formData.get('categoryId') ?? '').toString().trim()
  const newCategory = (formData.get('new-category') ?? '').toString().trim()
  const image = formData.get('image') as File | null

  const fieldErrors: FieldErrors = {}

  if (!name) fieldErrors.name = 'Product name is required'
  if (!priceRaw) fieldErrors.price = 'Price is required'
  if (!priority) fieldErrors.priority = 'Priority is required'
  if (!image || !image.size) fieldErrors.image = 'Image is required'
  if (!categoryId && !newCategory) fieldErrors.category = 'Category is required'

  if (Object.keys(fieldErrors).length > 0) {
    return {
      error: 'Please fix the errors below',
      fieldErrors,
    }
  }

  if (priority !== 'low' && priority !== 'medium' && priority !== 'high') {
    return {
      error: 'Please fix the errors below',
      fieldErrors: { priority: 'Priority must be low, medium, or high' },
    }
  }

  const priceNumber = Number.parseFloat(priceRaw)
  if (Number.isNaN(priceNumber) || priceNumber < 0) {
    return {
      error: 'Please fix the errors below',
      fieldErrors: { price: 'Enter a valid price' },
    }
  }
  const priceInCents = Math.round(priceNumber * 100)

  if (newCategory && !categoryId) {
    const newCategoryId = await DB.MUTATIONS.createCategory(newCategory)
    categoryId = newCategoryId.id.toString()
  }

  console.log('Trying to upload image...')
  try {
    const fileToUpload = image as File
    const uploadKey = `products/${Date.now()}-${fileToUpload.name}`
    const blob = await put(uploadKey, fileToUpload, {
      access: 'public',
      contentType: fileToUpload.type || 'application/octet-stream',
      addRandomSuffix: true,
      token: env.BLOB_READ_WRITE_TOKEN,
    })
    console.log(blob)

    await DB.MUTATIONS.createProduct({
      name,
      description,
      priority,
      price: priceInCents,
      image: blob.url,
      categoryId: Number(categoryId),
    })

    await revalidatePath('/')
    return { success: 'Product created successfully' }
  } catch (err) {
    console.error('Create product failed:', err)
    return {
      error:
        'Something went wrong while uploading the image or saving the product. Please try again.',
    }
  }
}
