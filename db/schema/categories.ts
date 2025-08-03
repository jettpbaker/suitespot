import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const categories_table = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type CategoriesType = typeof categories_table.$inferSelect;
