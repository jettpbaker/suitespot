import ProductsGrid from '@/components/home/ProductsGrid'
import Sidebar from '@/app/(home)/Sidebar'
import { auth, currentUser } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'

export default async function HomeOfficeWishlist() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) return <div>Please sign in to continue</div>

  return (
    <div className="flex h-full">
      <div className="w-1/4 min-w-[200px] max-w-xs">
        <Sidebar user={user} />
      </div>
      <div className="w-3/4 flex-1 min-h-0 overflow-hidden">
        <ProductsGrid userId={userId} />
      </div>
    </div>
  )
}
