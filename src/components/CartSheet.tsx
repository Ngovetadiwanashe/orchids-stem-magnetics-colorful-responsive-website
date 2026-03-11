"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CartSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, itemCount } = useCart()

  const handleRemove = (id: string) => {
    setRemovingId(id)
    setTimeout(() => {
      removeFromCart(id)
      setRemovingId(null)
    }, 250)
  }

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <ShoppingCart size={20} />
        {itemCount > 0 && (
          <motion.span
            key={itemCount}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900"
          >
            {itemCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed right-0 top-0 bottom-0 z-[70] flex flex-col w-full max-w-lg bg-white dark:bg-gray-950 shadow-2xl"
            >

              {/* ── Header ── */}
              <div className="shrink-0 flex items-center justify-between px-6 py-5 bg-gradient-to-r from-cyan-500 to-blue-600">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-white" />
                  <div>
                    <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
                    <p className="text-xs text-white/70">
                      {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={() => { if (confirm("Clear all items from cart?")) clearCart() }}
                      className="text-xs font-semibold text-white/80 hover:text-white underline underline-offset-2 transition-colors px-1"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* ── Item list ── */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-5">
                    <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                      <ShoppingCart className="w-12 h-12 text-gray-200 dark:text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your cart is empty</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Add some products to get started!</p>
                    </div>
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="rounded-full px-8 h-11 stem-gradient text-white font-semibold"
                    >
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    <AnimatePresence initial={false}>
                      {cart.map((item) => {
                        const lineTotal = (item.price || 0) * item.quantity
                        const isRemoving = removingId === item.id
                        return (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: isRemoving ? 0.4 : 1, x: 0, scale: isRemoving ? 0.97 : 1 }}
                            exit={{ opacity: 0, x: 80, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="px-6 py-5"
                          >
                            <div className="flex gap-4">
                              {/* Image */}
                              <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                <img
                                  src={item.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400"}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0 flex flex-col gap-1">
                                <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                  {item.category || "Product"}
                                </p>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                                  {item.name}
                                </h4>
                                {item.price != null && (
                                  <p className="text-xs text-gray-400 dark:text-gray-500">
                                    ${item.price.toFixed(2)} each
                                  </p>
                                )}

                                {/* Controls row */}
                                <div className="flex items-center justify-between mt-auto pt-1">
                                  {/* Qty stepper */}
                                  <div className="flex items-center gap-1">
                                    {/* Decrease / remove */}
                                    <motion.button
                                      whileTap={{ scale: 0.88 }}
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      title={item.quantity === 1 ? "Remove item" : "Decrease quantity"}
                                      className={`w-9 h-9 flex items-center justify-center rounded-full font-bold transition-colors shadow-sm border ${
                                        item.quantity === 1
                                          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40"
                                          : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                      }`}
                                    >
                                      {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                                    </motion.button>

                                    {/* Count */}
                                    <span className="w-10 text-center text-base font-bold text-gray-900 dark:text-white select-none tabular-nums">
                                      {item.quantity}
                                    </span>

                                    {/* Increase */}
                                    <motion.button
                                      whileTap={{ scale: 0.88 }}
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      title="Increase quantity"
                                      className="w-9 h-9 flex items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 transition-colors shadow-sm font-bold"
                                    >
                                      <Plus size={14} />
                                    </motion.button>
                                  </div>

                                  {/* Line total */}
                                  <div className="text-right">
                                    <p className="text-xl font-bold gradient-text leading-none">
                                      ${lineTotal.toFixed(2)}
                                    </p>
                                    {item.quantity > 1 && (
                                      <p className="text-[10px] text-gray-400 mt-0.5">
                                        {item.quantity} × ${item.price?.toFixed(2)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* ── Remove button — full width, clearly visible ── */}
                            <motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleRemove(item.id)}
                              disabled={isRemoving}
                              className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-red-200 dark:border-red-900/50 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/25 hover:border-red-300 dark:hover:border-red-700 transition-all text-sm font-semibold"
                            >
                              <Trash2 size={14} />
                              Remove item
                            </motion.button>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* ── Footer ── */}
              {cart.length > 0 && (
                <div className="shrink-0 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-[0_-8px_30px_rgba(0,0,0,0.07)]">

                  {/* Order breakdown */}
                  <div className="px-6 pt-4 pb-3 space-y-1.5 border-b border-gray-100 dark:border-gray-800">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400 truncate max-w-[60%]">
                          {item.name}
                          <span className="text-gray-400 dark:text-gray-600 ml-1">×{item.quantity}</span>
                        </span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 shrink-0 ml-2">
                          ${((item.price || 0) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Grand total + CTA */}
                  <div className="px-6 pt-4 pb-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-700 dark:text-gray-300">Total</span>
                      <span className="text-3xl font-bold gradient-text">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <Link href="/quote" onClick={() => setIsOpen(false)}>
                        <Button className="w-full h-12 rounded-full stem-gradient text-white font-bold text-base group shadow-md">
                          Request a Quote
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="w-full h-11 rounded-full font-semibold border-gray-200 dark:border-gray-700"
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
