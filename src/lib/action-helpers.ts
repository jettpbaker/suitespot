import type { FieldErrors as ProductFieldErrors } from '@/lib/product-validation'

export type ActionState =
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

export function fieldErrorResponse(
  fieldErrors: ProductFieldErrors
): ActionState {
  return {
    error: 'Please fix the errors below',
    fieldErrors,
  }
}
