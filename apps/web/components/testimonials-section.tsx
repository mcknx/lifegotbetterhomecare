'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    quote: "My therapist, Patty really helped me get back on my feet. Had many helpful suggestions and helped me succeed and get back to where I was before the stroke.",
    author: "Former Patient, Sallisaw, OK"
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