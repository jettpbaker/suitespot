import { DB, ProductWithCategory } from '@/db/queries'
import { formatPrice, formatPriority } from '@/lib/formats'
import Link from 'next/link'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product: ProductWithCategory = await DB.QUERIES.getProductById(
    Number(id)
  )

  return (
    <>
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{formatPrice(product.price)}</p>
        <p>{formatPriority(product.priority)}</p>
        <p>{product.category}</p>
      </div>
      <Link
        href="/"
        className="text-zinc-400 hover:text-zinc-300 transition-colors"
      >
        Back to home
      </Link>
    </>
  )
}
