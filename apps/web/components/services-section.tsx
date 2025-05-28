"use client"

import { motion } from "framer-motion"
import { Utensils, Stethoscope, Coffee, Car, Home, ClipboardList, Heart, Shield, AlertTriangle, Phone, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function ServicesSection() {
  const services = [
    {
      icon: Heart,
      title: "Companion Care",
      description: "Our care professionals provide friendship and engage your loved ones in conversations and enjoyable activities to brighten their day."
    },
    {
      icon: Shield,
      title: "Personal Care and Grooming",
      description: "We provide assistance with all personal care activities, including restroom use, dressing, oral hygiene, bathing, and more."
    },
    {
      icon: Utensils,
      title: "Meal Preparation",
      description: "We provide daily meal preparation and serving for clients, ensuring proper nutrition while adhering to dietary needs."
    },
    {
      icon: Home,
      title: "Light Housekeeping",
      description: "We help maintain a clean home by assisting with laundry, sweeping, dusting, and other light housekeeping tasks."
    },
    {
      icon: ClipboardList,
      title: "Care Management",
      description: "We assist in managing care by helping with scheduling, medication reminders, doctor visits, and providing respite care."
    },
    {
      icon: Car,
      title: "Senior Transportation",
      description: "Our care professionals assist individuals who are unable to drive by offering transportation to appointments and errands."
    }
  ]

  return (
    <div id="homecare-services" className="relative py-16 sm:py-20 lg:py-24 bg-white">
      {/* Decorative circles - hidden on mobile */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/3 hidden md:block"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3 hidden md:block"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary-dark mb-4">
            HOMECARE SERVICES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 sm:mb-6 leading-tight">
            Compassionate <span className="text-primary-dark">Daily Care</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We offer a full range of personalized home care services to help your loved ones maintain their independence, dignity, and quality of life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-x-8 sm:gap-y-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 sm:gap-5 group"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-dark" />
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
} 