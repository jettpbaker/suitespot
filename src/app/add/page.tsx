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
import { ArrowLeft } from 'lucide-react'

export default function AddProduct() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link
        href="/"
        className="text-sm text-gray-400 hover:text-gray-300 mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Wishlist
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Fill out the form below to add a new product to your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  className="min-h-20 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="picture">Upload Image</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="text-gray-400"
                />
                <p className="text-sm text-muted-foreground">Choose an image</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product Details</h3>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Category</h3>
              <Tabs defaultValue="existing" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="existing">Existing Category</TabsTrigger>
                  <TabsTrigger value="new">Create New Category</TabsTrigger>
                </TabsList>
                <TabsContent value="existing" className="space-y-2">
                  <Label htmlFor="existing-category">Select Category</Label>
                  <Select>
                    <SelectTrigger id="existing-category">
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                    </SelectContent>
                  </Select>
                </TabsContent>
                <TabsContent value="new" className="space-y-2">
                  <Label htmlFor="new-category">New Category Name</Label>
                  <Input
                    id="new-category"
                    type="text"
                    placeholder="Enter new category name"
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full">
                Add Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
