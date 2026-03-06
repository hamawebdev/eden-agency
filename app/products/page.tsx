"use client";

import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter((product) => selectedCategory === "all" || product.category === selectedCategory)
    .filter((product) => {
      if (priceRange === "all") return true;
      if (priceRange === "under-1000") return product.price < 1000;
      if (priceRange === "1000-2000") return product.price >= 1000 && product.price <= 2000;
      if (priceRange === "over-2000") return product.price > 2000;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      return 0;
    });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filters Sidebar */}
        <div className="lg:w-64">
          <div className="mb-4 lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full">
              <Filter className="ml-2 h-4 w-4" />
              الفلاتر
            </Button>
          </div>

          <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            {/* Category Filter */}
            <div>
              <h3 className="mb-3 text-xs tracking-widest uppercase">الفئة</h3>
              <div className="space-y-2">
                {["all", "AI", "Editing", "Design"].map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="ml-2"
                    />
                    <span className="capitalize">
                      {category === "all" ? "جميع المنتجات" : category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="mb-3 text-xs tracking-widest uppercase">نطاق السعر</h3>
              <div className="space-y-2">
                {[
                  { value: "all", label: "جميع الأسعار" },
                  { value: "under-1000", label: "أقل من 1000 دينار" },
                  { value: "1000-2000", label: "1000 - 2000 دينار" },
                  { value: "over-2000", label: "أكثر من 2000 دينار" }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value={option.value}
                      checked={priceRange === option.value}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="ml-2"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              المنتجات ({filteredProducts.length})
            </h1>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="focus:ring-primary appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 focus:border-transparent focus:ring-2">
                <option value="featured">المميزة</option>
                <option value="newest">الأحدث</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">لم يتم العثور على منتجات مطابقة.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
