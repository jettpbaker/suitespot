import AddProductClient from '@/app/add/AddProductClient'
import { DB } from '@/db/queries'

export default async function AddProduct() {
  const categories = await DB.QUERIES.getCategories()
  return <AddProductClient categories={categories} />
}
