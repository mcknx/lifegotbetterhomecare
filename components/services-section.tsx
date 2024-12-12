"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Utensils, Heart, Pill } from 'lucide-react'

const services = [
  {
    icon: Clock,
    title: "24/7 Care Available",
    description: "Round-the-clock support for those who need continuous care and monitoring."
  },
  {
    icon: Utensils,
    title: "Meal Preparation",
    description: "Nutritious meal planning and preparation following dietary requirements."
  },
  {
    icon: Heart,
    title: "Personal Care",
    description: "Assistance with daily activities, hygiene, and mobility support."
  },
  {
    icon: Pill,
    title: "Medication Management",
    description: "Careful monitoring and administration of prescribed medications."
  }
]

export function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Comprehensive Care Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide a wide range of professional home care services tailored to meet
            the unique needs of each individual we serve.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

