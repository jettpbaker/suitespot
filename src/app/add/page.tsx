import AddProductClient from '@/app/add/AddProductClient'
import { DB } from '@/db/queries'
import { auth } from '@clerk/nextjs/server'

export default async function AddProduct() {
  const categories = await DB.QUERIES.getCategories()
  const { userId } = await auth()
  if (!userId) return <div>Please sign in to continue</div>

  return <AddProductClient categories={categories} ownerId={userId} />
}
