"use client"

import { motion } from "framer-motion"
import { Utensils, Stethoscope, Coffee, Car, Home, ClipboardList, Heart, Shield, AlertTriangle, Phone } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      icon: Utensils,
      title: "Meal Preparation",
      description: "Our caregivers provide daily meal preparation and serving for clients who are unable to cook. We ensure your loved ones receive proper nutrition while adhering to their dietary needs."
    },
    {
      icon: Stethoscope,
      title: "After Surgery Care / Post-Operative Care at Home",
      description: "Returning home after a hospital stay can be challenging, especially for seniors. Our caregivers are here to support a smooth transition by monitoring health conditions and providing medication reminders to reduce the risk of setbacks."
    },
    {
      icon: Coffee,
      title: "Respite Care",
      description: "Our caregivers offer respite care services, giving family caregivers the opportunity to take a well-deserved break. We provide exceptional care for your loved ones during scheduled visits, ensuring peace of mind while the family caregiver takes time off."
    },
    {
      icon: Car,
      title: "Errands and Senior Transportation",
      description: "Our caregivers assist individuals who are unable to drive by offering transportation and handling their errands."
    },
    {
      icon: Home,
      title: "Light Housekeeping",
      description: "We help maintain a clean and tidy home for your loved ones by assisting with laundry, sweeping, dusting, and other light housekeeping tasks."
    },
    {
      icon: ClipboardList,
      title: "Care Management",
      description: "We assist in managing your loved ones' care by helping with scheduling, medication reminders, doctor visits, and providing respite care."
    },
    {
      icon: Heart,
      title: "Companion Care",
      description: "Seniors and adults with disabilities need not only quality care but also meaningful companionship. Our caregivers provide friendship and engage your loved ones in conversations and enjoyable activities to brighten their day."
    },
    {
      icon: AlertTriangle,
      title: "Elderly Fall Prevention",
      description: "Our caregivers ensure the safety of your elderly loved ones at home by taking precautions to minimize fall risks. This includes maintaining a clutter-free environment and assisting them with moving safely around the house."
    },
    {
      icon: Shield,
      title: "Personal Care and Grooming",
      description: "Seniors and adults with disabilities may face challenges with personal tasks due to cognitive or physical limitations. Our caregivers provide assistance with all personal care activities, including restroom use, dressing, oral hygiene, bathing, and more."
    }
  ]

  return (
    <div className="relative py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-600 font-medium mb-4"
          >
            EXPERTISE
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
          >
            Commitment to your needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            A specialist caregiver is available for any need. We are available in 150+ locations
            with modern facilities and experienced caregivers.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600">Expert Caregivers</p>
              <p className="font-semibold text-gray-900">250+</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 