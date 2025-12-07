"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/products";
import { getProducts } from "../lib/api";
import { Product } from "../types/product";
import { Filter, X } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      const response = await getProducts();
      console.log("API Response:", response);
      console.log("Response.data length:", response.data?.length);
      console.log("Response.success:", response.success);
      if (response.success && response.data) {
        console.log("Setting products:", response.data);
        setProducts(response.data);
      } else {
        console.log("Error or no data:", response.error);
        setError(response.error || "Failed to load products");
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    console.log("Original products array:", products);
    console.log("Products length:", products.length);
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    console.log("After category filter:", filtered.length);

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    console.log("After price filter:", filtered.length);
    console.log("Price range:", priceRange);

    // Sort products
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured products first
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    console.log("Final sorted products:", sorted.length);
    return sorted;
  }, [products, selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Shop All Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <Filter size={20} />
            Filters
          </button>

          {/* Sidebar Filters */}
          <motion.aside
            initial={false}
            animate={{
              x: showFilters ? 0 : -400,
              opacity: showFilters ? 1 : 0,
            }}
            className={`${
              showFilters ? "fixed" : "hidden"
            } lg:relative lg:block inset-0 lg:inset-auto z-40 lg:z-auto w-72 shrink-0`}
          >
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg lg:shadow-none h-full lg:h-auto overflow-y-auto">
              {/* Close button for mobile */}
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden absolute top-4 right-4 p-2"
              >
                <X size={24} />
              </button>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Filters
              </h2>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Category
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === "all"}
                      onChange={() => setSelectedCategory("all")}
                      className="mr-3"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      All Products
                    </span>
                  </label>
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="mr-3"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {cat.name} ({cat.productCount})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 2000]);
                  setSortBy("featured");
                }}
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </motion.aside>

          {/* Overlay for mobile */}
          {showFilters && (
            <div
              onClick={() => setShowFilters(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
            />
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="mb-6 flex justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Loading products...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-xl text-red-600 dark:text-red-400 mb-4">
                  Error loading products
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {error}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Make sure the backend server is running on port 5001
                </p>
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No products found matching your filters.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                  Debug: Total products loaded: {products.length}, Filtered:{" "}
                  {filteredAndSortedProducts.length}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Category: {selectedCategory}, Price range: ${priceRange[0]} -
                  ${priceRange[1]}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
