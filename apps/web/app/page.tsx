import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { ContactForm } from "@/components/contact-form"
import { BenefitsSection } from "@/components/benefits-section"
import { Footer } from "@/components/footer"
import { FindCareSection } from "@/components/find-care-section"
import { ServicesExpandedSection } from "@/components/services-expanded-section"
import { PersonalizedCareSection } from "@/components/personalized-care-section"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function Home() {
  return (
    <>
      <ServicesExpandedSection />
      <main className="overflow-hidden">
        <NavBar />
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
        {/* <div id="find-care">
          <FindCareSection />
        </div> */}
        <div id="contact">
          <ContactForm />
        </div>
        <Footer />
      </main>
    </>
  )
}


