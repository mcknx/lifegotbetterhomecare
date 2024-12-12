import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ContactForm } from "@/components/contact-form"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"

export default function Home() {
  return (
    <main>
      <NavBar />
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="careers">
        <FeaturesSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
    </main>
  )
}


