'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: "Spring your career forward!",
    subtitle: "Explore caring careers today.",
    buttonText: "LEARN MORE",
    buttonLink: "#jobs",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Compassionate Care",
    subtitle: "For your loved ones.",
    buttonText: "FIND CARE",
    buttonLink: "#find-care",
    imageUrl: "https://images.unsplash.com/photo-1576765608866-5b51046452be?q=80&w=2874&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Quality Services",
    subtitle: "Tailored to your needs.",
    buttonText: "OUR SERVICES",
    buttonLink: "#services",
    imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2940&auto=format&fit=crop"
  }
]

export function HeroSection() {
  const [isClient, setIsClient] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    setIsClient(true)
    
    // Auto-advance carousel
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length)
  }
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }
  
  const goToSlide = (index: number) => {
    setActiveSlide(index)
  }
  
  return (
    <div className="relative min-h-[600px] w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {isClient && (
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="absolute inset-0 bg-black/30" />
                <img 
                  src={slide.imageUrl} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10 min-h-[600px] w-full flex items-center">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2">
          <div className="col-span-1"></div>
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 bg-[#9B59B6] bg-opacity-85 p-10 md:p-16 text-white rounded-sm"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              {slides[activeSlide].title}
            </h2>
            <p className="text-2xl md:text-3xl font-bold mb-8">
              {slides[activeSlide].subtitle}
            </p>
            <a 
              href={slides[activeSlide].buttonLink}
              className="inline-block bg-white text-[#9B59B6] px-6 py-3 rounded-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              {slides[activeSlide].buttonText}
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}
