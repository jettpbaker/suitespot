'use server'

import { DB } from '@/db/queries'
import { revalidatePath } from 'next/cache'
import type { FieldErrors as ProductFieldErrors } from '@/lib/product-validation'
import {
  parsePriceInCents,
  validatePriority,
  validateRequiredFields,
} from '@/lib/product-validation'
import { resolveCategoryId } from '@/lib/category'
import { uploadProductImage } from '@/lib/image-upload'
import { extractProductFormData } from '@/lib/product-form'
import { fieldErrorResponse } from '@/lib/action-helpers'

type ActionState =
  | {
      error: string
      fieldErrors?: ProductFieldErrors
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
  const {
    ownerId,
    name,
    description,
    priceRaw,
    priority,
    categoryId: rawCategoryId,
    newCategory,
    image,
    url,
  } = extractProductFormData(formData)
  let categoryId = rawCategoryId

  const fieldErrors: ProductFieldErrors = validateRequiredFields({
    name,
    priceRaw,
    priority,
    image,
    categoryId,
    newCategory,
    url,
  })

  if (Object.keys(fieldErrors).length > 0) {
    return fieldErrorResponse(fieldErrors)
  }

  const priorityError = validatePriority(priority)
  if (priorityError) {
    return {
      error: 'Please fix the errors below',
      fieldErrors: { priority: priorityError },
    }
  }

  const priceParsed = parsePriceInCents(priceRaw)
  if ('error' in priceParsed) {
    return fieldErrorResponse({ price: priceParsed.error })
  }
  const priceInCents = priceParsed.priceInCents

  categoryId = await resolveCategoryId(categoryId, newCategory)

  try {
    const fileToUpload = image as File
    const blob = await uploadProductImage(fileToUpload)

    await DB.MUTATIONS.createProduct({
      ownerId,
      name,
      description,
      url,
      priority: priority as 'low' | 'medium' | 'high',
      price: priceInCents,
      image: blob.url,
      categoryId: Number(categoryId),
    })

    revalidatePath('/')
    return { success: 'Product created successfully' }
  } catch (err) {
    console.error('Create product failed:', err)
    return {
      error:
        'Something went wrong while uploading the image or saving the product. Please try again.',
    }
  }
}
