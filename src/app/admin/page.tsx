"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Mail, Eye, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const logoColors = ["#00B4D8", "#E63946", "#7B2CBF", "#2D6A4F", "#F77F00"]

export default function AdminLoginPage() {
  const [colorIndex, setColorIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % logoColors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("stem_admin_logged_in")
    if (isLoggedIn === "true") {
      router.push("/admin/dashboard")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (
      credentials.email === "admin@stemmagnetics.co.zw" &&
      credentials.password === "ST3Mgethis$"
    ) {
      localStorage.setItem("stem_admin_logged_in", "true")
      toast.success("Login successful!")
      router.push("/admin/dashboard")
    } else {
      toast.error("Invalid email or password")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      <section className="relative w-full max-w-md px-4">
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: logoColors[colorIndex] }}
            animate={{ backgroundColor: logoColors[colorIndex] }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: logoColors[(colorIndex + 2) % logoColors.length] }}
            animate={{ backgroundColor: logoColors[(colorIndex + 2) % logoColors.length] }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-2xl"
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ backgroundColor: `${logoColors[colorIndex]}20` }}
              animate={{ backgroundColor: `${logoColors[colorIndex]}20` }}
            >
              <Shield className="w-8 h-8" style={{ color: logoColors[colorIndex] }} />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to manage products and content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  required
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="admin@stemmagnetics.co.zw"
                  className="h-12 pl-12 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter your password"
                  className="h-12 pl-12 pr-12 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-full text-white stem-gradient font-semibold"
              >
                {loading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  "Sign In"
                )}
              </Button>
            </motion.div>
          </form>

         
        </motion.div>
      </section>
    </div>
  )
}
