"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "../types/product";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.id}`}>
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {discount > 0 && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  -{discount}%
                </span>
              )}
              {product.featured && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Featured
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className="absolute top-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
            >
              <Heart
                size={18}
                className={
                  isLiked
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600 dark:text-gray-400"
                }
              />
            </motion.button>

            {/* Quick Add Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              onClick={handleAddToCart}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-sm font-medium shadow-lg hover:bg-blue-700"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </motion.button>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {product.category}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mt-3">
              {product.inStock ? (
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  In Stock
                </span>
              ) : (
                <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
