import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { NavBar } from "@/components/nav-bar"
import { ReferPatientForm } from "@/components/refer-patient-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refer a Patient | Life Got Better Homecare",
  description: "Refer a patient for our comprehensive home care services. We provide personal care, medical support, and specialized services tailored to each patient's needs.",
}

export default function ReferPatientPage() {
  return (
    <main>
      <NavBar />
      <div className="pt-24 md:pt-28">
        <ReferPatientForm />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
    </main>
  )
} 
