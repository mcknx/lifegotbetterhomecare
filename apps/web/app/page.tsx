import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ContactForm } from "@/components/contact-form"
import { BenefitsSection } from "@/components/benefits-section"
import { Footer } from "@/components/footer"
import { FindCareSection } from "@/components/find-care-section"
import { AboutSection } from "@/components/about-section"
import { ServicesExpandedSection } from "@/components/services-expanded-section"
import { PersonalizedCareSection } from "@/components/personalized-care-section"

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
        <div id="find-care">
          <FindCareSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <div id="personalized-care">
          <PersonalizedCareSection />
        </div>
        <div id="services">
          <ServicesSection />
        </div>
        <div id="contact">
          <ContactForm />
        </div>
        <Footer />
      </main>
    </>
  )
}


