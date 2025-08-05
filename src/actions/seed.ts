'use server'

import { seed } from '../db/seed'

export async function seedAction() {
  await seed()
}
