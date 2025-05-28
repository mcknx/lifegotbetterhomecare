"use client"

import { motion } from "framer-motion"
import { Utensils, Car, Coffee, Shield, Home } from 'lucide-react'

export function SpecialtyServicesSection() {
  const services = [
    {
      icon: Coffee,
      title: "Respite Care",
      description: "Temporary relief for family caregivers, giving them a well-deserved break while ensuring your loved ones receive the attention they need."
    },
    {
      icon: Shield,
      title: "Fall Prevention",
      description: "Comprehensive home safety assessments and interventions to reduce fall risks and ensure a secure living environment for elderly clients."
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Safe, reliable transportation services for medical appointments, shopping, social activities, and other essential errands."
    },
    {
      icon: Home,
      title: "24/7 & Live-in Care",
      description: "Around-the-clock home care for families, providing continuous supervision and assistance for those with complex needs or requiring constant attention."
    }
  ]

  return (
    <div id="specialty-services" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative circles - hidden on mobile */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/5 rounded-full -translate-x-1/3 hidden md:block"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3 hidden md:block"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary-dark mb-4">
            SPECIALTY SERVICES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 sm:mb-6 leading-tight">
            Additional Support <span className="text-primary-dark">For Complete Care</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Enhance quality of life with our specialty services that complement our core care offerings, 
            providing a well-rounded approach to home care that addresses all aspects of daily living.
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