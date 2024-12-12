"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Phone, ChevronDown, X } from 'lucide-react'
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-bold ${
              scrolled ? 'text-blue-600' : 'text-white'
            }`}>Life Got Better</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className={`hover:text-blue-600 transition-colors ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}>
                Services <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Personal Care</DropdownMenuItem>
                <DropdownMenuItem>Post-Operative Care</DropdownMenuItem>
                <DropdownMenuItem>Meal Preparation</DropdownMenuItem>
                <DropdownMenuItem>Medication Management</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about" className={`hover:text-blue-600 transition-colors ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}>
              About Us
            </Link>
            
            <Link href="/careers" className={`hover:text-blue-600 transition-colors ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Careers
            </Link>
            
            <Link href="/contact" className={`hover:text-blue-600 transition-colors ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Contact
            </Link>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <Phone className="w-4 h-4 mr-2" />
              (555) 123-4567
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/careers"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Phone className="w-4 h-4 mr-2" />
                (555) 123-4567
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

