'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {isClient && (
          <video
            src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/HrrabAxWinloumzm/videoblocks-413_u0vosu9siehfquxusenbukugmje_htd_56jkk__b2fbd0d30fdf4d9afe10971242ac6f14__P360.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-white tracking-wide">
          Life Got Better 

            <span className="block text-3xl sm:text-4xl lg:text-5xl text-[#F7C6C7] mt-2">
            Home Care
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed max-w-3xl mx-auto">
          Experience compassionate, top-quality care tailored to your loved one&apos;s needs. Trust us to provide a brighter, healthier future through personalized care and support. 

          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="#contact"
              className="bg-[#9B59B6] border-2 border-[#9B59B6] text-white px-8 py-4 rounded text-lg font-semibold hover:bg-[#5D3F6A] hover:border-[#5D3F6A] transition-colors inline-block min-w-[200px]"
            >
              Connect with Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
