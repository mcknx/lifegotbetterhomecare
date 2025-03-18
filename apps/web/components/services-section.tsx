"use client"

import { motion } from "framer-motion"
import { Utensils, Stethoscope, Coffee, Car, Home, ClipboardList, Heart, Shield, AlertTriangle, Phone, ChevronRight } from 'lucide-react'
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
      icon: Stethoscope,
      title: "Post-Operative Care",
      description: "We support a smooth transition after hospital stays by monitoring health conditions and providing medication reminders."
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
      icon: Coffee,
      title: "Respite Care",
      description: "We provide exceptional care for your loved ones during scheduled visits, giving family caregivers a well-deserved break."
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
    },
    {
      icon: AlertTriangle,
      title: "Fall Prevention",
      description: "We ensure the safety of your elderly loved ones at home by minimizing fall risks and assisting with safe mobility."
    }
  ]

  return (
    <div className="relative py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary mb-4">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Compassionate Care Services
          </h2>
          <p className="text-lg text-slate-600">
            We offer a full range of personalized home care services to help your loved ones maintain their independence, dignity, and quality of life.
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
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-secondary/20 p-8 rounded-2xl max-w-4xl mx-auto shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Need personalized care?</h3>
                <p className="text-slate-600">Contact us today to discuss how we can help your loved ones.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#contact"
                  className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg"
                >
                  Contact Us 
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+15174209812"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-primary border-2 border-primary px-6 py-3 rounded-lg font-medium text-lg transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 