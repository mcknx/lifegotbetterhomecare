"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, Stethoscope, Sparkles } from "lucide-react"

export function ServicesBanner() {
  const serviceCategories = [
    {
      icon: Heart,
      title: "Homecare Services",
      description: "Personal care, companionship, and assistance with daily living activities.",
      href: "#homecare-services"
    },
    {
      icon: Stethoscope,
      title: "Home Medical Care",
      description: "Specialized care for chronic conditions, post-operative recovery, and medical supervision.",
      href: "#medical-care"
    },
    {
      icon: Sparkles,
      title: "Specialty Services",
      description: "Tailored care options including meal preparation, transportation, and fall prevention.",
      href: "#specialty-services"
    }
  ]

  return (
    <div className="relative py-24 bg-gradient-to-b from-primary/5 to-white">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/3"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full translate-x-1/3"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary-dark mb-4">
            OUR SERVICES
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6">
            Personalized CARE For You
          </h1>
          <p className="text-lg text-slate-600">
            We provide tailored home care solutions designed to meet your unique needs, 
            ensuring comfort, dignity, and independence for you or your loved ones.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-slate-100"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <category.icon className="w-8 h-8 text-primary-dark" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {category.title}
              </h3>
              <p className="text-slate-600 mb-5">
                {category.description}
              </p>
              <Link 
                href={category.href} 
                className="inline-flex items-center gap-1 text-primary-dark font-medium hover:underline"
              >
                Learn more
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 