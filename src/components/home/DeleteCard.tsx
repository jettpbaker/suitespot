'use client'

import { useActionState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import deleteProduct from '@/actions/delete-product'

export default function DeleteCard({
  productId,
  imageUrl,
}: {
  productId: number
  imageUrl: string
}) {
  const [state, formAction, isPending] = useActionState(deleteProduct, null)

  return (
    <form action={formAction} onClick={(e) => e.stopPropagation()}>
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="imageUrl" value={imageUrl} />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="h-12 w-12 rounded-full text-zinc-300 hover:bg-red-500/20 hover:text-red-400 cursor-pointer disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </form>
  )
}
