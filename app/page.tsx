"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import Button from "./components/Button";
import { categories } from "./data/products";
import { getProducts } from "./lib/api";
import { Product } from "./types/product";
import {
  ArrowRight,
  TruckIcon,
  ShieldCheck,
  Headphones,
  CreditCard,
} from "lucide-react";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      const response = await getProducts({ featured: true });
      if (response.success && response.data) {
        setFeaturedProducts(response.data);
      }
    }
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Discover Your
                <span className="block bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Perfect Style
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Shop the latest trends in fashion, electronics, and lifestyle.
                Premium quality meets unbeatable prices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop">
                  <Button size="lg">
                    Shop Now
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop"
                  alt="Shopping"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  🎉 50% Off
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Limited Time
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: TruckIcon,
                title: "Free Shipping",
                desc: "On orders over $50",
              },
              {
                icon: ShieldCheck,
                title: "Secure Payment",
                desc: "100% protected",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "Dedicated support",
              },
              {
                icon: CreditCard,
                title: "Easy Returns",
                desc: "30-day guarantee",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <feature.icon
                    className="text-blue-600 dark:text-blue-400"
                    size={28}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Explore our wide range of products
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={`/shop?category=${category.id}`}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-semibold text-lg">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {category.productCount} items
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Hand-picked items just for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Get exclusive deals and updates delivered to your inbox
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button variant="secondary" size="md">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
