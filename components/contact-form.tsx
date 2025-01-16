"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Clock, Mail, Heart } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useState } from 'react'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
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
      service_type: form.service_type.value,
      user_name: form.user_name.value,
      user_email: form.user_email.value,
      user_phone: form.user_phone.value,
      zip_code: form.zip_code.value,
      care_recipient: form.care_recipient.value,
      referral_source: form.referral_source.value,
      to_email: 'mcasmakeen@gmail.com'
    }
    
    try {
      await emailjs.send(
        'service_y3oo2si',
        'template_csqtwpf',
        templateParams,
        'Xeu-hioZNC6XZvx_d'
      )
      
      setSubmitStatus('success')
      form.reset()
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#EBF3FA]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left side - Form */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-600 mb-3">
              Contact Us About Our Home Care
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Call <a href="tel:(414) 847-6498" className="text-blue-600 hover:underline font-medium">(414) 847-6498</a> or fill out the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">I&apos;m interested in:</p>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 text-sm">
                    <input 
                      type="radio" 
                      name="service_type" 
                      value="care" 
                      defaultChecked 
                      className="text-blue-600 focus:ring-blue-600" 
                    />
                    <span>Home Care Services</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input 
                      type="radio" 
                      name="service_type" 
                      value="employment" 
                      className="text-blue-600 focus:ring-blue-600" 
                    />
                    <span>Employment</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input 
                    type="text" 
                    name="user_name"
                    placeholder="Name*"
                    required 
                    className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="user_email"
                    placeholder="Email*"
                    required 
                    className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
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
                    className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    name="zip_code"
                    placeholder="Zip Code*"
                    required 
                    className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <select 
                  name="care_recipient" 
                  className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-gray-600"
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
                  className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-gray-600"
                  required
                >
                  <option value="">How did you hear about us?*</option>
                  <option value="search">Internet Search</option>
                  <option value="referral">Friend/Family Referral</option>
                  <option value="social">Social Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-4 rounded-lg transition-colors text-sm font-medium ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-600 text-sm">Thank you for your message. We'll be in touch soon!</p>
              )}

              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm">There was an error sending your message. Please try again.</p>
              )}

              <p className="text-xs text-gray-500 leading-relaxed">
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
                className="text-sm font-medium text-blue-600 mb-2"
              >
                WHY CHOOSE US
              </motion.p>
              
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-blue-600 mb-4"
              >
                Careers.
                <span className="block">We&apos;re hiring!</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-600 text-sm"
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
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
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

