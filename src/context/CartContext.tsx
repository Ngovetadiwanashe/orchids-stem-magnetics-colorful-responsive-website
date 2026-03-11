"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Product } from "@/lib/supabase"
import { toast } from "sonner"

export type CartItem = Product & {
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("stem_cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from local storage", e)
      }
    }
  }, [])

  // Save cart to local storage on changes
  useEffect(() => {
    localStorage.setItem("stem_cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        toast.success(`Increased quantity of ${product.name}`)
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      toast.success(`Added ${product.name} to cart`)
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === productId)
      if (item) {
        toast.error(`Removed ${item.name} from cart`)
      }
      return prevCart.filter((item) => item.id !== productId)
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("stem_cart")
  }

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
