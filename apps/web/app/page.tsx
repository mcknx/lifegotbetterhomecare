import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ContactForm } from "@/components/contact-form"
import { BenefitsSection } from "@/components/benefits-section"
import { Footer } from "@/components/footer"
import { FindCareSection } from "@/components/find-care-section"
import { AboutSection } from "@/components/about-section"

export default function Home() {
  return (
    <main>
      <NavBar />
      <div id="home">
        <HeroSection />
      </div>
      <div id="benefits">
        <BenefitsSection />
      </div>
      <div id="find-care">
        <FindCareSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
    </main>
  )
}


