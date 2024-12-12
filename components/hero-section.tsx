"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <div className="relative min-h-[80vh] bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900"
            >
              Compassionate Home Care for Your Loved Ones
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-xl"
            >
              Experience professional, personalized care that helps seniors live independently
              and families find peace of mind.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Schedule a Free Consultation
              </Button>
              <Button size="lg" variant="outline">
                Learn About Our Services
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <img
              src="https://media.gettyimages.com/id/809822820/photo/caring-comes-naturally-to-her.jpg?s=2048x2048&w=gi&k=20&c=U3s_FRX7Ng5zYkkvP6CDh2h1UJIq6_t9z-2TzchySvg="
              alt="Caring home health professional with patient"
              className="rounded-lg shadow-2xl"
              width={600}
              height={400}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-3 rounded-full text-white">
                  ⭐
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Trusted Care Provider</h3>
                  <p className="text-gray-600">Over 1,000 families served with 5-star ratings</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

