"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon, ShoppingCart } from "lucide-react"
import { CartSheet } from "./CartSheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Get Quote" },
]

const logoColors = ["#00B4D8", "#E63946", "#7B2CBF", "#2D6A4F", "#F77F00"]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % logoColors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative w-12 h-12"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/STEM_NEW_LOGO-removebg-preview-1767788931766.png?width=8000&height=8000&resize=contain"
                alt="Stem Magnetics Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <div className="hidden sm:block">
              <motion.span
                className="text-xl font-bold tracking-tight"
                style={{ color: logoColors[colorIndex] }}
                animate={{ color: logoColors[colorIndex] }}
                transition={{ duration: 0.5 }}
              >
                Stem
              </motion.span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Magnetics</span>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 tracking-widest uppercase">The Best in ICT Products</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  pathname === link.href
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: logoColors[colorIndex] }}
                    animate={{ backgroundColor: logoColors[colorIndex] }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Admin
              </Link>
              
              <CartSheet />
              
              {mounted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
