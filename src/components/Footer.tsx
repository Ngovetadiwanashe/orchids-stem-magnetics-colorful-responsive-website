"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

const logoColors = ["#00B4D8", "#E63946", "#7B2CBF", "#2D6A4F", "#F77F00"]

const footerLinks = {
  products: [
    { label: "Computers", href: "/products?category=Computers" },
    { label: "Printers", href: "/products?category=Printers" },
    { label: "Consumables", href: "/products?category=Consumables" },
    { label: "Network Products", href: "/products?category=Network Products" },
    { label: "Communication", href: "/products?category=Communication" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Get Quote", href: "/quote" },
  ],
}

export function Footer() {
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % logoColors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/STEM_NEW_LOGO-removebg-preview-1767788931766.png?width=8000&height=8000&resize=contain"
                alt="Stem Magnetics Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <motion.span
                  className="text-xl font-bold"
                  style={{ color: logoColors[colorIndex] }}
                  animate={{ color: logoColors[colorIndex] }}
                  transition={{ duration: 0.5 }}
                >
                  Stem
                </motion.span>
                <span className="text-xl font-bold text-white">Magnetics</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The Best in ICT Products. Since 1997, we have been Zimbabwe&apos;s trusted partner for IT hardware, software, and consumables.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "https://facebook.com/stemmagnetics" },
                { Icon: Twitter, href: "https://twitter.com/stemmagnetics" },
                { Icon: Linkedin, href: "https://linkedin.com/company/stem-magnetics" },
                { Icon: Instagram, href: "https://instagram.com/stemmagnetics" }
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Icon size={18} className="text-gray-400" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-gray-300 text-sm">2 Bradfield Rd, Hillside, Harare, Zimbabwe</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-green-400 shrink-0" />
                <span className="text-gray-300 text-sm">+263 242-747 587 / +263 77 823 2442</span>
              </li>
                  <li className="flex items-center gap-3">
                    <Mail size={18} className="text-red-400 shrink-0" />
                    <span className="text-gray-300 text-sm">sales@stem-magnetics.co.zw</span>
                  </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-purple-400 shrink-0" />
                <span className="text-gray-300 text-sm">Mon - Fri: 8:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Stem Magnetics. All rights reserved.
            
              
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
