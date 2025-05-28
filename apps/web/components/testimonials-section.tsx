'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    quote: "Life Got Better Homecare has been a true blessing for our family. Their personal care workers go above and beyond to ensure my father's comfort and dignity. We feel reassured knowing he is in caring, professional hands. Thank you for making his days easier and brighter!",
    author: "Sarah M., Daughter of a Client"
  },
  {
    id: 2,
    quote: "The caregivers at Life Got Better Homecare treat my mother like their own family. They not only assist with daily tasks but also bring warmth and companionship into her life. The personalized care and genuine kindness they provide have made all the difference.",
    author: "James R., Son of a Client"
  },
  {
    id: 3,
    quote: "After my surgery, I needed extra support at home, and Life Got Better Homecare was there every step of the way. My personal care worker was attentive, patient, and professional. Their assistance helped me recover faster and with peace of mind.",
    author: "Maria L., Post-Op Client"
  },
  {
    id: 4,
    quote: "Working as a Personal Care Worker for Life Got Better Homecare has been the most fulfilling job. The company truly values both clients and employees, ensuring we have the resources to provide the best care possible. It's rewarding to be part of a team that changes lives every day.",
    author: "Angela D., Personal Care Worker"
  },
  {
    id: 5,
    quote: "Finding the right home care service for my grandfather was overwhelming until we found Life Got Better Homecare. Their team was understanding, professional, and deeply compassionate. Knowing he is in safe and capable hands gives our family priceless peace of mind.",
    author: "Michael S., Grandson of a Client"
  }
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 6000) // Change testimonial every 6 seconds
    
    return () => clearInterval(interval) // Clean up interval on unmount
  }, [])
  
  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }
  
  const handleNext = () => {
    setDirection(1)
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }
  
  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  }
  
  return (
    <div className="py-16 sm:py-20 bg-secondary/80">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="relative py-8 sm:py-12">
          {/* Testimonials */}
          <div className="min-h-[280px] sm:min-h-[320px] md:min-h-[280px] relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center max-w-3xl mx-auto px-4 relative">
                  {/* Left Quote - positioned better for mobile */}
                  <span className="absolute left-0 -top-6 sm:-top-8 md:-top-12 text-white text-4xl sm:text-6xl md:text-8xl font-serif opacity-70">
                    &ldquo;
                  </span>
                  
                  <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 text-[#333] leading-relaxed px-6 sm:px-8">
                    {testimonials[activeIndex].quote}
                  </h3>
                  
                  {/* Right Quote - positioned better for mobile */}
                  <span className="absolute right-0 -bottom-4 sm:-bottom-6 md:-bottom-8 text-white text-4xl sm:text-6xl md:text-8xl font-serif opacity-70">
                    &rdquo;
                  </span>
                  
                  <p className="text-base sm:text-lg md:text-xl text-[#555] font-medium mt-4">
                    {testimonials[activeIndex].author}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 sm:mt-10 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center",
                  idx === activeIndex ? "bg-white" : "bg-white/50"
                )}
                aria-label={`View testimonial ${idx + 1}`}
              >
                <span className={cn(
                  "w-3 h-3 rounded-full",
                  idx === activeIndex ? "bg-white" : "bg-white/50"
                )} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 