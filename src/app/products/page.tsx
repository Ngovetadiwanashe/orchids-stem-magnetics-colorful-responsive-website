"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Grid, List, X, ChevronDown, Package, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase, type Product } from "@/lib/supabase"
import { useCart } from "@/context/CartContext"
import { cn } from "@/lib/utils"
import Link from "next/link"

const logoColors = ["#00B4D8", "#E63946", "#7B2CBF", "#2D6A4F", "#F77F00"]

const categories = [
  "All",
  "Computers",
  "Printers",
  "Consumables",
  "Storage Media",
  "Paper Products",
  "Communication",
  "Network Products",
  "Point of Sale",
  "Power Solutions",
  "Software",
]

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addToCart } = useCart()

  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % logoColors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
      
      if (!error && data) {
        setProducts(data)
        setFilteredProducts(data)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    let result = products

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
      )
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, searchQuery])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === "All") {
      router.push("/products")
    } else {
      router.push(`/products?category=${encodeURIComponent(category)}`)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: logoColors[colorIndex] }}
            animate={{ backgroundColor: logoColors[colorIndex] }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: logoColors[(colorIndex + 2) % logoColors.length] }}
            animate={{ backgroundColor: logoColors[(colorIndex + 2) % logoColors.length] }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="gradient-text">Products</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our comprehensive range of ICT products and solutions
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 h-12 rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden h-12 rounded-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "text-gray-500"
                  )}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "text-gray-500"
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {(showFilters || true) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="hidden md:block mb-8"
              >
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((category, i) => (
                    <motion.button
                      key={category}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleCategoryChange(category)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                        selectedCategory === category
                          ? "text-white shadow-lg"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                      )}
                      style={
                        selectedCategory === category
                          ? { backgroundColor: logoColors[i % logoColors.length] }
                          : {}
                      }
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mb-8"
              >
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, i) => (
                    <button
                      key={category}
                      onClick={() => {
                        handleCategoryChange(category)
                        setShowFilters(false)
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                        selectedCategory === category
                          ? "text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      )}
                      style={
                        selectedCategory === category
                          ? { backgroundColor: logoColors[i % logoColors.length] }
                          : {}
                      }
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Showing {filteredProducts.length} of {products.length} products
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
                />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Package className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className={cn(
                "gap-6",
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "flex flex-col"
              )}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -5 }}
                    className={cn(
                      "group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-xl",
                      viewMode === "list" && "flex"
                    )}
                  >
                      <div
                        className={cn(
                          "relative overflow-hidden bg-gray-100 dark:bg-gray-900",
                          viewMode === "grid" ? "aspect-square" : "w-48 h-48 shrink-0"
                        )}
                      >
                        <Link href={`/products/${product.id}`} className="block w-full h-full">
                          <img
                            src={product.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </Link>
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                          style={{ backgroundColor: logoColors[i % logoColors.length] }}
                        />
                        {product.in_stock ? (
                          <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-green-500 text-white shadow-lg">
                            In Stock
                          </span>
                        ) : (
                          <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-red-500 text-white shadow-lg">
                            Out of Stock
                          </span>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <Link href={`/products/${product.id}`}>
                            <Button className="rounded-full stem-gradient text-white pointer-events-auto shadow-xl">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className={cn("p-5 flex flex-col justify-between", viewMode === "list" && "flex-1")}>
                        <div>
                          <span
                            className="inline-block px-2 py-1 rounded-full text-[10px] font-bold uppercase mb-2"
                            style={{
                              backgroundColor: `${logoColors[categories.indexOf(product.category || "All") % logoColors.length]}20`,
                              color: logoColors[categories.indexOf(product.category || "All") % logoColors.length],
                            }}
                          >
                            {product.category}
                          </span>
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-cyan-500 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        {product.price && (
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-xl font-black gradient-text">
                              ${product.price.toFixed(2)}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => addToCart(product)}
                                disabled={!product.in_stock}
                                size="sm"
                                className="rounded-full stem-gradient text-white h-9 px-4"
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
