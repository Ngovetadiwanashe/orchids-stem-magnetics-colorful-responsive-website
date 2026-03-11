"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  Search,
  LogOut,
  X,
  Save,
  Image as ImageIcon,
  DollarSign,
  Tag,
  FileText,
  Check,
  Megaphone,
  ToggleLeft,
  ToggleRight,
  Percent,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase, type Product } from "@/lib/supabase"

type Promotion = {
  id: string
  title: string
  description: string
  image_url: string
  badge_text: string
  original_price: number | null
  promo_price: number | null
  is_active: boolean
  created_at: string
}
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const logoColors = ["#00B4D8", "#E63946", "#7B2CBF", "#2D6A4F", "#F77F00"]

const categories = [
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

type ProductFormData = {
  name: string
  description: string
  category: string
  image_url: string
  price: string
  in_stock: boolean
}

type PromotionFormData = {
  title: string
  description: string
  image_url: string
  badge_text: string
  original_price: string
  promo_price: string
  is_active: boolean
}

const initialFormData: ProductFormData = {
  name: "",
  description: "",
  category: "Computers",
  image_url: "",
  price: "",
  in_stock: true,
}

const initialPromoFormData: PromotionFormData = {
  title: "",
  description: "",
  image_url: "",
  badge_text: "SALE",
  original_price: "",
  promo_price: "",
  is_active: true,
}

type ActiveTab = "products" | "promotions"

export default function AdminDashboard() {
  const [colorIndex, setColorIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<ActiveTab>("products")

  // Products state
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<ProductFormData>(initialFormData)
  const [saving, setSaving] = useState(false)

  // Promotions state
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [promoLoading, setPromoLoading] = useState(false)
  const [showPromoModal, setShowPromoModal] = useState(false)
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null)
  const [promoFormData, setPromoFormData] = useState<PromotionFormData>(initialPromoFormData)
  const [promoSaving, setPromoSaving] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % logoColors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("stem_admin_logged_in")
    if (isLoggedIn !== "true") {
      router.push("/admin")
      return
    }
    fetchProducts()
    fetchPromotions()
  }, [router])

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      setFilteredProducts(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.category?.toLowerCase().includes(query)
        )
      )
    } else {
      setFilteredProducts(products)
    }
  }, [products, searchQuery])

  async function fetchProducts() {
    setLoading(true)
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
    if (data) {
      setProducts(data)
      setFilteredProducts(data)
    }
    setLoading(false)
  }

  async function fetchPromotions() {
    setPromoLoading(true)
    try {
      const res = await fetch("/api/promotions")
      const data = await res.json()
      setPromotions(data)
    } catch {
      toast.error("Failed to load promotions")
    }
    setPromoLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("stem_admin_logged_in")
    router.push("/admin")
  }

  // ── Products ──────────────────────────────────────────
  const openAddModal = () => {
    setEditingProduct(null)
    setFormData(initialFormData)
    setShowModal(true)
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || "",
      category: product.category || "Computers",
      image_url: product.image_url || "",
      price: product.price?.toString() || "",
      in_stock: product.in_stock,
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Product name is required")
      return
    }

    setSaving(true)
    const productData = {
      name: formData.name,
      description: formData.description || null,
      category: formData.category,
      image_url: formData.image_url || null,
      price: formData.price ? parseFloat(formData.price) : null,
      in_stock: formData.in_stock,
      updated_at: new Date().toISOString(),
    }

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id)

      if (error) {
        toast.error("Failed to update product")
      } else {
        toast.success("Product updated successfully")
        setShowModal(false)
        fetchProducts()
      }
    } else {
      const { error } = await supabase.from("products").insert([productData])

      if (error) {
        toast.error("Failed to add product")
      } else {
        toast.success("Product added successfully")
        setShowModal(false)
        fetchProducts()
      }
    }
    setSaving(false)
  }

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    const { error } = await supabase.from("products").delete().eq("id", productId)

    if (error) {
      toast.error("Failed to delete product")
    } else {
      toast.success("Product deleted successfully")
      fetchProducts()
    }
  }

  // ── Promotions ────────────────────────────────────────
  const openAddPromoModal = () => {
    setEditingPromo(null)
    setPromoFormData(initialPromoFormData)
    setShowPromoModal(true)
  }

  const openEditPromoModal = (promo: Promotion) => {
    setEditingPromo(promo)
    setPromoFormData({
      title: promo.title,
      description: promo.description || "",
      image_url: promo.image_url || "",
      badge_text: promo.badge_text || "SALE",
      original_price: promo.original_price?.toString() || "",
      promo_price: promo.promo_price?.toString() || "",
      is_active: promo.is_active,
    })
    setShowPromoModal(true)
  }

  const handleSavePromo = async () => {
    if (!promoFormData.title.trim()) {
      toast.error("Promotion title is required")
      return
    }

    setPromoSaving(true)
    const body = {
      title: promoFormData.title,
      description: promoFormData.description,
      image_url: promoFormData.image_url,
      badge_text: promoFormData.badge_text || "SALE",
      original_price: promoFormData.original_price ? parseFloat(promoFormData.original_price) : null,
      promo_price: promoFormData.promo_price ? parseFloat(promoFormData.promo_price) : null,
      is_active: promoFormData.is_active,
    }

    if (editingPromo) {
      const res = await fetch(`/api/promotions/${editingPromo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        toast.error("Failed to update promotion")
      } else {
        toast.success("Promotion updated")
        setShowPromoModal(false)
        fetchPromotions()
      }
    } else {
      const res = await fetch("/api/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Failed to add promotion")
      } else {
        toast.success("Promotion added")
        setShowPromoModal(false)
        fetchPromotions()
      }
    }
    setPromoSaving(false)
  }

  const handleDeletePromo = async (promoId: string) => {
    if (!confirm("Are you sure you want to delete this promotion?")) return
    const res = await fetch(`/api/promotions/${promoId}`, { method: "DELETE" })
    if (!res.ok) {
      toast.error("Failed to delete promotion")
    } else {
      toast.success("Promotion deleted")
      fetchPromotions()
    }
  }

  const handleTogglePromoActive = async (promo: Promotion) => {
    await fetch(`/api/promotions/${promo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !promo.is_active }),
    })
    fetchPromotions()
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: logoColors[colorIndex] }}
            animate={{ backgroundColor: logoColors[colorIndex] }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your products, inventory and promotions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={activeTab === "products" ? openAddModal : openAddPromoModal}
                  disabled={activeTab === "promotions" && promotions.length >= 5}
                  title={activeTab === "promotions" && promotions.length >= 5 ? "Maximum 5 promotions reached" : undefined}
                  className="h-12 px-6 rounded-full text-white stem-gradient font-semibold disabled:opacity-50"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {activeTab === "products" ? "Add Product" : "Add Promotion"}
                </Button>
              </motion.div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="h-12 px-6 rounded-full"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 p-1 bg-gray-100 dark:bg-gray-800 rounded-full w-fit">
            <button
              onClick={() => setActiveTab("products")}
              className={cn(
                "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all",
                activeTab === "products"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
              )}
            >
              <Package className="w-4 h-4" />
              Products
            </button>
            <button
              onClick={() => setActiveTab("promotions")}
              className={cn(
                "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all",
                activeTab === "promotions"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
              )}
            >
              <Megaphone className="w-4 h-4" />
              Promotions
            </button>
          </div>

          {/* ── PRODUCTS TAB ── */}
          <AnimatePresence mode="wait">
            {activeTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 h-12 rounded-full bg-white dark:bg-gray-800"
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredProducts.length} of {products.length} products
                  </p>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map((product, i) => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: i * 0.03 }}
                          className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
                        >
                          <div className="relative h-40 bg-gray-100 dark:bg-gray-900">
                            <img
                              src={product.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => openEditModal(product)}
                                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
                              >
                                <Pencil className="w-4 h-4 text-cyan-500" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(product.id)}
                                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </motion.button>
                            </div>
                            {product.in_stock ? (
                              <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                                In Stock
                              </span>
                            ) : (
                              <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                                Out of Stock
                              </span>
                            )}
                          </div>
                          <div className="p-4">
                            <span
                              className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-2"
                              style={{
                                backgroundColor: `${logoColors[categories.indexOf(product.category || "") % logoColors.length]}20`,
                                color: logoColors[categories.indexOf(product.category || "") % logoColors.length],
                              }}
                            >
                              {product.category}
                            </span>
                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                              {product.name}
                            </h3>
                            {product.price && (
                              <p className="text-lg font-bold gradient-text mt-1">
                                ${product.price.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── PROMOTIONS TAB ── */}
            {activeTab === "promotions" && (
              <motion.div
                key="promotions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {promotions.length}/5 promotions •{" "}
                    {promotions.filter((p) => p.is_active).length} active
                  </p>
                </div>

                {promoLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-56 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
                    ))}
                  </div>
                ) : promotions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Megaphone className="w-16 h-16 mb-4 opacity-30" />
                    <p className="text-lg font-medium">No promotions yet</p>
                    <p className="text-sm mt-1">Click "Add Promotion" to create your first one</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                      {promotions.map((promo, i) => (
                        <motion.div
                          key={promo.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: i * 0.04 }}
                          className={cn(
                            "bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border transition-all",
                            promo.is_active
                              ? "border-cyan-200 dark:border-cyan-800"
                              : "border-gray-200 dark:border-gray-700 opacity-60"
                          )}
                        >
                          <div className="relative h-40 bg-gray-100 dark:bg-gray-900">
                            <img
                              src={promo.image_url || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500"}
                              alt={promo.title}
                              className="w-full h-full object-cover"
                            />
                            {promo.badge_text && (
                              <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                                {promo.badge_text}
                              </span>
                            )}
                            <div className="absolute top-3 right-3 flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => openEditPromoModal(promo)}
                                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
                              >
                                <Pencil className="w-4 h-4 text-cyan-500" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDeletePromo(promo.id)}
                                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </motion.button>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                              {promo.title}
                            </h3>
                            {promo.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {promo.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              {promo.promo_price && (
                                <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                                  ${promo.promo_price.toFixed(2)}
                                </span>
                              )}
                              {promo.original_price && (
                                <span className="text-xs text-gray-400 line-through">
                                  ${promo.original_price.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <span className={cn(
                                "text-xs font-medium px-2 py-1 rounded-full",
                                promo.is_active
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                              )}>
                                {promo.is_active ? "Active" : "Inactive"}
                              </span>
                              <button
                                onClick={() => handleTogglePromoActive(promo)}
                                className="text-gray-400 hover:text-cyan-500 transition-colors"
                              >
                                {promo.is_active
                                  ? <ToggleRight className="w-6 h-6 text-cyan-500" />
                                  : <ToggleLeft className="w-6 h-6" />
                                }
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Product Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Package className="w-4 h-4" />
                    Product Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FileText className="w-4 h-4" />
                    Description
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={3}
                    className="rounded-xl resize-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Tag className="w-4 h-4" />
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <ImageIcon className="w-4 h-4" />
                    Image URL
                  </label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <DollarSign className="w-4 h-4" />
                    Price (USD)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    In Stock
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, in_stock: !formData.in_stock })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      formData.in_stock ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                    )}
                  >
                    <motion.div
                      className="w-5 h-5 rounded-full bg-white shadow absolute top-0.5"
                      animate={{ left: formData.in_stock ? "calc(100% - 22px)" : "2px" }}
                    />
                  </button>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1 h-12 rounded-full"
                  >
                    Cancel
                  </Button>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full h-12 rounded-full text-white stem-gradient font-semibold"
                    >
                      {saving ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full inline-block"
                        />
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          {editingProduct ? "Update" : "Add"} Product
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Promotion Modal ── */}
      <AnimatePresence>
        {showPromoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPromoModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-cyan-500" />
                  {editingPromo ? "Edit Promotion" : "Add Promotion"}
                </h2>
                <button
                  onClick={() => setShowPromoModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Megaphone className="w-4 h-4" />
                    Title *
                  </label>
                  <Input
                    value={promoFormData.title}
                    onChange={(e) => setPromoFormData({ ...promoFormData, title: e.target.value })}
                    placeholder="e.g. HP LaserJet — Limited Offer"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FileText className="w-4 h-4" />
                    Description
                  </label>
                  <Textarea
                    value={promoFormData.description}
                    onChange={(e) => setPromoFormData({ ...promoFormData, description: e.target.value })}
                    placeholder="Short description of the promotion"
                    rows={3}
                    className="rounded-xl resize-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <ImageIcon className="w-4 h-4" />
                    Image URL
                  </label>
                  <Input
                    value={promoFormData.image_url}
                    onChange={(e) => setPromoFormData({ ...promoFormData, image_url: e.target.value })}
                    placeholder="https://example.com/promo-image.jpg"
                    className="h-12 rounded-xl"
                  />
                  {promoFormData.image_url && (
                    <img
                      src={promoFormData.image_url}
                      alt="Preview"
                      className="mt-2 h-24 w-full object-cover rounded-xl border border-gray-200 dark:border-gray-700"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                    />
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Tag className="w-4 h-4" />
                    Badge Text
                  </label>
                  <Input
                    value={promoFormData.badge_text}
                    onChange={(e) => setPromoFormData({ ...promoFormData, badge_text: e.target.value })}
                    placeholder="e.g. SALE, HOT, NEW, -20%"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <DollarSign className="w-4 h-4" />
                      Original Price
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={promoFormData.original_price}
                      onChange={(e) => setPromoFormData({ ...promoFormData, original_price: e.target.value })}
                      placeholder="0.00"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Percent className="w-4 h-4" />
                      Promo Price
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={promoFormData.promo_price}
                      onChange={(e) => setPromoFormData({ ...promoFormData, promo_price: e.target.value })}
                      placeholder="0.00"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active (show in promotion window)
                  </span>
                  <button
                    type="button"
                    onClick={() => setPromoFormData({ ...promoFormData, is_active: !promoFormData.is_active })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      promoFormData.is_active ? "bg-cyan-500" : "bg-gray-300 dark:bg-gray-600"
                    )}
                  >
                    <motion.div
                      className="w-5 h-5 rounded-full bg-white shadow absolute top-0.5"
                      animate={{ left: promoFormData.is_active ? "calc(100% - 22px)" : "2px" }}
                    />
                  </button>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowPromoModal(false)}
                    className="flex-1 h-12 rounded-full"
                  >
                    Cancel
                  </Button>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button
                      onClick={handleSavePromo}
                      disabled={promoSaving}
                      className="w-full h-12 rounded-full text-white stem-gradient font-semibold"
                    >
                      {promoSaving ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full inline-block"
                        />
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          {editingPromo ? "Update" : "Add"} Promotion
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
