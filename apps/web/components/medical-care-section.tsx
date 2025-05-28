"use client"

import { motion } from "framer-motion"
import { Activity, Brain, Pill, Clipboard, Stethoscope } from 'lucide-react'

export function MedicalCareSection() {
  const services = [
    {
      icon: Activity,
      title: "Chronic Disease Management",
      description: "Specialized care for managing chronic conditions like diabetes, heart disease, and respiratory conditions in the comfort of home."
    },
    {
      icon: Brain,
      title: "Alzheimer's & Dementia Care",
      description: "Specialized memory care and support for individuals with Alzheimer's and other forms of dementia with dignity and compassion."
    },
    {
      icon: Stethoscope,
      title: "Post-Operative Care",
      description: "Recovery support after hospital stays including wound care, medication management, and physical therapy assistance."
    },
    {
      icon: Pill,
      title: "Medication Management",
      description: "Assistance with organizing medications, providing reminders, and ensuring proper medication adherence for better health outcomes."
    },
    {
      icon: Clipboard,
      title: "Care Coordination",
      description: "Collaboration with healthcare providers to ensure seamless care transitions and comprehensive treatment plans."
    }
  ]

  return (
    <div id="medical-care" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      {/* Decorative circles - hidden on mobile */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full translate-x-1/3 hidden md:block"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-1/3 hidden md:block"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary-dark mb-4">
            HOME MEDICAL CARE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 sm:mb-6 leading-tight">
            Specialized Healthcare <span className="text-primary-dark">At Home</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Professional medical care provided in the comfort and familiarity of home, supporting recovery 
            and managing complex health conditions with expertise and compassion.
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