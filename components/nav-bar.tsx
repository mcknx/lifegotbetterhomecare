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
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">Life Got Better</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors">
                Services <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Personal Care</DropdownMenuItem>
                <DropdownMenuItem>Post-Operative Care</DropdownMenuItem>
                <DropdownMenuItem>Meal Preparation</DropdownMenuItem>
                <DropdownMenuItem>Medication Management</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            
            <Link href="/careers" className="text-gray-700 hover:text-blue-600 transition-colors">
              Careers
            </Link>
            
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <Phone className="w-4 h-4 mr-2" />
              (555) 123-4567
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
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
            className="lg:hidden"
          >
            <div className="px-4 py-4 space-y-4 bg-gray-50">
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

