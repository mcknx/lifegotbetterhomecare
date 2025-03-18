"use client"

import { motion } from "framer-motion"
import { Heart, Award, Clock, Users } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  return (
    <div className="relative py-24 bg-gradient-to-b from-white to-slate-50">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/5 rounded-full -translate-x-1/3 translate-y-1/4"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary mb-4">
              ABOUT US
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Compassionate Care <span className="text-primary">Since 2019</span>
            </h2>
            
            <div className="space-y-6 text-slate-600">
              <p className="text-lg leading-relaxed">
                Established in 2019, Life Got Better Homecare is a trusted personal care agency dedicated to delivering compassionate, high-quality home care services that empower individuals to live safely and independently in the comfort of their own homes. We specialize in personal care, post-operative care, companion care, and senior assistance, catering to individuals recovering from surgery, aging adults, and those in need of daily support.
              </p>
              
              <p className="text-lg leading-relaxed">
                At Life Got Better Homecare, we understand that every client has unique needs, which is why we provide customized care plans tailored to promote dignity, comfort, and overall well-being. Our team of highly trained caregivers is committed to delivering compassionate and reliable support that enhances quality of life.
              </p>
              
              <p className="text-lg leading-relaxed">
                Our mission is to help families navigate the challenges of caregiving with trustworthy, professional, and affordable home care solutions. We take pride in enhancing independence and improving overall health outcomes for our clients.
              </p>
              
              <p className="font-medium text-lg text-primary">
                Because with the right care, Life Truly Gets Better.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg"
              >
                Contact Us Today
              </Link>
              <Link 
                href="#services" 
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary hover:bg-primary/5 text-primary px-6 py-3 rounded-lg font-medium text-lg transition-all"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
          
          {/* Right side - Image and stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[500px]">
              <Image
                src="/p2-pink.png"
                alt="Caring professionals at Life Got Better Homecare"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent mix-blend-multiply" />
            </div>
            
            {/* Floating stats cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-5 max-w-[260px] border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-[15px]">Compassionate Care</h3>
                  <p className="text-slate-600 text-sm">Enhancing quality of life since 2019</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-5 max-w-[240px] border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-[15px]">Trained Professionals</h3>
                  <p className="text-slate-600 text-sm">Experienced, dedicated caregivers</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Core values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Compassion</h3>
            <p className="text-slate-600">We provide care with kindness, empathy, and respect for each individual's dignity.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Excellence</h3>
            <p className="text-slate-600">We strive for the highest standards of care through continuous improvement.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Reliability</h3>
            <p className="text-slate-600">We are dependable, consistent, and always there when you need us most.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Personalization</h3>
            <p className="text-slate-600">We create customized care plans tailored to each client's unique needs.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 