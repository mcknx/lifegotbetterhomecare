"use client"

import Link from "next/link"
import { Facebook, Phone, Mail, MapPin, Instagram } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 relative">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-secondary/5 rounded-full -translate-x-1/4 translate-y-1/4"></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Main Office</h3>
            <div className="space-y-2">
              <p className="font-semibold text-white">Life Got Better Homecare</p>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 text-secondary" />
                <div>
                  <p>6001 W Center St</p>
                  <p>Suite 208</p>
                  <p>Milwaukee, WI 53210</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary" />
                <a 
                  href="tel:(414) 240-6913" 
                  className="hover:text-secondary transition-colors"
                >
                  (414) 240-6913
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-secondary" />
                <p>lifegotbetterhomecare@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-secondary transition-colors">
                  Personal Care
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-secondary transition-colors">
                  Post-Operative Care
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-secondary transition-colors">
                  Companion Care
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="hover:text-[#F7C6C7] transition-colors">
                  Respite Care
                </Link>
              </li> */}
              {/* <li>
                <Link href="#" className="hover:text-[#F7C6C7] transition-colors">
                  Medication Management
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-secondary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61574146146676"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/70 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/lgbhomecare/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/70 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary/30 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" suppressHydrationWarning>
              © {currentYear} Life Got Better Homecare All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-secondary transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 