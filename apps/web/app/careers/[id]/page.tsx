import React from 'react';
import { prisma } from '@/lib/prisma';
// import { notFound } from 'next/navigation'; // Removed import
import { ContactForm } from '@/components/contact-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

// Helper function placed outside component
const parseJsonArray = (jsonString: any): string[] => {
  if (!jsonString) return [];
  try {
    if (typeof jsonString === 'string') {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed : [];
    } else if (Array.isArray(jsonString)) {
      return jsonString; // Already an array
    }
    return [];
  } catch (e) {
    console.error("Error parsing JSON field:", e);
    return [];
  }
};

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await prisma.jobs.findUnique({
    where: { id: params.id },
  });

  // Handle job not found by returning a message
  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p className="mb-8">The job posting you are looking for could not be found.</p>
        <Link href="/careers" passHref>
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
             Back to Careers
          </Button>
        </Link>
      </div>
    );
  }

  // Now job is guaranteed non-null here
  const responsibilities = parseJsonArray(job.responsibilities);
  const qualifications = parseJsonArray(job.qualifications);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Navigation */}
      <div className="mb-8 flex justify-between items-center">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="list-none p-0 inline-flex space-x-2">
            <li className="flex items-center">
              <Link href="/" className="hover:text-primary-dark">Home</Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li className="flex items-center">
              <Link href="/careers" className="hover:text-primary-dark">Careers</Link>
            </li>
             <li>
              <span>/</span>
            </li>
            <li className="flex items-center" aria-current="page">
              <span className="font-medium text-gray-700">{job.title}</span>
            </li>
          </ol>
        </nav>
        
        {/* Back Button */}
        <Link href="/careers" passHref>
           <Button variant="outline" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Careers
           </Button>
        </Link>
      </div>

      {/* Job Header */}
      <div className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-600 mb-4">
          <span>Location: {job.location}</span>
          <span>|</span>
          <span>Reports To: {job.reportsTo ?? 'N/A'}</span>
        </div>
        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">
            {job.employmentType}
        </span>
      </div>

      {/* Job Summary */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Job Summary</h2>
        <p className="text-gray-700 whitespace-pre-line">{job.summary}</p>
      </div>

      {/* Key Responsibilities */}
      {responsibilities.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Key Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Qualifications */}
      {qualifications.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Qualifications</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {qualifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contact Form Section */}
      <div id="contact" className="mt-24 pt-16 border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center">Apply or Inquire About This Position</h2>
        <ContactForm />
      </div>
    </div>
  );
} 