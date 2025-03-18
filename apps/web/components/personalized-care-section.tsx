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
                src="/images/elder-care.jpg"
                alt="Compassionate caregiver with elderly client"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-multiply" />
            </div>
            
            {/* Feature cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-5 max-w-[260px] border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-[15px]">Compassion First</h3>
                  <p className="text-slate-600 text-sm">Care delivered with empathy</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-5 max-w-[240px] border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <UserCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-[15px]">Tailored Approach</h3>
                  <p className="text-slate-600 text-sm">Care designed around you</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary mb-4">
              OUR APPROACH
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Personalized Care, <span className="text-primary">Compassionate Support</span>
            </h2>
            
            <div className="space-y-6 text-slate-600">
              <p className="text-lg leading-relaxed">
                At Life Got Better Homecare, we understand that no two individuals are the same—that's why we provide personalized care designed around you. Whether it's personal care, post-operative support, or companionship, our compassionate caregivers tailor every service to fit your unique needs, preferences, and lifestyle.
              </p>
              
              <p className="font-medium text-lg text-primary">
                Because care isn't one-size-fits-all—it's personal. Let us provide the support that feels like home.
              </p>
            </div>
            
            {/* <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg"
              >
                Schedule a Consultation
              </Link>
              <Link 
                href="#services" 
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary hover:bg-primary/5 text-primary px-6 py-3 rounded-lg font-medium text-lg transition-all"
              >
                Learn More
              </Link>
            </div> */}
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
              <UserCircle className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Individualized Approach</h3>
            <p className="text-slate-600">We create customized care plans tailored to your unique health needs, preferences, and lifestyle.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <HeartHandshake className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Compassionate Caregivers</h3>
            <p className="text-slate-600">Our team delivers care with kindness, dignity, and respect, ensuring you feel comfortable and valued.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Life-Enhancing Support</h3>
            <p className="text-slate-600">We go beyond basic care to provide services that improve your quality of life and promote independence.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 