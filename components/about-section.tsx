"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutSection() {

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* About Us Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">About Us</h3>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    Life Got Better Staffing Services LLC, established in 2017 by Marlon C. Hood II, 
                    is dedicated staffing company that specializes in-connecting skilled medical 
                    professionals with facilities and organizations.
                  </p>
                  <p>
                    Our comprehensive services extend beyond recruitment, encompassing staffing 
                    level management, training, onboarding, and recruitment services. With a 
                    commitment to excellence, we strive to bridge the gap between healthcare 
                    professionals and the institutions that rely on their expertise.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 space-y-4">
                <h4 className="text-2xl font-bold text-gray-900">Our Mission</h4>
                <p className="text-gray-600">
                  Our mission at LGB Staffing is to forge connections between dedicated nurses 
                  and caregivers with healthcare facilities in need of vital clinical support. 
                  By providing flexible schedules and daily pay for nurses, we strive to ensure 
                  consistent coverage for facilities, ultimately guaranteeing the delivery of 
                  topnotch care to the individuals they serve.
                </p>
                <p className="text-gray-600">
                  Our commitment lies in creating a seamless bridge between healthcare professionals 
                  and the facilities that rely on them, fostering a culture of reliability and 
                  excellence in patient care.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <Image
                  src="https://media.gettyimages.com/id/1354179181/photo/shot-of-an-attractive-young-nurse-bonding-with-her-senior-patient-outside.jpg?s=1024x1024&w=gi&k=20&c=YuKQQ7xMgFv0jFA4Uh9T2xoq6Ubm8yZkfP6qnuU1RcI="
                  alt="Shot of an attractive young nurse bonding with her senior patient outside"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-bold text-blue-600">200+</span>
                    <span className="text-gray-600">Healthcare<br />Professionals</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
} 