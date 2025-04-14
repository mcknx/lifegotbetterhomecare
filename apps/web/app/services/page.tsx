import { ServicesSection } from "@/components/services-section"
import { ServicesBanner } from "@/components/services-banner" 
import { MedicalCareSection } from "@/components/medical-care-section"
import { SpecialtyServicesSection } from "@/components/specialty-services-section"
import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: "Our Services | Life Got Better Homecare",
  description: "Explore our personalized care services including homecare services, home medical care, and specialty services tailored to your needs.",
}

export default function ServicesPage() {
  return (
    <main className="overflow-hidden">
      <div className="pt-24 md:pt-28">
        <ServicesBanner />
      </div>
      <ServicesSection />
      <MedicalCareSection />
      <SpecialtyServicesSection />
      <div id="contact">
        <ContactForm />
      </div>
    </main>
  )
} 