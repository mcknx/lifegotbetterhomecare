import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'

export function NavBar() {
  return (
    <nav className="bg-[#2D3034] text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
              Q
            </div>
            <div className="text-lg font-semibold">
              QUALIFIED<br />STAFFING
            </div>
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center gap-6">
          <button className="flex items-center gap-1 hover:text-gray-300">
            For Job Seekers <ChevronDown className="w-4 h-4" />
          </button>

          <button className="flex items-center gap-1 hover:text-gray-300">
            For Employers <ChevronDown className="w-4 h-4" />
          </button>

          <Link href="/search-jobs" className="hover:text-gray-300">
            Search Jobs
          </Link>

          <button className="flex items-center gap-1 hover:text-gray-300">
            Specialty Areas <ChevronDown className="w-4 h-4" />
          </button>

          <Link href="/about" className="hover:text-gray-300">
            About Us
          </Link>

          <button className="flex items-center gap-1 hover:text-gray-300">
            The Q-Factor <ChevronDown className="w-4 h-4" />
          </button>

          <Link href="/contact" className="hover:text-gray-300">
            Contact Us
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-sm">
          <Link href="/employee-login" className="hover:text-gray-300">
            Employee Login
          </Link>
          <Link href="/time-keeping" className="hover:text-gray-300">
            Time Keeping
          </Link>
          <Link href="/client-login" className="hover:text-gray-300">
            Client Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

