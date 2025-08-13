import { db } from './db'
import { categories_table, CategoriesType } from './schema/categories'
import { products_table, ProductsInsertType } from './schema/products'
import { eq } from 'drizzle-orm'

export const DB = {
  QUERIES: {
    getProductsForUser: async (userId: string) => {
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
        .where(eq(products_table.ownerId, userId))
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
    getCategories: async () => {
      const categories = await db.select().from(categories_table)
      return categories
    },
  },

  MUTATIONS: {
    createProduct: async (product: ProductsInsertType) => {
      const [newProduct] = await db
        .insert(products_table)
        .values(product)
        .returning()
      return newProduct
    },
    createCategory: async (name: string): Promise<CategoriesType> => {
      const [category] = await db
        .insert(categories_table)
        .values({ name })
        .returning()
      return category
    },
  },
}

export type ProductsWithCategory = Awaited<
  ReturnType<typeof DB.QUERIES.getProductsForUser>
>

export type ProductWithCategory = Awaited<
  ReturnType<typeof DB.QUERIES.getProductById>
>
