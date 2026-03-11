"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ShoppingCart,
  Check,
  X,
  Truck,
  ShieldCheck,
  Clock,
  ArrowRight,
  Package,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase, type Product } from "@/lib/supabase"
import { useCart } from "@/context/CartContext"
import { cn } from "@/lib/utils"

const logoColors = ["#00B4D8", "#E63946", "#7B2CBF", "#2D6A4F", "#F77F00"]

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % logoColors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function fetchProductAndRecommendations() {
      setLoading(true)
      
      // Fetch current product
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()
      
      if (productError || !productData) {
        console.error("Error fetching product:", productError)
        setLoading(false)
        return
      }
      
      setProduct(productData)
      
      // Fetch recommendations (same category, excluding current product)
      const { data: recData, error: recError } = await supabase
        .from("products")
        .select("*")
        .eq("category", productData.category)
        .neq("id", id)
        .limit(4)
      
      if (!recError && recData) {
        setRecommendations(recData)
      }
      
      setLoading(false)
    }

    if (id) {
      fetchProductAndRecommendations()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-4">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Product not found</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          The product you are looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/products">
          <Button className="rounded-full stem-gradient text-white px-8">
            Back to Products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 stem-gradient opacity-10 blur-3xl rounded-full" />
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl">
              <img
                src={product.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000"}
                alt={product.name}
                className="w-full h-full object-contain p-8 hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-md text-xs font-bold border border-gray-100 dark:border-gray-800 shadow-lg">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="px-4 py-2 rounded-full bg-cyan-500 text-white text-xs font-bold shadow-lg">
                    {product.brand}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-black gradient-text">
                  ${product.price?.toFixed(2)}
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1",
                  product.in_stock 
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600" 
                    : "bg-red-100 dark:bg-red-900/30 text-red-600"
                )}>
                  {product.in_stock ? <Check size={14} /> : <X size={14} />}
                  {product.in_stock ? "In Stock" : "Out of Stock"}
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            <div className="grid gap-4 mb-10">
              <Button
                onClick={() => addToCart(product)}
                disabled={!product.in_stock}
                size="lg"
                className="w-full h-16 rounded-full stem-gradient text-white text-lg font-bold shadow-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Cart
              </Button>
              <Link href="/quote">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-16 rounded-full border-2 border-gray-200 dark:border-gray-800 font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Request Custom Quote
                </Button>
              </Link>
            </div>

            {/* Features/Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-10 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center text-cyan-600">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Fast Delivery</h4>
                  <p className="text-xs text-gray-500">Across Zimbabwe</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Genuine Product</h4>
                  <p className="text-xs text-gray-500">Official Warranty</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">24/7 Support</h4>
                  <p className="text-xs text-gray-500">Technical Assistance</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                  <Info size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Expert Advice</h4>
                  <p className="text-xs text-gray-500">Free Consultations</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Specifications */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <div className="flex items-center gap-3 mb-10">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Technical <span className="gradient-text">Specifications</span></h2>
              <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div 
                  key={key}
                  className="flex items-center justify-between p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                >
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{key}</span>
                  <span className="text-sm font-black text-gray-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32"
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Recommended <span className="gradient-text">for You</span></h2>
              <Link href={`/products?category=${product.category}`} className="flex items-center gap-2 text-sm font-bold text-cyan-500 hover:text-cyan-600 transition-colors">
                View All {product.category}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((rec, i) => (
                <Link key={rec.id} href={`/products/${rec.id}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 p-4 shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-4 relative">
                      <img
                        src={rec.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500"}
                        alt={rec.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-cyan-500 transition-colors">
                      {rec.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black gradient-text">
                        ${rec.price?.toFixed(2)}
                      </span>
                      <Button size="icon" className="w-8 h-8 rounded-full stem-gradient text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
