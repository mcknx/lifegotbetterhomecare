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
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <FeaturesSection />
      <ContactForm />
    </main>
  )
}


