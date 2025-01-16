"use client"

import { motion } from "framer-motion"
import { Shield, Heart, Home, Car, Utensils, ClipboardList, Stethoscope } from 'lucide-react'

export function BenefitsSection() {
  const services = [
    {
      icon: Shield,
      title: "Personal Care",
    },
    {
      icon: Heart,
      title: "Memory Care",
    },
    {
      icon: Home,
      title: "Hospice Support",
    },
    {
      icon: Car,
      title: "Mobility Assistance",
    },
    {
      icon: Utensils,
      title: "Meal Prep",
    },
    {
      icon: Car,
      title: "Transportation",
    },
    {
      icon: ClipboardList,
      title: "Housekeeping",
    },
    {
      icon: Stethoscope,
      title: "Medication Reminders",
    }
  ]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">
            What personalized care can look like
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-3">
                <service.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-sm text-blue-600 font-medium">
                {service.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 