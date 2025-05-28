import { HeroSection } from "@/components/hero-section"
import { ContactForm } from "@/components/contact-form"
import { BenefitsSection } from "@/components/benefits-section"
import { FindCareSection } from "@/components/find-care-section"
import { ServicesExpandedSection } from "@/components/services-expanded-section"
import { PersonalizedCareSection } from "@/components/personalized-care-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <ServicesExpandedSection />
      <main className="overflow-hidden">
        <div id="home">
          <HeroSection />
        </div>
        <div id="benefits">
          <BenefitsSection />
        </div>
        <div id="personalized-care">
          <PersonalizedCareSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        
        <div id="contact">
          <ContactForm />
        </div>
      </main>
    </>
  )
}


