"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Clock, Mail, Heart } from 'lucide-react'

export function FeaturesSection() {
  const benefits = [
    {
      icon: Heart,
      title: "Make an Impact",
      description: "Make a positive difference in the lives of others by providing compassionate care"
    },
    {
      icon: Clock,
      title: "Flexible Hours & Pay",
      description: "Enjoy flexible hours, competitive pay, and training opportunities"
    },
    {
      icon: Mail,
      title: "Submit Your Resume",
      description: "Send your resume to LifeGotBetterHomeCare@gmail.com to join a supportive team"
    }
  ]

  return (
    <div className="relative py-20 bg-[#0a0b2e]">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(to right, #2e2e80 1px, transparent 1px), linear-gradient(to bottom, #2e2e80 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-blue-400 font-medium"
              >
                WHY CHOOSE US
              </motion.p>
              
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-white"
              >
                Careers.
                <span className="block">We&apos;re hiring!</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-300"
              >
                Because our clients&apos; needs don&apos;t always follow traditional business hours, 
                we offer unique flexibility in regards to working hours.
              </motion.p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:block hidden"
          >
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7"
                alt="Healthcare professional"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b2e]/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 