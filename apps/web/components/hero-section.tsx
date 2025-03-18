'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    title: "Professional Care You Can Trust",
    subtitle: "Caring for your loved ones with compassion and expertise.",
    buttonText: "Find Care Now",
    buttonLink: "#find-care",
    imageUrl: "https://images.unsplash.com/photo-1576765608866-5b51046452be?q=80&w=2874&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Personalized Home Care",
    subtitle: "Tailored services to enhance quality of life for your family.",
    buttonText: "Our Services",
    buttonLink: "#services",
    imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Join Our Team",
    subtitle: "Make a difference in seniors' lives with a rewarding career.",
    buttonText: "Explore Jobs",
    buttonLink: "#jobs",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop"
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
    }, 7000) // Longer duration for elderly users to read
    
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
    <div className="relative min-h-[650px] w-full flex items-center overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/10 rounded-full z-0"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary/5 rounded-full z-0"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {isClient && (
          <div className="relative w-full h-full">
            <AnimatePresence>
              {slides.map((slide, index) => (
                index === activeSlide && (
                  <motion.div 
                    key={slide.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-black/40" />
                    <img 
                      src={slide.imageUrl} 
                      alt={`${slide.title} - ${slide.subtitle}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10 min-h-[650px] w-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="col-span-1 bg-white/90 backdrop-blur-sm p-8 md:p-12 text-primary rounded-xl shadow-lg max-w-xl"
          >
            <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary mb-6">
              Quality Home Care Services
            </span>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4 text-slate-800">
              {slides[activeSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-slate-700 mb-8 font-light">
              {slides[activeSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href={slides[activeSlide].buttonLink}
                className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg"
              >
                {slides[activeSlide].buttonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#contact"
                className="inline-flex items-center gap-2 bg-white border-2 border-primary hover:bg-primary/5 text-primary px-6 py-3 rounded-lg font-medium text-lg transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === activeSlide 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-primary p-3 rounded-full transition-colors shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-primary p-3 rounded-full transition-colors shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}
