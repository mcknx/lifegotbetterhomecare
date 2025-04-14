import React from 'react';
import { prisma } from '@/lib/prisma'; // Import prisma client
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form'; // Import ContactForm

// Fetch jobs directly in the Server Component
async function getJobs() {
  const jobs = await prisma.jobs.findMany({
    orderBy: {
      created_at: 'desc', // Use the correct field name
    },
  });
  return jobs;
}

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Careers at Life Got Better Homecare</h1>
      <p className="text-lg mb-12 text-center max-w-2xl mx-auto">
        Join our dedicated team and make a meaningful difference in the lives of those we serve. We offer fulfilling career opportunities for compassionate individuals.
      </p>

      {jobs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {jobs.map((job) => (
            <Card key={job.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.location} | {job.employmentType}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Display a snippet of the summary */} 
                <p className="text-sm text-gray-600 line-clamp-3">
                  {job.summary}
                </p>
              </CardContent>
              <CardFooter>
                {/* Link to a future job details page */}
                {/* <Link href={`/careers/${job.id}`} passHref>
                  <Button>View Details</Button>
                </Link> */}
                <Button disabled>View Details (Coming Soon)</Button> 
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-16">Currently, there are no open positions. Please check back later.</p>
      )}

      {/* Add Contact Form Section */}
      <div id="contact" className="mt-40 pt-16 border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <ContactForm />
      </div>
    </div>
  );
} 