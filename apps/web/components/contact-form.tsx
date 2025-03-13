"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Clock, Mail, Heart } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useState } from 'react'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [serviceType, setServiceType] = useState('care')
  
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
      description: "Send your resume to lifegotbetterhomecare@gmail.com to join a supportive team"
    }
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const form = e.currentTarget
    const templateParams = {
      user_name: form.user_name.value,
      user_email: form.user_email.value,
      user_phone: form.user_phone.value,
      ...(serviceType === 'care' ? {
        zip_code: form.zip_code.value,
        care_recipient: form.care_recipient.value,
        referral_source: form.referral_source.value,
      } : {
        position_type: form.position_type.value,
        experience_level: form.experience_level.value,
        availability: form.availability.value,
        additional_info: form.additional_info.value,
      })
    }
    
    try {
      await emailjs.send(
        'service_y3oo2si',
        serviceType === 'care' ? 'template_tj5d2cp' : 'template_csqtwpf',
        templateParams,
        'Xeu-hioZNC6XZvx_d'
      )
      
      setSubmitStatus('success')
      form.reset()
      setServiceType('care')
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-white to-[#F7C6C7]/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left side - Form */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-[#9B59B6] mb-3">
              Contact Us About Our Home Care
            </h2>
            <p className="text-[#3E3E3E]/80 text-sm mb-6">
              Call <a href="tel:1414-240-6913" className="text-[#9B59B6] hover:underline font-medium">1414-240-6913</a> or fill out the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <p className="text-sm font-medium text-[#3E3E3E]">I&apos;m interested in:</p>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 text-sm">
                    <input 
                      type="radio" 
                      name="service_type" 
                      value="care" 
                      checked={serviceType === 'care'}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="text-[#9B59B6] focus:ring-[#9B59B6]" 
                    />
                    <span>Home Care Services</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input 
                      type="radio" 
                      name="service_type" 
                      value="employment"
                      checked={serviceType === 'employment'}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="text-[#9B59B6] focus:ring-[#9B59B6]" 
                    />
                    <span>Employment</span>
                  </label>
                </div>
              </div>

              {serviceType === 'care' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="text" 
                        name="user_name"
                        placeholder="Name*"
                        required 
                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6]"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="user_email"
                        placeholder="Email*"
                        required 
                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="tel" 
                        name="user_phone"
                        placeholder="Phone*"
                        required 
                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6]"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        name="zip_code"
                        placeholder="Zip Code*"
                        required 
                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6]"
                      />
                    </div>
                  </div>

                  <div>
                    <select 
                      name="care_recipient" 
                      className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6] text-[#3E3E3E]/80"
                      required
                    >
                      <option value="">Who needs care?*</option>
                      <option value="self">Self</option>
                      <option value="spouse">Spouse</option>
                      <option value="parent">Parent</option>
                      <option value="other">Other Family Member</option>
                    </select>
                  </div>

                  <div>
                    <select 
                      name="referral_source"
                      className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6] text-[#3E3E3E]/80"
                      required
                    >
                      <option value="">How did you hear about us?*</option>
                      <option value="search">Internet Search</option>
                      <option value="referral">Friend/Family Referral</option>
                      <option value="social">Social Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="text" 
                        name="user_name"
                        placeholder="Full Name*"
                        required 
                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6]"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="user_email"
                        placeholder="Email*"
                        required 
                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="tel" 
                        name="user_phone"
                        placeholder="Phone*"
                        required 
                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6]"
                      />
                    </div>
                    <div>
                      <select 
                        name="position_type"
                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6] text-[#3E3E3E]/80"
                        required
                      >
                        <option value="">Position Interested In*</option>
                        <option value="caregiver">Caregiver</option>
                        <option value="nurse">Nurse</option>
                        <option value="coordinator">Care Coordinator</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <select 
                      name="experience_level"
                      className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6] text-[#3E3E3E]/80"
                      required
                    >
                      <option value="">Years of Experience*</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <select 
                      name="availability"
                      className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6] text-[#3E3E3E]/80"
                      required
                    >
                      <option value="">Availability*</option>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <textarea 
                      name="additional_info"
                      placeholder="Additional Information (Optional)"
                      className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B59B6] focus:border-[#9B59B6] min-h-[100px]"
                    />
                  </div>
                </>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-[#9B59B6] hover:bg-[#5D3F6A] text-white py-2.5 px-4 rounded-lg transition-colors text-sm font-medium ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-600 text-sm">Thank you for your message. We&apos;ll be in touch soon!</p>
              )}

              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm">There was an error sending your message. Please try again.</p>
              )}

              <p className="text-xs text-[#3E3E3E]/70 leading-relaxed">
                By submitting this form, I agree to be contacted via call, email and text. 
                Message and data rates may apply. Reply &apos;stop&apos; or click unsubscribe to opt out.
              </p>
            </form>
          </div>

          {/* Right side - Career Content */}
          <div className="space-y-8">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-medium text-[#9B59B6] mb-2"
              >
                WHY CHOOSE US
              </motion.p>
              
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-[#9B59B6] mb-4"
              >
                Careers.
                <span className="block">We&apos;re hiring!</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#3E3E3E]/80 text-sm"
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
                    <div className="w-10 h-10 rounded-lg bg-[#9B59B6]/10 flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-[#9B59B6]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#3E3E3E] mb-1">{benefit.title}</h3>
                    <p className="text-sm text-[#3E3E3E]/80">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

