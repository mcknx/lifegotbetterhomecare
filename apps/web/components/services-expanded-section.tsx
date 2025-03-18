'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'

// Types for service data
type Service = {
  name: string
  href: string
  description: string
}

type ServiceCategory = {
  title: string
  services: Service[]
}

// Global state management for showing/hiding services panel
import { useServicesPanel } from '@/lib/services-panel-context'

export function ServicesExpandedSection() {
  const { isServicesPanelOpen, closeServicesPanel } = useServicesPanel()

  // Service categories data (same as in nav-bar)
  const serviceCategories: ServiceCategory[] = [
    {
      title: "HOME CARE SERVICES",
      services: [
        { name: "Personal Care", href: "#services", description: "Expert care by highly skilled professionals" },
        { name: "Home Health Aides", href: "#services", description: "Care and support for daily activities" },
        { name: "Senior Care", href: "#services", description: "Keeping seniors safe and engaged at home" },
        { name: "Pediatric Care", href: "#services", description: "Supporting children with special needs" },
        { name: "24/7 & Live-in Care", href: "#services", description: "Around-the-clock home care for families" },
      ]
    },
    {
      title: "HOME MEDICAL CARE",
      services: [
        { name: "Chronic Disease Management", href: "#services", description: "Specialized medical care at home" },
        { name: "Alzheimer's & Dementia Care", href: "#services", description: "Specialized memory support" },
        { name: "Post-Operative Care", href: "#services", description: "Recovery support after hospital stays" },
        { name: "Medication Management", href: "#services", description: "Ensuring proper medication adherence" }
      ]
    },
    {
      title: "SPECIALTY SERVICES",
      services: [
        { name: "Respite Care", href: "#services", description: "Relief for family caregivers" },
        { name: "Fall Prevention", href: "#services", description: "Safety measures for elderly clients" },
        { name: "Meal Preparation", href: "#services", description: "Nutritious meals for special diets" },
        { name: "Transportation", href: "#services", description: "Safe transport to appointments" }
      ]
    }
  ]

  // Close the panel when user clicks outside or presses escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.services-panel') && !target.closest('.services-trigger')) {
        closeServicesPanel()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeServicesPanel()
      }
    }

    if (isServicesPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isServicesPanelOpen, closeServicesPanel])

  // When panel is open, prevent background scrolling
  useEffect(() => {
    if (isServicesPanelOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isServicesPanelOpen])

  return (
    <AnimatePresence>
      {isServicesPanelOpen && (
        <div className="fixed inset-0 z-50 flex flex-col">
          {/* Overlay with blur */}
          <motion.div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeServicesPanel}
          />
          
          {/* The services panel */}
          <motion.div 
            className="services-panel relative z-50 w-full bg-white shadow-lg border-b border-slate-200 overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ maxHeight: '85vh' }}
          >
            <div className="container mx-auto px-6 py-6 md:py-8">
              {/* Close button */}
              <div className="flex justify-end mb-4">
                <button 
                  onClick={closeServicesPanel}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Close services panel"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {serviceCategories.map((category, idx) => (
                  <div key={idx} className="p-4 relative">
                    <h3 className="text-sm font-medium text-primary mb-4">{category.title}</h3>
                    <ul className="space-y-4">
                      {category.services.map((service, serviceIdx) => (
                        <li key={serviceIdx}>
                          <Link 
                            href={service.href}
                            className="group block"
                            onClick={closeServicesPanel}
                          >
                            <span className="block text-slate-800 font-medium text-base md:text-lg group-hover:text-primary transition-colors">
                              {service.name}
                            </span>
                            <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
                              {service.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {idx === 0 && (
                      <Link 
                        href="#services" 
                        className="inline-flex items-center gap-1 mt-4 text-primary font-medium hover:underline"
                        onClick={closeServicesPanel}
                      >
                        View all services 
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 