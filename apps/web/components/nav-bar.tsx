"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Phone, X, Search, ChevronDown, MapPin, Mail } from 'lucide-react'
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

type NavItem = {
  href: string
  label: string
  id: string
}

const NAV_ITEMS: NavItem[] = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#about", label: "About Us", id: "about" },
  { href: "#find-care", label: "Resources", id: "find-care" },
]

const UTILITY_NAV_ITEMS = [
  { href: "#find-care", label: "FIND A LOCATION", id: "find-care" },
  { href: "#contact", label: "REFER A PATIENT", id: "contact" },
  { href: "#contact", label: "CONTACT", id: "contact" },
]

const NavLink = ({ 
  href, 
  label, 
  id, 
  onClick 
}: NavItem & { 
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void 
}) => (
  <a
    href={href}
    onClick={(e) => onClick(e, id)}
    className="text-[#333] hover:text-[#9B59B6] transition-colors px-4 py-2 text-lg"
  >
    {label}
  </a>
)

const UtilityNavLink = ({ 
  href, 
  label, 
  id, 
  onClick 
}: NavItem & { 
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void 
}) => (
  <a
    href={href}
    onClick={(e) => onClick(e, id)}
    className="text-[#333] hover:text-[#9B59B6] transition-colors px-3 text-xs font-medium"
  >
    {label}
  </a>
)

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  const navLinks = [
    { name: 'Home', href: '#home' },
    { 
      name: 'Services', 
      href: '#services',
      dropdown: [
        { name: 'Personal Care', href: '#services' },
        { name: 'Companion Care', href: '#services' },
        { name: 'Respite Care', href: '#services' },
        { name: 'Meal Preparation', href: '#services' },
        { name: 'Light Housekeeping', href: '#services' },
        { name: 'Transportation', href: '#services' },
      ]
    },
    { name: 'About Us', href: '#about' },
    { name: 'Resources', href: '#resources' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-primary text-white py-2.5 hidden md:block">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-6 text-sm">
            <a href="tel:+15174209812" className="flex items-center gap-2 hover:text-white/90 transition-colors">
              <Phone className="w-4 h-4" />
              <span>(517) 420-9812</span>
            </a>
            <a href="mailto:lifegotbetterhomecare@gmail.com" className="flex items-center gap-2 hover:text-white/90 transition-colors">
              <Mail className="w-4 h-4" />
              <span>lifegotbetterhomecare@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>3401 E Saginaw St, Lansing, MI 48912</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 py-4'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="#home" className="flex-shrink-0 z-50">
            <h1 className="text-2xl font-bold text-primary">
              Life Got <span className="text-secondary">Better</span>
              <span className="block text-sm text-slate-600 font-medium">Homecare</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="text-slate-700 font-medium px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-slate-100 transition-colors focus-visible"
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {(activeDropdown === link.name || 
                      // Show on hover for desktop
                      (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute mt-2 w-60 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50 py-2 group-hover:block"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-[15px]"
                              onClick={closeMobileMenu}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="text-slate-700 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors focus-visible block"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <a
              href="#find-care"
              className="bg-primary hover:bg-primary/90 text-white ml-4 px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm hover:shadow focus-visible"
            >
              Find Care
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex items-center text-slate-700 focus:outline-none focus-visible z-50"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-white"
              >
                <div className="flex flex-col h-full pt-20 pb-6 px-6 overflow-y-auto">
                  <div>
                    {navLinks.map((link) => (
                      <div key={link.name} className="border-b border-slate-100">
                        {link.dropdown ? (
                          <div>
                            <button
                              onClick={() => toggleDropdown(link.name)}
                              className="flex justify-between items-center w-full py-4 text-lg font-medium text-slate-700"
                            >
                              {link.name}
                              <ChevronDown 
                                className={`w-5 h-5 transition-transform ${
                                  activeDropdown === link.name ? 'rotate-180' : ''
                                }`} 
                              />
                            </button>
                            <AnimatePresence>
                              {activeDropdown === link.name && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden pl-4 pb-2"
                                >
                                  {link.dropdown.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      className="block py-3 text-slate-600 hover:text-primary"
                                      onClick={closeMobileMenu}
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={link.href}
                            className="block py-4 text-lg font-medium text-slate-700 hover:text-primary"
                            onClick={closeMobileMenu}
                          >
                            {link.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <a
                      href="#find-care"
                      onClick={closeMobileMenu}
                      className="block w-full bg-primary hover:bg-primary/90 text-white text-center px-6 py-3 rounded-lg font-medium text-lg"
                    >
                      Find Care
                    </a>
                    
                    <div className="mt-8 space-y-4">
                      <p className="text-center text-slate-500">Contact Us</p>
                      <a href="tel:+15174209812" className="flex items-center justify-center gap-2 text-primary">
                        <Phone className="w-5 h-5" />
                        <span>(517) 420-9812</span>
                      </a>
                      <a href="mailto:lifegotbetterhomecare@gmail.com" className="flex items-center justify-center gap-2 text-primary text-sm text-center">
                        <Mail className="w-5 h-5 flex-shrink-0" />
                        <span>lifegotbetterhomecare@gmail.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}

