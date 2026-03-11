"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Target, Eye, Heart, Shield, Lightbulb, Users, Award, MapPin, Phone, Mail, Calendar } from "lucide-react"

const logoColors = ["#00B4D8", "#E63946", "#7B2CBF", "#2D6A4F", "#F77F00"]

const team = [
  { name: "Mathew Manyangadze", role: "C.E.O / Managing Director" },
  { name: "Alexia Manyangadze", role: "Finance Director" },
  { name: "Margaret Mushope", role: "Sales Manager", email: "margaret@stem-magnetics.co.zw", phone: "+263 778 232 442" },
    { name: "Willard Karumazondo", role: "Technical Manager", email: "techsupport@stem-magnetics.co.zw", phone: "+263 772 113 546" },
]

const timeline = [
  { year: "1997", event: "Redmark Services (Pvt) Ltd founded", color: "#00B4D8" },
  { year: "2004", event: "Acquired and renovated Stem House at 2 Bradfield Rd, Hillside", color: "#E63946" },
  { year: "2010", event: "Expanded into Motorola Two-Way Communication Solutions, POTRAZ lisennse for radio communication equipment", color: "#7B2CBF" },
  { year: "2015", event: "Became institutional member of Computer Society of Zimbabwe", color: "#2D6A4F" },
  { year: "2020", event: "expanded customer base by expanding products and purchase standards", color: "#F77F00" },
  { year: "2024", event: "27+ years serving Zimbabwe's ICT needs", color: "#00B4D8" },
]

export default function AboutPage() {
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % logoColors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

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
              About <span className="gradient-text">Stem Magnetics</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Since 1997, we have been Zimbabwe&apos;s trusted partner for IT hardware, software, and consumables, connecting technology with businesses across the nation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
                <div className="relative group">
                  <div className="absolute inset-0 stem-gradient opacity-20 blur-2xl rounded-3xl" />
                  <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl">
                    <img
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/5f0db1e3-35d1-482a-a963-4a07ae6ac0fe/stemhouse-1767864698840.jpeg?width=8000&height=8000&resize=contain"
                      alt="Stem House"
                      className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="px-4 py-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/20 shadow-lg flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-900 dark:text-white">Stem House</span>
                      </div>
                    </div>
                  </div>
                </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong className="text-gray-900 dark:text-white">Stem Magnetics</strong>, trading under Redmark Services (Pvt) Ltd, was established on October 6th, 1997, in Harare, Zimbabwe. What began as a small IT distribution company has grown into one of the nation&apos;s leading ICT solutions providers.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                In 2004, we acquired and renovated our headquarters at 2 Bradfield Road, Hillside, which we proudly call <strong className="text-gray-900 dark:text-white">Stem House</strong>. This facility houses our sales office, administration, accounts, stores, and a fully-equipped workshop for repairs and services.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Today, we are licensed by POTRAZ and are an institutional member of the Computer Society of Zimbabwe, continuing our mission to deliver excellence in ICT products and services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl stem-gradient opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Vision, Mission & Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To be the market leader and distribution of choice, being an expert partner in IT hardware, software and consumables, connecting technology with Zimbabwe.",
                color: "#00B4D8"
              },
              {
                icon: Target,
                title: "Our Mission",
                desc: "We deliver sustainable value to our key stakeholders through incomparable Service Excellence and Brand Building, aiming to be the strategic partner of choice.",
                color: "#E63946"
              },
              {
                icon: Heart,
                title: "Our Values",
                desc: "Guided by our core values of integrity, initiative and involvement, we have blazed new trails of excellence as we deliver superior products.",
                color: "#7B2CBF"
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-xl text-center"
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${item.color}30` }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <item.icon className="w-8 h-8" style={{ color: item.color }} />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Integrity", desc: "We maintain the highest standards and are committed to fair dealing. We safeguard customer interests and provide quality holistic IT Products.", color: "#00B4D8" },
              { icon: Lightbulb, title: "Initiative", desc: "We strive for excellence in everything we do. Always customer-focused, proactive in our approach, improving and innovating constantly.", color: "#2D6A4F" },
              { icon: Users, title: "Involvement", desc: "We foster a strong sense of belonging for all stakeholders. We adopt a team approach governed by respect and courtesy.", color: "#F77F00" },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${value.color}30` }}
                >
                  <value.icon className="w-6 h-6" style={{ color: value.color }} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2" style={{ color: value.color }}>{value.title}</h4>
                  <p className="text-gray-400 text-sm">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 inline-block ${i % 2 === 0 ? "md:ml-auto" : ""}`}>
                      <span className="text-3xl font-bold" style={{ color: item.color }}>{item.year}</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{item.event}</p>
                    </div>
                  </div>
                  <div
                    className="w-4 h-4 rounded-full shrink-0 hidden md:block ring-4 ring-white dark:ring-gray-950"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The dedicated professionals behind Stem Magnetics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                  style={{ backgroundColor: logoColors[i % logoColors.length] }}
                />
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white"
                  style={{ backgroundColor: logoColors[i % logoColors.length] }}
                >
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-sm font-medium mb-4" style={{ color: logoColors[i % logoColors.length] }}>{member.role}</p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 stem-gradient opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Stem House</h2>
              <p className="text-white/80 mb-8">
                Our headquarters is conveniently located just 5 minutes drive from the city center. Visit us for all your ICT needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-white/80">2 Bradfield Rd, Hillside, Harare, Zimbabwe</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-white/80">+263 242-747 587 </p>
                  </div>
                </div>
                  <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-white/80">sales@stem-magnetics.co.zw</p>
                      </div>
                  </div>
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Business Hours</h4>
                    <p className="text-white/80">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl h-[450px]"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.7373898711153!2d31.067760810550823!3d-17.833913783061075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4cf3045f135%3A0xe1b26bfbf8130943!2sStemMagnetics!5e1!3m2!1sen!2szw!4v1767862249390!5m2!1sen!2szw" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
