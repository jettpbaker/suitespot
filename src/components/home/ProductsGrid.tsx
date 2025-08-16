import type { FormattedProduct } from '@/types/products'
import ProductCard from '@/components/home/ProductCard'

type ProductsGridProps = {
  products: FormattedProduct[]
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
