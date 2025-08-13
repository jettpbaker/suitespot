import ProductsGrid from '@/components/home/ProductsGrid'
import EmptyState from '@/components/home/EmptyState'
import type { FormattedProduct } from '@/types/products'
import { auth } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'

export default async function HomeOfficeWishlist() {
  const { userId } = await auth()

  if (!userId) return <div>Please sign in to continue</div>

  const priorities = ['Low', 'Medium', 'High', 'Must Have'] as const
  const categories = [
    'Desk',
    'Chair',
    'Lighting',
    'Accessories',
    'Storage',
    'Tech',
  ] as const
  const images = [
    '/file.svg',
    '/globe.svg',
    '/next.svg',
    '/window.svg',
    '/vercel.svg',
    '/placeholder.svg',
  ] as const

  const products: FormattedProduct[] = Array.from({ length: 200 }, (_, i) => {
    const id = i + 1
    return {
      id,
      name: `Sample Product ${id}`,
      price: (i % 50) * 10 + 49,
      priority: priorities[i % priorities.length],
      image: images[i % images.length],
      category: categories[i % categories.length],
    }
  })

  return (
    <div className="mx-auto max-w-[200rem] px-16 py-8">
      <ProductsGrid products={products} />

      {products.length === 0 && <EmptyState />}
    </div>
  )
}
