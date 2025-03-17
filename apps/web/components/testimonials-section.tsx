'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    quote: "My therapist really helped me get back on my feet. Had many helpful suggestions and helped me succeed and get back to where I was before.",
    author: "Former Patient, Adrian, MI"
  },
  {
    id: 2,
    quote: "The staff was always kind and understanding to me and my family. A grateful thank you to all who helped me.",
    author: "Former Patient, Bingham Farms, MI"
  },
  {
    id: 3,
    quote: "The best homecare agency I ever had. Very, very satisfied with the care provided.",
    author: "Former Patient, Lafayette, LA"
  },
  {
    id: 4,
    quote: "No one can beat your nurses and therapists, they have manners and are nice.",
    author: "Former Patient, Adrian, MI"
  }
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  return (
    <div className="py-20 bg-[#9B59B6]/5">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative py-12">
          {/* Quote Icon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-md">
            <Quote className="w-8 h-8 text-[#9B59B6]" />
          </div>
          
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
                className="text-center max-w-3xl mx-auto px-4"
              >
                <h3 className="text-2xl md:text-3xl font-light mb-6 text-[#333] leading-relaxed">
                  {testimonial.quote}
                </h3>
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
                  idx === activeIndex ? "bg-[#9B59B6]" : "bg-[#9B59B6]/30"
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