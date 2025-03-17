"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Phone, X, Search } from 'lucide-react'
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
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)

      // Update active section based on scroll position
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        if (!section) return
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
      setActiveSection(sectionId)
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Utility Navigation */}
      <div className="border-b border-gray-100 hidden md:block">
        <div className="container mx-auto flex justify-end">
          <div className="flex items-center">
            {UTILITY_NAV_ITEMS.map((item) => (
              <UtilityNavLink
                key={item.id + "-utility"}
                {...item}
                onClick={handleNavClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center"
            aria-label="Life Got Better Homecare"
          >
            <div className="relative w-[240px] h-[60px] flex items-center">
              <span className="text-xl font-bold text-[#9B59B6]">
                Life Got Better
                <span className="block text-lg text-[#333]">Homecare</span>
              </span>
            </div>
            {/* <span className="text-[#777] text-sm ml-1 hidden xl:inline-block">We care where you are.</span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  {...item}
                  onClick={handleNavClick}
                />
              ))}
            </div>

            <div className="ml-6 flex items-center">
              <Button 
                variant="ghost"
                size="icon"
                className="text-[#333] hover:text-[#9B59B6] hover:bg-transparent"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-[#333]"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t"
            role="menu"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    "block px-4 py-3 rounded-md",
                    "text-[#3E3E3E] hover:text-[#9B59B6]",
                    "hover:bg-[#F7C6C7]/10 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-[#9B59B6]",
                    activeSection === item.id && "bg-[#F7C6C7]/20 text-[#9B59B6]"
                  )}
                  role="menuitem"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t mt-4">
                {UTILITY_NAV_ITEMS.map((item) => (
                  <a
                    key={item.id + "-mobile"}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="block px-4 py-2 text-sm text-[#3E3E3E] hover:text-[#9B59B6]"
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="pt-2">
                <Button className="w-full bg-[#9B59B6] hover:bg-[#5D3F6A] transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  (414) 240-6913
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

