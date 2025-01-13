"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Mail, Heart } from 'lucide-react'

export function ContactForm() {
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
    <section className="py-20 bg-[#EBF3FA]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left side - Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-[#2F5233] mb-6">
              Contact Us About Our Home Care
            </h2>
            <p className="text-gray-600 mb-8">
              Call <a href="tel:(555) 123-4567" className="text-blue-600 hover:underline">(555) 123-4567</a> or fill out the form below.
            </p>

            <form className="space-y-6">
              <div className="space-y-4">
                <p className="font-medium text-gray-900">PLEASE SELECT</p>
                <RadioGroup defaultValue="care" className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="care" id="care" />
                    <Label htmlFor="care">Home Care Services</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employment" id="employment" />
                    <Label htmlFor="employment">Employment Opportunities</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address<span className="text-red-500">*</span></Label>
                  <Input id="email" type="email" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone<span className="text-red-500">*</span></Label>
                  <Input id="phone" type="tel" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipcode">Zip Code<span className="text-red-500">*</span></Label>
                  <Input id="zipcode" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="person">Person who needs care<span className="text-red-500">*</span></Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self</SelectItem>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="other">Other Family Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">How did you hear about us?<span className="text-red-500">*</span></Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="search">Internet Search</SelectItem>
                    <SelectItem value="referral">Friend/Family Referral</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-[#2F5233] hover:bg-green-800">
                Send Message
              </Button>

              <p className="text-xs text-gray-500">
                By submitting this form, I agree to be contacted by Life Got Better via call, email and text. 
                To opt out, you can reply 'stop' at any time or click the unsubscribe link in the emails. 
                Message and data rates may apply.
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
                className="text-blue-600 font-medium"
              >
                WHY CHOOSE US
              </motion.p>
              
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-[#2F5233] mb-4"
              >
                Careers.
                <span className="block">We&apos;re hiring!</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-600"
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
                      <benefit.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
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
                Apply Now
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

