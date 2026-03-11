"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Monitor, Printer, Wifi, Radio, Shield, Cpu, ChevronRight, Sparkles, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const logoColors = ["#00B4D8", "#E63946", "#7B2CBF", "#2D6A4F"]

const categories = [
  { 
    icon: Monitor, 
    label: "Computers", 
    color: "#00B4D8", 
    desc: "Laptops, Desktops & Servers",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200"
  },
  { 
    icon: Printer, 
    label: "Printers", 
    color: "#E63946", 
    desc: "Laser, Inkjet & All-in-One",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=1200"
  },
  { 
    icon: Cpu, 
    label: "Consumables", 
    color: "#7B2CBF", 
    desc: "Ink, Toner & Paper",
    image: "https://th.bing.com/th/id/R.2ba5cd6d1ad421a363f955154efa2c49?rik=HQd6%2fuIYDZ0k1g&riu=http%3a%2f%2fwww.martecoffice.com%2fimages%2finnner-products%2fcomputer-consumables1.jpg&ehk=wN5QUGBytzPcZHnIOyAOJQkkW3c8XiGJFnsGwrwjPhk%3d&risl=&pid=ImgRaw&r=0"
  },
  { 
    icon: Wifi, 
    label: "Networking", 
    color: "#2D6A4F", 
    desc: "Switches, Routers & Cables",
    image: "https://images-na.ssl-images-amazon.com/images/I/81K4IHoxEHL._SL1500_.jpg"
  },
  { 
    icon: Radio, 
    label: "Communication", 
    color: "#F77F00", 
    desc: "Two-Way Radios & Accessories",
    image: "https://icomuk.co.uk/images/Icom/fieldsetField/23/IDAS_products_Uk_400x523.jpg"
  },
  { 
    icon: Shield, 
    label: "Power & Security", 
    color: "#00B4D8", 
    desc: "UPS, Surge Protectors",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=1200"
  },
]

const stats = [
  { value: "27+", label: "Years Experience" },
  { value: "500+", label: "Products" },
  { value: "1000+", label: "Happy Clients" },
  { value: "24/7", label: "Support" },
]

const partners = [
  { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" },
  { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg" },
  { name: "canon", logo: "https://filmphotograph.com/sites/filmphotograph/files/styles/max_650x650/public/2020-05/canon.png?itok=QK4QbLwm" },
  { name: "motorola", logo: "https://static.vecteezy.com/system/resources/previews/020/927/144/non_2x/motorola-brand-logo-phone-symbol-with-name-black-design-usa-mobile-illustration-free-vector.jpg" },
  { name: "Epson", logo: "https://th.bing.com/th/id/R.de8410d1e8323a1c68a0523b633a734e?rik=waAPYE67l13Efg&riu=http%3a%2f%2fwww.easytouchpos.co.uk%2fImages%2fmini-slides%2fepos_EPSON.png&ehk=9MYjc8AS%2bRo2lW6QQXiWpUnKwlNaz%2bNnFZZrropFzZw%3d&risl=&pid=ImgRaw&r=0" },
  { name: "lenovo", logo: "https://tse4.mm.bing.net/th/id/OIP.Lr2DaeOV3y5nds7XH1Rx5gHaFA?w=1058&h=715&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" },
  { name: "Microsoft", logo: "https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png" },
  { name: "Verbatim", logo: "https://tse4.mm.bing.net/th/id/OIP.QSkXGOaMnCB7j_JBz-fPFgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "APC", logo: "https://manuals.plus/wp-content/uploads/2023/01/APC-logo.png" }
]

export default function HomePage() {
  const [colorIndex, setColorIndex] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % logoColors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-10 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-white/70 dark:from-gray-950 dark:via-gray-950/90 dark:to-gray-950/70" />
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: logoColors[colorIndex] }}
            animate={{ backgroundColor: logoColors[colorIndex] }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: logoColors[(colorIndex + 2) % logoColors.length] }}
            animate={{ backgroundColor: logoColors[(colorIndex + 2) % logoColors.length] }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 mb-6"
              >
                <Sparkles className="w-4 h-4 animate-color-cycle" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Zimbabwe&apos;s #1 ICT Partner Since 1997
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-gray-900 dark:text-white">The Best in</span>
                <br />
                <span className="gradient-text">ICT Products</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Your trusted partner for IT hardware, software, consumables, and communication solutions. 
                Connecting technology with Zimbabwe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/products">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-14 px-8 text-base font-semibold text-white stem-gradient rounded-full"
                    >
                      Browse Products
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/quote">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-full stem-gradient-border bg-white dark:bg-gray-900"
                    >
                      Get a Quote
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <motion.div
                className="relative w-full aspect-square max-w-lg mx-auto"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 rounded-3xl stem-gradient opacity-30 blur-2xl" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 p-8 flex items-center justify-center">
                  <img
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/STEM_NEW_LOGO-removebg-preview-1767788931766.png?width=8000&height=8000&resize=contain"
                    alt="Stem Magnetics"
                    className="w-full h-full object-contain animate-float drop-shadow-2xl"
                  />
                </div>
              </motion.div>

              {categories.slice(0, 3).map((cat, i) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="absolute"
                  style={{
                    top: i === 0 ? "10%" : i === 1 ? "50%" : "80%",
                    left: i === 1 ? "-5%" : "auto",
                    right: i !== 1 ? "-5%" : "auto",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700"
                    style={{ borderLeft: `4px solid ${cat.color}` }}
                  >
                    <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                    <span className="text-base font-bold text-gray-900 dark:text-white">{cat.label}</span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="gradient-text">Product Categories</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive ICT solutions for businesses of all sizes, featuring world-class brands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/products?category=${encodeURIComponent(cat.label === "Networking" ? "Network Products" : cat.label === "Power & Security" ? "Power Solutions" : cat.label)}`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="group relative h-[400px] rounded-3xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl cursor-pointer"
                  >
                    <div className="absolute inset-0">
                      <img 
                        src={cat.image} 
                        alt={cat.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90" />
                    </div>
                    
                    <div className="relative h-full p-8 flex flex-col justify-end">
                      <motion.div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md bg-white/20 border border-white/30"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <cat.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        {cat.label}
                      </h3>
                      <p className="text-gray-200 mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {cat.desc}
                      </p>
                      <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                        Explore Category
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-white dark:bg-gray-950">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
            style={{ backgroundColor: logoColors[colorIndex] }}
            animate={{ backgroundColor: logoColors[colorIndex] }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  className="text-5xl md:text-6xl font-black mb-4 tracking-tighter"
                  style={{ color: logoColors[i % logoColors.length] }}
                  animate={{ color: logoColors[(i + colorIndex) % logoColors.length] }}
                  transition={{ duration: 1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-sm group-hover:text-red-500 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070" 
            alt="Abstract Tech"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">Stem Magnetics?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We deliver sustainable value through incomparable service excellence and brand building
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                title: "Integrity", 
                desc: "We maintain the highest standards of integrity and are committed to fair dealing as the basis of our business.", 
                color: "#00B4D8",
                img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
              },
              { 
                title: "Initiative", 
                desc: "We strive for excellence in everything we do. Always customer-focused, proactive, and innovative.", 
                color: "#E63946",
                img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
              },
              { 
                title: "Involvement", 
                desc: "We foster a strong sense of belonging for all stakeholders with a team approach governed by respect.", 
                color: "#7B2CBF",
                img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800"
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative group p-1 rounded-[2rem] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: `${value.color}20` }} />
                <div className="relative h-full p-8 rounded-[1.9rem] bg-gray-900/80 backdrop-blur-2xl border border-white/10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl"
                    style={{ backgroundColor: `${value.color}20`, border: `1px solid ${value.color}40` }}
                  >
                    <span className="text-3xl font-black" style={{ color: value.color }}>
                      {value.title[0]}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4" style={{ color: value.color }}>{value.title}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 stem-gradient opacity-20 blur-3xl rounded-3xl group-hover:opacity-30 transition-opacity" />
              <div className="relative rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/5f0db1e3-35d1-482a-a963-4a07ae6ac0fe/stemhouse-1767864698840.jpeg?width=8000&height=8000&resize=contain"
                  alt="Stem House"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-8 left-8">
                  <div className="px-8 py-4 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                    <span className="text-base font-black tracking-widest uppercase gradient-text">Stem House</span>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <p className="text-white font-bold text-xl flex items-center gap-4">
                    <span className="w-12 h-1 bg-red-500 rounded-full" />
                    Visit our Headquarters in Hillside, Harare
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:pl-12"
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-8 font-black text-xs tracking-[0.2em] uppercase border border-red-100 dark:border-red-900/30">
                <MapPin className="w-4 h-4" />
                Our Location
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 leading-[1.1]">
                Welcome to <br />
                <span className="gradient-text">Stem House</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-medium">
                Our state-of-the-art facility at 2 Bradfield Road houses our administration, 
                showrooms, and technical workshop. We pride ourselves on being accessible 
                to our clients and providing a professional environment for all your ICT solutions.
              </p>
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 group hover:border-red-500/30 transition-colors">
                  <h4 className="font-black text-gray-900 dark:text-white mb-2 text-lg">Central Location</h4>
                  <p className="text-base text-gray-500 font-medium">5 mins from Harare CBD</p>
                </div>
                <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 group hover:border-blue-500/30 transition-colors">
                  <h4 className="font-black text-gray-900 dark:text-white mb-2 text-lg">Full Support</h4>
                  <p className="text-base text-gray-500 font-medium">Expert In-house Technical Team</p>
                </div>
              </div>
              <Link href="/about">
                <Button className="rounded-full px-10 py-8 h-auto text-xl font-black stem-gradient text-white shadow-2xl hover:scale-105 transition-transform">
                  Explore Our Story
                  <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-900/50 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl font-black text-gray-900 dark:text-white tracking-tight"
          >
            Trusted Partners & Brands We Distribute
          </motion.h2>
        </div>
        <div className="relative">
          <div className="flex animate-marquee">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-6 px-12 py-8 rounded-[2rem] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center min-w-[240px] h-32 hover:shadow-2xl hover:border-red-500/50 transition-all duration-500 group"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                />
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </section>

      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://media.licdn.com/dms/image/D5612AQHUIiBOFh8HKA/article-cover_image-shrink_720_1280/0/1714165490263?e=2147483647&v=beta&t=O5cRqKIODGuF2jW0Y-fPP_gaQvbqplWfntEGIuETlmE" 
            alt="CTA Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 stem-gradient opacity-95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/20 to-gray-950/60" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
              Ready to Upgrade <br />Your Technology?
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Get in touch with our expert team for personalized ICT solutions tailored to your unique business needs
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/quote">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-20 px-12 text-xl font-black bg-white text-gray-900 hover:bg-gray-100 rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.3)]"
                  >
                    Request a Quote
                    <ArrowRight className="ml-2 w-7 h-7" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-20 px-12 text-xl font-black text-white border-2 border-white hover:bg-white/10 rounded-full"
                  >
                    Contact Us
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
