import ProductCard from '@/components/home/ProductCard'
import { DB } from '@/db/queries'
import EmptyState from '@/components/home/EmptyState'
import FloatingAddButton from '@/components/home/FloatingAddButton'
import type { FormattedProduct } from '@/types/products'

export default async function ProductsGrid({ userId }: { userId: string }) {
  if (!userId) return <div>Please sign in to continue</div>

  const products = await DB.QUERIES.getProductsForUser(userId)

  const sampleImages = [
    '/placeholder.svg',
    '/file.svg',
    '/globe.svg',
    '/next.svg',
    '/vercel.svg',
    '/window.svg',
  ]

  const generateDummyProducts = (
    count: number,
    startingId = 100000
  ): FormattedProduct[] => {
    const priorities = ['low', 'medium', 'high'] as const
    const categories = [
      'Office',
      'Home',
      'Electronics',
      'Books',
      'Outdoors',
      null,
    ]

    return Array.from({ length: count }).map((_, i) => {
      const idx = i
      return {
        id: startingId + idx,
        name: `Sample Product ${idx + 1}`,
        price: Math.floor(Math.random() * 490) + 10,
        priority: priorities[idx % priorities.length],
        image: sampleImages[idx % sampleImages.length],
        width: 1200,
        height: 800,
        category: categories[idx % categories.length],
      }
    })
  }

  const needed = Math.max(0, 50 - products.length)
  const dummyProducts = needed > 0 ? generateDummyProducts(needed) : []
  const allProducts: FormattedProduct[] = [...products, ...dummyProducts]

  return (
    <div className="relative w-full h-full p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {allProducts.length === 0 && <EmptyState />}

        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <FloatingAddButton />
    </div>
  )
}
