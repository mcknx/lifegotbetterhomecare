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

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-bold ${
              scrolled ? 'text-blue-600' : 'text-white'
            }`}>Life Got Better Home Healthcare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className={`hover:text-blue-600 transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Home
            </a>
            
            <a
              href="#benefits"
              onClick={(e) => handleNavClick(e, 'benefits')}
              className={`hover:text-blue-600 transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Benefits
            </a>

            <a
              href="#find-care"
              onClick={(e) => handleNavClick(e, 'find-care')}
              className={`hover:text-blue-600 transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Find Care
            </a>

            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className={`hover:text-blue-600 transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              About Us
            </a>
            
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className={`hover:text-blue-600 transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Services
            </a>
            
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`hover:text-blue-600 transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Contact
            </a>

            <Button className="bg-blue-600 hover:bg-blue-500">
              <Phone className="w-4 h-4 mr-2" />
              (414) 847-6498
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${
              scrolled ? 'text-blue-900' : 'text-white'
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
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#benefits"
                onClick={(e) => handleNavClick(e, 'benefits')}
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                Benefits
              </a>
              <a
                href="#find-care"
                onClick={(e) => handleNavClick(e, 'find-care')}
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                Find Care
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                About Us
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, 'services')}
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
              <Button className="w-full bg-blue-600 hover:bg-blue-500">
                <Phone className="w-4 h-4 mr-2" />
                (414) 847-6498
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

