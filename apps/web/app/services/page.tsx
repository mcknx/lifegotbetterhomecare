import { NavBar } from "@/components/nav-bar"
import { ServicesSection } from "@/components/services-section"
import { ServicesExpandedSection } from "@/components/services-expanded-section" 
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: "Our Services | Life Got Better Homecare",
  description: "Explore our comprehensive range of home care services including personal care, companion care, post-operative care, and specialized assistance.",
}

export default function ServicesPage() {
  return (
    <main className="overflow-hidden">
      <NavBar />
      <ServicesExpandedSection />
      <div className="pt-24 md:pt-28">
        <ServicesSection />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
    </main>
  )
} 