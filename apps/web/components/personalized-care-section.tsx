"use client"

import { motion } from "framer-motion"
import { Heart, UserCircle, HeartHandshake, Sparkles } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export function PersonalizedCareSection() {
  return (
    <div className="relative py-24 bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative circles */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/4"></div>
      <div className="absolute bottom-10 right-0 w-56 h-56 bg-secondary/5 rounded-full translate-x-1/4"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[500px]">
              <Image
                src="/images/male-social-worker-taking-care-old-woman.png"
                alt="Professional caregiver helping elderly patient at home"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-multiply" />
            </div>
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Personalized Care, <span className="text-primary-dark">Compassionate Support</span>
            </h2>
            
            <div className="space-y-6 text-slate-600">
              <p className="text-lg leading-relaxed">
                At Life Got Better Homecare, we understand that no two individuals are the same—that's why we provide personalized care designed around you. Whether it's personal care, post-operative support, or companionship, our compassionate caregivers tailor every service to fit your unique needs, preferences, and lifestyle.
              </p>
              
              <p className="font-medium text-lg text-primary-dark">
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
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <UserCircle className="w-7 h-7 text-primary-dark" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Individualized Approach</h3>
            <p className="text-slate-600">We create customized care plans tailored to your unique health needs, preferences, and lifestyle.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <HeartHandshake className="w-7 h-7 text-primary-dark" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Compassionate Caregivers</h3>
            <p className="text-slate-600">Our team delivers care with kindness, dignity, and respect, ensuring you feel comfortable and valued.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Sparkles className="w-7 h-7 text-primary-dark" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Life-Enhancing Support</h3>
            <p className="text-slate-600">We go beyond basic care to provide services that improve your quality of life and promote independence.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 