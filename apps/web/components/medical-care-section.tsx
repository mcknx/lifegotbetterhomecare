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
    <div id="medical-care" className="relative py-24 bg-gradient-to-b from-white to-slate-50">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-1/3"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary-dark mb-4">
            HOME MEDICAL CARE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Specialized Healthcare <span className="text-primary-dark">At Home</span>
          </h2>
          <p className="text-lg text-slate-600">
            Professional medical care provided in the comfort and familiarity of home, supporting recovery 
            and managing complex health conditions with expertise and compassion.
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