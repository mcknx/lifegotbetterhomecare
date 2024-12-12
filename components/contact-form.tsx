"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

export function ContactForm() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Started with a Free Consultation
            </h2>
            <p className="text-gray-600">
              Fill out the form below and one of our care specialists will contact you
              to discuss your needs and how we can help.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">First Name</label>
                <Input placeholder="Enter your first name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Last Name</label>
                <Input placeholder="Enter your last name" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Email</label>
              <Input type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Phone</label>
              <Input type="tel" placeholder="Enter your phone number" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Message</label>
              <Textarea
                placeholder="Tell us about your care needs"
                className="min-h-[100px]"
              />
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Request Consultation
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

