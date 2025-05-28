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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="pt-16 sm:pt-20 md:pt-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center leading-tight">
          Careers at Life Got Better Homecare
        </h1>
        <p className="text-base sm:text-lg mb-8 sm:mb-12 text-center max-w-2xl mx-auto leading-relaxed">
          Join our dedicated team and make a meaningful difference in the lives of those we serve. We offer fulfilling career opportunities for compassionate individuals.
        </p>
      </div>

      {loading && (
        <div className="text-center text-gray-500 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <div className="h-5 w-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span className="text-sm sm:text-base">Loading careers...</span>
          </div>
        </div>
      )} 
      
      {error && (
        <div className="text-center text-red-500 mb-12 sm:mb-16">
          <p className="text-sm sm:text-base">{error}</p>
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="text-center text-gray-500 mb-12 sm:mb-16">
          <p className="text-sm sm:text-base">Currently, there are no open positions. Please check back later.</p>
        </div>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {jobs.map((job) => (
            <Card key={job.id} className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl leading-tight line-clamp-2">{job.title}</CardTitle>
                {/* Ensure employmentType exists before displaying */}
                <CardDescription className="text-sm text-gray-600">
                  {job.location}{job.employmentType ? ` | ${job.employmentType}` : ''}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pb-4">
                {/* Display summary */}
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {job.summary || 'No summary available.'} {/* Add fallback */}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href={`/careers/${job.id}`} passHref className="w-full">
                  <Button className="w-full min-h-[44px] touch-manipulation text-sm font-medium">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Contact Form Section */}
      <div id="contact" className="mt-20 sm:mt-32 lg:mt-40 pt-12 sm:pt-16 border-t border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center leading-tight">Contact Us</h2>
        <ContactForm />
      </div>
    </div>
  );
} 