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
    <div id="specialty-services" className="relative py-24 bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/5 rounded-full -translate-x-1/3"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary-dark mb-4">
            SPECIALTY SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Additional Support <span className="text-primary-dark">For Complete Care</span>
          </h2>
          <p className="text-lg text-slate-600">
            Enhance quality of life with our specialty services that complement our core care offerings, 
            providing a well-rounded approach to home care that addresses all aspects of daily living.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-5 group"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary-dark" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 