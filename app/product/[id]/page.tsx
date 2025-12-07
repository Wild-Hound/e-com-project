"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import Button from "../../components/Button";
import { getProductById, getProducts } from "../../lib/api";
import { Product } from "../../types/product";
import { useCart } from "../../context/CartContext";
import {
  Star,
  ShoppingCart,
  Heart,
  Check,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!params.id) return;

      setLoading(true);
      const response = await getProductById(params.id as string);

      if (response.success && response.data) {
        setProduct(response.data);

        // Fetch related products
        const relatedResponse = await getProducts({
          category: response.data.category,
        });
        if (relatedResponse.success && relatedResponse.data) {
          const related = relatedResponse.data
            .filter((p: Product) => p.id !== response.data.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      }
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Loading product...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h1>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/shop"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Shop
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4"
            >
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.originalPrice && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Heart
                  size={24}
                  className={
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600 dark:text-gray-400"
                  }
                />
              </button>
            </motion.div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "ring-2 ring-blue-600"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 dark:text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <Check
                      className="text-green-600 dark:text-green-400"
                      size={20}
                    />
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      In Stock
                    </span>
                  </>
                ) : (
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="px-6 text-lg font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Total: ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addedToCart}
                  size="lg"
                  fullWidth
                >
                  {addedToCart ? (
                    <>
                      <Check size={20} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>

              {/* Features */}
              <div className="space-y-4 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center gap-3">
                  <Truck
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Free Shipping
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      On orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Secure Payment
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      100% secure transactions
                    </p>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Specifications
                  </h3>
                  <dl className="space-y-3">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2"
                        >
                          <dt className="font-medium text-gray-600 dark:text-gray-400">
                            {key}
                          </dt>
                          <dd className="text-gray-900 dark:text-white">
                            {value}
                          </dd>
                        </div>
                      )
                    )}
                  </dl>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
