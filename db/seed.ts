import { db } from './db'
import { categories_table, CategoriesInsertType } from './schema/categories'
import { products_table, ProductsInsertType } from './schema/products'

const categories: CategoriesInsertType[] = [
  { name: 'Furniture' },
  { name: 'Lighting' },
  { name: 'Decor' },
]

const products: ProductsInsertType[] = [
  {
    name: 'Ergonomic Desk Chair',
    price: 29999,
    priority: 'high',
    description:
      'A premium ergonomic office chair with lumbar support, adjustable armrests, and breathable mesh back. Perfect for long work sessions and maintaining good posture throughout the day.',
    image: '/placeholder.svg?height=300&width=300',
    categoryId: 1,
  },
  {
    name: 'Standing Desk Converter',
    price: 18950,
    priority: 'high',
    description:
      'Transform your existing desk into a standing workstation. Features smooth height adjustment, spacious keyboard tray, and can support dual monitors up to 27 inches.',
    image: '/placeholder.svg?height=300&width=300',
    categoryId: 1,
  },
  {
    name: 'Monstera Deliciosa Plant',
    price: 4500,
    priority: 'medium',
    description:
      'A beautiful large-leafed houseplant that thrives in indoor conditions. Known for its air-purifying qualities and Instagram-worthy aesthetic. Comes in a decorative ceramic pot.',
    image: '/placeholder.svg?height=300&width=300',
    categoryId: 3,
  },
  {
    name: 'LED Ring Light',
    price: 7999,
    priority: 'high',
    description:
      'Professional 18-inch LED ring light with adjustable brightness and color temperature. Perfect for video calls, content creation, and eliminating harsh shadows on your face.',
    image: '/placeholder.svg?height=300&width=300',
    categoryId: 2,
  },
  {
    name: 'Floating Wall Shelves',
    price: 3499,
    priority: 'medium',
    description:
      'Set of 3 minimalist floating shelves in natural wood finish. Great for displaying books, plants, or decorative items while keeping your desk surface clean and organized.',
    image: '/placeholder.svg?height=300&width=300',
    categoryId: 3,
  },
  {
    name: 'Desk Organizer Set',
    price: 2499,
    priority: 'low',
    description:
      'Bamboo desk organizer with compartments for pens, paper clips, sticky notes, and other office supplies. Sustainable material with a clean, modern design.',
    image: '/placeholder.svg?height=300&width=300',
    categoryId: 1,
  },
  {
    name: 'Abstract Canvas Art',
    price: 8900,
    priority: 'low',
    description:
      'Modern abstract canvas print in calming blues and grays. Adds personality and visual interest to blank walls. Comes ready to hang with included hardware.',
    image: '/placeholder.svg?height=300&width=300',
    categoryId: 3,
  },
  {
    name: 'Wireless Charging Pad',
    price: 3999,
    priority: 'medium',
    description:
      'Sleek wireless charging station that can charge your phone, earbuds, and smartwatch simultaneously. Features non-slip surface and LED charging indicators.',
    image: '/placeholder.svg?height=300&width=300',
    categoryId: 2,
  },
]

export async function seed() {
  try {
    console.log('Seeding categories...')
    const insertedCategories = await db
      .insert(categories_table)
      .values(categories)
      .returning()
    console.log(`Inserted ${insertedCategories.length} categories`)

    console.log('Seeding products...')
    const insertedProducts = await db
      .insert(products_table)
      .values(products)
      .returning()
    console.log(`Inserted ${insertedProducts.length} products`)

    console.log('Seeding complete!')
  } catch (error) {
    console.error('Seeding failed:', error)
    throw error
  }
}
