import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { FormattedProduct } from '@/types/products'

const priorityColors = {
  Low: 'bg-white/5 text-zinc-300 ring-1 ring-white/10',
  Medium: 'bg-zinc-200/10 text-zinc-200 ring-1 ring-white/10',
  High: 'bg-zinc-100/15 text-zinc-100 ring-1 ring-white/10',
  'Must Have': 'bg-white/20 text-white ring-1 ring-white/20',
} as const

type ProductsGridProps = {
  products: FormattedProduct[]
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Link href={`/p/${product.id}`} key={product.id}>
          <Card
            key={product.id}
            className="group overflow-hidden border border-white/10 bg-white/5 p-0 backdrop-blur-2xl transition-colors hover:border-white/30 hover:bg-white/8"
          >
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="h-52 w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-full px-2.5 py-1 text-[11px] text-zinc-200 ring-1 ring-white/10 backdrop-blur-sm font-bold"
                  >
                    {product.category || 'Uncategorized'}
                  </Badge>
                </div>
                <div className="absolute right-3 top-3">
                  <Badge
                    className={`rounded-full px-2.5 py-1 text-[11px] ${
                      priorityColors[
                        product.priority as keyof typeof priorityColors
                      ]
                    }`}
                  >
                    {product.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardTitle className="mb-1 line-clamp-2 text-base font-medium tracking-tight text-zinc-100">
                {product.name}
              </CardTitle>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xl font-semibold text-white">
                  ${product.price}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-zinc-300 hover:bg-white/10 hover:text-zinc-100"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
