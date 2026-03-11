"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Tag, ChevronLeft, ChevronRight, GripHorizontal, Minus } from "lucide-react"
import Link from "next/link"

type Promo = {
  id: string
  title: string
  description: string
  image_url: string
  badge_text: string
  original_price: number | null
  promo_price: number | null
  is_active: boolean
}

export function PromotionWindow() {
  const [promos, setPromos] = useState<Promo[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [minimized, setMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 120 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef<{ mouseX: number; mouseY: number; posX: number; posY: number } | null>(null)

  useEffect(() => {
    fetch("/api/promotions")
      .then((r) => r.json())
      .then((data: Promo[]) => setPromos(data.filter((p) => p.is_active)))
      .catch(() => {})
  }, [])

  // Auto-cycle
  useEffect(() => {
    if (promos.length <= 1) return
    const id = setInterval(() => setCurrentIndex((i) => (i + 1) % promos.length), 4000)
    return () => clearInterval(id)
  }, [promos.length])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      dragStart.current = { mouseX: e.clientX, mouseY: e.clientY, posX: position.x, posY: position.y }
      setIsDragging(true)
    },
    [position]
  )

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging || !dragStart.current) return
      const dx = e.clientX - dragStart.current.mouseX
      const dy = e.clientY - dragStart.current.mouseY
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 264, dragStart.current.posX + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 60, dragStart.current.posY + dy)),
      })
    }
    const onUp = () => { setIsDragging(false); dragStart.current = null }
    if (isDragging) {
      window.addEventListener("mousemove", onMove)
      window.addEventListener("mouseup", onUp)
    }
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp) }
  }, [isDragging])

  if (promos.length === 0 || !visible) return null

  const promo = promos[currentIndex] ?? promos[0]
  const discount =
    promo.original_price && promo.promo_price
      ? Math.round((1 - promo.promo_price / promo.original_price) * 100)
      : null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      style={{ left: position.x, top: position.y, userSelect: "none" }}
      className="fixed z-50 w-64 rounded-2xl shadow-2xl overflow-hidden border border-white/10"
    >
      {/* Title bar */}
      <div
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center gap-1.5">
          <GripHorizontal className="w-4 h-4 text-white/60" />
          <Tag className="w-3.5 h-3.5 text-white" />
          <span className="text-xs font-bold text-white tracking-widest uppercase">Promotions</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setMinimized((m) => !m)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            title={minimized ? "Expand" : "Minimise"}
          >
            <Minus className="w-3 h-3 text-white" />
          </button>
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setVisible(false)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            title="Close"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {!minimized && (
          <motion.div
            key="body"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-white dark:bg-gray-900"
          >
            {/* Image */}
            <div className="relative h-36 bg-gray-100 dark:bg-gray-800">
              <AnimatePresence mode="wait">
                <motion.img
                  key={promo.id}
                  src={promo.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400"}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>

              {promo.badge_text && (
                <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full shadow">
                  {promo.badge_text}
                </span>
              )}

              {promos.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentIndex((i) => (i - 1 + promos.length) % promos.length)}
                    className="absolute left-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 hover:bg-black/60 text-white"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setCurrentIndex((i) => (i + 1) % promos.length)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 hover:bg-black/60 text-white"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>

            {/* Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={promo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-3"
              >
                <p className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">{promo.title}</p>
                {promo.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{promo.description}</p>
                )}

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {promo.promo_price != null && (
                    <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      ${promo.promo_price.toFixed(2)}
                    </span>
                  )}
                  {promo.original_price != null && (
                    <span className="text-xs text-gray-400 line-through">${promo.original_price.toFixed(2)}</span>
                  )}
                  {discount && (
                    <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <Link
                  href="/products"
                  className="mt-2.5 flex items-center justify-center w-full py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-opacity"
                >
                  Shop Now
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            {promos.length > 1 && (
              <div className="flex justify-center gap-1 pb-2.5">
                {promos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === currentIndex ? "bg-cyan-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
