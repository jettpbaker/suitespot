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
  Low: "bg-white/5 text-zinc-300 ring-1 ring-white/10",
  Medium: "bg-zinc-200/10 text-zinc-200 ring-1 ring-white/10",
  High: "bg-zinc-100/15 text-zinc-100 ring-1 ring-white/10",
  "Must Have": "bg-white/20 text-white ring-1 ring-white/20",
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
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-zinc-950 text-zinc-100">
      {/* Soft vignette */}
      <div className="pointer-events-none fixed inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]" />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Top Bar */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl">
          <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Home Office Wishlist
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                Transform your WFH space into an inspiring workspace
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                <div className="text-sm">
                  <span className="font-medium text-white">{items.length}</span>
                  <span className="ml-1 text-zinc-400">items</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="text-sm">
                  <span className="font-medium text-white">
                    ${totalValue.toFixed(2)}
                  </span>
                  <span className="ml-1 text-zinc-400">total</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="text-sm">
                  <span className="font-medium text-white">
                    {highPriorityCount}
                  </span>
                  <span className="ml-1 text-zinc-400">high priority</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-36 rounded-xl border-white/10 bg-white/5 text-zinc-200 backdrop-blur-xl hover:bg-white/10">
                    <Filter className="mr-2 h-4 w-4 text-zinc-400" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-xl">
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="plants">Plants</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                    <SelectItem value="decor">Decor</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 rounded-xl border-white/10 bg-white/5 text-zinc-200 backdrop-blur-xl hover:bg-white/10">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-xl">
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button className="rounded-xl bg-white/10 px-3 text-sm text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-xl transition-colors hover:bg-white/15">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedAndFilteredItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="h-44 w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-zinc-200 ring-1 ring-white/10 backdrop-blur-md"
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <div className="absolute right-3 top-3">
                    <Badge
                      className={`rounded-full px-2.5 py-1 text-[11px] ${
                        priorityColors[item.priority]
                      }`}
                    >
                      {item.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-1 line-clamp-2 text-base font-medium tracking-tight text-zinc-100">
                  {item.title}
                </CardTitle>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xl font-semibold text-white">
                    ${item.price}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-zinc-300 hover:bg-white/10 hover:text-zinc-100"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedAndFilteredItems.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-zinc-400">
              No items found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
