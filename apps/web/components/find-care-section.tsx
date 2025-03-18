"use client"

import { motion } from "framer-motion"
import { Star, Heart, ArrowRight, Phone } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import Link from "next/link"

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
    <div className="relative py-24 bg-gradient-to-b from-white to-secondary/20">
      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full translate-x-1/4"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary/10 rounded-full"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 md:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image 
                src="/p1-pink.png"
                alt="Senior woman receiving home care with a caregiver"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-60"></div>
            </div>
            
            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-lg p-5 max-w-[300px] border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-[15px]">Trusted Care Provider</h3>
                  <p className="text-slate-600 text-sm">Over 1,000 families served with 5-star ratings</p>
                </div>
              </div>
            </motion.div>
            
            {/* Second floating card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -top-8 -left-8 bg-white rounded-xl shadow-lg p-4 max-w-[220px] border border-slate-100 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 bg-primary/10 p-2.5 rounded-full">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-[15px]">200+</h3>
                  <p className="text-slate-600 text-sm">Healthcare Professionals</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 md:order-2"
          >
            <div>
              <span className="text-sm font-medium text-primary bg-primary/10 py-1 px-3 rounded-full">TRUSTED HOME CARE</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mt-4 leading-tight">
                Compassionate <span className="text-primary">Home Care</span>.
                <br />
                For Your <span className="text-primary">Loved Ones</span>.
              </h2>
            </div>

            <p className="text-slate-600 text-lg">
              Experience professional, personalized care that helps seniors live independently and enables true peace of mind for their families.
            </p>

            {/* Tabs */}
            <div className="border-b border-slate-200">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-3 text-lg transition-colors ${activeTab === 'care' 
                    ? 'border-b-2 border-primary text-primary font-medium' 
                    : 'text-slate-500 hover:text-primary'}`}
                  aria-pressed={activeTab === 'care'}
                >
                  Find Care
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`pb-3 text-lg transition-colors ${activeTab === 'jobs' 
                    ? 'border-b-2 border-primary text-primary font-medium' 
                    : 'text-slate-500 hover:text-primary'}`}
                  aria-pressed={activeTab === 'jobs'}
                >
                  Find Jobs
                </button>
              </div>
            </div>

            {activeTab === 'care' ? (
              <div className="space-y-6">
                <p className="text-slate-600">
                  Our personalized home care services are designed to help your loved ones maintain their independence and dignity.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="#contact"
                    onClick={handleScheduleConsultation}
                    className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3.5 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Schedule a Free Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="#services"
                    className="flex items-center justify-center gap-2 bg-white border-2 border-primary hover:bg-primary/5 text-primary px-6 py-3.5 rounded-lg font-medium text-lg transition-all"
                  >
                    Learn About Our Services
                  </Link>
                </div>

                {/* Phone number for direct contact - elderly friendly */}
                <div className="mt-6 bg-white p-4 rounded-lg border border-slate-200 inline-flex items-center gap-3">
                  <div className="bg-primary text-white p-2.5 rounded-full">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Call us directly</p>
                    <a href="tel:+15174209812" className="text-lg font-medium text-primary hover:underline">
                      (517) 420-9812
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-slate-600">
                  Join our team of compassionate caregivers and make a difference in seniors' lives with a rewarding career.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="#contact"
                    onClick={handleViewPositions}
                    className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3.5 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg"
                  >
                    View Open Positions
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="#contact"
                    className="flex items-center justify-center gap-2 bg-white border-2 border-primary hover:bg-primary/5 text-primary px-6 py-3.5 rounded-lg font-medium text-lg transition-all"
                  >
                    Learn About Careers
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 