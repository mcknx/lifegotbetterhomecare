"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Global Headquarters</h3>
            <div className="space-y-2">
              <p className="font-semibold text-white">Life Got Better, Inc.</p>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 text-blue-400" />
                <div>
                  <p>123 Healthcare Avenue</p>
                  <p>Suite 100</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-400" />
                <p>(555) 123-4567</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <p>contact@lifegotbetter.com</p>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Personal Care
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Post-Operative Care
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Companion Care
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Respite Care
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Medication Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#careers" className="hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  News & Media
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-blue-400 transition-colors">
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
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-900 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" suppressHydrationWarning>
              © {currentYear} Life Got Better, Inc. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 