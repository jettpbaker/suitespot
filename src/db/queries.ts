import { db } from './db'
import { categories_table } from './schema/categories'
import { products_table } from './schema/products'
import { eq } from 'drizzle-orm'

export const DB = {
  QUERIES: {
    getProducts: async () => {
      const products = await db
        .select({
          id: products_table.id,
          name: products_table.name,
          priority: products_table.priority,
          price: products_table.price,
          image: products_table.image,
          category: categories_table.name,
        })
        .from(products_table)
        .leftJoin(
          categories_table,
          eq(products_table.categoryId, categories_table.id)
        )
        .orderBy(products_table.id)
      return products
    },
    getProductById: async (id: number) => {
      const product = await db
        .select({
          id: products_table.id,
          name: products_table.name,
          description: products_table.description,
          priority: products_table.priority,
          price: products_table.price,
          image: products_table.image,
          category: categories_table.name,
        })
        .from(products_table)
        .leftJoin(
          categories_table,
          eq(products_table.categoryId, categories_table.id)
        )
        .where(eq(products_table.id, id))
      return product[0]
    },
  },

  MUTATIONS: {},
}

export type ProductsWithCategory = Awaited<
  ReturnType<typeof DB.QUERIES.getProducts>
>

export type ProductWithCategory = Awaited<
  ReturnType<typeof DB.QUERIES.getProductById>
>
