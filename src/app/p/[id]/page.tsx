import { DB, ProductWithCategory } from '@/db/queries'
import { formatPrice, formatPriority } from '@/lib/formats'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

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
    <div
      className="w-full flex flex-col lg:flex-row overflow-hidden"
      style={{ height: `calc(100vh - 93px)` }}
    >
      <div className="relative w-full lg:w-1/2 h-80 lg:h-full border-b lg:border-b-0 lg:border-r border-white/10">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          width={product.width}
          height={product.height}
          className="object-cover h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="w-full lg:w-1/2 p-6 overflow-y-auto">
        <div className="mb-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            ← Back to home
          </Link>
        </div>

        <div className="flex items-start justify-between gap-6">
          {product.url ? (
            <Link
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                {product.name}
              </h1>
            </Link>
          ) : (
            <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              {product.name}
            </h1>
          )}
          <div className="text-2xl md:text-3xl font-bold text-white">
            ${formatPrice(product.price)}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2 h-6">
          <p className="text-zinc-400">{product.category || 'Uncategorized'}</p>
          <Separator orientation="vertical" className="bg-zinc-400" />
          <p className="text-zinc-400">{formatPriority(product.priority)}</p>
        </div>

        <div className="mt-4 max-w-1/3">
          <p className="text-zinc-400 leading-relaxed">
            {product.description || 'No description provided.'}
          </p>
        </div>
      </div>
    </div>
  )
}
