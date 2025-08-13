import {
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
  integer,
} from 'drizzle-orm/pg-core'
import { categories_table } from './categories'

export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high'])

export const products_table = pgTable('products', {
  id: serial('id').primaryKey(),
  ownerId: text('owner_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  url: text('url').notNull(),
  priority: priorityEnum('priority').notNull().default('medium'),
  price: integer('price').notNull(),
  image: text('image').notNull(),
  categoryId: integer('category_id')
    .references(() => categories_table.id)
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type ProductsType = typeof products_table.$inferSelect
export type ProductsInsertType = typeof products_table.$inferInsert
