"use client"

import { motion } from "framer-motion"
import { UserPlus, Compass, Briefcase } from 'lucide-react'

export function BenefitsSection() {
  const actions = [
    {
      icon: UserPlus,
      title: "Refer a Patient",
      description: "Help someone get the care they deserve",
      href: "#contact"
    },
    {
      icon: Compass,
      title: "Explore Services",
      description: "Discover our comprehensive care solutions",
      href: "#services"
    },
    {
      icon: Briefcase,
      title: "Find a Job",
      description: "Join our team of care professionals",
      href: "#contact"
    }
  ]

  return (
    <div className="py-24 relative bg-white">
      {/* Solid background that covers the video */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50 z-[1]"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-56 h-56 bg-primary/5 rounded-full -translate-x-1/4 z-[2]"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full translate-x-1/4 translate-y-1/4 z-[2]"></div>
      
      <div className="container mx-auto px-4 relative z-[3]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#3E3E3E] mb-6">
            How can we help you?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {actions.map((action, index) => (
            <motion.a
              href={action.href}
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white hover:bg-slate-50 transition-colors border border-slate-100 shadow-sm hover:shadow-md group"
            >
              <div className="w-20 h-20 bg-[#9B59B6]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#9B59B6]/20 transition-colors">
                <action.icon className="w-10 h-10 text-[#9B59B6]" />
              </div>
              <h3 className="text-xl font-medium text-[#3E3E3E] mb-3">
                {action.title}
              </h3>
              <p className="text-slate-600 text-sm">
                {action.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
} 