'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
  
  return (
    <div className="py-20 bg-primary/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative py-12">
          {/* Testimonials */}
          <div className="min-h-[200px] flex items-center justify-center">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: idx === activeIndex ? 1 : 0,
                  display: idx === activeIndex ? 'block' : 'none'
                }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto px-4 relative"
              >
                {/* Left Quote */}
                <span className="absolute -left-8 -top-8 text-white text-8xl font-serif opacity-70">
                  &ldquo;
                </span>
                
                <h3 className="text-2xl md:text-3xl font-light mb-6 text-[#333] leading-relaxed">
                  {testimonial.quote}
                </h3>
                
                {/* Right Quote */}
                <span className="absolute -right-8 -bottom-2 text-white text-8xl font-serif opacity-70">
                  &rdquo;
                </span>
                
                <p className="text-lg text-[#555] font-medium">
                  {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-10 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  idx === activeIndex ? "bg-white" : "bg-white/50"
                )}
                aria-label={`View testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 