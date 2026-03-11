"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Check, ChevronDown, Send, Building, User, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase, type Product } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const logoColors = ["#00B4D8", "#E63946", "#7B2CBF", "#2D6A4F", "#F77F00"]

export default function QuotePage() {
  const [colorIndex, setColorIndex] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [showProducts, setShowProducts] = useState(false)

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % logoColors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("name")
      if (data) setProducts(data)
    }
    fetchProducts()
  }, [])

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const selectedProductNames = products
    .filter((p) => selectedProducts.includes(p.id))
    .map((p) => p.name)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Save to Supabase
      await supabase.from("quote_requests").insert([{
        ...formData,
        products: selectedProductNames
      }])

      // 2. Send via FormSubmit.co AJAX
      const response = await fetch("https://formsubmit.co/ajax/sales@stem-magnetics.co.zw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          selected_products: selectedProductNames.join(", "),
          _subject: `New Quote Request: ${formData.name} from ${formData.company || "Individual"}`
        })
      })

      if (response.ok) {
        toast.success("Quote request submitted successfully! We'll contact you soon.")
        setFormData({ name: "", email: "", phone: "", company: "", message: "" })
        setSelectedProducts([])
      } else {
        throw new Error("FormSubmit submission failed")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to submit request. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="relative py-20 overflow-hidden">
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6"
              style={{ backgroundColor: `${logoColors[colorIndex]}20` }}
              animate={{ backgroundColor: `${logoColors[colorIndex]}20` }}
            >
              <FileText className="w-10 h-10" style={{ color: logoColors[colorIndex] }} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Request a <span className="gradient-text">Quote</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you with a customized quote within 24-48 hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-500" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+263 7XX XXX XXX"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Company Ltd"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-500" />
                  Select Products (Optional)
                </h3>
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowProducts(!showProducts)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-left flex items-center justify-between"
                  >
                    <span className="text-gray-600 dark:text-gray-400">
                      {selectedProducts.length > 0
                        ? `${selectedProducts.length} product(s) selected`
                        : "Click to select products"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-gray-400 transition-transform",
                        showProducts && "rotate-180"
                      )}
                    />
                  </button>

                  {showProducts && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-10 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl"
                    >
                      {products.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => toggleProduct(product.id)}
                          className={cn(
                            "w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                            selectedProducts.includes(product.id) && "bg-cyan-50 dark:bg-cyan-900/20"
                          )}
                        >
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {product.category}
                            </p>
                          </div>
                          {selectedProducts.includes(product.id) && (
                            <Check className="w-5 h-5 text-cyan-500" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {selectedProductNames.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProductNames.map((name, i) => (
                      <span
                        key={name}
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: logoColors[i % logoColors.length] }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-500" />
                  Additional Details
                </h3>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your requirements, quantities needed, or any specific specifications..."
                  rows={5}
                  className="rounded-xl resize-none"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-full text-white stem-gradient text-base font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Submit Quote Request
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: "Fast Response", desc: "Get a quote within 24-48 hours", color: "#00B4D8" },
              { title: "Competitive Pricing", desc: "Best prices for quality products", color: "#E63946" },
              { title: "Flexible Payment", desc: "Credit facility available", color: "#7B2CBF" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Check className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
