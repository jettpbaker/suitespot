import {
  pgTable,
  serial,
  text,
  timestamp,
  decimal,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { categories_table } from "./categories";

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const products_table = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  priority: priorityEnum("priority").notNull().default("medium"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  categoryId: integer("category_id").references(() => categories_table.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type ProductsType = typeof products_table.$inferSelect;
