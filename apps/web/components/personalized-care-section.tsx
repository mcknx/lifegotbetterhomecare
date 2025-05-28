"use client"

import { motion } from "framer-motion"
import { Heart, UserCircle, HeartHandshake, Sparkles } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export function PersonalizedCareSection() {
  return (
    <div className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative circles - hidden on mobile */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/4 hidden md:block"></div>
      <div className="absolute bottom-10 right-0 w-56 h-56 bg-secondary/5 rounded-full translate-x-1/4 hidden md:block"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[300px] sm:h-[400px] lg:h-[500px]">
              <Image
                src="/images/male-social-worker-taking-care-old-woman.png"
                alt="Professional caregiver helping elderly patient at home"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-multiply" />
            </div>
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 sm:mb-6 leading-tight">
              Personalized Care, <span className="text-primary-dark">Compassionate Support</span>
            </h2>
            
            <div className="space-y-4 sm:space-y-6 text-slate-600">
              <p className="text-base sm:text-lg leading-relaxed">
                At Life Got Better Homecare, we understand that no two individuals are the same—that's why we provide personalized care designed around you. Whether it's personal care, post-operative support, or companionship, our compassionate caregivers tailor every service to fit your unique needs, preferences, and lifestyle.
              </p>
              
              <p className="font-medium text-base sm:text-lg text-primary-dark">
                Because care isn't one-size-fits-all—it's personal. Let us provide the support that feels like home.
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Key features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
              <UserCircle className="w-6 h-6 sm:w-7 sm:h-7 text-primary-dark" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">Individualized Approach</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">We create customized care plans tailored to your unique health needs, preferences, and lifestyle.</p>
          </div>
          
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
              <HeartHandshake className="w-6 h-6 sm:w-7 sm:h-7 text-primary-dark" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">Compassionate Caregivers</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Our team delivers care with kindness, dignity, and respect, ensuring you feel comfortable and valued.</p>
          </div>
          
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-primary-dark" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">Life-Enhancing Support</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">We go beyond basic care to provide services that improve your quality of life and promote independence.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 