"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Phone, X } from 'lucide-react'
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type NavItem = {
  href: string
  label: string
  id: string
}

const NAV_ITEMS: NavItem[] = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#benefits", label: "Benefits", id: "benefits" },
  { href: "#find-care", label: "Find Care", id: "find-care" },
  { href: "#about", label: "About Us", id: "about" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#contact", label: "Contact", id: "contact" },
]

const NavLink = ({ 
  href, 
  label, 
  id, 
  isScrolled, 
  onClick 
}: NavItem & { 
  isScrolled: boolean
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void 
}) => (
  <a
    href={href}
    onClick={(e) => onClick(e, id)}
    className={cn(
      "transition-colors duration-200",
      "hover:text-[#9B59B6]",
      isScrolled ? "text-[#3E3E3E]" : "text-white",
      "focus:outline-none focus:ring-2 focus:ring-[#9B59B6] focus:ring-offset-2",
      "rounded-md px-3 py-2"
    )}
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
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300",
        scrolled && "bg-white shadow-md"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="flex items-center"
            aria-label="Life Got Better Home Care"
          >
            <span className={cn(
              "md:text-md xl:text-2xl font-bold",
              scrolled ? "text-[#9B59B6]" : "text-white"
            )}>
              Life Got Better Home Care
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                {...item}
                isScrolled={scrolled}
                onClick={handleNavClick}
              />
            ))}

            <Button 
              className="bg-[#9B59B6] hover:bg-[#5D3F6A] transition-colors ml-4"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4 mr-2" />
              1414-240-6913
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-md",
              "focus:outline-none focus:ring-2 focus:ring-[#9B59B6]",
              scrolled ? "text-[#3E3E3E]" : "text-white"
            )}
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
              <div className="pt-2">
                <Button className="w-full bg-[#9B59B6] hover:bg-[#5D3F6A] transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  1414-240-6913
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

