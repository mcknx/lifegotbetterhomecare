'use client'; // Make this a Client Component

import React, { useState, useEffect } from 'react'; // Import hooks
// Remove prisma import: import { prisma } from '@/lib/prisma'; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form'; 
import { getAllJobs } from '@/lib/api'; // Use client-side API function
import { Job } from '@/types/job'; // Import Job type
import { supabase } from '@/lib/supabase'; // Import Supabase client for realtime

// Fetch jobs directly in the Server Component - REMOVED as we fetch client-side now
// async function getJobs() {
//   const jobs = await prisma.jobs.findMany({
//     orderBy: {
//       created_at: 'desc',
//     },
//   });
//   return jobs;
// }

export default function CareersPage() {
  // State for jobs, loading, and errors
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to load initial jobs
    async function loadInitialJobs() {
      setLoading(true);
      try {
        const data = await getAllJobs();
        console.log('Fetched initial careers jobs:', data);
        setJobs(data);
        setError(null);
      } catch (err) {
        setError('Failed to load job listings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialJobs();

    // Set up real-time subscription
    const channel = supabase
      .channel('public:jobs:careers') // Unique channel name for this page
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'jobs' },
        (payload) => {
          console.log('Careers page realtime change received!', payload);
          
          if (payload.eventType === 'INSERT') {
            setJobs(currentJobs => [...currentJobs, payload.new as Job]);
          } else if (payload.eventType === 'UPDATE') {
            setJobs(currentJobs => 
              currentJobs.map(job => 
                job.id === payload.old.id ? (payload.new as Job) : job
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setJobs(currentJobs => 
              currentJobs.filter(job => job.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    // Cleanup function
    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Run only once on mount

  // -- Original component structure starts here, using state variables --

  // const jobs = await getJobs(); // Removed server-side fetch

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Careers at Life Got Better Homecare</h1>
      <p className="text-lg mb-12 text-center max-w-2xl mx-auto">
        Join our dedicated team and make a meaningful difference in the lives of those we serve. We offer fulfilling career opportunities for compassionate individuals.
      </p>

      {loading && <p className="text-center text-gray-500 mb-16">Loading careers...</p>} 
      {error && <p className="text-center text-red-500 mb-16">{error}</p>}

      {!loading && !error && jobs.length === 0 && (
         <p className="text-center text-gray-500 mb-16">Currently, there are no open positions. Please check back later.</p>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {jobs.map((job) => (
            <Card key={job.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                {/* Ensure employmentType exists before displaying */}
                <CardDescription>{job.location}{job.employmentType ? ` | ${job.employmentType}` : ''}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Display summary */}
                <p className="text-sm text-gray-600 line-clamp-3">
                  {job.summary || 'No summary available.'} {/* Add fallback */}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/careers/${job.id}`} passHref className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Contact Form Section (remains unchanged) */}
      <div id="contact" className="mt-40 pt-16 border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <ContactForm />
      </div>
    </div>
  );
} 