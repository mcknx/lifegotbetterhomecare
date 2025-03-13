"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Star } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation"

export function FindCareSection() {
  const [activeTab, setActiveTab] = useState<'care' | 'jobs'>('care')
  const router = useRouter()

  const handleScheduleConsultation = () => {
    // Scroll to contact form and select "care" option
    const contactForm = document.getElementById('contact')
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleViewPositions = () => {
    // Scroll to contact form and select "employment" option
    const contactForm = document.getElementById('contact')
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' })
      // Find and click the employment radio button
      const employmentRadio = document.querySelector('input[value="employment"]') as HTMLInputElement
      if (employmentRadio) {
        employmentRadio.checked = true
        employmentRadio.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }
  }

  return (
    <div className="relative py-20 bg-[#F7C6C7]/10">
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
              src="/p1.png"
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
                <div className="bg-[#9B59B6] p-3 rounded-full">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3E3E3E]">Trusted Care Provider</h3>
                  <p className="text-[#3E3E3E]/80">Over 1,000 families served with 5-star ratings</p>
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
            <h2 className="text-4xl md:text-5xl font-serif text-[#9B59B6] leading-tight">
              Compassionate <span className="italic">Home Care</span>.
              <br />
              For Your <span className="italic">Loved Ones</span>.
            </h2>

            <p className="text-[#3E3E3E] text-lg">
              Experience professional, personalized care that helps seniors live independently and families find peace of mind.
            </p>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 ${activeTab === 'care' 
                    ? 'border-b-2 border-[#9B59B6] text-[#9B59B6] font-medium' 
                    : 'text-[#3E3E3E]/70'}`}
                >
                  Find Care
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`pb-2 ${activeTab === 'jobs' 
                    ? 'border-b-2 border-[#9B59B6] text-[#9B59B6] font-medium' 
                    : 'text-[#3E3E3E]/70'}`}
                >
                  Find Jobs
                </button>
              </div>
            </div>

            {activeTab === 'care' ? (
              <div className="space-y-4">
                {/* <div className="relative">
                  <input
                    type="text"
                    placeholder="Postal Code or City & State"
                    className="w-full p-3 border border-gray-300 rounded-md pl-10"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div> */}
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-[#9B59B6] hover:bg-[#5D3F6A] text-white"
                    onClick={handleScheduleConsultation}
                  >
                    Schedule a Free Consultation
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#9B59B6] text-[#9B59B6] hover:bg-[#9B59B6]/10"
                    onClick={() => router.push('#services')}
                  >
                    Learn About Our Services
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-[#9B59B6] hover:bg-[#5D3F6A] text-white"
                  onClick={handleViewPositions}
                >
                  View Open Positions
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#9B59B6] text-[#9B59B6] hover:bg-[#9B59B6]/10"
                  onClick={() => router.push('#contact')}
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