'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    title: "Professional Care You Can Trust",
    subtitle: "Caring for your loved ones with compassion and expertise.",
    buttonText: "Find Care Now",
    buttonLink: "#contact"
  },
  {
    id: 2,
    title: "Personalized Home Care",
    subtitle: "Tailored services to enhance quality of life for your family.",
    buttonText: "Our Services",
    buttonLink: "/services"
  },
  {
    id: 3,
    title: "Join Our Team",
    subtitle: "Make a difference in seniors' lives with a rewarding career.",
    buttonText: "Explore Jobs",
    buttonLink: "/careers"
  }
]

export function HeroSection() {
  const [isClient, setIsClient] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Auto-advance carousel
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 7000) // Longer duration for elderly users to read
    
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    // Play video when component mounts or when video element is available
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error)
      })
    }
  }, [isClient])
  
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
    <div className="relative min-h-[86vh] w-full flex items-center overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/10 rounded-full z-0"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary/5 rounded-full z-0"></div>
      
      {/* Background Video - Contained within hero section */}
      <div className="absolute inset-0 z-[-1]">
        {isClient && (
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-primary/80 z-10" />
            <video 
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="/videos/nurse-patient.mp4"
            />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full min-h-[75vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="col-span-1 hidden lg:block">
            {/* Empty left column to push content to the right on desktop */}
          </div>
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="col-span-1 bg-white/95 backdrop-blur-md p-8 md:p-12 text-primary-dark rounded-xl shadow-lg max-w-xl lg:ml-auto border border-white/20"
          >
            <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary-dark mb-6">
              Quality Home Care Services
            </span>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4 text-slate-800 drop-shadow-sm">
              {slides[activeSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-slate-700 mb-8 font-light drop-shadow-sm">
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
                className="inline-flex items-center gap-2 bg-white border-2 border-primary hover:bg-primary/5 text-primary-dark px-6 py-3 rounded-lg font-medium text-lg transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Controls - positioned at bottom of the container */}
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-primary-dark p-3 rounded-full transition-colors shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-primary-dark p-3 rounded-full transition-colors shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}
