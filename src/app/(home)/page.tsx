import ProductsGrid from '@/components/home/ProductsGrid'
import { auth, currentUser } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'

export default async function HomeOfficeWishlist() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) return <div>Please sign in to continue</div>

  return (
    <div className="flex h-full w-full">
      <ProductsGrid userId={userId} />
    </div>
  )
}
