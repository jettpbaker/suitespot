import ProductCard from '@/components/home/ProductCard'
import { DB } from '@/db/queries'
import EmptyState from '@/components/home/EmptyState'
import FloatingAddButton from '@/components/home/FloatingAddButton'

export default async function ProductsGrid({ userId }: { userId: string }) {
  if (!userId) return <div>Please sign in to continue</div>

  const products = await DB.QUERIES.getProductsForUser(userId)

  return (
    <div className="relative w-full h-full p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {products.length === 0 && <EmptyState />}

        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <FloatingAddButton />
    </div>
  )
}
