"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Plus, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  priority: "Low" | "Medium" | "High" | "Must Have";
  description: string;
  image: string;
  category: string;
}

const mockData: WishlistItem[] = [
  {
    id: 1,
    title: "Ergonomic Desk Chair",
    price: 299.99,
    priority: "Must Have",
    description:
      "A premium ergonomic office chair with lumbar support, adjustable armrests, and breathable mesh back. Perfect for long work sessions and maintaining good posture throughout the day.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Furniture",
  },
  {
    id: 2,
    title: "Standing Desk Converter",
    price: 189.5,
    priority: "High",
    description:
      "Transform your existing desk into a standing workstation. Features smooth height adjustment, spacious keyboard tray, and can support dual monitors up to 27 inches.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Furniture",
  },
  {
    id: 3,
    title: "Monstera Deliciosa Plant",
    price: 45.0,
    priority: "Medium",
    description:
      "A beautiful large-leafed houseplant that thrives in indoor conditions. Known for its air-purifying qualities and Instagram-worthy aesthetic. Comes in a decorative ceramic pot.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Plants",
  },
  {
    id: 4,
    title: "LED Ring Light",
    price: 79.99,
    priority: "High",
    description:
      "Professional 18-inch LED ring light with adjustable brightness and color temperature. Perfect for video calls, content creation, and eliminating harsh shadows on your face.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Tech",
  },
  {
    id: 5,
    title: "Floating Wall Shelves",
    price: 34.99,
    priority: "Medium",
    description:
      "Set of 3 minimalist floating shelves in natural wood finish. Great for displaying books, plants, or decorative items while keeping your desk surface clean and organized.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Storage",
  },
  {
    id: 6,
    title: "Desk Organizer Set",
    price: 24.99,
    priority: "Low",
    description:
      "Bamboo desk organizer with compartments for pens, paper clips, sticky notes, and other office supplies. Sustainable material with a clean, modern design.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Storage",
  },
  {
    id: 7,
    title: "Abstract Canvas Art",
    price: 89.0,
    priority: "Low",
    description:
      "Modern abstract canvas print in calming blues and grays. Adds personality and visual interest to blank walls. Comes ready to hang with included hardware.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Decor",
  },
  {
    id: 8,
    title: "Wireless Charging Pad",
    price: 39.99,
    priority: "Medium",
    description:
      "Sleek wireless charging station that can charge your phone, earbuds, and smartwatch simultaneously. Features non-slip surface and LED charging indicators.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Tech",
  },
];

const priorityColors = {
  Low: "bg-gray-800 text-gray-300",
  Medium: "bg-blue-950 text-blue-300",
  High: "bg-orange-950 text-orange-300",
  "Must Have": "bg-red-950 text-red-300",
};

export default function HomeOfficeWishlist() {
  const [items, setItems] = useState<WishlistItem[]>(mockData);
  const [sortBy, setSortBy] = useState<string>("priority");
  const [filterBy, setFilterBy] = useState<string>("all");

  const sortedAndFilteredItems = items
    .filter(
      (item) => filterBy === "all" || item.category.toLowerCase() === filterBy
    )
    .sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { "Must Have": 4, High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortBy === "price-low") {
        return a.price - b.price;
      } else if (sortBy === "price-high") {
        return b.price - a.price;
      }
      return 0;
    });

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);
  const highPriorityCount = items.filter(
    (item) => item.priority === "High" || item.priority === "Must Have"
  ).length;

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Home Office Wishlist
          </h1>
          <p className="text-gray-300 mb-4">
            Transform your WFH space into an inspiring workspace
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-between bg-black p-4 rounded-lg shadow-lg border border-gray-800">
            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-medium text-white">{items.length}</span>
                <span className="text-gray-400 ml-1">items</span>
              </div>
              <div>
                <span className="font-medium text-white">
                  ${totalValue.toFixed(2)}
                </span>
                <span className="text-gray-400 ml-1">total value</span>
              </div>
              <div>
                <span className="font-medium text-white">
                  {highPriorityCount}
                </span>
                <span className="text-gray-400 ml-1">high priority</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="plants">Plants</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="decor">Decor</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-blue-600 hover:bg-blue-500">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAndFilteredItems.map((item) => (
            <Card
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-gray-900 border-gray-800 py-0"
              key={item.id}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      className={`${priorityColors[item.priority]} font-medium`}
                    >
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="secondary"
                      className="bg-black/90 text-gray-300"
                    >
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {item.title}
                </CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-100">
                    ${item.price}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedAndFilteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No items found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
