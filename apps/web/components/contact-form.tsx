"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Clock, Mail, Heart, Phone, MapPin, Send, Users, ArrowRight, Check, AlertTriangle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useState } from 'react'
import Image from 'next/image'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [serviceType, setServiceType] = useState('care')
  
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
    <section id="contact" className="py-16 sm:py-20 bg-gradient-to-b from-white to-[#F7C6C7]/30 relative">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/3 translate-x-1/4 z-0 hidden md:block"></div>
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/3 -translate-x-1/4 z-0 hidden md:block"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary-dark mb-3">
              GET IN TOUCH
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Ready to Experience <span className="text-primary-dark">Better Care?</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              Contact us today to discuss your care needs or career opportunities. Our team is ready to provide the support and information you're looking for.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
          {/* Left side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden order-2 lg:order-1"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-dark" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary-dark mb-2">
                    Contact Us About Our Home Care
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Call <a href="tel:(414) 240-6913" className="text-primary-dark hover:underline font-medium">(414) 240-6913</a> or fill out the form below.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm font-medium text-slate-700 mb-3">I'm interested in:</p>
                  <div className="flex gap-4">
                    <label className="relative flex items-center group cursor-pointer flex-1">
                      <input 
                        type="radio" 
                        name="service_type" 
                        value="care" 
                        checked={serviceType === 'care'}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="absolute opacity-0 w-0 h-0" 
                      />
                      <span className={`w-12 h-12 rounded-full flex items-center justify-center ${serviceType === 'care' ? 'bg-primary text-white' : 'bg-white text-slate-400 border border-slate-200'} transition-all group-hover:shadow-md touch-manipulation`}>
                        <Heart className="w-5 h-5" />
                      </span>
                      <span className={`ml-2 text-sm ${serviceType === 'care' ? 'font-medium text-primary-dark' : 'text-slate-600'}`}>Home Care</span>
                    </label>
                    
                    <label className="relative flex items-center group cursor-pointer flex-1">
                      <input 
                        type="radio" 
                        name="service_type" 
                        value="employment"
                        checked={serviceType === 'employment'}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="absolute opacity-0 w-0 h-0" 
                      />
                      <span className={`w-12 h-12 rounded-full flex items-center justify-center ${serviceType === 'employment' ? 'bg-primary text-white' : 'bg-white text-slate-400 border border-slate-200'} transition-all group-hover:shadow-md touch-manipulation`}>
                        <Users className="w-5 h-5" />
                      </span>
                      <span className={`ml-2 text-sm ${serviceType === 'employment' ? 'font-medium text-primary-dark' : 'text-slate-600'}`}>Employment</span>
                    </label>
                  </div>
                </div>

                {serviceType === 'care' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <input 
                          type="text" 
                          name="user_name"
                          placeholder="Name*"
                          required 
                          className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 min-h-[48px] touch-manipulation"
                        />
                      </div>
                      <div className="relative">
                        <input 
                          type="email" 
                          name="user_email"
                          placeholder="Email*"
                          required 
                          className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 min-h-[48px] touch-manipulation"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <input 
                          type="tel" 
                          name="user_phone"
                          placeholder="Phone*"
                          required 
                          className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 min-h-[48px] touch-manipulation"
                        />
                      </div>
                      <div className="relative">
                        <input 
                          type="text" 
                          name="zip_code"
                          placeholder="Zip Code*"
                          required 
                          className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 min-h-[48px] touch-manipulation"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <select 
                        name="care_recipient" 
                        className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-600 appearance-none bg-white min-h-[48px] touch-manipulation"
                        required
                      >
                        <option value="">Who needs care?*</option>
                        <option value="self">Self</option>
                        <option value="spouse">Spouse</option>
                        <option value="parent">Parent</option>
                        <option value="other">Other Family Member</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>

                    <div className="relative">
                      <select 
                        name="referral_source"
                        className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-600 appearance-none bg-white min-h-[48px] touch-manipulation"
                        required
                      >
                        <option value="">How did you hear about us?*</option>
                        <option value="search">Internet Search</option>
                        <option value="referral">Friend/Family Referral</option>
                        <option value="social">Social Media</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <input 
                          type="text" 
                          name="user_name"
                          placeholder="Full Name*"
                          required 
                          className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 min-h-[48px] touch-manipulation"
                        />
                      </div>
                      <div className="relative">
                        <input 
                          type="email" 
                          name="user_email"
                          placeholder="Email*"
                          required 
                          className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 min-h-[48px] touch-manipulation"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <input 
                          type="tel" 
                          name="user_phone"
                          placeholder="Phone*"
                          required 
                          className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 min-h-[48px] touch-manipulation"
                        />
                      </div>
                      <div className="relative">
                        <select 
                          name="position_type"
                          className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-600 appearance-none bg-white min-h-[48px] touch-manipulation"
                          required
                        >
                          <option value="">Select Position*</option>
                          <option value="care provider">Care Provider</option>
                          <option value="nurse">Nurse</option>
                          <option value="coordinator">Care Coordinator</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ArrowRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <select 
                        name="experience_level"
                        className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-600 appearance-none bg-white min-h-[48px] touch-manipulation"
                        required
                      >
                        <option value="">Years of Experience*</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>

                    <div className="relative">
                      <select 
                        name="availability"
                        className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-600 appearance-none bg-white min-h-[48px] touch-manipulation"
                        required
                      >
                        <option value="">Availability*</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="flexible">Flexible</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>

                    <div>
                      <textarea 
                        name="additional_info"
                        placeholder="Additional Information (Optional)"
                        className="w-full p-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[100px] resize-none placeholder:text-slate-400 touch-manipulation"
                      />
                    </div>
                  </>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full bg-primary hover:bg-primary/90 text-white py-4 px-4 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg min-h-[48px] touch-manipulation ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-50 border border-green-100 rounded-lg flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-green-700 text-sm">Thank you for your message. We'll be in touch soon!</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <p className="text-red-700 text-sm">There was an error sending your message. Please try again.</p>
                  </motion.div>
                )}

                <p className="text-xs text-slate-500 leading-relaxed">
                  By submitting this form, I agree to be contacted via call, email and text. 
                  Message and data rates may apply. Reply 'stop' or click unsubscribe to opt out.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Right side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            {/* Contact info card */}
            <div className="bg-white p-5 rounded-xl shadow-md border border-slate-100 mb-6 sm:mb-8">
              <h3 className="font-semibold text-slate-800 mb-4">Get in Touch</h3>
              
              <div className="space-y-4">
                <a href="tel:(414) 240-6913" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors touch-manipulation">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">(414) 240-6913</p>
                    <p className="text-xs text-slate-500">Call us anytime</p>
                  </div>
                </a>
                
                <a href="mailto:lifegotbetterhomecare@gmail.com" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors touch-manipulation">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium break-all">lifegotbetterhomecare@gmail.com</p>
                    <p className="text-xs text-slate-500">Email us with questions</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">6001 W Center St, Suite 208</p>
                    <p className="text-xs text-slate-500">Milwaukee, WI 53210</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

