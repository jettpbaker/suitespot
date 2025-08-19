import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { FormattedProduct } from '@/types/products'
import DeleteCard from './DeleteCard'
import { formatPrice, formatPriority } from '@/lib/formats'
import { cn } from '@/lib/utils'

const getPriorityStyles = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'low':
      return 'bg-green-500/20 text-green-100 ring-1 ring-green-400/30'
    case 'medium':
      return 'bg-orange-500/20 text-orange-100 ring-1 ring-orange-400/30'
    case 'high':
      return 'bg-red-500/20 text-red-100 ring-1 ring-red-400/30'
    default:
      return 'bg-zinc-500/20 text-zinc-100 ring-1 ring-zinc-400/30'
  }
}

type ProductCardProps = {
  product: FormattedProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/p/${product.id}`} className="w-full">
      <Card className="group overflow-hidden border border-white/10 bg-white/5 p-0 backdrop-blur-2xl transition-colors hover:border-white/30 hover:bg-white/8 h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={product.width}
              height={product.height}
              className="sm:h-52 lg:h-60 xl:h-68 2xl:h-76 w-full object-cover object-center"
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
                className={cn(
                  'rounded-full px-2.5 py-1 text-[11px] backdrop-blur-sm font-bold',
                  getPriorityStyles(product.priority)
                )}
              >
                {formatPriority(product.priority)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-between">
          <CardTitle className="mb-1 line-clamp-2 text-base font-medium tracking-tight text-zinc-100">
            {product.name}
          </CardTitle>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xl font-semibold text-white">
              ${formatPrice(product.price)}
            </span>
            <DeleteCard productId={product.id} imageUrl={product.image} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
