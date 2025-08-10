import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Plus, Filter } from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DB, ProductsWithCategory } from '@/db/queries'
import { formatPrice, formatPriority } from '@/lib/formats'

const priorityColors = {
  Low: 'bg-white/5 text-zinc-300 ring-1 ring-white/10',
  Medium: 'bg-zinc-200/10 text-zinc-200 ring-1 ring-white/10',
  High: 'bg-zinc-100/15 text-zinc-100 ring-1 ring-white/10',
  'Must Have': 'bg-white/20 text-white ring-1 ring-white/20',
}

export const dynamic = 'force-dynamic'

export default async function HomeOfficeWishlist() {
  const productData: ProductsWithCategory = await DB.QUERIES.getProducts()

  const products = productData.map((product) => ({
    ...product,
    price: formatPrice(product.price),
    priority: formatPriority(product.priority),
  }))

  const totalValue = products.reduce((sum, product) => sum + product.price, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Top Bar */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl">
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Home Office Wishlist
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Transform your WFH space into an inspiring workspace
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <div className="text-sm">
                <span className="font-medium text-white">
                  {products.length}
                </span>
                <span className="ml-1 text-zinc-400">items</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="text-sm">
                <span className="font-medium text-white">
                  ${totalValue.toFixed(2)}
                </span>
                <span className="ml-1 text-zinc-400">total</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-36 rounded-xl border-white/10 bg-white/5 text-zinc-200 backdrop-blur-xl hover:bg-white/10">
                  <Filter className="mr-2 h-4 w-4 text-zinc-400" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-xl">
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="plants">Plants</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="decor">Decor</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-40 rounded-xl border-white/10 bg-white/5 text-zinc-200 backdrop-blur-xl hover:bg-white/10">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-xl">
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Link href="/add">
                <Button className="rounded-xl bg-white/10 px-3 text-sm text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-xl transition-colors hover:bg-white/15">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
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

      {products.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-zinc-400">No items found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
