import { put } from '@vercel/blob'
import { env } from '@/env'

export type UploadedBlob = {
  url: string
}

export async function uploadProductImage(file: File): Promise<UploadedBlob> {
  const uploadKey = `products/${Date.now()}-${file.name}`
  const blob = await put(uploadKey, file, {
    access: 'public',
    contentType: file.type || 'application/octet-stream',
    addRandomSuffix: true,
    token: env.BLOB_READ_WRITE_TOKEN,
  })
  return { url: blob.url }
}
