import { AboutSection } from "@/components/about-section"
import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: "About Us | Life Got Better Homecare",
  description: "Learn about Life Got Better Homecare, our mission, values, and the team behind our compassionate care services.",
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <div className="pt-24 md:pt-28">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
    </main>
  )
} 