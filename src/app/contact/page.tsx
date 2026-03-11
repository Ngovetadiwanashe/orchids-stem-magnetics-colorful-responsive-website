"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Users, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

const logoColors = ["#00B4D8", "#E63946", "#7B2CBF", "#2D6A4F", "#F77F00"]

const contactInfo = [
  { icon: MapPin, label: "Address", value: "2 Bradfield Rd, Hillside, Harare, Zimbabwe", color: "#00B4D8" },
  { icon: Phone, label: "Phone", value: "+263 242-747 587", color: "#E63946" },
  { icon: Mail, label: "Email", value: "sales@stem-magnetics.co.zw", color: "#7B2CBF" },
  { icon: Clock, label: "Business Hours", value: "Mon - Fri: 8:00 AM - 5:00 PM", color: "#2D6A4F" },
]

const departments = [
  { icon: Users, title: "Sales", email: "sales@stem-magnetics.co.zw", phone: "+263 778 232 442", color: "#00B4D8" },
  { icon: Headphones, title: "Technical Support", email: "techsupport@stem-magnetics.co.zw", phone: "+263 772 113 546", color: "#E63946" },
  { icon: MessageSquare, title: "Accounts", email: "accounts@stem-magnetics.co.zw", phone: "+263 733 421 613", color: "#7B2CBF" },
]

export default function ContactPage() {
  const [colorIndex, setColorIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % logoColors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Save to Supabase
      await supabase.from("contact_messages").insert([formData])

      // 2. Send via FormSubmit.co AJAX
      const response = await fetch("https://formsubmit.co/ajax/sales@stem-magnetics.co.zw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Contact Message: ${formData.subject}`
        })
      })

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.")
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      } else {
        throw new Error("Failed to send message via FormSubmit")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to send message. Please try again.")
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get in touch with our team for any inquiries, support, or to discuss your ICT needs
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="john@example.com"
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        Subject
                      </label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help?"
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more about your inquiry..."
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
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${info.color}20` }}
                    >
                      <info.icon className="w-6 h-6" style={{ color: info.color }} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{info.label}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{info.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gray-950 rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Department Contacts</h3>
                <div className="space-y-6">
                  {departments.map((dept, i) => (
                    <motion.div
                      key={dept.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${dept.color}30` }}
                      >
                        <dept.icon className="w-5 h-5" style={{ color: dept.color }} />
                      </div>
                      <div>
                        <h4 className="font-semibold" style={{ color: dept.color }}>{dept.title}</h4>
                        <p className="text-sm text-gray-400">{dept.email}</p>
                        <p className="text-sm text-gray-400">{dept.phone}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
