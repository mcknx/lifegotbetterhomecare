"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MapPin, Star } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export function FindCareSection() {
  const [activeTab, setActiveTab] = useState<'care' | 'jobs'>('care')

  return (
    <div className="relative py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Image 
              src="https://media.gettyimages.com/id/809822820/photo/caring-comes-naturally-to-her.jpg?s=2048x2048&w=gi&k=20&c=U3s_FRX7Ng5zYkkvP6CDh2h1UJIq6_t9z-2TzchySvg="
              alt="Senior woman receiving care at home"
              width={500}
              height={300}
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            
            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-[300px]"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Trusted Care Provider</h3>
                  <p className="text-gray-600">Over 1,000 families served with 5-star ratings</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#2563EB] leading-tight">
              Compassionate <span className="italic">Home Care</span>.
              <br />
              For Your <span className="italic">Loved Ones</span>.
            </h2>

            <p className="text-gray-700 text-lg">
              Experience professional, personalized care that helps seniors live independently and families find peace of mind.
            </p>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 ${activeTab === 'care' 
                    ? 'border-b-2 border-blue-600 text-blue-600 font-medium' 
                    : 'text-gray-500'}`}
                >
                  Find Care
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`pb-2 ${activeTab === 'jobs' 
                    ? 'border-b-2 border-blue-600 text-blue-600 font-medium' 
                    : 'text-gray-500'}`}
                >
                  Find Jobs
                </button>
              </div>
            </div>

            {activeTab === 'care' ? (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Postal Code or City & State"
                    className="w-full p-3 border border-gray-300 rounded-md pl-10"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    Schedule a Free Consultation
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600/10"
                  >
                    Learn About Our Services
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white"
                >
                  View Open Positions
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600/10"
                >
                  Learn About Careers
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 