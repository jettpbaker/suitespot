'use server'

import { DB } from '@/db/queries'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

type ActionState =
  | {
      error: string
      success?: undefined
    }
  | {
      success: string
      error?: undefined
    }
  | null

export default async function deleteProduct(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { userId } = await auth()

  if (!userId) {
    return { error: 'You must be signed in to delete products' }
  }

  const productId = formData.get('productId')

  if (!productId || typeof productId !== 'string') {
    return { error: 'Product ID is required' }
  }

  try {
    await DB.MUTATIONS.deleteProduct(Number(productId))
    revalidatePath('/')
    return { success: 'Product deleted successfully' }
  } catch (err) {
    console.error('Delete product failed:', err)
    return { error: 'Failed to delete product. Please try again.' }
  }
}
