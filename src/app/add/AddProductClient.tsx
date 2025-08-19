'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Loader2 } from 'lucide-react'
import createProduct from '@/actions/create-product'
import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Category = { id: number; name: string }

export default function AddProductClient({
  categories,
  ownerId,
}: {
  categories: Category[]
  ownerId: string
}) {
  const [state, formAction, pending] = useActionState(createProduct, null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      router.push('/')
    }
  }, [state?.success, router])

  return (
    <div
      className="max-w-2xl mx-auto p-6"
      style={{ height: `calc(100vh - 93px)` }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Fill out the form below to add a new product to your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <input type="hidden" name="ownerId" value={ownerId} />
            {/* Basic Information */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="name" className="block mb-2">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter product name"
                    className={state?.fieldErrors?.name ? 'border-white' : ''}
                  />
                  <p className="text-sm text-white min-h-[1.25rem]">
                    {state?.fieldErrors?.name || ''}
                  </p>
                </div>
                <div>
                  <Label htmlFor="price" className="block mb-2">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={state?.fieldErrors?.price ? 'border-white' : ''}
                  />
                  <p className="text-sm text-white min-h-[1.25rem]">
                    {state?.fieldErrors?.price || ''}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="description" className="block mb-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  className="min-h-20 resize-none"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="url" className="block mb-2">
                  URL
                </Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="Enter product URL"
                  className={state?.fieldErrors?.url ? 'border-white' : ''}
                />
                <p className="text-sm text-white min-h-[1.25rem]">
                  {state?.fieldErrors?.url || ''}
                </p>
              </div>
              <div>
                <Label htmlFor="picture" className="block mb-2">
                  Upload Image
                </Label>
                <Input
                  id="picture"
                  name="image"
                  type="file"
                  accept="image/*"
                  className={state?.fieldErrors?.image ? 'border-white' : ''}
                />
                <p className="text-sm text-gray-400 min-h-[1.25rem]">
                  Max 4.5MB
                </p>
                <p className="text-sm text-white min-h-[1.25rem]">
                  {state?.fieldErrors?.image || ''}
                </p>
              </div>
            </div>

            {/* Product Details */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Product Details</h3>
              <div>
                <Label htmlFor="priority" className="block mb-2">
                  Priority
                </Label>
                <div className="w-1/2">
                  <Select name="priority">
                    <SelectTrigger
                      id="priority"
                      className={`w-full ${
                        state?.fieldErrors?.priority ? 'border-white' : ''
                      }`}
                    >
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-white min-h-[1.25rem]">
                  {state?.fieldErrors?.priority || ''}
                </p>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <h3 className="text-lg font-medium mb-2">Category</h3>
              <Tabs defaultValue="existing" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="existing">Existing Category</TabsTrigger>
                  <TabsTrigger value="new">Create New Category</TabsTrigger>
                </TabsList>
                <TabsContent value="existing">
                  <Label htmlFor="existing-category" className="block mb-2">
                    Select Category
                  </Label>
                  <div className="w-1/2">
                    <Select name="categoryId">
                      <SelectTrigger
                        id="existing-category"
                        className={`w-full ${
                          state?.fieldErrors?.category ? ' border-white' : ''
                        }`}
                      >
                        <SelectValue placeholder="Choose a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                <TabsContent value="new">
                  <Label htmlFor="new-category" className="block mb-2">
                    New Category Name
                  </Label>
                  <Input
                    id="new-category"
                    name="new-category"
                    type="text"
                    placeholder="Enter new category name"
                    className={
                      state?.fieldErrors?.category ? 'border-white' : ''
                    }
                  />
                </TabsContent>
              </Tabs>
              <p className="text-sm text-white min-h-[1.25rem]">
                {state?.fieldErrors?.category || ''}
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={pending}>
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {pending ? 'Adding Product...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
