'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/HrrabAxWinloumzm/videoblocks-413_u0vosu9siehfquxusenbukugmje_htd_56jkk__b2fbd0d30fdf4d9afe10971242ac6f14__P360.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
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

            <span className="block text-3xl sm:text-4xl lg:text-5xl text-blue-600 mt-2">
            Home Health Care
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed max-w-3xl mx-auto">
          Experience compassionate, top-quality care tailored to your loved one&apos;s needs. Trust us to provide a brighter, healthier future through personalized care and support. 

          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="https://www.facebook.com/lifegotbetterstaffing/" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded text-lg font-semibold hover:bg-white/10 transition-colors inline-block min-w-[200px]"
            >
              Connect with Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
