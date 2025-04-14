"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ContactGoogleFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Get form data
      const formData = new FormData(e.currentTarget)
      
      // Submit form using fetch with no-cors mode
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdTMVHjSYU6wKBtWopuyribWX26ifqftY20UCvcp2tv2bMnyw/formResponse", 
        {
          method: "POST",
          mode: "no-cors", // Important for cross-domain requests to Google
          body: formData
        }
      )
      
      // Show success message
      setSubmitSuccess(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      // We'll still show success because with no-cors we can't actually check success
      setSubmitSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800">Contact Information</h1>
                <p className="mt-2 text-gray-600">Please fill out the form below to get in touch with us.</p>
              </div>
              
              <div className="p-6 sm:p-8">
                {submitSuccess ? (
                  <div className="text-center p-8">
                    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Thank You!</h2>
                    <p className="mt-2 text-gray-600">Your information has been submitted successfully.</p>
                    <Link href="/" className="mt-6 inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                      Return to Home
                    </Link>
                  </div>
                ) : (
                  <form 
                    action="https://docs.google.com/forms/d/e/1FAIpQLSdTMVHjSYU6wKBtWopuyribWX26ifqftY20UCvcp2tv2bMnyw/formResponse" 
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="entry.2005620554"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="entry.1045781291"
                        type="email"
                        required
                        placeholder="Your email address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="entry.1065046570"
                        required
                        placeholder="Your address"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone number
                      </label>
                      <input
                        id="phone"
                        name="entry.1166974658"
                        type="tel"
                        placeholder="Your phone number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                        Comments
                      </label>
                      <textarea
                        id="comments"
                        name="entry.839337160"
                        placeholder="Additional comments"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 ${
                          isSubmitting ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'
                        } text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 