"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { Package, CheckCircle } from "lucide-react";

export default function OrdersPage() {
  const orderNumber = "ABC123456";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle
              className="text-green-600 dark:text-green-400"
              size={48}
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Order Placed Successfully!
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Thank you for your purchase. We&apos;ve received your order and will
            process it shortly. You&apos;ll receive a confirmation email with
            tracking information soon.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 max-w-md mx-auto mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Order Number
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              #ORD-{orderNumber}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg">
                <Package size={20} />
                Continue Shopping
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="lg">
                View Profile
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              What happens next?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    1
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Order Confirmation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You&apos;ll receive an email confirmation
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    2
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Order Processing
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We&apos;ll prepare your items for shipping
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    3
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Delivery
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your order will be delivered in 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
