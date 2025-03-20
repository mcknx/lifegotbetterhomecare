"use client"

import { useState } from 'react'
import { motion } from "framer-motion"
import { Mail, Heart, ArrowRight, Check, AlertTriangle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import Image from 'next/image'

export function ReferPatientForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isHomeAddress, setIsHomeAddress] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const form = e.currentTarget
    const templateParams = {
      last_name: form.last_name.value,
      first_name: form.first_name.value,
      dob: form.dob.value,
      ssn: form.ssn.value,
      gender: form.gender.value,
      primary_phone: form.primary_phone.value,
      primary_phone_type: form.primary_phone_type.value,
      secondary_phone: form.secondary_phone.value,
      secondary_phone_type: form.secondary_phone_type.value,
      is_veteran: form.is_veteran.value,
      service_address: form.service_address.value,
      service_city: form.service_city.value,
      service_state: form.service_state.value,
      service_zip: form.service_zip.value,
      service_county: form.service_county.value,
      home_address: isHomeAddress ? form.service_address.value : form.home_address.value,
      home_city: isHomeAddress ? form.service_city.value : form.home_city.value,
      home_state: isHomeAddress ? form.service_state.value : form.home_state.value,
      home_zip: isHomeAddress ? form.service_zip.value : form.home_zip.value,
      email: form.email.value,
      preferred_contact: form.preferred_contact.checked,
      insurance_type: {
        medicaid: form.medicaid?.checked || false,
        private_pay: form.private_pay?.checked || false,
        insurance: form.insurance?.checked || false,
        va: form.va?.checked || false,
        other: form.other_insurance?.checked || false
      },
      medicare_eligible: form.medicare_eligible.value,
      hear_about_us: form.hear_about_us.value,
      referral_type: form.referral_type.value,
      services: {
        bathing: form.bathing?.checked || false,
        toileting: form.toileting?.checked || false,
        eating: form.eating?.checked || false,
        laundry: form.laundry?.checked || false,
        medication_reminder: form.medication_reminder?.checked || false,
        grocery_shopping: form.grocery_shopping?.checked || false,
        transferring: form.transferring?.checked || false,
        meal_prep: form.meal_prep?.checked || false,
        telephoning: form.telephoning?.checked || false,
        housekeeping: form.housekeeping?.checked || false,
        continence: form.continence?.checked || false,
        walking: form.walking?.checked || false,
        dressing: form.dressing?.checked || false,
        traveling: form.traveling?.checked || false
      }
    }
    
    try {
      await emailjs.send(
        'service_y3oo2si',
        'template_patient_referral',
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
    <section className="py-20 bg-gradient-to-b from-white to-[#F7C6C7]/30 relative">
      <div className="absolute top-20 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/3 translate-x-1/4 z-0"></div>
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/3 -translate-x-1/4 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-dark" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary-dark mb-2">
                Refer a Patient
              </h1>
              <p className="text-slate-600">
                We're ready to help. Use the form below to refer a patient for services.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Demographics */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Client Demographics</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    type="text" 
                    name="last_name"
                    placeholder="Last Name*"
                    required 
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    name="first_name"
                    placeholder="First Name*"
                    required 
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    type="date" 
                    name="dob"
                    placeholder="DOB*"
                    required 
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    name="ssn"
                    placeholder="SSN"
                    pattern="\d{3}-?\d{2}-?\d{4}"
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Gender*</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" value="male" required className="text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600">Male</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" value="female" required className="text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600">Female</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" value="other" required className="text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600">Other</span>
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex gap-4 mb-2">
                    <input 
                      type="tel" 
                      name="primary_phone"
                      placeholder="Primary Phone*"
                      required 
                      className="flex-1 p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                    />
                    <select 
                      name="primary_phone_type"
                      required
                      className="w-32 p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-600"
                    >
                      <option value="landline">Landline</option>
                      <option value="cell">Cell</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="flex gap-4 mb-2">
                    <input 
                      type="tel" 
                      name="secondary_phone"
                      placeholder="Secondary Phone"
                      className="flex-1 p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                    />
                    <select 
                      name="secondary_phone_type"
                      className="w-32 p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-600"
                    >
                      <option value="landline">Landline</option>
                      <option value="cell">Cell</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Are you a Veteran?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="is_veteran" value="yes" className="text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="is_veteran" value="no" className="text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600">No</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    name="service_address"
                    placeholder="Service Address*"
                    required 
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    name="service_city"
                    placeholder="City*"
                    required 
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                  />
                  <input 
                    type="text" 
                    name="service_state"
                    placeholder="State*"
                    required 
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                  />
                  <input 
                    type="text" 
                    name="service_zip"
                    placeholder="ZIP*"
                    required 
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                  />
                </div>
                <input 
                  type="text" 
                  name="service_county"
                  placeholder="County"
                  className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    name="same_address"
                    checked={isHomeAddress}
                    onChange={(e) => setIsHomeAddress(e.target.checked)}
                    className="text-primary focus:ring-primary rounded"
                  />
                  <span className="text-sm text-slate-600">Service Address Is Home Address?</span>
                </label>
              </div>

              {!isHomeAddress && (
                <div className="space-y-4">
                  <input 
                    type="text" 
                    name="home_address"
                    placeholder="Home Address"
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <input 
                      type="text" 
                      name="home_city"
                      placeholder="City"
                      className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                    />
                    <input 
                      type="text" 
                      name="home_state"
                      placeholder="State"
                      className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                    />
                    <input 
                      type="text" 
                      name="home_zip"
                      placeholder="ZIP"
                      className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <input 
                  type="email" 
                  name="email"
                  placeholder="E-mail Address"
                  className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                />
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    name="preferred_contact"
                    className="text-primary focus:ring-primary rounded"
                  />
                  <span className="text-sm text-slate-600">Contact me through my preferred contact?</span>
                </label>
              </div>
            </div>

            {/* Insurance */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Insurance</h2>
              
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="medicaid" className="text-primary focus:ring-primary rounded" />
                  <span className="text-sm text-slate-600">Medicaid</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="private_pay" className="text-primary focus:ring-primary rounded" />
                  <span className="text-sm text-slate-600">Private Pay</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="insurance" className="text-primary focus:ring-primary rounded" />
                  <span className="text-sm text-slate-600">Insurance</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="va" className="text-primary focus:ring-primary rounded" />
                  <span className="text-sm text-slate-600">VA</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="other_insurance" className="text-primary focus:ring-primary rounded" />
                  <span className="text-sm text-slate-600">Other</span>
                </label>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Order Details</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Is medicare eligible?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="medicare_eligible" value="yes" className="text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="medicare_eligible" value="no" className="text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600">No</span>
                  </label>
                </div>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  name="hear_about_us"
                  placeholder="How did you hear about us?"
                  className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="relative">
                <select 
                  name="referral_type"
                  required
                  className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-600 appearance-none bg-white"
                >
                  <option value="">Referral Type*</option>
                  <option value="self">Self</option>
                  <option value="family">Family</option>
                  <option value="friend">Friend</option>
                  <option value="healthcare_provider">Healthcare Provider</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Services Needed:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="bathing" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Bathing</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="toileting" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Toileting</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="eating" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Eating</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="laundry" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Laundry</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="medication_reminder" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Medication Reminder</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="grocery_shopping" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Grocery Shopping</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="transferring" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Transferring</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="meal_prep" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Meal Prep</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="telephoning" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Telephoning</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="housekeeping" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Housekeeping</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="continence" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Continence</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="walking" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Walking</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="dressing" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Dressing</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="traveling" className="text-primary focus:ring-primary rounded" />
                    <span className="text-sm text-slate-600">Traveling</span>
                  </label>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                  <span>Submit Referral</span>
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
                <p className="text-green-700 text-sm">Thank you for your referral. We'll be in touch soon!</p>
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
                <p className="text-red-700 text-sm">There was an error submitting your referral. Please try again.</p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
} 